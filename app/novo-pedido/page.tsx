"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Calculator,
  Clock,
  FileText,
  GraduationCap,
  Shield,
  Star,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Calendar,
  User,
  Phone,
  Mail,
  BookOpen,
  Building2,
  Zap,
  Lock,
  Eye,
  EyeOff
} from "lucide-react"

import type { Viewport } from "next"

export const viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function NovoPedidoPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    instituicao: "",
    curso: "",
    tema: "",
    descricao: "",
    tipoProjeto: "",
    numeroPaginas: "",
    prazo: "",
    normas: "",
    urgente: false,
    incluirRevisao: false,
    incluirDefesa: false
  })

  const [preco, setPreco] = useState({
    subtotal: 0,
    urgencia: 0,
    extras: 0,
    total: 0
  })

  const calcularPreco = () => {
    const precoBase = parseInt(formData.numeroPaginas) * 150 // 150 MT por página
    const multiplicadorUrgencia = formData.urgente ? 1.5 : 1
    const revisao = formData.incluirRevisao ? 2000 : 0
    const defesa = formData.incluirDefesa ? 3000 : 0

    const subtotal = precoBase * multiplicadorUrgencia
    const urgencia = formData.urgente ? (precoBase * 0.5) : 0
    const extras = revisao + defesa
    const total = subtotal + extras

    setPreco({ subtotal, urgencia, extras, total })
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (field === 'numeroPaginas' || field === 'urgente' || field === 'incluirRevisao' || field === 'incluirDefesa') {
      setTimeout(calcularPreco, 100)
    }
  }

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <span className="text-lg sm:text-2xl font-bold text-gray-900">MonografiaPlus</span>
            </Link>
            <div className="flex items-center gap-2">
              <Badge className="bg-red-100 text-red-800 text-xs sm:text-sm">
                🔥 URGENTE
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-600">Passo {step} de 4</span>
            <span className="text-xs sm:text-sm font-medium text-gray-600">{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Informações Pessoais */}
        {step === 1 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                <User className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                Suas Informações
              </CardTitle>
              <CardDescription>
                Precisamos de alguns dados para personalizar seu atendimento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    placeholder="Seu nome completo"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    placeholder="+258 84 123 4567"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange('telefone', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instituicao">Instituição *</Label>
                  <Select onValueChange={(value) => handleInputChange('instituicao', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione sua instituição" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uem">Universidade Eduardo Mondlane (UEM)</SelectItem>
                      <SelectItem value="up">Universidade Pedagógica (UP)</SelectItem>
                      <SelectItem value="ucm">Universidade Católica de Moçambique (UCM)</SelectItem>
                      <SelectItem value="unizambeze">Universidade do Zambeze (UniZambeze)</SelectItem>
                      <SelectItem value="isctem">ISCTEM</SelectItem>
                      <SelectItem value="outra">Outra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="curso">Curso *</Label>
                  <Input
                    id="curso"
                    placeholder="Ex: Gestão de Empresas"
                    value={formData.curso}
                    onChange={(e) => handleInputChange('curso', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={nextStep} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                  Continuar
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Detalhes do Projeto */}
        {step === 2 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                Detalhes do Projeto
              </CardTitle>
              <CardDescription>
                Conte-nos sobre sua monografia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="tema">Tema da Monografia *</Label>
                <Input
                  id="tema"
                  placeholder="Ex: Impacto das redes sociais no marketing digital"
                  value={formData.tema}
                  onChange={(e) => handleInputChange('tema', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição Detalhada</Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva com mais detalhes o que você espera da monografia, objetivos, metodologia preferida, etc."
                  rows={4}
                  value={formData.descricao}
                  onChange={(e) => handleInputChange('descricao', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Projeto *</Label>
                  <RadioGroup 
                    value={formData.tipoProjeto} 
                    onValueChange={(value) => handleInputChange('tipoProjeto', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monografia" id="monografia" />
                      <Label htmlFor="monografia">Monografia</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dissertacao" id="dissertacao" />
                      <Label htmlFor="dissertacao">Dissertação</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tcc" id="tcc" />
                      <Label htmlFor="tcc">TCC</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="projeto" id="projeto" />
                      <Label htmlFor="projeto">Projeto de Pesquisa</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numeroPaginas">Número de Páginas *</Label>
                  <Select onValueChange={(value) => handleInputChange('numeroPaginas', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30-40 páginas</SelectItem>
                      <SelectItem value="50">50-60 páginas</SelectItem>
                      <SelectItem value="70">70-80 páginas</SelectItem>
                      <SelectItem value="100">100+ páginas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
                <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                  Continuar
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Prazo e Especificações */}
        {step === 3 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                Prazo e Especificações
              </CardTitle>
              <CardDescription>
                Quando você precisa entregar?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label>Prazo de Entrega *</Label>
                <RadioGroup 
                  value={formData.prazo} 
                  onValueChange={(value) => handleInputChange('prazo', value)}
                >
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="7" id="7dias" />
                      <Label htmlFor="7dias">7 dias</Label>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Padrão</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5" id="5dias" />
                      <Label htmlFor="5dias">5 dias</Label>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">+20%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="3dias" />
                      <Label htmlFor="3dias">3 dias</Label>
                    </div>
                    <Badge className="bg-red-100 text-red-800">+50% - URGENTE</Badge>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Normas Acadêmicas *</Label>
                <Select onValueChange={(value) => handleInputChange('normas', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione as normas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="abnt">ABNT (Brasileira)</SelectItem>
                    <SelectItem value="apa">APA (Internacional)</SelectItem>
                    <SelectItem value="vancouver">Vancouver</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                    <SelectItem value="instituicao">Normas da Instituição</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Serviços Extras</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="revisao"
                        checked={formData.incluirRevisao}
                        onCheckedChange={(checked) => handleInputChange('incluirRevisao', checked)}
                      />
                      <Label htmlFor="revisao">Revisão Gramatical Profissional</Label>
                    </div>
                    <span className="text-sm font-medium text-gray-600">+2.000 MT</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="defesa"
                        checked={formData.incluirDefesa}
                        onCheckedChange={(checked) => handleInputChange('incluirDefesa', checked)}
                      />
                      <Label htmlFor="defesa">Preparação para Defesa</Label>
                    </div>
                    <span className="text-sm font-medium text-gray-600">+3.000 MT</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
                <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                  Calcular Preço
                  <Calculator className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirmação e Pagamento */}
        {step === 4 && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resumo do Pedido */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Nome:</span>
                    <span className="font-medium">{formData.nome}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{formData.email}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Instituição:</span>
                    <span className="font-medium">{formData.instituicao}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tema:</span>
                    <span className="font-medium">{formData.tema}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Páginas:</span>
                    <span className="font-medium">{formData.numeroPaginas}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Prazo:</span>
                    <span className="font-medium">{formData.prazo} dias</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preço e Pagamento */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Investimento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{preco.subtotal.toLocaleString()} MT</span>
                  </div>
                  {preco.urgencia > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Taxa Urgência:</span>
                      <span>+{preco.urgencia.toLocaleString()} MT</span>
                    </div>
                  )}
                  {preco.extras > 0 && (
                    <div className="flex justify-between text-blue-600">
                      <span>Serviços Extras:</span>
                      <span>+{preco.extras.toLocaleString()} MT</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">{preco.total.toLocaleString()} MT</span>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">Garantias Incluídas</span>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>✓ Entrega no prazo garantida</li>
                    <li>✓ 100% original e exclusivo</li>
                    <li>✓ Revisões ilimitadas por 30 dias</li>
                    <li>✓ Suporte até a aprovação</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-6">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Confirmar Pedido
                  </Button>
                  <Button variant="outline" onClick={prevStep} className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar e Revisar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Footer with Urgency */}
      <div className="bg-red-600 text-white py-4 px-4 text-center">
        <div className="container mx-auto">
          <p className="text-sm sm:text-base font-medium">
            🚨 ATENÇÃO: Apenas 2 vagas disponíveis esta semana • Resposta em 30 minutos
          </p>
        </div>
      </div>
    </div>
  )
}