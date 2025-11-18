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
  Zap,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/dashboard/affiliates", label: "Afiliadas", icon: Users },
    { to: "/dashboard/gamification", label: "Gamificação", icon: Trophy },
    { to: "/dashboard/ranking", label: "Ranking", icon: BarChart3 },
    { to: "/dashboard/calendar", label: "Calendário", icon: Calendar },
    { to: "/dashboard/missions", label: "Missões", icon: Target },
    { to: "/dashboard/achievements", label: "Conquistas", icon: Award },
    { to: "/dashboard/settings", label: "Configurações", icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 glass-card flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-violet flex items-center justify-center animate-glow">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">GameTeam</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive(item.to)
                  ? "bg-gradient-to-r from-neon-blue/20 to-neon-violet/20 border border-neon-blue/30 text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-violet flex items-center justify-center font-bold">
              G
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Gestor Admin</p>
              <p className="text-xs text-muted-foreground">gestor@email.com</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-2 px-4 py-2 mt-2 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};
