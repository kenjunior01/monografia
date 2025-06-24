import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Globe,
  GraduationCap,
  FileText,
  Shield,
  Clock,
  Star,
  CheckCircle,
  AlertTriangle,
  Target,
  Zap,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">MonografiaPlus</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#problemas" className="text-gray-600 hover:text-blue-600">
              Problemas
            </Link>
            <Link href="#solucoes" className="text-gray-600 hover:text-blue-600">
              Soluções
            </Link>
            <Link href="#garantias" className="text-gray-600 hover:text-blue-600">
              Garantias
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-blue-600">
              Login
            </Link>
            <Link href="/novo-pedido">
              <Button className="bg-red-600 hover:bg-red-700 animate-pulse">🔥 URGENTE - Começar Agora</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section com Gatilhos Mentais - Mobile Optimized */}
      <section className="py-12 sm:py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-4 sm:mb-6 flex justify-center">
            <Badge className="mb-3 sm:mb-4 bg-red-100 text-red-800 hover:bg-red-100 animate-bounce text-xs sm:text-sm px-3 py-1">
              ⚠️ APENAS 3 VAGAS DISPONÍVEIS ESTA SEMANA
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            <span className="text-red-600 block mb-2">PARE de Sofrer</span>
            <span className="block mb-2">com sua Monografia!</span>
            <span className="text-blue-600 block text-2xl sm:text-3xl lg:text-4xl">Entregue em 7 Dias ou Menos</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2">
            <strong className="block mb-2">Você está a 1 semana da formatura</strong>
            <span className="block mb-2">e ainda não terminou sua monografia?</span>
            <span className="text-red-600 font-bold block mb-2"> Não entre em pânico!</span>
            <span className="block">
              Nosso especialista acadêmico cria sua monografia completa, seguindo todas as normas da sua instituição.
            </span>
          </p>

          {/* Urgência e Escassez - Mobile Optimized */}
          <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 mb-6 sm:mb-8 max-w-2xl mx-auto text-left">
            <div className="flex items-start">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 font-medium text-sm sm:text-base leading-relaxed">
                <strong>ATENÇÃO:</strong> Só aceitamos 3 pedidos urgentes por semana para garantir qualidade máxima
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-2">
            <Link href="/novo-pedido">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 font-bold"
              >
                🚨 QUERO MINHA VAGA AGORA
              </Button>
            </Link>
            <Link href="#problemas">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                Ver Como Funciona
              </Button>
            </Link>
          </div>

          {/* Prova Social - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
              <span>127 estudantes formados este mês</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" />
              <span>4.9/5 estrelas (89 avaliações)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problemas que Resolvemos - Mobile Two-Column Layout */}
      <section id="problemas" className="py-12 sm:py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4 leading-tight">
            Reconhece Algum Destes Problemas?
          </h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base px-2">
            Se você está passando por isso, não está sozinho...
          </p>

          {/* Mobile: 2 columns, Desktop: 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <Card className="border-red-200 bg-red-50">
              <CardHeader className="pb-3 sm:pb-4">
                <Clock className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-red-600 mb-2 sm:mb-3 lg:mb-4" />
                <CardTitle className="text-red-800 text-lg sm:text-xl leading-tight">Tempo Esgotando</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-red-700 text-sm sm:text-base leading-relaxed">
                  "Faltam apenas dias para a entrega e eu nem comecei! O pânico está tomando conta e não sei por onde
                  começar..."
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardHeader className="pb-3 sm:pb-4">
                <FileText className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-orange-600 mb-2 sm:mb-3 lg:mb-4" />
                <CardTitle className="text-orange-800 text-lg sm:text-xl leading-tight">Normas Confusas</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-orange-700 text-sm sm:text-base leading-relaxed">
                  "ABNT, APA, Vancouver... Cada professor fala uma coisa diferente. Como vou saber qual está certo?"
                </p>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50 sm:col-span-2 lg:col-span-1">
              <CardHeader className="pb-3 sm:pb-4">
                <Target className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-yellow-600 mb-2 sm:mb-3 lg:mb-4" />
                <CardTitle className="text-yellow-800 text-lg sm:text-xl leading-tight">Falta de Foco</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-yellow-700 text-sm sm:text-base leading-relaxed">
                  "Trabalho, família, outras matérias... Não consigo encontrar tempo e concentração para escrever uma
                  monografia de qualidade."
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8 sm:mt-12 px-2">
            <p className="text-lg sm:text-xl text-gray-700 mb-4 sm:mb-6 leading-relaxed">
              <strong>Se você se identificou com pelo menos um problema acima...</strong>
            </p>
            <p className="text-xl sm:text-2xl font-bold text-blue-600 leading-tight">
              Temos a solução PERFEITA para você! 👇
            </p>
          </div>
        </div>
      </section>

      {/* Nossas Soluções - Mobile Optimized */}
      <section id="solucoes" className="py-12 sm:py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 leading-tight px-2">
            Como Transformamos Seu Pesadelo em Sucesso
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-3 sm:pb-4">
                <Zap className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-green-600 mb-2 sm:mb-3 lg:mb-4" />
                <CardTitle className="text-green-800 text-lg sm:text-xl leading-tight">Entrega Expressa</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3 sm:space-y-4">
                <p className="text-green-700 text-sm sm:text-base leading-relaxed">
                  <strong className="block mb-1">Problema:</strong> Tempo esgotando
                  <br />
                  <strong className="block mb-1 mt-2">Solução:</strong> Monografia completa em 7 dias ou menos, com
                  qualidade acadêmica garantida.
                </p>
                <Badge className="bg-green-600 text-white text-xs sm:text-sm">
                  ✅ Já salvamos 89 estudantes este mês
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-3 sm:pb-4">
                <Globe className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-600 mb-2 sm:mb-3 lg:mb-4" />
                <CardTitle className="text-blue-800 text-lg sm:text-xl leading-tight">Normas Perfeitas</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3 sm:space-y-4">
                <p className="text-blue-700 text-sm sm:text-base leading-relaxed">
                  <strong className="block mb-1">Problema:</strong> Confusão com normas
                  <br />
                  <strong className="block mb-1 mt-2">Solução:</strong> Especialista conhece TODAS as normas de TODAS as
                  instituições de Moçambique.
                </p>
                <Badge className="bg-blue-600 text-white text-xs sm:text-sm">✅ 100% de aprovação nas normas</Badge>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50 sm:col-span-2 lg:col-span-1">
              <CardHeader className="pb-3 sm:pb-4">
                <Shield className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-purple-600 mb-2 sm:mb-3 lg:mb-4" />
                <CardTitle className="text-purple-800 text-lg sm:text-xl leading-tight">Zero Preocupação</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3 sm:space-y-4">
                <p className="text-purple-700 text-sm sm:text-base leading-relaxed">
                  <strong className="block mb-1">Problema:</strong> Falta de tempo e foco
                  <br />
                  <strong className="block mb-1 mt-2">Solução:</strong> Você só precisa fornecer o tema. Nós cuidamos de
                  TODO o resto.
                </p>
                <Badge className="bg-purple-600 text-white text-xs sm:text-sm">
                  ✅ Você pode focar em outras prioridades
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Prova Social e Depoimentos - Mobile Optimized */}
      <section className="py-12 sm:py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 leading-tight">
            O Que Nossos Clientes Dizem
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="flex text-yellow-400 text-sm sm:text-base">{"★".repeat(5)}</div>
                  <span className="ml-2 font-medium text-sm sm:text-base">Maria S. - UEM</span>
                </div>
                <p className="text-gray-700 italic text-sm sm:text-base leading-relaxed">
                  "Estava desesperada com apenas 5 dias para entregar. A MonografiaPlus salvou minha formatura! Recebi
                  uma monografia perfeita, com todas as normas da UEM. <strong>Recomendo 1000%!</strong>"
                </p>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="flex text-yellow-400 text-sm sm:text-base">{"★".repeat(5)}</div>
                  <span className="ml-2 font-medium text-sm sm:text-base">João M. - UP</span>
                </div>
                <p className="text-gray-700 italic text-sm sm:text-base leading-relaxed">
                  "Trabalho 12h por dia e não tinha tempo. Em 1 semana recebi minha monografia completa, com estudo de
                  caso real. <strong>Nota máxima na defesa!</strong>"
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4 leading-relaxed">
              <strong>127 estudantes</strong> já se formaram este mês com nossa ajuda
            </p>
            <div className="flex justify-center items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                ))}
              </div>
              <span className="text-xs sm:text-sm text-gray-500">+122 outros estudantes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Preços com Urgência - Mobile Optimized */}
      <section className="py-12 sm:py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 leading-tight">Investimento Que Muda Sua Vida</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            Quanto vale sua formatura? Quanto vale sua paz de espírito?
            <strong className="text-red-600 block mt-1"> Por menos que uma festa de formatura</strong>, você garante seu
            diploma.
          </p>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-red-800 mb-3 sm:mb-4 leading-tight">
              🔥 OFERTA RELÂMPAGO
            </h3>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-600 mb-2 leading-tight">
              A partir de <span className="line-through text-gray-400 text-lg sm:text-2xl lg:text-3xl">15.000 MT</span>
              <span className="text-green-600 block sm:inline"> 12.000 MT</span>
            </div>
            <p className="text-red-700 font-medium mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
              Economia de 3.000 MT - Válida apenas para os próximos 3 pedidos!
            </p>
            <Badge className="bg-red-600 text-white text-sm sm:text-base lg:text-lg px-3 sm:px-4 py-1 sm:py-2">
              ⏰ Oferta expira em 24 horas
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-6 sm:mb-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FileText className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Preço Personalizado</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Baseado em páginas, prazo e complexidade
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Clock className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Pagamento Flexível</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">M-Pesa, transferência ou depósito</p>
            </div>
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Star className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Sem Taxas Ocultas</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Preço final transparente</p>
            </div>
          </div>

          <div className="mb-6 sm:mb-8 px-2">
            <Link href="/novo-pedido">
              <Button
                size="lg"
                className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 bg-red-600 hover:bg-red-700 animate-pulse font-bold"
              >
                🚨 GARANTIR MINHA VAGA AGORA
              </Button>
            </Link>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
              Clique agora e receba o cálculo personalizado em 2 minutos
            </p>
          </div>
        </div>
      </section>

      {/* Urgência Final */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-red-400">⚠️ ÚLTIMA CHANCE</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Não deixe sua formatura para depois. <strong>Cada dia que passa é uma oportunidade perdida.</strong>
            Enquanto você pensa, outros estudantes já estão garantindo suas vagas.
          </p>

          <div className="bg-red-600 rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold mb-4">🔥 APENAS 2 VAGAS RESTANTES</h3>
            <p className="text-lg mb-4">
              Não queremos que você perca esta oportunidade. Clique agora e garante sua vaga antes que seja tarde
              demais.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/novo-pedido">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 font-bold">
                  SIM, QUERO GARANTIR MINHA VAGA
                </Button>
              </Link>
            </div>
          </div>

          <p className="text-gray-400 text-sm">
            Mais de 1.200 estudantes já confiaram em nós. Seja o próximo a se formar com sucesso.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-6 w-6" />
                <span className="text-xl font-bold">MonografiaPlus</span>
              </div>
              <p className="text-gray-400">Especialista em monografias acadêmicas com garantia de aprovação.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Serviços</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Monografias Expressas</li>
                <li>Estudos de Caso</li>
                <li>Dissertações</li>
                <li>Artigos Científicos</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Garantias</h3>
              <ul className="space-y-2 text-gray-400">
                <li>100% Original</li>
                <li>Prazo Garantido</li>
                <li>Aprovação Garantida</li>
                <li>Suporte Total</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contato Urgente</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📧 urgente@monografiaplus.com</li>
                <li>📱 +258 84 123 4567</li>
                <li>⏰ Resposta em 30 minutos</li>
                <li>🚨 Disponível 24/7</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MonografiaPlus. Transformando pesadelos acadêmicos em sucessos garantidos.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
