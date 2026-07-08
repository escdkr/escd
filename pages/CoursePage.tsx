import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Lock, PlayCircle, FileText, BookOpen, ChevronRight, Award, Clock, BarChart2, ArrowLeft } from 'lucide-react';
import { getCourse, getAllLessons, type Chapter, type Lesson } from '../data/lms/courses';
import { useProgress } from '../hooks/useProgress';

const typeIcon = (type: Lesson['type']) => {
  if (type === 'video') return <PlayCircle size={14} className="shrink-0" />;
  if (type === 'pdf') return <FileText size={14} className="shrink-0" />;
  return <BookOpen size={14} className="shrink-0" />;
};

export const CoursePage: React.FC = () => {
  const { courseId = 'the-glitch' } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const course = getCourse(courseId);
  const allLessons = getAllLessons(courseId);
  const { isCompleted, progressPct } = useProgress(courseId);
  const [expandedChapter, setExpandedChapter] = useState<string | null>(course?.chapters[0]?.id ?? null);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
        <p className="font-mono text-white/40">강의를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const pct = progressPct(allLessons.length);
  const isFinished = pct === 100;

  const firstUnlocked = allLessons.find((x) => !x.lesson.locked && !isCompleted(x.lesson.id));
  const continueLesson = firstUnlocked ?? allLessons[0];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-cyan-500/30">
      {/* Background */}
      <div className="fixed inset-0 grid-pattern opacity-10 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.04)_0%,transparent_55%)] pointer-events-none z-0" />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-black/60 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          <span className="font-mono tracking-widest uppercase text-xs">Dashboard</span>
        </button>
        <span className="text-white/10">|</span>
        <span className="text-xs font-mono text-white/50 tracking-widest uppercase">{course.title}</span>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {/* Course Hero */}
        <div className="grid md:grid-cols-3 gap-8 mb-14">
          <div className="md:col-span-2 space-y-5">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-sm">
              <span className="text-[10px] font-mono text-cyan-400 tracking-[0.4em] uppercase">{course.level}</span>
            </div>
            <h1 className="font-cinzel text-5xl font-black tracking-tight text-white">{course.title}</h1>
            <p className="text-brand-muted font-serif text-lg leading-relaxed">{course.subtitle}</p>
            <p className="text-white/50 text-sm leading-relaxed">{course.description}</p>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-sm text-white/40">
                <BookOpen size={14} />
                <span>{allLessons.length}개 레슨</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/40">
                <Clock size={14} />
                <span>{course.totalDuration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/40">
                <BarChart2 size={14} />
                <span>{course.chapters.length}개 챕터</span>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white/[0.02] border border-white/5 rounded-sm p-6 flex flex-col gap-5">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">전체 진도</span>
                <span className="text-2xl font-black font-mono text-cyan-400">{pct}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {isFinished ? (
              <Link
                to={`/certificate/${courseId}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#BF953F] text-black font-black text-sm tracking-widest uppercase rounded-sm hover:brightness-110 transition-all"
              >
                <Award size={16} />
                수료증 발급
              </Link>
            ) : (
              <button
                onClick={() => continueLesson && navigate(`/courses/${courseId}/lessons/${continueLesson.lesson.id}`)}
                className="w-full py-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-sm tracking-widest uppercase rounded-sm hover:bg-cyan-500/20 transition-colors flex items-center justify-center gap-2"
              >
                <PlayCircle size={16} />
                {pct === 0 ? '학습 시작' : '이어서 학습'}
              </button>
            )}

            <div className="border-t border-white/5 pt-4 space-y-2">
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest">완료한 레슨</p>
              <p className="text-2xl font-black text-white">
                {allLessons.filter((x) => isCompleted(x.lesson.id)).length}
                <span className="text-white/20 text-base font-normal"> / {allLessons.length}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Chapter List */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono text-white/30 uppercase tracking-[0.4em] mb-6">커리큘럼</h2>

          {course.chapters.map((ch: Chapter) => {
            const chLessons = ch.lessons;
            const chCompleted = chLessons.filter((l) => isCompleted(l.id)).length;
            const isExpanded = expandedChapter === ch.id;

            return (
              <div key={ch.id} className="border border-white/5 rounded-sm overflow-hidden">
                {/* Chapter Header */}
                <button
                  onClick={() => setExpandedChapter(isExpanded ? null : ch.id)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono text-white/20 tracking-widest w-8">{String(ch.number).padStart(2, '0')}</span>
                    <span className="font-serif font-bold text-white">{ch.title.replace(/^Chapter \d+\. /, '')}</span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-xs text-white/30 font-mono">{chCompleted}/{chLessons.length}</span>
                    <ChevronRight
                      size={16}
                      className={`text-white/20 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                    />
                  </div>
                </button>

                {/* Lessons */}
                {isExpanded && (
                  <div className="divide-y divide-white/[0.03]">
                    {chLessons.map((lesson: Lesson) => {
                      const done = isCompleted(lesson.id);
                      const locked = lesson.locked;

                      return (
                        <button
                          key={lesson.id}
                          disabled={locked}
                          onClick={() => !locked && navigate(`/courses/${courseId}/lessons/${lesson.id}`)}
                          className={`w-full flex items-center gap-4 px-5 py-3.5 transition-colors text-left ${
                            locked
                              ? 'opacity-40 cursor-not-allowed'
                              : 'hover:bg-white/[0.03] cursor-pointer'
                          }`}
                        >
                          {/* Status icon */}
                          <div className="w-6 shrink-0 flex justify-center">
                            {done ? (
                              <CheckCircle2 size={16} className="text-cyan-400" />
                            ) : locked ? (
                              <Lock size={14} className="text-white/20" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-white/20" />
                            )}
                          </div>

                          {/* Type icon */}
                          <span className={`${done ? 'text-cyan-400' : 'text-white/30'}`}>
                            {typeIcon(lesson.type)}
                          </span>

                          {/* Title */}
                          <div className="flex-grow min-w-0">
                            <p className={`text-sm font-medium truncate ${done ? 'text-white' : locked ? 'text-white/30' : 'text-white/80'}`}>
                              {lesson.title}
                            </p>
                            <p className="text-xs text-white/30 truncate">{lesson.subtitle}</p>
                          </div>

                          {/* Duration */}
                          <span className="text-xs text-white/20 font-mono shrink-0">{lesson.duration}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
