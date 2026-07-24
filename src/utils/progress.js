const KEY = 'chordmind:progress'

export function getProgress() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : { completedLessons: [] }
  } catch {
    return { completedLessons: [] }
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(progress))
  } catch {
    // storage quota exceeded — fail silently
  }
}
