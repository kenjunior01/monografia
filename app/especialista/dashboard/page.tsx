
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Clock,
  CheckCircle,
  MessageSquare,
  Upload,
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  Users,
  Award,
  Target,
  Zap,
  Bell,
  Send,
  Paperclip,
  Eye,
  Edit,
  Download,
  AlertCircle,
  BookOpen,
  Timer,
  Activity,
} from "lucide-react"

export default function EspecialistaDashboard() {
  const [pedidosAtivos] = useState([
    {
      id: "MON-001",
      titulo: "Gestão de Recursos Humanos em Startups",
      cliente: "João Silva",
      clienteEmail: "joao@email.com",
      progresso: 75,
      prazo: "2024-02-15",
      valor: "18.500 MT",
      prioridade: "normal",
      etapaAtual: "Desenvolvimento do Capítulo 3",
      ultimaAtualizacao: "Há 2 horas",
      mensagensPendentes: 2,
      status: "em-andamento",
    },
    {
      id: "MON-002",
      titulo: "Sustentabilidade Bancária em Moçambique",
      cliente: "Maria Santos",
      clienteEmail: "maria@email.com",
      progresso: 95,
      prazo: "2024-02-08",
      valor: "22.200 MT",
      prioridade: "alta",
      etapaAtual: "Revisão Final",
      ultimaAtualizacao: "Há 1 hora",
      mensagensPendentes: 1,
      status: "revisao",
    },
    {
      id: "MON-003",
      titulo: "Transformação Digital na Educação",
      cliente: "Ana Costa",
      clienteEmail: "ana@email.com",
      progresso: 40,
      prazo: "2024-02-20",
      valor: "15.800 MT",
      prioridade: "normal",
      etapaAtual: "Pesquisa e Fundamentação",
      ultimaAtualizacao: "Há 6 horas",
      mensagensPendentes: 0,
      status: "em-andamento",
    },
  ])

  const [estatisticas] = useState({
    pedidosAtivos: 3,
    pedidosConcluidos: 47,
    receitaMensal: 56700,
    receitaTotal: 890000,
    avaliacaoMedia: 4.9,
    taxaConclusao: 98.3,
    tempoMedio: 8.5,
    clientesSatisfeitos: 95,
    especializacoes: ["Administração", "RH", "Economia"],
    ranking: 2,
  })

  const [agenda] = useState([
    {
      id: "1",
      tipo: "entrega",
      titulo: "Entrega Capítulo 3 - MON-001",
      data: "2024-02-08",
      hora: "14:00",
      status: "pendente",
    },
    {
      id: "2",
      tipo: "reuniao",
      titulo: "Revisão Final - MON-002",
      data: "2024-02-08",
      hora: "16:30",
      status: "agendado",
    },
    {
      id: "3",
      tipo: "inicio",
      titulo: "Novo Projeto - TCC Engenharia",
      data: "2024-02-09",
      hora: "10:00",
      status: "confirmado",
    },
  ])

  const [mensagens] = useState([
    {
      id: "1",
      pedidoId: "MON-001",
      cliente: "João Silva",
      conteudo: "Boa tarde, Dr.! Gostaria de saber como está o progresso do Capítulo 3. Obrigado!",
      timestamp: "2024-02-08 13:45",
      lida: false,
    },
    {
      id: "2",
      pedidoId: "MON-002",
      cliente: "Maria Santos",
      conteudo: "Excelente trabalho! Apenas uma pequena sugestão na conclusão. Pode ajustar?",
      timestamp: "2024-02-08 11:20",
      lida: false,
    },
  ])

  const [novaMensagem, setNovaMensagem] = useState("")
  const [novaAtualizacao, setNovaAtualizacao] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "em-andamento":
        return "bg-blue-100 text-blue-800"
      case "revisao":
        return "bg-yellow-100 text-yellow-800"
      case "concluido":
        return "bg-green-100 text-green-800"
      case "atrasado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return "bg-red-100 text-red-800"
      case "media":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-green-100 text-green-800"
    }
  }

  const atualizarProgresso = (pedidoId: string, novoProgresso: number) => {
    console.log(`Atualizando progresso do pedido ${pedidoId} para ${novoProgresso}%`)
  }

  const enviarMensagem = () => {
    if (!novaMensagem.trim()) return
    console.log("Enviando mensagem:", novaMensagem)
    setNovaMensagem("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Painel do Especialista</h1>
              <p className="text-gray-600">Gerencie seus projetos e acompanhe seu desempenho</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notificações ({mensagens.filter(m => !m.lida).length})
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Agenda
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Upload className="h-4 w-4 mr-2" />
                Enviar Trabalho
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6 mb-6 md:mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-3 md:p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex-1">
                  <p className="text-xs font-medium text-blue-700">Projetos Ativos</p>
                  <p className="text-lg md:text-2xl font-bold text-blue-900">{estatisticas.pedidosAtivos}</p>
                  <p className="text-xs text-blue-600">Em desenvolvimento</p>
                </div>
                <FileText className="h-5 w-5 md:h-6 md:w-6 text-blue-600 self-end md:self-center" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-3 md:p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex-1">
                  <p className="text-xs font-medium text-green-700">Concluídos</p>
                  <p className="text-lg md:text-2xl font-bold text-green-900">{estatisticas.pedidosConcluidos}</p>
                  <p className="text-xs text-green-600">Total de sucessos</p>
                </div>
                <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-600 self-end md:self-center" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-3 md:p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex-1">
                  <p className="text-xs font-medium text-purple-700">Receita Mensal</p>
                  <p className="text-lg md:text-2xl font-bold text-purple-900">{estatisticas.receitaMensal.toLocaleString()} MT</p>
                  <p className="text-xs text-purple-600">+12% vs mês anterior</p>
                </div>
                <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-purple-600 self-end md:self-center" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-3 md:p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex-1">
                  <p className="text-xs font-medium text-yellow-700">Avaliação</p>
                  <p className="text-lg md:text-2xl font-bold text-yellow-900">{estatisticas.avaliacaoMedia}</p>
                  <p className="text-xs text-yellow-600">⭐ Excelência</p>
                </div>
                <Star className="h-5 w-5 md:h-6 md:w-6 text-yellow-600 self-end md:self-center" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-3 md:p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex-1">
                  <p className="text-xs font-medium text-orange-700">Taxa Conclusão</p>
                  <p className="text-lg md:text-2xl font-bold text-orange-900">{estatisticas.taxaConclusao}%</p>
                  <p className="text-xs text-orange-600">🎯 Eficiência</p>
                </div>
                <Target className="h-5 w-5 md:h-6 md:w-6 text-orange-600 self-end md:self-center" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-50 to-pink-100 border-pink-200">
            <CardContent className="p-3 md:p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex-1">
                  <p className="text-xs font-medium text-pink-700">Ranking</p>
                  <p className="text-lg md:text-2xl font-bold text-pink-900">#{estatisticas.ranking}</p>
                  <p className="text-xs text-pink-600">🏆 Top especialista</p>
                </div>
                <Award className="h-5 w-5 md:h-6 md:w-6 text-pink-600 self-end md:self-center" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="projetos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="projetos" className="text-xs md:text-sm">Projetos</TabsTrigger>
            <TabsTrigger value="comunicacao" className="text-xs md:text-sm">Chat</TabsTrigger>
            <TabsTrigger value="agenda" className="text-xs md:text-sm">Agenda</TabsTrigger>
            <TabsTrigger value="performance" className="text-xs md:text-sm">Performance</TabsTrigger>
            <TabsTrigger value="recursos" className="text-xs md:text-sm">Recursos</TabsTrigger>
          </TabsList>

          <TabsContent value="projetos">
            <div className="space-y-6">
              {pedidosAtivos.map((pedido) => (
                <Card key={pedido.id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg">{pedido.titulo}</CardTitle>
                        <CardDescription className="flex items-center gap-2 flex-wrap">
                          <span>#{pedido.id}</span>
                          <span>•</span>
                          <span>{pedido.cliente}</span>
                          <span>•</span>
                          <span>{pedido.valor}</span>
                        </CardDescription>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Badge className={getStatusColor(pedido.status)}>
                          {pedido.status === "em-andamento" ? "Em Desenvolvimento" : "Em Revisão"}
                        </Badge>
                        <Badge className={getPrioridadeColor(pedido.prioridade)}>
                          {pedido.prioridade === "alta" ? "🚨 Urgente" : "📅 Normal"}
                        </Badge>
                        {pedido.mensagensPendentes > 0 && (
                          <Badge className="bg-red-100 text-red-800">
                            {pedido.mensagensPendentes} mensagens
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progresso</span>
                            <span className="text-sm text-gray-600">{pedido.progresso}%</span>
                          </div>
                          <Progress value={pedido.progresso} className="h-3" />
                          <p className="text-xs text-gray-500 mt-1">{pedido.etapaAtual}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">Prazo:</span>
                            <span className="text-gray-600">{pedido.prazo}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-green-500" />
                            <span className="font-medium">Última atualização:</span>
                            <span className="text-gray-600">{pedido.ultimaAtualizacao}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-purple-500" />
                            <span className="font-medium">Cliente:</span>
                            <span className="text-gray-600">{pedido.clienteEmail}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Atualizar Progresso:</label>
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              placeholder="75"
                              min="0"
                              max="100"
                              className="w-20"
                            />
                            <Button size="sm" variant="outline">
                              <Zap className="h-4 w-4 mr-2" />
                              Atualizar
                            </Button>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Enviar Atualização ao Cliente:</label>
                          <Textarea
                            placeholder="Descreva o progresso atual e próximos passos..."
                            value={novaAtualizacao}
                            onChange={(e) => setNovaAtualizacao(e.target.value)}
                            className="min-h-[80px]"
                          />
                          <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
                            <Send className="h-4 w-4 mr-2" />
                            Enviar Atualização
                          </Button>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Chat Direto
                          </Button>
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Enviar Arquivo
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comunicacao">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mensagens dos Clientes</CardTitle>
                  <CardDescription>Comunicação em tempo real</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-80">
                    <div className="space-y-4">
                      {mensagens.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-3 rounded-lg border ${
                            !msg.lida ? "bg-blue-50 border-blue-200" : "bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {msg.cliente
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{msg.cliente}</p>
                              <p className="text-xs text-gray-500">{msg.timestamp}</p>
                            </div>
                            {!msg.lida && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                          </div>
                          <p className="text-sm text-gray-700">{msg.conteudo}</p>
                          <div className="mt-2 flex gap-2">
                            <Button size="sm" variant="outline">
                              <Send className="h-3 w-3 mr-1" />
                              Responder
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3 mr-1" />
                              Ver Projeto
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Chat Rápido</CardTitle>
                  <CardDescription>Responda rapidamente aos clientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um projeto" />
                      </SelectTrigger>
                      <SelectContent>
                        {pedidosAtivos.map((pedido) => (
                          <SelectItem key={pedido.id} value={pedido.id}>
                            {pedido.titulo} - {pedido.cliente}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Textarea
                      placeholder="Digite sua mensagem para o cliente..."
                      value={novaMensagem}
                      onChange={(e) => setNovaMensagem(e.target.value)}
                      className="min-h-[120px]"
                    />

                    <div className="flex gap-2 justify-between">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Paperclip className="h-4 w-4 mr-2" />
                          Anexar
                        </Button>
                        <Button variant="outline" size="sm">
                          📝 Template
                        </Button>
                      </div>
                      <Button onClick={enviarMensagem} className="bg-blue-600 hover:bg-blue-700">
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Mensagem
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="agenda">
            <Card>
              <CardHeader>
                <CardTitle>Agenda de Trabalho</CardTitle>
                <CardDescription>Gerencie prazos e compromissos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agenda.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            item.tipo === "entrega"
                              ? "bg-red-500"
                              : item.tipo === "reuniao"
                                ? "bg-blue-500"
                                : "bg-green-500"
                          }`}
                        ></div>
                        <div>
                          <p className="font-medium">{item.titulo}</p>
                          <p className="text-sm text-gray-600">
                            {item.data} às {item.hora}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={
                          item.status === "pendente"
                            ? "bg-yellow-100 text-yellow-800"
                            : item.status === "confirmado"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas de Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Taxa de Conclusão:</span>
                      <span className="font-medium text-green-600">{estatisticas.taxaConclusao}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tempo Médio de Entrega:</span>
                      <span className="font-medium">{estatisticas.tempoMedio} dias</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Clientes Satisfeitos:</span>
                      <span className="font-medium text-blue-600">{estatisticas.clientesSatisfeitos}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Receita Total:</span>
                      <span className="font-medium text-purple-600">{estatisticas.receitaTotal.toLocaleString()} MT</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Especializações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {estatisticas.especializacoes.map((esp, index) => (
                      <Badge key={index} variant="outline" className="mr-2">
                        {esp}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Adicionar Especialização
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recursos">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Templates de Trabalho</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Template TCC
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Template Monografia
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Template Artigo
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ferramentas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Gerador de Referências
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Timer className="h-4 w-4 mr-2" />
                      Timer de Trabalho
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Activity className="h-4 w-4 mr-2" />
                      Verificador Anti-Plágio
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Suporte</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat com Admin
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="h-4 w-4 mr-2" />
                      Central de Ajuda
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Guias e Tutoriais
                    </Button>
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
