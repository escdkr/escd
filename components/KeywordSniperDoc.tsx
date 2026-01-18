
import React, { useState, useEffect, useRef } from 'react';
import { X, Crosshair, Search, Target, Signal, Database, RefreshCw, ChevronRight, BarChart2, AlertCircle, Save, Lock, Terminal, Cpu, Activity, TrendingUp, ShieldAlert, Zap, Eye, Unlock, Copy } from 'lucide-react';
import { Button } from './Button';
import { useSystem } from './SystemCore';

interface KeywordSniperDocProps {
  onClose: () => void;
  onCheckout: () => void;
  isVip?: boolean;
}

interface KeywordData {
  keyword: string;
  volume: number;
  products: number;
  ratio: number;
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  trend: number[];
  secretStrategy: string; // VIP Only Content
}

const TERMINAL_LOGS = [
  "INITIALIZING KERNEL...",
  "CONNECTING TO N-STORE DATABASE...",
  "BYPASSING SSL ENCRYPTION...",
  "ANALYZING COMPETITOR TRAFFIC...",
  "DETECTING LOGIC GAP...",
  "EXTRACTING OPPORTUNITY KEYWORDS...",
  "FILTERING RED OCEAN...",
  "CALCULATING PROFIT MARGIN...",
  "RENDERING INTEL..."
];

