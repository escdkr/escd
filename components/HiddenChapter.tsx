
import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ArrowLeft, 
  Lock, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Download, 
  Unlock,
  Menu,
  List,
  Moon,
  ZoomIn,
  Feather,
  Terminal,
  AlertTriangle,
  Quote,
  ChevronRight,
  Fingerprint
} from 'lucide-react';
import { useSystem } from './SystemCore';
import { BookData } from '../types/book';
import { LIBRARY_DB } from '../data/books';

interface HiddenChapterProps {
  onCheckout: () => void;
  onBack: () => void;
  isUnlocked?: boolean; 
}

// --- 1. GOLD DUST PARTICLE SYSTEM ---
const GoldDust: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setOffset({
        x: (window.innerWidth / 2 - e.clientX) * 0.02,
        y: (window.innerHeight / 2 - e.clientY) * 0.02,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-[#BF953F]/10 to-transparent blur-[100px]" />
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#BF953F] opacity-40 animate-float-slow"
          style={{
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            transform: `translate(${offset.x * (Math.random() + 0.5)}px, ${offset.y * (Math.random() + 0.5)}px)`,
            transition: 'transform 0.5s ease-out',
            boxShadow: '0 0 4px rgba(191, 149, 63, 0.8)'
          }}
        />
      ))}
    </div>
  );
};

// --- 2. OBSIDIAN GLASS MONOLITH (The Book) ---
const ObsidianMonolith = ({ book, onClick }: { book: BookData; onClick: () => void }) => (
  <div className="relative w-[360px] h-[540px] z-20 group cursor-pointer perspective-1000" onClick={onClick}>
    <div className="relative w-full h-full animate-[float-gentle_6s_ease-in-out_infinite] transition-transform duration-500 group-hover:scale-[1.02]">
      <div 
        className="absolute inset-0 bg-[#050505] rounded-[2px] overflow-hidden transition-all duration-500"
        style={{
            boxShadow: `
                inset -2px 0 4px rgba(255,255,255,0.4), 
                inset 1px 0 2px rgba(255,255,255,0.1),
                0 0 30px rgba(0,0,0,0.8)
            `,
            borderRight: `1px solid ${book.baseColor}40`
        }}
      >
         <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none mix-blend-overlay" />
         <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(circle,_var(--glow-color)_0%,_transparent_70%)] opacity-20 group-hover:opacity-40 transition-opacity duration-1000 blur-2xl"
            style={{ '--glow-color': book.baseColor } as React.CSSProperties}
         />
         <div className="absolute inset-0 noise-texture opacity-40 mix-blend-overlay pointer-events-none" />
         <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
            <div className="flex justify-between items-start opacity-70">
                <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-mono tracking-[0.4em] text-white/40 uppercase">Classified</span>
                    <div className="w-8 h-[1px] bg-white/20" />
                </div>
                <Lock size={12} className="text-white/30" />
            </div>
            <div className="space-y-6 text-center transform translate-y-[-20px]">
                <h1 
                    className="font-sans font-black text-5xl tracking-tight leading-[0.9] text-white"
                    style={{ 
                        textShadow: `0 0 15px ${book.baseColor}, 0 0 30px ${book.baseColor}` 
                    }}
                >
                    {book.title.split(':')[0]}
                </h1>
                <p className="font-serif italic text-white/60 text-xs tracking-widest uppercase drop-shadow-md">
                    {book.subtitle}
                </p>
            </div>
            <div className="text-center space-y-4">
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto" />
                <span className="text-[7px] font-mono text-white/50 tracking-[0.6em] uppercase block">
                    Authored By
                </span>
                <span className="text-[10px] font-black font-cinzel text-white/90 tracking-[0.4em] uppercase block border-t border-white/10 pt-2">
                    The Architect
                </span>
            </div>
         </div>
      </div>
      <div className="absolute top-[2px] bottom-[2px] -right-[4px] w-[4px] bg-[#1a1a1a] border-r border-white/10 rounded-r-[1px] opacity-80" />
    </div>
    <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-40 h-4 bg-black blur-xl rounded-full opacity-60 animate-[shadow-breathe_6s_ease-in-out_infinite]" />
    <style>{`
      @keyframes float-gentle {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      @keyframes shadow-breathe {
        0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.6; }
        50% { transform: translateX(-50%) scale(0.8); opacity: 0.4; }
      }
    `}</style>
  </div>
);

