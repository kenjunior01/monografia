"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { useIsMobile } from "@/components/ui/use-mobile"
import {
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  Search,
  MoreHorizontal,
  UserPlus,
  Edit,
  Eye,
  MessageSquare,
  BarChart3,
  PieChart,
  Download,
  Star,
  Gift,
  Settings,
  Bell,
  CreditCard,
  UserCheck,
  Activity,
  Share2,
  Menu,
  X,
} from "lucide-react"

export default function AdminDashboard() {
  const isMobile = useIsMobile()
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [busca, setBusca] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [estatisticas] = useState({
    totalPedidos: 234,
    pedidosAtivos: 45,
    pedidosConcluidos: 189,
    receitaTotal: "3.890.000 MT",
    receitaMes: "285.000 MT",
    clientesAtivos: 156,
    especialistasAtivos: 8,
    taxaAprovacao: 97.8,
    afiliadosAtivos: 23,
    comissoesAfiliados: "45.000 MT",
    conversaoAfiliados: 12.5,
  })

  const [pedidos] = useState([
    {
      id: "MON-001",
      cliente: "João Silva",
      clienteEmail: "joao@email.com",
      titulo: "Gestão de Recursos Humanos",
      especialista: "Dr. Ana Silva",
      status: "em-andamento",
      progresso: 75,
      valor: "18.500 MT",
      prazo: "2024-02-15",
      dataPedido: "2024-01-20",
      prioridade: "normal",
      afiliado: "Carlos M.",
      codigoAfiliado: "AFIL-CARLOS-2024",
    },
    {
      id: "MON-002",
      cliente: "Maria Santos",
      clienteEmail: "maria@email.com",
      titulo: "Sustentabilidade Bancária",
      especialista: "Prof. Carlos Lima",
      status: "revisao",
      progresso: 95,
      valor: "22.200 MT",
      prazo: "2024-02-10",
      dataPedido: "2024-01-15",
      prioridade: "alta",
      afiliado: null,
      codigoAfiliado: null,
    },
  ])

  const [afiliados] = useState([
    {
      id: "1",
      nome: "Carlos Mucavel",
      email: "carlos@email.com",
      codigo: "AFIL-CARLOS-2024",
      status: "ativo",
      indicacoes: 23,
      indicacoesPagas: 18,
      comissaoTotal: "18.000 MT",
      comissaoPendente: "5.000 MT",
      conversao: 78.3,
      dataUltimaIndicacao: "2024-02-05",
    },
    {
      id: "2",
      nome: "Ana Chissano",
      email: "ana@email.com",
      codigo: "AFIL-ANA-2024",
      status: "ativo",
      indicacoes: 15,
      indicacoesPagas: 12,
      comissaoTotal: "12.000 MT",
      comissaoPendente: "3.000 MT",
      conversao: 80.0,
      dataUltimaIndicacao: "2024-02-04",
    },
  ])

  const [especialistas] = useState([
    {
      id: "1",
      nome: "Dr. Ana Silva",
      email: "ana@monografiaplus.com",
      especialidades: ["Administração", "RH"],
      pedidosAtivos: 4,
      pedidosConcluidos: 45,
      avaliacao: 4.9,
      status: "ativo",
      receita: "675.000 MT",
    },
    {
      id: "2",
      nome: "Prof. Carlos Lima",
      email: "carlos@monografiaplus.com",
      especialidades: ["Economia", "Finanças"],
      pedidosAtivos: 3,
      pedidosConcluidos: 52,
      avaliacao: 4.8,
      status: "ativo",
      receita: "780.000 MT",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "em-andamento":
        return "bg-blue-100 text-blue-800"
      case "concluido":
        return "bg-green-100 text-green-800"
      case "revisao":
        return "bg-yellow-100 text-yellow-800"
      case "aguardando-especialista":
        return "bg-red-100 text-red-800"
      case "aguardando-pagamento":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "em-andamento":
        return "Em Desenvolvimento"
      case "concluido":
        return "Concluído"
      case "revisao":
        return "Em Revisão"
      case "aguardando-especialista":
        return "Aguardando Especialista"
      case "aguardando-pagamento":
        return "Aguardando Pagamento"
      default:
        return "Pendente"
    }
  }

  const aprovarAfiliado = (afiliadoId: string) => {
    console.log(`Aprovando afiliado ${afiliadoId}`)
  }

  const pagarComissao = (afiliadoId: string) => {
    console.log(`Pagando comissão para afiliado ${afiliadoId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Mobile */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <h1 className="text-lg font-bold text-gray-900">Painel Admin</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${
          isMobile 
            ? `fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'w-64 bg-white border-r'
        }`}>
          <div className="p-4">
            {isMobile && (
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">Menu</h2>
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Pedidos
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Clientes
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <UserCheck className="mr-2 h-4 w-4" />
                Especialistas
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Share2 className="mr-2 h-4 w-4" />
                Afiliados
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <DollarSign className="mr-2 h-4 w-4" />
                Financeiro
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Button>
            </nav>
          </div>
        </aside>

        {/* Overlay para mobile */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 space-y-6">
          {/* Estatísticas - Grid Responsivo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pedidos Ativos</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{estatisticas.pedidosAtivos}</div>
                <p className="text-xs text-muted-foreground">+20% desde o mês passado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{estatisticas.receitaMes}</div>
                <p className="text-xs text-muted-foreground">+15% desde o mês passado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{estatisticas.clientesAtivos}</div>
                <p className="text-xs text-muted-foreground">+8% desde o mês passado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa Aprovação</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{estatisticas.taxaAprovacao}%</div>
                <p className="text-xs text-muted-foreground">+2% desde o mês passado</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs - Mobile Friendly */}
          <Tabs defaultValue="pedidos" className="space-y-4">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
              <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
              <TabsTrigger value="afiliados">Afiliados</TabsTrigger>
              {!isMobile && (
                <>
                  <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
                  <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
                </>
              )}
            </TabsList>

            <TabsContent value="pedidos" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar pedidos..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="em-andamento">Em Andamento</SelectItem>
                    <SelectItem value="revisao">Em Revisão</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Lista de Pedidos - Mobile Cards */}
              <div className="grid gap-4">
                {pedidos.map((pedido) => (
                  <Card key={pedido.id}>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <CardTitle className="text-base">{pedido.titulo}</CardTitle>
                          <CardDescription>{pedido.cliente} • {pedido.id}</CardDescription>
                        </div>
                        <Badge variant={
                          pedido.status === 'concluido' ? 'default' :
                          pedido.status === 'em-andamento' ? 'secondary' :
                          'outline'
                        }>
                          {pedido.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Progresso:</span>
                          <span>{pedido.progresso}%</span>
                        </div>
                        <Progress value={pedido.progresso} className="w-full" />

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Valor:</span>
                            <p className="font-medium">{pedido.valor}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Prazo:</span>
                            <p className="font-medium">{pedido.prazo}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Button size="sm" variant="outline">
                            <Eye className="mr-1 h-3 w-3" />
                            Ver
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="mr-1 h-3 w-3" />
                            Editar
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="mr-1 h-3 w-3" />
                            Chat
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="afiliados" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Gestão de Afiliados</h3>
                <Button size="sm">
                  <UserPlus className="mr-1 h-4 w-4" />
                  Novo Afiliado
                </Button>
              </div>

              <div className="grid gap-4">
                {afiliados.map((afiliado) => (
                  <Card key={afiliado.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{afiliado.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{afiliado.nome}</CardTitle>
                            <CardDescription>{afiliado.id}</CardDescription>
                          </div>
                        </div>
                        <Badge variant={afiliado.status === 'ativo' ? 'default' : 'secondary'}>
                          {afiliado.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Indicações:</span>
                          <p className="font-medium">{afiliado.indicacoes}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Conversão:</span>
                          <p className="font-medium">{afiliado.conversao}%</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Comissão:</span>
                          <p className="font-medium">{afiliado.comissaoTotal ? afiliado.comissaoTotal : "N/A"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="financeiro">
                <div>Financeiro Content</div>
            </TabsContent>
            <TabsContent value="relatorios">
                <div>Relatorios Content</div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}