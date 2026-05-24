import { useState } from 'react'
import SearchBar from './components/SearchBar'
import SongStructure from './components/SongStructure'
import PianoKeyboard from './components/PianoKeyboard'
import Quiz from './components/Quiz'
import { useSongAnalysis } from './hooks/useSongAnalysis'

/**
 * Find chord detail with graceful fallback:
 * 1. Exact key match
 * 2. Case-insensitive match
 * 3. The chord name is contained in a key (e.g. "Am" matches "Am7")
 * 4. A key is contained in the chord name
 */
function findChordDetail(chordsDetail, chordName) {
  if (!chordsDetail || !chordName) return null
  if (chordsDetail[chordName]) return chordsDetail[chordName]
  const keys = Object.keys(chordsDetail)
  const lower = chordName.toLowerCase()
  // Case-insensitive exact
  const exact = keys.find(k => k.toLowerCase() === lower)
  if (exact) return chordsDetail[exact]
  // Chord name starts with key (e.g. "Am" in "Am7")
  const startsWith = keys.find(k => lower.startsWith(k.toLowerCase()))
  if (startsWith) return chordsDetail[startsWith]
  // Key starts with chord name
  const keyStarts = keys.find(k => k.toLowerCase().startsWith(lower))
  if (keyStarts) return chordsDetail[keyStarts]
  return null
}

export default function App() {
  const { result, loading, error, search } = useSongAnalysis()
  const [selectedChord, setSelectedChord] = useState(null)

  const handleSelectChord = (chord) => {
    setSelectedChord((prev) => (prev === chord ? null : chord))
  }

  const activeChordDetail = findChordDetail(result?.chords_detail, selectedChord)

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 py-5 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-center text-2xl font-extrabold tracking-tight text-indigo-400 mb-4">
            🎹 ChordMind
          </h1>
          <SearchBar onSearch={search} loading={loading} />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center gap-3 py-16">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 text-sm">Analyse en cours…</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="bg-red-900/30 border border-red-700 rounded-xl p-4 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <>
            <SongStructure
              result={result}
              selectedChord={selectedChord}
              onSelectChord={handleSelectChord}
              chordsDetail={result.chords_detail}
            />

            {/* Piano */}
            <section className="space-y-2">
              <h3 className="text-slate-300 font-semibold">
                {selectedChord
                  ? `Accord ${selectedChord} sur le clavier`
                  : 'Clavier — cliquez un accord pour le visualiser'}
              </h3>
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                <PianoKeyboard activeChordDetail={activeChordDetail} />
              </div>
            </section>

            {/* Quiz */}
            {result.quiz?.length > 0 && <Quiz questions={result.quiz} />}
          </>
        )}

        {/* Empty state */}
        {!result && !loading && !error && (
          <div className="text-center py-20 text-slate-600 space-y-2">
            <p className="text-5xl">🎵</p>
            <p className="text-lg font-medium text-slate-500">
              Entrez un titre de morceau pour analyser ses accords
            </p>
            <p className="text-sm text-slate-600">
              Ex : Für Elise, Let It Be, Bohemian Rhapsody…
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
