import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clienteId = searchParams.get('cliente_id');

    let query = supabase.from('pedidos').select('*');

    if (clienteId) {
      query = query.eq('cliente_id', clienteId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erro ao buscar pedidos:', error);
      throw new Error('Erro no servidor ao buscar pedidos.');
    }

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Erro ao buscar pedidos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validação dos campos do formulário
    const requiredFields = [
      "nome",
      "email",
      "telefone",
      "paisRegiao",
      "universidade",
      "nivelCurso",
      "areaEstudo",
      "tema",
      "numeroPaginas",
      "prazo",
      "pagamento"
    ]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `O campo ${field} é obrigatório` }, { status: 400 })
      }
    }

    // Usar os valores de preço calculados pelo frontend
    const { base, desconto, total, extras } = body
    
    // Gerar código único do pedido
    const dataAtual = new Date()
    const ano = dataAtual.getFullYear().toString().slice(-2)
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0')
    const sequencial = String(Date.now()).slice(-4)
    const codigoPedido = `MON${ano}${mes}-${sequencial}`

    const prazoDate = new Date();
    prazoDate.setDate(prazoDate.getDate() + body.prazo);

    const { data: pedidoData, error: pedidoError } = await supabase
      .from('pedidos')
      .insert([
        {
          numero_pedido: codigoPedido,
          // cliente_id: userId, // TODO: Adicionar ID do usuário logado
          pais: body.paisRegiao,
          instituicao: body.universidade,
          nivel_academico: body.nivelCurso,
          area_estudo: body.areaEstudo,
          tema: body.tema,
          numero_paginas: body.numeroPaginas,
          prazo_dias: body.prazo,
          estilo_citacao: body.estiloCitacao || 'APA', // Valor padrão
          descricao: body.detalhes,
          valor_total: total,
          status_pagamento: 'pendente',
          status: 'novo',
          data_prazo: prazoDate.toISOString().split('T')[0],
        },
      ])
      .select()
      .single();

    if (pedidoError) {
      console.error("Erro ao salvar pedido no Supabase:", pedidoError);
      return NextResponse.json({ success: false, error: "Erro ao criar o pedido no banco de dados." }, { status: 500 });
    }

    // Enviar e-mail de notificação para o administrador
    const adminEmail = 'edibizmz@gmail.com';
    const emailBody = `
      Novo pedido recebido!
      
      Código: ${codigoPedido}
      Cliente: ${body.nome}
      Email: ${body.email}
      Telefone: ${body.telefone}
      Tema: ${body.tema}
      Nível: ${body.nivelCurso}
      Área: ${body.areaEstudo}
      Páginas: ${body.numeroPaginas}
      Prazo: ${body.prazo} dias
      Valor: ${total} MT
    `;

    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'Monografia+ <noreply@monografiaplus.com>',
          to: adminEmail,
          subject: `Novo Pedido Recebido - ${codigoPedido}`,
          text: emailBody
        })
      });
    } catch (emailError) {
      console.error('Erro ao enviar e-mail de notificação:', emailError);
      // Não retornar erro para não afetar a experiência do usuário
    }

    return NextResponse.json({ 
      success: true, 
      message: "Pedido criado com sucesso!", 
      pedidoId: pedidoData.id 
    });


  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return NextResponse.json({ success: false, error: "Ocorreu um erro inesperado ao processar o seu pedido." }, { status: 500 })
  }
}
