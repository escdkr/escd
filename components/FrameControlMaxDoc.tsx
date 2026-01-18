
import React, { useState, useEffect } from 'react';
import { X, Crown, Swords, Eye, Mic, Activity, ChevronRight, Play, Square, Pause, Zap, Shield, Target, Volume2, Maximize, MinusCircle, PlusCircle } from 'lucide-react';
import { Button } from './Button';

interface FrameControlMaxDocProps {
  onClose: () => void;
}

export const FrameControlMaxDoc: React.FC<FrameControlMaxDocProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'distortion' | 'silence' | 'reframing'>('distortion');
  
  // Simulation States
  const [frameStrength, setFrameStrength] = useState(50);
  const [simulationOutcome, setSimulationOutcome] = useState("Neutral Stand-off");
  
  const [isSilenceActive, setIsSilenceActive] = useState(false);
  const [silenceDuration, setSilenceDuration] = useState(0);

  // Reality Distortion Logic
  useEffect(() => {
    if (frameStrength < 30) setSimulationOutcome("Submissive (Frame Lost)");
    else if (frameStrength < 60) setSimulationOutcome("Negotiation (Neutral)");
    else if (frameStrength < 90) setSimulationOutcome("Dominant (Frame Set)");
    else setSimulationOutcome("Reality Distortion (Cult Leader Status)");
  }, [frameStrength]);

  // Silence Generator Logic
  useEffect(() => {
    let interval: number;
    if (isSilenceActive) {
        interval = window.setInterval(() => {
            setSilenceDuration(prev => prev + 0.1);
        }, 100);
    }
    return () => clearInterval(interval);
  }, [isSilenceActive]);

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-[#02010a]/95 backdrop-blur-3xl animate-fade-in p-4 pt-24 md:p-8 md:pt-28 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#05020D] shadow-[0_0_200px_rgba(124,58,237,0.15)] border border-purple-900/40 flex flex-col md:h-[85vh] h-full rounded-sm overflow-hidden mb-20">
        
        {/* Header - Grand Master Edition */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-purple-900/30 bg-[#020105] z-20 relative shrink-0">
          <div className="flex items-center gap-6">
            <div className="p-3 bg-gradient-to-br from-purple-900/20 to-black rounded-full border border-purple-500/30 shadow-[0_0_25px_rgba(124,58,237,0.4)]">
               <Crown size={28} className="text-purple-400" />
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-purple-500 font-mono text-[9px] tracking-[0.4em] uppercase font-black flex items-center gap-2">
                 <Zap size={10} className="fill-purple-500" /> Grand Master Class
              </span>
              <h2 className="text-white font-serif font-black text-2xl tracking-tight leading-none">FRAME CONTROL: THE MAX</h2>
            </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-900/10 text-purple-300/60 text-[10px] font-mono uppercase tracking-widest">
                System: Reality Hacking
             </div>
             <button onClick={onClose} className="text-white/40 hover:text-purple-400 transition-colors group p-2">
               <X size={32} className="group-hover:rotate-90 transition-transform duration-500 stroke-[1.5]" />
             </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex-grow flex flex-col lg:flex-row overflow-hidden bg-[#080412] relative">
           {/* Dynamic Background */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(124,58,237,0.08)_0%,_transparent_60%)] pointer-events-none" />
           <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(124,58,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none opacity-50" />

           {/* Sidebar Navigation */}
           <aside className="w-full lg:w-80 bg-[#030108] border-r border-purple-900/20 flex flex-col shrink-0 z-10">
              <div className="p-8 space-y-8">
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-purple-500 uppercase tracking-widest font-bold mb-4 opacity-70">Core Modules</h4>
                    <NavBtn 
                       active={activeTab === 'distortion'} 
                       onClick={() => setActiveTab('distortion')}
                       label="Reality Distortion" 
                       sub="현실 왜곡장 시뮬레이터"
                       icon={<Activity size={20}/>} 
                    />
                    <NavBtn 
                       active={activeTab === 'silence'} 
                       onClick={() => setActiveTab('silence')} 
                       label="The Void (Silence)" 
                       sub="침묵의 공포 생성기"
                       icon={<Volume2 size={20}/>} 
                    />
                    <NavBtn 
                       active={activeTab === 'reframing'} 
                       onClick={() => setActiveTab('reframing')} 
                       label="Moral Reframing" 
                       sub="도덕적 우위 선점"
                       icon={<Target size={20}/>} 
                    />
                 </div>
              </div>
              
              <div className="mt-auto p-8 border-t border-purple-900/20 bg-purple-900/5">
                 <div className="flex items-center gap-3 text-purple-300 mb-2 opacity-80">
                    <Shield size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Mental Shielding</span>
                 </div>
                 <p className="text-[10px] text-purple-200/40 leading-relaxed">
                    "상대의 감정에 반응(React)하지 마십시오. 관찰(Observe)하십시오. 반응하는 자가 지배당합니다."
                 </p>
              </div>
           </aside>

           {/* Main Stage */}
           <main className="flex-grow relative overflow-y-auto custom-scrollbar p-8 md:p-16">
              
              {/* MODULE 1: REALITY DISTORTION SIMULATOR */}
              {activeTab === 'distortion' && (
                 <div className="space-y-12 animate-fade-in-up max-w-4xl mx-auto">
                    <div className="space-y-6 text-center">
                       <h1 className="text-4xl md:text-6xl font-black text-white font-serif uppercase tracking-tighter leading-none">
                          Reality <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Distortion.</span>
                       </h1>
                       <p className="text-lg text-purple-200/60 font-light max-w-2xl mx-auto leading-relaxed">
                          "현실은 고정된 것이 아닙니다. 더 강한 프레임을 가진 사람의 의지대로 굽어집니다. 당신의 프레임 강도(Frame Strength)를 조절해보십시오."
                       </p>
                    </div>

                    {/* Interactive Simulator */}
                    <div className="bg-[#0c051d] border border-purple-500/30 rounded-sm p-10 relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-32 bg-purple-600/10 blur-[100px] pointer-events-none group-hover:bg-purple-600/20 transition-all duration-1000" />
                       
                       {/* Result Display */}
                       <div className="mb-12 text-center space-y-4">
                          <div className={`text-xs font-mono uppercase tracking-[0.3em] transition-colors ${frameStrength > 80 ? 'text-purple-400 font-bold' : 'text-gray-500'}`}>Current Status</div>
                          <div className={`text-4xl font-serif font-black transition-all duration-300 ${
                             frameStrength > 90 ? 'text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] scale-110' : 
                             frameStrength > 60 ? 'text-purple-200' : 'text-gray-600 blur-[1px]'
                          }`}>
                             {simulationOutcome}
                          </div>
                       </div>

                       {/* Controls */}
                       <div className="space-y-8 max-w-lg mx-auto">
                          <div className="flex justify-between text-xs font-bold text-purple-300/50 uppercase tracking-widest">
                             <span>Submissive</span>
                             <span>Neutral</span>
                             <span>Dominant</span>
                             <span>God</span>
                          </div>
                          <input 
                             type="range" 
                             min="0" 
                             max="100" 
                             value={frameStrength} 
                             onChange={(e) => setFrameStrength(parseInt(e.target.value))}
                             className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400"
                          />
                          <p className="text-center text-sm text-gray-400 font-mono min-h-[40px]">
                             {frameStrength < 30 && "\"죄송합니다, 제가 실수했네요...\" (사과 남발)"}
                             {frameStrength >= 30 && frameStrength < 60 && "\"글쎄요, 서로 입장을 조율해볼까요?\" (타협 시도)"}
                             {frameStrength >= 60 && frameStrength < 90 && "\"제 기준은 명확합니다. 따르시거나, 떠나십시오.\" (선긋기)"}
                             {frameStrength >= 90 && "\"당신이 이 기회를 놓치는 건 인생 최대의 실수입니다.\" (현실 왜곡)"}
                          </p>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
                          <h4 className="text-purple-400 font-bold mb-2 uppercase tracking-wide text-sm">Key Tactic: Re-Framing</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">
                             상대가 "비싸네요"라고 공격할 때, "할인해 드릴게요"라고 방어하지 마십시오. 그것은 상대의 프레임에 갇히는 것입니다.
                             대신 <strong className="text-white">"가치 없는 것에 돈을 쓰는 게 더 비싼 것 아닐까요?"</strong>라고 되물어 프레임을 '가격'에서 '가치'로 바꾸십시오.
                          </p>
                       </div>
                       <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
                          <h4 className="text-purple-400 font-bold mb-2 uppercase tracking-wide text-sm">Key Tactic: Moral Authority</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">
                             단순히 이득을 제안하지 말고, <strong className="text-white">'대의명분'</strong>을 제시하십시오.
                             "이건 당신을 위한 게 아닙니다. 당신의 가족을 지키기 위한 것입니다." 
                             상대가 거절하면 비도덕적인 사람이 되는 상황을 만드십시오.
                          </p>
                       </div>
                    </div>
                 </div>
              )}

              {/* MODULE 2: THE VOID (SILENCE GENERATOR) */}
              {activeTab === 'silence' && (
                 <div className="space-y-12 animate-fade-in-up max-w-4xl mx-auto">
                    <div className="space-y-6 text-center">
                       <h1 className="text-4xl md:text-6xl font-black text-white font-serif uppercase tracking-tighter leading-none">
                          The <span className="text-gray-500">Void.</span>
                       </h1>
                       <p className="text-lg text-purple-200/60 font-light max-w-2xl mx-auto leading-relaxed">
                          "말을 멈추십시오. 침묵은 상대방에게 상상할 수 없는 공포와 압박감을 줍니다. 
                          가장 강한 사람은 가장 긴 침묵을 견디는 사람입니다."
                       </p>
                    </div>

                    <div className="bg-black border border-gray-800 rounded-sm p-12 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)] pointer-events-none" />
                       
                       <div className="relative z-10 space-y-8">
                          <div className={`text-8xl font-mono font-black tracking-tighter transition-all duration-200 ${isSilenceActive ? 'text-white scale-110' : 'text-gray-800'}`}>
                             {silenceDuration.toFixed(1)}<span className="text-2xl text-gray-600">s</span>
                          </div>
                          
                          <div className="flex justify-center gap-4">
                             {!isSilenceActive ? (
                                <button 
                                   onClick={() => { setIsSilenceActive(true); setSilenceDuration(0); }}
                                   className="flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-all rounded-sm"
                                >
                                   <Maximize size={18} /> Initiate Silence
                                </button>
                             ) : (
                                <button 
                                   onClick={() => setIsSilenceActive(false)}
                                   className="flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-bold uppercase tracking-widest hover:bg-red-500 transition-all rounded-sm animate-pulse"
                                >
                                   <Pause size={18} /> Break Silence
                                </button>
                             )}
                          </div>

                          <p className={`text-sm font-serif italic transition-opacity duration-500 ${isSilenceActive ? 'opacity-100 text-purple-400' : 'opacity-0'}`}>
                             {silenceDuration < 3 && "상대가 눈치를 보기 시작합니다..."}
                             {silenceDuration >= 3 && silenceDuration < 6 && "상대의 불안감이 증폭됩니다. 입을 열고 싶어 합니다..."}
                             {silenceDuration >= 6 && silenceDuration < 10 && "상대가 변명을 시작합니다. 프레임이 무너졌습니다."}
                             {silenceDuration >= 10 && "Complete Submission. 당신이 지배했습니다."}
                          </p>
                       </div>
                    </div>
                 </div>
              )}

              {/* MODULE 3: REFRAMING (Interactive) */}
              {activeTab === 'reframing' && (
                 <div className="space-y-12 animate-fade-in-up max-w-4xl mx-auto">
                    <div className="space-y-6 text-center">
                       <h1 className="text-4xl md:text-6xl font-black text-white font-serif uppercase tracking-tighter leading-none">
                          Moral <span className="text-purple-500">Reframing</span>
                       </h1>
                       <p className="text-lg text-purple-200/60 font-light max-w-2xl mx-auto leading-relaxed">
                          "논쟁에서 이기려 하지 마십시오. 상대방을 '악당'으로, 자신을 '피해자' 혹은 '정의의 사도'로 재정의(Reframe)하십시오."
                       </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                       <ReframeCard 
                          attack={"Attack: \"가격이 너무 비싸요. 사기 치는 거 아니에요?\""}
                          defense={"Beta: \"아니에요, 저희 원가가 높아서 어쩔 수 없습니다...\""}
                          counter={"Grand Master: \"가격을 깎아서 퀄리티를 낮추는 게 고객님께 더 큰 사기 아닐까요? 저는 제 작품에 거짓말을 하기 싫습니다.\""}
                       />
                       <ReframeCard 
                          attack={"Attack: \"왜 연락이 이렇게 늦어요?\" (연인/클라이언트)"}
                          defense={"Beta: \"죄송해요 ㅠㅠ 너무 바빴어요. 화푸세요...\""}
                          counter={"Grand Master: \"저는 집중할 때 폰을 안 봅니다. 당신과 있을 때도 폰만 보는 사람을 원하시나요?\" (상대의 불만을 '집중력'이라는 가치로 리프레임)"}
                       />
                       <ReframeCard 
                          attack={"Attack: \"너 변했어. 예전엔 착했는데.\""}
                          defense={"Beta: \"내가 뭐 잘못했어? 미안해...\""}
                          counter={"Grand Master: \"성장한 거지. 너도 언제까지 예전 모습으로만 살 순 없잖아?\" (변화를 '성장'으로, 상대를 '정체된 사람'으로 규정)"}
                       />
                    </div>
                 </div>
              )}

           </main>
        </div>
      </div>
    </div>
  );
};

const NavBtn: React.FC<{ active: boolean; onClick: () => void; label: string; sub: string; icon: React.ReactNode }> = ({ active, onClick, label, sub, icon }) => (
   <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-6 py-5 text-left transition-all duration-300 border-l-2 group ${
         active 
            ? 'border-purple-500 bg-purple-500/10 text-white' 
            : 'border-transparent text-gray-500 hover:text-white hover:bg-white/[0.02]'
      }`}
   >
      <div className={`transition-colors ${active ? 'text-purple-400' : 'text-gray-600 group-hover:text-white'}`}>
         {icon}
      </div>
      <div>
         <span className="block text-sm font-bold font-serif tracking-wide uppercase">{label}</span>
         <span className={`block text-[10px] font-mono mt-1 ${active ? 'text-purple-300/60' : 'text-gray-600'}`}>{sub}</span>
      </div>
   </button>
);

const ReframeCard: React.FC<{ attack: string; defense: string; counter: string }> = ({ attack, defense, counter }) => (
   <div className="bg-[#0c051d] border border-white/10 p-8 rounded-sm space-y-6 hover:border-purple-500/30 transition-all group">
      <div className="p-4 bg-red-900/10 border-l-2 border-red-500 text-red-200 text-sm font-serif italic opacity-80">
         {attack}
      </div>
      <div className="pl-8 space-y-4">
         <div className="text-gray-500 text-xs line-through decoration-gray-600">
            {defense}
         </div>
         <div className="flex gap-4 items-start">
            <ChevronRight className="text-purple-500 shrink-0 mt-1" size={16} />
            <div className="text-white font-bold text-sm leading-relaxed">
               {counter}
            </div>
         </div>
      </div>
   </div>
);
