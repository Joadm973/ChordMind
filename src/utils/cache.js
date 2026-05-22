const normalizeKey = (title) => title.trim().toLowerCase()

export function getFromCache(title) {
  try {
    const raw = localStorage.getItem(`chordmind:${normalizeKey(title)}`)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveToCache(title, data) {
  try {
    localStorage.setItem(`chordmind:${normalizeKey(title)}`, JSON.stringify(data))
  } catch {
    // storage quota exceeded — fail silently
  }
}
