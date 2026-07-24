const WIDTH_BY_ORDER = {
  0: 'w-full',
  1: 'w-4/5',
  2: 'w-3/5'
}

export default function LearnHome({ levels, isLevelUnlocked, getLevelProgress, onSelectLevel }) {
  const topToBottom = [...levels].sort((a, b) => b.order - a.order)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-white mb-1 tracking-tight">
          Apprendre la théorie des accords
        </h2>
        <p className="text-slate-400 text-sm">
          Progresse niveau par niveau, de la base vers les accords complexes.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3">
        {topToBottom.map((level) => {
          const unlocked = isLevelUnlocked(level.id)
          const { completed, total } = getLevelProgress(level.id)
          return (
            <button
              key={level.id}
              disabled={!unlocked}
              onClick={() => onSelectLevel(level.id)}
              className={`${WIDTH_BY_ORDER[level.order]} rounded-2xl border p-4 text-left transition-all active:scale-[0.99] ${
                unlocked
                  ? 'border-indigo-500/40 bg-gradient-to-br from-indigo-950/60 to-indigo-900/20 hover:border-indigo-400/60 shadow-lg shadow-indigo-950/30'
                  : 'border-white/5 bg-slate-900/40 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-white">{level.title}</span>
                <span className="text-xs text-slate-400">
                  {unlocked ? `${completed}/${total}` : '🔒'}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
