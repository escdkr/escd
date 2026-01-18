
import React from 'react';
import { X, Brain, Zap, Eye, Copy, AlertCircle, Fingerprint, MessageSquare, ArrowRight } from 'lucide-react';

interface CopywritingDocProps {
  onClose: () => void;
}

export const CopywritingDoc: React.FC<CopywritingDocProps> = ({ onClose }) => {
  const copyToClipboard = (text: string) => {
    // Simulation of copy action
    alert(`[COPIED] 클립보드에 저장되었습니다.\n"${text}"`);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/90 backdrop-blur-md animate-fade-in p-4 pt-24 md:p-8 md:pt-28 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0a0a0a] shadow-[0_0_100px_rgba(124,58,237,0.3)] border border-purple-500/20 flex flex-col md:h-[80vh] h-full rounded-sm overflow-hidden mb-20">
        
        {/* Document Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/20 bg-[#050505]">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-purple-900/20 rounded-sm border border-purple-500/30">
               <Brain size={20} className="text-purple-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-purple-500 font-mono text-[10px] tracking-[0.3em] uppercase font-black animate-pulse">Psy-Ops // Level 7</span>
              <h2 className="text-white font-serif font-bold text-lg tracking-tight">PROJECT: MIND HACK 77</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-purple-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Document Body */}
        <div className="flex-grow overflow-y-auto p-8 md:p-12 bg-[#080808] text-gray-300 font-sans relative selection:bg-purple-500/30 selection:text-white scroll-smooth">
          
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-16 relative z-10">
            
            {/* Title Section */}
            <div className="text-center space-y-6 pb-8 border-b border-white/5">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-white">
                The 7 Laws of <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-600">Hypnotic Copywriting</span>
              </h1>
              <p className="font-serif text-lg text-white/60 italic max-w-xl mx-auto">
                "인간의 뇌는 논리로 설득되지 않습니다. <br/>
                <span className="text-purple-400 font-bold underline decoration-purple-500/30 underline-offset-4">파충류의 뇌(Reptilian Brain)</span>를 직접 타격하는 7가지 언어 패턴입니다."
              </p>
            </div>

            {/* Warning Box */}
            <div className="bg-purple-900/10 border-l-4 border-purple-500 p-6 flex gap-4 items-start">
               <AlertCircle className="text-purple-500 shrink-0 mt-1" size={20} />
               <div className="space-y-2">
                  <h4 className="text-purple-400 font-bold uppercase tracking-widest text-xs">Warning: Usage Restricted</h4>
                  <p className="text-sm text-purple-200/70 leading-relaxed">
                     본 기술은 상대방의 비판적 사고(Critical Thinking)를 우회하여 무의식에 구매 명령어를 심는 기법입니다.
                     악용 시 강력한 부작용을 초래할 수 있으니 윤리적으로 사용하십시오.
                  </p>
               </div>
            </div>

            {/* Protocol 1: RAS */}
            <section className="space-y-4">
               <div className="flex items-center gap-4 text-purple-500">
                  <span className="font-mono text-3xl font-black opacity-30">01</span>
                  <h3 className="text-2xl font-serif font-black uppercase tracking-tight">The Gatekeeper (RAS)</h3>
               </div>
               <p className="text-lg leading-relaxed">
                  뇌에는 <strong>망상활성계(Reticular Activating System)</strong>라는 필터가 있습니다. 익숙하고 지루한 정보는 차단하고, 새롭고 위험한 정보만 통과시킵니다.
                  "안녕하세요"로 시작하지 마십시오. RAS가 당신을 차단합니다.
               </p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="p-4 bg-white/5 rounded-sm opacity-50 border border-transparent">
                     <span className="text-[10px] font-mono uppercase text-gray-500 block mb-2">Blocked (Filtered Out)</span>
                     <p className="line-through decoration-white/30">"효과 좋은 다이어트 약입니다."</p>
                  </div>
                  <div 
                    className="p-4 bg-purple-500/10 border border-purple-500/50 rounded-sm cursor-pointer group hover:bg-purple-500/20 transition-all"
                    onClick={() => copyToClipboard("아직도 굶으면서 살을 빼십니까? 당신의 위장은 파괴되고 있습니다.")}
                  >
                     <span className="text-[10px] font-mono uppercase text-purple-400 block mb-2 flex items-center gap-2">
                        Pass (RAS Penetrated) <Copy size={10} />
                     </span>
                     <p className="font-bold text-white">"아직도 굶으면서 살을 빼십니까? 당신의 위장은 파괴되고 있습니다."</p>
                  </div>
               </div>
            </section>

            {/* Protocol 2: Pattern Interrupt */}
            <section className="space-y-4">
               <div className="flex items-center gap-4 text-purple-500">
                  <span className="font-mono text-3xl font-black opacity-30">02</span>
                  <h3 className="text-2xl font-serif font-black uppercase tracking-tight">Pattern Interrupt (패턴 파괴)</h3>
               </div>
               <p className="text-lg leading-relaxed">
                  인간은 예측 가능한 상황에서 <strong>'자동 조종 모드(Auto-pilot)'</strong>로 전환됩니다. 
                  이 흐름을 고의로 끊어버려(Interrupt), 뇌를 일시적인 혼란(Trance) 상태에 빠뜨리십시오. 그때 무방비 상태의 잠재의식에 메시지를 꽂아야 합니다.
               </p>
               <div className="bg-[#111] p-6 rounded-sm border border-white/10 space-y-4">
                  <div className="flex items-center gap-3 text-purple-300 text-sm">
                     <ArrowRight size={14} />
                     <span>"이 글을 절대 읽지 마십시오." (부정 명령으로 호기심 자극)</span>
                  </div>
                  <div className="flex items-center gap-3 text-purple-300 text-sm">
                     <ArrowRight size={14} />
                     <span>"당신의 광고비는 쓰레기통으로 들어가고 있습니다." (충격 요법)</span>
                  </div>
               </div>
            </section>

            {/* Protocol 3: The Double Bind */}
            <section className="space-y-4">
               <div className="flex items-center gap-4 text-purple-500">
                  <span className="font-mono text-3xl font-black opacity-30">03</span>
                  <h3 className="text-2xl font-serif font-black uppercase tracking-tight">The Double Bind (이중 구속)</h3>
               </div>
               <p className="text-lg leading-relaxed">
                  "구매하시겠습니까?"라고 묻지 마십시오. 그것은 'No'라는 선택지를 줍니다.
                  대신 <strong>이중 구속(Double Bind)</strong>을 사용하여, 어떤 선택을 하든 당신이 원하는 결과가 나오도록 설계하십시오. 이것은 <span className="text-purple-400">전제(Presupposition)의 마술</span>입니다.
               </p>
               <div 
                  className="p-4 bg-purple-500/10 border border-purple-500/50 rounded-sm cursor-pointer group hover:bg-purple-500/20 transition-all"
                  onClick={() => copyToClipboard("카드 결제와 계좌 이체 중 편하신 방법이 있으신가요?")}
               >
                  <span className="text-[10px] font-mono uppercase text-purple-400 block mb-2 flex items-center gap-2">
                     Magic Phrase <Copy size={10} />
                  </span>
                  <p className="font-bold text-white text-lg">"카드 결제와 계좌 이체 중 편하신 방법이 있으신가요?"</p>
                  <p className="text-xs text-white/40 mt-2">* 구매한다는 것을 기정사실화(Presuppose)하고 방법만 묻습니다.</p>
               </div>
            </section>

            {/* Protocol 4: Sensory Loading */}
            <section className="space-y-4">
               <div className="flex items-center gap-4 text-purple-500">
                  <span className="font-mono text-3xl font-black opacity-30">04</span>
                  <h3 className="text-2xl font-serif font-black uppercase tracking-tight">Sensory Loading (감각 과부하)</h3>
               </div>
               <p className="text-lg leading-relaxed">
                  추상적인 단어는 뇌를 통과합니다. <strong>VAK (Visual, Auditory, Kinesthetic)</strong>, 즉 시각, 청각, 촉각을 자극하는 단어를 사용하여 뇌에 '체험'을 심어주십시오.
               </p>
               <div className="grid grid-cols-2 gap-4 text-sm font-mono mt-4">
                  <div className="p-4 border border-white/10 text-gray-500 text-center flex flex-col justify-center">
                     <span>편안하다</span>
                     <span className="text-[10px] mt-1">(Abstract)</span>
                  </div>
                  <div className="p-4 border border-purple-500/50 text-white font-bold text-center bg-purple-500/10 flex flex-col justify-center">
                     <span>구름 위에 누운 듯 폭신하다</span>
                     <span className="text-[10px] mt-1 text-purple-400">(Tactile/Visual)</span>
                  </div>
               </div>
            </section>

            {/* Protocol 5: The "Yes" Set */}
            <section className="space-y-4">
               <div className="flex items-center gap-4 text-purple-500">
                  <span className="font-mono text-3xl font-black opacity-30">05</span>
                  <h3 className="text-2xl font-serif font-black uppercase tracking-tight">The "Yes" Set (예스 세트)</h3>
               </div>
               <p className="text-lg leading-relaxed">
                  인간은 일관성을 유지하려는 본능(Consistency Principle)이 있습니다. 
                  작고 쉬운 질문으로 'Yes'를 3번 이상 유도하십시오. 그 관성(Inertia)으로 인해 마지막 핵심 제안에도 'Yes'라고 답하게 됩니다.
               </p>
               <div className="space-y-2 font-serif italic text-gray-400 border-l-2 border-purple-500/30 pl-4">
                  <p>"돈을 더 많이 벌고 싶으시죠?" <strong className="text-white">(Yes)</strong></p>
                  <p>"하지만 일하는 시간은 줄이고 싶으시죠?" <strong className="text-white">(Yes)</strong></p>
                  <p>"그렇다면 이 시스템이 정확히 당신을 위한 것입니다." <strong className="text-purple-400">(Yes!)</strong></p>
               </div>
            </section>

            {/* Protocol 6: Future Pacing */}
            <section className="space-y-4">
               <div className="flex items-center gap-4 text-purple-500">
                  <span className="font-mono text-3xl font-black opacity-30">06</span>
                  <h3 className="text-2xl font-serif font-black uppercase tracking-tight">Future Pacing (미래 투사)</h3>
               </div>
               <p className="text-lg leading-relaxed">
                  상품을 파는 것이 아닙니다. <strong>'변화된 미래의 모습'</strong>을 파십시오.
                  고객의 뇌 속에서 이미 성공한 모습을 생생하게 상상하게(Visualize) 만드십시오. 뇌는 상상과 현실을 구분하지 못합니다.
               </p>
               <div 
                  className="p-4 bg-[#111] border border-white/10 rounded-sm cursor-pointer hover:border-purple-500/30 transition-all"
                  onClick={() => copyToClipboard("상상해 보십시오. 3개월 뒤, 발리 해변에서 모히또를 마시는 당신의 핸드폰에 입금 알림이 울리는 순간을.")}
               >
                  <div className="flex justify-between mb-2">
                     <span className="text-[10px] font-mono text-purple-400 uppercase">Scenario Script</span>
                     <Copy size={12} className="text-white/20" />
                  </div>
                  <p className="text-sm text-gray-300 font-serif leading-relaxed">
                     "상상해 보십시오. 3개월 뒤, 발리 해변에서 모히또를 마시는 당신의 핸드폰에 <strong className="text-white">쉴 새 없이 입금 알림이 울리는 순간</strong>을."
                  </p>
               </div>
            </section>

            {/* Protocol 7: Identity Labeling */}
            <section className="pt-8 mt-8 border-t border-dashed border-white/10">
               <div className="bg-gradient-to-r from-purple-900/40 to-black p-8 rounded-sm border border-purple-500/30 relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 text-[10rem] text-white/5 font-black select-none pointer-events-none rotate-12">07</div>
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                     <span className="font-mono text-3xl font-black text-purple-500 opacity-50">07</span>
                     <h3 className="text-2xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                        <Fingerprint className="text-purple-400" />
                        Identity Labeling
                     </h3>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed relative z-10 mb-6">
                     최고의 기술입니다. 상대방에게 당신이 원하는 <strong>'정체성(Identity)'</strong>을 부여하십시오. 
                     인간은 타인이 규정한 긍정적인 라벨(Label)에 부합하게 행동하려는 강력한 욕구가 있습니다.
                  </p>
                  <div className="bg-black/50 p-4 rounded-sm border-l-4 border-purple-500 italic text-purple-200">
                     "당신은 남들이 보지 못하는 기회를 알아보는 <span className="text-white font-bold not-italic bg-purple-500/20 px-1">상위 1%의 지능</span>을 가졌습니다. 그래서 이 글을 여기까지 읽은 것입니다."
                  </div>
                  <p className="text-xs text-white/40 mt-4 text-right">
                     * 이 문장을 읽은 순간, 고객은 스스로를 '똑똑한 사람'으로 정의하고, 그 증거로써 당신의 상품을 구매하게 됩니다.
                  </p>
               </div>
            </section>

            {/* Footer Signoff */}
            <div className="pt-12 flex justify-between items-end opacity-50 hover:opacity-100 transition-opacity">
               <div className="text-[10px] font-mono uppercase tracking-widest">
                  Secure Channel: Active<br/>
                  Encryption: 256-bit
               </div>
               <div className="flex items-center gap-2 text-purple-500 font-bold uppercase tracking-widest text-xs">
                  <Eye size={14} />
                  Mind Hack Protocol Loaded
               </div>
            </div>

          </div>
        </div>

        {/* Loading Bar (Bottom) */}
        <div className="h-1 bg-black w-full">
           <div className="h-full bg-purple-600 animate-[loading-bar_15s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
};
