import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, DollarSign, TrendingUp, UserCheck, Activity, Share2 } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, description }: any) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-5 w-5 text-primary" />
    </CardHeader>
    <CardContent>
      <div className="text-xl sm:text-2xl font-bold truncate">{value}</div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </CardContent>
  </Card>
);

export default function DashboardStats({ estatisticas }: any) {
  if (!estatisticas) {
    return <div>A carregar estatísticas...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <StatCard title="Receita Total" value={estatisticas.receitaTotal} icon={DollarSign} description="Desde o início" />
      <StatCard title="Clientes Ativos" value={estatisticas.clientesAtivos} icon={Users} description="Utilizadores com pedidos" />
      <StatCard title="Pedidos Concluídos" value={estatisticas.pedidosConcluidos} icon={FileText} description="Projetos entregues" />
      <StatCard title="Taxa de Conversão" value={`${estatisticas.taxaAprovacao}%`} icon={TrendingUp} description="De novos pedidos" />
    </div>
  );
}