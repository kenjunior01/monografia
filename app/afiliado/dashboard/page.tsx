
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  DollarSign,
  Users,
  TrendingUp,
  Share2,
  Copy,
  WhatsApp,
  Facebook,
  Instagram,
  Twitter,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  Target,
  Gift,
  Zap,
  Star,
  Phone,
  Mail,
  Globe,
  BarChart3,
  Calendar,
  FileText,
  Video,
  Image as ImageIcon,
  Megaphone,
  Link
} from "lucide-react"

export default function AfiliadoDashboard() {
  const { toast } = useToast()
  const [stats, setStats] = useState({
    totalComissoes: 2450.00,
    comissoesPendentes: 890.00,
    indicacoesTotal: 47,
    indicacoesMes: 12,
    conversaoTaxa: 24.5,
    ticketMedio: 750.00
  })

  const [linkAfiliado] = useState("https://monografiaplus.com/?ref=AFL001")
  const [codigoAfiliado] = useState("AFL001")

  const indicacoes = [
    {
      id: 1,
      cliente: "João Silva",
      email: "joao@email.com",
      pedido: "MON-2024-001",
      valor: 750.00,
      comissao: 75.00,
      status: "convertido",
      data: "2024-01-15"
    },
    {
      id: 2,
      cliente: "Maria Santos",
      email: "maria@email.com",
      pedido: "MON-2024-002",
      valor: 920.00,
      comissao: 92.00,
      status: "convertido",
      data: "2024-01-14"
    },
    {
      id: 3,
      cliente: "Pedro Costa",
      email: "pedro@email.com",
      pedido: "",
      valor: 0,
      comissao: 0,
      status: "pendente",
      data: "2024-01-13"
    }
  ]

  const materiaisMarketing = [
    {
      id: 1,
      tipo: "banner",
      titulo: "Banner Principal 300x250",
      descricao: "Banner otimizado para redes sociais",
      formato: "PNG",
      downloads: 156
    },
    {
      id: 2,
      tipo: "video",
      titulo: "Vídeo Promocional 60s",
      descricao: "Vídeo explicativo sobre nossos serviços",
      formato: "MP4",
      downloads: 89
    },
    {
      id: 3,
      tipo: "texto",
      titulo: "Scripts para WhatsApp",
      descricao: "Textos prontos para abordagem",
      formato: "TXT",
      downloads: 234
    }
  ]

  const comissoesPagamentos = [
    {
      id: 1,
      periodo: "Dezembro 2023",
      valor: 1250.00,
      status: "pago",
      dataPagamento: "2024-01-05",
      indicacoes: 15
    },
    {
      id: 2,
      periodo: "Janeiro 2024",
      valor: 890.00,
      status: "pendente",
      dataPagamento: "",
      indicacoes: 12
    }
  ]

  const copiarLink = () => {
    navigator.clipboard.writeText(linkAfiliado)
    toast({
      title: "Link copiado!",
      description: "Seu link de afiliado foi copiado para a área de transferência.",
    })
  }

  const compartilharRede = (rede: string) => {
    const texto = "Precisa de uma monografia de qualidade? Conheça a MonografiaPlus!"
    const url = linkAfiliado
    
    const links = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(texto + " " + url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(url)}`,
      instagram: url // Instagram não permite compartilhamento direto
    }
    
    if (rede === 'instagram') {
      copiarLink()
      toast({
        title: "Link copiado!",
        description: "Cole o link no seu story ou post do Instagram.",
      })
    } else {
      window.open(links[rede as keyof typeof links], '_blank')
    }
  }

  const baixarMaterial = (materialId: number) => {
    toast({
      title: "Download iniciado!",
      description: "O material está sendo baixado...",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'convertido':
        return 'bg-green-100 text-green-800'
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800'
      case 'pago':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard Afiliado</h1>
            <p className="text-gray-600">Gerencie suas indicações e acompanhe seus ganhos</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Badge variant="outline" className="text-center">
              Código: {codigoAfiliado}
            </Badge>
            <Badge className="bg-green-600 text-center">
              Status: Ativo
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comissões Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">MT {stats.totalComissoes.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Indicações</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.indicacoesTotal}</div>
              <p className="text-xs text-muted-foreground">{stats.indicacoesMes} este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa Conversão</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.conversaoTaxa}%</div>
              <Progress value={stats.conversaoTaxa} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="indicacoes">Indicações</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="comissoes">Comissões</TabsTrigger>
            <TabsTrigger value="ferramentas">Ferramentas</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Link de Afiliado */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link className="h-5 w-5" />
                    Seu Link de Afiliado
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input value={linkAfiliado} readOnly className="flex-1" />
                    <Button onClick={copiarLink} size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => compartilharRede('whatsapp')}
                      className="flex items-center gap-2"
                    >
                      <WhatsApp className="h-4 w-4" />
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => compartilharRede('facebook')}
                      className="flex items-center gap-2"
                    >
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => compartilharRede('instagram')}
                      className="flex items-center gap-2"
                    >
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Metas e Conquistas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Metas do Mês
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Indicações (12/15)</span>
                      <span>80%</span>
                    </div>
                    <Progress value={80} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Comissões (MT 890/1200)</span>
                      <span>74%</span>
                    </div>
                    <Progress value={74} />
                  </div>

                  <Alert>
                    <Gift className="h-4 w-4" />
                    <AlertDescription>
                      Faltam apenas 3 indicações para ganhar bônus de MT 200!
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>

            {/* Últimas Indicações */}
            <Card>
              <CardHeader>
                <CardTitle>Últimas Indicações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {indicacoes.slice(0, 3).map((indicacao) => (
                    <div key={indicacao.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{indicacao.cliente}</p>
                        <p className="text-sm text-gray-600">{indicacao.email}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(indicacao.status)}>
                          {indicacao.status}
                        </Badge>
                        {indicacao.comissao > 0 && (
                          <p className="text-sm font-medium text-green-600">
                            +MT {indicacao.comissao}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Indicações Tab */}
          <TabsContent value="indicacoes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Todas as Indicações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {indicacoes.map((indicacao) => (
                    <div key={indicacao.id} className="border rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <p className="font-medium">{indicacao.cliente}</p>
                          <p className="text-sm text-gray-600">{indicacao.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Pedido</p>
                          <p className="font-medium">{indicacao.pedido || "Pendente"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Comissão</p>
                          <p className="font-medium text-green-600">
                            MT {indicacao.comissao.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className={getStatusColor(indicacao.status)}>
                            {indicacao.status}
                          </Badge>
                          <span className="text-sm text-gray-500">{indicacao.data}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Marketing Tab */}
          <TabsContent value="marketing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5" />
                  Materiais de Marketing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {materiaisMarketing.map((material) => (
                    <div key={material.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {material.tipo === 'banner' && <ImageIcon className="h-5 w-5 text-blue-500" />}
                          {material.tipo === 'video' && <Video className="h-5 w-5 text-red-500" />}
                          {material.tipo === 'texto' && <FileText className="h-5 w-5 text-green-500" />}
                          <span className="text-sm font-medium">{material.formato}</span>
                        </div>
                        <Badge variant="outline">{material.downloads} downloads</Badge>
                      </div>
                      
                      <h3 className="font-medium mb-2">{material.titulo}</h3>
                      <p className="text-sm text-gray-600 mb-4">{material.descricao}</p>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => baixarMaterial(material.id)}
                          className="flex-1"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Baixar
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Scripts Prontos */}
            <Card>
              <CardHeader>
                <CardTitle>Scripts Prontos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">WhatsApp - Abordagem Inicial</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      "Olá! Você está fazendo TCC ou monografia? Conheço uma plataforma incrível que pode te ajudar com qualidade garantida. Quer saber mais?"
                    </p>
                    <Button size="sm" variant="outline" onClick={copiarLink}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar
                    </Button>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Redes Sociais - Post</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      "TCC te deixando maluco? 😅 Descobri uma plataforma que faz monografias personalizadas com qualidade acadêmica. Vale muito a pena conferir! #TCC #Monografia #Formatura"
                    </p>
                    <Button size="sm" variant="outline" onClick={copiarLink}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comissões Tab */}
          <TabsContent value="comissoes" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Histórico de Comissões</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {comissoesPagamentos.map((comissao) => (
                      <div key={comissao.id} className="border rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                          <div>
                            <p className="font-medium">{comissao.periodo}</p>
                            <p className="text-sm text-gray-600">{comissao.indicacoes} indicações</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-green-600">
                              MT {comissao.valor.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <Badge className={getStatusColor(comissao.status)}>
                              {comissao.status}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              {comissao.dataPagamento || "Aguardando"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resumo Financeiro</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Ganho</p>
                    <p className="text-2xl font-bold text-green-600">
                      MT {stats.totalComissoes.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600">Aguardando Pagamento</p>
                    <p className="text-xl font-bold text-yellow-600">
                      MT {stats.comissoesPendentes.toFixed(2)}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Próximo Pagamento</p>
                    <p className="text-sm text-gray-600">05 de Fevereiro 2024</p>
                    <Progress value={75} />
                    <p className="text-xs text-gray-500">75% do período concluído</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Ferramentas Tab */}
          <TabsContent value="ferramentas" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Gerador de Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="campanha">Nome da Campanha</Label>
                    <Input id="campanha" placeholder="Ex: WhatsApp Janeiro" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="utm">UTM Source</Label>
                    <Input id="utm" placeholder="Ex: instagram, whatsapp, facebook" />
                  </div>
                  
                  <Button className="w-full">
                    <Zap className="h-4 w-4 mr-2" />
                    Gerar Link Personalizado
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Dicas de Conversão
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">🎯 Foque no problema</h4>
                    <p className="text-sm text-blue-800">Destaque como nossos serviços resolvem os problemas do TCC</p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900">⚡ Urgência</h4>
                    <p className="text-sm text-green-800">Mencione prazos e a importância de começar logo</p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900">👥 Prova Social</h4>
                    <p className="text-sm text-purple-800">Compartilhe depoimentos e casos de sucesso</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Calculadora de Comissões */}
            <Card>
              <CardHeader>
                <CardTitle>Calculadora de Comissões</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Valor do Pedido (MT)</Label>
                    <Input type="number" placeholder="750" />
                  </div>
                  <div className="space-y-2">
                    <Label>Taxa de Comissão (%)</Label>
                    <Input value="10" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Sua Comissão</Label>
                    <div className="text-lg font-bold text-green-600 bg-green-50 p-2 rounded">
                      MT 75.00
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
