export async function analyzeSong(title) {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ title })
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error || `HTTP ${response.status}`)
  }

  const data = await response.json()
  const raw = data.content?.[0]?.text ?? ''

  // Strip markdown code fences if present (```json ... ``` or ``` ... ```)
  const text = raw
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim()

  // Extract first JSON object or array in case there's surrounding text
  const jsonMatch = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/)
  const jsonText = jsonMatch ? jsonMatch[0] : text

  try {
    return JSON.parse(jsonText)
  } catch {
    console.error('Raw Claude response:', raw)
    throw new Error('Réponse Claude non parseable')
  }
}
