"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Clock, CheckCircle, MessageSquare, Download, Star, Calendar, DollarSign } from "lucide-react"

export default function DashboardPage() {
  const [pedidos] = useState([
    {
      id: "MON-001",
      titulo: "Gestão de Recursos Humanos em Startups",
      status: "em-andamento",
      progresso: 65,
      prazo: "2024-02-15",
      valor: "R$ 750,00",
      escritor: "Dr. Ana Silva",
      ultimaAtualizacao: "Há 2 horas",
    },
    {
      id: "MON-002",
      titulo: "Sustentabilidade no Setor Bancário",
      status: "concluido",
      progresso: 100,
      prazo: "2024-01-20",
      valor: "R$ 900,00",
      escritor: "Prof. Carlos Santos",
      ultimaAtualizacao: "Há 3 dias",
    },
    {
      id: "MON-003",
      titulo: "Transformação Digital na Educação",
      status: "revisao",
      progresso: 90,
      prazo: "2024-02-28",
      valor: "R$ 650,00",
      escritor: "Dra. Maria Costa",
      ultimaAtualizacao: "Há 1 dia",
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
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "em-andamento":
        return "Em Andamento"
      case "concluido":
        return "Concluído"
      case "revisao":
        return "Em Revisão"
      default:
        return "Pendente"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Acompanhe seus pedidos e progresso</p>
            </div>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Novo Pedido
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Pedidos</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Em Andamento</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Concluídos</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Valor Total</p>
                  <p className="text-2xl font-bold">R$ 8.450</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pedidos" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pedidos">Meus Pedidos</TabsTrigger>
            <TabsTrigger value="mensagens">Mensagens</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="pedidos" className="space-y-6">
            {pedidos.map((pedido) => (
              <Card key={pedido.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{pedido.titulo}</CardTitle>
                      <CardDescription>Pedido #{pedido.id}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(pedido.status)}>{getStatusText(pedido.status)}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Progresso</span>
                          <span className="text-sm text-gray-600">{pedido.progresso}%</span>
                        </div>
                        <Progress value={pedido.progresso} className="h-2" />
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Prazo: {pedido.prazo}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{pedido.valor}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>AS</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{pedido.escritor}</p>
                          <p className="text-xs text-gray-600">Escritor responsável</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div className="text-sm text-gray-600 mb-4">Última atualização: {pedido.ultimaAtualizacao}</div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Chat
                        </Button>
                        {pedido.status === "concluido" && (
                          <Button size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                        {pedido.status === "revisao" && (
                          <Button size="sm" variant="outline">
                            <Star className="h-4 w-4 mr-2" />
                            Revisar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="mensagens">
            <Card>
              <CardHeader>
                <CardTitle>Central de Mensagens</CardTitle>
                <CardDescription>Comunicação com escritores e suporte</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      remetente: "Dr. Ana Silva",
                      mensagem: "Olá! Acabei de finalizar o primeiro capítulo da sua monografia. Gostaria de revisar?",
                      tempo: "Há 2 horas",
                      pedido: "MON-001",
                    },
                    {
                      remetente: "Suporte MonografiaPlus",
                      mensagem: "Seu pedido MON-003 está pronto para revisão. Clique aqui para acessar.",
                      tempo: "Há 1 dia",
                      pedido: "MON-003",
                    },
                  ].map((msg, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {msg.remetente
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-sm">{msg.remetente}</p>
                          <span className="text-xs text-gray-500">{msg.tempo}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{msg.mensagem}</p>
                        <Badge variant="outline" className="text-xs">
                          {msg.pedido}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historico">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Pedidos</CardTitle>
                <CardDescription>Todos os seus pedidos anteriores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pedidos
                    .filter((p) => p.status === "concluido")
                    .map((pedido) => (
                      <div key={pedido.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{pedido.titulo}</p>
                          <p className="text-sm text-gray-600">
                            #{pedido.id} • Concluído em {pedido.prazo}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{pedido.valor}</span>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
