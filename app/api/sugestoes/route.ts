import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { pais, instituicao, area, nivel, precisaEstudoCaso, nomeEmpresa, setorEmpresa } = await request.json()

    let prompt = `Gere 3 sugestões de temas para monografia acadêmica com as seguintes características:
    - País: ${pais}
    - Instituição: ${instituicao}
    - Área de estudo: ${area}
    - Nível acadêmico: ${nivel}`

    if (precisaEstudoCaso && nomeEmpresa) {
      prompt += `
    - Deve incluir estudo de caso da empresa: ${nomeEmpresa}
    - Setor da empresa: ${setorEmpresa}`
    }

    prompt += `
    
    Retorne apenas os 3 temas, um por linha, sem numeração ou formatação adicional.
    Os temas devem ser específicos, acadêmicos e adequados ao nível de ensino informado.`

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: prompt,
      maxTokens: 300,
    })

    const sugestoes = text
      .trim()
      .split("\n")
      .filter((linha) => linha.trim())

    return NextResponse.json({
      success: true,
      sugestoes: sugestoes.slice(0, 3),
    })
  } catch (error) {
    console.error("Erro ao gerar sugestões:", error)
    return NextResponse.json({ success: false, error: "Erro ao gerar sugestões" }, { status: 500 })
  }
}
