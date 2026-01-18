import React, { useState } from 'react';
import { X, Map, Flag, Target, Zap, Users, DollarSign, ChevronRight, CheckCircle2, Lock, ArrowDown, Rocket, Repeat, LogOut, Layers, Unlock } from 'lucide-react';
import { Button } from './Button';

interface ZeroToOneRoadmapDocProps {
  onClose: () => void;
  onCheckout: () => void;
  isVip?: boolean;
}

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const STAGES = [
  {
    id: 0,
    title: "ZERO: 마인드셋 포맷",
    subtitle: "소비자에서 생산자로",
    icon: <Zap size={20} />,
    desc: "당신은 지금까지 돈을 쓰는 훈련만 받았습니다. 돈을 버는 뇌로 갈아끼우지 않으면 어떤 기술도 무용지물입니다.",
    tactics: [
      "자신의 소비 내역을 분석하여 '생산자'의 의도를 역설계하라.",
      "완벽주의는 가난의 지름길이다. '똥'이라도 싸서 내놓는 훈련을 하라.",
      "무료로 줄 수 있는 나만의 가치(정보, 노가다 등)를 1가지 정의하라."
    ]
  },
  {
    id: 1,
    title: "STEP 1: 시장의 결함 발견",
    subtitle: "아이템은 발명하는 것이 아니다",
    icon: <SearchIcon />,
    desc: "새로운 것을 만들지 마십시오. 이미 돈이 흐르고 있는 곳에서 '불편함(Glitch)'을 찾으십시오. 그 불편함이 바로 당신의 상품입니다.",
    tactics: [
      "대형 커뮤니티/유튜브 댓글에서 사람들이 '욕하는 포인트'를 수집하라.",
      "잘 팔리고 있지만 CS가 엉망인 경쟁사를 타겟팅하라.",
      "크몽/숨고에서 수요는 많지만 공급이 부족한 키워드를 추출하라."
    ]
  },
  {
    id: 2,
    title: "STEP 2: 무형의 덫 설치",
    subtitle: "상품보다 판매 페이지가 먼저다",
    icon: <Flag size={20} />,
    desc: "상품을 만들고 파는 것은 하수입니다. 먼저 팔고 나서 만드는 것이 무자본 창업의 핵심입니다. '상세 페이지'만으로 수요를 검증하십시오.",
    tactics: [
      "랜딩 페이지나 블로그 글 하나로 '사전 예약'을 받아라.",
      "결제 버튼 대신 '대기 명단 등록'을 유도하여 DB를 확보하라.",
      "반응이 없으면? 폐기하라. 당신이 잃은 건 1시간뿐이다."
    ]
  },
  {
    id: 3,
    title: "STEP 3: 트래픽 하이재킹",
    subtitle: "남의 물길을 내 논으로 돌려라",
    icon: <Users size={20} />,
    desc: "광고비를 쓰지 마십시오. 이미 트래픽이 모여 있는 곳(카페, 커뮤니티, 타인의 SNS)에 침투하여 당신의 '덫(랜딩 페이지)'으로 유인하십시오.",
    tactics: [
      "정보성 글 80% + 홍보 20% 황금 비율로 커뮤니티에 침투하라.",
      "논란이나 호기심을 유발하는 제목으로 클릭을 유도하라.",
      "무료 소책자(미끼)를 배포하여 이메일/전화번호를 수집하라."
    ]
  },
  {
    id: 4,
    title: "STEP 4: 첫 수익과 시스템화",
    subtitle: "0에서 1을 만들었다면 무한 반복하라",
    icon: <DollarSign size={20} />,
    desc: "단 1만 원이라도 타인의 지갑을 열었다면 검증은 끝났습니다. 이제 노동을 투입해 상품을 전달하고, 이 과정을 매뉴얼로 만들어 자동화하십시오.",
    tactics: [
      "첫 고객에게는 압도적인 과잉 친절로 '간증 후기'를 확보하라.",
      "자주 묻는 질문(CS)을 미리 답변으로 만들어두어 시간을 아껴라.",
      "수익금을 재투자하여(광고 등) 유입량을 10배로 늘려라."
    ]
  }
];

