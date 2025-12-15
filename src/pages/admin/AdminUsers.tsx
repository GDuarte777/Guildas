import { useState, useEffect } from "react";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { Search, MoreVertical, Shield, ShieldAlert, LogIn, Ban, CreditCard } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { usePlansStore } from "@/store/plansStore";
import { supabase } from "@/lib/supabase";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  plan: string;
}

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const { plans } = usePlansStore();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
      
      if (error) throw error;

      if (data) {
        setUsers(data.map(u => ({
          id: u.id,
          name: u.full_name || 'Sem nome',
          email: u.email || '',
          role: u.role || 'member',
          status: u.status || 'active',
          plan: u.plan_status || 'Free'
        })));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };
  
  const toggleRole = async (id: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "member" : "admin";
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', id);

      if (error) throw error;

      setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
      toast.success(`Permissão alterada para ${newRole}!`);
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Erro ao alterar permissão');
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
      toast.success(`Status alterado para ${newStatus === 'active' ? 'Ativo' : 'Bloqueado'}!`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Erro ao alterar status');
    }
  };

  const changePlan = async (userId: string, newPlanName: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ plan_status: newPlanName })
        .eq('id', userId);

      if (error) throw error;

      setUsers(users.map(u => u.id === userId ? { ...u, plan: newPlanName } : u));
      toast.success(`Plano alterado para ${newPlanName}`);
    } catch (error) {
      console.error('Error updating plan:', error);
      toast.error('Erro ao alterar plano');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Carregando usuários...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold mb-1">Usuários</h1>
          <p className="text-muted-foreground">Gerencie acessos e permissões.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar usuário..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 focus:border-purple-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())).map((user) => (
          <GlassCard key={user.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold flex items-center gap-2">
                  {user.name}
                  {user.role === "admin" && <Shield className="w-3 h-3 text-purple-400 fill-purple-400/20" />}
                </h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-6 w-full sm:w-auto mt-2 sm:mt-0">
              <div className="flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="text-muted-foreground">Plano:</span>
                <span className="text-foreground">{user.plan}</span>
              </div>

              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${user.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {user.status === 'active' ? 'Ativo' : 'Bloqueado'}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors ml-auto sm:ml-0">
                    <MoreVertical className="w-5 h-5 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-black/90 backdrop-blur-xl border-white/10">
                  <DropdownMenuLabel>Ações da Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="cursor-pointer gap-2">
                      <CreditCard className="w-4 h-4" />
                      Alterar Plano
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="bg-black/90 backdrop-blur-xl border-white/10 ml-1">
                      {plans.map((plan) => (
                        <DropdownMenuItem 
                          key={plan.id} 
                          onClick={() => changePlan(user.id, plan.name)}
                          className="cursor-pointer gap-2"
                        >
                          {user.plan === plan.name && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                          {plan.name}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuItem 
                        onClick={() => changePlan(user.id, "Free")}
                        className="cursor-pointer gap-2"
                      >
                        {user.plan === "Free" && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                        Free
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>

                  <DropdownMenuItem onClick={() => toggleRole(user.id, user.role)} className="cursor-pointer gap-2">
                    <ShieldAlert className="w-4 h-4" />
                    {user.role === "admin" ? "Remover Admin" : "Tornar Admin"}
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => toggleStatus(user.id, user.status)} className="cursor-pointer gap-2 text-destructive focus:text-destructive">
                    <Ban className="w-4 h-4" />
                    {user.status === "active" ? "Bloquear Acesso" : "Desbloquear"}
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="cursor-pointer gap-2">
                    <LogIn className="w-4 h-4" />
                    Logar como Usuário
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
