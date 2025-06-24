"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Sparkles,
  Calculator,
  FileText,
  Globe,
  Building,
  CreditCard,
  Banknote,
  Smartphone,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Shield,
  Target,
  TrendingDown,
  Gift,
  Users,
  Star,
  Award,
} from "lucide-react"

import type { Viewport } from "next"

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#2563eb'
}

interface PricingBreakdown {
  precoBase: number
  custoAdicionalPaginas: number
  custoUrgencia: number
  custoEstudoCaso: number
  custoRevisoes: number
  custoSuporte: number
  custoFormatacao: number
  custoApresentacao: number
  subtotal: number
  desconto: number
  total: number
  economia: number
  detalhes: {
    paginasIncluidas: number
    paginasAdicionais: number
    nivelMultiplier: number
    areaMultiplier: number
    urgenciaMultiplier: number
    temDesconto: boolean
    percentualEconomia: number
  }
}

export default function NovoPedidoPage() {
  const searchParams = useSearchParams()
  const codigoAfiliado = searchParams.get("ref")

  const [etapaAtual, setEtapaAtual] = useState(1)
  const [formData, setFormData] = useState({
    pais: "",
    instituicao: "",
    tema: "",
    area: "",
    nivel: "",
    paginas: "50",
    prazo: "14",
    citacao: "",
    precisaEstudoCaso: false,
    nomeEmpresa: "",
    setorEmpresa: "",
    detalhesEmpresa: "",
    descricao: "",
    revisoesPremium: false,
    suporteUrgente: false,
    formatacaoEspecial: false,
    apresentacaoDefesa: false,
    materiaisApoio: null,
    metodoPagamento: "",
    codigoAfiliado: codigoAfiliado || "",
  })

  const [precoDetalhado, setPrecoDetalhado] = useState<PricingBreakdown>({
    precoBase: 12000,
    custoAdicionalPaginas: 0,
    custoUrgencia: 0,
    custoEstudoCaso: 0,
    custoRevisoes: 0,
    custoSuporte: 0,
    custoFormatacao: 0,
    custoApresentacao: 0,
    subtotal: 12000,
    desconto: 2000,
    total: 10000,
    economia: 2000,
    detalhes: {
      paginasIncluidas: 40,
      paginasAdicionais: 0,
      nivelMultiplier: 1.0,
      areaMultiplier: 1.0,
      urgenciaMultiplier: 1.0,
      temDesconto: true,
      percentualEconomia: 17,
    },
  })

  const [mostrarSugestoes, setMostrarSugestoes] = useState(false)
  const [vagasRestantes, setVagasRestantes] = useState(3)
  const [calculandoPreco, setCalculandoPreco] = useState(false)

  const calcularPreco = async () => {
    if (!formData.paginas || !formData.prazo || !formData.nivel || !formData.area) return

    setCalculandoPreco(true)
    try {
      const response = await fetch("/api/pricing/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paginas: Number.parseInt(formData.paginas),
          prazo: Number.parseInt(formData.prazo),
          nivel: formData.nivel,
          area: formData.area,
          precisaEstudoCaso: formData.precisaEstudoCaso,
          revisoesPremium: formData.revisoesPremium,
          suporteUrgente: formData.suporteUrgente,
          formatacaoEspecial: formData.formatacaoEspecial,
          apresentacaoDefesa: formData.apresentacaoDefesa,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setPrecoDetalhado(data.pricing)
      }
    } catch (error) {
      console.error("Erro ao calcular preço:", error)
    } finally {
      setCalculandoPreco(false)
    }
  }

  useEffect(() => {
    calcularPreco()
  }, [
    formData.paginas,
    formData.prazo,
    formData.nivel,
    formData.area,
    formData.precisaEstudoCaso,
    formData.revisoesPremium,
    formData.suporteUrgente,
    formData.formatacaoEspecial,
    formData.apresentacaoDefesa,
  ])

  const formatarMoeda = (valor: number) => {
    return `${valor.toLocaleString("pt-MZ")} MT`
  }

  const proximaEtapa = () => {
    if (etapaAtual < 3) {
      setEtapaAtual(etapaAtual + 1)
    }
  }

  const etapaAnterior = () => {
    if (etapaAtual > 1) {
      setEtapaAtual(etapaAtual - 1)
    }
  }

  const gerarSugestoes = () => {
    setMostrarSugestoes(true)
  }

  const submeterPedido = async () => {
    try {
      const response = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          precoCalculado: precoDetalhado,
        }),
      })

      const data = await response.json()
      if (data.success) {
        // Redirecionar para página de confirmação
        window.location.href = `/pedido-confirmado/${data.data.id}`
      }
    } catch (error) {
      console.error("Erro ao submeter pedido:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header com Urgência e Afiliado */}
        <div className="mb-8 text-center">
          {codigoAfiliado && (
            <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center gap-2 text-green-800">
                <Gift className="h-5 w-5" />
                <span className="font-bold">VOCÊ FOI INDICADO! Código: {codigoAfiliado}</span>
              </div>
            </div>
          )}

          <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-bold">APENAS {vagasRestantes} VAGAS RESTANTES ESTA SEMANA!</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">🎓 Sua Monografia de Excelência Está a Um Clique</h1>
          <p className="text-xl text-gray-600 mb-4">
            Especialista dedicado • Entrega garantida • Aprovação ou refazemos grátis
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Etapa {etapaAtual} de 3</span>
              <span>{Math.round((etapaAtual / 3) * 100)}% completo</span>
            </div>
            <Progress value={(etapaAtual / 3) * 100} className="h-3" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulário Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Etapa 1: Informações Básicas */}
            {etapaAtual === 1 && (
              <Card className="border-2 border-blue-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <Globe className="h-5 w-5" />
                    Etapa 1: Conte-nos Sobre Seu Projeto
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    🎯 Vamos criar a monografia perfeita para suas necessidades específicas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pais" className="font-medium">
                        País/Região *
                      </Label>
                      <Select
                        value={formData.pais}
                        onValueChange={(value) => setFormData({ ...formData, pais: value })}
                      >
                        <SelectTrigger className="border-2">
                          <SelectValue placeholder="Selecione seu país" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mocambique">🇲🇿 Moçambique</SelectItem>
                          <SelectItem value="angola">🇦🇴 Angola</SelectItem>
                          <SelectItem value="brasil">🇧🇷 Brasil</SelectItem>
                          <SelectItem value="portugal">🇵🇹 Portugal</SelectItem>
                          <SelectItem value="outro">🌍 Outro país</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instituicao" className="font-medium">
                        Sua Universidade *
                      </Label>
                      <Input
                        id="instituicao"
                        placeholder="Ex: Universidade Eduardo Mondlane"
                        value={formData.instituicao}
                        onChange={(e) => setFormData({ ...formData, instituicao: e.target.value })}
                        className="border-2"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nivel" className="font-medium">
                        Nível do Curso *
                      </Label>
                      <Select
                        value={formData.nivel}
                        onValueChange={(value) => setFormData({ ...formData, nivel: value })}
                      >
                        <SelectTrigger className="border-2">
                          <SelectValue placeholder="Selecione o nível" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="licenciatura">🎓 Licenciatura</SelectItem>
                          <SelectItem value="mestrado">🎯 Mestrado (+40%)</SelectItem>
                          <SelectItem value="doutorado">👨‍🎓 Doutorado (+80%)</SelectItem>
                          <SelectItem value="pos-graduacao">📚 Pós-graduação (+20%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area" className="font-medium">
                        Área de Estudo *
                      </Label>
                      <Select
                        value={formData.area}
                        onValueChange={(value) => setFormData({ ...formData, area: value })}
                      >
                        <SelectTrigger className="border-2">
                          <SelectValue placeholder="Sua área" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="administracao">💼 Administração</SelectItem>
                          <SelectItem value="direito">⚖️ Direito (+30%)</SelectItem>
                          <SelectItem value="engenharia">🔧 Engenharia (+40%)</SelectItem>
                          <SelectItem value="medicina">🏥 Medicina (+50%)</SelectItem>
                          <SelectItem value="educacao">📖 Educação</SelectItem>
                          <SelectItem value="economia">💰 Economia (+20%)</SelectItem>
                          <SelectItem value="psicologia">🧠 Psicologia (+10%)</SelectItem>
                          <SelectItem value="tecnologia">💻 Tecnologia (+30%)</SelectItem>
                          <SelectItem value="outro">📋 Outra área</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tema" className="font-medium">
                      Tema da Monografia
                    </Label>
                    <Input
                      id="tema"
                      placeholder="Digite seu tema ou deixe em branco para sugestões personalizadas"
                      value={formData.tema}
                      onChange={(e) => setFormData({ ...formData, tema: e.target.value })}
                      className="border-2"
                    />
                    {!formData.tema && (
                      <Button variant="outline" size="sm" onClick={gerarSugestoes} className="mt-2">
                        <Sparkles className="h-4 w-4 mr-2" />🤖 Gerar Temas com IA
                      </Button>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={proximaEtapa}
                      disabled={!formData.pais || !formData.instituicao || !formData.nivel || !formData.area}
                      className="bg-blue-600 hover:bg-blue-700 px-8"
                    >
                      Próxima Etapa →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Etapa 2: Especificações */}
            {etapaAtual === 2 && (
              <>
                <Card className="border-2 border-green-200">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                    <CardTitle className="flex items-center gap-2 text-green-900">
                      <FileText className="h-5 w-5" />
                      Etapa 2: Especificações Técnicas
                    </CardTitle>
                    <CardDescription className="text-green-700">
                      ⚙️ Defina os detalhes para um trabalho sob medida
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="paginas" className="font-medium">
                          Número de Páginas *
                        </Label>
                        <Input
                          id="paginas"
                          type="number"
                          placeholder="Ex: 60"
                          value={formData.paginas}
                          onChange={(e) => setFormData({ ...formData, paginas: e.target.value })}
                          className="border-2"
                        />
                        <p className="text-xs text-gray-500">
                          Incluído: {precoDetalhado.detalhes.paginasIncluidas} páginas
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="prazo" className="font-medium">
                          Prazo (dias) *
                        </Label>
                        <Select
                          value={formData.prazo}
                          onValueChange={(value) => setFormData({ ...formData, prazo: value })}
                        >
                          <SelectTrigger className="border-2">
                            <SelectValue placeholder="Prazo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">🚨 3 dias (SUPER URGENTE +100%)</SelectItem>
                            <SelectItem value="5">⚡ 5 dias (URGENTE +60%)</SelectItem>
                            <SelectItem value="7">🔥 7 dias (RÁPIDO +30%)</SelectItem>
                            <SelectItem value="10">⏰ 10 dias (NORMAL +10%)</SelectItem>
                            <SelectItem value="14">📅 14 dias (PADRÃO)</SelectItem>
                            <SelectItem value="21">🕐 21 dias (ECONOMIA -10%)</SelectItem>
                            <SelectItem value="30">💰 30 dias (MÁXIMA ECONOMIA -20%)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="citacao" className="font-medium">
                          Normas de Citação *
                        </Label>
                        <Select
                          value={formData.citacao}
                          onValueChange={(value) => setFormData({ ...formData, citacao: value })}
                        >
                          <SelectTrigger className="border-2">
                            <SelectValue placeholder="Normas" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="abnt">📋 ABNT (Brasil)</SelectItem>
                            <SelectItem value="apa">📖 APA</SelectItem>
                            <SelectItem value="vancouver">🏥 Vancouver</SelectItem>
                            <SelectItem value="chicago">🏛️ Chicago</SelectItem>
                            <SelectItem value="outro">❓ Outra norma</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="descricao" className="font-medium">
                        Descrição do Projeto
                      </Label>
                      <Textarea
                        id="descricao"
                        placeholder="Descreva brevemente o que você precisa: objetivos, metodologia, requisitos específicos..."
                        className="min-h-[100px] border-2"
                        value={formData.descricao}
                        onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Estudo de Caso */}
                <Card className="border-2 border-purple-200">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50">
                    <CardTitle className="flex items-center gap-2 text-purple-900">
                      <Building className="h-5 w-5" />
                      Estudo de Caso Empresarial
                    </CardTitle>
                    <CardDescription className="text-purple-700">
                      🏢 Adicione credibilidade com um caso real
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <Checkbox
                        id="estudo-caso"
                        checked={formData.precisaEstudoCaso}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, precisaEstudoCaso: checked as boolean })
                        }
                      />
                      <div className="flex-1">
                        <Label htmlFor="estudo-caso" className="font-medium cursor-pointer">
                          ✅ Sim, quero incluir um estudo de caso empresarial
                        </Label>
                        <p className="text-sm text-purple-700">
                          Fortalece sua argumentação com dados reais (+50% no valor)
                        </p>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">+50%</Badge>
                    </div>

                    {formData.precisaEstudoCaso && (
                      <div className="space-y-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="space-y-2">
                          <Label htmlFor="nome-empresa" className="font-medium">
                            Nome da Empresa/Organização *
                          </Label>
                          <Input
                            id="nome-empresa"
                            placeholder="Ex: Banco Comercial e de Investimentos"
                            value={formData.nomeEmpresa}
                            onChange={(e) => setFormData({ ...formData, nomeEmpresa: e.target.value })}
                            className="border-2"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="setor-empresa" className="font-medium">
                            Setor de Atuação *
                          </Label>
                          <Input
                            id="setor-empresa"
                            placeholder="Ex: Setor Bancário, Telecomunicações, Educação"
                            value={formData.setorEmpresa}
                            onChange={(e) => setFormData({ ...formData, setorEmpresa: e.target.value })}
                            className="border-2"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="detalhes-empresa" className="font-medium">
                            Informações Adicionais
                          </Label>
                          <Textarea
                            id="detalhes-empresa"
                            placeholder="Conte-nos mais sobre a empresa, acesso a dados, contatos disponíveis..."
                            value={formData.detalhesEmpresa}
                            onChange={(e) => setFormData({ ...formData, detalhesEmpresa: e.target.value })}
                            className="border-2"
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Serviços Premium */}
                <Card className="border-2 border-yellow-200">
                  <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50">
                    <CardTitle className="flex items-center gap-2 text-yellow-900">
                      <Star className="h-5 w-5" />
                      Serviços Premium
                    </CardTitle>
                    <CardDescription className="text-yellow-700">
                      🌟 Maximize suas chances de sucesso acadêmico
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-4 border-2 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id="revisoes-premium"
                            checked={formData.revisoesPremium}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, revisoesPremium: checked as boolean })
                            }
                          />
                          <div>
                            <Label htmlFor="revisoes-premium" className="font-medium cursor-pointer">
                              🌟 Revisões Premium
                            </Label>
                            <p className="text-sm text-gray-600">Revisões ilimitadas + consultoria para defesa</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                          +30%
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 border-2 rounded-lg bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id="suporte-urgente"
                            checked={formData.suporteUrgente}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, suporteUrgente: checked as boolean })
                            }
                          />
                          <div>
                            <Label htmlFor="suporte-urgente" className="font-medium cursor-pointer">
                              🚨 Suporte VIP 24/7
                            </Label>
                            <p className="text-sm text-gray-600">Atendimento prioritário + especialista dedicado</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-red-100 text-red-800">
                          +4.000 MT
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 border-2 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id="formatacao-especial"
                            checked={formData.formatacaoEspecial}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, formatacaoEspecial: checked as boolean })
                            }
                          />
                          <div>
                            <Label htmlFor="formatacao-especial" className="font-medium cursor-pointer">
                              📐 Formatação Especial
                            </Label>
                            <p className="text-sm text-gray-600">Formatação avançada + gráficos profissionais</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          +2.500 MT
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 border-2 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id="apresentacao-defesa"
                            checked={formData.apresentacaoDefesa}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, apresentacaoDefesa: checked as boolean })
                            }
                          />
                          <div>
                            <Label htmlFor="apresentacao-defesa" className="font-medium cursor-pointer">
                              🎯 Apresentação para Defesa
                            </Label>
                            <p className="text-sm text-gray-600">Slides profissionais + treinamento</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          +3.500 MT
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={etapaAnterior} className="px-8">
                    ← Voltar
                  </Button>
                  <Button
                    onClick={proximaEtapa}
                    disabled={!formData.paginas || !formData.prazo || !formData.citacao}
                    className="bg-green-600 hover:bg-green-700 px-8"
                  >
                    Finalizar Pedido →
                  </Button>
                </div>
              </>
            )}

            {/* Etapa 3: Pagamento */}
            {etapaAtual === 3 && (
              <Card className="border-2 border-orange-200">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                  <CardTitle className="flex items-center gap-2 text-orange-900">
                    <CreditCard className="h-5 w-5" />
                    Etapa 3: Método de Pagamento
                  </CardTitle>
                  <CardDescription className="text-orange-700">
                    💳 Escolha a forma mais conveniente para você
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <RadioGroup
                    value={formData.metodoPagamento}
                    onValueChange={(value) => setFormData({ ...formData, metodoPagamento: value })}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-green-50 cursor-pointer border-green-300">
                        <RadioGroupItem value="mpesa" id="mpesa" />
                        <Smartphone className="h-6 w-6 text-green-600" />
                        <div className="flex-1">
                          <Label htmlFor="mpesa" className="font-medium cursor-pointer">
                            📱 M-Pesa (Recomendado)
                          </Label>
                          <p className="text-sm text-gray-600">Pagamento instantâneo via Vodacom/mCel</p>
                          <p className="text-xs text-green-600 font-medium">✅ Confirmação automática em minutos</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Mais Rápido</Badge>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-blue-50 cursor-pointer border-blue-300">
                        <RadioGroupItem value="transferencia" id="transferencia" />
                        <Banknote className="h-6 w-6 text-blue-600" />
                        <div className="flex-1">
                          <Label htmlFor="transferencia" className="font-medium cursor-pointer">
                            🏦 Transferência Bancária
                          </Label>
                          <p className="text-sm text-gray-600">Transferência para conta bancária</p>
                          <p className="text-xs text-blue-600 font-medium">⏱️ Confirmação em 2-4 horas</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-purple-50 cursor-pointer border-purple-300">
                        <RadioGroupItem value="deposito" id="deposito" />
                        <Building className="h-6 w-6 text-purple-600" />
                        <div className="flex-1">
                          <Label htmlFor="deposito" className="font-medium cursor-pointer">
                            🏢 Depósito Bancário
                          </Label>
                          <p className="text-sm text-gray-600">Depósito em agência bancária</p>
                          <p className="text-xs text-purple-600 font-medium">📋 Envie comprovante por WhatsApp</p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  <Alert className="mt-6 border-green-200 bg-green-50">
                    <Shield className="h-4 w-4" />
                    <AlertDescription className="text-green-800">
                      <strong>Pagamento 100% Seguro:</strong> Seus dados estão protegidos e o trabalho só inicia após
                      confirmação do pagamento.
                    </AlertDescription>
                  </Alert>

                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={etapaAnterior} className="px-8">
                      ← Voltar
                    </Button>
                    <Button
                      size="lg"
                      disabled={!formData.metodoPagamento}
                      className="bg-green-600 hover:bg-green-700 px-8"
                      onClick={submeterPedido}
                    >
                      🎉 CONFIRMAR PEDIDO
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Resumo e Preço */}
          <div className="space-y-6">
            {/* Urgência */}
            <Card className="border-2 border-red-300 bg-red-50">
              <CardContent className="p-4">
                <div className="text-center">
                  <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <h3 className="font-bold text-red-800 mb-2">⚠️ VAGAS LIMITADAS</h3>
                  <p className="text-red-700 text-sm mb-3">
                    Apenas <strong>{vagasRestantes} vagas</strong> disponíveis esta semana
                  </p>
                  <div className="bg-red-600 text-white rounded-lg p-2">
                    <p className="text-sm font-medium">🔥 Oferta expira em 24h</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calculadora de Preço */}
            <Card className="sticky top-4 border-2 border-green-300">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <Calculator className="h-5 w-5" />
                  Investimento Inteligente
                </CardTitle>
                {precoDetalhado.economia > 0 && (
                  <div className="bg-green-100 border border-green-300 rounded-lg p-2">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-bold text-green-800">
                        VOCÊ ESTÁ ECONOMIZANDO {formatarMoeda(precoDetalhado.economia)}!
                      </span>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {calculandoPreco && (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                      <p className="text-sm text-gray-600 mt-2">Calculando preço...</p>
                    </div>
                  )}

                  {!calculandoPreco && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span>Preço base ({precoDetalhado.detalhes.paginasIncluidas} páginas):</span>
                        <span className="font-medium">{formatarMoeda(precoDetalhado.precoBase)}</span>
                      </div>

                      {precoDetalhado.custoAdicionalPaginas > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>Páginas extras ({precoDetalhado.detalhes.paginasAdicionais}):</span>
                          <span className="font-medium">+{formatarMoeda(precoDetalhado.custoAdicionalPaginas)}</span>
                        </div>
                      )}

                      {precoDetalhado.custoUrgencia > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>Taxa urgência:</span>
                          <span className="font-medium text-red-600">
                            +{formatarMoeda(precoDetalhado.custoUrgencia)}
                          </span>
                        </div>
                      )}

                      {precoDetalhado.custoEstudoCaso > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>Estudo de caso:</span>
                          <span className="font-medium">+{formatarMoeda(precoDetalhado.custoEstudoCaso)}</span>
                        </div>
                      )}

                      {precoDetalhado.custoRevisoes > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>Revisões premium:</span>
                          <span className="font-medium">+{formatarMoeda(precoDetalhado.custoRevisoes)}</span>
                        </div>
                      )}

                      {precoDetalhado.custoSuporte > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>Suporte VIP:</span>
                          <span className="font-medium">+{formatarMoeda(precoDetalhado.custoSuporte)}</span>
                        </div>
                      )}

                      {precoDetalhado.custoFormatacao > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>Formatação especial:</span>
                          <span className="font-medium">+{formatarMoeda(precoDetalhado.custoFormatacao)}</span>
                        </div>
                      )}

                      {precoDetalhado.custoApresentacao > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>Apresentação defesa:</span>
                          <span className="font-medium">+{formatarMoeda(precoDetalhado.custoApresentacao)}</span>
                        </div>
                      )}

                      {precoDetalhado.desconto > 0 && (
                        <>
                          <Separator />
                          <div className="flex justify-between text-sm">
                            <span>Subtotal:</span>
                            <span className="line-through text-gray-500">{formatarMoeda(precoDetalhado.subtotal)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-green-600 font-medium">Desconto promocional:</span>
                            <span className="font-medium text-green-600">
                              -{formatarMoeda(precoDetalhado.desconto)}
                            </span>
                          </div>
                        </>
                      )}

                      <Separator />

                      <div className="flex justify-between text-xl font-bold">
                        <span>Total Final:</span>
                        <span className="text-green-600">{formatarMoeda(precoDetalhado.total)}</span>
                      </div>

                      {precoDetalhado.economia > 0 && (
                        <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                          <div className="text-center">
                            <p className="text-sm font-bold text-green-800">
                              🎉 VOCÊ ECONOMIZA {precoDetalhado.detalhes.percentualEconomia}%
                            </p>
                            <p className="text-lg font-bold text-green-600">{formatarMoeda(precoDetalhado.economia)}</p>
                          </div>
                        </div>
                      )}

                      <div className="text-xs text-gray-500 space-y-1 bg-gray-50 p-3 rounded">
                        <p>📄 Páginas: {formData.paginas || 50}</p>
                        <p>⏰ Prazo: {formData.prazo || 14} dias</p>
                        <p>🎓 Nível: {formData.nivel || "Não selecionado"}</p>
                        <p>📚 Área: {formData.area || "Não selecionado"}</p>
                        <p>💳 Pagamento: {formData.metodoPagamento || "Não selecionado"}</p>
                        {codigoAfiliado && <p className="text-green-600 font-medium">🎁 Código: {codigoAfiliado}</p>}
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Sugestões IA */}
            {mostrarSugestoes && (
              <Card className="border-2 border-blue-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <Sparkles className="h-5 w-5" />🤖 Sugestões Personalizadas
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {[
                      "Gestão de Recursos Humanos em Empresas Moçambicanas: Desafios e Oportunidades",
                      "Impacto da Transformação Digital na Administração Pública de Moçambique",
                      "Sustentabilidade Empresarial no Setor Bancário: Estudo de Caso BCI",
                      "Análise da Eficiência Energética em Edifícios Comerciais de Maputo",
                      "Estratégias de Marketing Digital para PMEs em Moçambique",
                    ].map((sugestao, index) => (
                      <div
                        key={index}
                        className="p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors border border-blue-200"
                        onClick={() => setFormData({ ...formData, tema: sugestao })}
                      >
                        <p className="text-sm font-medium text-blue-800">{sugestao}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Garantias */}
            <Card className="bg-green-50 border-2 border-green-300">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  🛡️ Suas Garantias
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3 text-sm text-green-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>100% Original e Único</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Entrega no Prazo Garantida</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Aprovação ou Refazemos Grátis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <span>Suporte até a Defesa Final</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    <span>Especialista Dedicado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span>Qualidade Acadêmica Superior</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Depoimentos */}
            <Card className="bg-yellow-50 border-2 border-yellow-300">
              <CardHeader>
                <CardTitle className="text-yellow-800 flex items-center gap-2">
                  <Users className="h-5 w-5" />💬 O Que Dizem Nossos Clientes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="bg-white p-3 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-yellow-500">{"★".repeat(5)}</div>
                      <span className="text-sm font-medium">Maria S.</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      "Nota 18 valores! O especialista foi incrível, sempre disponível e o trabalho ficou perfeito."
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-yellow-500">{"★".repeat(5)}</div>
                      <span className="text-sm font-medium">João M.</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      "Entregaram antes do prazo e com qualidade excepcional. Recomendo 100%!"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}