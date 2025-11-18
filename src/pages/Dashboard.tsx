import { DashboardLayout } from "@/components/DashboardLayout";
import { GlassCard } from "@/components/GlassCard";
import { Users, Trophy, TrendingUp, Zap, Target, Award } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      label: "Total de Membros",
      value: "24",
      change: "+3 este mês",
      icon: Users,
      color: "from-neon-blue to-neon-turquoise",
    },
    {
      label: "XP Total",
      value: "15,420",
      change: "+2,340 esta semana",
      icon: Zap,
      color: "from-neon-violet to-neon-blue",
    },
    {
      label: "Conquistas Desbloqueadas",
      value: "87",
      change: "+12 hoje",
      icon: Trophy,
      color: "from-neon-turquoise to-neon-violet",
    },
    {
      label: "Missões Ativas",
      value: "15",
      change: "8 concluídas",
      icon: Target,
      color: "from-neon-blue to-neon-violet",
    },
  ];

  const topPerformers = [
    { name: "Maria Silva", xp: 2840, level: 12, avatar: "MS" },
    { name: "João Santos", xp: 2650, level: 11, avatar: "JS" },
    { name: "Ana Costa", xp: 2420, level: 11, avatar: "AC" },
    { name: "Pedro Lima", xp: 2180, level: 10, avatar: "PL" },
  ];

  const recentAchievements = [
    { user: "Maria Silva", achievement: "Mestre do Engajamento", time: "Há 2 horas" },
    { user: "João Santos", achievement: "Streak de 30 dias", time: "Há 5 horas" },
    { user: "Ana Costa", achievement: "100 Postagens", time: "Há 8 horas" },
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do desempenho da sua equipe
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <GlassCard key={index} hover className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs text-neon-blue">{stat.change}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performers */}
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Top Performers</h2>
              <TrendingUp className="w-5 h-5 text-neon-blue" />
            </div>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-1 text-2xl font-bold text-neon-blue">
                    #{index + 1}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-violet flex items-center justify-center font-bold">
                    {performer.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{performer.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Nível {performer.level}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-neon-blue">{performer.xp} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Recent Achievements */}
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Conquistas Recentes</h2>
              <Award className="w-5 h-5 text-neon-violet" />
            </div>
            <div className="space-y-4">
              {recentAchievements.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/5"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-violet to-neon-turquoise flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{item.user}</p>
                    <p className="text-sm text-neon-violet">{item.achievement}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Weekly Progress Chart Placeholder */}
        <GlassCard className="p-6 mt-6">
          <h2 className="text-xl font-bold mb-6">Progresso Semanal</h2>
          <div className="h-64 bg-gradient-to-br from-muted/50 to-background rounded-xl flex items-center justify-center border border-white/10">
            <p className="text-muted-foreground">Gráfico de progresso</p>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}
