// Utilitário para consumir Gemini AI e sugerir temas
export async function sugerirTemasGemini(prompt: string): Promise<string[]> {
  const apiKey = "AIzaSyCvc4heD0acc-al2fwMB-EDuk_0s0WZT9s"
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey

  const body = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
  if (!res.ok) throw new Error("Erro ao consultar Gemini AI")
  const data = await res.json()
  // Extrai sugestões do texto retornado
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ""
  // Divide sugestões por linha ou bullet
  return text.split(/\n|\r|\u2022|\-/).map(s => s.trim()).filter(Boolean)
}
