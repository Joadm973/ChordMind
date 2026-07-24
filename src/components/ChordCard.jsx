export default function ChordCard({ name, detail, active, onClick }) {
  return (
    <button
      onClick={() => onClick(name)}
      className={`text-left p-3 rounded-xl border shadow-lg shadow-black/10 transition-all active:scale-[0.98] ${
        active
          ? 'border-indigo-500/60 bg-indigo-950/40'
          : 'border-white/5 bg-slate-900/50 hover:border-white/15'
      }`}
    >
      <div className="font-bold text-white text-base">{name}</div>
      <div className="text-xs text-indigo-300 mt-0.5">{detail.notes.join(' – ')}</div>
      <div className="text-xs text-slate-400 mt-1">{detail.role}</div>
    </button>
  )
}
