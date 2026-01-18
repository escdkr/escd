
import React, { useState } from 'react';
import { X, Crown, Diamond, MicOff, Scale, ChevronRight, LayoutTemplate, Palette, Sparkles, Fingerprint, Lock, Eye, Droplet, Type, Gift } from 'lucide-react';
import { Button } from './Button';

interface SilentAuthorityDocProps {
  onClose: () => void;
  onCheckout: () => void;
  isVip?: boolean;
}

export const SilentAuthorityDoc: React.FC<SilentAuthorityDocProps> = ({ onClose, onCheckout, isVip = false }) => {
  const [activeView, setActiveView] = useState<'loud' | 'silent'>('silent');

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/95 backdrop-blur-xl animate-fade-in p-4 pt-24 md:p-8 md:pt-28 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#080808] shadow-[0_0_100px_rgba(226,232,240,0.1)] border border-slate-700/30 flex flex-col md:h-[80vh] h-full rounded-sm overflow-hidden mb-20">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#020202] z-20 relative shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-slate-900 rounded-sm border border-slate-700">
               <Crown size={20} className="text-slate-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-400 font-mono text-[10px] tracking-[0.3em] uppercase font-bold animate-pulse">Brand Architecture // Level 9</span>
              <h2 className="text-white font-serif font-bold text-lg tracking-tight">SILENT AUTHORITY</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors group">
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-grow overflow-y-auto bg-[#0a0a0a] text-slate-300 font-serif relative selection:bg-slate-500/30 selection:text-white scroll-smooth">
          {/* Noise Texture */}
          <div className="absolute inset-0 noise-texture opacity-20 pointer-events-none" />
          
          <div className="max-w-3xl mx-auto p-8 md:p-16 relative z-10 space-y-20">
            
            {/* Intro: The Concept */}
            <div className="text-center space-y-8 animate-fade-in-up">
               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-slate-700 bg-black mb-4 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  <MicOff size={32} className="text-white" />
               </div>
               <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[1.1] text-white">
                  진정한 왕은 <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-400">소리치지 않는다.</span>
               </h1>
               <div className="w-12 h-[1px] bg-slate-700 mx-auto my-8" />
               <p className="text-lg text-slate-400 font-light leading-relaxed max-w-xl mx-auto">
                  "시끄러운 마케팅은 하수들의 전유물입니다. <br/>
                  명품관의 점원, 5성급 호텔의 로비, 롤스로이스의 엔진음... <br/>
                  압도적인 권위는 언제나 <strong className="text-white">침묵(Silence)</strong> 속에 존재합니다."
               </p>
            </div>

            {/* Interactive Simulation: Loud vs Silent */}
            <div className="space-y-6">
               <div className="flex justify-center items-center gap-4 mb-4">
                  <span className={`text-xs font-mono uppercase tracking-widest transition-colors ${activeView === 'loud' ? 'text-red-500 font-bold' : 'text-slate-600'}`}>Street Peddler (Loud)</span>
                  <button 
                     onClick={() => setActiveView(activeView === 'loud' ? 'silent' : 'loud')}
                     className="w-16 h-8 bg-slate-900 rounded-full border border-slate-700 relative p-1 transition-all"
                  >
                     <div className={`w-6 h-6 rounded-full shadow-md transition-transform duration-500 ${activeView === 'loud' ? 'translate-x-0 bg-red-500' : 'translate-x-8 bg-white'}`} />
                  </button>
                  <span className={`text-xs font-mono uppercase tracking-widest transition-colors ${activeView === 'silent' ? 'text-white font-bold' : 'text-slate-600'}`}>The King (Silent)</span>
               </div>

               <div className="relative aspect-[16/9] border border-slate-800 rounded-sm overflow-hidden bg-black transition-all duration-700">
                  {activeView === 'loud' ? (
                     <div className="w-full h-full bg-white flex flex-col items-center justify-center p-8 text-center space-y-4 animate-shake">
                        <h3 className="text-red-600 font-black text-5xl uppercase tracking-tighter shadow-sm">SALE! 90% OFF!</h3>
                        <p className="bg-yellow-400 text-black font-bold text-xl px-4 py-2 rotate-2">지금 사지 않으면 평생 후회!!!</p>
                        <div className="flex gap-2">
                           <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold animate-pulse">마감 임박</span>
                           <span className="bg-blue-600 text-white px-2 py-1 text-xs font-bold animate-pulse">오늘만 특가</span>
                        </div>
                        <p className="text-black text-xs font-sans">제발 사주세요. 정말 좋은 제품입니다. 1+1 행사 중입니다.</p>
                     </div>
                  ) : (
                     <div className="w-full h-full bg-[#050505] flex flex-col items-center justify-center p-8 text-center space-y-8 animate-fade-in">
                        <div className="w-12 h-12 border border-white/20 flex items-center justify-center rounded-full mb-4">
                           <Diamond size={20} className="text-white/80" strokeWidth={1} />
                        </div>
                        <h3 className="text-white font-serif font-medium text-3xl tracking-[0.2em] uppercase">The Collection</h3>
                        <p className="text-slate-500 text-xs font-sans tracking-widest uppercase opacity-60">Reserved for the few.</p>
                        <div className="w-8 h-[1px] bg-white/20" />
                     </div>
                  )}
               </div>
               <p className="text-center text-xs font-mono text-slate-500 uppercase tracking-widest">
                  {activeView === 'loud' ? "Target: 호갱 (Price Sensitive)" : "Target: VIP (Value Sensitive)"}
               </p>
            </div>

            {/* Law 1: Negative Space */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t border-slate-800 pt-16">
               <div className="space-y-6">
                  <span className="text-slate-500 font-mono text-xs tracking-[0.2em] uppercase">Law 01</span>
                  <h3 className="text-3xl font-bold text-white">여백은 사치(Luxury)다.</h3>
                  <p className="text-sm leading-loose text-slate-400">
                     빈곤한 디자인은 빈 공간을 견디지 못하고 정보를 꽉 채워 넣습니다.
                     반면, 부유한 디자인은 압도적인 여백을 둡니다.
                     <strong className="text-white block mt-2">"여백은 우리가 고객에게 아쉬울 것이 없다는 무언의 시위입니다."</strong>
                  </p>
               </div>
               <div className="aspect-square bg-[#111] border border-slate-800 flex items-center justify-center p-12">
                  <div className="text-center space-y-2">
                     <LayoutTemplate size={32} className="text-white mx-auto opacity-50" strokeWidth={1} />
                     <p className="text-[10px] text-slate-600 font-mono uppercase tracking-[0.3em]">Minimalism</p>
                  </div>
               </div>
            </section>

            {/* Law 2: The Velvet Rope */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t border-slate-800 pt-16">
               <div className="order-2 md:order-1 aspect-square bg-[#111] border border-slate-800 flex items-center justify-center p-12 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)]" />
                  <div className="text-center space-y-4 relative z-10">
                     <Scale size={32} className="text-white mx-auto opacity-50" strokeWidth={1} />
                     <div className="bg-white/5 border border-white/10 px-4 py-2 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        Invitation Only
                     </div>
                  </div>
               </div>
               <div className="order-1 md:order-2 space-y-6">
                  <span className="text-slate-500 font-mono text-xs tracking-[0.2em] uppercase">Law 02</span>
                  <h3 className="text-3xl font-bold text-white">벨벳 로프 (Velvet Rope)</h3>
                  <p className="text-sm leading-loose text-slate-400">
                     아무나 들어오라고 애원하지 마십시오.
                     클럽 입구의 빨간 로프처럼, <strong>'진입 장벽'</strong>을 세우십시오.
                     <strong className="text-white block mt-2">"인간은 거절당할수록 더 안으로 들어가고 싶어 하는 청개구리 심보가 있습니다."</strong>
                  </p>
               </div>
            </section>

            {/* Law 3: Semiotics */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t border-slate-800 pt-16 pb-10">
               <div className="space-y-6">
                  <span className="text-slate-500 font-mono text-xs tracking-[0.2em] uppercase">Law 03</span>
                  <h3 className="text-3xl font-bold text-white">기호학적 권위 (Semiotics)</h3>
                  <p className="text-sm leading-loose text-slate-400">
                     구구절절 설명하는 것은 하수입니다.
                     서체(Font), 질감(Texture), 컬러(Color)만으로 압도하십시오.
                     명조체(Serif)는 신뢰를, 블랙은 권력을 상징합니다.
                     <strong className="text-white block mt-2">"말하지 않고 증명하는 것. 그것이 브랜딩의 정점입니다."</strong>
                  </p>
               </div>
               <div className="aspect-square bg-[#111] border border-slate-800 flex items-center justify-center p-12">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="w-12 h-12 border border-slate-700 bg-slate-900 flex items-center justify-center"><Palette size={16} className="text-slate-500" /></div>
                     <div className="w-12 h-12 border border-slate-700 bg-slate-800 flex items-center justify-center"><Fingerprint size={16} className="text-slate-400" /></div>
                     <div className="w-12 h-12 border border-slate-700 bg-slate-700 flex items-center justify-center"><Sparkles size={16} className="text-slate-300" /></div>
                     <div className="w-12 h-12 border border-slate-700 bg-white flex items-center justify-center"><Crown size={16} className="text-black" /></div>
                  </div>
               </div>
            </section>

            {/* --- FOOTER: CONDITIONAL CONTENT (FREE CTA vs VIP ADVANCED) --- */}
            <div className="mt-20 border-t border-slate-800 bg-[#050505] relative">
               {!isVip ? (
                  // FREE MODE: THE CTA
                  <div className="pt-16 pb-8 text-center space-y-10">
                     <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                           권위는 구매하는 것이 아니라<br/>
                           <span className="text-slate-400 italic">설계하는 것입니다.</span>
                        </h2>
                        <p className="text-slate-500 font-serif italic text-lg">
                           "당신의 브랜드를 샤넬, 롤렉스급의 위상으로 올려줄<br/>
                           디자인 시스템과 가이드라인을 지금 소유하십시오."
                        </p>
                     </div>

                     <div className="max-w-md mx-auto bg-white/5 border border-white/10 p-1 rounded-sm">
                        <Button 
                           onClick={onCheckout}
                           className="w-full py-6 text-lg font-black uppercase tracking-[0.2em] bg-white text-black border-none hover:bg-slate-200 shadow-[0_0_40px_rgba(255,255,255,0.2)] animate-pulse-cta"
                        >
                           <span className="flex items-center justify-center gap-3">
                              <Crown size={20} />
                              Get Design System
                              <ChevronRight size={20} />
                           </span>
                        </Button>
                     </div>
                     
                     <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                        Includes: Font Pairings, Color Codes, Layout Grids, Tone & Manner Guide
                     </p>
                  </div>
               ) : (
                  // VIP MODE: ADVANCED PROTOCOLS (PART 2)
                  <div className="p-12">
                      <div className="text-center mb-16 space-y-4">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-mono uppercase tracking-widest">
                              <Lock size={12} /> Confidential Access
                          </div>
                          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                              PART 2. <span className="text-slate-400">INVISIBLE THRONE</span>
                          </h2>
                          <p className="text-slate-500 font-serif italic text-lg">
                              "보이지 않는 왕좌에 앉은 자만이 진정한 지배자입니다."
                          </p>
                      </div>

                      <div className="space-y-16">
                          {/* Module 4: Color Dominance */}
                          <section className="relative pl-8 border-l-2 border-slate-700">
                              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-500 border-4 border-[#050505]" />
                              <h3 className="text-2xl font-bold text-white mb-4">04. 색채의 지배 (Color Dominance)</h3>
                              <div className="space-y-4 text-slate-400 leading-relaxed font-light text-lg">
                                  <p>
                                      "빨간색(Sale)을 쓰는 순간, 당신의 브랜드 가치는 반토막 납니다."
                                  </p>
                                  <p>
                                      원색(Primary Colors)은 저렴합니다. 맥도날드, 이마트를 보십시오.
                                      반면, 권력은 어둠(Black) 속에 숨고, 욕망은 금빛(Gold)이나 은은한 무채색 속에 존재합니다.
                                      샤넬, 에르메스, 애플을 보십시오. 그들은 색을 아낍니다.
                                  </p>
                                  <p>
                                      색은 언어보다 빠릅니다. 고객의 망막에 닿는 순간, 0.1초 만에 
                                      '싸구려'인지 '명품'인지 판단이 끝납니다.
                                  </p>
                              </div>
                              <div className="mt-6 flex gap-4">
                                  <div className="w-12 h-12 bg-black border border-slate-700 rounded-full shadow-lg" title="Power" />
                                  <div className="w-12 h-12 bg-slate-200 rounded-full shadow-lg" title="Sophistication" />
                                  <div className="w-12 h-12 bg-[#BF953F] rounded-full shadow-lg" title="Desire" />
                              </div>
                          </section>

                          {/* Module 5: Typography of Power */}
                          <section className="relative pl-8 border-l-2 border-slate-700">
                              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-500 border-4 border-[#050505]" />
                              <h3 className="text-2xl font-bold text-white mb-4">05. 서체의 권력 (Typography of Power)</h3>
                              <div className="space-y-4 text-slate-400 leading-relaxed font-light text-lg">
                                  <p>
                                      "굵은 폰트(Bold)는 호객꾼의 목소리입니다."
                                  </p>
                                  <p>
                                      자신감 없는 자들이 목소리를 높이듯, 자신감 없는 브랜드가 폰트를 키우고 굵게 씁니다.
                                      진정한 권위자는 속삭입니다(Light & Serif). 작게 말해도 청중이 귀를 기울일 것을 알기 때문입니다.
                                  </p>
                                  <p>
                                      명조체(Serif)는 '전통'과 '신뢰'를, 고딕체(Sans)는 '현대'와 '효율'을 상징합니다.
                                      이 두 가지를 섞어 쓰지 마십시오. 당신의 목소리가 갈라집니다.
                                  </p>
                              </div>
                              <div className="mt-6 p-6 bg-white/5 border border-white/10 rounded-sm">
                                  <div className="flex justify-between items-center mb-2">
                                      <span className="font-serif font-light text-2xl text-white">The Authority</span>
                                      <span className="text-[10px] text-slate-500 uppercase tracking-widest">Serif / Light</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                      <span className="font-sans font-black text-2xl text-slate-600 line-through decoration-red-500">BUY NOW!!!</span>
                                      <span className="text-[10px] text-slate-500 uppercase tracking-widest">Sans / Black</span>
                                  </div>
                              </div>
                          </section>

                          {/* Module 6: The Ritual */}
                          <section className="relative pl-8 border-l-2 border-slate-700">
                              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-500 border-4 border-[#050505]" />
                              <h3 className="text-2xl font-bold text-white mb-4">06. 의식의 설계 (The Ritual)</h3>
                              <div className="space-y-4 text-slate-400 leading-relaxed font-light text-lg">
                                  <p>
                                      "언박싱(Unboxing)은 섹스입니다."
                                  </p>
                                  <p>
                                      전희(Foreplay)가 길수록 절정은 강렬합니다. 
                                      고객이 당신의 상품을 만나는 과정을 단순한 '배송'이 아닌 '의식(Ritual)'으로 설계하십시오.
                                  </p>
                                  <p>
                                      애플의 패키지를 뜯을 때 느껴지는 저항감, 롤스로이스의 문이 닫힐 때의 묵직함.
                                      이 사소한 <strong>마이크로 인터랙션(Micro-interaction)</strong>들이 고객을 단순 구매자에서
                                      '신도(Believer)'로 개종시킵니다.
                                  </p>
                              </div>
                              <div className="mt-6 flex items-center gap-2 text-slate-300 font-mono text-xs">
                                  <Gift size={14} className="text-white" />
                                  <span>Action: 패키징, 로딩 화면, 환영 이메일 점검</span>
                              </div>
                          </section>
                      </div>
                      
                      <div className="flex justify-end mt-12">
                          <div className="text-right">
                              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Clearance Level</span>
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
