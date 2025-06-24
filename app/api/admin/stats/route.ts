import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Em produção, estes dados viriam do Supabase
    const stats = {
      pedidos: {
        total: 156,
        ativos: 23,
        concluidos: 128,
        aguardandoEscritor: 5,
        emRevisao: 8,
        aguardandoPagamento: 3,
      },
      receita: {
        total: 2450000, // MT
        esteMes: 185000,
        mesPassado: 170000,
        crescimento: 8.8,
      },
      clientes: {
        total: 89,
        ativos: 67,
        novosEsteMes: 12,
      },
      escritores: {
        total: 12,
        ativos: 10,
        ocupados: 8,
        disponiveis: 2,
      },
      performance: {
        tempoMedioEntrega: 12, // dias
        taxaSatisfacao: 96.5, // %
        taxaAprovacao: 94.2, // %
        taxaRetencao: 78.5, // %
      },
      pagamentos: {
        confirmados: 1850000,
        pendentes: 145000,
        aguardandoConfirmacao: 12,
      },
    }

    return NextResponse.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao buscar estatísticas" }, { status: 500 })
  }
}
