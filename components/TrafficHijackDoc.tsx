
import React, { useState, useEffect } from 'react';
import { X, Magnet, Users, TrendingUp, ArrowRight, MousePointer2, AlertTriangle, Zap, Target, Share2, Anchor, Radio, Activity, Database } from 'lucide-react';
import { Button } from './Button';

interface TrafficHijackDocProps {
  onClose: () => void;
}

export const TrafficHijackDoc: React.FC<TrafficHijackDocProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'infiltration' | 'surfing' | 'lockin'>('infiltration');
  const [baitValue, setBaitValue] = useState(50);
  const [clickRate, setClickRate] = useState(0);

  // Calculate CTR based on bait value
  useEffect(() => {
    // Non-linear curve: Value needs to be high to get clicks, but too high might look like scam without trust
    const ctr = Math.min(15.4, (Math.pow(baitValue, 1.5) / 300) * 1.2).toFixed(1);
    setClickRate(parseFloat(ctr));
  }, [baitValue]);

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/95 backdrop-blur-xl animate-fade-in p-4 pt-24 md:p-8 md:pt-28 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#050505] shadow-[0_0_100px_rgba(163,230,53,0.15)] border border-lime-500/30 flex flex-col md:h-[85vh] h-full rounded-sm overflow-hidden mb-20">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-lime-900/30 bg-[#0a0a0a] z-20 relative shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-lime-900/10 rounded-sm border border-lime-500/20 shadow-[0_0_15px_rgba(163,230,53,0.3)]">
               <Magnet size={20} className="text-lime-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-lime-400 font-mono text-[10px] tracking-[0.3em] uppercase font-black animate-pulse">Traffic Protocol // Level 7</span>
              <h2 className="text-white font-serif font-bold text-lg tracking-tight">OPERATION: TRAFFIC HIJACK</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-lime-400 transition-colors group">
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-grow overflow-y-auto bg-[#050505] text-lime-100 font-sans relative selection:bg-lime-500/30 selection:text-white scroll-smooth">
          
          {/* Background Elements */}
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(163,230,53,.03)_25%,rgba(163,230,53,.03)_26%,transparent_27%,transparent_74%,rgba(163,230,53,.03)_75%,rgba(163,230,53,.03)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(163,230,53,.03)_25%,rgba(163,230,53,.03)_26%,transparent_27%,transparent_74%,rgba(163,230,53,.03)_75%,rgba(163,230,53,.03)_76%,transparent_77%,transparent)] bg-[length:50px_50px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lime-500/5 blur-[150px] pointer-events-none" />

          <div className="max-w-4xl mx-auto p-8 md:p-16 relative z-10 space-y-20">
            
            {/* Intro Section */}
            <div className="text-center space-y-8 animate-fade-in-up">
              <div className="inline-block border border-lime-500/30 px-4 py-1.5 rounded-full bg-lime-500/5 text-lime-400 text-[10px] font-mono tracking-[0.3em] uppercase mb-4 shadow-[0_0_20px_rgba(163,230,53,0.2)]">
                 0$ Marketing Strategy
              </div>
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[1.1] text-white">
                Traffic is not bought,<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">It's Hijacked.</span>
              </h1>
              <p className="font-serif text-xl text-white/60 italic max-w-2xl mx-auto leading-relaxed border-l-4 border-lime-500/50 pl-6 text-left md:text-center mt-8">
                "트래픽을 돈 주고 사지 마십시오. <br/>
                이미 사람들이 모여 있는 곳에 파이프를 꽂아, 당신의 저수지로 물길을 돌리십시오."
              </p>
            </div>

            {/* Warning Box */}
            <div className="bg-lime-950/20 border border-lime-500/30 p-6 rounded-sm flex gap-4 items-start">
               <Radio className="text-lime-500 shrink-0 mt-1" />
               <div className="space-y-2">
                  <h4 className="text-lime-500 font-bold uppercase text-xs tracking-widest">Growth Hacking Alert</h4>
                  <p className="text-sm text-lime-200/60 font-serif leading-relaxed">
                     이 기술은 광고비 없이 폭발적인 유입을 만들어냅니다. 
                     하지만 과도한 사용은 플랫폼(네이버, 인스타 등)의 제재를 받을 수 있으니, <strong>'분산 침투(Decentralized Attack)'</strong> 원칙을 준수하십시오.
                  </p>
               </div>
            </div>

            {/* Main Interactive Module */}
            <div className="space-y-8">
               {/* Tabs */}
               <div className="grid grid-cols-3 border-b border-lime-900/50">
                  <TabButton 
                     active={activeTab === 'infiltration'} 
                     onClick={() => setActiveTab('infiltration')}
                     label="1. Infiltration (침투)"
                     icon={<Target size={16} />}
                  />
                  <TabButton 
                     active={activeTab === 'surfing'} 
                     onClick={() => setActiveTab('surfing')}
                     label="2. Surfing (확산)"
                     icon={<TrendingUp size={16} />}
                  />
                  <TabButton 
                     active={activeTab === 'lockin'} 
                     onClick={() => setActiveTab('lockin')}
                     label="3. Lock-in (가두기)"
                     icon={<Anchor size={16} />}
                  />
               </div>

               {/* Content Area */}
               <div className="bg-[#0c0c0c] border border-lime-900/30 p-8 md:p-10 rounded-b-sm min-h-[400px] relative overflow-hidden">
                  
                  {activeTab === 'infiltration' && (
                     <div className="space-y-10 animate-fade-in">
                        <div className="space-y-4">
                           <h3 className="text-2xl font-bold text-white uppercase tracking-wide flex items-center gap-3">
                              <span className="text-lime-500">01.</span> The Trojan Horse (트로이의 목마)
                           </h3>
                           <p className="text-gray-400 font-light leading-relaxed">
                              커뮤니티나 카페에 "이거 사세요"라고 글을 쓰면 바로 강퇴당합니다. 
                              대신 <strong>'압도적인 무료 정보'</strong>를 선물하십시오. 
                              사람들은 선물을 받기 위해 스스로 성문을 엽니다.
                           </p>
                        </div>

                        {/* Simulator */}
                        <div className="bg-black/50 border border-lime-900/50 p-6 rounded-sm space-y-6">
                           <div className="flex justify-between items-end">
                              <label className="text-xs font-mono uppercase text-lime-500 tracking-widest mb-2 block">Bait Value Simulator</label>
                              <div className="text-right">
                                 <span className="text-3xl font-black text-white">{clickRate}%</span>
                                 <span className="text-[10px] text-gray-500 block uppercase tracking-widest">Est. CTR</span>
                              </div>
                           </div>
                           
                           <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              value={baitValue} 
                              onChange={(e) => setBaitValue(parseInt(e.target.value))}
                              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-lime-500"
                           />
                           
                           <div className="grid grid-cols-3 gap-4 text-center">
                              <div className={`p-3 border rounded-sm transition-all ${baitValue < 30 ? 'border-red-500 bg-red-900/20 text-red-400' : 'border-white/5 text-gray-600 opacity-50'}`}>
                                 <div className="text-xs font-bold mb-1">Low Value</div>
                                 <div className="text-[10px]">"제 상품 좋아요"</div>
                              </div>
                              <div className={`p-3 border rounded-sm transition-all ${baitValue >= 30 && baitValue < 70 ? 'border-yellow-500 bg-yellow-900/20 text-yellow-400' : 'border-white/5 text-gray-600 opacity-50'}`}>
                                 <div className="text-xs font-bold mb-1">Mid Value</div>
                                 <div className="text-[10px]">"정보+홍보 섞기"</div>
                              </div>
                              <div className={`p-3 border rounded-sm transition-all ${baitValue >= 70 ? 'border-lime-500 bg-lime-900/20 text-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.2)]' : 'border-white/5 text-gray-600 opacity-50'}`}>
                                 <div className="text-xs font-bold mb-1">High Value</div>
                                 <div className="text-[10px]">"전자책 무료 배포"</div>
                              </div>
                           </div>
                           
                           <p className="text-xs text-gray-400 text-center border-t border-white/5 pt-4">
                              {baitValue < 30 && "결과: 강퇴 및 차단. 트래픽 0."}
                              {baitValue >= 30 && baitValue < 70 && "결과: 약간의 유입. 하지만 의심을 삼."}
                              {baitValue >= 70 && "결과: 폭발적 반응. 댓글에 '이메일'을 남기며 자료를 요청함."}
                           </p>
                        </div>
                     </div>
                  )}

                  {activeTab === 'surfing' && (
                     <div className="space-y-10 animate-fade-in">
                        <div className="space-y-4">
                           <h3 className="text-2xl font-bold text-white uppercase tracking-wide flex items-center gap-3">
                              <span className="text-lime-500">02.</span> Algorithm Surfing (파도타기)
                           </h3>
                           <p className="text-gray-400 font-light leading-relaxed">
                              파도를 직접 만들려 하지 마십시오. 이미 일어나고 있는 파도(Trend)에 올라타십시오.
                              실시간 검색어, 밈(Meme), 논란... 사람들이 이미 주목하고 있는 키워드에 당신의 상품을 <strong>'기생(Parasite)'</strong> 시키십시오.
                           </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="p-6 border border-white/10 bg-white/5 rounded-sm hover:border-lime-500/50 transition-colors group">
                              <div className="flex items-center gap-3 mb-3">
                                 <Activity size={18} className="text-lime-500" />
                                 <h4 className="font-bold text-white">Trend Jacking</h4>
                              </div>
                              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                                 현재 유행하는 뉴스나 이슈를 당신의 비즈니스와 연결하여 콘텐츠를 발행하십시오.
                              </p>
                              <div className="bg-black p-3 text-[10px] font-mono text-gray-500 rounded-sm">
                                 Ex: "오징어게임 열풍? -> 오징어게임에서 배우는 협상 전략 3가지"
                              </div>
                           </div>

                           <div className="p-6 border border-white/10 bg-white/5 rounded-sm hover:border-lime-500/50 transition-colors group">
                              <div className="flex items-center gap-3 mb-3">
                                 <Share2 size={18} className="text-lime-500" />
                                 <h4 className="font-bold text-white">Viral Loop</h4>
                              </div>
                              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                                 유저가 다른 유저를 데려오게 만드십시오. "공유하면 추가 혜택"은 구식입니다. "공유해야만 볼 수 있는" 구조를 만드십시오.
                              </p>
                              <div className="bg-black p-3 text-[10px] font-mono text-gray-500 rounded-sm">
                                 Ex: "이 심리테스트 결과는 친구 3명에게 공유해야 확인 가능합니다."
                              </div>
                           </div>
                        </div>
                     </div>
                  )}

                  {activeTab === 'lockin' && (
                     <div className="space-y-10 animate-fade-in">
                        <div className="space-y-4">
                           <h3 className="text-2xl font-bold text-white uppercase tracking-wide flex items-center gap-3">
                              <span className="text-lime-500">03.</span> The Dam Construction (댐 건설)
                           </h3>
                           <p className="text-gray-400 font-light leading-relaxed">
                              트래픽은 흐르는 물입니다. 그냥 두면 바다(플랫폼)로 흘러가 사라집니다.
                              반드시 당신의 <strong>DB(이메일, 카톡 채널)</strong>라는 댐에 가두어야 합니다.
                              플랫폼이 망해도 당신의 고객은 남아야 합니다.
                           </p>
                        </div>

                        <div className="relative h-48 border border-lime-900/30 rounded-sm overflow-hidden flex items-center justify-center bg-black">
                           <div className="absolute inset-0 flex items-center justify-between px-10 opacity-30">
                              <div className="text-center">
                                 <Users size={32} className="mx-auto mb-2 text-white" />
                                 <span className="text-xs uppercase">Anonymous Traffic</span>
                              </div>
                              <ArrowRight size={24} className="text-lime-500 animate-pulse" />
                              <div className="text-center">
                                 <div className="w-16 h-20 border-2 border-lime-500 rounded-sm mx-auto mb-2 flex items-center justify-center">
                                    <div className="w-12 h-1 bg-lime-500/50" />
                                 </div>
                                 <span className="text-xs uppercase text-lime-500 font-bold">Landing Page</span>
                              </div>
                              <ArrowRight size={24} className="text-lime-500 animate-pulse delay-100" />
                              <div className="text-center">
                                 <Database size={32} className="mx-auto mb-2 text-gold" />
                                 <span className="text-xs uppercase text-gold font-bold">Owned Asset (DB)</span>
                              </div>
                           </div>
                           
                           <div className="absolute bottom-4 text-[10px] font-mono text-lime-500/60 uppercase tracking-widest">
                              Conversion Flow Visualization
                           </div>
                        </div>

                        <div className="bg-lime-900/10 border-l-2 border-lime-500 p-4">
                           <p className="text-sm text-lime-100 italic">
                              "유튜브 구독자 10만 명보다, 이메일 구독자 1,000명이 더 큰 돈이 됩니다. <br/>
                              유튜브는 알고리즘이 통제하지만, 이메일은 당신이 통제하기 때문입니다."
                           </p>
                        </div>
                     </div>
                  )}

               </div>
            </div>

            {/* Footer Signoff */}
            <div className="pt-12 border-t border-lime-900/30 flex justify-between items-end">
               <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-lime-600/70">
                     Protocol Status: Ready
                  </div>
                  <div className="flex items-center gap-2 text-lime-500 font-bold uppercase tracking-widest text-xs">
                     <MousePointer2 size={14} />
                     Clickstream Hijacking Active
                  </div>
               </div>
               <div className="text-right">
                  <p className="font-serif italic text-white/40 text-sm">"Be where the eyes are."</p>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; label: string; icon: React.ReactNode }> = ({ active, onClick, label, icon }) => (
   <button 
      onClick={onClick}
      className={`flex items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${
         active 
            ? 'border-lime-500 text-lime-500 bg-lime-500/5' 
            : 'border-transparent text-gray-500 hover:text-white hover:bg-white/5'
      }`}
   >
      {icon}
      <span className="hidden md:inline">{label}</span>
   </button>
);
