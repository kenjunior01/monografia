"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DollarSign,
  Users,
  TrendingUp,
  Copy,
  Share2,
  Download,
  Eye,
  CheckCircle,
  Clock,
  Target,
  Zap,
  MessageSquare,
  LinkIcon,
} from "lucide-react"

export default function AfiliadoDashboard() {
  const [codigoAfiliado] = useState("AFIL-CARLOS-2024")
  const [linkAfiliado] = useState(`https://monografiaplus.com/novo-pedido?ref=${codigoAfiliado}`)

  const [estatisticas] = useState({
    totalIndicacoes: 23,
    indicacoesPagas: 18,
    indicacoesPendentes: 5,
    ganhoTotal: 18000,
    ganhoPendente: 5000,
    ganhoMes: 8000,
    conversao: 78.3,
    metaMensal: 25,
    progressoMeta: 72,
  })

  const [indicacoes] = useState([
    {
      id: "IND-001",
      cliente: "Maria Santos",
      email: "maria@email.com",
      dataIndicacao: "2024-02-01",
      status: "pago",
      valorPedido: "18.500 MT",
      comissao: "1.000 MT",
      dataPagamento: "2024-02-03",
    },
    {
      id: "IND-002",
      cliente: "João Silva",
      email: "joao@email.com",
      dataIndicacao: "2024-02-02",
      status: "pendente",
      valorPedido: "15.200 MT",
      comissao: "1.000 MT",
      dataPagamento: null,
    },
    {
      id: "IND-003",
      cliente: "Ana Costa",
      email: "ana@email.com",
      dataIndicacao: "2024-02-03",
      status: "pago",
      valorPedido: "22.800 MT",
      comissao: "1.000 MT",
      dataPagamento: "2024-02-05",
    },
  ])

  const [materiaisMarketing] = useState([
    {
      tipo: "Banner",
      nome: "Banner Principal - Urgência",
      formato: "1080x1080",
      downloads: 45,
    },
    {
      tipo: "Post",
      nome: "Post Instagram - Depoimento",
      formato: "1080x1080",
      downloads: 32,
    },
    {
      tipo: "Story",
      nome: "Story - Oferta Limitada",
      formato: "1080x1920",
      downloads: 28,
    },
    {
      tipo: "Texto",
      nome: "Copy WhatsApp - Persuasivo",
      formato: "TXT",
      downloads: 67,
    },
  ])

  const copiarLink = () => {
    navigator.clipboard.writeText(linkAfiliado)
    // Toast notification
  }

  const copiarCodigo = () => {
    navigator.clipboard.writeText(codigoAfiliado)
    // Toast notification
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pago":
        return "bg-green-100 text-green-800"
      case "pendente":
        return "bg-yellow-100 text-yellow-800"
      case "cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pago":
        return "Pago"
      case "pendente":
        return "Pendente"
      case "cancelado":
        return "Cancelado"
      default:
        return "Desconhecido"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Painel do Afiliado</h1>
              <p className="text-gray-600">Gerencie suas indicações e maximize seus ganhos</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Suporte
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar Link
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Ganho Total</p>
                  <p className="text-2xl font-bold text-green-900">{estatisticas.ganhoTotal.toLocaleString()} MT</p>
                  <p className="text-xs text-green-600">+{estatisticas.ganhoMes.toLocaleString()} MT este mês</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Total Indicações</p>
                  <p className="text-2xl font-bold text-blue-900">{estatisticas.totalIndicacoes}</p>
                  <p className="text-xs text-blue-600">{estatisticas.indicacoesPagas} pagas</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Taxa Conversão</p>
                  <p className="text-2xl font-bold text-purple-900">{estatisticas.conversao}%</p>
                  <p className="text-xs text-purple-600">Acima da média</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">Meta Mensal</p>
                  <p className="text-2xl font-bold text-orange-900">
                    {Math.round((estatisticas.progressoMeta / 100) * estatisticas.metaMensal)}/{estatisticas.metaMensal}
                  </p>
                  <Progress value={estatisticas.progressoMeta} className="h-2 mt-2" />
                </div>
                <Target className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="indicacoes">Minhas Indicações</TabsTrigger>
            <TabsTrigger value="materiais">Materiais Marketing</TabsTrigger>
            <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Link de Afiliado */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5" />
                    Seu Link de Afiliado
                  </CardTitle>
                  <CardDescription>Compartilhe este link para ganhar comissões</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Código do Afiliado:</label>
                      <div className="flex gap-2 mt-1">
                        <Input value={codigoAfiliado} readOnly className="font-mono" />
                        <Button variant="outline" onClick={copiarCodigo}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Link Completo:</label>
                      <div className="flex gap-2 mt-1">
                        <Input value={linkAfiliado} readOnly className="font-mono text-xs" />
                        <Button variant="outline" onClick={copiarLink}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 mb-2">💡 Como usar seu link:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Compartilhe em redes sociais</li>
                        <li>• Envie por WhatsApp para amigos</li>
                        <li>• Use em grupos de estudantes</li>
                        <li>• Inclua em seu bio do Instagram</li>
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Share2 className="h-4 w-4 mr-2" />
                        Compartilhar WhatsApp
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        QR Code
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resumo Financeiro */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-800">💰 Resumo Financeiro</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Ganho Total:</span>
                      <span className="font-bold text-green-600">{estatisticas.ganhoTotal.toLocaleString()} MT</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pendente:</span>
                      <span className="font-medium text-yellow-600">
                        {estatisticas.ganhoPendente.toLocaleString()} MT
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Este Mês:</span>
                      <span className="font-medium">{estatisticas.ganhoMes.toLocaleString()} MT</span>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-green-800">Próximo Pagamento:</p>
                      <p className="text-lg font-bold text-green-600">
                        {estatisticas.ganhoPendente.toLocaleString()} MT
                      </p>
                      <p className="text-xs text-green-700">Processamento em 24-48h</p>
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Solicitar Pagamento
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Indicações Recentes */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>📊 Indicações Recentes</CardTitle>
                <CardDescription>Suas últimas indicações e status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {indicacoes.slice(0, 5).map((indicacao) => (
                    <div key={indicacao.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {indicacao.cliente
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{indicacao.cliente}</p>
                          <p className="text-sm text-gray-600">{indicacao.email}</p>
                          <p className="text-xs text-gray-500">Indicado em {indicacao.dataIndicacao}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(indicacao.status)}>{getStatusText(indicacao.status)}</Badge>
                        <p className="text-sm font-medium mt-1">{indicacao.comissao}</p>
                        <p className="text-xs text-gray-500">Pedido: {indicacao.valorPedido}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="indicacoes">
            <Card>
              <CardHeader>
                <CardTitle>👥 Todas as Indicações</CardTitle>
                <CardDescription>Histórico completo das suas indicações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {indicacoes.map((indicacao) => (
                    <div key={indicacao.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>
                              {indicacao.cliente
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{indicacao.cliente}</h3>
                            <p className="text-sm text-gray-600">{indicacao.email}</p>
                            <p className="text-xs text-gray-500">ID: {indicacao.id}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(indicacao.status)}>{getStatusText(indicacao.status)}</Badge>
                      </div>

                      <div className="grid md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Data Indicação:</p>
                          <p className="font-medium">{indicacao.dataIndicacao}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Valor Pedido:</p>
                          <p className="font-medium">{indicacao.valorPedido}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Sua Comissão:</p>
                          <p className="font-medium text-green-600">{indicacao.comissao}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Data Pagamento:</p>
                          <p className="font-medium">{indicacao.dataPagamento || "Pendente"}</p>
                        </div>
                      </div>

                      {indicacao.status === "pendente" && (
                        <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm text-yellow-800">
                              Aguardando pagamento do cliente para liberar sua comissão
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materiais">
            <Card>
              <CardHeader>
                <CardTitle>🎨 Materiais de Marketing</CardTitle>
                <CardDescription>Banners, posts e textos prontos para usar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {materiaisMarketing.map((material, index) => (
                    <Card
                      key={index}
                      className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors"
                    >
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            {material.tipo === "Banner" && <Eye className="h-6 w-6 text-blue-600" />}
                            {material.tipo === "Post" && <Share2 className="h-6 w-6 text-blue-600" />}
                            {material.tipo === "Story" && <Zap className="h-6 w-6 text-blue-600" />}
                            {material.tipo === "Texto" && <MessageSquare className="h-6 w-6 text-blue-600" />}
                          </div>
                          <h3 className="font-medium mb-1">{material.nome}</h3>
                          <p className="text-sm text-gray-600 mb-2">{material.formato}</p>
                          <p className="text-xs text-gray-500 mb-3">{material.downloads} downloads</p>
                          <Button size="sm" className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">💡 Dicas de Uso:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Personalize os materiais com seu toque pessoal</li>
                    <li>• Use stories para criar urgência</li>
                    <li>• Compartilhe depoimentos reais</li>
                    <li>• Foque nos benefícios para o estudante</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pagamentos">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>💳 Histórico de Pagamentos</CardTitle>
                  <CardDescription>Todos os seus pagamentos recebidos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {indicacoes
                      .filter((i) => i.status === "pago")
                      .map((indicacao) => (
                        <div key={indicacao.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{indicacao.cliente}</p>
                            <p className="text-sm text-gray-600">Indicação #{indicacao.id}</p>
                            <p className="text-xs text-gray-500">Pago em {indicacao.dataPagamento}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">{indicacao.comissao}</p>
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Pago
                            </Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>📊 Resumo Pagamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">{estatisticas.ganhoTotal.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Total Recebido (MT)</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Janeiro 2024:</span>
                        <span className="font-medium">10.000 MT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Fevereiro 2024:</span>
                        <span className="font-medium">8.000 MT</span>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-yellow-800">Próximo Pagamento:</p>
                      <p className="text-lg font-bold text-yellow-600">
                        {estatisticas.ganhoPendente.toLocaleString()} MT
                      </p>
                      <p className="text-xs text-yellow-700">5 indicações pendentes</p>
                    </div>
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
