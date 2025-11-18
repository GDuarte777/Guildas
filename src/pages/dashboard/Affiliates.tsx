import { DashboardLayout } from "@/components/DashboardLayout";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { useState } from "react";

export default function Affiliates() {
  const [searchTerm, setSearchTerm] = useState("");

  const affiliates = [
    {
      id: 1,
      name: "Maria Silva",
      email: "maria@email.com",
      level: 12,
      xp: 2840,
      points: 450,
      status: "Ativo",
      avatar: "MS",
    },
    {
      id: 2,
      name: "João Santos",
      email: "joao@email.com",
      level: 11,
      xp: 2650,
      points: 420,
      status: "Ativo",
      avatar: "JS",
    },
    {
      id: 3,
      name: "Ana Costa",
      email: "ana@email.com",
      level: 11,
      xp: 2420,
      points: 390,
      status: "Ativo",
      avatar: "AC",
    },
    {
      id: 4,
      name: "Pedro Lima",
      email: "pedro@email.com",
      level: 10,
      xp: 2180,
      points: 360,
      status: "Ativo",
      avatar: "PL",
    },
    {
      id: 5,
      name: "Carla Mendes",
      email: "carla@email.com",
      level: 9,
      xp: 1950,
      points: 320,
      status: "Inativo",
      avatar: "CM",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1">Afiliadas</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Gerencie os membros da sua equipe
            </p>
          </div>
          <NeonButton variant="neon" className="flex items-center gap-2 text-sm md:text-base">
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Nova Afiliada</span>
            <span className="sm:hidden">Nova</span>
          </NeonButton>
        </div>

        {/* Search */}
        <GlassCard className="p-3 md:p-4 mb-4 md:mb-6">
          <div className="relative">
            <Search className="w-4 h-4 md:w-5 md:h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 md:pl-10 glass-card border-border text-sm md:text-base"
            />
          </div>
        </GlassCard>

        {/* Affiliates List */}
        <div className="space-y-3 md:space-y-4">
          {affiliates.map((affiliate) => (
            <GlassCard key={affiliate.id} hover className="p-4 md:p-5 lg:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
                {/* Avatar */}
                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-sm md:text-base lg:text-lg shrink-0">
                  {affiliate.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full">
                  <div className="col-span-2 sm:col-span-2 lg:col-span-1">
                    <p className="font-semibold text-base md:text-lg">{affiliate.name}</p>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">{affiliate.email}</p>
                  </div>

                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-1">Nível</p>
                    <p className="font-bold text-sm md:text-base text-primary">Nível {affiliate.level}</p>
                  </div>

                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-1">XP Total</p>
                    <p className="font-bold text-sm md:text-base text-secondary">{affiliate.xp} XP</p>
                  </div>

                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-1">Pontos</p>
                    <p className="font-bold text-sm md:text-base text-accent">{affiliate.points}</p>
                  </div>
                </div>

                {/* Status */}
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    affiliate.status === "Ativo"
                      ? "bg-neon-blue/20 text-neon-blue"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {affiliate.status}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Edit className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Trash2 className="w-5 h-5 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progresso para próximo nível</span>
                  <span className="font-medium">{affiliate.xp % 300} / 300 XP</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-neon-blue to-neon-violet"
                    style={{ width: `${((affiliate.xp % 300) / 300) * 100}%` }}
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
