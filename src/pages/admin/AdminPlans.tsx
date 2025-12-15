import { useState } from "react";
import { usePlansStore, Plan } from "@/store/plansStore";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { Plus, Edit, Trash2, Check, X, Star } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function AdminPlans() {
  const { plans, addPlan, updatePlan, deletePlan } = usePlansStore();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Partial<Plan>>({});

  const handleSave = () => {
    if (!currentPlan.name || !currentPlan.price) return;

    if (currentPlan.id) {
      updatePlan(currentPlan.id, currentPlan);
      toast.success("Plano atualizado!");
    } else {
      addPlan({
        ...currentPlan,
        id: crypto.randomUUID(),
        features: currentPlan.features || [],
        interval: currentPlan.interval || 'monthly'
      } as Plan);
      toast.success("Plano criado!");
    }
    setIsEditing(false);
    setCurrentPlan({});
  };

  const openEdit = (plan?: Plan) => {
    setCurrentPlan(plan || { features: [], color: 'from-blue-500 to-cyan-500' });
    setIsEditing(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold mb-1">Planos & Assinaturas</h1>
          <p className="text-muted-foreground">Gerencie os preços e funcionalidades.</p>
        </div>
        <NeonButton variant="primary" onClick={() => openEdit()}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Plano
        </NeonButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="relative group">
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${plan.color} rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500`} />
            <GlassCard className="relative h-full p-6 flex flex-col">
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-orange-500/20">
                  Mais Popular
                </div>
              )}
              
              <div className="mb-4">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 h-10">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold">R$ {plan.price}</span>
                <span className="text-muted-foreground">/{plan.interval === 'monthly' ? 'mês' : 'ano'}</span>
              </div>

              <div className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature.id} className="flex items-center gap-3 text-sm">
                    <div className={`p-1 rounded-full ${feature.included ? 'bg-green-500/20 text-green-400' : 'bg-red-500/10 text-red-400 opacity-50'}`}>
                      {feature.included ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    </div>
                    <span className={feature.included ? 'text-foreground' : 'text-muted-foreground line-through opacity-50'}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-auto">
                <button onClick={() => openEdit(plan)} className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-medium">
                  Editar
                </button>
                <button onClick={() => deletePlan(plan.id)} className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </GlassCard>
          </div>
        ))}
      </div>

      {/* Modal de Edição (Simplificado para demonstração) */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-black/90 backdrop-blur-2xl border-white/10">
          <DialogTitle className="sr-only">{currentPlan.id ? 'Editar Plano' : 'Novo Plano'}</DialogTitle>
          <h2 className="text-xl font-bold mb-4">{currentPlan.id ? 'Editar Plano' : 'Novo Plano'}</h2>
          <div className="space-y-4">
            <input 
              value={currentPlan.name || ''} 
              onChange={e => setCurrentPlan({...currentPlan, name: e.target.value})}
              placeholder="Nome do Plano"
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
            />
            <input 
              type="number"
              value={currentPlan.price || ''} 
              onChange={e => setCurrentPlan({...currentPlan, price: Number(e.target.value)})}
              placeholder="Preço"
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
            />
            <textarea 
              value={currentPlan.description || ''} 
              onChange={e => setCurrentPlan({...currentPlan, description: e.target.value})}
              placeholder="Descrição"
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
            />
            <NeonButton onClick={handleSave} className="w-full">Salvar</NeonButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
