"use client"

import { Label } from "@/components/ui/label"

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
} from "lucide-react"

export default function ClienteDashboard() {
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
      urgencia: "normal",
      qualidade: 99,
      notaFinal: "18 valores",
    },
  ])

  const [mensagens] = useState([
    {
      id: "1",
      pedidoId: "MON-001",
      remetente: "Dr. Ana Silva",
      conteudo:
        "Excelentes notícias! Acabei de finalizar a análise dos dados do seu estudo de caso. Os resultados são muito promissores e fortalecem significativamente suas conclusões. Gostaria de revisar antes de prosseguir para as considerações finais?",
      timestamp: "2024-02-05 14:30",
      tipo: "texto",
      lida: false,
      importante: true,
    },
    {
      id: "2",
      pedidoId: "MON-002",
      remetente: "Prof. Carlos Santos",
      conteudo:
        "Sua monografia está pronta para revisão final! Implementei todas as sugestões e o trabalho ficou excepcional. O estudo de caso do BCI está muito bem fundamentado. Por favor, revise e me informe se há algum ajuste necessário.",
      timestamp: "2024-02-04 16:45",
      tipo: "texto",
      lida: true,
      importante: true,
    },
    {
      id: "3",
      pedidoId: "MON-001",
      remetente: "Sistema",
      conteudo:
        "Seu especialista Dr. Ana Silva enviou uma atualização de progresso. Clique para visualizar os detalhes.",
      timestamp: "2024-02-04 10:20",
      tipo: "sistema",
      lida: true,
      importante: false,
    },
  ])

  const [novaMensagem, setNovaMensagem] = useState("")
  const [pedidoSelecionado, setPedidoSelecionado] = useState("MON-001")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "em-andamento":
        return "bg-blue-100 text-blue-800"
      case "concluido":
        return "bg-green-100 text-green-800"
      case "revisao":
        return "bg-yellow-100 text-yellow-800"
      case "aguardando-pagamento":
        return "bg-red-100 text-red-800"
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
        return "Aguardando Revisão"
      case "aguardando-pagamento":
        return "Aguardando Pagamento"
      default:
        return "Pendente"
    }
  }

  const getUrgenciaColor = (urgencia: string) => {
    switch (urgencia) {
      case "alta":
        return "bg-red-100 text-red-800"
      case "media":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-green-100 text-green-800"
    }
  }

  const enviarMensagem = () => {
    if (!novaMensagem.trim()) return
    // Lógica para enviar mensagem
    setNovaMensagem("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Meu Painel de Controle</h1>
              <p className="text-gray-600">Acompanhe o desenvolvimento da sua monografia em tempo real</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Notificações
              </Button>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Nova Monografia
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards com Motivação */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Seus Projetos</p>
                  <p className="text-2xl font-bold text-blue-900">3</p>
                  <p className="text-xs text-blue-600">🎯 Rumo ao sucesso!</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-700">Em Desenvolvimento</p>
                  <p className="text-2xl font-bold text-yellow-900">2</p>
                  <p className="text-xs text-yellow-600">⚡ Progresso acelerado</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Concluídos</p>
                  <p className="text-2xl font-bold text-green-900">1</p>
                  <p className="text-xs text-green-600">🏆 Parabéns!</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Investimento Total</p>
                  <p className="text-2xl font-bold text-purple-900">56.500 MT</p>
                  <p className="text-xs text-purple-600">💎 Investindo no futuro</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pedidos" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pedidos">Meus Projetos</TabsTrigger>
            <TabsTrigger value="comunicacao">Chat com Especialista</TabsTrigger>
            <TabsTrigger value="revisoes">Revisões & Feedback</TabsTrigger>
            <TabsTrigger value="historico">Histórico Completo</TabsTrigger>
          </TabsList>

          <TabsContent value="pedidos" className="space-y-6">
            {pedidos.map((pedido) => (
              <Card key={pedido.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg text-gray-900">{pedido.titulo}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <span>#{pedido.id}</span>
                        <span>•</span>
                        <span>Especialista: {pedido.especialista}</span>
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(pedido.status)}>{getStatusText(pedido.status)}</Badge>
                      <Badge className={getUrgenciaColor(pedido.urgencia)}>
                        {pedido.urgencia === "alta" ? "🚨 Urgente" : "📅 Normal"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Progresso Geral</span>
                          <span className="text-sm text-gray-600">{pedido.progresso}%</span>
                        </div>
                        <Progress value={pedido.progresso} className="h-3" />
                        <p className="text-xs text-gray-500 mt-1">
                          {pedido.progresso < 50
                            ? "🚀 Desenvolvimento inicial"
                            : pedido.progresso < 80
                              ? "⚡ Progresso acelerado"
                              : pedido.progresso < 100
                                ? "🎯 Quase lá!"
                                : "🏆 Concluído!"}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Target className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">Etapa Atual:</span>
                          <span className="text-gray-600">{pedido.etapaAtual}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-green-500" />
                          <span className="font-medium">Próxima Entrega:</span>
                          <span className="text-gray-600">{pedido.proximaEntrega}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-purple-500" />
                          <span className="font-medium">Investimento:</span>
                          <span className="text-gray-600">{pedido.valor}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">Qualidade:</span>
                          <span className="text-gray-600">{pedido.qualidade}% de excelência</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={pedido.especialistaAvatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {pedido.especialista
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-blue-900">{pedido.especialista}</p>
                          <p className="text-xs text-blue-700">Seu especialista dedicado</p>
                        </div>
                        <Badge className="bg-blue-600 text-white ml-auto">Ativo</Badge>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Última atualização:</span> {pedido.ultimaAtualizacao}
                        </div>

                        {pedido.status === "concluido" && pedido.notaFinal && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <ThumbsUp className="h-4 w-4 text-green-600" />
                              <span className="font-medium text-green-800">Nota Final: {pedido.notaFinal}</span>
                            </div>
                            <p className="text-xs text-green-700 mt-1">🎉 Parabéns pelo sucesso!</p>
                          </div>
                        )}

                        {pedido.status === "revisao" && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-yellow-600" />
                              <span className="font-medium text-yellow-800">Aguardando sua revisão</span>
                            </div>
                            <p className="text-xs text-yellow-700 mt-1">📝 Revise e aprove o trabalho</p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 flex-wrap mt-4">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Chat Direto
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Visualizar
                        </Button>
                        {pedido.status === "concluido" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Download className="h-4 w-4 mr-2" />
                            Download Final
                          </Button>
                        )}
                        {pedido.status === "revisao" && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Edit className="h-4 w-4 mr-2" />
                            Revisar Agora
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="comunicacao">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Lista de Conversas */}
              <Card>
                <CardHeader>
                  <CardTitle>Conversas com Especialistas</CardTitle>
                  <CardDescription>Comunicação direta e transparente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pedidos
                      .filter((p) => p.status !== "concluido")
                      .map((pedido) => (
                        <div
                          key={pedido.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            pedidoSelecionado === pedido.id
                              ? "bg-blue-50 border-blue-200 border"
                              : "bg-gray-50 hover:bg-gray-100"
                          }`}
                          onClick={() => setPedidoSelecionado(pedido.id)}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={pedido.especialistaAvatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {pedido.especialista
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{pedido.especialista}</p>
                              <p className="text-xs text-gray-600 truncate">{pedido.titulo}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-xs text-green-600">Online agora</span>
                              </div>
                            </div>
                            {mensagens.some((m) => m.pedidoId === pedido.id && !m.lida) && (
                              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chat */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Chat - {pedidos.find((p) => p.id === pedidoSelecionado)?.titulo}</CardTitle>
                      <CardDescription>Comunicação em tempo real com seu especialista</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Online
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-96 p-4">
                    <div className="space-y-4">
                      {mensagens
                        .filter((m) => m.pedidoId === pedidoSelecionado)
                        .map((msg) => (
                          <div key={msg.id} className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {msg.remetente === "Sistema"
                                  ? "🤖"
                                  : msg.remetente
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium text-sm">{msg.remetente}</p>
                                <span className="text-xs text-gray-500">{msg.timestamp}</span>
                                {msg.importante && (
                                  <Badge className="bg-red-100 text-red-800 text-xs">Importante</Badge>
                                )}
                              </div>
                              <div
                                className={`rounded-lg p-3 ${
                                  msg.remetente === "Sistema"
                                    ? "bg-blue-50 border border-blue-200"
                                    : msg.tipo === "texto"
                                      ? "bg-gray-100"
                                      : "bg-green-50"
                                }`}
                              >
                                <p className="text-sm">{msg.conteudo}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </ScrollArea>

                  <div className="p-4 border-t bg-gray-50">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Digite sua mensagem para o especialista..."
                        value={novaMensagem}
                        onChange={(e) => setNovaMensagem(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && enviarMensagem()}
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button onClick={enviarMensagem} size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      💬 Resposta garantida em até 2 horas durante horário comercial
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revisoes">
            <Card>
              <CardHeader>
                <CardTitle>Central de Revisões</CardTitle>
                <CardDescription>Revise e aprove o trabalho do seu especialista</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {pedidos
                    .filter((p) => p.status === "revisao")
                    .map((pedido) => (
                      <div
                        key={pedido.id}
                        className="border rounded-lg p-6 bg-gradient-to-r from-yellow-50 to-orange-50"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-medium text-lg">{pedido.titulo}</h3>
                            <p className="text-sm text-gray-600">
                              #{pedido.id} • Especialista: {pedido.especialista}
                            </p>
                          </div>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Aguardando Sua Revisão
                          </Badge>
                        </div>

                        <div className="bg-white rounded-lg p-4 mb-4">
                          <h4 className="font-medium mb-2">📋 Resumo do Trabalho Entregue:</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>✅ Monografia completa com {pedido.titulo}</li>
                            <li>✅ Todas as normas acadêmicas aplicadas</li>
                            <li>✅ Verificação anti-plágio realizada</li>
                            <li>✅ Formatação profissional</li>
                            <li>✅ Bibliografia completa e atualizada</li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="feedback" className="text-sm font-medium">
                              💬 Seus Comentários e Sugestões (Opcional)
                            </Label>
                            <Textarea
                              id="feedback"
                              placeholder="Deixe aqui qualquer comentário, sugestão de melhoria ou dúvida sobre o trabalho..."
                              className="min-h-[100px] mt-2"
                            />
                          </div>

                          <div className="flex gap-3 flex-wrap">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="h-4 w-4 mr-2" />✅ Aprovar Trabalho
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                            >
                              <Edit className="h-4 w-4 mr-2" />📝 Solicitar Ajustes
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-2" />📄 Download Prévia
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4 mr-2" />💬 Chat com Especialista
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                  {pedidos.filter((p) => p.status === "revisao").length === 0 && (
                    <div className="text-center py-12">
                      <CheckCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma revisão pendente</h3>
                      <p className="text-gray-600">
                        Todos os seus trabalhos estão em desenvolvimento ou já foram aprovados.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historico">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Sucessos</CardTitle>
                <CardDescription>Todos os seus projetos acadêmicos realizados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pedidos.map((pedido) => (
                    <div
                      key={pedido.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            pedido.status === "concluido"
                              ? "bg-green-500"
                              : pedido.status === "em-andamento"
                                ? "bg-blue-500"
                                : "bg-yellow-500"
                          }`}
                        ></div>
                        <div>
                          <p className="font-medium">{pedido.titulo}</p>
                          <p className="text-sm text-gray-600">
                            #{pedido.id} • {getStatusText(pedido.status)} • Prazo: {pedido.prazo}
                          </p>
                          <p className="text-xs text-gray-500">
                            Especialista: {pedido.especialista} • Qualidade: {pedido.qualidade}%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-sm font-medium">{pedido.valor}</span>
                          {pedido.notaFinal && <p className="text-xs text-green-600">Nota: {pedido.notaFinal}</p>}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Detalhes
                          </Button>
                          {pedido.status === "concluido" && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Estatísticas de Sucesso */}
                <div className="mt-8 grid md:grid-cols-3 gap-4">
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4 text-center">
                      <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-800">100%</p>
                      <p className="text-sm text-green-700">Taxa de Aprovação</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4 text-center">
                      <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-800">97%</p>
                      <p className="text-sm text-blue-700">Qualidade Média</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-purple-50 border-purple-200">
                    <CardContent className="p-4 text-center">
                      <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-purple-800">18</p>
                      <p className="text-sm text-purple-700">Nota Média</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
