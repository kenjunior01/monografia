import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(request: NextRequest) {
  try {
    const { data: pedidos, error: pedidosError } = await supabase
      .from('pedidos')
      .select('status, valor_total');

    const { data: usuarios, error: usuariosError } = await supabase
      .from('usuarios')
      .select('tipo_usuario, ativo');

    const { data: pagamentos, error: pagamentosError } = await supabase
      .from('pagamentos')
      .select('status, valor');

    if (pedidosError || usuariosError || pagamentosError) {
      console.error('Erro ao buscar dados do Supabase:', pedidosError || usuariosError || pagamentosError);
      throw new Error('Erro ao carregar dados do dashboard.');
    }

    // Calcular estatísticas
    const totalPedidos = pedidos?.length || 0;
    const pedidosAtivos = pedidos?.filter(p => p.status === 'em-andamento' || p.status === 'revisao').length || 0;
    const pedidosConcluidos = pedidos?.filter(p => p.status === 'concluido').length || 0;
    const receitaTotal = pagamentos?.filter(p => p.status === 'aprovado').reduce((acc, p) => acc + p.valor, 0) || 0;
    const clientesAtivos = usuarios?.filter(u => u.tipo_usuario === 'cliente' && u.ativo).length || 0;
    const especialistasAtivos = usuarios?.filter(u => u.tipo_usuario === 'escritor' && u.ativo).length || 0;

    const estatisticas = {
      totalPedidos,
      pedidosAtivos,
      pedidosConcluidos,
      receitaTotal: `${receitaTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'MZN' })}`,
      receitaMes: '0 MT', // Lógica a ser implementada
      clientesAtivos,
      especialistasAtivos,
      taxaAprovacao: 98.5, // Simulado
      afiliadosAtivos: 0, // Simulado
      comissoesAfiliados: '0 MT', // Simulado
      conversaoAfiliados: 0, // Simulado
    };

    const { data: pedidosRecentes } = await supabase
      .from('pedidos')
      .select('id, numero_pedido, tema, status, usuarios!pedidos_cliente_id_fkey(nome)')
      .order('data_criacao', { ascending: false })
      .limit(5);

    return NextResponse.json({ estatisticas, pedidos: pedidosRecentes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}