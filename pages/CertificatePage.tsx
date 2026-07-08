import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Award, Download, ArrowLeft, Shield, Star } from 'lucide-react';
import { getCourse } from '../data/lms/courses';
import { useUser } from '../context/UserContext';
import { DaggerIcon } from '../components/Navbar';

export const CertificatePage: React.FC = () => {
  const { courseId = 'the-glitch' } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const course = getCourse(courseId);
  const [downloading, setDownloading] = useState(false);

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (!course) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans flex flex-col items-center justify-center relative selection:bg-[#BF953F]/30">
      {/* Background */}
      <div className="fixed inset-0 grid-pattern opacity-10 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(191,149,63,0.06)_0%,transparent_60%)] pointer-events-none z-0" />

      <button
        onClick={() => navigate(`/courses/${courseId}`)}
        className="fixed top-6 left-6 z-20 flex items-center gap-2 text-white/30 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest"
      >
        <ArrowLeft size={14} />
        강의로 돌아가기
      </button>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-16 flex flex-col items-center">
        {/* Stars */}
        <div className="flex gap-2 mb-8">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} className="text-[#BF953F] fill-[#BF953F]" />
          ))}
        </div>

        {/* Certificate Frame */}
        <div className="w-full border border-[#BF953F]/30 bg-gradient-to-b from-[#0a0a14] to-[#020617] rounded-sm p-10 md:p-14 relative overflow-hidden">
          {/* Corner ornaments */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#BF953F]/40" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#BF953F]/40" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-[#BF953F]/40" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#BF953F]/40" />

          {/* Ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(191,149,63,0.05)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative flex flex-col items-center text-center gap-6">
            {/* Dagger Icon */}
            <DaggerIcon className="w-16 h-16 -rotate-45 drop-shadow-[0_0_20px_rgba(191,149,63,0.4)]" />

            <div>
              <p className="text-[10px] font-mono tracking-[0.6em] uppercase text-[#BF953F]/60 mb-2">ESCD — Escape Dagger</p>
              <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/30">Certificate of Completion</p>
            </div>

            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#BF953F]/40 to-transparent" />

            <div>
              <p className="text-white/30 text-sm mb-2 font-serif">이 수료증은 다음 수강생에게 수여합니다</p>
              <p className="font-cinzel text-3xl md:text-4xl font-black text-white tracking-wide">
                {user?.name ?? 'Elite Operative'}
              </p>
            </div>

            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#BF953F]/40 to-transparent" />

            <div>
              <p className="text-white/30 text-xs mb-1 font-mono tracking-widest uppercase">완료 과정</p>
              <p className="font-serif text-xl font-bold text-[#FCF6BA]">{course.title}</p>
              <p className="text-white/40 text-sm mt-1 font-serif italic">{course.subtitle.split('—')[0].trim()}</p>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-[#BF953F]/60" />
                <span className="text-xs text-white/30 font-mono">{course.level}</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <Award size={14} className="text-[#BF953F]/60" />
                <span className="text-xs text-white/30 font-mono">{today}</span>
              </div>
            </div>

            {/* Signature line */}
            <div className="w-full border-t border-white/5 pt-6 flex justify-between items-end">
              <div className="text-left">
                <div className="font-cinzel text-lg font-black text-white/60 mb-1">ESCD</div>
                <div className="w-24 h-[1px] bg-white/10" />
                <p className="text-[10px] text-white/20 font-mono mt-1 tracking-widest">발행 기관</p>
              </div>
              <div className="text-[10px] font-mono text-white/10 tracking-widest">
                ID: {user?.id ?? 'AGENT-077'}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#BF953F] text-black font-black text-sm tracking-widest uppercase rounded-sm hover:brightness-110 transition-all disabled:opacity-50"
          >
            {downloading ? (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download size={16} />
            )}
            {downloading ? 'Generating...' : '수료증 다운로드'}
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 py-3.5 border border-white/10 text-white/50 hover:text-white hover:border-white/30 font-bold text-sm tracking-widest uppercase rounded-sm transition-colors"
          >
            대시보드로
          </button>
        </div>
      </div>
    </div>
  );
};
