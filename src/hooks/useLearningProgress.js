import { useState, useEffect, useCallback } from 'react'
import { PYRAMID } from '../data/pyramid'
import { getProgress, saveProgress } from '../utils/progress'

const ALL_LESSONS = PYRAMID.flatMap((level) => level.lessons)

export function useLearningProgress() {
  const [completedLessons, setCompletedLessons] = useState(() => getProgress().completedLessons)

  useEffect(() => {
    saveProgress({ completedLessons })
  }, [completedLessons])

  const isLessonCompleted = useCallback(
    (lessonId) => completedLessons.includes(lessonId),
    [completedLessons]
  )

  const isLessonUnlocked = useCallback(
    (lessonId) => {
      const index = ALL_LESSONS.findIndex((lesson) => lesson.id === lessonId)
      if (index <= 0) return true
      const previous = ALL_LESSONS[index - 1]
      return completedLessons.includes(previous.id)
    },
    [completedLessons]
  )

  const isLevelUnlocked = useCallback(
    (levelId) => {
      const levelIndex = PYRAMID.findIndex((level) => level.id === levelId)
      if (levelIndex <= 0) return true
      const previousLevel = PYRAMID[levelIndex - 1]
      return previousLevel.lessons.every((lesson) => completedLessons.includes(lesson.id))
    },
    [completedLessons]
  )

  const completeLesson = useCallback((lessonId) => {
    setCompletedLessons((prev) => (prev.includes(lessonId) ? prev : [...prev, lessonId]))
  }, [])

  return { isLessonCompleted, isLessonUnlocked, isLevelUnlocked, completeLesson }
}
