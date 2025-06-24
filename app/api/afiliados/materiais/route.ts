import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Em produção, buscar do Supabase
    const materiais = [
      {
        id: "1",
        tipo: "Banner",
        nome: "Banner Principal - Urgência",
        formato: "1080x1080",
        downloads: 45,
        url: "/materiais/banner-urgencia.png",
        categoria: "promocional",
      },
      {
        id: "2",
        tipo: "Post",
        nome: "Post Instagram - Depoimento",
        formato: "1080x1080",
        downloads: 32,
        url: "/materiais/post-depoimento.png",
        categoria: "social_proof",
      },
      {
        id: "3",
        tipo: "Story",
        nome: "Story - Oferta Limitada",
        formato: "1080x1920",
        downloads: 28,
        url: "/materiais/story-oferta.png",
        categoria: "urgencia",
      },
      {
        id: "4",
        tipo: "Texto",
        nome: "Copy WhatsApp - Persuasivo",
        formato: "TXT",
        downloads: 67,
        conteudo: `🎓 ATENÇÃO ESTUDANTE! 

Está com dificuldades na sua monografia? 
⏰ Prazo apertado? 
📚 Não sabe por onde começar?

A MonografiaPlus tem a solução PERFEITA para você!

✅ Monografia 100% original
✅ Entrega em 7 dias
✅ Todas as normas da sua universidade
✅ Garantia de aprovação

💰 A partir de 12.000 MT
🔥 OFERTA LIMITADA - Apenas 3 vagas esta semana!

👆 Clique no link e garante já a sua vaga:
[SEU_LINK_AQUI]

Não deixe sua formatura para depois! 🚀`,
        categoria: "copy",
      },
    ]

    return NextResponse.json({
      success: true,
      data: materiais,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao buscar materiais" }, { status: 500 })
  }
}
