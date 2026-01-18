
import React, { useState, useEffect } from 'react';
import { X, Landmark, PenTool, Layout, Box, Ruler, Layers, ArrowRight, MousePointer2, Hexagon, Zap, Download } from 'lucide-react';
import { Button } from './Button';

interface ArchBlueprintDocProps {
  onClose: () => void;
}

export const ArchBlueprintDoc: React.FC<ArchBlueprintDocProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'concept' | 'spatial' | 'launch'>('concept');
  const [niche, setNiche] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBlueprint, setGeneratedBlueprint] = useState<{
    name: string;
    archetype: string;
    palette: string[];
    slogan: string;
    strategy: string;
  } | null>(null);

  const handleGenerate = () => {
    if (!niche) return;
    setIsGenerating(true);
    setTimeout(() => {
      const archetypes = ['The Ruler (High-End)', 'The Creator (Innovative)', 'The Sage (Minimalist)', 'The Rebel (Disruptive)'];
      const palettes = [
        ['#000000', '#BF953F', '#FFFFFF'], 
        ['#1a1a1a', '#333333', '#A1A1AA'],
        ['#0f172a', '#38bdf8', '#f0f9ff'],
        ['#3f3f46', '#d4d4d8', '#ef4444']
      ];
      
      const randomArchetype = archetypes[Math.floor(Math.random() * archetypes.length)];
      const randomPalette = palettes[Math.floor(Math.random() * palettes.length)];

      setGeneratedBlueprint({
        name: `${niche.toUpperCase()} LABS`,
        archetype: randomArchetype,
        palette: randomPalette,
        slogan: `Redefining ${niche} for the 1%.`,
        strategy: "Premium Positioning / Scarcity Model / Members Only Access"
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-[#050505]/95 backdrop-blur-xl animate-fade-in p-4 pt-24 md:p-8 md:pt-28 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#0a0a0a] shadow-[0_0_150px_rgba(255,255,255,0.05)] border border-white/10 flex flex-col md:h-[85vh] h-full rounded-sm overflow-hidden mb-20">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-[#080808] z-20 relative shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/5 rounded-sm border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
               <Landmark size={20} className="text-white/80" />
            </div>
            <div className="flex flex-col">
              <span className="text-white/40 font-mono text-[10px] tracking-[0.3em] uppercase font-bold">Brand Architecture // Level 9</span>
              <h2 className="text-white font-serif font-bold text-lg tracking-tight">PROJECT: ARCH BLUEPRINT</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors group">
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Main Content Layout */}
        <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
           
           {/* Sidebar Navigation */}
           <aside className="w-full lg:w-64 bg-[#050505] border-r border-white/5 flex flex-col shrink-0">
              <div className="p-6">
                 <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-4">Modules</div>
                 <nav className="space-y-1">
                    <NavBtn 
                       active={activeTab === 'concept'} 
                       onClick={() => setActiveTab('concept')} 
                       label="Concept Engine" 
                       icon={<PenTool size={14}/>} 
                    />
                    <NavBtn 
                       active={activeTab === 'spatial'} 
                       onClick={() => setActiveTab('spatial')} 
                       label="Spatial Design" 
                       icon={<Layout size={14}/>} 
                    />
                    <NavBtn 
                       active={activeTab === 'launch'} 
                       onClick={() => setActiveTab('launch')} 
                       label="Launch Strategy" 
                       icon={<RocketIcon />} 
                    />
                 </nav>
              </div>
              <div className="mt-auto p-6 border-t border-white/5">
                 <div className="flex items-center gap-2 text-[10px] font-mono text-gold/60 uppercase tracking-wider mb-2">
                    <Zap size={12} className="fill-gold" />
                    <span>AI Core Online</span>
                 </div>
                 <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gold w-full animate-pulse" />
                 </div>
              </div>
           </aside>

           {/* Workspace Area */}
           <main className="flex-grow bg-[#0c0c0c] relative overflow-y-auto custom-scrollbar flex flex-col">
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none" />
              
              {/* Content Render */}
              <div className="p-8 md:p-16 relative z-10 max-w-4xl mx-auto w-full flex-grow">
                 
                 {activeTab === 'concept' && (
                    <div className="space-y-12 animate-fade-in-up">
                       <div className="text-center space-y-4">
                          <h1 className="text-4xl md:text-5xl font-black text-white font-serif uppercase tracking-tight">
                             Brand <span className="text-gold italic">Generator</span>
                          </h1>
                          <p className="text-white/40 font-light text-lg">
                             "위대한 브랜드는 디자인이 아니라 '컨셉'에서 탄생합니다."
                          </p>
                       </div>

                       {/* Input Module */}
                       <div className="bg-[#050505] border border-white/10 p-8 rounded-sm shadow-2xl relative overflow-hidden group">
                          <div className="relative z-10 flex flex-col md:flex-row gap-4">
                             <div className="flex-grow space-y-2">
                                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Target Niche / Category</label>
                                <input 
                                   type="text" 
                                   value={niche}
                                   onChange={(e) => setNiche(e.target.value)}
                                   placeholder="e.g. Minimalist Coffee, Cyberpunk Bar..." 
                                   className="w-full bg-white/5 border border-white/10 p-4 text-white font-serif placeholder:text-white/10 focus:outline-none focus:border-gold/50 transition-all uppercase"
                                />
                             </div>
                             <div className="flex items-end">
                                <Button 
                                   onClick={handleGenerate}
                                   disabled={isGenerating || !niche}
                                   className={`h-[58px] px-8 bg-white text-black font-black uppercase tracking-widest border-none hover:bg-gray-200 transition-all ${isGenerating ? 'opacity-50' : ''}`}
                                >
                                   {isGenerating ? 'Architecting...' : 'Build Blueprint'}
                                </Button>
                             </div>
                          </div>
                          {/* Scanline */}
                          {isGenerating && <div className="absolute top-0 left-0 w-full h-1 bg-gold animate-loading-bar-turbo z-20" />}
                       </div>

                       {/* Result Blueprint */}
                       {generatedBlueprint && (
                          <div className="border border-gold/30 bg-[#080808] p-10 rounded-sm relative overflow-hidden animate-slide-up">
                             <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Hexagon size={120} strokeWidth={0.5} />
                             </div>
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                                <div className="space-y-6">
                                   <div className="space-y-1">
                                      <span className="text-[10px] font-mono text-gold uppercase tracking-widest">Brand Identity</span>
                                      <h3 className="text-3xl font-serif font-black text-white uppercase">{generatedBlueprint.name}</h3>
                                   </div>
                                   
                                   <div className="space-y-1">
                                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Archetype</span>
                                      <p className="text-xl font-light text-white">{generatedBlueprint.archetype}</p>
                                   </div>

                                   <div className="space-y-2">
                                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Color System</span>
                                      <div className="flex gap-2">
                                         {generatedBlueprint.palette.map((color, idx) => (
                                            <div key={idx} className="w-12 h-12 rounded-full border border-white/10 shadow-lg" style={{ backgroundColor: color }} />
                                         ))}
                                      </div>
                                   </div>
                                </div>

                                <div className="space-y-6 border-l border-white/10 pl-12">
                                   <div className="space-y-2">
                                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Core Slogan</span>
                                      <p className="text-lg font-serif italic text-white/80">"{generatedBlueprint.slogan}"</p>
                                   </div>
                                   <div className="space-y-2">
                                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Strategy</span>
                                      <p className="text-sm font-mono text-gold/80">{generatedBlueprint.strategy}</p>
                                   </div>
                                   <div className="pt-4">
                                      <button className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all">
                                         <Download size={14} /> Export PDF
                                      </button>
                                   </div>
                                </div>
                             </div>
                          </div>
                       )}
                    </div>
                 )}

                 {activeTab === 'spatial' && (
                    <div className="space-y-12 animate-fade-in-up">
                       <div className="text-center space-y-4">
                          <h1 className="text-4xl md:text-5xl font-black text-white font-serif uppercase tracking-tight">
                             Spatial <span className="text-white/50 italic">Psychology</span>
                          </h1>
                          <p className="text-white/40 font-light text-lg">
                             "공간은 무언의 설득입니다. 고객의 동선을 설계하십시오."
                          </p>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Module 1 */}
                          <div className="p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                             <div className="mb-6 flex items-center justify-between">
                                <Ruler size={24} className="text-white/40" />
                                <span className="text-[10px] font-mono text-white/20">01</span>
                             </div>
                             <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">The Threshold (문지방 효과)</h3>
                             <p className="text-sm text-gray-400 leading-relaxed">
                                입구는 좁고 어둡게, 내부는 넓고 밝게 설계하십시오. 
                                이 <strong>'압축과 팽창(Compression & Expansion)'</strong> 기법은 고객에게 극적인 진입 경험을 선사하여 브랜드 가치를 높입니다.
                             </p>
                          </div>

                          {/* Module 2 */}
                          <div className="p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                             <div className="mb-6 flex items-center justify-between">
                                <Layers size={24} className="text-white/40" />
                                <span className="text-[10px] font-mono text-white/20">02</span>
                             </div>
                             <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">Vertical Hierarchy (수직적 위계)</h3>
                             <p className="text-sm text-gray-400 leading-relaxed">
                                시선보다 높은 곳에 물건을 두면 '동경'하게 되고, 낮은 곳에 두면 '소유'하고 싶어집니다.
                                고가 상품은 눈높이 위(조명 강조), 저가/충동구매 상품은 허리 아래에 배치하십시오.
                             </p>
                          </div>
                       </div>
                       
                       <div className="p-8 border border-gold/20 bg-gold/5 rounded-sm relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-20"><MousePointer2 size={48} className="text-gold" /></div>
                          <h3 className="text-lg font-bold text-gold uppercase tracking-widest mb-4">Digital Spatial Design (Web)</h3>
                          <ul className="space-y-2 text-sm text-white/80 font-mono">
                             <li className="flex items-center gap-2"><ArrowRight size={12} className="text-gold"/> F-Pattern Layout: 중요한 정보는 좌측 상단에.</li>
                             <li className="flex items-center gap-2"><ArrowRight size={12} className="text-gold"/> Whitespace Luxury: 여백을 40% 이상 유지하여 '비싼' 느낌 부여.</li>
                             <li className="flex items-center gap-2"><ArrowRight size={12} className="text-gold"/> Micro-Interaction: 버튼 클릭 시 미세한 햅틱/애니메이션 피드백.</li>
                          </ul>
                       </div>
                    </div>
                 )}

                 {activeTab === 'launch' && (
                    <div className="space-y-12 animate-fade-in-up">
                       <div className="text-center space-y-4">
                          <h1 className="text-4xl md:text-5xl font-black text-white font-serif uppercase tracking-tight">
                             Launch <span className="text-white/50 italic">Protocol</span>
                          </h1>
                          <p className="text-white/40 font-light text-lg">
                             "오픈 빨? 아닙니다. 철저히 계산된 폭발(Explosion)입니다."
                          </p>
                       </div>

                       <div className="relative border-l-2 border-white/10 ml-6 md:ml-10 space-y-12 py-4">
                          <TimelineItem 
                             step="D-30" 
                             title="The Tease (티징)" 
                             desc="아무것도 팔지 마십시오. '뭔가 엄청난 것이 온다'는 기대감만 심으십시오. 흐릿한 실루엣, D-Day 카운트다운만 노출."
                          />
                          <TimelineItem 
                             step="D-7" 
                             title="The Gate (모집)" 
                             desc="'사전 예약자'에게만 혜택을 준다고 선언하십시오. 이때 모인 DB가 오픈 첫날 매출의 80%를 만듭니다."
                          />
                          <TimelineItem 
                             step="D-Day" 
                             title="The Explosion (폭발)" 
                             desc="오픈 1시간 만에 '일시 품절'을 띄우십시오. 실제 재고가 있어도 닫아야 합니다. '대란'이라는 인식을 심는 것이 매출보다 중요합니다."
                          />
                       </div>
                    </div>
                 )}

              </div>
           </main>
        </div>
      </div>
    </div>
  );
};

const NavBtn: React.FC<{ active: boolean; onClick: () => void; label: string; icon: React.ReactNode }> = ({ active, onClick, label, icon }) => (
   <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all border-l-2 group ${
         active 
            ? 'border-gold bg-white/5 text-white' 
            : 'border-transparent text-white/40 hover:text-white hover:bg-white/[0.02]'
      }`}
   >
      <span className={active ? 'text-gold' : 'text-white/20 group-hover:text-white'}>{icon}</span>
      <span>{label}</span>
   </button>
);

const TimelineItem: React.FC<{ step: string; title: string; desc: string }> = ({ step, title, desc }) => (
   <div className="relative pl-8 md:pl-12 group">
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-white/30 group-hover:border-gold group-hover:bg-gold transition-colors" />
      <span className="absolute -left-16 top-0 text-[10px] font-mono text-white/30 w-10 text-right pt-0.5 group-hover:text-gold transition-colors">{step}</span>
      
      <div className="space-y-2">
         <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors">{title}</h3>
         <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xl">{desc}</p>
      </div>
   </div>
);

const RocketIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
   </svg>
);
