export default function ChordCard({ name, detail, active, onClick }) {
  return (
    <button
      onClick={() => onClick(name)}
      className={`text-left p-3 rounded-xl border transition-all ${
        active
          ? 'border-indigo-500 bg-indigo-900/40'
          : 'border-slate-700 bg-slate-800 hover:border-slate-500'
      }`}
    >
      <div className="font-bold text-white text-base">{name}</div>
      <div className="text-xs text-indigo-300 mt-0.5">{detail.notes.join(' – ')}</div>
      <div className="text-xs text-slate-400 mt-1">{detail.role}</div>
    </button>
  )
}
