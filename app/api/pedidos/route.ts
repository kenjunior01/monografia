import { type NextRequest, NextResponse } from "next/server"

// Simulação de dados - em produção viria do Supabase
const pedidos = [
  {
    id: "1",
    numero_pedido: "MON-001",
    titulo: "Gestão de Recursos Humanos em Startups",
    status: "em-andamento",
    progresso: 65,
    prazo: "2024-02-15",
    valor: "R$ 750,00",
    escritor: "Dr. Ana Silva",
    cliente_id: "user-1",
  },
  {
    id: "2",
    numero_pedido: "MON-002",
    titulo: "Sustentabilidade no Setor Bancário",
    status: "concluido",
    progresso: 100,
    prazo: "2024-01-20",
    valor: "R$ 900,00",
    escritor: "Prof. Carlos Santos",
    cliente_id: "user-1",
  },
]

export async function GET(request: NextRequest) {
  try {
    // Em produção, aqui faria a consulta no Supabase
    // const { data, error } = await supabase
    //   .from('pedidos')
    //   .select('*')
    //   .eq('cliente_id', userId)

    return NextResponse.json({
      success: true,
      data: pedidos,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao buscar pedidos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validação básica
    const requiredFields = ["pais", "instituicao", "nivel", "area", "paginas", "prazo"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Campo ${field} é obrigatório` }, { status: 400 })
      }
    }

    // Calcular preço
    const paginas = Number.parseInt(body.paginas)
    const prazo = Number.parseInt(body.prazo)
    let precoPorPagina = 15

    if (paginas > 50) precoPorPagina = 12
    if (prazo <= 5) precoPorPagina = 20

    const precoBase = paginas * precoPorPagina
    const precoFinal = body.precisaEstudoCaso ? precoBase * 1.3 : precoBase

    // Em produção, salvaria no Supabase
    const novoPedido = {
      id: Date.now().toString(),
      numero_pedido: `MON-${String(Date.now()).slice(-3)}`,
      ...body,
      valor_total: precoFinal,
      status: "novo",
      progresso: 0,
      data_pedido: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: novoPedido,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao criar pedido" }, { status: 500 })
  }
}
