import { DashboardLayout } from "@/components/DashboardLayout";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Settings as SettingsIcon, User, Bell, Shield, CreditCard, Palette } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Perfil", icon: User },
    { id: "notifications", label: "Notificações", icon: Bell },
    { id: "security", label: "Segurança", icon: Shield },
    { id: "billing", label: "Faturamento", icon: CreditCard },
    { id: "appearance", label: "Aparência", icon: Palette },
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <SettingsIcon className="w-10 h-10 text-neon-blue animate-glow" />
            Configurações
          </h1>
          <p className="text-muted-foreground">
            Gerencie as configurações da sua conta e da plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <GlassCard className="p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-neon-blue/20 to-neon-violet/20 border border-neon-blue/30 text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </GlassCard>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold mb-6">Informações do Perfil</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-blue to-neon-violet flex items-center justify-center font-bold text-3xl">
                      G
                    </div>
                    <div>
                      <NeonButton variant="glass">Alterar Foto</NeonButton>
                      <p className="text-sm text-muted-foreground mt-2">
                        JPG, PNG ou GIF. Máximo 2MB.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        defaultValue="Gestor Admin"
                        className="glass-card border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="gestor@email.com"
                        className="glass-card border-white/10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Nome da Empresa</Label>
                    <Input
                      id="company"
                      defaultValue="Minha Empresa LTDA"
                      className="glass-card border-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Sobre</Label>
                    <Textarea
                      id="bio"
                      placeholder="Conte um pouco sobre sua empresa..."
                      className="glass-card border-white/10 min-h-[100px]"
                    />
                  </div>

                  <div className="flex gap-4">
                    <NeonButton variant="neon">Salvar Alterações</NeonButton>
                    <NeonButton variant="glass">Cancelar</NeonButton>
                  </div>
                </div>
              </GlassCard>
            )}

            {activeTab === "notifications" && (
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold mb-6">Preferências de Notificação</h2>
                <div className="space-y-6">
                  {[
                    { label: "Novas conquistas desbloqueadas", description: "Receba notificações quando alguém desbloquear uma conquista" },
                    { label: "Missões completadas", description: "Notificações sobre missões concluídas pela equipe" },
                    { label: "Novos membros", description: "Avisos quando novos membros entrarem na equipe" },
                    { label: "Relatórios semanais", description: "Resumo semanal do desempenho da equipe" },
                    { label: "Avisos de sistema", description: "Atualizações e manutenções programadas" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start justify-between p-4 rounded-xl bg-white/5">
                      <div className="flex-1">
                        <p className="font-medium mb-1">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <button className="w-12 h-6 rounded-full bg-neon-blue relative ml-4">
                        <div className="w-5 h-5 rounded-full bg-white absolute right-0.5 top-0.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {activeTab === "security" && (
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold mb-6">Segurança</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <Input
                      id="current-password"
                      type="password"
                      className="glass-card border-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input
                      id="new-password"
                      type="password"
                      className="glass-card border-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      className="glass-card border-white/10"
                    />
                  </div>

                  <NeonButton variant="neon">Alterar Senha</NeonButton>

                  <div className="pt-6 border-t border-white/10">
                    <h3 className="font-semibold mb-4">Autenticação de Dois Fatores</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Adicione uma camada extra de segurança à sua conta
                    </p>
                    <NeonButton variant="glass">Ativar 2FA</NeonButton>
                  </div>
                </div>
              </GlassCard>
            )}

            {activeTab === "billing" && (
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold mb-6">Faturamento e Assinatura</h2>
                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-gradient-to-br from-neon-blue/10 to-neon-violet/10 border border-neon-blue/20">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">Plano Professional</h3>
                        <p className="text-muted-foreground">Até 50 membros</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-neon-blue">R$ 197</p>
                        <p className="text-sm text-muted-foreground">/mês</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Próxima cobrança em 15 de Janeiro de 2025
                    </p>
                    <div className="flex gap-4">
                      <NeonButton variant="glass">Alterar Plano</NeonButton>
                      <NeonButton variant="outline" className="text-destructive">
                        Cancelar Assinatura
                      </NeonButton>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Método de Pagamento</h3>
                    <div className="p-4 rounded-xl bg-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-8 h-8 text-neon-blue" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expira em 12/2025</p>
                        </div>
                      </div>
                      <NeonButton variant="glass">Alterar</NeonButton>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Histórico de Pagamentos</h3>
                    <div className="space-y-2">
                      {[
                        { date: "01/12/2024", amount: "R$ 197,00", status: "Pago" },
                        { date: "01/11/2024", amount: "R$ 197,00", status: "Pago" },
                        { date: "01/10/2024", amount: "R$ 197,00", status: "Pago" },
                      ].map((payment, index) => (
                        <div key={index} className="p-4 rounded-xl bg-white/5 flex items-center justify-between">
                          <div>
                            <p className="font-medium">{payment.date}</p>
                            <p className="text-sm text-muted-foreground">Plano Professional</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{payment.amount}</p>
                            <p className="text-sm text-neon-turquoise">{payment.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            )}

            {activeTab === "appearance" && (
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold mb-6">Aparência</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Tema</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <button className="p-6 rounded-xl bg-gradient-to-br from-background to-muted border-2 border-neon-blue">
                        <div className="w-full h-20 rounded-lg bg-background mb-3" />
                        <p className="font-medium">Escuro</p>
                      </button>
                      <button className="p-6 rounded-xl bg-white/5 border-2 border-white/10 hover:border-white/20 transition-colors">
                        <div className="w-full h-20 rounded-lg bg-white mb-3" />
                        <p className="font-medium text-muted-foreground">Claro</p>
                      </button>
                      <button className="p-6 rounded-xl bg-white/5 border-2 border-white/10 hover:border-white/20 transition-colors">
                        <div className="w-full h-20 rounded-lg bg-gradient-to-r from-background to-white mb-3" />
                        <p className="font-medium text-muted-foreground">Auto</p>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Cor de Destaque</h3>
                    <div className="grid grid-cols-6 gap-4">
                      {[
                        { color: "from-neon-blue to-neon-turquoise", label: "Azul" },
                        { color: "from-neon-violet to-purple-600", label: "Violeta" },
                        { color: "from-neon-turquoise to-green-500", label: "Turquesa" },
                        { color: "from-red-500 to-orange-500", label: "Vermelho" },
                        { color: "from-yellow-400 to-orange-500", label: "Amarelo" },
                        { color: "from-green-500 to-emerald-600", label: "Verde" },
                      ].map((item, index) => (
                        <button
                          key={index}
                          className={`aspect-square rounded-xl bg-gradient-to-br ${item.color} ${index === 0 ? "ring-2 ring-white ring-offset-2 ring-offset-background" : ""}`}
                          title={item.label}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
