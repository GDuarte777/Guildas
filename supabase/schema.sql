-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  google_spreadsheet_id TEXT,
  plan_status TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Public profiles are viewable by everyone'
    ) THEN
        CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
          FOR SELECT USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert their own profile'
    ) THEN
        CREATE POLICY "Users can insert their own profile" ON public.profiles
          FOR INSERT WITH CHECK (auth.uid() = id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile'
    ) THEN
        CREATE POLICY "Users can update own profile" ON public.profiles
          FOR UPDATE USING (auth.uid() = id);
    END IF;
END
$$;

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger setup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create bio_pages table
CREATE TABLE IF NOT EXISTS public.bio_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT,
  description TEXT,
  profile_image TEXT,
  theme_config JSONB DEFAULT '{}'::jsonb,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_page UNIQUE (user_id)
);

-- Enable RLS for bio_pages
ALTER TABLE public.bio_pages ENABLE ROW LEVEL SECURITY;

-- Bio Pages policies
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'bio_pages' AND policyname = 'Bio pages are viewable by everyone if published'
    ) THEN
        CREATE POLICY "Bio pages are viewable by everyone if published" ON public.bio_pages
          FOR SELECT USING (is_published = true OR auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'bio_pages' AND policyname = 'Users can create their own bio page'
    ) THEN
        CREATE POLICY "Users can create their own bio page" ON public.bio_pages
          FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'bio_pages' AND policyname = 'Users can update own bio page'
    ) THEN
        CREATE POLICY "Users can update own bio page" ON public.bio_pages
          FOR UPDATE USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'bio_pages' AND policyname = 'Users can delete own bio page'
    ) THEN
        CREATE POLICY "Users can delete own bio page" ON public.bio_pages
          FOR DELETE USING (auth.uid() = user_id);
    END IF;
END
$$;

-- Create bio_links table
CREATE TABLE IF NOT EXISTS public.bio_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID REFERENCES public.bio_pages(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT DEFAULT 'simple',
  icon TEXT,
  image TEXT,
  price TEXT,
  category TEXT,
  animation TEXT DEFAULT 'none',
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for bio_links
ALTER TABLE public.bio_links ENABLE ROW LEVEL SECURITY;

-- Bio Links policies
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'bio_links' AND policyname = 'Bio links are viewable by everyone if page is published'
    ) THEN
        CREATE POLICY "Bio links are viewable by everyone if page is published" ON public.bio_links
          FOR SELECT USING (
            EXISTS (
              SELECT 1 FROM public.bio_pages
              WHERE bio_pages.id = bio_links.page_id
              AND (bio_pages.is_published = true OR bio_pages.user_id = auth.uid())
            )
          );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'bio_links' AND policyname = 'Users can insert links to own page'
    ) THEN
        CREATE POLICY "Users can insert links to own page" ON public.bio_links
          FOR INSERT WITH CHECK (
            EXISTS (
              SELECT 1 FROM public.bio_pages
              WHERE bio_pages.id = bio_links.page_id
              AND bio_pages.user_id = auth.uid()
            )
          );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'bio_links' AND policyname = 'Users can update links on own page'
    ) THEN
        CREATE POLICY "Users can update links on own page" ON public.bio_links
          FOR UPDATE USING (
            EXISTS (
              SELECT 1 FROM public.bio_pages
              WHERE bio_pages.id = bio_links.page_id
              AND bio_pages.user_id = auth.uid()
            )
          );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'bio_links' AND policyname = 'Users can delete links on own page'
    ) THEN
        CREATE POLICY "Users can delete links on own page" ON public.bio_links
          FOR DELETE USING (
            EXISTS (
              SELECT 1 FROM public.bio_pages
              WHERE bio_pages.id = bio_links.page_id
              AND bio_pages.user_id = auth.uid()
            )
          );
    END IF;
END
$$;
