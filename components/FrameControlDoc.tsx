
import React, { useState } from 'react';
import { X, MessageSquare, Shield, Target, Zap, Crown, ChevronRight, Swords, User, Play, Lock, AlertTriangle, Eye, ShieldCheck } from 'lucide-react';
import { Button } from './Button';

interface FrameControlDocProps {
  onClose: () => void;
  onCheckout: () => void;
  isVip?: boolean;
}

export const FrameControlDoc: React.FC<FrameControlDocProps> = ({ onClose, onCheckout, isVip = false }) => {
  const [activeScenario, setActiveScenario] = useState<'negotiation' | 'dating'>('negotiation');

  const scenarios = {
    negotiation: {
      opponent: "Client",
      beta: "네, 대표님! 가격은 최대한 맞춰드리겠습니다. 언제든 편하게 연락 주십시오! (굽신)",
      alpha: "제 서비스 비용은 고정입니다. 다만, 예산이 부족하시다면 기능 일부를 제외하고 진행하는 방법은 제안 드릴 수 있습니다. (원칙 고수)"
    },
    dating: {
      opponent: "Partner",
      beta: "왜 연락이 안 돼? ㅠㅠ 내가 뭐 잘못했어? 바빠서 그런 거야? (불안)",
      alpha: "연락이 늦네. 바쁜가 보구나. 나도 지금 미팅 들어가니까 이따 밤에 통화하자. (여유)"
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/95 backdrop-blur-xl animate-fade-in p-4 pt-24 md:p-8 md:pt-28 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#050505] shadow-[0_0_100px_rgba(99,102,241,0.2)] border border-indigo-900/40 flex flex-col md:h-[80vh] h-full rounded-sm overflow-hidden mb-20">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-indigo-900/30 bg-[#020202] z-20 relative shrink-0">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-sm border shadow-[0_0_10px_rgba(99,102,241,0.2)] ${isVip ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-900/10 border-indigo-500/20 text-indigo-500'}`}>
               <Swords size={20} />
            </div>
            <div className="flex flex-col">
              <span className={`font-mono text-[10px] tracking-[0.3em] uppercase font-bold animate-pulse ${isVip ? 'text-indigo-400' : 'text-indigo-500'}`}>
                 {isVip ? 'Advanced Psionics // Unlocked' : 'Social Dynamics // Level 8'}
              </span>
              <h2 className="text-white font-serif font-bold text-lg tracking-tight">FRAME CONTROL</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-indigo-500 transition-colors group">
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-grow overflow-y-auto bg-[#0a0a0a] text-indigo-100 font-sans relative selection:bg-indigo-500/30 selection:text-white scroll-smooth">
          
          {/* Hexagon Pattern Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
          />

          <div className="max-w-3xl mx-auto p-8 md:p-16 relative z-10 space-y-20">
            
            {/* Intro Section */}
            <div className="text-center space-y-8 animate-fade-in-up">
              <div className="inline-block border border-indigo-500/30 px-4 py-1.5 rounded-full bg-indigo-500/5 text-indigo-400 text-[10px] font-mono tracking-[0.3em] uppercase mb-4 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                 {isVip ? 'Classified Manipulation Tactics' : 'The Art of Dominance'}
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[1.1] text-white">
                대화는 <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-500">권력 투쟁이다.</span>
              </h1>
              <p className="font-serif text-xl text-white/60 italic max-w-2xl mx-auto leading-relaxed border-l-4 border-indigo-500/50 pl-6 text-left md:text-center mt-8">
                "세상에는 두 종류의 사람이 있습니다. <br/>
                자신의 프레임을 씌우는 자(갑)와, 타인의 프레임에 갇히는 자(을)."
              </p>
            </div>

            {/* Simulation: Beta vs Alpha */}
            <div className="bg-[#111] border border-indigo-900/30 rounded-sm overflow-hidden">
               <div className="flex border-b border-white/5">
                  <button 
                     onClick={() => setActiveScenario('negotiation')}
                     className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeScenario === 'negotiation' ? 'bg-indigo-900/20 text-indigo-400' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                     Situation A: Negotiation
                  </button>
                  <div className="w-[1px] bg-white/5" />
                  <button 
                     onClick={() => setActiveScenario('dating')}
                     className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeScenario === 'dating' ? 'bg-indigo-900/20 text-indigo-400' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                     Situation B: Relationship
                  </button>
               </div>

               <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Beta Frame */}
                  <div className="space-y-4 opacity-60 hover:opacity-100 transition-opacity">
                     <div className="flex items-center gap-2 text-gray-500">
                        <User size={16} />
                        <span className="text-xs font-mono uppercase font-bold">The Beta (을의 화법)</span>
                     </div>
                     <div className="bg-[#1a1a1a] p-4 rounded-tr-xl rounded-br-xl rounded-bl-xl border border-white/5 text-sm text-gray-400 leading-relaxed relative">
                        "{scenarios[activeScenario].beta}"
                        <div className="absolute top-0 left-0 w-1 h-full bg-gray-700" />
                     </div>
                     <p className="text-[10px] text-red-500 font-mono mt-2">
                        * Analysis: 상대방의 인정을 구걸함 (Seeking Validation). 프레임이 먹힘.
                     </p>
                  </div>

                  {/* Alpha Frame */}
                  <div className="space-y-4">
                     <div className="flex items-center gap-2 text-indigo-400">
                        <Crown size={16} />
                        <span className="text-xs font-mono uppercase font-bold">The Alpha (갑의 화법)</span>
                     </div>
                     <div className="bg-indigo-950/30 p-4 rounded-tr-xl rounded-br-xl rounded-bl-xl border border-indigo-500/30 text-sm text-white leading-relaxed relative shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                        "{scenarios[activeScenario].alpha}"
                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                     </div>
                     <p className="text-[10px] text-emerald-500 font-mono mt-2">
                        * Analysis: 자신의 기준을 통보함 (Setting Standards). 프레임을 장악함.
                     </p>
                  </div>
               </div>
            </div>

            {/* Technique 1: The Prize Frame */}
            <section className="space-y-6">
               <div className="flex items-center gap-4 text-indigo-500">
                  <span className="font-mono text-3xl font-black opacity-30">01</span>
                  <h3 className="text-2xl font-serif font-black uppercase tracking-tight text-white">
                     The Prize Frame (상품 프레임)
                  </h3>
               </div>
               <div className="pl-6 border-l border-indigo-900/50 space-y-4">
                  <p className="text-lg leading-relaxed text-indigo-100/80">
                     "제발 사주세요"라고 말하는 순간, 당신은 상품(Prize)이 아니라 구매자(Buyer)를 쫓는 입장이 됩니다.
                     반대로 행동하십시오. 당신이 <strong>'상(Prize)'</strong>이고, 고객이 당신을 얻기 위해 노력해야 합니다.
                  </p>
                  <div className="bg-[#111] p-6 rounded-sm border border-white/10 space-y-3">
                     <div className="flex gap-4 items-start">
                        <X size={18} className="text-red-500 mt-1 shrink-0" />
                        <span className="text-gray-500 line-through decoration-gray-600">"저희랑 계약해주시면 정말 열심히 하겠습니다!"</span>
                     </div>
                     <div className="flex gap-4 items-start">
                        <CheckCircle2 size={18} className="text-emerald-500 mt-1 shrink-0" />
                        <span className="text-white font-bold">"저희는 한 달에 딱 3곳의 클라이언트와만 작업합니다. 대표님 회사가 저희 기준(Fit)에 맞는지 먼저 검토해보겠습니다."</span>
                     </div>
                  </div>
               </div>
            </section>

            {/* Technique 2: Pattern Interrupt (Disrupting) */}
            <section className="space-y-6">
               <div className="flex items-center gap-4 text-indigo-500">
                  <span className="font-mono text-3xl font-black opacity-30">02</span>
                  <h3 className="text-2xl font-serif font-black uppercase tracking-tight text-white">
                     Defiance & Disrupt (도전과 파괴)
                  </h3>
               </div>
               <div className="pl-6 border-l border-indigo-900/50 space-y-4">
                  <p className="text-lg leading-relaxed text-indigo-100/80">
                     상대방이 무례한 질문이나 무리한 요구(Shit Test)를 할 때, 성실하게 대답하지 마십시오.
                     그것은 상대방의 프레임에 순응하는 것입니다. <strong>질문을 질문으로 받아치거나, 무시하십시오.</strong>
                  </p>
                  <div className="bg-[#111] p-6 rounded-sm border border-white/10 space-y-3">
                     <p className="text-xs text-indigo-400 font-mono mb-2 uppercase">Scenario: 고객이 "비싸네요, 깎아주세요"라고 할 때</p>
                     <div className="flex gap-4 items-start">
                        <X size={18} className="text-red-500 mt-1 shrink-0" />
                        <span className="text-gray-500 line-through decoration-gray-600">"아.. 그러면 10% 정도는 가능할 것 같습니다.." (순응)</span>
                     </div>
                     <div className="flex gap-4 items-start">
                        <CheckCircle2 size={18} className="text-emerald-500 mt-1 shrink-0" />
                        <span className="text-white font-bold">"맞습니다. 저희는 업계에서 가장 비쌉니다. 혹시 싼 게 비지떡이라는 말 믿으시나요? 저희는 싼 걸 찾으시는 분과는 맞지 않습니다." (도전)</span>
                     </div>
                  </div>
               </div>
            </section>

            {/* Technique 3: Time Dilation */}
            <section className="space-y-6">
               <div className="flex items-center gap-4 text-indigo-500">
                  <span className="font-mono text-3xl font-black opacity-30">03</span>
                  <h3 className="text-2xl font-serif font-black uppercase tracking-tight text-white">
                     Time Dilation (시간 왜곡)
                  </h3>
               </div>
               <div className="pl-6 border-l border-indigo-900/50 space-y-4">
                  <p className="text-lg leading-relaxed text-indigo-100/80">
                     권력자는 시간이 부족하고, 하수는 시간이 남습니다.
                     항상 <strong>'시간 제약(Time Constraint)'</strong>을 거십시오. 당신의 시간 가치를 높이는 가장 쉬운 방법입니다.
                  </p>
                  <div className="bg-[#111] p-6 rounded-sm border border-white/10 flex items-center justify-between">
                     <span className="text-white font-bold">"지금 미팅이 밀려 있어서 10분 정도만 통화 가능합니다. 핵심만 말씀해 주시겠습니까?"</span>
                     <Zap size={20} className="text-indigo-500 animate-pulse" />
                  </div>
               </div>
            </section>

            {/* --- CONDITIONAL FOOTER: VIP CONTENT vs FREE CTA --- */}
            <div className={`mt-20 border-t ${isVip ? 'border-indigo-500/30 bg-[#050505]' : 'border-indigo-900/30'} pt-16 pb-8 text-center space-y-10 relative`}>
               {!isVip ? (
                  // FREE MODE: THE CTA
                  <>
                     <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                           "을"의 인생을 <br/>
                           <span className="text-indigo-500 italic">멈추십시오.</span>
                        </h2>
                        <p className="text-indigo-200/60 font-serif italic text-lg">
                           "착한 사람은 무시당하고, 나쁜(Strong) 사람은 숭배받습니다. <br/>
                           상대를 내 프레임 안으로 가두는 30가지 실전 스크립트를 소유하십시오."
                        </p>
                     </div>

                     <div className="max-w-md mx-auto bg-gradient-to-r from-indigo-900/20 via-indigo-600/20 to-indigo-900/20 border border-indigo-500/30 p-1 rounded-sm">
                        <Button 
                           onClick={onCheckout}
                           className="w-full py-6 text-lg font-black uppercase tracking-[0.2em] bg-indigo-500 text-white border-none hover:bg-indigo-400 shadow-[0_0_40px_rgba(99,102,241,0.4)] animate-pulse-cta"
                        >
                           <span className="flex items-center justify-center gap-3">
                              <Lock size={20} />
                              Unlock Master Script
                              <ChevronRight size={20} />
                           </span>
                        </Button>
                     </div>
                     
                     <p className="text-[10px] font-mono text-indigo-500/60 uppercase tracking-widest">
                        Warning: Do not use for manipulation. Use for defense.
                     </p>
                  </>
               ) : (
                  // VIP MODE: ADVANCED PROTOCOLS (PART 2)
                  <div className="max-w-3xl mx-auto px-4 md:px-0 text-left">
                      <div className="text-center mb-16 space-y-4">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-mono uppercase tracking-widest">
                              <Eye size={12} /> Black Ops Declassified
                          </div>
                          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                              PART 2. <span className="text-indigo-500">Shadow Dominance</span>
                          </h2>
                          <p className="text-indigo-200/60 font-serif italic text-lg">
                              "협상의 테이블을 뒤엎고 룰을 새로 쓰는 금지된 기술입니다."
                          </p>
                      </div>

                      <div className="space-y-16">
                          {/* Module 4: The Takeaway */}
                          <section className="relative pl-8 border-l-2 border-indigo-500/30">
                              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#050505]" />
                              <h3 className="text-2xl font-bold text-white mb-4">04. 박탈 (The Takeaway)</h3>
                              <div className="space-y-4 text-indigo-100/80 leading-relaxed font-light text-lg">
                                  <p>
                                      "가장 강력한 협상력은 언제든 테이블을 떠날 수 있는 힘에서 나옵니다."
                                  </p>
                                  <p>
                                      상대가 당신을 간보거나 무리한 요구를 할 때, 협상을 <strong>'철회'</strong>하려는 제스처를 취하십시오.
                                      인간은 얻을 수 있는 이득보다, 손에 쥔 것을 잃는 공포에 더 민감합니다.
                                  </p>
                              </div>
                              <div className="mt-6 p-4 bg-[#111] border border-indigo-500/20 rounded-sm">
                                  <p className="font-mono text-xs text-indigo-300 mb-2">Script:</p>
                                  <p className="text-white italic">"대표님, 말씀을 들어보니 저희 서비스 방향성과는 핏(Fit)이 조금 안 맞는 것 같습니다. 억지로 진행하면 서로 손해일 테니 이번 건은 없던 일로 하시죠. 더 좋은 업체 찾으시길 바랍니다."</p>
                                  <p className="text-[10px] text-gray-500 mt-2">* 효과: 상대가 당황하며 오히려 매달리게 됨 ("아니, 그게 아니라요...")</p>
                              </div>
                          </section>

                          {/* Module 5: Moral High Ground */}
                          <section className="relative pl-8 border-l-2 border-indigo-500/30">
                              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#050505]" />
                              <h3 className="text-2xl font-bold text-white mb-4">05. 도덕적 우위 (Moral High Ground)</h3>
                              <div className="space-y-4 text-indigo-100/80 leading-relaxed font-light text-lg">
                                  <p>
                                      "상대를 비윤리적이거나 원칙 없는 사람으로 프레임 씌우십시오."
                                  </p>
                                  <p>
                                      상대가 가격을 깎으려 하거나 억지를 부릴 때, 돈 문제가 아니라 <strong>'신뢰와 원칙'</strong>의 문제로 치환하십시오.
                                      당신은 돈을 밝히는 게 아니라, 원칙을 지키는 숭고한 사람이 되어야 합니다.
                                  </p>
                              </div>
                              <div className="mt-6 p-4 bg-[#111] border border-indigo-500/20 rounded-sm">
                                  <p className="font-mono text-xs text-indigo-300 mb-2">Script:</p>
                                  <p className="text-white italic">"대표님, 저에게 원칙을 어기라고 말씀하시는 건가요? 저는 제 작업물의 퀄리티를 위해 정해진 비용 이하로는 절대 작업하지 않습니다. 퀄리티를 낮춰서라도 싼 걸 원하신다면, 제가 아니라 크몽에 있는 알바생을 찾으셨어야죠."</p>
                              </div>
                          </section>

                          {/* Module 6: Reverse Qualification */}
                          <section className="relative pl-8 border-l-2 border-indigo-500/30">
                              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#050505]" />
                              <h3 className="text-2xl font-bold text-white mb-4">06. 역자격 부여 (Reverse Qualification)</h3>
                              <div className="space-y-4 text-indigo-100/80 leading-relaxed font-light text-lg">
                                  <p>
                                      "면접관이 되십시오. 지원자가 되지 마십시오."
                                  </p>
                                  <p>
                                      고객이 당신을 평가하게 두지 말고, <strong>당신이 고객을 평가하십시오.</strong>
                                      "돈만 낸다고 다 해드리는 게 아닙니다. 이 프로젝트에 얼마나 진심이신지, 제가 도와드릴 가치가 있는지 먼저 입증해 주십시오."
                                  </p>
                              </div>
                              <div className="mt-6 p-4 bg-[#111] border border-indigo-500/20 rounded-sm">
                                  <p className="font-mono text-xs text-indigo-300 mb-2">Script:</p>
                                  <p className="text-white italic">"저희와 일하려면 사전 질문지를 작성해 주셔야 합니다. 내용을 검토해 보고, 저희가 도움을 드릴 수 있다고 판단될 때만 미팅을 진행합니다. 대충 작성하시면 반려될 수 있습니다."</p>
                              </div>
                          </section>
                      </div>
                      
                      <div className="flex justify-end mt-12 border-t border-indigo-900/30 pt-8">
                          <div className="text-right">
                              <span className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest block mb-1">Clearance Level</span>
                              <span className="text-3xl font-black text-white tracking-tighter">ARCHITECT</span>
                          </div>
                      </div>
                  </div>
               )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Icon
const CheckCircle2 = ({ size, className }: { size: number, className?: string }) => (
   <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
   >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
      <path d="m9 12 2 2 4-4"/>
   </svg>
);
