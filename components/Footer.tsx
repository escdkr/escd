
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { ROUTES } from '../constants/routes';

const DaggerIcon = ({ className, ...props }: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    {...props}
  >
    <defs>
      <linearGradient id="luxuryShardGradientFooter" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2E1065" />
        <stop offset="35%" stopColor="#6366F1" />
        <stop offset="80%" stopColor="#2DD4BF" />
        <stop offset="100%" stopColor="#E0F2FE" />
      </linearGradient>
      <filter id="pointGlowFooter" x="-100%" y="-100%" width="300%" height="300%">
         <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" />
      </filter>
    </defs>
    <g>
      <path
        d="M11 1 L13 1 L13 8 L15.5 8.5 L13.8 10 L12 22 L10.2 10 L8.5 8.5 L11 8 Z"
        fill="url(#luxuryShardGradientFooter)"
      />
      <path
        d="M12 22 L13.8 10 L15.5 8.5 L13 8 L13 1 L12 1 Z"
        fill="#020617"
        fillOpacity="0.45"
        style={{ mixBlendMode: 'multiply' }}
      />
      <path d="M11.5 3 H12.5" stroke="#818CF8" strokeWidth="0.4" opacity="0.2" />
      <path d="M11.5 5 H12.5" stroke="#818CF8" strokeWidth="0.4" opacity="0.2" />
      <path d="M11.5 7 H12.5" stroke="#818CF8" strokeWidth="0.4" opacity="0.2" />
      <path
        d="M12 10 L12 21.5"
        stroke="white"
        strokeWidth="0.2"
        strokeOpacity="0.85"
      />
      <circle cx="12" cy="22" r="1.2" fill="#2DD4BF" filter="url(#pointGlowFooter)" opacity="0.9" />
    </g>
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-brand-charcoal pt-20 pb-10 mt-auto relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#2E1065]/20 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-5">
               <DaggerIcon className="w-12 h-12 -rotate-45" />
               <div className="flex flex-col justify-center -space-y-0.5">
                  <h3 className="font-cinzel text-3xl font-black text-white tracking-tight leading-none">ESCD</h3>
                  <p className="text-[9px] text-[#FBBF24] tracking-[0.45em] uppercase mt-1.5 font-light">ESCAPE DAGGER</p>
               </div>
            </div>
            <p className="text-brand-muted text-sm leading-relaxed max-w-sm font-serif">
              수십 년의 노하우를 단 한 권의 가이드로 응축했습니다.
              소음으로 가득 찬 세상에서 압도적인 권위를 가지는 진짜 무기를 제공합니다.
            </p>
          </div>

          {/* Links Column */}
          <div className="space-y-4">
            <h4 className="text-white font-medium tracking-wide uppercase text-xs">플랫폼</h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li><Link to={ROUTES.CURRICULUM} className="hover:text-[#FBBF24] transition-colors">커리큘럼</Link></li>
              <li><a href="#" className="hover:text-[#FBBF24] transition-colors">가격 정책</a></li>
              <li><Link to={ROUTES.REVIEWS} className="hover:text-[#FBBF24] transition-colors">독자 후기</Link></li>
              <li><Link to={ROUTES.FAQ} className="hover:text-[#FBBF24] transition-colors">자주 묻는 질문</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h4 className="text-white font-medium tracking-wide uppercase text-xs">법적 고지</h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li><Link to={ROUTES.LEGAL} className="hover:text-[#FBBF24] transition-colors">개인정보 처리방침</Link></li>
              <li><Link to={ROUTES.LEGAL} className="hover:text-[#FBBF24] transition-colors">이용 약관</Link></li>
              <li><Link to={ROUTES.LEGAL} className="hover:text-[#FBBF24] transition-colors">환불 정책</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-brand-muted text-xs font-serif tracking-wide">
            © {new Date().getFullYear()} ESCD. The only weapon for your freedom.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-brand-muted hover:text-white transition-colors"><Twitter size={18} /></a>
            <a href="#" className="text-brand-muted hover:text-white transition-colors"><Instagram size={18} /></a>
            <a href="#" className="text-brand-muted hover:text-white transition-colors"><Linkedin size={18} /></a>
            <a href="#" className="text-brand-muted hover:text-white transition-colors"><Mail size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