export const KeywordSniperDoc: React.FC<KeywordSniperDocProps> = ({ onClose, onCheckout, isVip = false }) => {
  const { toast, sounds } = useSystem();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'idle' | 'scanning' | 'complete'>('idle');
  const [scanLog, setScanLog] = useState<string[]>([]);
  const [results, setResults] = useState<KeywordData[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<KeywordData | null>(null);
  
  // VIP gets God Mode by default
  const [godMode, setGodMode] = useState(isVip); 
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logsEndRef.current) {
        logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scanLog]);

  useEffect(() => {
    if (isVip) setGodMode(true);
  }, [isVip]);

  const toggleGodMode = () => {
    // If VIP, cannot toggle off (Always ON)
    if (isVip) return;

    if (!godMode) {
      sounds.play('boot');
    } else {
      sounds.play('click');
    }
    setGodMode(!godMode);
  };

  const generateMockResults = (seed: string) => {
    const prefixes = ['가성비', '저렴한', '고급', '20대', '30대', '차량용', '가정용', '휴대용', '무선', '업소용', '캠핑용'];
    const suffixes = ['추천', '순위', '선물', '세트', '브랜드', '후기', '사용법', '비교', '최저가', '파는곳'];
    
    const generateTrend = () => Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));

    const strategies = [
      "이 키워드는 상세페이지 상단에 'GIF 움짤'을 3개 이상 배치하면 체류시간이 2배 늘어납니다. 공급사가 제공하는 기본 이미지를 쓰지 말고 직접 촬영하십시오.",
      "경쟁사들이 '기능'을 강조할 때, '감성'을 파십시오. 30대 여성을 타겟으로 한 인스타그램 공구 제안서를 보내면 승률 80%입니다.",
      "이 제품은 묶음 배송(Set) 수요가 높습니다. 단품 마진은 포기하고, 1+1 구성으로 객단가를 높여 ROAS를 맞추십시오.",
      "블로그 체험단 5명만 풀어도 상위 노출이 가능한 '빈집'입니다. 키워드 태그에 오타 키워드(예: 겔럭시)를 섞으십시오."
    ];

    const mockData: KeywordData[] = Array.from({ length: 12 }).map(() => {
      const isPrefix = Math.random() > 0.5;
      const word = isPrefix 
        ? `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${seed}`
        : `${seed} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
      
      const volume = Math.floor(Math.random() * 80000) + 1000;
      const products = Math.floor(Math.random() * (volume * 1.5)); 
      const ratio = products / volume;
      
      let grade: 'S' | 'A' | 'B' | 'C' | 'D' = 'D';
      if (ratio < 0.1) grade = 'S';
      else if (ratio < 0.5) grade = 'A';
      else if (ratio < 1.0) grade = 'B';
      else if (ratio < 3.0) grade = 'C';

      return { 
        keyword: word, 
        volume, 
        products, 
        ratio, 
        grade, 
        trend: generateTrend(),
        secretStrategy: strategies[Math.floor(Math.random() * strategies.length)]
      };
    });

    // Inject "Winning" Keywords
    mockData.unshift({ 
        keyword: `${seed} 도매처`, 
        volume: 24500, 
        products: 120, 
        ratio: 0.004, 
        grade: 'S', 
        trend: [10, 20, 15, 30, 45, 60, 50, 70, 80, 85, 90, 95],
        secretStrategy: "도매꾹이 아니라 '공장 직거래'가 가능한 키워드입니다. 알리바바 이미지 검색으로 원청을 찾은 뒤, '샘플 3개만 먼저 사겠다'고 제안하십시오."
    });
    
    return mockData;
  };

  const handleScan = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query) return;

    setStatus('scanning');
    setScanLog([]);
    setResults([]);
    setSelectedTarget(null);
    sounds.play('access');

    let step = 0;
    const interval = setInterval(() => {
      if (step >= TERMINAL_LOGS.length) {
        clearInterval(interval);
        setResults(generateMockResults(query));
        setStatus('complete');
        sounds.play('success');
      } else {
        setScanLog(prev => [...prev, TERMINAL_LOGS[step]]);
        step++;
      }
    }, 300);
  };

  const handleSaveData = () => {
    sounds.play('success');
    toast.success("Keyword Analysis exported to Dashboard.", "DATA SAVED");
  }

  // THEME CONFIGURATION
  const theme = godMode ? {
    bg: 'bg-[#0a0a0a]',
    primary: 'text-gold',
    border: 'border-gold/30',
    accentBg: 'bg-gold/10',
    gridColor: 'rgba(191, 149, 63, 0.05)',
    button: 'bg-gold-metallic text-black shadow-[0_0_20px_rgba(191,149,63,0.4)]',
    textMuted: 'text-gold/40',
    highlight: 'text-[#FCF6BA]'
  } : {
    bg: 'bg-[#030712]',
    primary: 'text-orange-500',
    border: 'border-orange-900/40',
    accentBg: 'bg-orange-500/10',
    gridColor: 'rgba(245,158,11,0.03)',
    button: 'bg-orange-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)]',
    textMuted: 'text-orange-500/40',
    highlight: 'text-white'
  };

  const copyStrategy = (text: string) => {
    alert(`[COPIED] 전략 스크립트가 복사되었습니다.\n"${text.substring(0, 30)}..."`);
  };

  return (
    <div className={`fixed inset-0 z-[200] flex items-start justify-center backdrop-blur-xl animate-fade-in p-4 pt-24 md:p-8 md:pt-28 overflow-y-auto transition-colors duration-700 ${godMode ? 'bg-black/95' : 'bg-black/90'}`}>
      <div className={`relative w-full max-w-6xl shadow-2xl flex flex-col h-auto min-h-[600px] rounded-sm overflow-hidden border transition-all duration-700 mb-20 ${theme.bg} ${theme.border} ${godMode ? 'shadow-[0_0_100px_rgba(191,149,63,0.15)]' : 'shadow-[0_0_50px_rgba(249,115,22,0.1)]'}`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b z-20 shrink-0 transition-colors duration-700 ${theme.border} ${godMode ? 'bg-[#0f0f0f]' : 'bg-[#0a0a0a]'}`}>
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-sm border transition-all duration-500 ${theme.accentBg} ${theme.border}`}>
               {godMode ? <Eye size={20} className="text-gold animate-pulse" /> : <Crosshair size={20} className="text-orange-500" />}
            </div>
            <div className="flex flex-col">
              <span className={`font-mono text-[10px] tracking-[0.3em] uppercase font-bold transition-colors ${theme.primary}`}>
                {godMode ? 'Architect Mode // Enabled' : 'Market Intelligence // Ver 4.0'}
              </span>
              <h2 className={`font-serif font-bold text-lg tracking-tight transition-colors ${theme.highlight}`}>
                {godMode ? 'THE GOD\'S EYE' : 'KEYWORD SNIPER'}
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             {/* GOD MODE TOGGLE / INDICATOR */}
             <div className="flex items-center gap-3" title={isVip ? "Full Data Unlocked" : "Unlock Full Data"}>
                {isVip ? (
                    <span className="text-[10px] font-mono uppercase tracking-widest font-black text-gold animate-pulse flex items-center gap-2">
                       <Zap size={10} className="fill-gold" /> GOD EYE ACTIVE
                    </span>
                ) : (
                    <>
                        <span className={`text-[9px] font-mono uppercase tracking-widest font-bold ${godMode ? 'text-gold' : 'text-white/20'}`}>
                        {godMode ? 'GOD MODE ON' : 'GOD MODE OFF'}
                        </span>
                        <button 
                        onClick={toggleGodMode}
                        className={`w-12 h-6 rounded-full border transition-all duration-500 relative flex items-center ${godMode ? 'bg-gold/20 border-gold' : 'bg-white/5 border-white/10'}`}
                        >
                        <div className={`w-4 h-4 rounded-full shadow-md absolute transition-all duration-500 ${godMode ? 'translate-x-7 bg-gold shadow-[0_0_10px_gold]' : 'translate-x-1 bg-gray-500'}`} />
                        </button>
                    </>
                )}
             </div>

             <div className="w-[1px] h-6 bg-white/10" />

             <button onClick={onClose} className={`hover:text-white transition-colors group ${theme.textMuted}`}>
               <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
             </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-grow flex flex-col lg:flex-row relative overflow-hidden font-mono min-h-[500px]">
          {/* Grid Background */}
          <div className="absolute inset-0 transition-all duration-700 pointer-events-none" 
               style={{ 
                 backgroundImage: `linear-gradient(${theme.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${theme.gridColor} 1px, transparent 1px)`,
                 backgroundSize: '30px 30px'
               }} 
          />
          
          {/* LEFT: Controls */}
          <div className={`w-full lg:w-1/3 border-r flex flex-col z-10 transition-colors duration-700 ${theme.border} ${godMode ? 'bg-[#080808]/80' : 'bg-[#050505]/90'}`}>
             
             {/* Search */}
             <div className={`p-8 border-b space-y-6 ${theme.border}`}>
                <div className="space-y-2">
                   <label className={`text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-2 ${theme.textMuted}`}>
                      <Target size={12} /> Target Acquisition
                   </label>
                   <form onSubmit={handleScan} className="relative group">
                      <input 
                         type="text" 
                         value={query}
                         onChange={(e) => setQuery(e.target.value)}
                         placeholder="ENTER KEYWORD..." 
                         className={`w-full bg-black/50 border rounded-sm py-4 pl-12 pr-4 text-white text-lg font-bold tracking-wider focus:outline-none transition-all uppercase placeholder:text-white/10 shadow-inner ${theme.border} focus:border-opacity-100 border-opacity-50`}
                      />
                      <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${theme.primary}`} size={18} />
                   </form>
                </div>

                <div className="grid grid-cols-2 gap-2">
                   <div className="flex flex-col gap-2">
                      <span className="text-[9px] text-white/30 uppercase tracking-widest">Platform</span>
                      <div className="flex gap-1">
                         <FilterButton active label="N-STORE" theme={theme} />
                         <FilterButton label="C-PANG" theme={theme} />
                      </div>
                   </div>
                   <div className="flex flex-col gap-2">
                      <span className="text-[9px] text-white/30 uppercase tracking-widest">Filter</span>
                      <div className="flex gap-1">
                         <FilterButton active label="GOLDEN" theme={theme} />
                         <FilterButton label="ALL" theme={theme} />
                      </div>
                   </div>
                </div>

                <Button 
                   onClick={handleScan}
                   disabled={status === 'scanning' || !query}
                   className={`w-full py-5 font-black uppercase tracking-[0.2em] border-none transition-all ${status === 'scanning' ? 'bg-gray-800 cursor-wait opacity-50' : theme.button}`}
                >
                   {status === 'scanning' ? (
                      <span className="flex items-center gap-2"><RefreshCw className="animate-spin" size={16} /> PROCESSING...</span>
                   ) : 'INITIATE SCAN'}
                </Button>
             </div>

             {/* Terminal */}
             <div className="flex-grow p-6 text-xs overflow-y-auto custom-scrollbar relative h-48 lg:h-auto">
                <div className={`absolute top-0 left-0 w-full h-1 opacity-20 ${theme.accentBg}`} />
                <div className="space-y-2">
                   <div className={`${theme.textMuted} border-b pb-2 mb-4 flex justify-between border-white/5`}>
                      <span>SYSTEM_LOG</span>
                      <span>STATUS: {status.toUpperCase()}</span>
                   </div>
                   {scanLog.map((log, idx) => (
                      <div key={idx} className={`animate-fade-in flex gap-2 ${godMode ? 'text-gold/80' : 'text-orange-400/80'}`}>
                         <span className="opacity-30">{`>`}</span>
                         {log}
                      </div>
                   ))}
                   {status === 'scanning' && (
                      <div className={`${theme.primary} animate-pulse`}>_</div>
                   )}
                   <div ref={logsEndRef} />
                </div>
             </div>
          </div>

          {/* RIGHT: Results */}
          <div className="w-full lg:w-2/3 relative flex flex-col bg-transparent h-[600px] lg:h-auto">
             {/* Results Header */}
             <div className={`h-16 border-b flex items-center justify-between px-8 transition-colors duration-700 ${theme.border} ${godMode ? 'bg-[#0a0a0a]' : 'bg-[#050505]'}`}>
                <div className="flex items-center gap-4">
                   <Database size={16} className={`${theme.primary} opacity-50`} />
                   <span className="text-xs font-bold text-white/60 tracking-widest uppercase">
                      Found Opportunities: <span className="text-white">{results.length}</span>
                   </span>
                </div>
                {results.length > 0 && godMode && (
                   <span className="text-[10px] text-gold font-bold uppercase tracking-widest animate-pulse flex items-center gap-2">
                      <Unlock size={10} /> Full Data Revealed
                   </span>
                )}
             </div>

             {/* Results List */}
             {results.length > 0 ? (
                <div className="flex-grow overflow-y-auto p-0">
                   <div className={`sticky top-0 border-b grid grid-cols-12 text-[9px] font-mono uppercase tracking-widest text-white/30 py-3 px-6 z-10 font-bold backdrop-blur-sm ${theme.border} ${godMode ? 'bg-[#0a0a0a]/90' : 'bg-[#050505]/90'}`}>
                      <div className="col-span-1">Rank</div>
                      <div className="col-span-4">Keyword</div>
                      <div className="col-span-2 text-right">Vol</div>
                      <div className="col-span-2 text-right">Prod</div>
                      <div className="col-span-2 text-center">Oppty</div>
                      <div className="col-span-1 text-center">Act</div>
                   </div>
                   
                   <div className="divide-y divide-white/5">
                      {results.map((item, idx) => (
                         <div 
                            key={idx}
                            onClick={() => setSelectedTarget(item)}
                            className={`grid grid-cols-12 py-4 px-6 items-center cursor-pointer transition-all group border-l-2 ${selectedTarget === item ? (godMode ? 'bg-gold/10 border-gold' : 'bg-orange-500/10 border-orange-500') : 'border-transparent hover:bg-white/5'}`}
                         >
                            <div className="col-span-1 text-xs font-mono text-white/40">{idx + 1}</div>
                            <div className="col-span-4">
                               <div className={`text-sm font-bold tracking-tight transition-colors ${selectedTarget === item ? theme.highlight : 'text-white group-hover:text-white'}`}>{item.keyword}</div>
                            </div>
                            
                            {/* Data Columns: Masked vs Revealed */}
                            <div className="col-span-2 text-right font-mono text-xs text-white/60">
                               {godMode ? item.volume.toLocaleString() : (item.volume > 10000 ? 'High' : 'Med')}
                            </div>
                            <div className="col-span-2 text-right font-mono text-xs text-white/40">
                               {godMode ? item.products.toLocaleString() : 'Protected'}
                            </div>
                            
                            <div className="col-span-2 flex justify-center">
                               <span className={`text-[10px] font-bold px-2 py-0.5 rounded-[2px] border ${
                                  godMode 
                                    ? (item.grade === 'S' ? 'border-gold text-gold bg-gold/10' : 'border-white/20 text-gray-400')
                                    : (item.grade === 'S' ? 'border-orange-500 text-orange-500' : 'border-white/10 text-gray-500')
                               }`}>
                                  {godMode ? item.grade : (item.grade === 'S' ? 'TOP' : '?')}
                               </span>
                            </div>
                            <div className={`col-span-1 flex justify-center transition-colors ${selectedTarget === item ? theme.primary : 'text-white/20'}`}>
                               <ChevronRight size={14} />
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             ) : (
                <div className="flex-grow flex flex-col items-center justify-center space-y-6 opacity-30">
                   {status === 'scanning' ? (
                      <div className="relative">
                         <div className={`w-64 h-64 border rounded-full animate-[spin_10s_linear_infinite] ${theme.border}`} />
                         <div className={`absolute inset-4 border rounded-full animate-[spin_5s_linear_infinite_reverse] border-opacity-50 ${theme.border}`} />
                         <div className="absolute inset-0 flex items-center justify-center">
                            <span className={`font-mono text-xs animate-pulse ${theme.primary}`}>SCANNING...</span>
                         </div>
                      </div>
                   ) : (
                      <>
                         <div className="w-24 h-24 border border-white/10 rounded-full flex items-center justify-center">
                            <Signal size={32} className="text-white" />
                         </div>
                         <p className="font-mono text-xs uppercase tracking-widest text-white">Awaiting Input Signal</p>
                      </>
                   )}
                </div>
             )}

             {/* Detail Panel (Bottom) */}
             {selectedTarget && (
                <div className={`border-t p-8 flex gap-10 animate-slide-up relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] transition-colors duration-700 ${theme.border} ${godMode ? 'bg-[#0f0f0f]' : 'bg-[#080808]'}`}>
                   {/* Left: Info */}
                   <div className="w-1/3 space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                         <ShieldAlert size={16} className={theme.primary} />
                         <span className={`text-xs font-bold uppercase tracking-widest ${theme.primary}`}>Target Analysis</span>
                      </div>
                      <h3 className="text-3xl font-black text-white tracking-tight leading-none">{selectedTarget.keyword}</h3>
                      <div className="space-y-2 pt-2">
                         <div className="flex justify-between text-xs text-white/60 font-mono">
                            <span>Competition Ratio</span>
                            {godMode ? (
                               <span className="text-emerald-400 font-bold">1 : {selectedTarget.ratio.toFixed(2)}</span>
                            ) : (
                               <span className="text-white/30 blur-[2px]">HIDDEN</span>
                            )}
                         </div>
                         <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full ${selectedTarget.grade === 'S' ? 'bg-emerald-500' : 'bg-gray-600'}`} style={{ width: `${(1 - selectedTarget.ratio) * 100}%` }} />
                         </div>
                      </div>
                   </div>

                   {/* Center: Hidden Context (Strategy) */}
                   <div className="w-1/3 flex flex-col justify-end">
                      <div className="flex items-center gap-2 mb-3">
                         {godMode ? <Unlock size={14} className="text-gold" /> : <Lock size={14} className="text-gray-500" />}
                         <span className={`text-[10px] uppercase tracking-widest font-bold ${godMode ? 'text-gold' : 'text-gray-500'}`}>Architect's Strategy</span>
                      </div>
                      
                      {godMode ? (
                         <div className="relative group cursor-pointer" onClick={() => copyStrategy(selectedTarget.secretStrategy)}>
                            <p className="text-xs text-white/80 leading-relaxed font-serif italic border-l-2 border-gold/50 pl-4 py-1">
                               "{selectedTarget.secretStrategy}"
                            </p>
                            <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                               <Copy size={12} className="text-gold" />
                            </div>
                         </div>
                      ) : (
                         <div className="relative overflow-hidden p-4 border border-white/5 bg-white/[0.02] rounded-sm group cursor-not-allowed">
                            <p className="text-xs text-white/20 blur-sm select-none leading-relaxed">
                               This is a hidden strategy script that reveals exactly how to monetize this keyword. Upgrade to VIP to unlock the full potential of this asset.
                            </p>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                               <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                  <Lock size={10} /> Locked Content
                               </span>
                            </div>
                         </div>
                      )}
                   </div>

                   {/* Right: Profit Calc & CTA */}
                   <div className="w-1/3 flex flex-col justify-between items-end text-right border-l border-white/5 pl-8">
                      <div>
                         <span className="text-[10px] text-white/30 uppercase tracking-widest block mb-1">Potential Monthly Profit</span>
                         {godMode ? (
                            <span className="text-2xl font-mono font-bold text-white animate-fade-in">
                               ₩ {(selectedTarget.volume * 0.01 * 10000).toLocaleString()}
                            </span>
                         ) : (
                            <span className="text-2xl font-mono font-bold text-white/20 blur-[4px] select-none">
                               ₩ 0,000,000
                            </span>
                         )}
                      </div>
                      
                      {/* CTA BUTTON */}
                      {isVip ? (
                         <Button onClick={handleSaveData} className="px-8 py-3 border-none uppercase tracking-widest w-full font-black text-xs bg-gold text-black hover:bg-white hover:text-black shadow-[0_0_20px_rgba(191,149,63,0.3)]">
                            SAVE TO VAULT <Save size={12} className="ml-1" />
                         </Button>
                      ) : (
                         <Button onClick={onCheckout} className="px-8 py-3 border-none uppercase tracking-widest w-full font-black text-xs bg-white text-black hover:bg-orange-400">
                            UNLOCK FULL DATA <ChevronRight size={12} className="ml-1" />
                         </Button>
                      )}
                   </div>
                </div>
             )}
          </div>
        </div>
      </div>
      <style>{`
         .custom-scrollbar::-webkit-scrollbar { width: 4px; }
         .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
         .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; }
         .cursor-wait { cursor: wait; }
      `}</style>
    </div>
  );
};

const FilterButton: React.FC<{ label: string; active?: boolean; theme: any }> = ({ label, active, theme }) => (
   <button className={`px-2 py-1 rounded-[1px] text-[8px] font-mono uppercase tracking-wider border transition-all ${active ? `${theme.primary} ${theme.border} font-bold ${theme.accentBg}` : 'bg-transparent border-white/10 text-white/30 hover:text-white'}`}>
      {label}
   </button>
);
