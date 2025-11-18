import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { Link } from "react-router-dom";
import { CheckCircle2, X } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "R$ 97",
      period: "/mês",
      description: "Ideal para equipes pequenas começando com gamificação",
      features: [
        { text: "Até 10 membros", included: true },
        { text: "Níveis e XP básicos", included: true },
        { text: "5 conquistas padrão", included: true },
        { text: "Calendário individual", included: true },
        { text: "Ranking básico", included: true },
        { text: "Suporte por email", included: true },
        { text: "Conquistas personalizadas", included: false },
        { text: "Missões ilimitadas", included: false },
        { text: "API de integração", included: false },
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "R$ 197",
      period: "/mês",
      description: "Para equipes que querem personalização total",
      features: [
        { text: "Até 50 membros", included: true },
        { text: "Personalização total", included: true },
        { text: "Conquistas ilimitadas", included: true },
        { text: "Missões personalizadas", included: true },
        { text: "Calendário avançado", included: true },
        { text: "Ranking com filtros", included: true },
        { text: "Suporte prioritário", included: true },
        { text: "Relatórios avançados", included: true },
        { text: "5 equipes", included: true },
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Sob consulta",
      period: "",
      description: "Solução completa para grandes organizações",
      features: [
        { text: "Membros ilimitados", included: true },
        { text: "Equipes ilimitadas", included: true },
        { text: "White label", included: true },
        { text: "API completa", included: true },
        { text: "Integrações customizadas", included: true },
        { text: "Gerente de conta dedicado", included: true },
        { text: "Treinamento in-company", included: true },
        { text: "SLA garantido 99.9%", included: true },
        { text: "Suporte 24/7", included: true },
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "Posso mudar de plano depois?",
      answer: "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.",
    },
    {
      question: "O que acontece se eu exceder o limite de membros?",
      answer: "Você receberá uma notificação para fazer upgrade do plano. Seus dados continuam seguros.",
    },
    {
      question: "Tem desconto para pagamento anual?",
      answer: "Sim! No pagamento anual você ganha 2 meses grátis (economize 16%).",
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer: "Sim, sem multas ou taxas. Seus dados ficam disponíveis por 30 dias após cancelamento.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Planos para <span className="gradient-text">qualquer equipe</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal e comece a transformar sua equipe hoje mesmo.
            14 dias grátis, sem cartão de crédito.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <GlassCard
              key={index}
              hover
              className={`p-8 ${
                plan.popular
                  ? "border-2 border-neon-blue relative lg:scale-105"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-gradient-to-r from-neon-blue to-neon-violet rounded-full text-sm font-semibold">
                  Mais Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 min-h-[40px]">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground text-lg">
                      {plan.period}
                    </span>
                  )}
                </div>
                <Link to="/checkout">
                  <NeonButton
                    variant={plan.popular ? "neon" : "glass"}
                    className="w-full"
                  >
                    {plan.name === "Enterprise"
                      ? "Falar com Vendas"
                      : "Começar Grátis"}
                  </NeonButton>
                </Link>
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {feature.included ? (
                      <CheckCircle2 className="w-5 h-5 text-neon-blue flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={
                        feature.included
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Perguntas Frequentes</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <GlassCard key={index} hover className="p-6">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <GlassCard className="text-center p-12 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ainda tem dúvidas?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Nossa equipe está pronta para ajudar você a escolher o melhor plano
          </p>
          <Link to="/support">
            <NeonButton variant="neon" className="text-lg px-8 py-4">
              Falar com Especialista
            </NeonButton>
          </Link>
        </GlassCard>
      </section>

      <Footer />
    </div>
  );
}