export const ZeroToOneRoadmapDoc: React.FC<ZeroToOneRoadmapDocProps> = ({ onClose, onCheckout, isVip = false }) => {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/95 backdrop-blur-xl animate-fade-in p-4 pt-24 md:p-8 md:pt-28 overflow-y-auto">
      <div className={`relative w-full max-w-6xl shadow-[0_0_150px_rgba(34,211,238,0.15)] border flex flex-col md:h-[80vh] h-full rounded-sm overflow-hidden mb-20 ${isVip ? 'bg-[#050505] border-cyan-500/30' : 'bg-[#020617] border-cyan-900/40'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-900/30 bg-[#050505] z-20 shrink-0">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-sm border shadow-[0_0_10px_rgba(34,211,238,0.2)] ${isVip ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' : 'bg-cyan-900/10 border-cyan-500/20 text-cyan-600'}`}>
               <Map size={20} />
            </div>
            <div className="flex flex-col">
              <span className={`font-mono text-[10px] tracking-[0.3em] uppercase font-bold animate-pulse ${isVip ? 'text-cyan-400' : 'text-cyan-600'}`}>
                 {isVip ? 'Full Blueprint // Unlocked' : 'Tactical Blueprint'}
              </span>
              <h2 className="text-white font-serif font-bold text-lg tracking-tight">PROJECT: 0 TO 100</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-cyan-400 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content Body - Scrollable Container */}
        <div className="flex-grow overflow-y-auto bg-[#020617] relative scroll-smooth">
           {/* Background Grid */}
           <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

           {/* --- PART 1: 0 TO 1 (THE INTERACTIVE MAP) --- */}
           <div className="relative z-10 flex flex-col border-b border-cyan-900/30 min-h-[600px]">
              <div className="absolute top-0 right-0 p-4 text-[10px] font-mono text-cyan-900 uppercase tracking-widest font-black">Part 1. Creation</div>
              
              <div className="flex flex-col md:flex-row h-full">
                  {/* LEFT: Timeline */}
                  <div className="w-full md:w-1/3 border-r border-cyan-900/30 bg-[#050505]/50 p-6 md:p-10 relative">
                      <div className="absolute top-10 left-[2.4rem] bottom-10 w-[2px] bg-cyan-900/30">
                        <div 
                            className="absolute top-0 left-0 w-full bg-cyan-500 shadow-[0_0_15px_#22d3ee] transition-all duration-500"
                            style={{ height: `${(activeStage / (STAGES.length - 1)) * 100}%` }} 
                        />
                      </div>

                      <div className="space-y-12 relative">
                        {STAGES.map((stage, idx) => (
                            <div 
                              key={stage.id}
                              onClick={() => setActiveStage(idx)}
                              className={`relative flex items-start gap-6 cursor-pointer group transition-all duration-300 ${activeStage === idx ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                            >
                              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10 transition-all duration-300 ${activeStage === idx ? 'bg-cyan-500 border-cyan-400 text-black scale-110 shadow-[0_0_20px_rgba(34,211,238,0.5)]' : idx < activeStage ? 'bg-cyan-900 border-cyan-700 text-cyan-400' : 'bg-[#0a0a0a] border-cyan-900 text-cyan-900'}`}>
                                  {idx < activeStage ? <CheckCircle2 size={16} /> : <span className="text-xs font-black font-mono">{idx}</span>}
                              </div>
                              <div className="pt-1">
                                  <h4 className={`text-sm font-bold font-serif tracking-wide uppercase transition-colors ${activeStage === idx ? 'text-white' : 'text-gray-500'}`}>{stage.title}</h4>
                                  <p className="text-[10px] text-cyan-400/60 font-mono mt-1 tracking-wider">{stage.subtitle}</p>
                              </div>
                            </div>
                        ))}
                      </div>
                  </div>

                  {/* RIGHT: Tactical Detail */}
                  <div className="w-full md:w-2/3 bg-[#020617] p-8 md:p-16 flex flex-col relative overflow-hidden min-h-[500px]">
                      {/* Animated Detail Transition */}
                      <div key={activeStage} className="animate-fade-in-up space-y-10 relative z-10">
                        <div className="space-y-4 border-b border-cyan-900/30 pb-8">
                            <div className="flex items-center gap-3 text-cyan-500">
                              {STAGES[activeStage].icon}
                              <span className="font-mono text-xs font-black tracking-[0.4em] uppercase">Phase {activeStage} Active</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white font-serif uppercase tracking-tight leading-tight">
                              {STAGES[activeStage].title}
                            </h1>
                            <p className="text-xl text-gray-400 font-light leading-relaxed font-serif italic border-l-2 border-cyan-500/30 pl-6">
                              "{STAGES[activeStage].desc}"
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-sm font-mono text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-2">
                              <Target size={16} /> Execution Protocol
                            </h3>
                            <div className="grid gap-4">
                              {STAGES[activeStage].tactics.map((tactic, i) => (
                                  <div key={i} className="flex items-start gap-4 p-5 bg-white/[0.02] border border-cyan-900/20 rounded-sm hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group">
                                    <div className="mt-1 w-5 h-5 rounded-full border border-cyan-500/30 flex items-center justify-center text-[10px] font-mono text-cyan-500 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                                        {i + 1}
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed font-medium">
                                        {tactic}
                                    </p>
                                  </div>
                              ))}
                            </div>
                        </div>
                      </div>
                      
                      {/* Decorative Background Elements */}
                      <div className="absolute top-0 right-0 p-8 opacity-5 font-black text-[10rem] text-cyan-500 select-none pointer-events-none leading-none">
                        {activeStage}
                      </div>
                  </div>
              </div>
           </div>

           {/* --- PART 2: THE QUANTUM LEAP (VIP SECTION) --- */}
           <div className={`relative ${isVip ? 'bg-[#0a0a0a]' : 'bg-[#020617] border-t border-cyan-900/30'}`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.05)_0%,_transparent_50%)] pointer-events-none" />
              
              <div className="relative z-10 max-w-5xl mx-auto p-12 md:p-16">
                 {!isVip ? (
                    // LOCKED STATE
                    <div className="text-center space-y-10 py-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-900/20 border border-cyan-500/30 rounded-full text-cyan-500 text-[10px] font-mono uppercase tracking-widest animate-pulse">
                            <Lock size={12} /> Part 2: Locked
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none opacity-50 blur-[2px] select-none">
                                The Quantum Leap<br/>
                                <span className="text-cyan-500 italic">1 to 100 Scaling</span>
                            </h2>
                            <p className="text-lg text-gray-500 font-serif max-w-2xl mx-auto leading-relaxed">
                                "0에서 1을 만드는 것은 '노동'이지만, <br/>
                                1에서 100을 만드는 것은 '자본'과 '시스템'의 영역입니다. <br/>
                                당신의 사업을 <strong>제국(Empire)</strong>으로 확장하는 비밀 설계도를 해제하십시오."
                            </p>
                        </div>
                        <Button 
                            onClick={onCheckout}
                            className="px-16 py-6 text-lg font-black uppercase tracking-[0.2em] bg-cyan-500 text-black border-none hover:bg-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.3)] animate-pulse-cta"
                        >
                            <span className="flex items-center justify-center gap-3">
                                <Unlock size={20} />
                                Unlock Full Blueprint
                                <ChevronRight size={20} strokeWidth={3} />
                            </span>
                        </Button>
                    </div>
                 ) : (
                    // UNLOCKED VIP STATE
                    <div>
                       <div className="text-center mb-16 space-y-4">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono uppercase tracking-widest">
                             <Layers size={12} /> Master Plan Revealed
                          </div>
                          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                             PART 2. <span className="text-cyan-400">The Quantum Leap</span>
                          </h2>
                          <p className="text-gray-400 font-serif italic text-lg">
                             "노동을 멈추고 자본을 태우십시오. 이제 100배의 속도로 질주합니다."
                          </p>
                       </div>

                       <div className="space-y-12">
                          {/* Module 5 */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 bg-[#0f0f0f] border border-cyan-900/30 rounded-sm hover:border-cyan-500/30 transition-colors group">
                             <div className="md:col-span-3">
                                <div className="text-cyan-500 font-black text-4xl opacity-20 group-hover:opacity-100 transition-opacity">05</div>
                                <h3 className="text-xl font-bold text-white uppercase mt-2">Traffic Injection<br/>(트래픽 주입)</h3>
                             </div>
                             <div className="md:col-span-9 space-y-4">
                                <p className="text-gray-300 leading-relaxed font-light">
                                   "무료 트래픽(블로그, 인스타)은 느립니다. <strong>돈(Ads)</strong>을 부어 불을 지피십시오."
                                </p>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                   ROAS(광고비 대비 매출)가 200% 이상 나온다면, 광고비는 비용이 아니라 '투자'입니다.
                                   하루 1만 원으로 시작해 100만 원까지 증액하는 <strong>스케일링(Scaling)</strong> 알고리즘을 가동하십시오.
                                </p>
                                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold pt-2">
                                   <Rocket size={14} /> Action: Meta/Google Ads 픽셀 설치 및 A/B 테스트 시작
                                </div>
                             </div>
                          </div>

                          {/* Module 6 */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 bg-[#0f0f0f] border border-cyan-900/30 rounded-sm hover:border-cyan-500/30 transition-colors group">
                             <div className="md:col-span-3">
                                <div className="text-cyan-500 font-black text-4xl opacity-20 group-hover:opacity-100 transition-opacity">06</div>
                                <h3 className="text-xl font-bold text-white uppercase mt-2">Funnel Hacking<br/>(퍼널 해킹)</h3>
                             </div>
                             <div className="md:col-span-9 space-y-4">
                                <p className="text-gray-300 leading-relaxed font-light">
                                   "단품만 팔지 마십시오. 뼈까지 발라 먹어야 합니다."
                                </p>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                   고객이 지갑을 여는 순간은 도파민이 최고조에 달한 상태입니다.
                                   결제 직후 <strong>추가 상품(Upsell)</strong>을 제안하면 구매율이 30% 증가합니다.
                                   LTV(고객 생애 가치)를 극대화하는 퍼널을 설계하십시오.
                                </p>
                                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold pt-2">
                                   <Repeat size={14} /> Action: 결제 완료 페이지에 '50% 할인 추가 제안' 삽입
                                </div>
                             </div>
                          </div>

                          {/* Module 7 */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 bg-[#0f0f0f] border border-cyan-900/30 rounded-sm hover:border-cyan-500/30 transition-colors group">
                             <div className="md:col-span-3">
                                <div className="text-cyan-500 font-black text-4xl opacity-20 group-hover:opacity-100 transition-opacity">07</div>
                                <h3 className="text-xl font-bold text-white uppercase mt-2">The Exit<br/>(엑시트)</h3>
                             </div>
                             <div className="md:col-span-9 space-y-4">
                                <p className="text-gray-300 leading-relaxed font-light">
                                   "사업의 완성은 <strong>매각(Sell)</strong>입니다."
                                </p>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                   월 1,000만 원 버는 시스템을 만들었습니까?
                                   이 시스템을 통째로 기업에 매각하면 <strong>3억~5억 원(영업이익의 2~3년 치)</strong>을 일시불로 받습니다.
                                   이것이 자본주의 게임의 엔딩 크레딧입니다.
                                </p>
                                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold pt-2">
                                   <LogOut size={14} /> Action: 매각을 위한 회계 장부 투명화 및 매뉴얼 패키징
                                </div>
                             </div>
                          </div>
                       </div>

                       <div className="flex justify-end mt-12 pt-8 border-t border-cyan-900/30">
                          <div className="text-right">
                             <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest block mb-1">Clearance Level</span>
                             <span className="text-3xl font-black text-white tracking-tighter">ARCHITECT</span>
                          </div>
                       </div>
                    </div>
                 )}
              </div>
           </div>

        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #050505; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #164e63; border-radius: 2px; }
      `}</style>
    </div>
  );
};