// --- 3. LIQUID TRIGGER BUTTON ---
const LiquidTrigger = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button 
    onClick={onClick}
    className="group relative px-12 py-5 overflow-hidden rounded-[2px] transition-all duration-300 hover:scale-[1.03] active:scale-95"
    style={{
        background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA8011 100%)',
        border: '1px solid #F3E5AB',
        boxShadow: '0 0 15px rgba(212, 175, 55, 0.6)'
    }}
  >
    <div className="absolute inset-0 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)] pointer-events-none rounded-[2px]" />
    <span className="relative z-10 font-sans font-bold text-xs tracking-[0.3em] uppercase text-[#000000] flex items-center gap-3 justify-center group-hover:tracking-[0.4em] transition-all duration-300">
      <Zap size={12} className="fill-black text-black" />
      {label}
    </span>
  </button>
);

// --- 4. HUD DASHBOARD ITEM ---
const HUDItem = ({ book, isActive, onClick }: { book: BookData; isActive: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-6 py-5 group relative transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
  >
    <div className={`absolute right-full mr-4 h-[1px] bg-[#BF953F] transition-all duration-500 ${isActive ? 'w-12 opacity-100' : 'w-0 opacity-0'}`} />
    <span className={`font-mono text-xs tracking-widest ${isActive ? 'text-white font-bold' : 'text-[#BF953F]'}`}>
      {isActive ? '>>' : '0' + (LIBRARY_DB.indexOf(book) + 1)}
    </span>
    <div className="flex-grow text-left">
      <h3 className={`font-sans font-bold uppercase tracking-wider text-sm transition-all duration-300 ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-gray-400'}`}>
        {book.title}
      </h3>
      {isActive && (
        <div className="flex items-center gap-4 mt-2 animate-fade-in">
           <span className="text-[8px] font-mono text-[#BF953F] tracking-[0.2em] uppercase">{book.subtitle}</span>
           <div className="h-[1px] w-16 bg-white/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-[#BF953F]" style={{ width: `${book.stats.proficiency}%` }} />
           </div>
        </div>
      )}
    </div>
    <div className={`transition-all duration-500 ${isActive ? 'text-[#BF953F] scale-110 drop-shadow-[0_0_5px_#BF953F]' : 'text-gray-600'}`}>
       {isActive ? <CheckCircle2 size={14} /> : <Lock size={12} />}
    </div>
  </button>
);

// --- REUSED COVER PAGE FOR READER ---
const CoverPage2D = ({ book }: { book: BookData }) => (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-[#030303] shadow-[0_0_100px_rgba(0,0,0,1)] border border-[#1a1a1a] p-12 group">
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_${book.baseColor}15_0%,_transparent_70%)] pointer-events-none`} />
        <div className="absolute inset-0 noise-texture opacity-30 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-4 border border-white/5 pointer-events-none" />
        <div className="absolute inset-6 border border-white/5 pointer-events-none" />
        <div className="relative z-10 w-full h-full flex flex-col justify-between py-12">
            <div className="flex justify-between items-start">
                 <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-white/30 text-[9px] font-mono uppercase tracking-[0.3em]">
                        <Lock size={10} />
                        <span>Classified Document</span>
                    </div>
                    <div className="text-[8px] font-mono text-white/10 tracking-widest">
                        SERIAL: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </div>
                 </div>
                 <div className={`px-3 py-1 border text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-md`} style={{ borderColor: book.baseColor, color: book.baseColor }}>
                    Master Copy
                 </div>
            </div>
            <div className="space-y-12 text-center relative">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 pointer-events-none" />
                <div className="relative inline-block backdrop-blur-sm px-8 py-4">
                    <h1 className="font-serif font-black text-5xl md:text-7xl text-white tracking-tighter leading-[1.1] drop-shadow-2xl">
                        {book.title.includes('.') ? (
                            <>
                                {book.title.split('.')[0]}<span style={{ color: book.baseColor }}>.</span>
                            </>
                        ) : book.title}
                    </h1>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="h-16 w-[1px]" style={{ background: `linear-gradient(to bottom, transparent, ${book.baseColor}, transparent)` }} />
                    <p className="font-mono text-xs uppercase tracking-[0.6em] text-white/40">{book.subtitle}</p>
                </div>
            </div>
            <div className="flex justify-between items-end border-t border-white/5 pt-8">
                <div className="space-y-2">
                    <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Market Valuation</p>
                    <p className="text-3xl font-serif font-black italic tracking-tighter text-white/90">
                        290,000 <span className="text-sm font-sans font-normal opacity-50 not-italic">KRW</span>
                    </p>
                </div>
                <div className="text-right space-y-2">
                    <div className="flex items-center justify-end gap-2 text-[9px] font-mono text-white/20 uppercase tracking-widest">
                        <Feather size={10} />
                        <span>Authorized By</span>
                    </div>
                    <div className="font-cinzel text-xl font-bold tracking-widest uppercase" style={{ color: book.baseColor }}>
                        {book.author}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// --- CONTENT PARSER ---
const renderPageContent = (text: string, selectedBook: BookData, onCtaClick?: () => void, isUnlocked: boolean = false) => {
    const processInlineStyles = (content: string) => {
        const accentColor = selectedBook.baseColor; 
        
        let processed = content.replace(/(['"])(.*?)\1/g, `<span class="italic font-medium opacity-90" style="color:${accentColor}99">$1$2$1</span>`);
        processed = processed.replace(/\*\*(.*?)\*\*/g, `<strong class="font-bold bg-white/10 px-1.5 py-0.5 rounded-sm mx-0.5 text-white shadow-sm" style="color:${accentColor}">$1</strong>`);
        processed = processed.replace(/\[(.*?)\]/g, `<span class="inline-flex items-center justify-center px-2.5 py-0.5 mx-1 text-base font-black font-mono uppercase tracking-wider bg-white/10 border border-white/40 rounded-[4px] text-white shadow-[0_0_10px_rgba(255,255,255,0.2)]" style="color:${selectedBook.baseColor}">$1</span>`);
        return { __html: processed };
    };
     
    let currentBlock: { type: string, title?: string, content: string[] } | null = null;
    const elements: React.ReactNode[] = [];
    const lines = text.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        if (trimmed === '[CTA_REQUIRED]') {
            if (isUnlocked) continue; 

            // --- REDESIGNED CTA BLOCK ---
            elements.push(
                <div key={`${i}-cta`} className="my-20 relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-[#BF953F]/10 to-transparent blur-xl group-hover:opacity-100 opacity-50 transition-opacity duration-1000" />
                    
                    <div className="relative border border-[#BF953F]/30 bg-[#0a0a0a] p-12 text-center rounded-sm overflow-hidden">
                        {/* Lock Animation */}
                        <div className="mb-8 flex justify-center">
                            <div className="w-20 h-20 rounded-full border-2 border-[#BF953F]/30 bg-[#BF953F]/5 flex items-center justify-center relative">
                                <div className="absolute inset-0 rounded-full border border-[#BF953F]/20 animate-ping opacity-20" />
                                <Lock size={32} className="text-[#BF953F] drop-shadow-[0_0_15px_rgba(191,149,63,0.5)]" />
                            </div>
                        </div>

                        <div className="space-y-4 mb-10">
                            <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                                Access <span className="text-[#BF953F]">Restricted</span>
                            </h3>
                            <p className="text-gray-400 font-serif text-lg leading-relaxed max-w-xl mx-auto">
                                "여기서부터는 <strong>설계자(Architect)</strong>의 영역입니다.<br/>
                                빨간 약을 삼키고, 시스템의 진실을 마주할 준비가 되셨습니까?"
                            </p>
                        </div>

                        <button 
                            onClick={onCtaClick}
                            className="relative group/btn inline-flex items-center justify-center gap-4 px-12 py-5 bg-[#BF953F] hover:bg-white text-black font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_0_30px_rgba(191,149,63,0.4)] hover:shadow-[0_0_50px_rgba(255,255,255,0.6)]"
                        >
                            <Fingerprint size={20} className="opacity-60" />
                            Unlock Full Blueprint
                            <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                        
                        <div className="mt-8 flex justify-center gap-8 text-[10px] font-mono text-[#BF953F]/40 uppercase tracking-widest">
                            <span className="flex items-center gap-2"><ShieldCheck size={10} /> Encrypted</span>
                            <span className="flex items-center gap-2"><Terminal size={10} /> 290,000 KRW</span>
                        </div>
                    </div>
                </div>
            );
            
            // Render remaining content blurred
            const remaining = lines.slice(i + 1).join('\n');
            if (remaining.trim()) {
                 elements.push(
                    <div key={`${i}-blurred`} className="blur-[8px] opacity-20 pointer-events-none mt-12 space-y-6 select-none relative" style={{ maxHeight: '600px', overflow: 'hidden' }}>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] z-10" />
                        {remaining.split('\n').slice(0, 15).map((l, idx) => ( 
                            <p key={idx} className="leading-loose text-gray-400 font-serif text-lg">{l}</p>
                        ))}
                    </div>
                 );
            }
            break; 
        }

        if (trimmed.startsWith('[BOX')) {
            const title = line.match(/\[BOX:(.*?)\]/)?.[1] || "SYSTEM NOTE";
            currentBlock = { type: 'BOX', title, content: [] };
            continue;
        }
        if (trimmed === '[ARCHITECT_NOTE]') {
            currentBlock = { type: 'ARCHITECT_NOTE', content: [] };
            continue;
        }
        if (trimmed.startsWith('[WARNING')) {
            currentBlock = { type: 'WARNING', content: [] };
            continue; 
        }
        if (trimmed === '[SYSTEM_MESSAGE]') {
            currentBlock = { type: 'SYSTEM_MESSAGE', content: [] };
            continue;
        }
        if (trimmed === '[LIST]') {
            currentBlock = { type: 'LIST', content: [] };
            continue;
        }

        if (trimmed.startsWith('[/')) {
            if (currentBlock) {
                if (currentBlock.type === 'BOX') {
                    elements.push(
                        <div key={`box-${i}`} className={`bg-white/5 border p-6 my-8 rounded-sm relative group hover:opacity-100 transition-colors ${selectedBook.id === 'gage' ? 'border-emerald-500/20 bg-emerald-900/10' : 'border-white/10'}`}>
                            <span className={`absolute -top-3 left-4 bg-black px-2 text-xs font-bold font-mono uppercase tracking-widest border ${selectedBook.id === 'gage' ? 'border-emerald-500/50 text-emerald-500' : 'border-[#BF953F]/20 text-[#BF953F]'}`}>{currentBlock.title?.replace(/_/g, ' ')}</span>
                            <div className="pt-2 text-sm leading-relaxed text-gray-300 font-sans space-y-1">
                                {currentBlock.content.map((l, idx) => (<div key={idx} dangerouslySetInnerHTML={processInlineStyles(l)} />))}
                            </div>
                        </div>
                    );
                } else if (currentBlock.type === 'ARCHITECT_NOTE') {
                     elements.push(
                        <div key={`note-${i}`} className={`my-8 p-6 border-l-4 italic font-serif relative ${selectedBook.id === 'gage' ? 'border-emerald-500 bg-emerald-900/10 text-emerald-100' : 'border-[#BF953F] bg-[#BF953F]/5 text-gray-300'}`}>
                            <Quote className={`absolute top-4 right-4 ${selectedBook.id === 'gage' ? 'text-emerald-500/20' : 'text-[#BF953F]/20'}`} size={24} />
                            <div className="space-y-2">{currentBlock.content.map((l, idx) => <p key={idx} dangerouslySetInnerHTML={processInlineStyles(l)} />)}</div>
                        </div>
                     );
                } else if (currentBlock.type === 'WARNING') {
                     elements.push(
                        <div key={`warn-${i}`} className="my-8 p-6 border border-red-500/30 bg-red-900/10 text-red-200 flex gap-4 items-start rounded-sm">
                            <AlertTriangle className="shrink-0 text-red-500" />
                            <div className="space-y-1 text-sm w-full">
                                <div className="font-bold text-red-500 uppercase text-xs tracking-widest mb-2">SYSTEM WARNING</div>
                                {currentBlock.content.map((l, idx) => <p key={idx} dangerouslySetInnerHTML={processInlineStyles(l)} />)}
                            </div>
                        </div>
                     );
                } else if (currentBlock.type === 'SYSTEM_MESSAGE') {
                     elements.push(
                        <div key={`sys-${i}`} className="my-8 p-4 bg-black border border-green-500/30 text-green-400 font-mono text-xs leading-loose shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                            <Terminal className="inline-block mr-2 mb-1" size={12}/>
                            {currentBlock.content.map((l, idx) => <div key={idx} dangerouslySetInnerHTML={processInlineStyles(l)} />)}
                        </div>
                     );
                } else if (currentBlock.type === 'LIST') {
                     elements.push(
                        <ul key={`list-${i}`} className="space-y-2 my-4 pl-4 border-l border-white/10 text-gray-300">
                             {currentBlock.content.map((l, idx) => <li key={idx} dangerouslySetInnerHTML={processInlineStyles(l)} />)}
                        </ul>
                     );
                }
                currentBlock = null;
            }
            continue;
        }

        if (currentBlock) {
            currentBlock.content.push(line);
            continue;
        }

        if (trimmed === 'COVER_PAGE') continue;

        if (trimmed.startsWith('[PART]')) {
            elements.push(<h2 key={i} className="text-3xl font-serif font-black mt-16 mb-8 border-b-2 pb-4 uppercase tracking-tight" style={{ color: selectedBook.baseColor, borderColor: `${selectedBook.baseColor}40` }}>{line.replace('[PART]', '')}</h2>);
            continue;
        }

        if (trimmed) {
            if (trimmed.match(/^(제\d+장\.|Chapter \d+\.)/)) {
                 elements.push(<h3 key={i} className="text-2xl font-black mt-12 mb-4 tracking-tight" style={{ color: selectedBook.baseColor }}>{trimmed}</h3>);
            } else if (trimmed.startsWith('(Subtitle:')) {
                 const subtitleText = trimmed.replace('(Subtitle:', '').replace(')', '').trim();
                 elements.push(
                    <div key={i} className="flex items-center gap-3 mb-6 pl-1">
                        <div className="h-[1px] w-8" style={{ backgroundColor: selectedBook.baseColor }} />
                        <p className="font-bold text-lg italic" style={{ color: selectedBook.baseColor }}>{subtitleText}</p>
                    </div>
                 );
            } else if (trimmed.startsWith('(Source:')) {
                 const sourceText = trimmed.replace('(Source:', '').replace(')', '').trim();
                 elements.push(
                    <div key={i} className="text-xs font-mono border-l-2 pl-3 mb-8 py-2 bg-white/5 rounded-r-sm inline-block" style={{ borderColor: selectedBook.baseColor, color: `${selectedBook.baseColor}dd` }}>
                        SOURCE_DATA: {sourceText}
                    </div>
                 );
            } else if (trimmed.match(/^\d+\.\s/)) { 
                 const match = trimmed.match(/^(\d+)\.\s+(.*)/);
                 if (match) {
                     const [_, num, content] = match;
                     elements.push(
                        <div key={i} className="flex gap-6 p-6 my-6 bg-white/[0.02] border-l-4 rounded-r-sm hover:bg-white/[0.04] transition-all group relative overflow-hidden" style={{ borderColor: selectedBook.baseColor }}>
                            <div className="shrink-0 flex flex-col items-center justify-start pt-1">
                                <span className="text-3xl font-black font-serif leading-none opacity-80" style={{ color: selectedBook.baseColor }}>{num}</span>
                            </div>
                            <div className="relative z-10 flex-grow">
                                <div className="text-lg text-gray-200 font-serif leading-relaxed" dangerouslySetInnerHTML={processInlineStyles(content)} />
                            </div>
                        </div>
                     );
                 } else {
                     elements.push(<p key={i} className="mb-4 leading-loose text-gray-300 font-serif text-lg" dangerouslySetInnerHTML={processInlineStyles(line)} />);
                 }
            } else {
                 elements.push(<p key={i} className="mb-4 leading-loose text-gray-300 font-serif text-lg" dangerouslySetInnerHTML={processInlineStyles(line)} />);
            }
        } else {
            elements.push(<br key={i} />);
        }
    }
    return <div className="space-y-1">{elements}</div>;
};

// --- EXPORTED COMPONENT ---
export const HiddenChapter: React.FC<HiddenChapterProps> = ({ onCheckout, onBack, isUnlocked = false }) => {
  const { sounds } = useSystem();
  const [mode, setMode] = useState<'library' | 'reader'>('library');
  const [selectedBookId, setSelectedBookId] = useState<string>('glitch');
  
  // Reader State
  const [currentPage, setCurrentPage] = useState(0);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const selectedBook = LIBRARY_DB.find(b => b.id === selectedBookId) || LIBRARY_DB[0];
  const pdfPages = selectedBook.pages;

  // Generate TOC
  const toc = pdfPages.reduce((acc: { title: string, page: number }[], page, idx) => {
    const match = page.match(/^\[PART\] (.*)/m) || page.match(/^(제\d+장\.|Chapter \d+\.)(.*)/m);
    if (match) {
        let title = match[1] || match[0];
        if (page.includes('[PART]')) title = page.split('\n')[0].replace('[PART]', '').trim();
        acc.push({ title: title, page: idx });
    }
    return acc;
  }, []);

  const handleActivate = () => {
    sounds.play('access');
    setMode('reader');
  };

  const PageComponent = ({ index }: { index: number }) => {
    if (index < 0 || index >= pdfPages.length) return <div className="w-full h-full bg-transparent" />;
    
    if (pdfPages[index] === 'COVER_PAGE') {
        return (
            <div className="w-full h-full flex items-center justify-center p-8 bg-[#020617] min-h-[900px]">
                <div className="w-[min(100%,700px)] aspect-[1/1.4] shadow-2xl relative transform scale-90 md:scale-100">
                    <CoverPage2D book={selectedBook} />
                </div>
            </div>
        );
    }

    return (
      <div className={`relative shadow-xl flex flex-col bg-[#0f0f0f] border w-full max-w-4xl mx-auto min-h-[1000px] mb-8`} style={{ borderColor: `${selectedBook.baseColor}20` }}>
        <div className="h-12 border-b flex items-center justify-between px-8 text-[10px] font-mono uppercase tracking-widest bg-[#0a0a0a]" style={{ borderColor: `${selectedBook.baseColor}10`, color: `${selectedBook.baseColor}80` }}>
            <span>{selectedBook.subtitle}</span>
            <span>Page {index}</span>
        </div>
        <div className="flex-grow p-12 md:p-20">
           {renderPageContent(pdfPages[index], selectedBook, onCheckout, isUnlocked)}
        </div>
        <div className="h-16 border-t flex items-center justify-center text-[10px] font-mono uppercase tracking-[0.3em] bg-[#0a0a0a]" style={{ borderColor: `${selectedBook.baseColor}10`, color: `${selectedBook.baseColor}40` }}>
            <div className="flex items-center gap-2">
                <ShieldCheck size={10} />
                <span>CONTENT INTEGRITY VERIFIED: NO SUMMARIZATION</span>
            </div>
        </div>
      </div>
    );
  };

  // --- LIBRARY MODE ---
  if (mode === 'library') {
    return (
      <div className="fixed inset-0 z-[10000] bg-[#000000] flex flex-col md:flex-row overflow-hidden font-sans cursor-none">
        {/* Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#02050A_0%,_#000000_100%)] pointer-events-none" />
        <GoldDust />
        
        {/* God Ray Lighting */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[800px] bg-gradient-to-b from-white/10 via-white/5 to-transparent blur-3xl pointer-events-none rotate-12 z-10" />
        
        {/* Header HUD */}
        <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start z-30 pointer-events-none">
           <div className="flex flex-col gap-1 pointer-events-auto">
              <button onClick={onBack} className="text-[#BF953F] text-[10px] font-mono tracking-[0.3em] uppercase hover:text-white transition-colors flex items-center gap-2">
                 <ArrowLeft size={12} /> Abort Mission
              </button>
              <h2 className="text-white/20 font-black text-4xl tracking-tighter uppercase select-none">Command Console</h2>
           </div>
           <div className="text-right">
              <div className="text-[#BF953F] font-mono text-[10px] tracking-[0.3em] uppercase animate-pulse">System Secure</div>
              <div className="text-white/30 text-[10px] font-mono tracking-widest mt-1">ID: ARCHITECT-01</div>
           </div>
        </div>

        {/* LEFT: The Monolith Stage */}
        <div className="relative w-full md:w-[60%] h-full flex flex-col items-center justify-center p-12 z-20">
           <ObsidianMonolith book={selectedBook} onClick={handleActivate} />
           
           <div className="mt-16 flex flex-col items-center gap-4">
              <LiquidTrigger onClick={handleActivate} label="ACTIVATE" />
              <span className="text-[8px] font-mono text-white/20 tracking-[0.3em] uppercase flex items-center gap-2">
                 <Lock size={8} /> Web_Viewer_Only : Secure Connection
              </span>
           </div>
        </div>

        {/* RIGHT: HUD Dashboard */}
        <div className="w-full md:w-[40%] h-full relative z-20 flex flex-col justify-center border-l border-white/5 bg-gradient-to-l from-black via-black to-transparent backdrop-blur-sm">
           <div className="px-12 py-8 border-b border-white/5">
              <span className="text-[9px] font-mono text-[#BF953F] uppercase tracking-[0.4em] font-bold">Installed Modules</span>
           </div>
           
           <div className="flex-grow overflow-y-auto px-12 py-4 space-y-2 no-scrollbar">
              {LIBRARY_DB.map((book) => (
                 <HUDItem 
                    key={book.id} 
                    book={book} 
                    isActive={selectedBookId === book.id} 
                    onClick={() => { sounds.click(); setSelectedBookId(book.id); }} 
                 />
              ))}
           </div>

           {/* Proprietary Footer */}
           <div className="p-8 border-t border-white/5">
              <p className="text-[8px] font-mono text-white/20 tracking-widest leading-loose">
                 [SYSTEM PROPRIETARY]<br/>
                 © 2026 THE ARCHITECT. All Rights Reserved.<br/>
                 <span className="text-red-900/50">WARNING: Unauthorized distribution results in termination.</span>
              </p>
           </div>
        </div>
      </div>
    );
  }

  // --- READER MODE (Full Content Rendering) ---
  return (
    <div className="fixed inset-0 z-[10000] bg-[#020617] flex flex-col overflow-hidden">
       {/* Reader Header */}
       <div className="h-14 bg-[#0a0a0a] border-b border-white/10 flex items-center justify-between px-6 z-50 relative">
          <div className="flex items-center gap-4">
            <button onClick={() => setMode('library')} className="flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white uppercase tracking-widest">
               <ArrowLeft size={14} /> Cockpit
            </button>
            <button 
                onClick={() => setIsTocOpen(!isTocOpen)} 
                className={`p-2 hover:bg-white/10 rounded-full transition-colors relative ${isTocOpen ? 'bg-white/10 text-white' : 'text-white/40'}`}
                title="Table of Contents"
            >
                <Menu size={16} />
                {isTocOpen && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />}
            </button>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-sm text-emerald-500 text-[10px] font-mono uppercase tracking-widest animate-pulse">
                <Unlock size={10} />
                <span>Secure Connection</span>
             </div>
             <span className="text-xs font-mono uppercase tracking-[0.2em] font-bold hidden md:block" style={{ color: selectedBook.baseColor }}>
                {selectedBook.title}
             </span>
          </div>
          
          <div className="flex items-center gap-4">
             <span className="text-xs font-mono text-white/40">Page {currentPage}/{pdfPages.length - 1}</span>
          </div>

          {/* TOC Sidebar / Dropdown */}
          {isTocOpen && (
                <div className={`absolute top-full left-6 z-[60] w-72 bg-[#0c0c0c] border border-white/10 backdrop-blur-xl rounded-b-sm p-4 shadow-2xl animate-fade-in-down max-h-[70vh] overflow-y-auto custom-scrollbar`}>
                    <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/50 mb-4 border-b border-white/10 pb-2 flex justify-between items-center">
                        Table of Contents
                        <span className="text-white/20">{toc.length} Sections</span>
                    </h3>
                    <div className="space-y-1">
                        {toc.map((item, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => { setCurrentPage(item.page); setIsTocOpen(false); if (scrollContainerRef.current) { const pageElement = scrollContainerRef.current.children[0].children[item.page] as HTMLElement; if (pageElement) pageElement.scrollIntoView({ behavior: 'smooth' }); } }}
                                className={`w-full text-left py-2 px-3 text-xs rounded-sm transition-all truncate font-serif leading-snug group flex items-center gap-3 ${currentPage === item.page ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <span className="text-[10px] font-mono opacity-50 w-4 text-right">{String(idx + 1).padStart(2, '0')}</span>
                                <span className="truncate">{item.title}</span>
                            </button>
                        ))}
                        {toc.length === 0 && <p className="text-xs text-white/20 italic p-4 text-center">No index data found.</p>}
                    </div>
                </div>
            )}
       </div>

       {/* Reader Content */}
       <div className="flex-grow overflow-y-auto bg-[#050505] p-0 md:p-10 relative scroll-smooth" ref={scrollContainerRef}>
          <div className="flex flex-col items-center gap-10 pb-20">
             {pdfPages.map((_, idx) => (
                <PageComponent key={idx} index={idx} />
             ))}
          </div>
       </div>

       {/* Floating Nav (Bottom) */}
       <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1a1a1a]/90 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl z-50">
          <button onClick={() => setIsTocOpen(!isTocOpen)} className="text-white/40 hover:text-white"><List size={18}/></button>
          <div className="w-[1px] h-4 bg-white/10" />
          <button className="text-white/40 hover:text-white cursor-not-allowed" title="Dark Mode Only"><Moon size={18}/></button>
          <button className="text-white/40 hover:text-white cursor-not-allowed" title="Zoom Fixed"><ZoomIn size={18}/></button>
       </div>
    </div>
  );
};
