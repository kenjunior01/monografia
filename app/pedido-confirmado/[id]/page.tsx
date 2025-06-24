"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CheckCircle,
  Clock,
  Smartphone,
  Banknote,
  Building,
  Copy,
  MessageSquare,
  Download,
  ArrowRight,
  Shield,
  Zap,
  Target,
  Gift,
} from "lucide-react"

interface PedidoConfirmado {
  id: string
  numero: string
  titulo: string
  valor: string
  metodoPagamento: string
  status: string
  dataVencimento: string
  codigoAfiliado?: string
}

export default function PedidoConfirmadoPage({ params }: { params: { id: string } }) {
  const [pedido, setPedido] = useState<PedidoConfirmado>({
    id: params.id,
    numero: "MON-2024-001",
    titulo: "Gestão de Recursos Humanos em Startups",
    valor: "18.500 MT",
    metodoPagamento: "mpesa",
    status: "aguardando-pagamento",
    dataVencimento: "2024-02-07",
    codigoAfiliado: "AFIL-CARLOS-2024",
  })

  const [instrucoesPagamento, setInstrucoesPagamento] = useState<any>(null)

  useEffect(() => {
    // Buscar instruções de pagamento
    fetch(`/api/pagamentos/instrucoes?metodo=${pedido.metodoPagamento}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setInstrucoesPagamento(data.data)
        }
      })
  }, [pedido.metodoPagamento])

  const copiarDados = (texto: string) => {
    navigator.clipboard.writeText(texto)
    // Toast notification
  }

  const getMetodoIcon = (metodo: string) => {
    switch (metodo) {
      case "mpesa":
        return <Smartphone className="h-6 w-6 text-green-600" />
      case "transferencia":
        return <Banknote className="h-6 w-6 text-blue-600" />
      case "deposito":
        return <Building className="h-6 w-6 text-purple-600" />
      default:
        return <Banknote className="h-6 w-6 text-gray-600" />
    }
  }

  const getMetodoColor = (metodo: string) => {
    switch (metodo) {
      case "mpesa":
        return "border-green-300 bg-green-50"
      case "transferencia":
        return "border-blue-300 bg-blue-50"
      case "deposito":
        return "border-purple-300 bg-purple-50"
      default:
        return "border-gray-300 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header de Confirmação */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🎉 Pedido Confirmado com Sucesso!</h1>
          <p className="text-lg text-gray-600">
            Seu pedido #{pedido.numero} foi registrado e está aguardando pagamento
          </p>

          {pedido.codigoAfiliado && (
            <div className="bg-green-100 border border-green-300 rounded-lg p-3 mt-4 inline-block">
              <div className="flex items-center gap-2 text-green-800">
                <Gift className="h-4 w-4" />
                <span className="text-sm font-medium">Indicação registrada: {pedido.codigoAfiliado}</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Instruções de Pagamento */}
          <div className="lg:col-span-2 space-y-6">
            <Card className={`border-2 ${getMetodoColor(pedido.metodoPagamento)}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getMetodoIcon(pedido.metodoPagamento)}
                  {instrucoesPagamento?.titulo || "Instruções de Pagamento"}
                </CardTitle>
                <CardDescription>Siga os passos abaixo para completar seu pagamento</CardDescription>
              </CardHeader>
              <CardContent>
                {instrucoesPagamento && (
                  <div className="space-y-6">
                    {/* Instruções Passo a Passo */}
                    <div>
                      <h3 className="font-medium mb-3">📋 Passo a Passo:</h3>
                      <ol className="space-y-2">
                        {instrucoesPagamento.instrucoes.map((instrucao: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {index + 1}
                            </span>
                            <span className="text-sm">{instrucao}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Dados para Pagamento */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium mb-3">💳 Dados para Pagamento:</h3>
                      <div className="space-y-3">
                        {pedido.metodoPagamento === "mpesa" && (
                          <>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Número M-Pesa:</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold">{instrucoesPagamento.dadosContato.numero}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => copiarDados(instrucoesPagamento.dadosContato.numero)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Nome:</span>
                              <span className="font-medium">{instrucoesPagamento.dadosContato.nome}</span>
                            </div>
                          </>
                        )}

                        {(pedido.metodoPagamento === "transferencia" || pedido.metodoPagamento === "deposito") && (
                          <>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Banco:</span>
                              <span className="font-medium">{instrucoesPagamento.dadosContato.banco}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Conta:</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold">{instrucoesPagamento.dadosContato.conta}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => copiarDados(instrucoesPagamento.dadosContato.conta)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Titular:</span>
                              <span className="font-medium">{instrucoesPagamento.dadosContato.titular}</span>
                            </div>
                            {instrucoesPagamento.dadosContato.iban && (
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">IBAN:</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-sm">{instrucoesPagamento.dadosContato.iban}</span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => copiarDados(instrucoesPagamento.dadosContato.iban)}
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </>
                        )}

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Valor a Pagar:</span>
                          <span className="text-lg font-bold text-green-600">{pedido.valor}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tempo de Confirmação */}
                    <Alert>
                      <Clock className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Tempo de confirmação:</strong> {instrucoesPagamento.tempoConfirmacao}
                        <br />
                        {instrucoesPagamento.observacoes}
                      </AlertDescription>
                    </Alert>

                    {/* WhatsApp */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-800 mb-2">📱 Envie o Comprovante:</h4>
                      <p className="text-sm text-green-700 mb-3">
                        Após o pagamento, envie o comprovante via WhatsApp para confirmação rápida:
                      </p>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        WhatsApp: {instrucoesPagamento.dadosContato.whatsapp}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Próximos Passos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="h-5 w-5" />🚀 Próximos Passos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-blue-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Confirmação do Pagamento</h4>
                      <p className="text-sm text-gray-600">
                        Assim que recebermos seu pagamento, você receberá confirmação por email e SMS
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-green-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Atribuição do Especialista</h4>
                      <p className="text-sm text-gray-600">
                        Um especialista na sua área será atribuído ao seu projeto em até 2 horas
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-purple-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Início do Desenvolvimento</h4>
                      <p className="text-sm text-gray-600">
                        Seu especialista entrará em contato e iniciará o trabalho imediatamente
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-orange-600">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Acompanhamento em Tempo Real</h4>
                      <p className="text-sm text-gray-600">
                        Acesse seu painel para acompanhar o progresso e se comunicar com o especialista
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Resumo do Pedido */}
          <div className="space-y-6">
            {/* Resumo do Pedido */}
            <Card>
              <CardHeader>
                <CardTitle>📋 Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Número do Pedido:</p>
                    <p className="font-bold">{pedido.numero}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Título:</p>
                    <p className="font-medium">{pedido.titulo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Valor Total:</p>
                    <p className="text-lg font-bold text-green-600">{pedido.valor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status:</p>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Clock className="h-3 w-3 mr-1" />
                      Aguardando Pagamento
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Prazo para Pagamento:</p>
                    <p className="font-medium text-red-600">{pedido.dataVencimento}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Garantias */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  🛡️ Suas Garantias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-green-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Entrega no Prazo Garantida</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>100% Original e Único</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    <span>Aprovação ou Refazemos Grátis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <span>Suporte até a Defesa</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ações Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>⚡ Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Enviar Comprovante
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Detalhes do Pedido
                </Button>
                <Button variant="outline" className="w-full">
                  Acessar Meu Painel
                </Button>
              </CardContent>
            </Card>

            {/* Suporte */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">💬 Precisa de Ajuda?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-700 mb-3">Nossa equipe está disponível 24/7 para ajudar você</p>
                <div className="space-y-2">
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    WhatsApp: +258 84 123 4567
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    📧 suporte@monografiaplus.com
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
