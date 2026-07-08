
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Lock, ChevronDown, ChevronRight, Zap, BookOpen, LayoutDashboard, Settings, LogOut, User, Award } from 'lucide-react';
import { Button } from './Button';
import { useSystem } from './SystemCore';
import { ROUTES, courseUrl } from '../constants/routes';
import { useUser } from '../context/UserContext';
import { useProgress } from '../hooks/useProgress';
import { getAllLessons } from '../data/lms/courses';

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
      <path d="M11 1 L13 1 L13 8 L15.5 8.5 L13.8 10 L12 22 L10.2 10 L8.5 8.5 L11 8 Z" fill="url(#luxuryShardGradient)" />
      <path d="M12 22 L13.8 10 L15.5 8.5 L13 8 L13 1 L12 1 Z" fill="#020617" fillOpacity="0.45" style={{ mixBlendMode: 'multiply' }} />
      <path d="M11.5 3 H12.5" stroke="#818CF8" strokeWidth="0.4" opacity="0.25" />
      <path d="M11.5 5 H12.5" stroke="#818CF8" strokeWidth="0.4" opacity="0.25" />
      <path d="M11.5 7 H12.5" stroke="#818CF8" strokeWidth="0.4" opacity="0.25" />
      <path d="M9 8.8 L10.5 10" stroke="#E0F2FE" strokeWidth="0.25" opacity="0.4" />
      <path d="M15 8.8 L13.5 10" stroke="#E0F2FE" strokeWidth="0.25" opacity="0.4" />
      <path d="M12 10 L12 21.5" stroke="white" strokeWidth="0.2" strokeOpacity="0.85" />
      <circle cx="12" cy="22" r="1.2" fill="#2DD4BF" filter="url(#pointGlow)" opacity="0.9" />
    </g>
  </svg>
);

// ── Active link helper ──────────────────────────────────────────────────────
const useIsActive = (to: string) => {
  const { pathname } = useLocation();
  if (to === '/') return pathname === '/';
  return pathname.startsWith(to);
};

