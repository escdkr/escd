import React, { useState, forwardRef, useImperativeHandle } from 'react';

export interface Book3DRef {
  open: () => void;
}

interface Book3DProps {
  onOpenComplete: () => void;
}

export const Book3D = forwardRef<Book3DRef, Book3DProps>(({ onOpenComplete }, ref) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenAction = () => {
    if (isOpening) return;
    setIsOpening(true);
    
    // 0.8초 애니메이션 완료 후 페이지 전환 알림
    setTimeout(() => {
      onOpenComplete();
      setIsOpening(false);
    }, 800);
  };

  // 부모 컴포넌트(Home/App)에서 외부 버튼으로 애니메이션을 트리거할 수 있도록 ref 노출
  useImperativeHandle(ref, () => ({
    open: handleOpenAction
  }));

  return (
    <div className="relative flex justify-center py-10 md:py-0 perspective-1000 book-container z-20">
       {/* The Book Object */}
       <div 
         onClick={handleOpenAction}
         className={`relative w-[320px] h-[480px] preserve-3d transition-all duration-[800ms] ease-in-out cursor-pointer group
           ${isOpening ? 'rotate-y-0 rotate-x-0 scale-110' : 'book-float'}
         `}
       >
          {/* Book Shadow/Glow (The Aura) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#BF953F]/20 blur-[60px] rounded-full pointer-events-none group-hover:bg-[#BF953F]/30 transition-colors"></div>

          {/* 속지 (Inner Page) - Reveals when opened */}
          <div 
            className={`absolute inset-0 bg-[#fbfbf9] rounded-sm flex flex-col items-center justify-center p-12 transition-opacity duration-300 [transform:translateZ(24px)] z-10 border-r border-black/5
              ${isOpening ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <div className="absolute inset-0 opacity-10 [background:url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
            <div className="relative text-center">
              <span className="block text-[8px] text-black/30 tracking-[0.6em] uppercase font-serif font-bold mb-8">Unauthorized</span>
              <h3 className="font-serif font-black text-2xl text-black/80 mb-2">Chapter 01</h3>
              <div className="w-8 h-[1px] bg-black/10 mx-auto mb-6"></div>
              <p className="font-cinzel text-black text-lg font-bold tracking-[0.2em] leading-tight uppercase">The<br/>Awakening</p>
              <div className="mt-12 text-[7px] text-black/20 font-mono tracking-widest animate-pulse">DECRYPTING...</div>
            </div>
          </div>

          {/* Front Cover */}
          <div 
            className={`absolute inset-0 bg-[#0a0a0a] rounded-[2px] flex flex-col items-center justify-center p-1 backface-hidden z-20 overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] transition-all duration-[800ms] origin-left
              ${isOpening ? '[transform:rotateY(-160deg)_translateZ(25px)] opacity-95' : '[transform:translateZ(25px)]'}
            `}
          >
             {/* Cover Inner Frame (Simulated Metallic Border) */}
             <div className="w-full h-full border-[1px] border-[#BF953F]/30 relative p-6 flex flex-col justify-between overflow-hidden bg-[#050505]">
                <div className="absolute inset-0 noise-texture opacity-30 mix-blend-overlay pointer-events-none"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(252,246,186,0.15),transparent_60%)] pointer-events-none"></div>
                <div className="text-center relative z-10">
                  <span className="block text-[8px] text-[#BF953F] tracking-[0.5em] uppercase font-serif font-bold mb-2">Restricted</span>
                  <div className="mx-auto w-[1px] h-8 bg-gradient-to-b from-transparent via-[#BF953F] to-transparent"></div>
                </div>
                <div className="relative z-10 text-center transform translate-y-[-10px]">
                  <h2 className="font-cinzel text-5xl font-bold text-gold tracking-widest drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    THE<br/>GLITCH
                  </h2>
                  <div className="flex items-center justify-center gap-4 mt-6">
                      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#BF953F] to-transparent"></div>
                      <span className="font-serif italic text-[#94a3b8] text-xs font-medium">Vol. I</span>
                      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#BF953F] to-transparent"></div>
                  </div>
                </div>
                <div className="text-center relative z-10">
                  <p className="font-cinzel text-[#BF953F] text-[10px] tracking-[0.3em] uppercase mb-1 font-bold">The Architecture</p>
                  <p className="text-[8px] text-[#525252] font-mono tracking-widest">M.M.XX.IV</p>
                </div>
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#BF953F]/60"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#BF953F]/60"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#BF953F]/60"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#BF953F]/60"></div>
             </div>
             <div className="absolute inset-0 border border-[#BF953F]/20 pointer-events-none"></div>
          </div>

          {/* Spine (Left Side) - Metallic Gold Binding */}
          <div 
            className={`absolute top-0 bottom-0 left-0 w-[50px] bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] [transform:rotateY(-90deg)_translateZ(25px)] flex items-center justify-center z-10 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] border-l border-[#BF953F]/30 transition-opacity duration-300
              ${isOpening ? 'opacity-0' : 'opacity-100'}
            `}
          >
             <div className="absolute top-10 w-full h-[2px] bg-[#BF953F]/40 shadow-[0_1px_2px_rgba(0,0,0,1)]"></div>
             <div className="absolute top-12 w-full h-[2px] bg-[#BF953F]/40 shadow-[0_1px_2px_rgba(0,0,0,1)]"></div>
             <div className="absolute bottom-10 w-full h-[2px] bg-[#BF953F]/40 shadow-[0_1px_2px_rgba(0,0,0,1)]"></div>
             <div className="absolute bottom-12 w-full h-[2px] bg-[#BF953F]/40 shadow-[0_1px_2px_rgba(0,0,0,1)]"></div>
             <div className="[transform:rotate(90deg)]">
                  <span className="font-cinzel text-gold text-xs font-bold tracking-[0.4em] uppercase whitespace-nowrap drop-shadow-md">The Architect</span>
             </div>
          </div>

          {/* Back Cover */}
          <div className="absolute inset-0 bg-[#0a0a0a] rounded-l-[2px] border border-[#BF953F]/10 [transform:rotateY(180deg)_translateZ(25px)] shadow-2xl">
              <div className="absolute inset-0 noise-texture opacity-20"></div>
          </div>

          {/* Pages - Gilded Edges */}
          <div className={`absolute top-[2px] bottom-[2px] right-[2px] w-[46px] bg-[#e5e5e5] [transform:rotateY(90deg)_translateZ(318px)] shadow-inner overflow-hidden transition-all duration-[800ms] ${isOpening ? 'opacity-50' : ''}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#BF953F] opacity-30"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#555_1px,transparent_1px)] bg-[length:2px_100%] opacity-10"></div>
          </div>
          <div className="absolute top-0 right-0 w-[318px] h-[46px] bg-[#f5f5f5] [transform:rotateX(90deg)_translateZ(24px)] origin-bottom shadow-inner overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-transparent opacity-30"></div>
             <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#555_1px,transparent_1px)] bg-[length:100%_2px] opacity-10"></div>
          </div>
           <div className="absolute bottom-0 right-0 w-[318px] h-[46px] bg-[#f5f5f5] [transform:rotateX(-90deg)_translateZ(444px)] origin-bottom shadow-inner">
             <div className="absolute inset-0 bg-gradient-to-t from-[#BF953F] via-[#FCF6BA] to-transparent opacity-30"></div>
             <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#555_1px,transparent_1px)] bg-[length:100%_2px] opacity-10"></div>
          </div>
       </div>
    </div>
  );
});