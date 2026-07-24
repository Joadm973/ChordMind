import { useState } from 'react'
import SearchBar from './components/SearchBar'
import SongStructure from './components/SongStructure'
import PianoKeyboard from './components/PianoKeyboard'
import Quiz from './components/Quiz'
import Learn from './components/learn/Learn'
import Logo from './components/Logo'
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
  const [activeTab, setActiveTab] = useState('analyze')

  const handleSelectChord = (chord) => {
    setSelectedChord((prev) => (prev === chord ? null : chord))
  }

  const activeChordDetail = findChordDetail(result?.chords_detail, selectedChord)

  return (
    <div className="min-h-screen bg-slate-950 bg-radial-glow text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 py-5 space-y-4">
          <div className="flex items-center justify-center gap-2.5">
            <Logo size={30} />
            <h1 className="font-display text-xl font-bold tracking-tight text-white">
              Chord<span className="text-indigo-400">Mind</span>
            </h1>
          </div>

          <div className="flex justify-center">
            <div className="relative flex bg-slate-900/70 border border-white/5 rounded-full p-1">
              <span
                aria-hidden="true"
                className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-950/50 transition-transform duration-300 ease-out ${
                  activeTab === 'learn' ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'
                }`}
              />
              <button
                onClick={() => setActiveTab('analyze')}
                className={`relative z-10 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeTab === 'analyze' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Analyser
              </button>
              <button
                onClick={() => setActiveTab('learn')}
                className={`relative z-10 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeTab === 'learn' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Apprendre
              </button>
            </div>
          </div>

          {activeTab === 'analyze' && <SearchBar onSearch={search} loading={loading} />}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {activeTab === 'learn' && <Learn />}

        {activeTab === 'analyze' && (
          <>
            {/* Loading */}
            {loading && (
              <div className="flex flex-col items-center gap-3 py-16">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-400 text-sm">Analyse en cours…</p>
              </div>
            )}

            {/* Error */}
            {error && !loading && (
              <div className="bg-red-950/40 border border-red-800/50 rounded-2xl p-4 text-red-300 text-sm shadow-lg shadow-black/20">
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
                  <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 shadow-lg shadow-black/10 backdrop-blur-sm">
                    <PianoKeyboard activeChordDetail={activeChordDetail} />
                  </div>
                </section>

                {/* Quiz */}
                {result.quiz?.length > 0 && <Quiz questions={result.quiz} />}
              </>
            )}

            {/* Empty state */}
            {!result && !loading && !error && (
              <div className="text-center py-20 space-y-4">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-center shadow-lg shadow-black/10">
                  <Logo size={30} />
                </div>
                <div className="space-y-1.5">
                  <p className="text-lg font-medium text-slate-300 font-display">
                    Entrez un titre de morceau pour analyser ses accords
                  </p>
                  <p className="text-sm text-slate-500">
                    Ex : Für Elise, Let It Be, Bohemian Rhapsody…
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
