import { DashboardLayout } from "@/components/DashboardLayout";
import { GlassCard } from "@/components/GlassCard";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Calendar() {
  const [selectedAffiliate, setSelectedAffiliate] = useState("Maria Silva");
  
  const affiliates = [
    "Maria Silva",
    "João Santos",
    "Ana Costa",
    "Pedro Lima",
    "Carla Mendes",
  ];

  const currentMonth = "Dezembro 2024";
  
  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  
  // Mock calendar data - 31 days
  const calendarDays = Array.from({ length: 31 }, (_, i) => {
    const dayNum = i + 1;
    const statuses = ["complete", "warning", "missing", "none"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      day: dayNum,
      status: dayNum > 25 ? "none" : randomStatus, // Futuro sem status
      xp: dayNum <= 25 ? Math.floor(Math.random() * 100) + 50 : 0,
    };
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-neon-turquoise/30 border-neon-turquoise hover:bg-neon-turquoise/40";
      case "warning":
        return "bg-yellow-500/30 border-yellow-500 hover:bg-yellow-500/40";
      case "missing":
        return "bg-destructive/30 border-destructive hover:bg-destructive/40";
      default:
        return "bg-muted/50 border-muted";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "complete":
        return "✓ Completo";
      case "warning":
        return "⚠ Atenção";
      case "missing":
        return "✗ Não Postou";
      default:
        return "Sem análise";
    }
  };

  const stats = {
    complete: calendarDays.filter((d) => d.status === "complete").length,
    warning: calendarDays.filter((d) => d.status === "warning").length,
    missing: calendarDays.filter((d) => d.status === "missing").length,
    streak: 7,
    totalXP: calendarDays.reduce((sum, d) => sum + d.xp, 0),
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <CalendarIcon className="w-10 h-10 text-neon-blue animate-glow" />
            Calendário Gamificado
          </h1>
          <p className="text-muted-foreground">
            Acompanhe o progresso diário de cada afiliada
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Affiliate Selector */}
          <div className="lg:col-span-1 space-y-4">
            <GlassCard className="p-4">
              <h3 className="font-semibold mb-4">Selecione Afiliada</h3>
              <div className="space-y-2">
                {affiliates.map((affiliate) => (
                  <button
                    key={affiliate}
                    onClick={() => setSelectedAffiliate(affiliate)}
                    className={`w-full px-4 py-3 rounded-xl text-left transition-all ${
                      selectedAffiliate === affiliate
                        ? "bg-gradient-to-r from-neon-blue/20 to-neon-violet/20 border border-neon-blue/30"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    {affiliate}
                  </button>
                ))}
              </div>
            </GlassCard>

            {/* Stats */}
            <GlassCard className="p-4">
              <h3 className="font-semibold mb-4">Estatísticas</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Dias Completos</p>
                  <p className="text-2xl font-bold text-neon-turquoise">{stats.complete}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Dias com Atenção</p>
                  <p className="text-2xl font-bold text-yellow-500">{stats.warning}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Dias Perdidos</p>
                  <p className="text-2xl font-bold text-destructive">{stats.missing}</p>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <p className="text-sm text-muted-foreground mb-1">Streak Atual</p>
                  <p className="text-2xl font-bold gradient-text">{stats.streak} dias 🔥</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">XP do Mês</p>
                  <p className="text-2xl font-bold text-neon-blue">{stats.totalXP} XP</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Calendar */}
          <div className="lg:col-span-3">
            <GlassCard className="p-6">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold">{currentMonth}</h2>
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Days Header */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {days.map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {/* Empty cells for month start (assuming starts on Sunday = 0 empty) */}
                {Array.from({ length: 0 }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                
                {calendarDays.map((dayData) => (
                  <button
                    key={dayData.day}
                    className={`aspect-square rounded-xl border-2 p-2 transition-all hover:scale-105 ${getStatusColor(
                      dayData.status
                    )}`}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <span className="font-bold text-lg mb-1">{dayData.day}</span>
                      {dayData.xp > 0 && (
                        <span className="text-xs text-neon-blue font-medium">+{dayData.xp} XP</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="font-semibold mb-3">Legenda</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border-2 bg-neon-turquoise/30 border-neon-turquoise" />
                    <span className="text-sm">Completo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border-2 bg-yellow-500/30 border-yellow-500" />
                    <span className="text-sm">Atenção</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border-2 bg-destructive/30 border-destructive" />
                    <span className="text-sm">Não Postou</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border-2 bg-muted/50 border-muted" />
                    <span className="text-sm">Sem Análise</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
