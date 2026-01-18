
import React, { useState } from 'react';
import { X, Megaphone, Users, MessageSquare, TrendingUp, AlertTriangle, Fingerprint, Lock, Eye, Siren, Radio, BarChart2, Target, ShieldAlert } from 'lucide-react';
import { Button } from './Button';

interface OpinionControlDocProps {
  onClose: () => void;
}

export const OpinionControlDoc: React.FC<OpinionControlDocProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'bandwagon' | 'strawman' | 'contagion'>('bandwagon');
  const [generatedHeadline, setGeneratedHeadline] = useState<string | null>(null);

  const generateViralHook = () => {
    const hooks = [
      "충격) 이 사실을 모르면 당신의 계좌는 매일 털리고 있습니다.",
      "폭로) 전문가들이 당신에게 절대 알려주지 않는 3가지 비밀.",
      "속보) 이제 더 이상 '이것' 없이는 살아남을 수 없습니다.",
      "긴급) 3일 뒤면 이 방법은 막힙니다. 지금 확인하세요."
    ];
    const random = hooks[Math.floor(Math.random() * hooks.length)];
    setGeneratedHeadline(random);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/95 backdrop-blur-xl animate-fade-in p-4 pt-24 md:p-8 md:pt-28 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#080505] shadow-[0_0_100px_rgba(220,38,38,0.2)] border border-red-900/40 flex flex-col md:h-[80vh] h-full rounded-sm overflow-hidden mb-20">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-900/30 bg-[#020101] z-20 relative shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-red-900/10 rounded-sm border border-red-500/20 shadow-[0_0_10px_rgba(220,38,38,0.2)]">
               <Megaphone size={20} className="text-red-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-red-500 font-mono text-[10px] tracking-[0.3em] uppercase font-bold animate-pulse">Mass Influence // Level 8</span>
              <h2 className="text-white font-serif font-bold text-lg tracking-tight">PROJECT: OPINION CONTROL</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-red-500 transition-colors group">
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-grow overflow-y-auto bg-[#0a0a0a] text-red-100 font-sans relative selection:bg-red-500/30 selection:text-white scroll-smooth">
          
          {/* Background Noise */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-900/10 blur-[150px] pointer-events-none" />

          <div className="max-w-3xl mx-auto p-8 md:p-16 relative z-10 space-y-20">
            
            {/* Intro Section */}
            <div className="text-center space-y-8 animate-fade-in-up">
              <div className="inline-block border border-red-500/30 px-4 py-1.5 rounded-full bg-red-500/5 text-red-400 text-[10px] font-mono tracking-[0.3em] uppercase mb-4 shadow-[0_0_20px_rgba(220,38,38,0.2)]">
                 The Propaganda Machine
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[1.1] text-white">
                진실은 <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">만들어지는 것이다.</span>
              </h1>
              <p className="font-serif text-xl text-white/60 italic max-w-2xl mx-auto leading-relaxed border-l-4 border-red-500/50 pl-6 text-left md:text-center mt-8">
                "대중은 스스로 생각하지 않습니다. <br/>
                가장 큰 목소리, 가장 자극적인 이야기, 가장 많은 사람이 믿는(것처럼 보이는) 것을 따를 뿐입니다."
              </p>
            </div>

            {/* Warning Box */}
            <div className="bg-red-950/20 border border-red-500/30 p-6 rounded-sm flex gap-4 items-start">
               <Siren className="text-red-500 shrink-0 mt-1" />
               <div className="space-y-2">
                  <h4 className="text-red-500 font-bold uppercase text-xs tracking-widest">Ethical Hazard Warning</h4>
                  <p className="text-sm text-red-200/60 font-serif leading-relaxed">
                     본 프로토콜은 집단 심리를 해킹하여 여론을 인위적으로 조성하는 기술입니다. 
                     가짜 뉴스 생산이나 불법적인 선동을 권장하지 않으며, 오직 마케팅적 '프레임 선점' 용도로만 사용하십시오.
                  </p>
               </div>
            </div>

            {/* Interactive Module: The 3 Pillars */}
            <div className="space-y-8">
               <div className="flex border-b border-white/10">
                  <TabButton active={activeTab === 'bandwagon'} onClick={() => setActiveTab('bandwagon')} label="Bandwagon Effect" icon={<Users size={14} />} />
                  <TabButton active={activeTab === 'strawman'} onClick={() => setActiveTab('strawman')} label="The Straw Man" icon={<Target size={14} />} />
                  <TabButton active={activeTab === 'contagion'} onClick={() => setActiveTab('contagion')} label="Emotional Contagion" icon={<TrendingUp size={14} />} />
               </div>

               <div className="bg-[#111] border border-white/5 p-8 rounded-sm min-h-[300px] relative overflow-hidden">
                  {activeTab === 'bandwagon' && (
                     <div className="space-y-6 animate-fade-in">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                           <Users className="text-red-500" /> 편승 효과 (Bandwagon Effect)
                        </h3>
                        <p className="text-gray-400 leading-relaxed font-light">
                           "모두가 하면, 나도 해야 한다."<br/>
                           인간은 소외되는 것을 죽기보다 두려워합니다(FOMO). 당신의 브랜드가 이미 '대세'인 것처럼 연출하십시오.
                        </p>
                        <div className="bg-black/50 p-6 border-l-2 border-red-500 space-y-4">
                           <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest">Tactical Action</h4>
                           <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
                              <li><strong>허수(Fake Number) 전략:</strong> "이미 5,000명이 대기 중입니다" (검증 불가능한 숫자 제시).</li>
                              <li><strong>품절 마케팅:</strong> 실제 재고가 있어도 '일시 품절'을 걸어라. 그리고 '재입고 알림 신청'을 받아라.</li>
                              <li><strong>댓글 부대 시뮬레이션:</strong> 초반 댓글 10개는 지인이나 부계정으로 "저도 샀어요", "이거 진짜 좋네요"로 깔아두십시오.</li>
                           </ul>
                        </div>
                     </div>
                  )}

                  {activeTab === 'strawman' && (
                     <div className="space-y-6 animate-fade-in">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                           <ShieldAlert className="text-red-500" /> 허수아비 때리기 (The Straw Man)
                        </h3>
                        <p className="text-gray-400 leading-relaxed font-light">
                           "공동의 적(Enemy)은 결속력을 강화합니다."<br/>
                           당신의 브랜드를 영웅으로 만들기 위해, 가상의 '빌런(Villain)'을 만드십시오. 기존 업계의 부조리, 비효율, 기득권을 적으로 규정하고 공격하십시오.
                        </p>
                        <div className="bg-black/50 p-6 border-l-2 border-red-500 space-y-4">
                           <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest">Tactical Action</h4>
                           <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
                              <li><strong>프레임 전쟁:</strong> "기존 업체들은 당신을 호구로 보고 있습니다. 우리는 그들의 폭리를 폭로합니다."</li>
                              <li><strong>선과 악의 구도:</strong> 당신의 제품은 단순한 상품이 아닙니다. 부조리한 세상을 바꾸는 '운동(Movement)'입니다.</li>
                           </ul>
                        </div>
                     </div>
                  )}

                  {activeTab === 'contagion' && (
                     <div className="space-y-6 animate-fade-in">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                           <Radio className="text-red-500" /> 감정 전염 (Emotional Contagion)
                        </h3>
                        <p className="text-gray-400 leading-relaxed font-light">
                           "논리는 전파되지 않지만, 분노와 공포는 빛보다 빠르게 퍼집니다."<br/>
                           바이럴(Viral)을 원한다면 점잖은 척하지 마십시오. 사람들의 뇌관(Trigger)을 건드려야 합니다.
                        </p>
                        <div className="bg-black/50 p-6 border-l-2 border-red-500 space-y-4">
                           <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest">Tactical Action</h4>
                           <div className="space-y-2">
                              <p className="text-sm text-white"><strong>Generator Tool:</strong></p>
                              <div className="flex gap-2">
                                 <Button onClick={generateViralHook} className="px-4 py-2 bg-red-900/30 text-red-400 border border-red-500/30 text-[10px] uppercase font-bold hover:bg-red-500 hover:text-black">
                                    Generate Viral Headline
                                 </Button>
                              </div>
                              {generatedHeadline && (
                                 <div className="mt-4 p-4 bg-white/5 rounded-sm border border-white/10 animate-fade-in-up">
                                    <p className="text-lg font-serif font-black text-white">"{generatedHeadline}"</p>
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </div>

            {/* Footer Signoff */}
            <div className="pt-16 border-t border-red-900/30 flex flex-col md:flex-row justify-between items-end gap-6">
               <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-red-600/70">
                     Operation Status: Live
                  </div>
                  <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-xs">
                     <Eye size={14} />
                     Reality Distortion Field Active
                  </div>
               </div>
               <div className="text-right">
                  <p className="font-serif italic text-white/40 text-sm">"History is written by the victors."</p>
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
      className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 flex items-center justify-center gap-2 ${
         active 
            ? 'border-red-500 text-red-500 bg-red-500/5' 
            : 'border-transparent text-gray-500 hover:text-white hover:bg-white/5'
      }`}
   >
      {icon}
      <span className="hidden md:inline">{label}</span>
   </button>
);
