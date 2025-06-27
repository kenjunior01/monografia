import { type NextRequest, NextResponse } from "next/server"

interface PricingRequest {
  paginas: number
  prazo: number
  nivel: string
  area: string
  precisaEstudoCaso: boolean
  revisoesPremium: boolean
  suporteUrgente: boolean
  formatacaoEspecial: boolean
  apresentacaoDefesa: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body: PricingRequest = await request.json()

    // Preço base por página
    const precoPorPagina = 300 // 300 MT por página
    const base = body.paginas * precoPorPagina

    // Multiplicadores baseados no nível acadêmico
    const multiplicadorNivel = {
      licenciatura: 1,
      mestrado: 1.3,
      doutoramento: 1.5
    }[body.nivel] || 1

    // Multiplicador de urgência baseado no prazo
    let multiplicadorUrgencia = 1
    if (body.prazo <= 3) multiplicadorUrgencia = 2
    else if (body.prazo <= 7) multiplicadorUrgencia = 1.5
    else if (body.prazo <= 14) multiplicadorUrgencia = 1.2

    // Calcular extras
    const extras = [
      body.precisaEstudoCaso ? 2500 : 0,
      body.revisoesPremium ? 1500 : 0,
      body.suporteUrgente ? 2000 : 0,
      body.formatacaoEspecial ? 1000 : 0,
      body.apresentacaoDefesa ? 3000 : 0
    ].reduce((a, b) => a + b, 0)

    // Calcular preço total
    const subtotal = base * multiplicadorNivel * multiplicadorUrgencia
    const desconto = 2000 // Desconto promocional fixo
    const total = subtotal + extras - desconto

    return NextResponse.json({
      base: subtotal,
      extras,
      desconto,
      total,
      detalhes: {
        precoPorPagina,
        multiplicadorNivel,
        multiplicadorUrgencia
      }
    })
  } catch (error) {
    console.error("Erro ao calcular preço:", error)
    return NextResponse.json(
      { success: false, error: "Erro ao calcular preço" },
      { status: 500 }
    )
  }
}  paginas: number
  prazo: number
  nivel: string
  area: string
  precisaEstudoCaso: boolean
  revisoesPremium: boolean
  suporteUrgente: boolean
  formatacaoEspecial: boolean
  apresentacaoDefesa: boolean
}

