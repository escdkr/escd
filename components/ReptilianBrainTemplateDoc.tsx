
import React, { useState } from 'react';
import { X, Zap, Skull, Heart, Coffee, ArrowRight, Copy, AlertCircle, Brain, Target, Lock, ChevronRight, Timer, RefreshCw, FileText, Download, LayoutTemplate, Mail, Megaphone, CheckSquare, Package, Unlock, Eye, Sparkles, Scale, AlertTriangle } from 'lucide-react';
import { Button } from './Button';
import { useSystem } from './SystemCore';

interface ReptilianBrainTemplateDocProps {
  onClose: () => void;
  onCheckout: () => void;
  isVip?: boolean;
}

export const ReptilianBrainTemplateDoc: React.FC<ReptilianBrainTemplateDocProps> = ({ onClose, onCheckout, isVip = false }) => {
  const { toast, sounds } = useSystem();
  const [activeTrigger, setActiveTrigger] = useState<'survival' | 'reproduction' | 'laziness'>('survival');
  const [productName, setProductName] = useState('');
  const [generatedCopy, setGeneratedCopy] = useState<{ survival: string; reproduction: string; laziness: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [activeCheat, setActiveCheat] = useState<'hero' | 'ad' | 'email'>('hero');

  const copyToClipboard = (text: string) => {
    alert(`[COPIED] 클립보드에 저장되었습니다.\n"${text}"`);
  };

  const handleGenerate = () => {
    if (!productName) {
        toast.warning("Target Missing. Enter product name.", "INPUT ERROR");
        return;
    }
    
    // VIP ONLY CHECK for Generator
    if (!isVip) {
        sounds.error();
        // toast.error("Access Denied. Upgrade to VIP to use Neuro-Copy Generator.", "RESTRICTED FEATURE");
        // Instead of toast, maybe shake or visual cue? Toast is fine.
        return;
    }

    setIsGenerating(true);
    sounds.play('access');

    setTimeout(() => {
        setGeneratedCopy({
            survival: `"${productName} 없이 버티는 것은 자살 행위입니다. 당신의 경쟁자는 이미 사용하고 있습니다."`,
            reproduction: `"모두가 당신을 쳐다보게 될 것입니다. ${productName} 하나로 압도적인 지위를 증명하십시오."`,
            laziness: `"손가락 하나 까딱하지 마십시오. ${productName}가 당신 대신 모든 골치 아픈 일을 처리합니다."`
        });
        setIsGenerating(false);
        sounds.play('success');
    }, 1500);
  };

  const triggers = {
    survival: {
      color: 'text-red-500',
      borderColor: 'border-red-500',
      bgColor: 'bg-red-500',
      shadow: 'shadow-red-500/20',
      icon: <Skull size={24} />,
      title: "SURVIVAL (생존/공포)",
      desc: "고객은 '더 좋은 것'보다 '잃는 것'에 3배 더 민감하게 반응합니다. 이득(Gain)이 아니라 고통(Pain)을 파십시오.",
      examples: [
        { before: "최첨단 보안 시스템을 판매합니다.", after: "당신이 잠든 사이, 강도가 문을 따는 데 걸리는 시간은 단 3초입니다." },
        { before: "종합 비타민으로 건강을 챙기세요.", after: "매일 아침 피로 때문에 죽고 싶다는 생각을 하십니까?" },
        { before: "노후 대비 연금 상품입니다.", after: "폐지 줍는 노인이 되지 않으려면 지금 당장 준비해야 합니다." }
      ]
    },
    reproduction: {
      color: 'text-pink-500',
      borderColor: 'border-pink-500',
      bgColor: 'bg-pink-500',
      shadow: 'shadow-pink-500/20',
      icon: <Heart size={24} />,
      title: "REPRODUCTION (번식/매력)",
      desc: "모든 인간은 타인보다 우월해지고 싶어 합니다. 상품이 아니라 '사회적 지위'와 '성적 매력'을 파십시오.",
      examples: [
        { before: "이태리 최고급 원단 슈트입니다.", after: "동창회에 입고 나가는 순간, 모두가 당신을 쳐다보게 됩니다." },
        { before: "영어 회화 실력을 늘려보세요.", after: "해외 여행지에서 매력적인 이성과의 대화를 주도하십시오." },
        { before: "고성능 스포츠카입니다.", after: "그녀를 조수석에 태우는 가장 빠른 방법입니다." }
      ]
    },
    laziness: {
      color: 'text-lime-400',
      borderColor: 'border-lime-400',
      bgColor: 'bg-lime-400',
      shadow: 'shadow-lime-400/20',
      icon: <Coffee size={24} />,
      title: "LAZINESS (게으름/보존)",
      desc: "뇌는 에너지를 쓰는 것을 싫어합니다. '노력 없이', '즉시', '알아서' 해결된다는 것을 강조하십시오.",
      examples: [
        { before: "꾸준히 운동하면 살이 빠집니다.", after: "숨만 쉬어도 지방이 타는 기적의 수면 다이어트." },
        { before: "주식 공부를 열심히 하세요.", after: "따라 하기만 하면 되는 상위 1%의 매매 복사기." },
        { before: "청소하는 방법을 알려드립니다.", after: "손가락 하나 까딱하지 않고 집안일을 끝내십시오." }
      ]
    }
  };

  const currentTrigger = triggers[activeTrigger];

  const cheatsheets = {
    hero: {
        title: "Landing Page Hero (상세페이지 도입부)",
        desc: "고객이 3초 안에 이탈하지 않게 만드는 'Hook' 구조입니다.",
        template: `"결론부터 말씀드립니다. 이 [제품]을 쓰면 [구체적 혜택]을 얻습니다.\n만약 거짓이라면 [강력한 보상/환불]하겠습니다.\n당신이 [문제점]으로 고통받는 이유는 노력이 부족해서가 아닙니다.\n도구가 틀렸기 때문입니다."`,
        icon: <LayoutTemplate size={18} />
    },
    ad: {
        title: "Social Ad (SNS 광고 문구)",
        desc: "스크롤을 멈추게 하는 도파민 자극형 문장입니다.",
        template: `"경고: 이 글을 읽으면 더 이상 [기존 제품]을 쓸 수 없게 됩니다.\n아직도 [문제점] 때문에 스트레스 받으세요?\n[솔루션] 하나면 [기간] 만에 해결됩니다.\n딱 3일만 써보세요. 마음에 안 들면 반품하세요."`,
        icon: <Megaphone size={18} />
    },
    email: {
        title: "Cold Email (콜드 메일/제안서)",
        desc: "스팸함으로 직행하지 않고 클릭을 유도하는 제목 패턴입니다.",
        template: `제목: "[담당자 이름]님, [상대방 회사]에 치명적인 실수를 저지르고 계십니다."\n\n안녕하세요, [제안자]입니다.\n귀사의 [프로젝트]를 보다가 10분 만에 매출을 2배 올릴 수 있는 구멍을 발견했습니다.\n제가 발견한 내용을 첨부합니다. 무료로 확인하세요.`,
        icon: <Mail size={18} />
    }
  };

  const currentCheat = cheatsheets[activeCheat];

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center backdrop-blur-xl animate-fade-in p-4 pt-24 md:p-8 md:pt-28 overflow-y-auto bg-black/95">
      <div className="relative w-full max-w-5xl shadow-[0_0_100px_rgba(132,204,22,0.15)] border border-lime-900/40 flex flex-col md:h-[80vh] h-full rounded-sm overflow-hidden mb-20 bg-[#0a0a0a]">
        
        {/* Header - Unified Design */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-lime-900/30 bg-[#050505] z-20 relative shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-sm border bg-lime-900/10 border-lime-500/20 text-lime-400">
               <Brain size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold animate-pulse text-lime-400">
                 Neuro-Hacking // Level 3
              </span>
              <h2 className="text-white font-serif font-bold text-lg tracking-tight">PROJECT: LIZARD BRAIN</h2>
            </div>
          </div>
          <button onClick={onClose} className="transition-colors group text-white/40 hover:text-lime-400">
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-grow overflow-y-auto font-sans relative selection:bg-lime-500/30 selection:text-white scroll-smooth">
          {/* Unified Background Effect */}
          <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-lime-600/5 blur-[120px] pointer-events-none" />

          {/* Main Content Padding Wrapper */}
          <div className="p-8 md:p-12 pb-0 max-w-4xl mx-auto space-y-16 relative z-10">
            
            {/* Intro Section */}
            <div className="text-center space-y-6 pb-8 border-b border-white/5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-mono uppercase tracking-widest mb-4 border-lime-500/30 bg-lime-500/5 text-lime-400">
                 <Zap size={10} /> {isVip ? 'Unlimited Generator Active' : 'Protocol Initialized'}
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-white">
                Don't Speak to the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-600">Human Brain</span>
              </h1>
              <p className="font-serif text-lg text-white/60 italic max-w-xl mx-auto leading-relaxed">
                "이성(Neocortex)은 핑계를 찾고, <br/>
                <span className="text-lime-400 decoration-lime-500/30 font-bold underline underline-offset-4">파충류 뇌(Reptilian Brain)</span>는 결제를 합니다."
              </p>
            </div>

            {/* --- SECTION 1: TRIGGER EXAMPLES (The Theory) - Always Visible & First --- */}
            <div className="space-y-8 pt-4">
               <div className="text-center mb-8">
                  <h3 className="text-lg font-bold text-white uppercase tracking-widest">Part 1. Principles of Persuasion</h3>
                  <p className="text-xs text-gray-500 mt-2 font-mono">이론(Theory)을 이해해야 도구(Tool)를 지배합니다.</p>
               </div>

               <div className="flex flex-wrap justify-center gap-4 border-b border-white/10 pb-8">
                  <TriggerButton 
                     active={activeTrigger === 'survival'} 
                     onClick={() => setActiveTrigger('survival')}
                     icon={<Skull size={16} />}
                     label="Survival (Fear)"
                     colorClass="text-red-500 border-red-500"
                  />
                  <TriggerButton 
                     active={activeTrigger === 'reproduction'} 
                     onClick={() => setActiveTrigger('reproduction')}
                     icon={<Heart size={16} />}
                     label="Reproduction (Lust)"
                     colorClass="text-pink-500 border-pink-500"
                  />
                  <TriggerButton 
                     active={activeTrigger === 'laziness'} 
                     onClick={() => setActiveTrigger('laziness')}
                     icon={<Coffee size={16} />}
                     label="Laziness (Sloth)"
                     colorClass="text-lime-400 border-lime-400"
                  />
               </div>

               {/* Active Content Area */}
               <div className="animate-fade-in-up space-y-8 min-h-[300px]">
                  <div className={`p-6 border-l-4 ${currentTrigger.borderColor} bg-white/[0.02] flex items-start gap-4`}>
                     <div className={`p-3 rounded-full bg-black border ${currentTrigger.borderColor} ${currentTrigger.color}`}>
                        {currentTrigger.icon}
                     </div>
                     <div className="space-y-2">
                        <h3 className={`text-xl font-black uppercase tracking-tight ${currentTrigger.color}`}>{currentTrigger.title}</h3>
                        <p className="text-gray-300 leading-relaxed font-serif italic">
                           "{currentTrigger.desc}"
                        </p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                     {currentTrigger.examples.map((ex, idx) => (
                        <div 
                           key={idx} 
                           className="relative grid grid-cols-1 md:grid-cols-2 bg-[#050505] rounded-sm overflow-hidden border border-white/10 group hover:border-white/30 transition-all shadow-xl"
                           onClick={() => copyToClipboard(ex.after)}
                        >
                           {/* VS Badge */}
                           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-black border border-white/20 rounded-full flex items-center justify-center z-20 font-black text-xs italic text-white/50 shadow-lg">
                              VS
                           </div>

                           {/* BEFORE (Loser Side) */}
                           <div className="p-8 flex flex-col justify-center bg-white/[0.02] border-r border-white/5 relative opacity-60 grayscale transition-all duration-500 group-hover:opacity-40">
                              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-2">
                                 <X size={12} /> Human Logic (Weak)
                              </span>
                              <p className="font-serif text-lg text-gray-400 line-through decoration-gray-600 decoration-1">
                                 "{ex.before}"
                              </p>
                           </div>

                           {/* AFTER (Winner Side) */}
                           <div className={`p-8 flex flex-col justify-center relative cursor-pointer overflow-hidden`}>
                              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${currentTrigger.bgColor}`} />
                              <span className={`text-[10px] font-mono uppercase tracking-widest mb-2 flex items-center gap-2 font-bold ${currentTrigger.color}`}>
                                 <Zap size={12} /> Reptile Trigger (Strong)
                              </span>
                              <p className={`font-bold text-xl md:text-2xl leading-tight ${currentTrigger.color} drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]`}>
                                 "{ex.after}"
                              </p>
                              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <Copy size={16} className={currentTrigger.color} />
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* --- SECTION 2: NEURO-COPY GENERATOR (Tool) - Locked for Free --- */}
            <div className="space-y-6 pt-16 border-t border-white/5">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white uppercase tracking-widest">Part 2. AI Generator</h3>
                    {!isVip && <span className="text-[10px] font-mono text-lime-500 border border-lime-500/30 px-2 py-1 rounded bg-lime-500/5">LOCKED</span>}
                </div>

                <div className={`p-8 rounded-sm border border-white/10 bg-[#0c0c0c] relative overflow-hidden transition-all ${!isVip ? 'opacity-90' : ''}`}>
                    {/* Lock Overlay for Free */}
                    {!isVip && (
                        <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer group" onClick={onCheckout}>
                            <div className="w-16 h-16 rounded-full bg-black/80 border border-lime-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Lock size={24} className="text-lime-500" />
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">VIP Access Required</span>
                            <span className="text-xs text-lime-500 border-b border-lime-500/50 pb-0.5">Unlock Generator</span>
                        </div>
                    )}

                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-full border bg-white/5 border-white/10 text-gray-200">
                            <RefreshCw size={20} className={isGenerating ? 'animate-spin' : ''} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg uppercase tracking-tight text-white">Neuro-Copy Generator</h3>
                            <p className="text-[10px] font-mono text-gray-500">Insert Product Name {'->'} Get 3 Hypnotic Headlines</p>
                        </div>
                    </div>

                    <div className="flex gap-2 relative">
                        <input 
                            type="text" 
                            placeholder={isVip ? "Ex: 인체공학 의자, 수면 유도제..." : "System Locked..."}
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            disabled={isGenerating || !isVip} 
                            className={`flex-grow bg-black border rounded-sm px-4 py-3 text-sm focus:outline-none transition-all ${!isVip ? 'opacity-50 cursor-not-allowed border-white/5 text-gray-500' : 'border-white/10 text-white focus:border-lime-500 placeholder:text-white/20'}`}
                        />
                        <Button 
                            onClick={handleGenerate}
                            className={`px-6 py-3 font-bold uppercase tracking-widest text-xs border-none ${!isVip ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-white text-black hover:bg-lime-400 hover:text-black'}`}
                        >
                            {isGenerating ? 'Computing...' : 'Generate'}
                        </Button>
                    </div>

                    {generatedCopy && isVip && (
                        <div className="mt-8 grid gap-4 animate-fade-in-up">
                            <div className="p-4 bg-red-900/10 border border-red-500/30 rounded-sm relative group cursor-pointer hover:bg-red-900/20 transition-all" onClick={() => copyToClipboard(generatedCopy.survival)}>
                                <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest block mb-2 font-bold">Survival Trigger</span>
                                <p className="text-white font-serif leading-relaxed text-sm">{generatedCopy.survival}</p>
                                <Copy size={12} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="p-4 bg-pink-900/10 border border-pink-500/30 rounded-sm relative group cursor-pointer hover:bg-pink-900/20 transition-all" onClick={() => copyToClipboard(generatedCopy.reproduction)}>
                                <span className="text-[9px] font-mono text-pink-500 uppercase tracking-widest block mb-2 font-bold">Reproduction Trigger</span>
                                <p className="text-white font-serif leading-relaxed text-sm">{generatedCopy.reproduction}</p>
                                <Copy size={12} className="absolute top-4 right-4 text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="p-4 bg-lime-900/10 border border-lime-500/30 rounded-sm relative group cursor-pointer hover:bg-lime-900/20 transition-all" onClick={() => copyToClipboard(generatedCopy.laziness)}>
                                <span className="text-[9px] font-mono text-lime-500 uppercase tracking-widest block mb-2 font-bold">Laziness Trigger</span>
                                <p className="text-white font-serif leading-relaxed text-sm">{generatedCopy.laziness}</p>
                                <Copy size={12} className="absolute top-4 right-4 text-lime-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* --- SECTION 3: CONTEXTUAL CHEATSHEETS (Manual) - Locked for Free --- */}
            <div className="space-y-6 pt-10 border-t border-white/5">
                <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-xl font-serif font-bold text-white flex items-center gap-3">
                        <FileText size={20} className="text-lime-500" /> 
                        Part 3. Field Manuals
                    </h3>
                    <div className="flex gap-2">
                        <CheatTab active={activeCheat === 'hero'} onClick={() => setActiveCheat('hero')} label="Landing Page" />
                        <CheatTab active={activeCheat === 'ad'} onClick={() => setActiveCheat('ad')} label="SNS Ad" />
                        <CheatTab active={activeCheat === 'email'} onClick={() => setActiveCheat('email')} label="Cold Email" />
                    </div>
                </div>

                <div className="relative p-8 rounded-sm border border-white/10 bg-[#0f0f0f] transition-all">
                    {/* Content (Blurred if not VIP) */}
                    <div className={`transition-all duration-500 ${!isVip ? 'blur-md select-none opacity-30' : 'opacity-100'}`}>
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-3 rounded-full border bg-white/5 border-white/10 text-gray-500">
                                {currentCheat.icon}
                            </div>
                            <div>
                                <h4 className="text-lg font-bold uppercase tracking-wide text-white">{currentCheat.title}</h4>
                                <p className="text-xs text-gray-500 font-mono mt-1">{currentCheat.desc}</p>
                            </div>
                        </div>
                        
                        <div className="bg-black/50 p-6 rounded-sm border-l-2 border-lime-500 font-mono text-sm leading-relaxed text-gray-300 whitespace-pre-wrap">
                            {currentCheat.template}
                        </div>

                        {isVip && (
                            <div className="mt-4 flex justify-end">
                                <button 
                                    onClick={() => copyToClipboard(currentCheat.template)}
                                    className="flex items-center gap-2 text-[10px] font-mono uppercase text-lime-500 hover:text-white border border-lime-500/30 px-4 py-2 rounded-sm hover:bg-lime-500/10 transition-all"
                                >
                                    <Copy size={12} /> Copy Template
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Lock Overlay for Non-VIP */}
                    {!isVip && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 cursor-pointer group" onClick={onCheckout}>
                            <div className="w-16 h-16 rounded-full bg-black/80 border border-lime-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Lock size={24} className="text-lime-500" />
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">
                                VIP Access Required
                            </span>
                            <span className="text-xs text-lime-500 border-b border-lime-500/50 pb-0.5">Unlock Field Manuals</span>
                        </div>
                    )}
                </div>
            </div>
          </div>

          {/* --- ADAPTIVE FOOTER: CTA vs CONTENT --- */}
          <div className={`mt-20 relative bg-[#0a0a0a] border-t-2 border-lime-500`}>
             {/* Hazard Stripes Background */}
             <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#84cc16_10px,#84cc16_20px)] pointer-events-none" />
             
             <div className="relative z-10 max-w-5xl mx-auto p-12 md:p-16">
                {!isVip ? (
                    // FREE MODE: THE "SYSTEM LOCKDOWN" CTA
                    <div className="text-center space-y-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-900/20 border border-red-500/30 rounded-full text-red-500 text-[10px] font-mono uppercase tracking-widest animate-pulse">
                            <AlertTriangle size={12} /> System Lockdown Active
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                                You have the Theory.<br/>
                                <span className="text-lime-500 italic">Now get the Weapons.</span>
                            </h2>
                            <p className="text-lg text-gray-400 font-serif max-w-2xl mx-auto leading-relaxed">
                                "이론만으로는 아무것도 바뀌지 않습니다. <br/>
                                방금 보신 <strong>생성기(Generator)</strong>와 <strong>실전 매뉴얼(Cheatsheets)</strong>을 해제하여 실행에 옮기십시오."
                            </p>
                        </div>
                        <Button 
                            onClick={onCheckout}
                            className="w-full md:w-auto px-16 py-8 text-xl font-black uppercase tracking-[0.2em] bg-lime-500 text-black border-none shadow-[0_0_50px_rgba(132,204,22,0.4)] hover:shadow-[0_0_80px_rgba(132,204,22,0.6)] animate-pulse-cta transform hover:scale-105 transition-all"
                        >
                            <span className="flex items-center justify-center gap-4">
                                <Unlock size={24} />
                                UNLOCK ALL TOOLS
                                <ChevronRight size={24} strokeWidth={3} />
                            </span>
                        </Button>
                        <p className="text-[10px] text-gray-600 font-mono">* 30-Day Money Back Guarantee. Risk Free.</p>
                    </div>
                ) : (
                    // VIP MODE: ADVANCED PROTOCOLS (PART 2)
                    <div className="max-w-3xl mx-auto p-12">
                        <div className="text-center mb-16 space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime-500/10 border border-lime-500/30 text-lime-500 text-[10px] font-mono uppercase tracking-widest">
                                <Lock size={12} /> Confidential Access
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                                PART 2. <span className="text-lime-500">Neuro-Dominance</span>
                            </h2>
                            <p className="text-gray-400 font-serif italic text-lg">
                                "이론을 넘어, 상대의 무의식을 완전히 장악하는 상위 포식자의 기술입니다."
                            </p>
                        </div>

                        <div className="space-y-16">
                            {/* Module 4: The Novelty Trigger */}
                            <section className="relative pl-8 border-l-2 border-lime-500/30">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-lime-500 border-4 border-[#050505]" />
                                <h3 className="text-2xl font-bold text-white mb-4">04. 도파민 해킹 (The Novelty Trigger)</h3>
                                <div className="space-y-4 text-gray-300 leading-relaxed font-light text-lg">
                                    <p>
                                        "뇌는 지루함을 '고통'으로 인식합니다."
                                    </p>
                                    <p>
                                        대부분의 마케터는 생존, 번식, 게으름 3가지만 압니다. 하지만 당신은 설계자입니다.
                                        가장 강력한 네 번째 버튼, <strong>'새로움(Novelty)'</strong>을 누르십시오.
                                    </p>
                                    <p>
                                        예측 가능한 문장은 쓰레기통으로 직행합니다.
                                        '최초 공개', '비밀 폭로', '금지된 기술' 등의 키워드를 사용하여 뇌의 보상 회로(도파민)를 강제로 여십시오.
                                    </p>
                                </div>
                                <div className="mt-6 flex items-center gap-2 text-lime-400 font-mono text-xs">
                                    <Sparkles size={14} />
                                    <span>Action: 상세페이지 최상단에 "당신이 지금까지 실패한 이유는 '구식 방법' 때문입니다" 삽입</span>
                                </div>
                            </section>

                            {/* Module 5: The Anchor Effect */}
                            <section className="relative pl-8 border-l-2 border-lime-500/30">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-lime-500 border-4 border-[#050505]" />
                                <h3 className="text-2xl font-bold text-white mb-4">05. 가격의 닻 (The Anchor Effect)</h3>
                                <div className="space-y-4 text-gray-300 leading-relaxed font-light text-lg">
                                    <p>
                                        "가격은 절대적이지 않습니다. 상대적입니다."
                                    </p>
                                    <p>
                                        100만 원짜리 강의를 팔고 싶습니까? 그렇다면 먼저 500만 원짜리 컨설팅을 보여주십시오.
                                        뇌는 500만 원이라는 <strong>'닻(Anchor)'</strong>에 묶여, 100만 원을 '싸다'고 인식하게 됩니다.
                                    </p>
                                    <p>
                                        이 비교 과정에서 뇌의 비판적 사고는 마비됩니다. 
                                        가격을 깎아주지 말고, 비교 대상을 높이십시오.
                                    </p>
                                </div>
                                <div className="mt-6 flex items-center gap-2 text-lime-400 font-mono text-xs">
                                    <Scale size={14} />
                                    <span>Action: 옵션 A(고가)를 먼저 배치하여 옵션 B(주력)를 혜자 상품으로 만들기</span>
                                </div>
                            </section>

                            {/* Module 6: Artificial Scarcity */}
                            <section className="relative pl-8 border-l-2 border-lime-500/30">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-lime-500 border-4 border-[#050505]" />
                                <h3 className="text-2xl font-bold text-white mb-4">06. 인위적 결핍 (Artificial Scarcity)</h3>
                                <div className="space-y-4 text-gray-300 leading-relaxed font-light text-lg">
                                    <p>
                                        "인간은 언제나 가질 수 있는 것을 원하지 않습니다."
                                    </p>
                                    <p>
                                        당신의 상품이 언제든 살 수 있는 것이라면, 고객은 '나중에'를 선택합니다.
                                        그리고 그 '나중에'는 영원히 오지 않습니다.
                                    </p>
                                    <p>
                                        문을 닫으십시오. 한정판, 마감 임박, 승인제.
                                        접근을 어렵게 만들수록 인간의 <strong>소유욕</strong>은 폭발합니다.
                                        두드리는 자에게만 문을 열어주는 것이 권위입니다.
                                    </p>
                                </div>
                                <div className="mt-6 flex items-center gap-2 text-lime-400 font-mono text-xs">
                                    <AlertTriangle size={14} />
                                    <span>Action: "이 제안은 예고 없이 종료됩니다" 문구 추가</span>
                                </div>
                            </section>
                        </div>
                        
                        <div className="flex justify-end mt-12">
                            <div className="text-right">
                                <span className="text-[10px] font-mono text-lime-500 uppercase tracking-widest block mb-1">Clearance Level</span>
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

const TriggerButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; colorClass: string }> = ({ active, onClick, icon, label, colorClass }) => (
   <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-sm border text-xs font-black uppercase tracking-widest transition-all ${
         active 
            ? `${colorClass} bg-white/[0.05] shadow-[0_0_20px_rgba(0,0,0,0.5)] scale-105` 
            : 'border-white/10 text-white/30 hover:text-white hover:border-white/30'
      }`}
   >
      {icon}
      {label}
   </button>
);

const CheatTab: React.FC<{ active: boolean; onClick: () => void; label: string }> = ({ active, onClick, label }) => (
   <button 
      onClick={onClick}
      className={`px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest rounded-sm border transition-all whitespace-nowrap ${
         active 
            ? 'bg-lime-500 text-black border-lime-500' 
            : 'bg-transparent text-slate-500 border-slate-700 hover:text-white hover:border-slate-500'
      }`}
   >
      {label}
   </button>
);
