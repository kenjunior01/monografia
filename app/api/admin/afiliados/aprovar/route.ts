import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { afiliadoId } = await request.json()

    if (!afiliadoId) {
      return NextResponse.json({ success: false, error: "ID do afiliado é obrigatório" }, { status: 400 })
    }

    // Em produção, atualizar no Supabase
    // const { data, error } = await supabase
    //   .from('afiliados')
    //   .update({
    //     status: 'ativo',
    //     data_aprovacao: new Date().toISOString(),
    //     aprovado_por: adminId
    //   })
    //   .eq('id', afiliadoId)

    // Enviar email de aprovação
    // await enviarEmailAprovacao(afiliado.email, afiliado.codigo_afiliado)

    return NextResponse.json({
      success: true,
      message: "Afiliado aprovado com sucesso!",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao aprovar afiliado" }, { status: 500 })
  }
}
