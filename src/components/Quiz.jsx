import { useState } from 'react'

export default function Quiz({ questions }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

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
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center">
        <div className="text-4xl mb-2">🎹</div>
        <p className="text-white text-lg font-bold">
          Score : {score} / {questions.length}
        </p>
        <p className="text-slate-400 text-sm mt-1">
          {score === questions.length ? 'Parfait !' : score >= questions.length / 2 ? 'Bien joué !' : 'Continue à pratiquer !'}
        </p>
        <button
          onClick={handleReset}
          className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-colors"
        >
          Recommencer
        </button>
      </div>
    )
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-slate-300 font-semibold text-sm uppercase tracking-wide">Quiz</h3>
        <span className="text-slate-500 text-xs">{current + 1} / {questions.length}</span>
      </div>

      <p className="text-white font-medium">{q.question}</p>

      <div className="grid gap-2">
        {q.choices.map((choice, i) => {
          let cls = 'w-full text-left px-4 py-2 rounded-lg text-sm border transition-all '
          if (selected === null) {
            cls += 'border-slate-600 bg-slate-700 hover:bg-slate-600 text-white'
          } else if (choice === q.answer) {
            cls += 'border-green-500 bg-green-900/40 text-green-300'
          } else if (choice === selected) {
            cls += 'border-red-500 bg-red-900/40 text-red-300'
          } else {
            cls += 'border-slate-700 bg-slate-800 text-slate-500'
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
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            {current + 1 < questions.length ? 'Suivant' : 'Résultat'}
          </button>
        </div>
      )}
    </div>
  )
}
