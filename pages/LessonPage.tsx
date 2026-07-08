import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2, Lock, PlayCircle, FileText, BookOpen,
  ChevronLeft, ChevronRight, Download, ArrowLeft, Award
} from 'lucide-react';
import { getLesson, getAllLessons, type Lesson } from '../data/lms/courses';
import { useProgress } from '../hooks/useProgress';

const typeIcon = (type: Lesson['type']) => {
  if (type === 'video') return <PlayCircle size={14} className="shrink-0" />;
  if (type === 'pdf') return <FileText size={14} className="shrink-0" />;
  return <BookOpen size={14} className="shrink-0" />;
};

export const LessonPage: React.FC = () => {
  const { courseId = 'the-glitch', lessonId = '' } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const result = getLesson(courseId, lessonId);
  const allLessons = getAllLessons(courseId);
  const { isCompleted, markComplete, progressPct } = useProgress(courseId);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [downloading, setDownloading] = useState(false);

  if (!result) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
        <p className="font-mono text-white/40">레슨을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const { course, chapter, lesson, index, total } = result;
  const prevLesson = index > 0 ? allLessons[index - 1] : null;
  const nextLesson = index < total - 1 ? allLessons[index + 1] : null;
  const done = isCompleted(lesson.id);
  const pct = progressPct(total);

  const handleMarkComplete = () => {
    markComplete(lesson.id);
    if (nextLesson && !nextLesson.lesson.locked) {
      setTimeout(() => navigate(`/courses/${courseId}/lessons/${nextLesson.lesson.id}`), 400);
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      markComplete(lesson.id);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans flex flex-col selection:bg-cyan-500/30">
      <div className="fixed inset-0 grid-pattern opacity-10 pointer-events-none z-0" />

      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-black/70 backdrop-blur-xl border-b border-white/5 px-4 py-3 flex items-center gap-3">
        <Link
          to={`/courses/${courseId}`}
          className="flex items-center gap-1.5 text-white/40 hover:text-white transition-colors shrink-0"
        >
          <ArrowLeft size={16} />
          <span className="text-xs font-mono tracking-widest uppercase hidden sm:block">{course.title}</span>
        </Link>

        <span className="text-white/10 hidden sm:block">|</span>
        <span className="text-xs font-mono text-white/50 truncate">{lesson.title}</span>

        {/* Progress bar */}
        <div className="ml-auto flex items-center gap-3 shrink-0">
          <span className="text-[10px] font-mono text-white/30">{pct}%</span>
          <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white/30 hover:text-white transition-colors ml-2"
          >
            <BookOpen size={16} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-72' : 'w-0'
          } transition-all duration-300 overflow-hidden shrink-0 bg-black/40 border-r border-white/5 flex flex-col`}
        >
          <div className="p-4 border-b border-white/5">
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em]">커리큘럼</p>
          </div>
          <div className="overflow-y-auto flex-1 no-scrollbar">
            {course.chapters.map((ch) => (
              <div key={ch.id}>
                <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/5">
                  <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                    Ch.{String(ch.number).padStart(2, '0')}
                  </p>
                  <p className="text-xs text-white/60 font-medium mt-0.5 truncate">
                    {ch.title.replace(/^Chapter \d+\. /, '')}
                  </p>
                </div>
                {ch.lessons.map((l) => {
                  const isActive = l.id === lessonId;
                  const isLocked = l.locked;
                  const isDone = isCompleted(l.id);

                  return (
                    <button
                      key={l.id}
                      disabled={isLocked}
                      onClick={() => !isLocked && navigate(`/courses/${courseId}/lessons/${l.id}`)}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors border-b border-white/[0.03] ${
                        isActive
                          ? 'bg-cyan-500/10 border-l-2 border-l-cyan-500'
                          : isLocked
                          ? 'opacity-40 cursor-not-allowed'
                          : 'hover:bg-white/[0.03] cursor-pointer'
                      }`}
                    >
                      <span className={isDone ? 'text-cyan-400' : isLocked ? 'text-white/20' : 'text-white/30'}>
                        {isDone ? (
                          <CheckCircle2 size={13} />
                        ) : isLocked ? (
                          <Lock size={12} />
                        ) : (
                          typeIcon(l.type)
                        )}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs truncate ${isActive ? 'text-cyan-300 font-semibold' : isDone ? 'text-white/60' : 'text-white/50'}`}>
                          {l.title}
                        </p>
                        <p className="text-[10px] text-white/20 font-mono">{l.duration}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto no-scrollbar">
          <div className="max-w-3xl mx-auto px-6 py-8">
            {/* Chapter badge */}
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] mb-3">
              {chapter.title}
            </p>

            <h1 className="font-serif text-3xl font-black mb-1">{lesson.title}</h1>
            <p className="text-white/40 text-sm mb-8">{lesson.subtitle}</p>

            {/* Content area */}
            <div className="bg-black/40 border border-white/5 rounded-sm overflow-hidden mb-6">
              {lesson.type === 'video' && (
                <div className="aspect-video bg-black relative flex items-center justify-center group cursor-pointer">
                  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
                  <PlayCircle
                    size={72}
                    className="text-violet-500/30 group-hover:text-violet-500/60 transition-all duration-300 group-hover:scale-110"
                  />
                  <span className="absolute bottom-4 right-4 text-xs font-mono text-white/20">{lesson.duration}</span>
                </div>
              )}

              {lesson.type === 'pdf' && (
                <div className="p-12 flex flex-col items-center gap-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-sm border border-white/10 flex items-center justify-center">
                    <FileText size={36} className="text-violet-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">{lesson.title}</p>
                    <p className="text-white/40 text-sm mt-1">{lesson.duration}</p>
                  </div>
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="flex items-center gap-3 px-8 py-3.5 border border-violet-500/30 text-violet-400 font-bold text-sm tracking-widest uppercase rounded-sm hover:bg-violet-500/10 transition-colors disabled:opacity-50"
                  >
                    {downloading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
                        Decrypting...
                      </>
                    ) : (
                      <>
                        <Download size={16} />
                        Download Asset
                      </>
                    )}
                  </button>
                </div>
              )}

              {lesson.type === 'text' && (
                <div className="p-8">
                  <p className="text-white/70 font-serif text-base leading-[1.9] whitespace-pre-wrap">
                    {lesson.content}
                  </p>
                </div>
              )}
            </div>

            {/* Description for video */}
            {lesson.type === 'video' && lesson.content && (
              <div className="bg-white/[0.02] border border-white/5 rounded-sm p-6 mb-6">
                <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">레슨 개요</p>
                <p className="text-white/60 font-serif text-sm leading-relaxed">{lesson.content}</p>
              </div>
            )}

            {/* Complete / Next */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5">
              {/* Prev */}
              <button
                onClick={() => prevLesson && navigate(`/courses/${courseId}/lessons/${prevLesson.lesson.id}`)}
                disabled={!prevLesson}
                className="flex items-center gap-2 text-sm text-white/30 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
                이전
              </button>

              {/* Mark complete */}
              {!done && !lesson.locked ? (
                <button
                  onClick={handleMarkComplete}
                  className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-sm tracking-widest uppercase rounded-sm hover:bg-cyan-500/20 transition-colors"
                >
                  <CheckCircle2 size={16} />
                  완료 & 다음
                </button>
              ) : done ? (
                pct === 100 ? (
                  <Link
                    to={`/certificate/${courseId}`}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#BF953F] to-[#FCF6BA] text-black font-black text-sm tracking-widest uppercase rounded-sm hover:brightness-110 transition-all"
                  >
                    <Award size={16} />
                    수료증 발급
                  </Link>
                ) : (
                  <span className="flex items-center gap-2 text-sm text-cyan-400/60">
                    <CheckCircle2 size={16} />
                    완료됨
                  </span>
                )
              ) : null}

              {/* Next */}
              <button
                onClick={() => nextLesson && !nextLesson.lesson.locked && navigate(`/courses/${courseId}/lessons/${nextLesson.lesson.id}`)}
                disabled={!nextLesson || nextLesson.lesson.locked}
                className="flex items-center gap-2 text-sm text-white/30 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              >
                다음
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
