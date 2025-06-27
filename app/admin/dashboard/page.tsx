"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SidebarProvider, Sidebar, SidebarHeader, SidebarBody, SidebarLink, SidebarFooter } from "@/components/ui/sidebar"
import {
  Download,
  Settings,
  Bell,
  LayoutDashboard,
  Users,
  Briefcase,
  UserCheck,
  FileText,
  CreditCard,
  BarChart3,
  LogOut
} from "lucide-react"
import DashboardStats from "@/components/admin/DashboardStats";
import PedidosList from "@/components/admin/PedidosList";
import AfiliadosList from "@/components/admin/AfiliadosList";
import EspecialistasList from "@/components/admin/EspecialistasList";
import UsuariosList from "@/components/admin/UsuariosList";
import PagamentosList from "@/components/admin/PagamentosList";
import Analytics from "@/components/admin/Analytics";

function DashboardContent({ estatisticas, pedidos }) {
  return (
    <div className="flex flex-col flex-1">
      <header className="bg-white border-b p-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Central de Comando</h1>
          <p className="text-gray-600">Painel completo de gerenciamento da plataforma</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon"><Bell className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon"><Settings className="h-4 w-4" /></Button>
          <Button><Download className="h-4 w-4 mr-2" />Relatório</Button>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <DashboardStats estatisticas={estatisticas} />
        <div className="mt-6">
          <PedidosList pedidos={pedidos} />
        </div>
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  const [estatisticas, setEstatisticas] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/dashboard`);
        const data = await res.json();
        setEstatisticas(data.estatisticas);
        setPedidos(data.pedidos);
      } catch (error) {
        console.error(`Erro ao buscar dados do dashboard:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <div className="flex items-center justify-center h-screen">Carregando...</div>;
    }

    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent estatisticas={estatisticas} pedidos={pedidos} />;
      case 'pedidos':
        return <PedidosList pedidos={pedidos} />;
      case 'afiliados':
        return <AfiliadosList afiliados={[]} />;
      case 'especialistas':
        return <EspecialistasList especialistas={[]} />;
      case 'usuarios':
        return <UsuariosList usuarios={[]} />;
      case 'pagamentos':
        return <PagamentosList pagamentos={[]} />;
      case 'analytics':
        return <Analytics />;
      case 'configuracoes':
        return <div>Configurações</div>;
      default:
        return <DashboardContent estatisticas={estatisticas} pedidos={pedidos} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader>
            <h2 className="text-xl font-bold">Monografia+</h2>
          </SidebarHeader>
          <SidebarBody>
            <SidebarLink icon={LayoutDashboard} isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')}>Dashboard</SidebarLink>
            <SidebarLink icon={FileText} isActive={activeTab === 'pedidos'} onClick={() => setActiveTab('pedidos')}>Pedidos</SidebarLink>
            <SidebarLink icon={UserCheck} isActive={activeTab === 'afiliados'} onClick={() => setActiveTab('afiliados')}>Afiliados</SidebarLink>
            <SidebarLink icon={Briefcase} isActive={activeTab === 'especialistas'} onClick={() => setActiveTab('especialistas')}>Especialistas</SidebarLink>
            <SidebarLink icon={Users} isActive={activeTab === 'usuarios'} onClick={() => setActiveTab('usuarios')}>Usuários</SidebarLink>
            <SidebarLink icon={CreditCard} isActive={activeTab === 'pagamentos'} onClick={() => setActiveTab('pagamentos')}>Pagamentos</SidebarLink>
            <SidebarLink icon={BarChart3} isActive={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')}>Analytics</SidebarLink>
            <SidebarLink icon={Settings} isActive={activeTab === 'configuracoes'} onClick={() => setActiveTab('configuracoes')}>Configurações</SidebarLink>
          </SidebarBody>
          <SidebarFooter>
            <SidebarLink icon={LogOut}>Sair</SidebarLink>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
}
