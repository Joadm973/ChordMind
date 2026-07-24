import ChordCard from './ChordCard'

export default function SongStructure({ result, selectedChord, onSelectChord, chordsDetail }) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-white tracking-tight">{result.title}</h2>
        <p className="text-slate-400 text-sm mt-1">
          {result.artist} · Tonalité : <span className="text-indigo-400 font-semibold">{result.key}</span>
        </p>
      </div>

      <div className="space-y-4">
        {result.structure.map((section, i) => (
          <div
            key={i}
            className="bg-slate-900/50 rounded-2xl p-4 border border-white/5 shadow-lg shadow-black/10 backdrop-blur-sm hover:border-white/10 transition-colors"
          >
            <h3 className="text-indigo-300 font-semibold text-sm uppercase tracking-wide mb-2">
              {section.section}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {section.progression.map((chord, j) => (
                <button
                  key={j}
                  onClick={() => onSelectChord(chord)}
                  className={`px-3 py-1 rounded-lg text-sm font-mono font-bold transition-all active:scale-95 ${
                    selectedChord === chord
                      ? 'bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-md shadow-indigo-950/50'
                      : 'bg-slate-800/80 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {chord}
                </button>
              ))}
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">{section.explanation}</p>
          </div>
        ))}
      </div>

      {chordsDetail && Object.keys(chordsDetail).length > 0 && (
        <div>
          <h3 className="text-slate-300 font-semibold mb-3">Détail des accords</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(chordsDetail).map(([name, detail]) => (
              <ChordCard
                key={name}
                name={name}
                detail={detail}
                active={selectedChord === name}
                onClick={onSelectChord}
              />
            ))}
          </div>
          {selectedChord && chordsDetail[selectedChord] && (
            <div className="mt-4 p-4 bg-indigo-950/40 border border-indigo-800/40 rounded-2xl shadow-lg shadow-black/10">
              <p className="text-indigo-200 text-sm leading-relaxed">
                <span className="font-bold text-white">{selectedChord} :</span>{' '}
                {chordsDetail[selectedChord].explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
