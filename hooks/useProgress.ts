import { useState, useCallback } from 'react';

const storageKey = (courseId: string) => `escd:progress:${courseId}`;

export function useProgress(courseId: string) {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(storageKey(courseId));
      return raw ? new Set<string>(JSON.parse(raw)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const markComplete = useCallback(
    (lessonId: string) => {
      setCompleted((prev) => {
        const next = new Set(prev);
        next.add(lessonId);
        localStorage.setItem(storageKey(courseId), JSON.stringify([...next]));
        return next;
      });
    },
    [courseId]
  );

  const markIncomplete = useCallback(
    (lessonId: string) => {
      setCompleted((prev) => {
        const next = new Set(prev);
        next.delete(lessonId);
        localStorage.setItem(storageKey(courseId), JSON.stringify([...next]));
        return next;
      });
    },
    [courseId]
  );

  const isCompleted = useCallback((lessonId: string) => completed.has(lessonId), [completed]);

  const progressPct = (totalLessons: number) =>
    totalLessons === 0 ? 0 : Math.round((completed.size / totalLessons) * 100);

  return { completed, markComplete, markIncomplete, isCompleted, progressPct };
}
