import { useState, useCallback } from 'react'
import { analyzeSong } from '../services/claudeApi'
import { getFromCache, saveToCache } from '../utils/cache'

export function useSongAnalysis() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = useCallback(async (title) => {
    if (!title.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    const cached = getFromCache(title)
    if (cached) {
      setResult(cached)
      setLoading(false)
      return
    }

    try {
      const data = await analyzeSong(title)
      if (data.error === 'unknown_song') {
        setError('Morceau inconnu. Essayez un autre titre.')
      } else {
        saveToCache(title, data)
        setResult(data)
      }
    } catch (e) {
      setError(e.message || 'Erreur lors de l\'analyse.')
    } finally {
      setLoading(false)
    }
  }, [])

  return { result, loading, error, search }
}
