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
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Afiliadas</h1>
            <p className="text-muted-foreground">
              Gerencie os membros da sua equipe
            </p>
          </div>
          <NeonButton variant="neon" className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Nova Afiliada
          </NeonButton>
        </div>

        {/* Search */}
        <GlassCard className="p-4 mb-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-card border-white/10"
            />
          </div>
        </GlassCard>

        {/* Affiliates List */}
        <div className="space-y-4">
          {affiliates.map((affiliate) => (
            <GlassCard key={affiliate.id} hover className="p-6">
              <div className="flex items-center gap-6">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-blue to-neon-violet flex items-center justify-center font-bold text-lg">
                  {affiliate.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="font-semibold text-lg">{affiliate.name}</p>
                    <p className="text-sm text-muted-foreground">{affiliate.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Nível</p>
                    <p className="font-bold text-neon-blue">Nível {affiliate.level}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">XP Total</p>
                    <p className="font-bold text-neon-violet">{affiliate.xp} XP</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Pontos</p>
                    <p className="font-bold text-neon-turquoise">{affiliate.points}</p>
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
