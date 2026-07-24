import { useState } from 'react'
import PianoKeyboard from '../PianoKeyboard'
import Quiz from '../Quiz'

export default function LessonView({
  lesson,
  alreadyCompleted,
  onBack,
  onLessonPassed,
  onNextLesson,
  hasNextLesson
}) {
  const [passed, setPassed] = useState(alreadyCompleted)

  const handleQuizComplete = (score, total) => {
    if (score === total) {
      setPassed(true)
      onLessonPassed(lesson.id)
    }
  }

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-indigo-400 text-sm hover:text-indigo-300">
        ← Retour au niveau
      </button>

      <div>
        <h2 className="text-2xl font-display font-bold text-white tracking-tight">{lesson.title}</h2>
        <p className="text-slate-300 mt-2 leading-relaxed">{lesson.explanation}</p>
        {lesson.diffFromPrevious && (
          <span className="inline-block mt-3 text-xs font-semibold text-amber-400 bg-amber-950/30 border border-amber-800/40 rounded-full px-3 py-1">
            🔄 Un seul changement par rapport à la leçon précédente
          </span>
        )}
      </div>

      <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 shadow-lg shadow-black/10 backdrop-blur-sm">
        <PianoKeyboard
          activeChordDetail={{ notes: lesson.keyboardHighlight.notes }}
          changedNote={lesson.keyboardHighlight.changedNote}
        />
      </div>

      <Quiz questions={lesson.quiz} onComplete={handleQuizComplete} />

      {passed && (
        <div className="bg-green-950/30 border border-green-800/40 rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-black/10">
          <span className="text-green-300 text-sm font-medium">✓ Leçon validée</span>
          {hasNextLesson && (
            <button
              onClick={onNextLesson}
              className="px-4 py-2 bg-gradient-to-br from-indigo-500 to-indigo-700 hover:from-indigo-400 hover:to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-950/50 transition-all active:scale-[0.97]"
            >
              Leçon suivante →
            </button>
          )}
        </div>
      )}
    </div>
  )
}
