"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useIsMobile } from "@/components/ui/use-mobile"
import {
  FileText,
  Clock,
  CheckCircle,
  MessageSquare,
  Download,
  Calendar,
  DollarSign,
  Send,
  Paperclip,
  Eye,
  Edit,
  AlertCircle,
  TrendingUp,
  Star,
  Shield,
  Zap,
  Target,
  ThumbsUp,
  Bell,
  Menu,
  X,
  Home,
  User,
  Settings,
} from "lucide-react"

export default function ClienteDashboard() {
  const isMobile = useIsMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [novaMensagem, setNovaMensagem] = useState("")

  const [pedidos] = useState([
    {
      id: "MON-001",
      titulo: "Gestão de Recursos Humanos em Startups Moçambicanas",
      status: "em-andamento",
      progresso: 75,
      prazo: "2024-02-15",
      valor: "18.500 MT",
      especialista: "Dr. Ana Silva",
      especialistaAvatar: "/placeholder.svg?height=40&width=40",
      ultimaAtualizacao: "Há 2 horas",
      etapaAtual: "Finalizando Capítulo 3 - Análise de Dados",
      proximaEntrega: "Rascunho completo - 2024-02-12",
      urgencia: "normal",
      qualidade: 98,
    },
    {
      id: "MON-002",
      titulo: "Sustentabilidade no Setor Bancário Moçambicano",
      status: "revisao",
      progresso: 95,
      prazo: "2024-02-08",
      valor: "22.200 MT",
      especialista: "Prof. Carlos Santos",
      especialistaAvatar: "/placeholder.svg?height=40&width=40",
      ultimaAtualizacao: "Há 6 horas",
      etapaAtual: "Aguardando sua aprovação final",
      proximaEntrega: "Versão final - 2024-02-08",
      urgencia: "alta",
      qualidade: 96,
    },
    {
      id: "MON-003",
      titulo: "Transformação Digital na Educação Superior",
      status: "concluido",
      progresso: 100,
      prazo: "2024-01-25",
      valor: "15.800 MT",
      especialista: "Dra. Maria Costa",
      especialistaAvatar: "/placeholder.svg?height=40&width=40",
      ultimaAtualizacao: "Há 3 dias",
      etapaAtual: "Trabalho concluído com sucesso",
      proximaEntrega: "N/A",
      urgencia: "baixa",
      qualidade: 100,
    },
  ])

  const [mensagens] = useState([
    {
      id: 1,
      tipo: "especialista",
      nome: "Dr. Ana Silva",
      mensagem: "Olá! Terminei o Capítulo 2 da sua monografia. Pode revisar o arquivo em anexo?",
      timestamp: "Há 2 horas",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      tipo: "cliente",
      nome: "Você",
      mensagem: "Perfeito! Vou revisar hoje mesmo. Obrigado pelo excelente trabalho!",
      timestamp: "Há 1 hora",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluido': return 'bg-green-100 text-green-800'
      case 'em-andamento': return 'bg-blue-100 text-blue-800'
      case 'revisao': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getUrgenciaColor = (urgencia: string) => {
    switch (urgencia) {
      case 'alta': return 'text-red-600'
      case 'normal': return 'text-yellow-600'
      case 'baixa': return 'text-green-600'
      default: return 'text-gray-600'
    }
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
              <div>
                <h1 className="text-lg font-bold text-gray-900">Meu Painel</h1>
                <p className="text-xs text-gray-500">Bem-vindo de volta!</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarFallback>JS</AvatarFallback>
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
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Meus Pedidos
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Mensagens
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <DollarSign className="mr-2 h-4 w-4" />
                Pagamentos
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Perfil
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Button>
            </nav>

            {/* Novo Pedido Button */}
            <div className="mt-6">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <FileText className="mr-2 h-4 w-4" />
                Nova Monografia
              </Button>
            </div>
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
          {/* Stats Cards - Grid Responsivo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pedidos Ativos</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Em andamento</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Trabalhos finalizados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Satisfação</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.9</div>
                <p className="text-xs text-muted-foreground">Avaliação média</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Próximo Prazo</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">Dias restantes</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Content */}
          <Tabs defaultValue="pedidos" className="space-y-4">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-3'}`}>
              <TabsTrigger value="pedidos">Meus Pedidos</TabsTrigger>
              <TabsTrigger value="mensagens">Mensagens</TabsTrigger>
              {!isMobile && <TabsTrigger value="historico">Histórico</TabsTrigger>}
            </TabsList>

            <TabsContent value="pedidos" className="space-y-4">
              {pedidos.map((pedido) => (
                <Card key={pedido.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-base leading-tight pr-2">{pedido.titulo}</CardTitle>
                          <Badge className={getStatusColor(pedido.status)}>
                            {pedido.status === 'em-andamento' ? 'Em Andamento' :
                             pedido.status === 'revisao' ? 'Em Revisão' :
                             pedido.status === 'concluido' ? 'Concluído' : pedido.status}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-2">
                          <span>{pedido.id}</span>
                          <span>•</span>
                          <span className={getUrgenciaColor(pedido.urgencia)}>
                            {pedido.urgencia === 'alta' ? 'Urgente' :
                             pedido.urgencia === 'normal' ? 'Normal' : 'Baixa Prioridade'}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Especialista */}
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={pedido.especialistaAvatar} />
                        <AvatarFallback>{pedido.especialista.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{pedido.especialista}</p>
                        <p className="text-xs text-gray-500">Especialista responsável</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Chat
                      </Button>
                    </div>

                    {/* Progresso */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Progresso do trabalho</span>
                        <span className="text-sm text-gray-500">{pedido.progresso}%</span>
                      </div>
                      <Progress value={pedido.progresso} className="w-full" />
                      <p className="text-xs text-gray-600">{pedido.etapaAtual}</p>
                    </div>

                    {/* Informações do Pedido */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div>
                        <span className="text-xs text-gray-500">Valor Total</span>
                        <p className="font-semibold text-green-600">{pedido.valor}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Prazo Final</span>
                        <p className="font-semibold">{pedido.prazo}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Qualidade</span>
                        <p className="font-semibold text-blue-600">{pedido.qualidade}%</p>
                      </div>
                    </div>

                    {/* Próxima Entrega */}
                    {pedido.proximaEntrega !== "N/A" && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">Próxima Entrega</span>
                        </div>
                        <p className="text-sm text-blue-700">{pedido.proximaEntrega}</p>
                      </div>
                    )}

                    {/* Ações */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t">
                      <Button size="sm" variant="outline">
                        <Eye className="mr-1 h-3 w-3" />
                        Visualizar
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="mr-1 h-3 w-3" />
                        Download
                      </Button>
                      {pedido.status === 'revisao' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <ThumbsUp className="mr-1 h-3 w-3" />
                          Aprovar
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <MessageSquare className="mr-1 h-3 w-3" />
                        Comentar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="mensagens" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Centro de Mensagens</CardTitle>
                  <CardDescription>Comunique-se diretamente com seus especialistas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96 w-full border rounded-lg p-4">
                    <div className="space-y-4">
                      {mensagens.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.tipo === 'cliente' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[70%] ${msg.tipo === 'cliente' ? 'order-2' : 'order-1'}`}>
                            <div className={`rounded-lg p-3 ${
                              msg.tipo === 'cliente' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p className="text-sm">{msg.mensagem}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {msg.tipo === 'especialista' && (
                                <Avatar className="h-4 w-4">
                                  <AvatarImage src={msg.avatar} />
                                  <AvatarFallback className="text-xs">ES</AvatarFallback>
                                </Avatar>
                              )}
                              <p className="text-xs text-gray-500">{msg.nome} • {msg.timestamp}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="flex gap-2 mt-4">
                    <Input
                      placeholder="Digite sua mensagem..."
                      value={novaMensagem}
                      onChange={(e) => setNovaMensagem(e.target.value)}
                      className="flex-1"
                    />
                    <Button size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}