import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const metodo = searchParams.get("metodo")

    // Instruções de pagamento por método
    const instrucoes = {
      mpesa: {
        titulo: "Pagamento via M-Pesa",
        instrucoes: [
          "1. Abra o aplicativo M-Pesa ou disque *150#",
          "2. Selecione 'Enviar Dinheiro'",
          "3. Digite o número: 84 123 4567",
          "4. Insira o valor exato do pedido",
          "5. Confirme com seu PIN",
          "6. Envie o SMS de confirmação via WhatsApp: +258 84 123 4567",
        ],
        dadosContato: {
          numero: "84 123 4567",
          nome: "MonografiaPlus",
          whatsapp: "+258 84 123 4567",
        },
        tempoConfirmacao: "5-15 minutos",
        observacoes: "Pagamento mais rápido e seguro. Confirmação automática.",
      },
      transferencia: {
        titulo: "Transferência Bancária",
        instrucoes: [
          "1. Acesse seu internet banking ou vá à agência",
          "2. Faça transferência para os dados abaixo",
          "3. Use como referência: seu nome + número do pedido",
          "4. Envie comprovante via WhatsApp: +258 84 123 4567",
          "5. Aguarde confirmação em até 4 horas",
        ],
        dadosContato: {
          banco: "Banco Comercial e de Investimentos (BCI)",
          conta: "123456789",
          titular: "MonografiaPlus Lda",
          iban: "MZ59000000000000123456789",
          whatsapp: "+258 84 123 4567",
        },
        tempoConfirmacao: "2-4 horas",
        observacoes: "Ideal para valores altos. Envie sempre o comprovante.",
      },
      deposito: {
        titulo: "Depósito Bancário",
        instrucoes: [
          "1. Vá a qualquer agência do BCI",
          "2. Faça depósito na conta abaixo",
          "3. Guarde o comprovante de depósito",
          "4. Envie foto do comprovante via WhatsApp: +258 84 123 4567",
          "5. Inclua seu nome e número do pedido na mensagem",
        ],
        dadosContato: {
          banco: "Banco Comercial e de Investimentos (BCI)",
          conta: "123456789",
          titular: "MonografiaPlus Lda",
          whatsapp: "+258 84 123 4567",
        },
        tempoConfirmacao: "2-6 horas",
        observacoes: "Disponível em todas as agências BCI. Guarde sempre o comprovante.",
      },
    }

    if (metodo && instrucoes[metodo as keyof typeof instrucoes]) {
      return NextResponse.json({
        success: true,
        data: instrucoes[metodo as keyof typeof instrucoes],
      })
    }

    return NextResponse.json({
      success: true,
      data: instrucoes,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao buscar instruções" }, { status: 500 })
  }
}
