
import React, { useState, useEffect } from 'react';
import { Menu, X, Lock, ChevronRight, Zap, Shield } from 'lucide-react';
import { Button } from './Button';
import { useSystem } from './SystemCore';

interface NavbarProps {
  onLogoClick?: () => void;
  onLoginClick?: () => void;
  onCurriculumClick?: () => void;
  onAuthorClick?: () => void;
  onReviewsClick?: () => void;
  onFreeArmoryClick?: () => void; 
  onVIPArmoryClick?: () => void; // Added Prop
}

export const DaggerIcon = ({ className, ...props }: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    {...props}
  >
    <defs>
      <linearGradient id="luxuryShardGradient" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2E1065" />
        <stop offset="35%" stopColor="#6366F1" />
        <stop offset="80%" stopColor="#2DD4BF" />
        <stop offset="100%" stopColor="#E0F2FE" />
      </linearGradient>
      <filter id="pointGlow" x="-100%" y="-100%" width="300%" height="300%">
         <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" />
      </filter>
    </defs>
    <g>
      <path 
        d="M11 1 L13 1 L13 8 L15.5 8.5 L13.8 10 L12 22 L10.2 10 L8.5 8.5 L11 8 Z" 
        fill="url(#luxuryShardGradient)" 
      />
      <path 
        d="M12 22 L13.8 10 L15.5 8.5 L13 8 L13 1 L12 1 Z" 
        fill="#020617" 
        fillOpacity="0.45" 
        style={{ mixBlendMode: 'multiply' }}
      />
      <path d="M11.5 3 H12.5" stroke="#818CF8" strokeWidth="0.4" opacity="0.25" />
      <path d="M11.5 5 H12.5" stroke="#818CF8" strokeWidth="0.4" opacity="0.25" />
      <path d="M11.5 7 H12.5" stroke="#818CF8" strokeWidth="0.4" opacity="0.25" />
      <path d="M9 8.8 L10.5 10" stroke="#E0F2FE" strokeWidth="0.25" opacity="0.4" />
      <path d="M15 8.8 L13.5 10" stroke="#E0F2FE" strokeWidth="0.25" opacity="0.4" />
      <path
        d="M12 10 L12 21.5"
        stroke="white"
        strokeWidth="0.2"
        strokeOpacity="0.85"
      />
      <circle cx="12" cy="22" r="1.2" fill="#2DD4BF" filter="url(#pointGlow)" opacity="0.9" />
    </g>
  </svg>
);

