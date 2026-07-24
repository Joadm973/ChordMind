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
        <h2 className="text-2xl font-bold text-white">{lesson.title}</h2>
        <p className="text-slate-300 mt-2 leading-relaxed">{lesson.explanation}</p>
        {lesson.diffFromPrevious && (
          <span className="inline-block mt-3 text-xs font-semibold text-amber-400 bg-amber-900/20 border border-amber-800 rounded-full px-3 py-1">
            🔄 Un seul changement par rapport à la leçon précédente
          </span>
        )}
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
        <PianoKeyboard
          activeChordDetail={{ notes: lesson.keyboardHighlight.notes }}
          changedNote={lesson.keyboardHighlight.changedNote}
        />
      </div>

      <Quiz questions={lesson.quiz} onComplete={handleQuizComplete} />

      {passed && (
        <div className="bg-green-900/30 border border-green-700 rounded-xl p-4 flex items-center justify-between">
          <span className="text-green-300 text-sm font-medium">✓ Leçon validée</span>
          {hasNextLesson && (
            <button
              onClick={onNextLesson}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              Leçon suivante →
            </button>
          )}
        </div>
      )}
    </div>
  )
}
