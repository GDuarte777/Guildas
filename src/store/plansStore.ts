import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PlanFeature {
  id: string;
  text: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  description: string;
  features: PlanFeature[];
  isPopular?: boolean;
  gatewayId?: string; // Stripe/Asaas Product ID
  color?: string; // Cor de destaque para o card
}

interface PlansStore {
  plans: Plan[];
  addPlan: (plan: Plan) => void;
  updatePlan: (id: string, updates: Partial<Plan>) => void;
  deletePlan: (id: string) => void;
  getPlan: (id: string) => Plan | undefined;
}

export const usePlansStore = create<PlansStore>()(
  persist(
    (set, get) => ({
      plans: [
        {
          id: 'starter',
          name: 'Starter',
          price: 29.90,
          interval: 'monthly',
          description: 'Para quem está começando a escalar suas vendas.',
          features: [
            { id: '1', text: 'Até 50 Afiliados', included: true },
            { id: '2', text: 'Dashboard Básico', included: true },
            { id: '3', text: 'Suporte por Email', included: true },
            { id: '4', text: 'Gamificação Avançada', included: false },
          ],
          color: 'from-blue-500 to-cyan-400',
          isPopular: false
        },
        {
          id: 'pro',
          name: 'Pro',
          price: 59.90,
          interval: 'monthly',
          description: 'Ideal para gestores que querem alta performance.',
          features: [
            { id: '1', text: 'Afiliados Ilimitados', included: true },
            { id: '2', text: 'Dashboard Completo', included: true },
            { id: '3', text: 'Suporte Prioritário', included: true },
            { id: '4', text: 'Gamificação Avançada', included: true },
            { id: '5', text: 'Integração Google Sheets', included: true },
          ],
          color: 'from-purple-500 to-pink-500',
          isPopular: true
        }
      ],
      addPlan: (plan) => set((state) => ({ plans: [...state.plans, plan] })),
      updatePlan: (id, updates) => set((state) => ({
        plans: state.plans.map((plan) => plan.id === id ? { ...plan, ...updates } : plan)
      })),
      deletePlan: (id) => set((state) => ({
        plans: state.plans.filter((plan) => plan.id !== id)
      })),
      getPlan: (id) => get().plans.find((p) => p.id === id)
    }),
    {
      name: 'plans-storage',
    }
  )
);