export async function POST(request: NextRequest) {
  try {
    const data: PricingRequest = await request.json()

    // Configuração base de preços (em MT)
    const config = {
      precoBase: 12000, // 12.000 MT base
      paginasIncluidas: 40,
      precoPorPaginaAdicional: 300,

      // Multiplicadores por nível acadêmico
      multiplicadorNivel: {
        licenciatura: 1.0,
        mestrado: 1.4,
        doutorado: 1.8,
        "pos-graduacao": 1.2,
      },

      // Multiplicadores por área
      multiplicadorArea: {
        medicina: 1.5,
        direito: 1.3,
        engenharia: 1.4,
        administracao: 1.0,
        economia: 1.2,
        educacao: 1.0,
        psicologia: 1.1,
        tecnologia: 1.3,
        outro: 1.0,
      },

      // Multiplicadores por urgência (dias)
      multiplicadorUrgencia: {
        3: 2.0, // 100% adicional
        5: 1.6, // 60% adicional
        7: 1.3, // 30% adicional
        10: 1.1, // 10% adicional
        14: 1.0, // Preço normal
        21: 0.9, // 10% desconto
        30: 0.8, // 20% desconto
      },

      // Serviços adicionais
      custoEstudoCaso: 0.5, // 50% do preço base
      custoRevisoesPremium: 0.3, // 30% do preço base
      custoSuporteUrgente: 4000, // Valor fixo
      custoFormatacaoEspecial: 2500, // Valor fixo
      custoApresentacaoDefesa: 3500, // Valor fixo

      // Descontos promocionais
      descontoPromocional: 2000, // Desconto atual
      descontoVolumeMin: 50, // Páginas mínimas para desconto
      descontoVolume: 0.1, // 10% desconto para trabalhos grandes
    }

    // Cálculo do preço base ajustado
    let precoBase = config.precoBase

    // Ajuste por nível acadêmico
    const nivelKey = data.nivel as keyof typeof config.multiplicadorNivel
    const nivelMultiplier = config.multiplicadorNivel[nivelKey] || 1.0
    precoBase *= nivelMultiplier

    // Ajuste por área de estudo
    const areaKey = data.area as keyof typeof config.multiplicadorArea
    const areaMultiplier = config.multiplicadorArea[areaKey] || 1.0
    precoBase *= areaMultiplier

    // Cálculo de custos adicionais
    let custoAdicionalPaginas = 0
    if (data.paginas > config.paginasIncluidas) {
      custoAdicionalPaginas = (data.paginas - config.paginasIncluidas) * config.precoPorPaginaAdicional
    }

    // Multiplicador de urgência
    const urgenciaKey = data.prazo as keyof typeof config.multiplicadorUrgencia
    const urgenciaMultiplier = config.multiplicadorUrgencia[urgenciaKey] || 1.0
    const custoUrgencia = (precoBase + custoAdicionalPaginas) * (urgenciaMultiplier - 1)

    // Serviços adicionais
    let custoEstudoCaso = 0
    if (data.precisaEstudoCaso) {
      custoEstudoCaso = precoBase * config.custoEstudoCaso
    }

    let custoRevisoes = 0
    if (data.revisoesPremium) {
      custoRevisoes = precoBase * config.custoRevisoesPremium
    }

    let custoSuporte = 0
    if (data.suporteUrgente) {
      custoSuporte = config.custoSuporteUrgente
    }

    let custoFormatacao = 0
    if (data.formatacaoEspecial) {
      custoFormatacao = config.custoFormatacaoEspecial
    }

    let custoApresentacao = 0
    if (data.apresentacaoDefesa) {
      custoApresentacao = config.custoApresentacaoDefesa
    }

    // Subtotal
    const subtotal =
      precoBase +
      custoAdicionalPaginas +
      custoUrgencia +
      custoEstudoCaso +
      custoRevisoes +
      custoSuporte +
      custoFormatacao +
      custoApresentacao

    // Descontos
    let desconto = config.descontoPromocional

    // Desconto por volume
    if (data.paginas >= config.descontoVolumeMin) {
      desconto += subtotal * config.descontoVolume
    }

    // Total final (mínimo de 10.000 MT)
    const total = Math.max(subtotal - desconto, 10000)

    // Economia calculada
    const precoSemDesconto = subtotal
    const economia = precoSemDesconto - total

    return NextResponse.json({
      success: true,
      pricing: {
        precoBase: Math.round(precoBase),
        custoAdicionalPaginas: Math.round(custoAdicionalPaginas),
        custoUrgencia: Math.round(custoUrgencia),
        custoEstudoCaso: Math.round(custoEstudoCaso),
        custoRevisoes: Math.round(custoRevisoes),
        custoSuporte: Math.round(custoSuporte),
        custoFormatacao: Math.round(custoFormatacao),
        custoApresentacao: Math.round(custoApresentacao),
        subtotal: Math.round(subtotal),
        desconto: Math.round(desconto),
        total: Math.round(total),
        economia: Math.round(economia),
        detalhes: {
          paginasIncluidas: config.paginasIncluidas,
          paginasAdicionais: Math.max(0, data.paginas - config.paginasIncluidas),
          nivelMultiplier,
          areaMultiplier,
          urgenciaMultiplier,
          temDesconto: desconto > 0,
          percentualEconomia: Math.round((economia / precoSemDesconto) * 100),
        },
      },
    })
  } catch (error) {
    console.error("Erro no cálculo de preços:", error)
    return NextResponse.json({ success: false, error: "Erro ao calcular preço" }, { status: 500 })
  }
}
