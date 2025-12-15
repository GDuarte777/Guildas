import { Users, DollarSign, TrendingUp, Activity } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";

export default function AdminOverview() {
  const stats = [
    { label: "Usuários Totais", value: "1,234", change: "+12%", icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Receita Mensal", value: "R$ 45.2k", change: "+8%", icon: DollarSign, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Novos Assinantes", value: "156", change: "+24%", icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-400/10" },
    { label: "Taxa de Retenção", value: "98%", change: "+1%", icon: Activity, color: "text-orange-400", bg: "bg-orange-400/10" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Visão Geral</h1>
        <p className="text-muted-foreground">Bem-vindo de volta, Administrador.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <GlassCard key={i} className="p-6 hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-lg">
                {stat.change}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Placeholder para gráficos futuros */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6 h-[300px] flex items-center justify-center border-dashed border-2 border-white/10 bg-white/5">
          <p className="text-muted-foreground">Gráfico de Receita (Em breve)</p>
        </GlassCard>
        <GlassCard className="p-6 h-[300px] flex items-center justify-center border-dashed border-2 border-white/10 bg-white/5">
          <p className="text-muted-foreground">Gráfico de Usuários (Em breve)</p>
        </GlassCard>
      </div>
    </div>
  );
}
