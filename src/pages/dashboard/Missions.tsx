import { DashboardLayout } from "@/components/DashboardLayout";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { Target, Plus, Clock, Users, User, Edit, Trash2 } from "lucide-react";

export default function Missions() {
  const missions = [
    {
      id: 1,
      name: "Missão Diária",
      description: "Poste pelo menos uma vez hoje",
      type: "daily",
      scope: "individual",
      xp: 50,
      status: "active",
      progress: 18,
      total: 24,
    },
    {
      id: 2,
      name: "Desafio Semanal",
      description: "Alcance 500 XP esta semana",
      type: "weekly",
      scope: "individual",
      xp: 200,
      status: "active",
      progress: 12,
      total: 24,
    },
    {
      id: 3,
      name: "Meta Mensal",
      description: "Complete 30 postagens este mês",
      type: "monthly",
      scope: "individual",
      xp: 500,
      status: "active",
      progress: 24,
      total: 24,
    },
    {
      id: 4,
      name: "Equipe Completa",
      description: "Toda equipe deve postar no mesmo dia",
      type: "daily",
      scope: "global",
      xp: 300,
      status: "active",
      progress: 18,
      total: 24,
    },
    {
      id: 5,
      name: "Mega Engajamento",
      description: "Equipe deve atingir 10.000 de engajamento total",
      type: "monthly",
      scope: "global",
      xp: 1000,
      status: "active",
      progress: 15,
      total: 24,
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "daily":
        return "bg-neon-blue/20 text-neon-blue";
      case "weekly":
        return "bg-neon-violet/20 text-neon-violet";
      case "monthly":
        return "bg-neon-turquoise/20 text-neon-turquoise";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "daily":
        return "Diária";
      case "weekly":
        return "Semanal";
      case "monthly":
        return "Mensal";
      default:
        return type;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <Target className="w-10 h-10 text-neon-turquoise animate-glow" />
              Missões
            </h1>
            <p className="text-muted-foreground">
              Configure missões personalizadas para sua equipe
            </p>
          </div>
          <NeonButton variant="neon" className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Nova Missão
          </NeonButton>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-neon-blue/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-neon-blue" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Missões Diárias</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-neon-violet/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-neon-violet" />
              </div>
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-muted-foreground">Missões Semanais</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-neon-turquoise/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-neon-turquoise" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Missões Mensais</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-violet flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-muted-foreground">Total Ativas</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Missions List */}
        <div className="space-y-4">
          {missions.map((mission) => (
            <GlassCard key={mission.id} hover className="p-6">
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-neon-turquoise to-neon-blue flex items-center justify-center flex-shrink-0">
                  <Target className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{mission.name}</h3>
                      <p className="text-muted-foreground mb-3">{mission.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                        <Edit className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                        <Trash2 className="w-5 h-5 text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(mission.type)}`}>
                      {getTypeLabel(mission.type)}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      {mission.scope === "global" ? (
                        <>
                          <Users className="w-4 h-4" />
                          Global
                        </>
                      ) : (
                        <>
                          <User className="w-4 h-4" />
                          Individual
                        </>
                      )}
                    </span>
                    <span className="text-sm font-medium text-neon-turquoise">+{mission.xp} XP</span>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="font-medium">
                        {mission.progress}/{mission.total} membros completaram
                      </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-neon-turquoise to-neon-blue transition-all duration-500"
                        style={{ width: `${(mission.progress / mission.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
