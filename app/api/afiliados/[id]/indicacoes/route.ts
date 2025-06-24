import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const afiliadoId = params.id

    // Em produção, buscar do Supabase
    const indicacoes = [
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
    ]

    return NextResponse.json({
      success: true,
      data: indicacoes,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao buscar indicações" }, { status: 500 })
  }
}
