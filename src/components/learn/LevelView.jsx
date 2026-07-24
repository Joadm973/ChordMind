export default function LevelView({ level, isLessonUnlocked, isLessonCompleted, onSelectLesson, onBack }) {
  return (
    <div className="space-y-4">
      <button onClick={onBack} className="text-indigo-400 text-sm hover:text-indigo-300">
        ← Retour
      </button>

      <h2 className="text-2xl font-bold text-white">{level.title}</h2>

      <div className="space-y-2">
        {level.lessons.map((lesson) => {
          const unlocked = isLessonUnlocked(lesson.id)
          const completed = isLessonCompleted(lesson.id)
          return (
            <button
              key={lesson.id}
              disabled={!unlocked}
              onClick={() => onSelectLesson(lesson.id)}
              className={`w-full text-left p-4 rounded-xl border flex items-center justify-between transition-all ${
                unlocked
                  ? 'border-slate-700 bg-slate-800 hover:border-indigo-500'
                  : 'border-slate-800 bg-slate-800/40 opacity-50 cursor-not-allowed'
              }`}
            >
              <span className="font-medium text-white">{lesson.title}</span>
              <span className="text-lg">{completed ? '✅' : unlocked ? '▶' : '🔒'}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
