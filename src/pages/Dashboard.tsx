import { useState } from "react";
import { Users, CheckCircle, UserX, Star, FileText, Target, TrendingUp, Calendar, Search, Grid3x3, List, Edit, Trash2, ChevronLeft, ChevronRight, Lightbulb, Award, BarChart3, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassCard } from "@/components/GlassCard";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [viewMode, setViewMode] = useState("grid");

  const affiliates = [
    { name: "Amanda", username: "@Amandateodooro", points: 140, level: "Experiente", performance: 100, posted: 6, notPosted: 0, noAnalysis: 10 },
    { name: "Joice Alves", username: "@Joice.alves1", points: 140, level: "Experiente", performance: 100, posted: 6, notPosted: 0, noAnalysis: 10 },
    { name: "Larissa Andrade", username: "@_larilandradeee", points: 55, level: "Aprendiz", performance: 66.7, posted: 4, notPosted: 2, noAnalysis: 10 },
    { name: "Raissa Fabiola", username: "@raissafmacedo", points: 115, level: "Experiente", performance: 100, posted: 6, notPosted: 0, noAnalysis: 10 },
    { name: "Carolyne Cristine", username: "@carolynecristine", points: 135, level: "Experiente", performance: 100, posted: 6, notPosted: 0, noAnalysis: 10 },
    { name: "Gabi Monteiro", username: "@gabimonteirohair", points: 0, level: "Aprendiz", performance: null, posted: 0, notPosted: 0, noAnalysis: 0, noRegistro: true },
    { name: "Jeane Alves", username: "@jeanealves460", points: 135, level: "Experiente", performance: 100, posted: 6, notPosted: 0, noAnalysis: 10 },
    { name: "Liziane Prigol", username: "@liziane_prigol", points: 40, level: "Aprendiz", performance: 66.7, posted: 4, notPosted: 2, noAnalysis: 10 }
  ];

  const rankingData = [
    { position: 1, name: "Raissa Fabiola", level: "Aprendiz", xp: 15, maxXp: 100, points: 15, days: 1 },
    { position: 2, name: "Carolyne Cristine", level: "Aprendiz", xp: 15, maxXp: 100, points: 15, days: 1 },
    { position: 3, name: "Jeane Alves", level: "Aprendiz", xp: 15, maxXp: 100, points: 15, days: 1 }
  ];

  return (
    <DashboardLayout>
      <div className="bg-background">
      {/* Header com gradiente neon */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-10" />
        <div className="glass-card border-b border-border/50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="flex items-center gap-4 mb-3 animate-fade-in">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-neon">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text">
                  Painel de Gestão de Afiliados - Aylle Duarte
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-1">
                  Acompanhe o desempenho dos seus afiliados em tempo real
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="glass-card p-1.5 rounded-full inline-flex gap-1 sm:gap-2 shadow-glow">
              <TabsTrigger 
                value="dashboard" 
                className="rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white data-[state=active]:shadow-neon"
              >
                <BarChart3 className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger 
                value="gamificacao" 
                className="rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white data-[state=active]:shadow-neon"
              >
                <Award className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Gamificação</span>
              </TabsTrigger>
              <TabsTrigger 
                value="metricas" 
                className="rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white data-[state=active]:shadow-neon"
              >
                <TrendingUp className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Métricas</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ABA 1 - DASHBOARD */}
          <TabsContent value="dashboard" className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Cards de indicadores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <GlassCard hover className="group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-neon group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-bold gradient-text">31</div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1">Total de Afiliadas Ativas</div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard hover className="group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-accent to-primary shadow-neon group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-bold gradient-text">88.9%</div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1">Taxa Média de Cumprimento</div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard hover className="group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-secondary to-accent shadow-neon group-hover:scale-110 transition-transform duration-300">
                    <UserX className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-bold gradient-text">4</div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1">Total de Afiliados Inativos</div>
                    <div className="text-xs text-muted-foreground/70">Nunca fizeram postagens</div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard hover className="group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent shadow-neon group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold gradient-text">Amanda</div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1">Afiliada Destaque</div>
                    <div className="text-xs text-muted-foreground/70">100.0% de cumprimento</div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Adicionar Nova Afiliada */}
            <GlassCard className="animate-scale-in">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-accent to-primary">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="gradient-text">Adicionar Nova Afiliada</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-foreground">Nome Completo</label>
                  <Input placeholder="" className="glass-card border-border/50 focus:border-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-foreground">Instagram (sem @)</label>
                  <Input placeholder="" className="glass-card border-border/50 focus:border-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-foreground">Link do Instagram</label>
                  <Input placeholder="https://instagram.com/usuario" className="glass-card border-border/50 focus:border-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-foreground">Observações</label>
                  <Input placeholder="" className="glass-card border-border/50 focus:border-primary transition-all" />
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-accent to-primary hover:shadow-glow text-white py-4 sm:py-6 text-sm sm:text-lg font-semibold transition-all duration-300 hover:scale-[1.02]">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Adicionar Afiliada
              </Button>
            </GlassCard>

            {/* Gerenciar Afiliadas */}
            <GlassCard>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <span className="gradient-text">Gerenciar Afiliadas</span>
                </h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <div className="glass-card flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl border border-border/50">
                    <Calendar className="w-4 h-4 text-primary" />
                    <button className="text-primary hover:scale-110 transition-transform"><ChevronLeft className="w-4 h-4" /></button>
                    <span className="text-xs sm:text-sm font-medium">nov. de 2025</span>
                    <button className="text-primary hover:scale-110 transition-transform"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-all duration-300 ${viewMode === "grid" ? "bg-gradient-to-br from-primary to-secondary text-white shadow-neon" : "glass-card border border-border/50"}`}
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-all duration-300 ${viewMode === "list" ? "bg-gradient-to-br from-primary to-secondary text-white shadow-neon" : "glass-card border border-border/50"}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid de afiliadas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {affiliates.map((affiliate, index) => (
                  <div key={index} className="glass-card-hover rounded-2xl p-4 group border border-border/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shadow-neon group-hover:scale-110 transition-transform duration-300">
                        {affiliate.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm sm:text-base truncate">{affiliate.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{affiliate.username}</div>
                        <div className="text-xs text-muted-foreground">{affiliate.points} pontos • {affiliate.level}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1.5">Performance</div>
                        <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500 shadow-neon" 
                            style={{ width: `${affiliate.performance || 0}%` }}
                          />
                        </div>
                        <div className="text-right text-sm font-bold gradient-text mt-1">
                          {affiliate.performance ? `${affiliate.performance}%` : "0%"}
                        </div>
                      </div>

                      <div className="flex justify-between text-xs pt-3 border-t border-border/50">
                        <div className="text-center">
                          <div className="text-accent font-bold text-sm">{affiliate.posted}</div>
                          <div className="text-muted-foreground">Postou</div>
                        </div>
                        <div className="text-center">
                          <div className="text-destructive font-bold text-sm">{affiliate.notPosted}</div>
                          <div className="text-muted-foreground">Não Postou</div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted-foreground font-bold text-sm">{affiliate.noAnalysis}</div>
                          <div className="text-muted-foreground">Sem Análise</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 bg-gradient-to-r from-primary to-accent text-white rounded-lg py-2 hover:shadow-neon transition-all duration-300 hover:scale-105 flex items-center justify-center">
                        <Edit className="w-3 h-3" />
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-secondary to-primary text-white rounded-lg py-2 hover:shadow-neon transition-all duration-300 hover:scale-105 flex items-center justify-center">
                        <Calendar className="w-3 h-3" />
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-destructive to-destructive/80 text-white rounded-lg py-2 hover:shadow-glow transition-all duration-300 hover:scale-105 flex items-center justify-center">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    {affiliate.noRegistro && (
                      <button className="w-full mt-2 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-lg py-2 text-xs sm:text-sm font-medium hover:shadow-glow transition-all duration-300 hover:scale-105">
                        Começar a marcar
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          </TabsContent>

          {/* ABA 2 - GAMIFICAÇÃO */}
          <TabsContent value="gamificacao" className="space-y-6 sm:space-y-8 animate-fade-in">
            <GlassCard>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-secondary to-accent">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <span className="gradient-text">Sistema de Gamificação</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">Acompanhe pontuação, níveis e conquistas das suas afiliadas</p>
                </div>
                <div className="glass-card flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl border border-border/50">
                  <button className="text-primary hover:scale-110 transition-transform"><ChevronLeft className="w-4 h-4" /></button>
                  <span className="text-xs sm:text-sm font-medium">novembro de 2025</span>
                  <button className="text-primary hover:scale-110 transition-transform"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Como Funciona a Pontuação */}
              <div className="mb-8">
                <h3 className="text-base sm:text-lg font-bold flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="gradient-text">Como Funciona a Pontuação</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="glass-card border-l-4 border-accent rounded-xl p-4 hover:shadow-glow transition-all duration-300">
                    <div className="font-bold text-accent mb-1 text-sm sm:text-base">Postou Completo (Ganha 15 pontos)</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Postou sobre o dia + sobre o produto</div>
                  </div>
                  <div className="glass-card border-l-4 border-yellow-500 rounded-xl p-4 hover:shadow-glow transition-all duration-300">
                    <div className="font-bold text-yellow-600 mb-1 text-sm sm:text-base">Atenção (Ganha 10 pontos)</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Postou somente sobre o dia sem falar do produto / ou postou somente sobre o produto e não postou sobre o dia</div>
                  </div>
                  <div className="glass-card border-l-4 border-destructive rounded-xl p-4 hover:shadow-glow transition-all duration-300">
                    <div className="font-bold text-destructive mb-1 text-sm sm:text-base">Não postou</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Não realizou postagem</div>
                  </div>
                  <div className="glass-card border-l-4 border-muted rounded-xl p-4 hover:shadow-glow transition-all duration-300">
                    <div className="font-bold text-muted-foreground mb-1 text-sm sm:text-base">Sem Análise</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Dia neutro</div>
                  </div>
                </div>
              </div>

              {/* Dica */}
              <div className="glass-card border-l-4 border-primary rounded-xl p-4 mb-8 animate-pulse-slow">
                <div className="flex gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary flex-shrink-0">
                    <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold gradient-text mb-1 text-sm sm:text-base">Dica:</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Complete conquistas para ganhar pontos extras! Cada conquista tem sua própria recompensa em pontos.</div>
                  </div>
                </div>
              </div>

              {/* Ranking de Pontuação */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
                    <Award className="w-5 h-5 text-secondary" />
                    <span className="gradient-text">Ranking de Pontuação</span>
                  </h3>
                  <div className="text-left sm:text-right">
                    <div className="text-sm font-bold gradient-text">novembro de 2025</div>
                    <div className="text-xs text-muted-foreground">Pontuação do mês selecionado</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {rankingData.map((user) => (
                    <div key={user.position} className="glass-card-hover rounded-2xl p-4 border border-border/50 group">
                      <div className="flex items-center gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-white font-bold text-lg shadow-neon flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          {user.position}
                        </div>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-muted to-muted-foreground/50 flex items-center justify-center text-white font-bold flex-shrink-0">
                          {user.position}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm sm:text-base">{user.name}</div>
                          <div className="text-xs text-muted-foreground mb-1.5">{user.level}</div>
                          <div className="flex items-center gap-2">
                            <div className="text-xs text-muted-foreground whitespace-nowrap">XP: {user.xp}/{user.maxXp}</div>
                            <div className="flex-1 bg-muted/30 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-accent to-primary h-2 rounded-full transition-all duration-500 shadow-neon" 
                                style={{ width: `${(user.xp / user.maxXp) * 100}%` }}
                              />
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">Nenhuma conquista ainda</div>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="text-center">
                            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold shadow-glow">
                              {user.days}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">dias</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold gradient-text text-lg sm:text-xl">{user.points} pts</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </TabsContent>

          {/* ABA 3 - MÉTRICAS */}
          <TabsContent value="metricas" className="space-y-6 sm:space-y-8 animate-fade-in">
            <GlassCard>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-accent to-primary">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <span className="gradient-text">Métricas Mensais</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">Acompanhe o desempenho detalhado das suas afiliadas</p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Buscar afiliada..." className="pl-10 w-full sm:w-64 glass-card border-border/50 focus:border-primary transition-all" />
                  </div>
                  <div className="glass-card flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl border border-border/50">
                    <button className="text-primary hover:scale-110 transition-transform"><ChevronLeft className="w-4 h-4" /></button>
                    <span className="text-xs sm:text-sm font-medium whitespace-nowrap">novembro de 2025</span>
                    <button className="text-primary hover:scale-110 transition-transform"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>

              {/* Cards de Métricas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                <div className="glass-card-hover border border-border/50 rounded-2xl p-4 sm:p-6 group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-neon group-hover:scale-110 transition-transform duration-300">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl sm:text-4xl font-bold gradient-text">20</div>
                      <div className="text-xs sm:text-sm text-muted-foreground mt-1">Total de Postagens</div>
                      <div className="text-xs text-muted-foreground/70">No mês selecionado</div>
                    </div>
                  </div>
                </div>

                <div className="glass-card-hover border border-border/50 rounded-2xl p-4 sm:p-6 group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-accent to-primary shadow-neon group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl sm:text-4xl font-bold gradient-text">0/0</div>
                      <div className="text-xs sm:text-sm text-muted-foreground mt-1">Metas Cumpridas</div>
                      <div className="text-xs text-muted-foreground/70">Nenhuma meta definida</div>
                    </div>
                  </div>
                </div>

                <div className="glass-card-hover border border-border/50 rounded-2xl p-4 sm:p-6 group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-secondary to-accent shadow-neon group-hover:scale-110 transition-transform duration-300">
                      <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-bold gradient-text">Sem dados</div>
                      <div className="text-xs sm:text-sm text-muted-foreground mt-1">Melhor Performance</div>
                      <div className="text-xs text-muted-foreground/70">Sem dados suficientes</div>
                    </div>
                  </div>
                </div>

                <div className="glass-card-hover border border-border/50 rounded-2xl p-4 sm:p-6 group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent shadow-neon group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl sm:text-4xl font-bold gradient-text">32</div>
                      <div className="text-xs sm:text-sm text-muted-foreground mt-1">Afiliadas Ativas</div>
                      <div className="text-xs text-muted-foreground/70">Total cadastradas</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabela de Detalhamento */}
              <div>
                <h3 className="text-base sm:text-lg font-bold flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="gradient-text">Detalhamento por Afiliada</span>
                </h3>
                <div className="overflow-x-auto rounded-xl border border-border/50">
                  <table className="w-full">
                    <thead>
                      <tr className="glass-card border-b border-border/50">
                        <th className="text-left py-3 px-4 text-xs sm:text-sm font-semibold">Afiliada</th>
                        <th className="text-center py-3 px-4 text-xs sm:text-sm font-semibold">Postagens</th>
                        <th className="text-center py-3 px-4 text-xs sm:text-sm font-semibold hidden sm:table-cell">Meta</th>
                        <th className="text-center py-3 px-4 text-xs sm:text-sm font-semibold hidden md:table-cell">Cumprimento</th>
                        <th className="text-center py-3 px-4 text-xs sm:text-sm font-semibold hidden lg:table-cell">Streak</th>
                        <th className="text-center py-3 px-4 text-xs sm:text-sm font-semibold">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {affiliates.map((affiliate, index) => (
                        <tr key={index} className="border-b border-border/30 hover:bg-muted/10 transition-colors">
                          <td className="py-4 px-4">
                            <div className="font-semibold text-sm">{affiliate.name}</div>
                            <div className="text-xs text-muted-foreground">{affiliate.username}</div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="font-bold text-accent text-base sm:text-lg">{affiliate.posted || 0}</div>
                            <div className="flex justify-center gap-2 mt-1">
                              <span className="text-xs text-accent">✅{affiliate.posted || 0}</span>
                              <span className="text-xs text-destructive">❌{affiliate.notPosted || 0}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center text-muted-foreground text-sm hidden sm:table-cell">-</td>
                          <td className="py-4 px-4 text-center text-xs sm:text-sm text-muted-foreground hidden md:table-cell">Sem meta</td>
                          <td className="py-4 px-4 text-center text-muted-foreground text-sm hidden lg:table-cell">-</td>
                          <td className="py-4 px-4">
                            <div className="flex justify-center gap-2">
                              <button className="bg-gradient-to-r from-primary to-accent text-white rounded-lg px-2 sm:px-3 py-1.5 hover:shadow-neon transition-all duration-300 hover:scale-105 flex items-center">
                                <Edit className="w-3 h-3" />
                              </button>
                              <button className="bg-gradient-to-r from-destructive to-destructive/80 text-white rounded-lg px-2 sm:px-3 py-1.5 hover:shadow-glow transition-all duration-300 hover:scale-105 flex items-center">
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </div>

      {/* Rodapé */}
      <footer className="glass-card text-center py-6 sm:py-8 text-xs sm:text-sm text-muted-foreground mt-8 sm:mt-12 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <a href="#" className="hover:text-primary transition-colors smooth-transition">Condições e suporte</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-primary transition-colors smooth-transition">Política de Privacidade</a>
            <span className="hidden sm:inline">|</span>
            <span>Criado com o Canva</span>
          </div>
        </div>
      </footer>
      </div>
    </DashboardLayout>
  );
}
