import { useState, useEffect } from 'react'

export default function Quiz({ questions, onComplete }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) onComplete?.(score, questions.length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done])

  if (!questions || questions.length === 0) return null

  const q = questions[current]

  const handleChoice = (choice) => {
    if (selected !== null) return
    setSelected(choice)
    if (choice === q.answer) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setDone(true)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
    }
  }

  const handleReset = () => {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setDone(false)
  }

  if (done) {
    return (
      <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 text-center shadow-lg shadow-black/10 backdrop-blur-sm">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-slate-800/80 border border-white/5 flex items-center justify-center mb-3">
          <span className="text-2xl">{score === questions.length ? '🎉' : '🎹'}</span>
        </div>
        <p className="text-white text-lg font-display font-bold">
          Score : {score} / {questions.length}
        </p>
        <p className="text-slate-400 text-sm mt-1">
          {score === questions.length ? 'Parfait !' : score >= questions.length / 2 ? 'Bien joué !' : 'Continue à pratiquer !'}
        </p>
        <button
          onClick={handleReset}
          className="mt-4 px-4 py-2 bg-gradient-to-br from-indigo-500 to-indigo-700 hover:from-indigo-400 hover:to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-950/50 transition-all active:scale-[0.97]"
        >
          Recommencer
        </button>
      </div>
    )
  }

  return (
    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 space-y-4 shadow-lg shadow-black/10 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-slate-300 font-semibold text-sm uppercase tracking-wide">Quiz</h3>
        <span className="text-slate-500 text-xs">{current + 1} / {questions.length}</span>
      </div>

      <p className="text-white font-medium">{q.question}</p>

      <div className="grid gap-2">
        {q.choices.map((choice, i) => {
          let cls = 'w-full text-left px-4 py-2 rounded-xl text-sm border transition-all active:scale-[0.98] '
          if (selected === null) {
            cls += 'border-white/10 bg-slate-800/60 hover:bg-slate-800 hover:border-white/20 text-white'
          } else if (choice === q.answer) {
            cls += 'border-green-500/60 bg-green-950/40 text-green-300'
          } else if (choice === selected) {
            cls += 'border-red-500/60 bg-red-950/40 text-red-300'
          } else {
            cls += 'border-white/5 bg-slate-900/40 text-slate-500'
          }
          return (
            <button key={i} className={cls} onClick={() => handleChoice(choice)}>
              {choice}
            </button>
          )
        })}
      </div>

      {selected !== null && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400">
            {selected === q.answer ? '✓ Correct !' : `✗ La réponse était : ${q.answer}`}
          </p>
          <button
            onClick={handleNext}
            className="px-4 py-1.5 bg-gradient-to-br from-indigo-500 to-indigo-700 hover:from-indigo-400 hover:to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-950/50 transition-all active:scale-[0.97]"
          >
            {current + 1 < questions.length ? 'Suivant' : 'Résultat'}
          </button>
        </div>
      )}
    </div>
  )
}
