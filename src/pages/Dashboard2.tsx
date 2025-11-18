import { useState } from "react";
import { Users, CheckCircle, UserX, Star, FileText, Target, TrendingUp, Calendar, Search, Grid3x3, List, Edit, Trash2, ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard2() {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header com gradiente */}
      <div className="bg-gradient-to-r from-[#D946EF] to-[#EF4444] text-white px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Painel de Gestão de Afiliados - Aylle Duarte</h1>
          <p className="text-white/90">Acompanhe o desempenho dos seus afiliados em tempo real</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-8 -mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white shadow-lg p-2 rounded-full inline-flex gap-2">
            <TabsTrigger 
              value="dashboard" 
              className="rounded-full px-6 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D946EF] data-[state=active]:to-[#EF4444] data-[state=active]:text-white"
            >
              📊 Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="gamificacao" 
              className="rounded-full px-6 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D946EF] data-[state=active]:to-[#EF4444] data-[state=active]:text-white"
            >
              🏆 Gamificação
            </TabsTrigger>
            <TabsTrigger 
              value="metricas" 
              className="rounded-full px-6 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D946EF] data-[state=active]:to-[#EF4444] data-[state=active]:text-white"
            >
              📈 Métricas
            </TabsTrigger>
          </TabsList>

          {/* ABA 1 - DASHBOARD */}
          <TabsContent value="dashboard" className="mt-8 space-y-8">
            {/* Cards de indicadores */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#A21CAF] rounded-xl p-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[#A21CAF]">31</div>
                    <div className="text-sm text-[#6B7280] mt-1">Total de Afiliadas Ativas</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#A21CAF] rounded-xl p-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[#A21CAF]">88.9%</div>
                    <div className="text-sm text-[#6B7280] mt-1">Taxa Média de Cumprimento</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#A21CAF] rounded-xl p-3">
                    <UserX className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[#A21CAF]">4</div>
                    <div className="text-sm text-[#6B7280] mt-1">Total de Afiliados Inativos</div>
                    <div className="text-xs text-[#6B7280]">Nunca fizeram postagens</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#A21CAF] rounded-xl p-3">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#A21CAF]">Amanda</div>
                    <div className="text-sm text-[#6B7280] mt-1">Afiliada Destaque</div>
                    <div className="text-xs text-[#6B7280]">100.0% de cumprimento</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Adicionar Nova Afiliada */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-[#1F1F1F] mb-6 flex items-center gap-2">
                <span className="text-2xl">➕</span> Adicionar Nova Afiliada
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-[#1F1F1F] mb-2 block">Nome Completo</label>
                  <Input placeholder="" className="border-gray-300" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1F1F1F] mb-2 block">Instagram (sem @)</label>
                  <Input placeholder="" className="border-gray-300" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1F1F1F] mb-2 block">Link do Instagram</label>
                  <Input placeholder="https://instagram.com/usuario" className="border-gray-300" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1F1F1F] mb-2 block">Observações</label>
                  <Input placeholder="" className="border-gray-300" />
                </div>
              </div>
              <Button className="w-full bg-[#16A34A] hover:bg-[#15803d] text-white py-6 text-lg font-semibold">
                ✅ Adicionar Afiliada
              </Button>
            </div>

            {/* Gerenciar Afiliadas */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#1F1F1F] flex items-center gap-2">
                  <Users className="w-6 h-6" /> Gerenciar Afiliadas
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                    <Calendar className="w-4 h-4 text-[#A21CAF]" />
                    <button className="text-[#A21CAF]"><ChevronLeft className="w-4 h-4" /></button>
                    <span className="text-sm font-medium text-[#1F1F1F]">nov. de 2025</span>
                    <button className="text-[#A21CAF]"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded ${viewMode === "grid" ? "bg-[#A21CAF] text-white" : "bg-gray-100"}`}
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded ${viewMode === "list" ? "bg-[#A21CAF] text-white" : "bg-gray-100"}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid de afiliadas */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {affiliates.map((affiliate, index) => (
                  <div key={index} className="bg-[#FEF3F2] rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#FACC15] flex items-center justify-center text-white font-bold">
                        {affiliate.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-[#1F1F1F]">{affiliate.name}</div>
                        <div className="text-xs text-[#6B7280]">{affiliate.username}</div>
                        <div className="text-xs text-[#6B7280]">{affiliate.points} pontos • {affiliate.level}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <div className="text-xs text-[#6B7280] mb-1">Performance</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#A21CAF] h-2 rounded-full" 
                            style={{ width: `${affiliate.performance || 0}%` }}
                          />
                        </div>
                        <div className="text-right text-sm font-semibold text-[#A21CAF] mt-1">
                          {affiliate.performance ? `${affiliate.performance}%` : "0%"}
                        </div>
                      </div>

                      <div className="flex justify-between text-xs pt-2 border-t">
                        <div className="text-center">
                          <div className="text-[#16A34A] font-bold">{affiliate.posted}</div>
                          <div className="text-[#6B7280]">Postou</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[#DC2626] font-bold">{affiliate.notPosted}</div>
                          <div className="text-[#6B7280]">Não Postou</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[#6B7280] font-bold">{affiliate.noAnalysis}</div>
                          <div className="text-[#6B7280]">Sem Análise</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 bg-[#3B82F6] text-white rounded-lg py-2 hover:bg-[#2563EB] flex items-center justify-center gap-1">
                        <Edit className="w-3 h-3" />
                      </button>
                      <button className="flex-1 bg-[#DC2626] text-white rounded-lg py-2 hover:bg-[#B91C1C] flex items-center justify-center gap-1">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    {affiliate.noRegistro && (
                      <button className="w-full mt-2 bg-gradient-to-r from-[#D946EF] to-[#EF4444] text-white rounded-lg py-2 text-sm">
                        Começar a marcar
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ABA 2 - GAMIFICAÇÃO */}
          <TabsContent value="gamificacao" className="mt-8 space-y-8">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#1F1F1F] flex items-center gap-2 mb-2">
                    🏆 Sistema de Gamificação
                  </h2>
                  <p className="text-sm text-[#6B7280]">Acompanhe pontuação, níveis e conquistas das suas afiliadas</p>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                  <button className="text-[#A21CAF]"><ChevronLeft className="w-4 h-4" /></button>
                  <span className="text-sm font-medium text-[#1F1F1F]">novembro de 2025</span>
                  <button className="text-[#A21CAF]"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Como Funciona a Pontuação */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#1F1F1F] flex items-center gap-2 mb-4">
                  📋 Como Funciona a Pontuação
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#D1FAE5] border border-[#16A34A] rounded-xl p-4">
                    <div className="font-bold text-[#16A34A] mb-1">Postou Completo (Ganha 15 pontos)</div>
                    <div className="text-sm text-[#1F1F1F]">Postou sobre o dia + sobre o produto</div>
                  </div>
                  <div className="bg-[#FEF3C7] border border-[#FACC15] rounded-xl p-4">
                    <div className="font-bold text-[#B45309] mb-1">Atenção (Ganha 10 pontos)</div>
                    <div className="text-sm text-[#1F1F1F]">Postou somente sobre o dia sem falar do produto / ou postou somente sobre o produto e não postou sobre o dia</div>
                  </div>
                  <div className="bg-[#FEE2E2] border border-[#DC2626] rounded-xl p-4">
                    <div className="font-bold text-[#DC2626] mb-1">Não postou</div>
                    <div className="text-sm text-[#1F1F1F]">Não realizou postagem</div>
                  </div>
                  <div className="bg-gray-100 border border-gray-300 rounded-xl p-4">
                    <div className="font-bold text-[#6B7280] mb-1">Sem Análise</div>
                    <div className="text-sm text-[#1F1F1F]">Dia neutro</div>
                  </div>
                </div>
              </div>

              {/* Dica */}
              <div className="bg-[#DBEAFE] border border-[#3B82F6] rounded-xl p-4 mb-8">
                <div className="flex gap-3">
                  <Lightbulb className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#1F1F1F] mb-1">💡 Dica:</div>
                    <div className="text-sm text-[#1F1F1F]">Complete conquistas para ganhar pontos extras! Cada conquista tem sua própria recompensa em pontos.</div>
                  </div>
                </div>
              </div>

              {/* Ranking de Pontuação */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#1F1F1F] flex items-center gap-2">
                    🏆 Ranking de Pontuação
                  </h3>
                  <div className="text-right">
                    <div className="text-sm font-bold text-[#A21CAF]">novembro de 2025</div>
                    <div className="text-xs text-[#6B7280]">Pontuação do mês selecionado</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {rankingData.map((user) => (
                    <div key={user.position} className="bg-[#FEF3F2] rounded-xl p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#D946EF] to-[#EF4444] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {user.position}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {user.position}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-[#1F1F1F]">{user.name}</div>
                        <div className="text-xs text-[#6B7280] mb-1">{user.level}</div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-[#6B7280]">XP: {user.xp}/{user.maxXp}</div>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#16A34A] h-2 rounded-full" 
                              style={{ width: `${(user.xp / user.maxXp) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-xs text-[#6B7280] mt-1">Nenhuma conquista ainda</div>
                      </div>
                      <div className="text-right">
                        <div className="bg-[#FF8C42] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mb-1">
                          {user.days}
                        </div>
                        <div className="text-xs text-[#6B7280]">dias</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#1F1F1F] text-lg">{user.points} pts</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ABA 3 - MÉTRICAS */}
          <TabsContent value="metricas" className="mt-8 space-y-8">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#1F1F1F] flex items-center gap-2 mb-2">
                    📊 Métricas Mensais
                  </h2>
                  <p className="text-sm text-[#6B7280]">Acompanhe o desempenho detalhado das suas afiliadas</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Buscar afiliada..." className="pl-10 w-64" />
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                    <button className="text-[#A21CAF]"><ChevronLeft className="w-4 h-4" /></button>
                    <span className="text-sm font-medium text-[#1F1F1F]">novembro de 2025</span>
                    <button className="text-[#A21CAF]"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>

              {/* Cards de Métricas */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#A21CAF] rounded-xl p-3">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-[#A21CAF]">20</div>
                      <div className="text-sm text-[#6B7280] mt-1">Total de Postagens</div>
                      <div className="text-xs text-[#6B7280]">No mês selecionado</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#A21CAF] rounded-xl p-3">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-[#A21CAF]">0/0</div>
                      <div className="text-sm text-[#6B7280] mt-1">Metas Cumpridas</div>
                      <div className="text-xs text-[#6B7280]">Nenhuma meta definida</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#A21CAF] rounded-xl p-3">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#A21CAF]">Sem dados</div>
                      <div className="text-sm text-[#6B7280] mt-1">Melhor Performance</div>
                      <div className="text-xs text-[#6B7280]">Sem dados suficientes</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#A21CAF] rounded-xl p-3">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-[#A21CAF]">32</div>
                      <div className="text-sm text-[#6B7280] mt-1">Afiliadas Ativas</div>
                      <div className="text-xs text-[#6B7280]">Total cadastradas</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabela de Detalhamento */}
              <div>
                <h3 className="text-lg font-bold text-[#1F1F1F] flex items-center gap-2 mb-4">
                  📋 Detalhamento por Afiliada
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-[#1F1F1F]">Afiliada</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-[#1F1F1F]">Postagens</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-[#1F1F1F]">Meta</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-[#1F1F1F]">Cumprimento</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-[#1F1F1F]">Streak</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-[#1F1F1F]">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {affiliates.map((affiliate, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="font-semibold text-[#1F1F1F]">{affiliate.name}</div>
                            <div className="text-xs text-[#6B7280]">{affiliate.username}</div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="font-bold text-[#16A34A] text-lg">{affiliate.posted || 0}</div>
                            <div className="flex justify-center gap-2 mt-1">
                              <span className="text-xs">✅{affiliate.posted || 0}</span>
                              <span className="text-xs">❌{affiliate.notPosted || 0}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center text-[#6B7280]">-</td>
                          <td className="py-4 px-4 text-center text-sm text-[#6B7280]">Sem meta</td>
                          <td className="py-4 px-4 text-center text-[#6B7280]">-</td>
                          <td className="py-4 px-4">
                            <div className="flex justify-center gap-2">
                              <button className="bg-[#3B82F6] text-white rounded-lg px-3 py-1.5 hover:bg-[#2563EB] flex items-center gap-1">
                                <Edit className="w-3 h-3" />
                              </button>
                              <button className="bg-[#DC2626] text-white rounded-lg px-3 py-1.5 hover:bg-[#B91C1C] flex items-center gap-1">
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
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Rodapé */}
      <footer className="text-center py-8 text-sm text-[#6B7280] mt-12">
        <div className="flex items-center justify-center gap-4">
          <a href="#" className="hover:text-[#1F1F1F]">Condições e suporte</a>
          <span>|</span>
          <a href="#" className="hover:text-[#1F1F1F]">Política de Privacidade</a>
          <span>|</span>
          <span>Criado com o Canva</span>
        </div>
      </footer>
    </div>
  );
}