export const Navbar: React.FC<NavbarProps> = ({ onLogoClick, onLoginClick, onCurriculumClick, onAuthorClick, onReviewsClick, onFreeArmoryClick, onVIPArmoryClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { sounds } = useSystem();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const toggleMenu = () => {
    if (!isMobileMenuOpen) sounds.play('access');
    else sounds.play('click');
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b border-white/5 ${
        isScrolled 
          ? 'bg-brand-dark/95 backdrop-blur-md py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
        {/* LOGO */}
        <div 
          className="flex items-center gap-5 group cursor-pointer z-50 relative"
          onClick={onLogoClick}
        >
          <div className="relative">
            <DaggerIcon className="w-14 h-14 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-[50deg] -rotate-45" />
          </div>
          <div className="flex flex-col justify-center -space-y-1">
            <span className="font-cinzel text-4xl font-black text-white tracking-tight leading-none filter contrast-125">
              ESCD
            </span>
            <span className="text-[10px] text-[#FBBF24] font-light tracking-[0.48em] uppercase font-sans mt-2 ml-[2px] whitespace-nowrap">
              ESCAPE DAGGER
            </span>
          </div>
        </div>

        {/* DESKTOP CENTER MENU */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-12 z-10">
          <button onClick={onFreeArmoryClick} className="text-lg font-black tracking-wide transition-all duration-200 flex items-center gap-1 group relative hover:scale-105">
            <span className="text-[#22D3EE] hover:brightness-110 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">FREE 무기고</span>
            <span className="absolute -top-3 -right-6 bg-[#22D3EE] text-black text-[10px] px-1.5 py-0.5 rounded-sm rotate-12 animate-pulse font-black shadow-[0_0_15px_rgba(34,211,238,0.8)] border border-white/10">무료</span>
          </button>

          <button onClick={onVIPArmoryClick} className="text-lg font-black tracking-wide transition-all duration-200 flex items-center gap-2 group hover:scale-105">
            <span className="text-[#FCF6BA] hover:brightness-110 drop-shadow-[0_0_10px_rgba(252,246,186,0.3)]">VIP 무기고</span>
            <Lock size={16} className="text-[#FCF6BA] group-hover:animate-shake transition-all" />
          </button>
        </div>

        {/* DESKTOP RIGHT MENU */}
        <div className="hidden md:flex items-center gap-8 z-10">
          <div className="flex items-center gap-8 pr-4">
            <button onClick={onCurriculumClick} className="text-sm text-gray-300 hover:text-white transition-colors duration-200 font-medium tracking-wide">커리큘럼</button>
            <button onClick={onAuthorClick} className="text-sm text-gray-300 hover:text-white transition-colors duration-200 font-medium tracking-wide">저자 소개</button>
            <button onClick={onReviewsClick} className="text-sm text-gray-300 hover:text-white transition-colors duration-200 font-medium tracking-wide">독자 후기</button>
          </div>
          <Button 
            variant="outline" 
            size="md" 
            className="border-[#FBBF24] text-[#FBBF24] hover:bg-[#FBBF24] hover:text-black hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-300 font-bold"
            onClick={onLoginClick}
          >
            로그인
          </Button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="md:hidden z-50">
          <button 
            onClick={toggleMenu}
            className={`text-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90 text-red-500' : 'hover:text-[#FBBF24]'}`}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY (TACTICAL HUD) */}
      <div className={`fixed inset-0 bg-[#020617] z-40 md:hidden transition-all duration-500 flex flex-col ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none delay-200'}`}>
         {/* Background Grid */}
         <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
         <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[80px] pointer-events-none" />
         
         {/* Menu Content Container */}
         <div className={`flex-grow flex flex-col justify-center px-8 space-y-8 transition-all duration-700 delay-100 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            <div className="space-y-6">
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] border-b border-white/10 pb-2 mb-4">Navigation Protocol</p>
                
                <MobileMenuItem onClick={() => { toggleMenu(); onCurriculumClick?.(); }} label="Curriculum" sub="설계도 확인" />
                <MobileMenuItem onClick={() => { toggleMenu(); onAuthorClick?.(); }} label="The Architect" sub="설계자 신원" />
                <MobileMenuItem onClick={() => { toggleMenu(); onReviewsClick?.(); }} label="Evidence" sub="생존자 기록" />
            </div>

            <div className="space-y-4 pt-8 border-t border-white/10">
               <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] mb-2">Armory Access</p>
               
               <button onClick={() => { toggleMenu(); onFreeArmoryClick?.(); }} className="w-full p-4 bg-cyan-900/10 border border-cyan-500/30 flex items-center justify-between group active:bg-cyan-500/20 transition-colors rounded-sm">
                  <div className="flex items-center gap-3">
                     <Zap size={18} className="text-cyan-400" />
                     <span className="font-serif font-bold text-cyan-400 tracking-wider">FREE 무기고</span>
                  </div>
                  <ChevronRight size={16} className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
               </button>

               <button onClick={() => { toggleMenu(); onVIPArmoryClick?.(); }} className="w-full p-4 bg-gold/5 border border-gold/30 flex items-center justify-between group active:bg-gold/20 transition-colors rounded-sm">
                  <div className="flex items-center gap-3">
                     <Lock size={18} className="text-gold" />
                     <span className="font-serif font-bold text-gold tracking-wider">VIP 무기고</span>
                  </div>
                  <ChevronRight size={16} className="text-gold group-hover:translate-x-1 transition-transform" />
               </button>
            </div>

            <Button 
              variant="primary" 
              className="w-full py-5 text-lg font-black mt-8 shadow-[0_0_30px_rgba(191,149,63,0.3)]"
              onClick={() => { toggleMenu(); onLoginClick?.(); }}
            >
              시스템 로그인
            </Button>
         </div>

         {/* Footer Status */}
         <div className="p-6 border-t border-white/10 flex justify-between items-center bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
               <span className="text-[9px] font-mono text-emerald-500 tracking-widest uppercase">System Online</span>
            </div>
            <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">v2.4.1 mobile</span>
         </div>
      </div>
    </nav>
  );
};

const MobileMenuItem: React.FC<{ onClick: () => void; label: string; sub: string }> = ({ onClick, label, sub }) => (
  <button onClick={onClick} className="w-full text-left group">
     <div className="flex items-baseline justify-between mb-1">
        <span className="text-3xl font-serif font-black text-white group-hover:text-gold transition-colors tracking-tight uppercase">{label}</span>
        <span className="text-xs font-serif italic text-white/40 group-hover:text-white/80 transition-colors">{sub}</span>
     </div>
     <div className="h-[1px] w-full bg-white/5 group-hover:bg-gold/50 transition-colors origin-left duration-500" />
  </button>
);
