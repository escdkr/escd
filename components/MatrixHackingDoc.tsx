
import React, { useEffect, useState } from 'react';
import { X, Terminal, Cpu, Eye, Binary, ShieldAlert, Zap, Network, ArrowRight, Quote, Lock, Globe } from 'lucide-react';

interface MatrixHackingDocProps {
  onClose: () => void;
}

export const MatrixHackingDoc: React.FC<MatrixHackingDocProps> = ({ onClose }) => {
  const [decodeProgress, setDecodeProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDecodeProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/95 backdrop-blur-xl animate-fade-in p-4 pt-24 md:p-8 md:pt-28 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#050505] shadow-[0_0_150px_rgba(16,185,129,0.15)] border border-emerald-900/40 flex flex-col md:h-[80vh] h-full rounded-sm overflow-hidden mb-20">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-900/30 bg-[#020202] z-20 relative shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-emerald-900/10 rounded-sm border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
               <Terminal size={20} className="text-emerald-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-emerald-500 font-mono text-[10px] tracking-[0.3em] uppercase font-bold animate-pulse">System Root Access</span>
              <h2 className="text-white font-serif font-bold text-lg tracking-tight">PROTOCOL: MATRIX HACKING</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-emerald-500 transition-colors group">
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-grow overflow-y-auto p-8 md:p-16 bg-black text-gray-300 font-sans relative selection:bg-emerald-500/30 selection:text-white scroll-smooth">
          {/* Matrix Rain Effect Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(16, 185, 129, .3) 25%, rgba(16, 185, 129, .3) 26%, transparent 27%, transparent 74%, rgba(16, 185, 129, .3) 75%, rgba(16, 185, 129, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(16, 185, 129, .3) 25%, rgba(16, 185, 129, .3) 26%, transparent 27%, transparent 74%, rgba(16, 185, 129, .3) 75%, rgba(16, 185, 129, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }} 
          />

          <div className="max-w-3xl mx-auto space-y-24 relative z-10">
            
            {/* Intro Terminal */}
            <div className="font-mono text-xs text-emerald-600/70 mb-12 border-b border-emerald-900/30 pb-6 space-y-2">
               <p>{'>'} INITIATING TRUTH_REVEAL_SEQUENCE...</p>
               <p>{'>'} ANALYZING SUBJECT&apos;S FINANCIAL CORE...</p>
               <p>{'>'} DETECTED: CRITICAL_ERROR IN LOGIC_GATE (HARD_WORK != WEALTH)</p>
               <p>{'>'} BYPASSING SOCIAL_CONDITIONING... {decodeProgress}%</p>
               <p className={`text-emerald-400 font-bold ${decodeProgress === 100 ? 'block' : 'hidden'}`}>
                  {'>'} ACCESS GRANTED. WELCOME TO THE REAL WORLD.
               </p>
            </div>

            {/* Headline Section */}
            <div className="text-center space-y-8 animate-fade-in-up">
              <div className="inline-block border border-emerald-500/30 px-4 py-1.5 rounded-full bg-emerald-500/5 text-emerald-500 text-[10px] font-mono tracking-[0.3em] uppercase mb-4 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                 Classified Manifesto
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[1.1] text-white">
                당신의 성실함은 <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]">시스템의 연료일 뿐이다</span>
              </h1>
              <p className="font-serif text-xl text-white/70 italic max-w-2xl mx-auto leading-relaxed border-l-4 border-emerald-500/50 pl-6 text-left md:text-center mt-8">
                "왜 가장 일찍 일어나고 가장 늦게까지 일하는 당신이, <br className="hidden md:block"/>
                점심시간에 골프를 치는 그들보다 가난한가?"
              </p>
            </div>

            {/* Phase 1: The Lie (Disillusionment) */}
            <section className="space-y-8 relative group">
               <div className="absolute -left-12 top-0 text-[10rem] font-black text-white/5 select-none pointer-events-none -translate-y-10 group-hover:text-white/10 transition-colors">01</div>
               <h3 className="text-2xl font-serif font-black text-white flex items-center gap-3 uppercase tracking-tight relative z-10">
                  <span className="text-emerald-500 font-mono text-lg">01.</span> The Great Deception (거대한 기만)
               </h3>
               <div className="space-y-6 text-lg leading-relaxed text-gray-300 font-light relative z-10">
                  <p>
                     학교는 당신에게 치명적인 거짓말을 가르쳤습니다. <br/>
                     <span className="text-white font-bold bg-white/10 px-2 py-0.5">"열심히 공부해서, 좋은 대학에 가고, 성실히 일하면 부자가 된다."</span>
                  </p>
                  <p>
                     이것은 당신을 위한 조언이 아닙니다. 이것은 시스템을 유지하기 위한 <strong>'부품 사용 설명서'</strong>입니다.
                     자본주의 시스템은 당신이 똑똑해지기를 원하지 않습니다. 그저 불평 없이 세금을 내고, 빚을 갚으며 평생 기계를 돌려줄 <strong>'건전지'</strong>를 원할 뿐입니다.
                  </p>
                  <div className="bg-[#0a0a0a] border border-red-900/40 p-6 rounded-sm flex gap-4 items-start">
                     <ShieldAlert className="text-red-500 shrink-0 mt-1" />
                     <div className="space-y-2">
                        <h4 className="text-red-500 font-bold uppercase text-xs tracking-widest">System Alert: Inflation</h4>
                        <p className="text-sm text-red-200/60 font-serif">
                           <strong className="text-red-400">인플레이션(Inflation)</strong>은 보이지 않는 세금입니다. 
                           당신이 통장에 넣어둔 돈은 매년 3~5%씩 시스템에 의해 증발하고 있습니다. 
                           저축으로 부자가 되는 길은 1980년대에 이미 닫혔습니다.
                        </p>
                     </div>
                  </div>
               </div>
            </section>

            {/* Phase 2: The Redefinition (Money as Signal) */}
            <section className="space-y-8 relative group">
               <div className="absolute -right-12 top-0 text-[10rem] font-black text-white/5 select-none pointer-events-none -translate-y-10 group-hover:text-white/10 transition-colors">02</div>
               <h3 className="text-2xl font-serif font-black text-white flex items-center gap-3 uppercase tracking-tight relative z-10">
                  <span className="text-emerald-500 font-mono text-lg">02.</span> Money is Signal (돈의 본질)
               </h3>
               <div className="space-y-6 text-lg leading-relaxed text-gray-300 font-light relative z-10">
                  <p>
                     돈을 '물질'로 착각하지 마십시오. 돈은 <strong className="text-emerald-400">신뢰의 디지털 신호(Signal)</strong>입니다.
                     열심히 땀 흘려 일한다고 신호가 오지 않습니다. 신호는 오직 <strong className="text-white">'문제'를 해결해 준 사람</strong>에게 전송됩니다.
                  </p>
                  <p>
                     당신이 시간(Labor)을 팔고 있다면, 당신의 수입은 <span className="line-through decoration-red-500">24시간</span>이라는 물리적 한계에 갇힙니다.
                     진짜 부자들은 시간을 팔지 않습니다. 그들은 <strong>'시스템'</strong>을 팝니다.
                  </p>
                  
                  {/* Visual Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                     <div className="bg-white/5 border border-white/10 p-8 text-center space-y-4 group hover:border-red-500/30 transition-colors relative overflow-hidden">
                        <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest font-bold">The Laborer (노동자)</span>
                        <div className="font-mono text-2xl font-bold text-gray-400 group-hover:text-red-400 transition-colors">Input = Output</div>
                        <div className="h-1 w-full bg-gray-700 mt-2"><div className="h-full w-1/2 bg-gray-500" /></div>
                        <p className="text-xs text-gray-500 pt-2 font-serif italic">"시간을 멈추면, 소득도 즉시 멈춘다."</p>
                     </div>
                     
                     <div className="bg-emerald-900/10 border border-emerald-500/30 p-8 text-center space-y-4 relative overflow-hidden group hover:bg-emerald-900/20 transition-colors">
                        <div className="absolute top-0 right-0 p-3 opacity-20"><Zap size={48} className="text-emerald-500" /></div>
                        <span className="block text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold">The Architect (설계자)</span>
                        <div className="font-mono text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">Input {'<<'} Output</div>
                        <div className="h-1 w-full bg-emerald-900/50 mt-2"><div className="h-full w-full bg-emerald-500 animate-pulse" /></div>
                        <p className="text-xs text-emerald-500/70 pt-2 font-serif italic">"한 번 만들고, 무한히 복제한다."</p>
                     </div>
                  </div>
               </div>
            </section>

            {/* Phase 3: The Architecture (Solution) */}
            <section className="space-y-8 relative group">
               <div className="absolute -left-12 top-0 text-[10rem] font-black text-white/5 select-none pointer-events-none -translate-y-10 group-hover:text-white/10 transition-colors">03</div>
               <h3 className="text-2xl font-serif font-black text-white flex items-center gap-3 uppercase tracking-tight relative z-10">
                  <span className="text-emerald-500 font-mono text-lg">03.</span> The Infinite Machine (무한 동력)
               </h3>
               <div className="space-y-6 text-lg leading-relaxed text-gray-300 font-light relative z-10">
                  <p>
                     저는 오프라인에서 첫 번째 해답을 찾았습니다. 바로 <strong className="text-[#FCF6BA] font-bold">키오스크(Kiosk)</strong>입니다.
                     불평하지 않고, 쉬지 않고, 24시간 돈을 받는 기계 점원. 인간을 배제하자 수익은 폭발했습니다.
                  </p>
                  <p>
                     이제 이 개념을 <strong className="text-cyan-400">웹(Web)</strong>으로 확장합니다.
                     전자책, 강의, 소프트웨어... 이것들은 <strong>'죽지 않는 디지털 점원'</strong>입니다.
                     잠을 자는 동안에도 누군가는 내 키오스크에 와서 결제를 합니다.
                  </p>
                  <ul className="space-y-4 mt-6 border-l border-emerald-500/20 pl-6">
                     <li className="flex items-start gap-4 group">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-black font-bold flex items-center justify-center text-xs mt-1 shrink-0 group-hover:scale-110 transition-transform">1</div>
                        <div>
                           <strong className="text-white block mb-1">Create Once, Sell Forever (무한 복제)</strong>
                           <span className="text-sm text-gray-400">한 번 제작하는 데 100시간이 걸려도 좋습니다. 그 후에는 복제 비용이 '0'입니다. 마진율 99%의 게임입니다.</span>
                        </div>
                     </li>
                     <li className="flex items-start gap-4 group">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-black font-bold flex items-center justify-center text-xs mt-1 shrink-0 group-hover:scale-110 transition-transform">2</div>
                        <div>
                           <strong className="text-white block mb-1">Decouple Time (시간 분리)</strong>
                           <span className="text-sm text-gray-400">시간과 소득의 연결 고리를 끊으십시오. 당신이 무엇을 하든 통장에는 숫자가 찍혀야 합니다.</span>
                        </div>
                     </li>
                     <li className="flex items-start gap-4 group">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-black font-bold flex items-center justify-center text-xs mt-1 shrink-0 group-hover:scale-110 transition-transform">3</div>
                        <div>
                           <strong className="text-white block mb-1">Become The Dealer (딜러가 되라)</strong>
                           <span className="text-sm text-gray-400">도박판에서 돈을 버는 건 플레이어가 아닙니다. 판을 깐 '딜러'입니다. 남들이 소비할 때, 당신은 '룰'을 만드십시오.</span>
                        </div>
                     </li>
                  </ul>
                  
                  <div className="mt-8 p-6 border-l-2 border-emerald-500 bg-white/5 italic">
                     <Quote className="text-emerald-500 mb-2 opacity-50" size={24} />
                     <p className="text-white font-serif text-xl">
                        "당신의 뇌 구조를 '소비자'에서 '생산자'로, '플레이어'에서 '설계자'로 강제 업데이트하십시오. 
                        이것이 매트릭스를 탈출하는 유일한 비상구입니다."
                     </p>
                  </div>
               </div>
            </section>

            {/* Footer Signoff */}
            <div className="pt-16 border-t border-emerald-900/30 flex flex-col md:flex-row justify-between items-end gap-6">
               <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-600/70">
                     System Status: Reconfigured
                  </div>
                  <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase tracking-widest text-xs">
                     <Network size={14} />
                     Matrix Hacked // Access Level: God Mode
                  </div>
               </div>
               <div className="text-right">
                  <p className="font-serif italic text-white/40 text-sm">"The door is open. Walk through it."</p>
                  <div className="mt-4 flex gap-2 justify-end">
                     <div className="w-24 h-1 bg-emerald-500/20 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-full animate-loading-bar-turbo" />
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

