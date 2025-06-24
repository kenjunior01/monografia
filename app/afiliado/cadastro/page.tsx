"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { GraduationCap, User, Mail, Phone, MapPin, DollarSign, Users, Gift, Zap, Target, Award } from "lucide-react"

export default function AfiliadoCadastroPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    whatsapp: "",
    cidade: "",
    provincia: "",
    profissao: "",
    experiencia: "",
    canaisMarketing: [] as string[],
    motivacao: "",
    metaMensal: "",
    concordaTermos: false,
  })

  const [etapaAtual, setEtapaAtual] = useState(1)

  const canaisDisponiveis = [
    "WhatsApp",
    "Facebook",
    "Instagram",
    "TikTok",
    "LinkedIn",
    "YouTube",
    "Blog/Website",
    "Grupos de Estudantes",
    "Universidades",
    "Indicação Pessoal",
  ]

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

  const handleCanaisChange = (canal: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        canaisMarketing: [...formData.canaisMarketing, canal],
      })
    } else {
      setFormData({
        ...formData,
        canaisMarketing: formData.canaisMarketing.filter((c) => c !== canal),
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">MonografiaPlus</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/afiliado/login" className="text-gray-600 hover:text-blue-600">
              Já sou afiliado
            </Link>
            <Link href="/login">
              <Button variant="outline">Login Cliente</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-lg px-4 py-2">
              💰 GANHE 1.000 MT POR INDICAÇÃO
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Torne-se um <span className="text-green-600">Afiliado MonografiaPlus</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Ajude estudantes a conquistarem seus sonhos acadêmicos e{" "}
            <strong className="text-green-600">ganhe 1.000 MT por cada monografia vendida</strong> através do seu link
            exclusivo!
          </p>

          {/* Benefícios Rápidos */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="font-bold text-green-800">1.000 MT</p>
                <p className="text-sm text-green-700">Por indicação</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="font-bold text-blue-800">Pagamento</p>
                <p className="text-sm text-blue-700">Imediato</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="font-bold text-purple-800">Sem Limite</p>
                <p className="text-sm text-purple-700">De indicações</p>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4 text-center">
                <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="font-bold text-orange-800">Suporte</p>
                <p className="text-sm text-orange-700">Completo</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cadastro de Afiliado - Etapa {etapaAtual} de 3</CardTitle>
                <CardDescription>Preencha seus dados para começar a ganhar hoje mesmo</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Etapa 1: Dados Pessoais */}
                {etapaAtual === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg mb-4">📋 Informações Pessoais</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome Completo *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="nome"
                            placeholder="Seu nome completo"
                            className="pl-10"
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            className="pl-10"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="telefone"
                            placeholder="84 123 4567"
                            className="pl-10"
                            value={formData.telefone}
                            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="whatsapp">WhatsApp</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="whatsapp"
                            placeholder="84 123 4567"
                            className="pl-10"
                            value={formData.whatsapp}
                            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cidade">Cidade *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="cidade"
                            placeholder="Maputo"
                            className="pl-10"
                            value={formData.cidade}
                            onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="provincia">Província *</Label>
                        <Select
                          value={formData.provincia}
                          onValueChange={(value) => setFormData({ ...formData, provincia: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a província" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maputo-cidade">Maputo Cidade</SelectItem>
                            <SelectItem value="maputo-provincia">Maputo Província</SelectItem>
                            <SelectItem value="gaza">Gaza</SelectItem>
                            <SelectItem value="inhambane">Inhambane</SelectItem>
                            <SelectItem value="sofala">Sofala</SelectItem>
                            <SelectItem value="manica">Manica</SelectItem>
                            <SelectItem value="tete">Tete</SelectItem>
                            <SelectItem value="zambézia">Zambézia</SelectItem>
                            <SelectItem value="nampula">Nampula</SelectItem>
                            <SelectItem value="cabo-delgado">Cabo Delgado</SelectItem>
                            <SelectItem value="niassa">Niassa</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="profissao">Profissão/Ocupação *</Label>
                      <Input
                        id="profissao"
                        placeholder="Ex: Estudante, Professor, Empresário, Influencer"
                        value={formData.profissao}
                        onChange={(e) => setFormData({ ...formData, profissao: e.target.value })}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={proximaEtapa}
                        disabled={
                          !formData.nome ||
                          !formData.email ||
                          !formData.telefone ||
                          !formData.cidade ||
                          !formData.provincia ||
                          !formData.profissao
                        }
                      >
                        Próxima Etapa →
                      </Button>
                    </div>
                  </div>
                )}

                {/* Etapa 2: Experiência em Marketing */}
                {etapaAtual === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg mb-4">🎯 Sua Experiência em Marketing</h3>

                    <div className="space-y-2">
                      <Label htmlFor="experiencia">Experiência com Vendas/Marketing</Label>
                      <Select
                        value={formData.experiencia}
                        onValueChange={(value) => setFormData({ ...formData, experiencia: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione sua experiência" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="iniciante">🌱 Iniciante (Nunca vendi online)</SelectItem>
                          <SelectItem value="basico">📚 Básico (Já vendi algumas coisas)</SelectItem>
                          <SelectItem value="intermediario">⚡ Intermediário (Tenho experiência)</SelectItem>
                          <SelectItem value="avancado">🏆 Avançado (Sou profissional)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Canais de Marketing que Você Usa *</Label>
                      <p className="text-sm text-gray-600 mb-3">Selecione todos que se aplicam:</p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {canaisDisponiveis.map((canal) => (
                          <div key={canal} className="flex items-center space-x-2">
                            <Checkbox
                              id={canal}
                              checked={formData.canaisMarketing.includes(canal)}
                              onCheckedChange={(checked) => handleCanaisChange(canal, checked as boolean)}
                            />
                            <Label htmlFor={canal} className="text-sm">
                              {canal}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="meta-mensal">Meta Mensal de Indicações</Label>
                      <Select
                        value={formData.metaMensal}
                        onValueChange={(value) => setFormData({ ...formData, metaMensal: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Quantas indicações pretende fazer por mês?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-3">💰 1-3 indicações (1.000-3.000 MT/mês)</SelectItem>
                          <SelectItem value="4-7">🚀 4-7 indicações (4.000-7.000 MT/mês)</SelectItem>
                          <SelectItem value="8-15">⭐ 8-15 indicações (8.000-15.000 MT/mês)</SelectItem>
                          <SelectItem value="16+">🏆 16+ indicações (16.000+ MT/mês)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motivacao">Por que quer ser nosso afiliado?</Label>
                      <Textarea
                        id="motivacao"
                        placeholder="Conte-nos sua motivação para se tornar um afiliado MonografiaPlus..."
                        className="min-h-[100px]"
                        value={formData.motivacao}
                        onChange={(e) => setFormData({ ...formData, motivacao: e.target.value })}
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={etapaAnterior}>
                        ← Voltar
                      </Button>
                      <Button
                        onClick={proximaEtapa}
                        disabled={formData.canaisMarketing.length === 0 || !formData.experiencia}
                      >
                        Finalizar Cadastro →
                      </Button>
                    </div>
                  </div>
                )}

                {/* Etapa 3: Confirmação */}
                {etapaAtual === 3 && (
                  <div className="space-y-6">
                    <h3 className="font-medium text-lg mb-4">✅ Confirmação e Termos</h3>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-800 mb-2">🎉 Parabéns! Você está quase lá!</h4>
                      <p className="text-green-700 text-sm">
                        Após a aprovação, você receberá seu link exclusivo e materiais de marketing por email.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">📋 Resumo dos seus dados:</h4>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                        <p>
                          <strong>Nome:</strong> {formData.nome}
                        </p>
                        <p>
                          <strong>Email:</strong> {formData.email}
                        </p>
                        <p>
                          <strong>Localização:</strong> {formData.cidade}, {formData.provincia}
                        </p>
                        <p>
                          <strong>Profissão:</strong> {formData.profissao}
                        </p>
                        <p>
                          <strong>Experiência:</strong> {formData.experiencia}
                        </p>
                        <p>
                          <strong>Meta Mensal:</strong> {formData.metaMensal}
                        </p>
                        <p>
                          <strong>Canais:</strong> {formData.canaisMarketing.join(", ")}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="termos"
                          checked={formData.concordaTermos}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, concordaTermos: checked as boolean })
                          }
                        />
                        <Label htmlFor="termos" className="text-sm">
                          Concordo com os{" "}
                          <Link href="/afiliado/termos" className="text-blue-600 hover:underline">
                            Termos do Programa de Afiliados
                          </Link>{" "}
                          e{" "}
                          <Link href="/privacidade" className="text-blue-600 hover:underline">
                            Política de Privacidade
                          </Link>
                        </Label>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={etapaAnterior}>
                        ← Voltar
                      </Button>
                      <Button size="lg" disabled={!formData.concordaTermos} className="bg-green-600 hover:bg-green-700">
                        🚀 QUERO SER AFILIADO AGORA
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Benefícios */}
          <div className="space-y-6">
            {/* Calculadora de Ganhos */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">💰 Calculadora de Ganhos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">1.000 MT</p>
                    <p className="text-sm text-green-700">Por cada indicação</p>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">5 indicações/mês:</span>
                      <span className="font-medium">5.000 MT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">10 indicações/mês:</span>
                      <span className="font-medium">10.000 MT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">20 indicações/mês:</span>
                      <span className="font-medium text-green-600">20.000 MT</span>
                    </div>
                  </div>

                  <div className="bg-green-600 text-white rounded-lg p-3 text-center">
                    <p className="text-sm font-medium">🎯 Meta: 1 indicação por dia</p>
                    <p className="text-lg font-bold">30.000 MT/mês</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vantagens */}
            <Card>
              <CardHeader>
                <CardTitle>🌟 Vantagens Exclusivas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Pagamento Garantido</p>
                      <p className="text-xs text-gray-600">1.000 MT por indicação paga</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Zap className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Pagamento Rápido</p>
                      <p className="text-xs text-gray-600">Até 48h após confirmação</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Gift className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Material Gratuito</p>
                      <p className="text-xs text-gray-600">Posts, banners e textos</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Suporte Dedicado</p>
                      <p className="text-xs text-gray-600">Grupo VIP no WhatsApp</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Depoimentos */}
            <Card>
              <CardHeader>
                <CardTitle>💬 Afiliados de Sucesso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-yellow-400 text-sm">{"★".repeat(5)}</div>
                      <span className="text-sm font-medium">Carlos M.</span>
                    </div>
                    <p className="text-xs text-gray-700">
                      "Em 2 meses já ganhei 25.000 MT! O suporte é incrível e os materiais facilitam muito as vendas."
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-yellow-400 text-sm">{"★".repeat(5)}</div>
                      <span className="text-sm font-medium">Ana S.</span>
                    </div>
                    <p className="text-xs text-gray-700">
                      "Trabalho apenas 2h por dia e já consegui uma renda extra de 15.000 MT mensais. Recomendo!"
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
