const SYSTEM_PROMPT = `Tu es un assistant pédagogique musical pour pianiste débutant. Quand on te donne un titre de morceau, tu retournes UNIQUEMENT un JSON valide, sans markdown, sans texte autour, respectant exactement ce schéma :
{
  "title": "string",
  "artist": "string",
  "key": "string",
  "structure": [
    {
      "section": "string",
      "progression": ["string"],
      "explanation": "string"
    }
  ],
  "chords_detail": {
    "chordName": {
      "notes": ["string"],
      "role": "string",
      "explanation": "string"
    }
  },
  "quiz": [
    {
      "question": "string",
      "answer": "string",
      "choices": ["string"]
    }
  ]
}
Si le morceau est inconnu retourne { "error": "unknown_song" }.
Les explications doivent être simples, sans jargon, en français.`

export async function analyzeSong(title) {
  const apiKey = import.meta.env.VITE_CLAUDE_API_KEY
  if (!apiKey) throw new Error('VITE_CLAUDE_API_KEY manquante')

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: `Analyse le morceau : "${title}"` }]
    })
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error?.message || `HTTP ${response.status}`)
  }

  const data = await response.json()
  const text = data.content?.[0]?.text ?? ''

  try {
    return JSON.parse(text)
  } catch {
    throw new Error('Réponse Claude non parseable')
  }
}