// ── Armory dropdown ─────────────────────────────────────────────────────────
const ArmoryDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isActive = pathname.startsWith('/armory');

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        aria-haspopup="true"
        aria-expanded={open}
        className={`flex items-center gap-1 text-sm font-bold tracking-wide transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FBBF24]/40 rounded-sm px-1 ${isActive ? 'text-[#22D3EE]' : 'text-gray-300 hover:text-white'}`}
      >
        무기고
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        {isActive && <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#22D3EE] rounded-full" />}
      </button>

      {open && (
        <div
          role="menu"
          onMouseLeave={() => setOpen(false)}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-[#020617]/98 border border-white/10 rounded-sm shadow-2xl backdrop-blur-xl overflow-hidden animate-fade-in z-50"
        >
          <div className="p-1">
            <Link
              role="menuitem"
              to={ROUTES.FREE_ARMORY}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-sm hover:bg-cyan-500/10 transition-colors group"
            >
              <Zap size={15} className="text-[#22D3EE] shrink-0" />
              <div>
                <p className="text-sm font-bold text-[#22D3EE]">FREE 무기고</p>
                <p className="text-[10px] text-white/30 font-mono">무료 공개 에셋</p>
              </div>
              <span className="ml-auto text-[9px] bg-[#22D3EE] text-black px-1.5 py-0.5 font-black rounded-sm">무료</span>
            </Link>
            <Link
              role="menuitem"
              to={ROUTES.VIP_ARMORY}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-sm hover:bg-[#FBBF24]/5 transition-colors group"
            >
              <Lock size={15} className="text-[#FCF6BA] shrink-0" />
              <div>
                <p className="text-sm font-bold text-[#FCF6BA]">VIP 무기고</p>
                <p className="text-[10px] text-white/30 font-mono">프리미엄 전용 에셋</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

// ── User menu (post-login) ──────────────────────────────────────────────────
const UserMenu: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useUser();
  const allLessons = getAllLessons('the-glitch');
  const { progressPct } = useProgress('the-glitch');
  const pct = progressPct(allLessons.length);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FBBF24]/40 rounded-full"
      >
        {/* Progress ring avatar */}
        <div className="relative w-9 h-9">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
            <circle
              cx="18" cy="18" r="15"
              fill="none"
              stroke="#22D3EE"
              strokeWidth="3"
              strokeDasharray={`${pct * 0.942} 94.2`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-1 rounded-full bg-white/10 flex items-center justify-center">
            <User size={14} className="text-white/60" />
          </div>
        </div>
        <ChevronDown size={12} className={`text-white/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-full right-0 mt-3 w-56 bg-[#020617]/98 border border-white/10 rounded-sm shadow-2xl backdrop-blur-xl overflow-hidden animate-fade-in z-50"
        >
          <div className="px-4 py-3 border-b border-white/5">
            <p className="text-xs font-bold text-white">{user?.name ?? 'Elite Operative'}</p>
            <p className="text-[10px] text-cyan-400 font-mono">{user?.clearance ?? 'Tier-01 Elite'}</p>
            <div className="mt-2">
              <div className="flex justify-between text-[10px] text-white/30 mb-1">
                <span>진도율</span><span className="text-cyan-400">{pct}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>
          <div className="p-1">
            <MenuLink to={ROUTES.DASHBOARD} icon={<LayoutDashboard size={14} />} label="대시보드" onClick={() => setOpen(false)} />
            <MenuLink to={courseUrl('the-glitch')} icon={<BookOpen size={14} />} label="내 강의" onClick={() => setOpen(false)} />
            {pct === 100 && (
              <MenuLink to="/certificate/the-glitch" icon={<Award size={14} />} label="수료증" onClick={() => setOpen(false)} />
            )}
            <MenuLink to={ROUTES.SETTINGS} icon={<Settings size={14} />} label="계정 설정" onClick={() => setOpen(false)} />
            {user?.role === 'admin' && (
              <MenuLink to={ROUTES.ADMIN} icon={<Lock size={14} />} label="어드민" onClick={() => setOpen(false)} />
            )}
          </div>
          <div className="p-1 border-t border-white/5">
            <button
              role="menuitem"
              onClick={() => { setOpen(false); onLogout(); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-colors text-sm"
            >
              <LogOut size={14} />
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const MenuLink: React.FC<{ to: string; icon: React.ReactNode; label: string; onClick: () => void }> = ({ to, icon, label, onClick }) => (
  <Link
    role="menuitem"
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-2.5 rounded-sm hover:bg-white/5 transition-colors text-sm text-white/60 hover:text-white"
  >
    <span className="text-white/30">{icon}</span>
    {label}
  </Link>
);

// ── Desktop NavLink ─────────────────────────────────────────────────────────
const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const isActive = useIsActive(to);
  return (
    <Link
      to={to}
      className={`relative text-sm font-medium tracking-wide transition-all duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FBBF24]/40 rounded-sm px-1 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
    >
      {children}
      {isActive && <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FBBF24]/60 rounded-full" />}
    </Link>
  );
};

// ── Main Navbar ─────────────────────────────────────────────────────────────
export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { sounds } = useSystem();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null);
    navigate(ROUTES.HOME);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    sounds.play(isMobileMenuOpen ? 'click' : 'access');
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const close = () => setIsMobileMenuOpen(false);

  return (
    <nav
      role="navigation"
      aria-label="주 네비게이션"
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b border-white/5 ${
        isScrolled
          ? 'bg-brand-dark/95 backdrop-blur-md py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">

        {/* LOGO */}
        <Link to={ROUTES.HOME} aria-label="ESCD 홈으로" className="flex items-center gap-5 group cursor-pointer z-50 relative">
          <div className="relative">
            <DaggerIcon className="w-14 h-14 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-[50deg] -rotate-45" />
          </div>
          <div className="flex flex-col justify-center -space-y-1">
            <span className="font-cinzel text-4xl font-black text-white tracking-tight leading-none filter contrast-125">ESCD</span>
            <span className="text-[10px] text-[#FBBF24] font-light tracking-[0.48em] uppercase font-sans mt-2 ml-[2px] whitespace-nowrap">ESCAPE DAGGER</span>
          </div>
        </Link>

        {/* DESKTOP CENTER — 비로그인 */}
        {!user && (
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 z-10">
            <ArmoryDropdown />
            <NavLink to={ROUTES.CURRICULUM}>커리큘럼</NavLink>
            <NavLink to={ROUTES.REVIEWS}>후기</NavLink>
            <NavLink to={ROUTES.AUTHOR}>저자 소개</NavLink>
          </div>
        )}

        {/* DESKTOP CENTER — 로그인 후 */}
        {user && (
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 z-10">
            <NavLink to={ROUTES.DASHBOARD}>대시보드</NavLink>
            <NavLink to={courseUrl('the-glitch')}>내 강의</NavLink>
            <ArmoryDropdown />
            <NavLink to={ROUTES.CURRICULUM}>커리큘럼</NavLink>
          </div>
        )}

        {/* DESKTOP RIGHT */}
        <div className="hidden md:flex items-center gap-4 z-10">
          {user ? (
            <UserMenu onLogout={handleLogout} />
          ) : (
            <Button
              variant="outline"
              size="md"
              className="border-[#FBBF24] text-[#FBBF24] hover:bg-[#FBBF24] hover:text-black hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-300 font-bold whitespace-nowrap"
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              지금 시작 →
            </Button>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <div className="md:hidden z-50 flex items-center gap-3">
          {user && <UserMenu onLogout={handleLogout} />}
          <button
            onClick={toggleMenu}
            aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isMobileMenuOpen}
            className={`text-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90 text-red-500' : 'hover:text-[#FBBF24]'}`}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="모바일 메뉴"
        className={`fixed inset-0 bg-[#020617] z-40 md:hidden transition-all duration-500 flex flex-col ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none delay-200'}`}
      >
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

        <div className={`flex-grow flex flex-col justify-center px-8 space-y-8 transition-all duration-700 delay-100 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

          {/* 비로그인 메뉴 */}
          {!user && (
            <>
              <div className="space-y-6">
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] border-b border-white/10 pb-2">탐색</p>
                <MobileNavLink to={ROUTES.FREE_ARMORY} label="FREE 무기고" sub="무료 에셋" onClose={close} accent="cyan" />
                <MobileNavLink to={ROUTES.VIP_ARMORY} label="VIP 무기고" sub="프리미엄 에셋" onClose={close} accent="gold" />
                <MobileNavLink to={ROUTES.CURRICULUM} label="커리큘럼" sub="강의 구성" onClose={close} />
                <MobileNavLink to={ROUTES.REVIEWS} label="독자 후기" sub="생존자 기록" onClose={close} />
                <MobileNavLink to={ROUTES.AUTHOR} label="저자 소개" sub="설계자 신원" onClose={close} />
              </div>
              <Button variant="primary" className="w-full py-5 text-lg font-black shadow-[0_0_30px_rgba(191,149,63,0.3)]" onClick={() => { close(); navigate(ROUTES.LOGIN); }}>
                지금 시작 →
              </Button>
            </>
          )}

          {/* 로그인 후 메뉴 */}
          {user && (
            <>
              <div className="space-y-6">
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] border-b border-white/10 pb-2">내 학습</p>
                <MobileNavLink to={ROUTES.DASHBOARD} label="대시보드" sub="Command Center" onClose={close} accent="cyan" />
                <MobileNavLink to={courseUrl('the-glitch')} label="내 강의" sub="The Glitch" onClose={close} />
                <MobileNavLink to={ROUTES.FREE_ARMORY} label="무기고" sub="에셋 라이브러리" onClose={close} />
                <MobileNavLink to={ROUTES.SETTINGS} label="계정 설정" sub="Identity Protocol" onClose={close} />
              </div>
            </>
          )}
        </div>

        {/* Mobile Footer bar */}
        <div className="p-6 border-t border-white/10 flex justify-between items-center bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-mono text-emerald-500 tracking-widest uppercase">System Online</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to={ROUTES.FAQ} onClick={close} className="text-[9px] font-mono text-white/20 hover:text-white/50 transition-colors uppercase tracking-widest">FAQ</Link>
            <Link to={ROUTES.LEGAL} onClick={close} className="text-[9px] font-mono text-white/20 hover:text-white/50 transition-colors uppercase tracking-widest">Legal</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// ── Mobile nav item ─────────────────────────────────────────────────────────
const MobileNavLink: React.FC<{
  to: string;
  label: string;
  sub: string;
  onClose: () => void;
  accent?: 'cyan' | 'gold';
}> = ({ to, label, sub, onClose, accent }) => {
  const { pathname } = useLocation();
  const isActive = to === '/' ? pathname === '/' : pathname.startsWith(to);
  const accentColor = accent === 'cyan' ? 'group-hover:text-cyan-400' : accent === 'gold' ? 'group-hover:text-[#FBBF24]' : 'group-hover:text-white';

  return (
    <Link to={to} onClick={onClose} className="w-full text-left group block">
      <div className="flex items-baseline justify-between mb-1">
        <span className={`text-3xl font-serif font-black tracking-tight uppercase transition-colors ${isActive ? 'text-white' : `text-white/60 ${accentColor}`}`}>
          {label}
        </span>
        <span className="text-xs font-serif italic text-white/30 group-hover:text-white/60 transition-colors">{sub}</span>
      </div>
      <div className={`h-[1px] w-full transition-colors duration-500 ${isActive ? 'bg-[#FBBF24]/40' : 'bg-white/5 group-hover:bg-white/20'}`} />
    </Link>
  );
};
