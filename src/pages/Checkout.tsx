import { useState } from "react";
import { Link } from "react-router-dom";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock } from "lucide-react";
import logo from "@/assets/logo.png";

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cpf: "",
  });

  const selectedPlan = {
    name: "Professional",
    price: "R$ 197",
    period: "/mês",
    features: [
      "Até 50 membros",
      "Personalização total",
      "Conquistas ilimitadas",
      "Suporte prioritário",
    ],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Checkout:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl animate-fade-in-up">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <img src={logo} alt="GameTeam" className="h-12 w-auto" />
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <GlassCard className="p-8 lg:order-last">
            <h2 className="text-2xl font-bold mb-6">Resumo do Pedido</h2>

            <div className="p-6 rounded-xl bg-gradient-to-br from-neon-blue/10 to-neon-violet/10 border border-white/10 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{selectedPlan.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    Plano Mensal
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{selectedPlan.price}</div>
                  <div className="text-sm text-muted-foreground">
                    {selectedPlan.period}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-sm font-medium mb-2">Incluído:</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {selectedPlan.features.map((feature, i) => (
                    <li key={i}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>R$ 197,00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Desconto (14 dias grátis)</span>
                <span className="text-neon-blue">-R$ 90,00</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between text-xl font-bold">
                <span>Total hoje</span>
                <span>R$ 0,00</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-neon-blue/10 border border-neon-blue/20">
              <p className="text-sm text-center">
                <Lock className="w-4 h-4 inline mr-1" />
                Cobrança de R$ 197,00 após 14 dias
              </p>
            </div>
          </GlassCard>

          {/* Payment Form */}
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold mb-6">Dados de Pagamento</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-blue to-neon-violet flex items-center justify-center text-sm">
                    1
                  </div>
                  Informações Pessoais
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    placeholder="Como está no cartão"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="glass-card border-white/10"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="glass-card border-white/10"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) =>
                      setFormData({ ...formData, cpf: e.target.value })
                    }
                    className="glass-card border-white/10"
                    required
                  />
                </div>
              </div>

              {/* Card Info */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-blue to-neon-violet flex items-center justify-center text-sm">
                    2
                  </div>
                  Cartão de Crédito
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Número do cartão</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, cardNumber: e.target.value })
                      }
                      className="glass-card border-white/10 pl-10"
                      required
                    />
                    <CreditCard className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Validade</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/AA"
                      value={formData.expiry}
                      onChange={(e) =>
                        setFormData({ ...formData, expiry: e.target.value })
                      }
                      className="glass-card border-white/10"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      type="password"
                      maxLength={4}
                      value={formData.cvv}
                      onChange={(e) =>
                        setFormData({ ...formData, cvv: e.target.value })
                      }
                      className="glass-card border-white/10"
                      required
                    />
                  </div>
                </div>
              </div>

              <NeonButton type="submit" variant="neon" className="w-full text-lg py-6">
                <Lock className="w-5 h-5 mr-2" />
                Começar Teste Grátis
              </NeonButton>

              <p className="text-xs text-center text-muted-foreground">
                Ao confirmar, você concorda com nossos Termos de Uso e Política
                de Privacidade. Cancelamento gratuito a qualquer momento.
              </p>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
