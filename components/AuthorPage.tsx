
import React, { useEffect, useState, useRef } from 'react';
import { Settings, AlertTriangle, Binary, Box, Network, Zap, ArrowRight, ShieldCheck, TrendingUp, Users, User } from 'lucide-react';
import { Button } from './Button';

interface StageProps {
  stage: {
    num: string;
    phase: string;
    title: string;
    desc: string;
    visual: React.ReactNode;
    colorClass: string;
    bgClass: string;
  };
  index: number;
}

const StageCard: React.FC<StageProps> = ({ stage, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`relative grid grid-cols-1 lg:grid-cols-12 gap-12 py-24 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
    >
      {/* Phase Label (Left) */}
      <div className="lg:col-span-3 flex lg:justify-end items-start pt-2">
        <div className="text-right space-y-1">
          <span className={`text-[10px] font-mono tracking-[0.5em] uppercase font-black opacity-40 block`}>STAGE {stage.num}</span>
          <span className={`font-serif italic text-xl font-bold ${stage.colorClass}`}>{stage.phase}</span>
        </div>
      </div>

      {/* Story & Visual (Right) */}
      <div className="lg:col-span-9 space-y-10">
        <div className={`relative p-8 md:p-16 rounded-sm border border-white/5 overflow-hidden group ${stage.bgClass} backdrop-blur-3xl shadow-2xl`}>
          {/* Background Ambient Decor */}
          <div className="absolute top-0 right-0 p-4 opacity-5 select-none font-serif font-black text-[12rem] leading-none pointer-events-none">
            {stage.num}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6">
              <h3 className="text-4xl md:text-5xl font-serif font-black text-white uppercase tracking-tighter leading-tight">
                {stage.title}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed font-serif italic">
                {stage.desc}
              </p>
            </div>
            <div className="flex justify-center">
              {stage.visual}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuthorPage: React.FC<{ onCheckout: () => void }> = ({ onCheckout }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / totalHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stages = [
    {
      num: "01",
      phase: "The Cog",
      title: "통제 불가능한 변수",
      desc: "매일 아침 7시, 낯선 타인의 땀 냄세. 나의 시간은 회사의 것이었고, 나의 미래는 상사의 기분에 달려 있었습니다. 나는 시스템의 주인이 아닌, 언제든 교체 가능한 부품이었습니다.",
      colorClass: "text-gray-500",
      bgClass: "bg-white/[0.02]",
      visual: (
        <div className="relative w-48 h-48 flex items-center justify-center">
          <Settings size={120} className="text-gray-700 animate-[spin_10s_linear_infinite]" />
          <Settings size={60} className="text-gray-800 absolute top-4 right-4 animate-[spin_6s_linear_infinite_reverse]" />
        </div>
      )
    },
    {
      num: "02",
      phase: "The Trigger",
      title: "12만 원의 비참함",
      desc: "아이가 아프다는 연락을 받고도 퇴근 시간을 계산하던 날. 조퇴로 깎인 일당 12만 원이 내 아이의 고통보다 무겁게 느껴졌을 때, 나는 스스로를 용서할 수 없었습니다. 노동 소득의 한계를 뼈저리게 각인했습니다.",
      colorClass: "text-red-500",
      bgClass: "bg-red-500/[0.03] border-red-500/10",
      visual: (
        <div className="relative group/trigger">
          <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full animate-pulse" />
          <div className="relative text-center space-y-4">
            <AlertTriangle size={64} className="text-red-600 mx-auto animate-bounce" />
            <div className="font-mono text-5xl font-black text-red-500 tracking-tighter animate-glitch">
              ₩120,000
            </div>
            <div className="text-[10px] text-red-800 uppercase tracking-widest font-black">System Failure</div>
          </div>
        </div>
      )
    },
    {
      num: "03",
      phase: "The Algorithm",
      title: "인간의 배제",
      desc: "왜 자영업은 망하는가? '사람' 때문이었습니다. 저는 키오스크(Kiosk)에서 첫 번째 해답을 찾았습니다. 감정과 피로가 없는 기계가 인간을 대체할 때, 시스템은 비로소 완벽해집니다.",
      colorClass: "text-cyan-400",
      bgClass: "bg-cyan-400/[0.03] border-cyan-400/10",
      visual: (
        <div className="w-full h-48 overflow-hidden relative border border-cyan-400/20 rounded-sm">
          <div className="absolute inset-0 matrix-rain opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Binary size={80} className="text-cyan-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
          </div>
        </div>
      )
    },
    {
      num: "04",
      phase: "The Prototype",
      title: "첫 번째 글리치",
      desc: "1호점 오픈. 나는 매장에 나가지 않았습니다. 무인화 기계들은 불평 없이 돈을 벌어들이고 있었습니다. 내 가설이 '현실의 오류'를 뚫고 정답으로 바뀌는 순간이었습니다.",
      colorClass: "text-emerald-400",
      bgClass: "bg-emerald-400/[0.03] border-emerald-400/10",
      visual: (
        <div className="relative perspective-1000">
          <div className="w-32 h-32 bg-emerald-500/10 border-2 border-emerald-500/40 rounded-sm rotate-45 animate-pulse shadow-[0_0_50px_rgba(16,185,129,0.3)] flex items-center justify-center">
            <Box size={48} className="text-emerald-400 -rotate-45" />
          </div>
        </div>
      )
    },
    {
      num: "05",
      phase: "The Replication",
      title: "복제의 미학",
      desc: "생각을 멈추고 복사했습니다. 1호점의 성공 공식을 그대로 2호점, 3호점... 6호점까지. 노동 시간은 0으로 수렴했고, 수익은 무한대로 발산했습니다. 진정한 경제적 자유의 달성이었습니다.",
      colorClass: "text-gold",
      bgClass: "bg-gold/5 border-gold/20",
      visual: (
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full text-gold opacity-60">
            <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <circle 
                key={i} 
                cx={50 + 40 * Math.cos((angle * Math.PI) / 180)} 
                cy={50 + 40 * Math.sin((angle * Math.PI) / 180)} 
                r="4" 
                fill="currentColor"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
            <Network className="absolute inset-0 m-auto text-gold animate-pulse" size={32} />
          </svg>
        </div>
      )
    },
    {
      num: "06",
      phase: "The Ascension",
      title: "디지털 정보상",
      desc: "이제 저는 오프라인의 무인화 시스템을 웹(Web)으로 이식합니다. 물리적 제약이 없는 곳에서 정보를 거래하는 정보상(Info-Broker). 이것이 궁극의 무인 점포입니다.",
      colorClass: "text-white",
      bgClass: "bg-[#050505] border-gold/20 shadow-[0_0_100px_rgba(191,149,63,0.1)]",
      visual: (
        <div className="relative flex items-center justify-center">
          {/* God Ray Effect Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#BF953F60_0%,_transparent_75%)] animate-pulse" />
          <div className="absolute inset-0 bg-white/5 blur-[80px] animate-pulse" />
          <svg viewBox="0 0 24 24" className="w-32 h-32 drop-shadow-[0_0_50px_rgba(191,149,63,1)] -rotate-45 relative z-10">
             <path 
                d="M11 1 L13 1 L13 8 L15.5 8.5 L13.8 10 L12 22 L10.2 10 L8.5 8.5 L11 8 Z" 
                fill="#FCF6BA" 
              />
          </svg>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen relative py-24 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#0f172a_0%,_black_100%)]" />
        <div className="absolute inset-0 grid-pattern opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Intro Header */}
        <header className="text-center space-y-12 mb-48">
          <div className="space-y-4">
            <h4 className="text-gold font-mono tracking-[0.8em] uppercase text-xs font-black animate-pulse">The Narrative Arc</h4>
            <h1 className="font-serif font-black text-6xl md:text-9xl text-white tracking-tighter leading-tight uppercase">
              부품에서 <br className="md:hidden"/> <span className="text-gold italic">설계자로.</span>
            </h1>
          </div>
          <div className="space-y-8">
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-brand-muted font-light leading-relaxed font-serif italic border-l-2 border-gold/30 pl-8">
              "가장 비참했던 바닥에서, 가장 정교한 시스템의 정점까지. <br className="hidden md:block" /> 한 인간이 주권을 되찾아가는 과정을 가감 없이 기록했습니다."
            </p>
            
            {/* The Phantom Profile Silhouette */}
            <div className="flex flex-col items-center gap-4 animate-fade-in-up">
              <div className="relative w-32 h-32 rounded-full border-2 border-[#BF953F] bg-gradient-to-b from-neutral-800 to-black overflow-hidden shadow-[0_0_40px_rgba(191,149,63,0.4)] group cursor-help">
                <div className="absolute inset-0 noise-texture opacity-20 pointer-events-none"></div>
                <User className="absolute inset-0 m-auto text-white/10 group-hover:text-gold/20 transition-colors" size={80} strokeWidth={1} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(191,149,63,0.1),transparent)] pointer-events-none"></div>
              </div>
              <span className="text-gold font-serif font-black italic text-[11px] tracking-[0.5em] uppercase">The Architect</span>
            </div>
          </div>
        </header>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative mt-32">
          {/* Vertical Timeline Line */}
          <div className="hidden lg:block absolute left-[12.5%] top-0 bottom-0 w-[1px] bg-white/5">
            <div 
              className="absolute top-0 left-0 w-full bg-gold shadow-[0_0_15px_#BF953F] transition-all duration-300"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>

          <div className="space-y-24">
            {stages.map((stage, idx) => (
              <StageCard key={idx} stage={stage} index={idx} />
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <section className="mt-64 text-center space-y-20 pb-32">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-[5.5rem] lg:text-[7rem] font-serif font-[900] text-white tracking-tighter uppercase leading-[0.9]">
              설계도는 완성되었습니다.<br /> 
              이제 당신의 <span className="text-gold italic underline decoration-gold/30 underline-offset-8 drop-shadow-[0_0_30px_rgba(191,149,63,0.6)]">제국을 건설하십시오.</span>
            </h2>
            <p className="text-brand-muted text-2xl font-serif italic">시스템은 이미 준비되었습니다. 당신은 집행하기만 하면 됩니다.</p>
          </div>

          <div className="flex flex-col items-center gap-14">
            <Button 
              size="lg" 
              onClick={onCheckout}
              className="px-24 py-10 text-3xl font-black uppercase tracking-[0.4em] bg-gold-metallic border-none shadow-[0_0_80px_rgba(191,149,63,0.5)] transform hover:scale-110 transition-all duration-700 animate-pulse-cta"
            >
              시스템 훔치기
              <ArrowRight className="ml-8" />
            </Button>

            <div className="grid grid-cols-3 gap-20 mt-16">
                <div className="flex flex-col items-center gap-4 group">
                   <ShieldCheck size={32} className="text-[#BF953F] group-hover:scale-110 transition-transform" />
                   <span className="text-[11px] font-mono tracking-widest uppercase font-black text-white/70">Full Encryption</span>
                </div>
                <div className="flex flex-col items-center gap-4 group">
                   <TrendingUp size={32} className="text-[#BF953F] group-hover:scale-110 transition-transform" />
                   <span className="text-[11px] font-mono tracking-widest uppercase font-black text-white/70">Compound Returns</span>
                </div>
                <div className="flex flex-col items-center gap-4 group">
                   <Users size={32} className="text-[#BF953F] group-hover:scale-110 transition-transform" />
                   <span className="text-[11px] font-mono tracking-widest uppercase font-black text-white/70">Architect Circle</span>
                </div>
             </div>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes glitch {
          0% { transform: translate(0); text-shadow: 0 0 0 transparent; }
          20% { transform: translate(-2px, 2px); text-shadow: 2px 0 red, -2px 0 cyan; }
          40% { transform: translate(2px, -2px); text-shadow: -2px 0 red, 2px 0 cyan; }
          60% { transform: translate(-2px, -2px); text-shadow: 2px 0 red, -2px 0 cyan; }
          80% { transform: translate(2px, 2px); text-shadow: -2px 0 red, 2px 0 cyan; }
          100% { transform: translate(0); }
        }
        .animate-glitch { animation: glitch 0.3s linear infinite; }

        .matrix-rain {
          background: linear-gradient(rgba(0, 255, 70, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 255, 70, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
          animation: matrix-scroll 20s linear infinite;
        }
        @keyframes matrix-scroll {
          from { background-position: 0 0; }
          to { background-position: 0 1000px; }
        }

        @keyframes pulse-cta {
          0%, 100% { transform: scale(1); box-shadow: 0 0 50px rgba(191,149,63,0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 80px rgba(252,246,186,0.8); }
        }
        .animate-pulse-cta { animation: pulse-cta 2s ease-in-out infinite; }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; }
      `}</style>
    </div>
  );
};
