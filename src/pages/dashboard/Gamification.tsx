import { DashboardLayout } from "@/components/DashboardLayout";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { Trophy, Target, Award, Zap, Plus } from "lucide-react";

export default function Gamification() {
  const levels = [
    { name: "Iniciante", xpRequired: 0, color: "from-gray-500 to-gray-600" },
    { name: "Novato", xpRequired: 300, color: "from-green-500 to-green-600" },
    { name: "Intermediário", xpRequired: 800, color: "from-blue-500 to-blue-600" },
    { name: "Avançado", xpRequired: 1500, color: "from-purple-500 to-purple-600" },
    { name: "Expert", xpRequired: 2500, color: "from-orange-500 to-orange-600" },
    { name: "Mestre", xpRequired: 4000, color: "from-red-500 to-red-600" },
    { name: "Lenda", xpRequired: 6000, color: "from-yellow-400 to-yellow-500" },
  ];

  const achievements = [
    {
      name: "Primeiro Post",
      description: "Faça sua primeira postagem",
      xp: 50,
      icon: "🎯",
      type: "individual",
    },
    {
      name: "Streak 7 dias",
      description: "Poste por 7 dias consecutivos",
      xp: 100,
      icon: "🔥",
      type: "individual",
    },
    {
      name: "100 Postagens",
      description: "Complete 100 postagens no total",
      xp: 200,
      icon: "💯",
      type: "individual",
    },
    {
      name: "Mestre do Engajamento",
      description: "Alcance 1000 de engajamento total",
      xp: 300,
      icon: "⚡",
      type: "individual",
    },
    {
      name: "Equipe Unida",
      description: "Toda equipe postou no mesmo dia",
      xp: 500,
      icon: "🤝",
      type: "global",
    },
  ];

  const missions = [
    {
      name: "Missão Diária",
      description: "Poste pelo menos uma vez hoje",
      xp: 50,
      status: "active",
      type: "daily",
    },
    {
      name: "Desafio da Semana",
      description: "Alcance 500 XP esta semana",
      xp: 200,
      status: "active",
      type: "weekly",
    },
    {
      name: "Meta Mensal",
      description: "Complete 30 postagens este mês",
      xp: 500,
      status: "active",
      type: "monthly",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Trophy className="w-10 h-10 text-neon-blue animate-glow" />
            Gamificação
          </h1>
          <p className="text-muted-foreground">
            Configure níveis, conquistas e missões da sua equipe
          </p>
        </div>

        {/* Levels Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Zap className="w-6 h-6 text-neon-blue" />
              Níveis
            </h2>
            <NeonButton variant="glass" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Adicionar Nível
            </NeonButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {levels.map((level, index) => (
              <GlassCard key={index} hover className="p-6">
                <div className={`w-full h-2 rounded-full bg-gradient-to-r ${level.color} mb-4`} />
                <h3 className="text-lg font-bold mb-2">{level.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {level.xpRequired} XP necessário
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Award className="w-6 h-6 text-neon-violet" />
              Conquistas
            </h2>
            <NeonButton variant="glass" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nova Conquista
            </NeonButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <GlassCard key={index} hover className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold">{achievement.name}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          achievement.type === "global"
                            ? "bg-neon-blue/20 text-neon-blue"
                            : "bg-neon-violet/20 text-neon-violet"
                        }`}
                      >
                        {achievement.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {achievement.description}
                    </p>
                    <p className="text-sm font-medium text-neon-turquoise">
                      +{achievement.xp} XP
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Missions Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Target className="w-6 h-6 text-neon-turquoise" />
              Missões
            </h2>
            <NeonButton variant="glass" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nova Missão
            </NeonButton>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {missions.map((mission, index) => (
              <GlassCard key={index} hover className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      mission.type === "daily"
                        ? "bg-neon-blue/20 text-neon-blue"
                        : mission.type === "weekly"
                        ? "bg-neon-violet/20 text-neon-violet"
                        : "bg-neon-turquoise/20 text-neon-turquoise"
                    }`}
                  >
                    {mission.type === "daily"
                      ? "Diária"
                      : mission.type === "weekly"
                      ? "Semanal"
                      : "Mensal"}
                  </span>
                  <span className="text-xs text-neon-turquoise font-medium">
                    +{mission.xp} XP
                  </span>
                </div>
                <h3 className="font-bold mb-2">{mission.name}</h3>
                <p className="text-sm text-muted-foreground">{mission.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
