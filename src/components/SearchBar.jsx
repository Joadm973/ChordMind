import { useState } from 'react'

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(value)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-xl mx-auto">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Titre du morceau (ex: Für Elise, Let It Be…)"
        className="flex-1 rounded-xl px-4 py-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !value.trim()}
        className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
      >
        {loading ? '…' : 'Analyser'}
      </button>
    </form>
  )
}
