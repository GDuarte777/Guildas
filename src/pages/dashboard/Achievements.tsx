import { DashboardLayout } from "@/components/DashboardLayout";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { Award, Plus, Users, User, Edit, Trash2, Lock } from "lucide-react";

export default function Achievements() {
  const achievements = [
    {
      id: 1,
      name: "Primeiro Post",
      description: "Faça sua primeira postagem",
      icon: "🎯",
      xp: 50,
      scope: "individual",
      unlocked: 24,
      total: 24,
      rarity: "common",
    },
    {
      id: 2,
      name: "Streak de 7 dias",
      description: "Poste por 7 dias consecutivos",
      icon: "🔥",
      xp: 100,
      scope: "individual",
      unlocked: 18,
      total: 24,
      rarity: "uncommon",
    },
    {
      id: 3,
      name: "100 Postagens",
      description: "Complete 100 postagens no total",
      icon: "💯",
      xp: 200,
      scope: "individual",
      unlocked: 12,
      total: 24,
      rarity: "rare",
    },
    {
      id: 4,
      name: "Mestre do Engajamento",
      description: "Alcance 1000 de engajamento total",
      icon: "⚡",
      xp: 300,
      scope: "individual",
      unlocked: 8,
      total: 24,
      rarity: "epic",
    },
    {
      id: 5,
      name: "Lenda",
      description: "Alcance o nível 20",
      icon: "👑",
      xp: 500,
      scope: "individual",
      unlocked: 2,
      total: 24,
      rarity: "legendary",
    },
    {
      id: 6,
      name: "Equipe Unida",
      description: "Toda equipe postou no mesmo dia",
      icon: "🤝",
      xp: 500,
      scope: "global",
      unlocked: 15,
      total: 24,
      rarity: "epic",
    },
    {
      id: 7,
      name: "Domínio Total",
      description: "Toda equipe no nível máximo",
      icon: "🏆",
      xp: 1000,
      scope: "global",
      unlocked: 0,
      total: 24,
      rarity: "legendary",
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "from-gray-500 to-gray-600";
      case "uncommon":
        return "from-green-500 to-green-600";
      case "rare":
        return "from-blue-500 to-blue-600";
      case "epic":
        return "from-purple-500 to-purple-600";
      case "legendary":
        return "from-yellow-400 to-orange-500";
      default:
        return "from-muted to-muted";
    }
  };

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "Comum";
      case "uncommon":
        return "Incomum";
      case "rare":
        return "Raro";
      case "epic":
        return "Épico";
      case "legendary":
        return "Lendário";
      default:
        return rarity;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <Award className="w-10 h-10 text-neon-violet animate-glow" />
              Conquistas
            </h1>
            <p className="text-muted-foreground">
              Gerencie as conquistas e recompensas da equipe
            </p>
          </div>
          <NeonButton variant="neon" className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Nova Conquista
          </NeonButton>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {["common", "uncommon", "rare", "epic", "legendary"].map((rarity) => {
            const count = achievements.filter((a) => a.rarity === rarity).length;
            return (
              <GlassCard key={rarity} className="p-6">
                <div className={`w-full h-2 rounded-full bg-gradient-to-r ${getRarityColor(rarity)} mb-3`} />
                <p className="text-2xl font-bold mb-1">{count}</p>
                <p className="text-sm text-muted-foreground">{getRarityLabel(rarity)}</p>
              </GlassCard>
            );
          })}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <GlassCard key={achievement.id} hover className="p-6 relative overflow-hidden">
              {/* Rarity gradient border */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getRarityColor(achievement.rarity)}`} />

              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{achievement.icon}</div>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                    <Edit className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                    <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">{achievement.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`}>
                    {getRarityLabel(achievement.rarity)}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    {achievement.scope === "global" ? (
                      <>
                        <Users className="w-3 h-3" />
                        Global
                      </>
                    ) : (
                      <>
                        <User className="w-3 h-3" />
                        Individual
                      </>
                    )}
                  </span>
                  <span className="text-xs font-medium text-neon-violet">+{achievement.xp} XP</span>
                </div>
              </div>

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground flex items-center gap-1">
                    {achievement.unlocked === 0 ? (
                      <>
                        <Lock className="w-3 h-3" />
                        Bloqueada
                      </>
                    ) : (
                      "Desbloqueada"
                    )}
                  </span>
                  <span className="font-medium">
                    {achievement.unlocked}/{achievement.total}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} transition-all duration-500`}
                    style={{ width: `${(achievement.unlocked / achievement.total) * 100}%` }}
                  />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
