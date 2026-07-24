import { useState } from 'react'
import { PYRAMID } from '../../data/pyramid'
import { useLearningProgress } from '../../hooks/useLearningProgress'
import LearnHome from './LearnHome'
import LevelView from './LevelView'
import LessonView from './LessonView'

const ALL_LESSONS = PYRAMID.flatMap((level) =>
  level.lessons.map((lesson) => ({ ...lesson, levelId: level.id }))
)

export default function Learn() {
  const { isLessonCompleted, isLessonUnlocked, isLevelUnlocked, completeLesson } =
    useLearningProgress()
  const [view, setView] = useState({ screen: 'home' })

  const getLevelProgress = (levelId) => {
    const level = PYRAMID.find((l) => l.id === levelId)
    const completed = level.lessons.filter((lesson) => isLessonCompleted(lesson.id)).length
    return { completed, total: level.lessons.length }
  }

  if (view.screen === 'lesson') {
    const lesson = ALL_LESSONS.find((l) => l.id === view.lessonId)
    const levelLessons = PYRAMID.find((l) => l.id === lesson.levelId).lessons
    const lessonIndex = levelLessons.findIndex((l) => l.id === lesson.id)
    const nextLesson = levelLessons[lessonIndex + 1]

    return (
      <LessonView
        lesson={lesson}
        alreadyCompleted={isLessonCompleted(lesson.id)}
        onBack={() => setView({ screen: 'level', levelId: lesson.levelId })}
        onLessonPassed={completeLesson}
        hasNextLesson={Boolean(nextLesson)}
        onNextLesson={() => nextLesson && setView({ screen: 'lesson', lessonId: nextLesson.id })}
      />
    )
  }

  if (view.screen === 'level') {
    const level = PYRAMID.find((l) => l.id === view.levelId)
    return (
      <LevelView
        level={level}
        isLessonUnlocked={isLessonUnlocked}
        isLessonCompleted={isLessonCompleted}
        onSelectLesson={(lessonId) => setView({ screen: 'lesson', lessonId })}
        onBack={() => setView({ screen: 'home' })}
      />
    )
  }

  return (
    <LearnHome
      levels={PYRAMID}
      isLevelUnlocked={isLevelUnlocked}
      getLevelProgress={getLevelProgress}
      onSelectLevel={(levelId) => setView({ screen: 'level', levelId })}
    />
  )
}
