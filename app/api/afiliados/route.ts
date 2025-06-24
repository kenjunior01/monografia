import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validação básica
    const requiredFields = ["nome", "email", "telefone"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ success: false, error: `Campo ${field} é obrigatório` }, { status: 400 })
      }
    }

    // Em produção, salvar no Supabase
    const novoAfiliado = {
      id: Date.now().toString(),
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      codigo_afiliado: `AFIL-${data.nome.split(" ")[0].toUpperCase()}-2024`,
      status: "pendente",
      canais_marketing: data.canaisMarketing || [],
      experiencia_marketing: data.experienciaMarketing || "",
      meta_mensal: data.metaMensal || 10,
      como_conheceu: data.comoConheceu || "",
      banco: data.banco || "",
      numero_conta: data.numeroConta || "",
      titular_conta: data.titularConta || "",
      tipo_conta: data.tipoConta || "",
      data_criacao: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: novoAfiliado,
      message: "Cadastro enviado com sucesso! Você receberá um email quando for aprovado.",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao processar cadastro" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    // Simulação de dados - em produção viria do Supabase
    const afiliados = [
      {
        id: "1",
        nome: "Carlos Mucavel",
        email: "carlos@email.com",
        codigo_afiliado: "AFIL-CARLOS-2024",
        status: "ativo",
        total_indicacoes: 23,
        indicacoes_pagas: 18,
        comissao_total: 18000,
        comissao_pendente: 5000,
        taxa_conversao: 78.3,
        data_criacao: "2024-01-15",
      },
      {
        id: "2",
        nome: "Ana Chissano",
        email: "ana@email.com",
        codigo_afiliado: "AFIL-ANA-2024",
        status: "ativo",
        total_indicacoes: 15,
        indicacoes_pagas: 12,
        comissao_total: 12000,
        comissao_pendente: 3000,
        taxa_conversao: 80.0,
        data_criacao: "2024-01-20",
      },
    ]

    let filteredAfiliados = afiliados
    if (status) {
      filteredAfiliados = afiliados.filter((a) => a.status === status)
    }

    return NextResponse.json({
      success: true,
      data: filteredAfiliados,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao buscar afiliados" }, { status: 500 })
  }
}
