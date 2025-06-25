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
} from "lucide-react"

export default function AdminDashboard() {
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [busca, setBusca] = useState("")

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
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Central de Comando</h1>
              <p className="text-gray-600">Painel completo de gerenciamento da plataforma</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Notificações
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Relatório Completo
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards Expandidos */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4 mb-6 md:mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-3 md:p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex-1">
                  <p className="text-xs font-medium text-blue-700">Total Pedidos</p>
                  <p className="text-lg md:text-xl font-bold text-blue-900">{estatisticas.totalPedidos}</p>
                  <p className="text-xs text-blue-600">+15% mês</p>
                </div>
                <FileText className="h-5 w-5 md:h-6 md:w-6 text-blue-600 self-end md:self-center" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-green-700">Receita Total</p>
                  <p className="text-xl font-bold text-green-900">{estatisticas.receitaTotal}</p>
                  <p className="text-xs text-green-600">+22% mês</p>
                </div>
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-purple-700">Clientes Ativos</p>
                  <p className="text-xl font-bold text-purple-900">{estatisticas.clientesAtivos}</p>
                  <p className="text-xs text-purple-600">+18% mês</p>
                </div>
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-orange-700">Taxa Aprovação</p>
                  <p className="text-xl font-bold text-orange-900">{estatisticas.taxaAprovacao}%</p>
                  <p className="text-xs text-orange-600">+3% mês</p>
                </div>
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-yellow-700">Afiliados Ativos</p>
                  <p className="text-xl font-bold text-yellow-900">{estatisticas.afiliadosAtivos}</p>
                  <p className="text-xs text-yellow-600">+8 novos</p>
                </div>
                <UserCheck className="h-6 w-6 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-50 to-pink-100 border-pink-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-pink-700">Comissões Afiliados</p>
                  <p className="text-xl font-bold text-pink-900">{estatisticas.comissoesAfiliados}</p>
                  <p className="text-xs text-pink-600">Este mês</p>
                </div>
                <Gift className="h-6 w-6 text-pink-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pedidos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 gap-1">
            <TabsTrigger value="pedidos" className="text-xs md:text-sm">Pedidos</TabsTrigger>
            <TabsTrigger value="afiliados" className="text-xs md:text-sm">Afiliados</TabsTrigger>
            <TabsTrigger value="especialistas" className="text-xs md:text-sm">Especialistas</TabsTrigger>
            <TabsTrigger value="pagamentos" className="text-xs md:text-sm">Pagamentos</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs md:text-sm">Analytics</TabsTrigger>
            <TabsTrigger value="configuracoes" className="text-xs md:text-sm">Config</TabsTrigger>
          </TabsList>

          <TabsContent value="pedidos">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Gestão Completa de Pedidos</CardTitle>
                    <CardDescription>Monitore todos os aspectos dos pedidos incluindo afiliações</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar pedidos..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filtrar por status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos os Status</SelectItem>
                        <SelectItem value="em-andamento">Em Andamento</SelectItem>
                        <SelectItem value="revisao">Em Revisão</SelectItem>
                        <SelectItem value="aguardando-especialista">Aguardando Especialista</SelectItem>
                        <SelectItem value="concluido">Concluído</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pedidos.map((pedido) => (
                    <div key={pedido.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-medium">{pedido.titulo}</h3>
                            <p className="text-sm text-gray-600">
                              #{pedido.id} • {pedido.cliente}
                            </p>
                          </div>
                          <Badge className={getStatusColor(pedido.status)}>{getStatusText(pedido.status)}</Badge>
                          {pedido.afiliado && (
                            <Badge className="bg-green-100 text-green-800">
                              <Gift className="h-3 w-3 mr-1" />
                              Afiliado: {pedido.afiliado}
                            </Badge>
                          )}
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid md:grid-cols-5 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Cliente</p>
                          <p className="text-sm font-medium">{pedido.cliente}</p>
                          <p className="text-xs text-gray-500">{pedido.clienteEmail}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Especialista</p>
                          <p className="text-sm font-medium">{pedido.especialista || "Não atribuído"}</p>
                          {!pedido.especialista && (
                            <Select>
                              <SelectTrigger className="w-full mt-1">
                                <SelectValue placeholder="Atribuir" />
                              </SelectTrigger>
                              <SelectContent>
                                {especialistas
                                  .filter((e) => e.status === "ativo")
                                  .map((especialista) => (
                                    <SelectItem key={especialista.id} value={especialista.id}>
                                      {especialista.nome}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Progresso</p>
                          <div className="flex items-center gap-2">
                            <Progress value={pedido.progresso} className="flex-1 h-2" />
                            <span className="text-xs font-medium">{pedido.progresso}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Valor</p>
                          <p className="text-sm font-medium">{pedido.valor}</p>
                          <p className="text-xs text-gray-500">Prazo: {pedido.prazo}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Afiliação</p>
                          {pedido.afiliado ? (
                            <div>
                              <p className="text-sm font-medium text-green-600">{pedido.afiliado}</p>
                              <p className="text-xs text-gray-500">{pedido.codigoAfiliado}</p>
                              <Badge className="bg-green-100 text-green-800 text-xs mt-1">1.000 MT comissão</Badge>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">Direto</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">Pedido criado em {pedido.dataPedido}</div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalhes
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Chat
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="afiliados">
            <div className="space-y-6">
              {/* Stats dos Afiliados */}
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-800">{estatisticas.afiliadosAtivos}</p>
                      <p className="text-sm text-green-700">Afiliados Ativos</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-800">{estatisticas.comissoesAfiliados}</p>
                      <p className="text-sm text-blue-700">Comissões Pagas</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-800">{estatisticas.conversaoAfiliados}%</p>
                      <p className="text-sm text-purple-700">Taxa Conversão</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-800">38</p>
                      <p className="text-sm text-orange-700">Indicações Este Mês</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Gestão de Afiliados</CardTitle>
                      <CardDescription>Controle completo do programa de afiliados</CardDescription>
                    </div>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Aprovar Pendentes
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {afiliados.map((afiliado) => (
                      <div key={afiliado.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback>
                                {afiliado.nome
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{afiliado.nome}</h3>
                              <p className="text-sm text-gray-600">{afiliado.email}</p>
                              <p className="text-xs text-gray-500">Código: {afiliado.codigo}</p>
                            </div>
                          </div>
                          <Badge
                            className={
                              afiliado.status === "ativo"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {afiliado.status}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-5 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Total Indicações</p>
                            <p className="text-lg font-bold text-blue-600">{afiliado.indicacoes}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Indicações Pagas</p>
                            <p className="text-lg font-bold text-green-600">{afiliado.indicacoesPagas}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Comissão Total</p>
                            <p className="text-lg font-bold text-purple-600">{afiliado.comissaoTotal}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Pendente</p>
                            <p className="text-lg font-bold text-yellow-600">{afiliado.comissaoPendente}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Taxa Conversão</p>
                            <p className="text-lg font-bold text-orange-600">{afiliado.conversao}%</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">Última indicação: {afiliado.dataUltimaIndicacao}</div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Detalhes
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Contatar
                            </Button>
                            {afiliado.comissaoPendente !== "0 MT" && (
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => pagarComissao(afiliado.id)}
                              >
                                <CreditCard className="h-4 w-4 mr-2" />
                                Pagar Comissão
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="especialistas">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Gestão de Especialistas</CardTitle>
                    <CardDescription>Gerencie a equipe de especialistas e performance</CardDescription>
                  </div>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Adicionar Especialista
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {especialistas.map((especialista) => (
                    <Card key={especialista.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src="/placeholder.svg?height=48&width=48" />
                            <AvatarFallback>
                              {especialista.nome
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-medium">{especialista.nome}</h3>
                            <p className="text-sm text-gray-600">{especialista.email}</p>
                          </div>
                          <Badge
                            className={
                              especialista.status === "ativo"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {especialista.status}
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Pedidos Ativos:</span>
                            <span className="font-medium">{especialista.pedidosAtivos}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Concluídos:</span>
                            <span className="font-medium">{especialista.pedidosConcluidos}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Avaliação:</span>
                            <span className="font-medium flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              {especialista.avaliacao}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Receita Gerada:</span>
                            <span className="font-medium text-green-600">{especialista.receita}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs text-gray-500 mb-2">Especialidades:</p>
                          <div className="flex flex-wrap gap-1">
                            {especialista.especialidades.map((esp, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {esp}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Chat
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pagamentos">
            <div className="space-y-6">
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-800">2.850.000 MT</p>
                      <p className="text-sm text-green-700">Receita Este Mês</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-800">245.000 MT</p>
                      <p className="text-sm text-blue-700">Pagamentos Pendentes</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-800">45.000 MT</p>
                      <p className="text-sm text-purple-700">Comissões Afiliados</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-800">18</p>
                      <p className="text-sm text-orange-700">Aguardando Confirmação</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Controle de Pagamentos</CardTitle>
                  <CardDescription>Monitore todos os pagamentos da plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="font-medium">Pagamentos Recentes</h3>
                    {[
                      {
                        id: "PAG-001",
                        cliente: "João Silva",
                        pedido: "MON-001",
                        valor: "18.500 MT",
                        metodo: "M-Pesa",
                        status: "confirmado",
                        data: "2024-02-05",
                        afiliado: "Carlos M.",
                        comissao: "1.000 MT",
                      },
                      {
                        id: "PAG-002",
                        cliente: "Maria Santos",
                        pedido: "MON-002",
                        valor: "22.200 MT",
                        metodo: "Transferência",
                        status: "pendente",
                        data: "2024-02-04",
                        afiliado: null,
                        comissao: null,
                      },
                    ].map((pagamento) => (
                      <div key={pagamento.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">{pagamento.cliente}</p>
                            <p className="text-sm text-gray-600">
                              {pagamento.id} • {pagamento.pedido} • {pagamento.data}
                            </p>
                            {pagamento.afiliado && (
                              <p className="text-xs text-green-600">
                                Afiliado: {pagamento.afiliado} • Comissão: {pagamento.comissao}
                              </p>
                            )}
                          </div>
                          <Badge
                            className={
                              pagamento.status === "confirmado"
                                ? "bg-green-100 text-green-800"
                                : pagamento.status === "pendente"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }
                          >
                            {pagamento.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">{pagamento.valor}</p>
                            <p className="text-sm text-gray-600">{pagamento.metodo}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Receita Mensal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Gráfico de receita mensal integrado</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Performance Afiliados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Gráfico de performance dos afiliados</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Métricas Principais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Tempo Médio de Entrega:</span>
                      <span className="font-medium">9 dias</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxa de Satisfação:</span>
                      <span className="font-medium">97.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pedidos por Mês:</span>
                      <span className="font-medium">45</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Receita Média por Pedido:</span>
                      <span className="font-medium">18.200 MT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxa de Retenção:</span>
                      <span className="font-medium">82%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversão Afiliados:</span>
                      <span className="font-medium text-green-600">{estatisticas.conversaoAfiliados}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Afiliados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {afiliados.map((afiliado, index) => (
                      <div key={afiliado.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                            {index + 1}
                          </div>
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {afiliado.nome
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{afiliado.nome}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">{afiliado.indicacoes} indicações</span>
                          <span className="text-sm font-medium text-green-600">{afiliado.comissaoTotal}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="configuracoes">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Sistema de Afiliados</CardTitle>
                  <CardDescription>Gerencie as configurações do programa de afiliados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Comissões</h3>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Valor da Comissão por Indicação</label>
                        <Input defaultValue="1000" />
                        <p className="text-xs text-gray-500">Valor em MT pago por cada indicação convertida</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Prazo para Pagamento</label>
                        <Select defaultValue="48h">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="24h">24 horas</SelectItem>
                            <SelectItem value="48h">48 horas</SelectItem>
                            <SelectItem value="72h">72 horas</SelectItem>
                            <SelectItem value="7d">7 dias</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Aprovação de Afiliados</h3>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Aprovação Automática</label>
                        <Select defaultValue="manual">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="automatica">Automática</SelectItem>
                            <SelectItem value="manual">Manual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Critérios Mínimos</label>
                        <Textarea
                          placeholder="Defina os critérios mínimos para aprovação de afiliados..."
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Materiais de Marketing</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="border-dashed border-2">
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <Download className="h-6 w-6 text-blue-600" />
                          </div>
                          <p className="font-medium mb-2">Upload Banner</p>
                          <Button size="sm" variant="outline">
                            Adicionar
                          </Button>
                        </CardContent>
                      </Card>
                      <Card className="border-dashed border-2">
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <MessageSquare className="h-6 w-6 text-green-600" />
                          </div>
                          <p className="font-medium mb-2">Texto Copy</p>
                          <Button size="sm" variant="outline">
                            Adicionar
                          </Button>
                        </CardContent>
                      </Card>
                      <Card className="border-dashed border-2">
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <Share2 className="h-6 w-6 text-purple-600" />
                          </div>
                          <p className="font-medium mb-2">Post Social</p>
                          <Button size="sm" variant="outline">
                            Adicionar
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700">Salvar Configurações</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Integração Vercel */}
              <Card>
                <CardHeader>
                  <CardTitle>Integrações Vercel</CardTitle>
                  <CardDescription>Conecte ferramentas do Vercel Marketplace para gestão avançada</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="border-2 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Activity className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Vercel Analytics</h3>
                            <p className="text-sm text-gray-600">Análise avançada de performance</p>
                          </div>
                        </div>
                        <Button size="sm" className="w-full">
                          Conectar
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <BarChart3 className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Vercel Speed Insights</h3>
                            <p className="text-sm text-gray-600">Monitoramento de velocidade</p>
                          </div>
                        </div>
                        <Button size="sm" className="w-full">
                          Conectar
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
