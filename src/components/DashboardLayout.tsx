import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Trophy,
  BarChart3,
  Calendar,
  Settings,
  Target,
  Award,
  Moon,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/dashboard/affiliates", label: "Afiliadas", icon: Users },
    { to: "/dashboard/gamification", label: "Gamificação", icon: Trophy },
    { to: "/dashboard/achievements", label: "Conquistas", icon: Award },
    { to: "/dashboard/settings", label: "Configurações", icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-24">
        {children}
      </main>

      {/* Dock Navigation */}
      <div className="fixed bottom-4 left-0 right-0 z-50">
        <Dock className="items-end pb-3">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              <DockItem
                className={cn(
                  "aspect-square rounded-full transition-colors",
                  isActive(item.to)
                    ? "bg-gradient-to-br from-primary to-secondary"
                    : "bg-muted/50 hover:bg-muted"
                )}
              >
                <DockLabel>{item.label}</DockLabel>
                <DockIcon>
                  <item.icon
                    className={cn(
                      "h-full w-full",
                      isActive(item.to)
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
                    )}
                  />
                </DockIcon>
              </DockItem>
            </Link>
          ))}
          
          {/* Dark Mode Toggle */}
          <button onClick={toggleTheme}>
            <DockItem
              className="aspect-square rounded-full bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
            >
              <DockLabel>{theme === "dark" ? "Light Mode" : "Dark Mode"}</DockLabel>
              <DockIcon>
                {theme === "dark" ? (
                  <Sun className="h-full w-full text-muted-foreground" />
                ) : (
                  <Moon className="h-full w-full text-muted-foreground" />
                )}
              </DockIcon>
            </DockItem>
          </button>
        </Dock>
      </div>
    </div>
  );
};
