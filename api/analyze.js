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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' })
    return
  }

  const { title } = req.body ?? {}
  if (!title || typeof title !== 'string') {
    res.status(400).json({ error: 'missing_title' })
    return
  }

  const apiKey = process.env.CLAUDE_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: 'server_misconfigured' })
    return
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
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
    res.status(response.status).json({ error: err.error?.message || `HTTP ${response.status}` })
    return
  }

  const data = await response.json()
  res.status(200).json(data)
}
