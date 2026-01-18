
import React, { useEffect, useState } from 'react';
import { X, Feather, Quote, Crown, Fingerprint } from 'lucide-react';

interface ArchitectNoteDocProps {
  onClose: () => void;
}

export const ArchitectNoteDoc: React.FC<ArchitectNoteDocProps> = ({ onClose }) => {
  const [showSignature, setShowSignature] = useState(false);

  useEffect(() => {
    // Trigger signature animation after a slight delay or scroll interaction
    const timer = setTimeout(() => setShowSignature(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/95 backdrop-blur-xl animate-fade-in p-4 pt-24 md:p-8 md:pt-28 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#080808] shadow-[0_0_150px_rgba(191,149,63,0.15)] border border-[#BF953F]/20 flex flex-col md:h-[80vh] h-full rounded-sm overflow-hidden mb-20">
        
        {/* Decorative Borders */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#BF953F]/30 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#BF953F]/30 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#BF953F]/30 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#BF953F]/30 rounded-br-sm pointer-events-none" />

        {/* Document Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#BF953F]/10 bg-[#050505] relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-[#BF953F]/10 rounded-full border border-[#BF953F]/30">
               <Feather size={18} className="text-[#BF953F]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[#BF953F] font-serif italic text-xs tracking-widest">From the desk of</span>
              <h2 className="text-white font-cinzel font-bold text-xl tracking-widest">THE ARCHITECT</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-white/20 hover:text-[#BF953F] transition-colors group">
            <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </div>

        {/* Document Body */}
        <div className="flex-grow overflow-y-auto p-8 md:p-16 bg-[#080808] text-[#e5e5e5] relative scroll-smooth selection:bg-[#BF953F]/30 selection:text-white">
          {/* Background Texture */}
          <div className="absolute inset-0 noise-texture opacity-20 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(191,149,63,0.03)_0%,transparent_70%)] pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-16 relative z-10 font-serif leading-loose">
            
            {/* Epigraph */}
            <div className="text-center space-y-4 opacity-60">
               <Quote size={32} className="mx-auto text-[#BF953F] opacity-50 mb-4" />
               <p className="text-lg italic font-light">
                  "The matrix is a system, Neo. That system is our enemy.<br/>
                  But when you're inside, you look around, what do you see?"
               </p>
            </div>

            {/* Letter Content */}
            <div className="space-y-8 text-lg font-light text-gray-300">
               <p className="first-letter:text-5xl first-letter:font-black first-letter:text-[#BF953F] first-letter:mr-2 first-letter:float-left">
                  당신이 이 글을 읽고 있다는 것은, 단순히 돈을 벌고 싶어서가 아닐 것입니다.
                  가슴 깊은 곳에서 들려오는 <strong>'불편한 진실'</strong>을 마주했기 때문일 것입니다.
                  세상이 당신에게 가르쳐준 규칙들이 어딘가 잘못되었다는 그 직감 말입니다.
               </p>

               <h3 className="text-2xl font-bold text-white mt-12 mb-6 border-l-2 border-[#BF953F] pl-6 py-2">
                  Chapter 1. The Great Filter (거대한 여과기)
               </h3>
               <p>
                  세상은 거대한 여과기입니다. 99%의 사람들은 '평범함'이라는 체에 걸러져 시스템의 부품으로 살아갑니다.
                  그들은 성실하게 일하고, 저축하고, 은퇴합니다. 시스템은 그들에게 <strong>'안정'</strong>이라는 마약을 주며 
                  그들의 <strong>'시간'</strong>과 <strong>'자유'</strong>를 착취합니다.
               </p>
               <p>
                  당신은 그 여과기를 통과했습니다. 이 VIP 공간에 도달했다는 것은, 
                  당신이 시스템이 제공하는 안락함을 거부하고 <strong>'위험한 진실'</strong>을 선택했다는 증거입니다.
               </p>

               <h3 className="text-2xl font-bold text-white mt-12 mb-6 border-l-2 border-[#BF953F] pl-6 py-2">
                  Chapter 2. Value vs. Perception (가치와 인식)
               </h3>
               <p>
                  저는 가난했던 시절, 땀 흘려 일하는 것만이 신성하다고 믿었습니다. 
                  하지만 자본주의의 정점에 선 지금, 저는 단언할 수 있습니다.
                  <br/><br/>
                  <span className="text-[#FCF6BA] font-medium border-b border-[#BF953F]/30 pb-1">"돈은 가치(Value)를 따라오지 않습니다. 돈은 인식(Perception)을 따라옵니다."</span>
               </p>
               <p>
                  당신의 실력이 100점이라도, 세상이 10점으로 인식하면 당신의 가치는 10점입니다.
                  반대로 실력이 50점이라도, 세상이 100점으로 인식하게 만든다면 당신은 100점의 돈을 법니다.
                  이것이 제가 'The Glitch'에서 말하는 <strong>설계(Architecture)</strong>의 핵심입니다.
               </p>

               <h3 className="text-2xl font-bold text-white mt-12 mb-6 border-l-2 border-[#BF953F] pl-6 py-2">
                  Chapter 3. The Mandate (명령)
               </h3>
               <p>
                  이제 당신에게는 무기가 생겼습니다. 남들을 조종하는 심리학, 세금을 지우는 법학, 잠을 자도 돈이 벌리는 공학.
                  이 힘을 어떻게 쓰시겠습니까?
               </p>
               <p>
                  단순히 사치품을 사는 데 낭비하지 마십시오. 그건 시스템이 만든 또 다른 감옥입니다.
                  <strong>'생산 수단'</strong>을 사십시오. <strong>'시간'</strong>을 사십시오.
                  그리고 궁극적으로는, 당신만의 <strong>'제국'</strong>을 건설하십시오.
               </p>
               <p className="text-xl text-white font-bold italic mt-8">
                  우리는 플레이어(Player)가 아닙니다. <br/>
                  우리는 룰을 만드는 설계자(Architect)입니다.
               </p>
            </div>

            {/* Signature Section */}
            <div className="pt-20 pb-10 flex flex-col items-end relative">
               <div className="absolute right-0 top-10 opacity-10">
                  <Crown size={120} strokeWidth={0.5} />
               </div>
               
               <p className="font-serif italic text-white/40 mb-4">See you on the other side,</p>
               
               <div className={`relative w-64 h-24 transition-opacity duration-1000 ${showSignature ? 'opacity-100' : 'opacity-0'}`}>
                  {/* Signature SVG Animation */}
                  <svg viewBox="0 0 300 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(191,149,63,0.5)]">
                     <path 
                        d="M20,50 Q50,10 80,50 T140,50 T200,50 T260,50" 
                        fill="none" 
                        stroke="#BF953F" 
                        strokeWidth="2" 
                        className="animate-draw-path"
                        strokeDasharray="300"
                        strokeDashoffset={showSignature ? "0" : "300"}
                        style={{ transition: 'stroke-dashoffset 2s ease-in-out' }}
                     />
                     <text x="150" y="80" fontFamily="serif" fontSize="24" fill="#BF953F" textAnchor="middle" className="font-cinzel tracking-widest opacity-80">
                        THE ARCHITECT
                     </text>
                  </svg>
               </div>

               <div className="flex items-center gap-2 mt-4 text-[10px] font-mono text-[#BF953F]/60 uppercase tracking-widest">
                  <Fingerprint size={12} />
                  <span>Digital Signature Verified</span>
               </div>
            </div>

          </div>
        </div>

        {/* Loading Bar (Bottom) */}
        <div className="h-1 bg-black w-full">
           <div className="h-full bg-gradient-to-r from-transparent via-[#BF953F] to-transparent w-1/2 animate-[loading-bar_4s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
};
