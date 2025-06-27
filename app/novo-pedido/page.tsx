"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Star,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  Clock,
  Users,
  Award,
  BookOpen,
  GraduationCap
} from "lucide-react"

export default function NovoPedidoPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    paisRegiao: "",
    universidade: "",
    nivelCurso: "",
    areaEstudo: "",
    tema: "",
    numeroPaginas: 40,
    prazo: 14,
    pagamento: "",
    nome: "",
    email: "",
    telefone: "",
    precisaEstudoCaso: false,
    revisoesPremium: false,
    suporteUrgente: false,
    formatacaoEspecial: false,
    apresentacaoDefesa: false
  })

  const [preco, setPreco] = useState({
    base: 12000,
    desconto: 2000,
    total: 10000,
    extras: 0
  })

  const [vagasRestantes, setVagasRestantes] = useState(3)
  const [tempoRestante, setTempoRestante] = useState("23:59:59")
  
  const depoimentos = [
    {
      nome: "Maria S.",
      texto: "Nota 18 valores! O especialista foi incrível, sempre disponível e o trabalho ficou perfeito.",
      nota: 5
    },
    {
      nome: "João M.",
      texto: "Entregaram antes do prazo e com qualidade excepcional. Recomendo 100%!",
      nota: 5
    },
    {
      nome: "Ana P.",
      texto: "O que mais me impressionou foi a qualidade da pesquisa e a profundidade da análise.",
      nota: 5
    }
  ]

  useEffect(() => {
    const calcularPreco = async () => {
      try {
        const response = await fetch('/api/pricing/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        setPreco(data);
      } catch (error) {
        console.error('Erro ao calcular preço:', error);
        // Fallback para cálculo local em caso de erro na API
        const precoPorPagina = 300;
        const base = formData.numeroPaginas * precoPorPagina;
        const desconto = 2000; // Desconto fixo
        const total = base - desconto;
        setPreco({ base, desconto, total, extras: 0 });
      }
    }
    calcularPreco();
  }, [formData]);

  useEffect(() => {
    const timer = setInterval(() => {
      const agora = new Date();
      const amanha = new Date(agora);
      amanha.setDate(amanha.getDate() + 1);
      amanha.setHours(0, 0, 0, 0);

      const diff = amanha.getTime() - agora.getTime();

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTempoRestante(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  async function handleSubmit() {
    try {
      const response = await fetch('/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, ...preco }),
      });
      const data = await response.json();
      if (response.ok) {
        window.location.href = `/pedido-confirmado/${data.pedidoId}`;
      } else {
        alert(`Erro ao criar pedido: ${data.message}`);
      }
    } catch (error) {
      console.error('Erro ao submeter pedido:', error);
      alert('Ocorreu um erro. Tente novamente.');
    }
  }

  const progress = Math.round((step / 3) * 100)

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-blue-600 text-white text-center p-2 text-sm font-bold">
        APENAS 3 VAGAS RESTANTES ESTA SEMANA!
      </header>
      <div className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Sua Monografia de Excelência Está a Um Clique</h1>
          <p className="text-gray-600 mt-2">Especialista dedicado • Entrega garantida • Aprovação ou refazemos grátis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2 space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="text-yellow-600" />
                <div>
                  <p className="font-semibold text-yellow-800">⚠️ VAGAS LIMITADAS</p>
                  <p className="text-sm text-yellow-600">Apenas {vagasRestantes} vagas disponíveis esta semana</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-yellow-800">🔥 Oferta expira em</p>
                <p className="text-xl font-bold text-yellow-900">{tempoRestante}</p>
              </div>
            </div>

            <Card className="shadow-lg">
              <CardHeader className="border-b bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Investimento Inteligente</CardTitle>
                    <CardDescription>VOCÊ ESTÁ ECONOMIZANDO {preco.desconto} MT!</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Etapa {step} de 3</CardTitle>
                  <span className="text-sm font-medium text-blue-600">{progress}% completo</span>
                </div>
                <Progress value={progress} className="mt-2" />
              </CardHeader>
              <CardContent>
                {step === 1 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Conte-nos Sobre Seu Projeto</h3>
                    <p className="text-gray-500 mb-6">🎯 Vamos criar a monografia perfeita para suas necessidades específicas</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="paisRegiao">País/Região *</Label>
                        <Input id="paisRegiao" value={formData.paisRegiao} onChange={(e) => handleInputChange('paisRegiao', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="universidade">Sua Universidade *</Label>
                        <Input id="universidade" value={formData.universidade} onChange={(e) => handleInputChange('universidade', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nivelCurso">Nível do Curso *</Label>
                        <Select onValueChange={(value) => handleInputChange('nivelCurso', value)} value={formData.nivelCurso}>
                          <SelectTrigger><SelectValue placeholder="Selecione o nível" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="licenciatura">Licenciatura</SelectItem>
                            <SelectItem value="mestrado">Mestrado</SelectItem>
                            <SelectItem value="doutoramento">Doutoramento</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="areaEstudo">Área de Estudo *</Label>
                        <Input id="areaEstudo" value={formData.areaEstudo} onChange={(e) => handleInputChange('areaEstudo', e.target.value)} />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="tema">Tema da Monografia</Label>
                        <Textarea id="tema" value={formData.tema} onChange={(e) => handleInputChange('tema', e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Detalhes do Pedido</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="numeroPaginas">Número de Páginas: {formData.numeroPaginas}</Label>
                            <Input type="range" id="numeroPaginas" min="10" max="200" value={formData.numeroPaginas} onChange={(e) => handleInputChange('numeroPaginas', parseInt(e.target.value))} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="prazo">Prazo de Entrega (dias): {formData.prazo}</Label>
                            <Input type="range" id="prazo" min="3" max="60" value={formData.prazo} onChange={(e) => handleInputChange('prazo', parseInt(e.target.value))} />
                        </div>
                     </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Informações de Pagamento e Contato</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="nome">Nome Completo *</Label>
                            <Input id="nome" value={formData.nome} onChange={(e) => handleInputChange('nome', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input type="email" id="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="telefone">Telefone *</Label>
                            <Input type="tel" id="telefone" value={formData.telefone} onChange={(e) => handleInputChange('telefone', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pagamento">Método de Pagamento *</Label>
                            <Select onValueChange={(value) => handleInputChange('pagamento', value)} value={formData.pagamento}>
                                <SelectTrigger><SelectValue placeholder="Selecione o método" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="mpesa">M-Pesa</SelectItem>
                                    <SelectItem value="emola">e-Mola</SelectItem>
                                    <SelectItem value="transferencia">Transferência Bancária</SelectItem>
                                    <SelectItem value="paypal">PayPal</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                     </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>

          <aside className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="border-b bg-gray-50">
                <CardTitle className="text-lg">🛡️ Suas Garantias</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">100% Original e Único</h4>
                      <p className="text-sm text-gray-500">Garantimos originalidade total do seu trabalho</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Entrega no Prazo Garantida</h4>
                      <p className="text-sm text-gray-500">Seu trabalho será entregue dentro do prazo acordado</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Award className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Aprovação ou Refazemos Grátis</h4>
                      <p className="text-sm text-gray-500">Garantia de aprovação ou refazemos sem custo</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="border-b bg-gray-50">
                <CardTitle className="text-lg">💬 O Que Dizem Nossos Clientes</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {depoimentos.map((depoimento, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(depoimento.nota)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-700 mb-2">"{depoimento.texto}"</p>
                      <p className="text-sm font-medium text-gray-900">{depoimento.nome}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={prevStep} disabled={step === 1}><ArrowLeft className="mr-2 h-4 w-4"/> Anterior</Button>
                  {step < 3 && <Button onClick={nextStep}>Próximo</Button>}
                  {step === 3 && <Button onClick={handleSubmit}>Finalizar Pedido</Button>}
                </div>
              </CardContent>
            </Card>
          </main>

          <aside>
            <Card className="bg-blue-50 border-blue-200 shadow-md">
              <CardHeader>
                <div className="text-center">
                    <p className="text-red-600 font-bold">⚠️ VAGAS LIMITADAS</p>
                    <p className="text-sm text-gray-600">Apenas 3 vagas disponíveis esta semana</p>
                    <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded-md my-2">
                        🔥 Oferta expira em {tempoRestante}
                    </div>
                </div>
                <CardTitle className="text-center text-blue-800">Investimento Inteligente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>Preço base ({formData.numeroPaginas} páginas):</span>
                        <span>{preco.base.toLocaleString()} MT</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>{preco.base.toLocaleString()} MT</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                        <span>Desconto promocional:</span>
                        <span>-{preco.desconto.toLocaleString()} MT</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total Final:</span>
                        <span>{preco.total.toLocaleString()} MT</span>
                    </div>
                    <div className="text-center bg-green-100 text-green-700 p-2 rounded-md font-bold">
                        🎉 VOCÊ ECONOMIZA 17% ({preco.desconto.toLocaleString()} MT)
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2 text-sm text-gray-700">
                    <p><BookOpen className="inline mr-2 h-4 w-4 text-blue-600"/> Páginas: {formData.numeroPaginas}</p>
                    <p><Clock className="inline mr-2 h-4 w-4 text-blue-600"/> Prazo: {formData.prazo} dias</p>
                    <p><GraduationCap className="inline mr-2 h-4 w-4 text-blue-600"/> Nível: {formData.nivelCurso || 'Não selecionado'}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="mt-6">
                <CardHeader><CardTitle>🛡️ Suas Garantias</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-600">
                    <p><CheckCircle className="inline mr-2 h-4 w-4 text-green-500"/> 100% Original e Único</p>
                    <p><Clock className="inline mr-2 h-4 w-4 text-green-500"/> Entrega no Prazo Garantida</p>
                    <p><Award className="inline mr-2 h-4 w-4 text-green-500"/> Aprovação ou Refazemos Grátis</p>
                    <p><Users className="inline mr-2 h-4 w-4 text-green-500"/> Suporte até a Defesa Final</p>
                    <p><GraduationCap className="inline mr-2 h-4 w-4 text-green-500"/> Especialista Dedicado</p>
                    <p><Star className="inline mr-2 h-4 w-4 text-green-500"/> Qualidade Acadêmica Superior</p>
                </CardContent>
            </Card>
             <Card className="mt-6">
                <CardHeader><CardTitle>💬 O Que Dizem Nossos Clientes</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="flex items-center mb-1">
                            <Star className="h-5 w-5 text-yellow-400" />
                            <Star className="h-5 w-5 text-yellow-400" />
                            <Star className="h-5 w-5 text-yellow-400" />
                            <Star className="h-5 w-5 text-yellow-400" />
                            <Star className="h-5 w-5 text-yellow-400" />
                        </div>
                        <p className="text-gray-600 italic">"Nota 18 valores! O especialista foi incrível, sempre disponível e o trabalho ficou perfeito."</p>
                        <p className="text-right font-bold text-sm mt-1">- Maria S.</p>
                    </div>
                     <div>
                        <div className="flex items-center mb-1">
                            <Star className="h-5 w-5 text-yellow-400" />
                            <Star className="h-5 w-5 text-yellow-400" />
                            <Star className="h-5 w-5 text-yellow-400" />
                            <Star className="h-5 w-5 text-yellow-400" />
                            <Star className="h-5 w-5 text-yellow-400" />
                        </div>
                        <p className="text-gray-600 italic">"Entregaram antes do prazo e com qualidade excepcional. Recomendo 100%!"</p>
                        <p className="text-right font-bold text-sm mt-1">- João M.</p>
                    </div>
                </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
