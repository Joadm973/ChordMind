import ChordCard from './ChordCard'

export default function SongStructure({ result, selectedChord, onSelectChord, chordsDetail }) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">{result.title}</h2>
        <p className="text-slate-400 text-sm mt-1">
          {result.artist} · Tonalité : <span className="text-indigo-400 font-semibold">{result.key}</span>
        </p>
      </div>

      <div className="space-y-4">
        {result.structure.map((section, i) => (
          <div key={i} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <h3 className="text-indigo-300 font-semibold text-sm uppercase tracking-wide mb-2">
              {section.section}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {section.progression.map((chord, j) => (
                <button
                  key={j}
                  onClick={() => onSelectChord(chord)}
                  className={`px-3 py-1 rounded-lg text-sm font-mono font-bold transition-all ${
                    selectedChord === chord
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
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
            <div className="mt-4 p-4 bg-indigo-900/30 border border-indigo-700 rounded-xl">
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
