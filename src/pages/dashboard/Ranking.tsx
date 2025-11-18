import { DashboardLayout } from "@/components/DashboardLayout";
import { GlassCard } from "@/components/GlassCard";
import { Trophy, Medal, Crown, Star } from "lucide-react";

export default function Ranking() {
  const rankings = [
    {
      position: 1,
      name: "Maria Silva",
      level: 12,
      xp: 2840,
      achievements: 24,
      streak: 45,
      avatar: "MS",
    },
    {
      position: 2,
      name: "João Santos",
      level: 11,
      xp: 2650,
      achievements: 22,
      streak: 38,
      avatar: "JS",
    },
    {
      position: 3,
      name: "Ana Costa",
      level: 11,
      xp: 2420,
      achievements: 21,
      streak: 35,
      avatar: "AC",
    },
    {
      position: 4,
      name: "Pedro Lima",
      level: 10,
      xp: 2180,
      achievements: 19,
      streak: 30,
      avatar: "PL",
    },
    {
      position: 5,
      name: "Carla Mendes",
      level: 9,
      xp: 1950,
      achievements: 18,
      streak: 28,
      avatar: "CM",
    },
    {
      position: 6,
      name: "Lucas Dias",
      level: 9,
      xp: 1820,
      achievements: 17,
      streak: 25,
      avatar: "LD",
    },
    {
      position: 7,
      name: "Juliana Rocha",
      level: 8,
      xp: 1650,
      achievements: 15,
      streak: 22,
      avatar: "JR",
    },
    {
      position: 8,
      name: "Rafael Souza",
      level: 8,
      xp: 1480,
      achievements: 14,
      streak: 20,
      avatar: "RS",
    },
  ];

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return { icon: Crown, color: "text-yellow-400" };
      case 2:
        return { icon: Medal, color: "text-gray-400" };
      case 3:
        return { icon: Medal, color: "text-amber-700" };
      default:
        return null;
    }
  };

  const getCardStyle = (position: number) => {
    switch (position) {
      case 1:
        return "border-2 border-yellow-400/50 bg-gradient-to-br from-yellow-400/10 to-transparent";
      case 2:
        return "border-2 border-gray-400/50 bg-gradient-to-br from-gray-400/10 to-transparent";
      case 3:
        return "border-2 border-amber-700/50 bg-gradient-to-br from-amber-700/10 to-transparent";
      default:
        return "";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Trophy className="w-10 h-10 text-neon-blue animate-glow" />
            Ranking
          </h1>
          <p className="text-muted-foreground">
            Os melhores performers da sua equipe
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {rankings.slice(0, 3).map((player) => {
            const posIcon = getPositionIcon(player.position);
            return (
              <GlassCard
                key={player.position}
                className={`p-6 text-center ${getCardStyle(player.position)}`}
              >
                {posIcon && (
                  <posIcon.icon className={`w-12 h-12 mx-auto mb-4 ${posIcon.color} animate-glow`} />
                )}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-blue to-neon-violet flex items-center justify-center font-bold text-2xl mx-auto mb-4 border-4 border-white/20">
                  {player.avatar}
                </div>
                <h3 className="text-xl font-bold mb-2">{player.name}</h3>
                <p className="text-3xl font-bold text-neon-blue mb-2">{player.xp} XP</p>
                <p className="text-sm text-muted-foreground mb-4">Nível {player.level}</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div>
                    <Trophy className="w-4 h-4 inline mr-1 text-neon-violet" />
                    {player.achievements}
                  </div>
                  <div>
                    <Star className="w-4 h-4 inline mr-1 text-neon-turquoise" />
                    {player.streak} dias
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Full Ranking List */}
        <GlassCard className="p-6">
          <h2 className="text-2xl font-bold mb-6">Ranking Completo</h2>
          <div className="space-y-3">
            {rankings.map((player) => {
              const posIcon = getPositionIcon(player.position);
              return (
                <div
                  key={player.position}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    player.position <= 3
                      ? getCardStyle(player.position) + " hover:scale-[1.02]"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {/* Position */}
                  <div className="w-12 text-center">
                    {posIcon ? (
                      <posIcon.icon className={`w-8 h-8 ${posIcon.color} mx-auto`} />
                    ) : (
                      <span className="text-2xl font-bold text-muted-foreground">
                        #{player.position}
                      </span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-neon-blue to-neon-violet flex items-center justify-center font-bold">
                    {player.avatar}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{player.name}</p>
                    <p className="text-sm text-muted-foreground">Nível {player.level}</p>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-1">XP</p>
                      <p className="font-bold text-neon-blue">{player.xp}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground mb-1">Conquistas</p>
                      <p className="font-bold text-neon-violet">{player.achievements}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground mb-1">Streak</p>
                      <p className="font-bold text-neon-turquoise">{player.streak} dias</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="hidden lg:block w-32">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-neon-blue to-neon-violet"
                        style={{ width: `${(player.xp / 3000) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}
