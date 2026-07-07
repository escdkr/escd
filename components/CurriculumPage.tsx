
import React, { useState } from 'react';
import { 
  Terminal,
  Newspaper,
  BookOpen,
  ArrowRight,
  Hash,
  Clock,
  Eye,
  Lock,
  ChevronRight,
  X,
  Share2
} from 'lucide-react';
import { Button } from './Button';
import { MatrixHackingDoc } from './MatrixHackingDoc'; // Import unified doc

interface ColumnSeries {
  id: string;
  category: '마인드셋' | '실전 전략' | '시스템 구축' | '미래 전망'; // Changed to Korean
  title: string;
  subtitle: string;
  desc: string;
  readTime: string;
  views: string;
  isLocked: boolean;
  tags: string[];
  content?: React.ReactNode; 
}

const COLUMNS: ColumnSeries[] = [
  {
    id: 'c1',
    category: '마인드셋', // MINDSET
    title: '자본주의 매트릭스 해킹',
    subtitle: '돈은 숫자가 아니라 신호다',
    desc: '당신이 평생 돈을 벌지 못하는 이유는 돈을 "물질"로 보기 때문이다. 돈은 신뢰의 디지털 신호이며, 이 신호를 조작하는 자가 시스템을 지배한다.',
    readTime: '12 min read',
    views: '12.4k',
    isLocked: false,
    tags: ['Matrix', 'Money Theory', 'Awakening'],
    content: null // Use component logic instead
  },
  {
    id: 'c2',
    category: '실전 전략', // STRATEGY
    title: '인간 OS 분석: 파충류의 뇌',
    subtitle: '이성보다 강력한 본능의 스위치',
    desc: '고객은 논리로 설득되지 않는다. 그들의 뇌간(Brainstem)에 직접 명령어를 입력하라. 공포, 욕망, 그리고 소속감을 자극하는 원초적 코딩.',
    readTime: '15 min read',
    views: '8.9k',
    isLocked: false,
    tags: ['Psychology', 'Persuasion', 'Brain Hack'],
    content: (
        <div className="space-y-8 text-lg leading-relaxed font-light">
            <p>
                마케팅의 90%는 쓰레기입니다. 왜냐하면 '이성(Neocortex)'에 호소하기 때문입니다.
                인간의 구매 결정은 뇌의 가장 깊은 곳, <strong className="text-red-500">파충류의 뇌(Reptilian Brain)</strong>에서 일어납니다.
            </p>
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">3가지 버튼</h3>
            <ul className="list-disc list-inside space-y-4 ml-4">
                <li><strong className="text-white">생존(Survival):</strong> "이걸 안 사면 당신은 뒤처집니다." (공포)</li>
                <li><strong className="text-white">번식(Reproduction):</strong> "이걸 사면 당신은 매력적이 됩니다." (욕망)</li>
                <li><strong className="text-white">에너지 보존(Lazy):</strong> "이걸 사면 당신은 편해집니다." (게으름)</li>
            </ul>
            <p className="mt-8">
                우아한 문구는 필요 없습니다. 이 3가지 버튼을 누르십시오. 
                논리는 나중에 감정을 합리화하기 위해 사용될 뿐입니다.
            </p>
        </div>
    )
  },
  {
    id: 'c3',
    category: '시스템 구축', // SYSTEM
    title: '무한 확장의 법칙: 레버리지',
    subtitle: '나의 시간은 0에 수렴한다',
    desc: '타인의 시간(OPT)과 타인의 돈(OPM)을 이용하지 않는다면 당신은 영원히 노동자다. 시스템이 당신 대신 일하게 만드는 구체적인 청사진.',
    readTime: '20 min read',
    views: '15.2k',
    isLocked: true,
    tags: ['Automation', 'Leverage', 'Scaling']
  },
  {
    id: 'c4',
    category: '미래 전망', // FUTURE
    title: '넥스트 웨이브: 디지털 봉건제',
    subtitle: 'AI 시대, 지주가 될 것인가 소작농이 될 것인가',
    desc: '인공지능은 노동을 대체한다. 이제 생산수단(AI, 알고리즘)을 소유한 소수의 지주와, 그들에게 구독료를 내는 다수의 소작농만 남을 것이다.',
    readTime: '18 min read',
    views: '6.7k',
    isLocked: true,
    tags: ['AI', 'Future Tech', 'Dystopia']
  },
  {
    id: 'c5',
    category: '실전 전략', // STRATEGY
    title: '침묵의 권위: The Silent Authority',
    subtitle: '떠들지 않고 지배하는 법',
    desc: '시끄러운 마케팅은 하수다. 진정한 고수는 존재만으로 압도한다. 말하지 않고도 고객을 줄 세우는 브랜딩의 흑마술.',
    readTime: '14 min read',
    views: '9.1k',
    isLocked: true,
    tags: ['Branding', 'Authority', 'Silence']
  },
  {
    id: 'c6',
    category: '마인드셋', // MINDSET
    title: '고독한 늑대의 길',
    subtitle: '무리에서 이탈하라',
    desc: '대중과 반대로 가는 것이 두려운가? 성공은 언제나 외로운 길 위에 있다. 99%의 양 떼가 절벽으로 향할 때, 홀로 숲으로 들어가는 용기.',
    readTime: '10 min read',
    views: '11.5k',
    isLocked: false,
    tags: ['Solo', 'Leadership', 'Path'],
    content: (
        <div className="space-y-8 text-lg leading-relaxed font-light">
            <p>
                성공한 사람들의 공통점은 '친구'가 별로 없다는 것입니다. 
                그들은 외로움을 즐깁니다. 대중의 소음이 차단된 곳에서만 비로소 <strong className="text-white">자신의 목소리</strong>가 들리기 때문입니다.
            </p>
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">양 떼 효과</h3>
            <p>
                남들이 가는 길은 안전해 보입니다. 하지만 그 길의 끝은 언제나 평범함, 혹은 절벽입니다.
                시장의 기회는 항상 <strong className="text-gold">남들이 가지 않는 숲속</strong>에 숨겨져 있습니다.
            </p>
            <p>
                두려워하지 마십시오. 당신이 외롭다면, 그것은 당신이 올바른 길을 가고 있다는 증거입니다.
            </p>
        </div>
    )
  }
];

export const CurriculumPage: React.FC<{ onCheckout: () => void }> = ({ onCheckout }) => {
  const [activeColumn, setActiveColumn] = useState<ColumnSeries | null>(null);

  return (
    <div className="min-h-screen relative py-20 px-6 overflow-hidden bg-brand-dark">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[#020617]"></div>
         <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white/5 to-transparent opacity-20"></div>
         <div className="absolute inset-0 grid-pattern opacity-10" />
      </div>

      {/* Article Viewer Modal */}
      {activeColumn && (
         <ArticleViewer column={activeColumn} onClose={() => setActiveColumn(null)} onUnlock={onCheckout} />
      )}

      <div className="max-w-5xl mx-auto relative z-10 space-y-24">
        
        {/* Header Section */}
        <header className="text-center space-y-8 animate-fade-in pt-10">
          <div className="space-y-4">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/20 rounded-full bg-white/5 backdrop-blur-md">
                <Newspaper size={14} className="text-white" />
                <span className="text-[10px] font-serif font-bold tracking-[0.2em] uppercase text-white">Editorial Series</span>
             </div>
             <h1 className="font-serif font-black text-6xl md:text-8xl tracking-tight uppercase leading-none text-white drop-shadow-2xl">
               THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 italic pr-3">ARCHIVES</span>
             </h1>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-6">
             <div className="w-16 h-[1px] bg-gold/50 mx-auto"></div>
             <p className="text-lg md:text-xl text-brand-muted font-serif italic leading-relaxed">
               "세상은 당신에게 <span className="text-white">무엇(What)</span>을 생각할지 가르치지만, <br/>
               우리는 <span className="text-gold">어떻게(How)</span> 생각할지를 가르칩니다."
             </p>
             <p className="text-xs font-mono text-white/30 tracking-widest uppercase">
                System Intelligence // Confidential Columns
             </p>
          </div>
        </header>

        {/* Columns Grid */}
        <div className="grid grid-cols-1 gap-0 border-t border-white/10">
           {COLUMNS.map((col, idx) => (
              <ColumnItem key={col.id} col={col} index={idx} onClick={() => setActiveColumn(col)} />
           ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center py-20 border-t border-white/10 space-y-8">
           <Terminal size={32} className="mx-auto text-white/20" />
           <h3 className="text-2xl font-serif font-bold text-white uppercase tracking-widest">
              더 깊은 진실을 원하십니까?
           </h3>
           <Button onClick={onCheckout} className="px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] hover:bg-gray-200 border-none">
              모든 아카이브 잠금 해제
           </Button>
        </div>

      </div>
    </div>
  );
};

const ColumnItem: React.FC<{ col: ColumnSeries; index: number; onClick: () => void }> = ({ col, index, onClick }) => {
   return (
      <div onClick={onClick} className="group border-b border-white/10 py-12 px-4 md:px-8 cursor-pointer hover:bg-white/[0.02] transition-colors relative overflow-hidden">
         {/* Hover Reveal Line */}
         <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
         
         <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            
            {/* Meta Info (Left) */}
            <div className="md:w-48 shrink-0 space-y-4 pt-2">
               <span className="text-[10px] font-mono text-gold/60 tracking-[0.2em] uppercase font-bold block">
                  Series 0{index + 1}
               </span>
               <div className="space-y-1">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block border border-white/10 w-fit px-2 py-0.5 rounded-full">
                     {col.category}
                  </span>
                  <div className="flex items-center gap-3 text-[10px] text-white/30 font-mono pt-2">
                     <span className="flex items-center gap-1"><Clock size={10} /> {col.readTime}</span>
                     <span className="flex items-center gap-1"><Eye size={10} /> {col.views}</span>
                  </div>
               </div>
            </div>

            {/* Main Content (Right) */}
            <div className="flex-grow space-y-4">
               <h2 className="text-3xl md:text-4xl font-serif font-black text-white leading-tight group-hover:text-gold transition-colors tracking-tight flex items-center gap-4">
                  {col.title}
                  {col.isLocked && <Lock size={20} className="text-white/20" />}
               </h2>
               <h3 className="text-lg text-white/60 font-serif italic">{col.subtitle}</h3>
               <p className="text-sm text-gray-400 font-sans leading-relaxed max-w-2xl line-clamp-2">
                  {col.desc}
               </p>
               
               <div className="pt-4 flex items-center justify-between">
                  <div className="flex gap-3">
                     {col.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono text-white/20 uppercase tracking-wider before:content-['#'] before:text-gold/50">
                           {tag}
                        </span>
                     ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                     Read Article <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
               </div>
            </div>

         </div>
      </div>
   );
};

const ArticleViewer: React.FC<{ column: ColumnSeries; onClose: () => void; onUnlock: () => void }> = ({ column, onClose, onUnlock }) => {
    
    // REDIRECT: Capitalist Matrix Hacking -> Use Specialized Component
    if (column.id === 'c1') {
       return <MatrixHackingDoc onClose={onClose} />;
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/90 backdrop-blur-xl animate-fade-in">
            <div className="relative w-full max-w-4xl h-[95vh] md:h-[90vh] bg-[#080808] border border-white/10 rounded-t-lg md:rounded-sm shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
                
                {/* Viewer Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#050505]">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                        <span className="text-[10px] font-mono text-white/40 tracking-[0.3em] uppercase">Private Reader Mode</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-white/20 hover:text-white transition-colors" title="Share">
                            <Share2 size={18} />
                        </button>
                        <button onClick={onClose} className="text-white/40 hover:text-gold transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Viewer Content */}
                <div className="flex-grow overflow-y-auto p-8 md:p-16 relative">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center space-y-6 mb-16 pb-8 border-b border-white/10">
                            <span className="text-gold font-mono text-xs tracking-[0.4em] uppercase font-bold">{column.category} SERIES</span>
                            <h1 className="text-4xl md:text-5xl font-serif font-black text-white leading-tight tracking-tight uppercase">
                                {column.title}
                            </h1>
                            <p className="text-xl text-gray-400 font-serif italic">
                                {column.subtitle}
                            </p>
                            <div className="flex justify-center gap-4 text-xs font-mono text-white/30 pt-4">
                                <span>{column.readTime}</span>
                                <span>•</span>
                                <span>{column.views} Views</span>
                            </div>
                        </div>

                        {column.isLocked ? (
                            <div className="relative py-20 text-center space-y-8">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#080808] z-10" />
                                <div className="blur-sm opacity-30 select-none text-left space-y-4">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                </div>
                                <div className="relative z-20 flex flex-col items-center gap-6">
                                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                                        <Lock size={32} className="text-white/40" />
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-white">This Content is Locked</h3>
                                    <p className="text-gray-400 max-w-sm mx-auto">
                                        이 칼럼은 VIP 멤버십 전용 콘텐츠입니다. <br/>
                                        지금 접근 권한을 획득하고 모든 지식을 소유하십시오.
                                    </p>
                                    <Button onClick={onUnlock} className="px-10 py-4 bg-gold-metallic border-none text-black font-black uppercase tracking-widest hover:brightness-110">
                                        Unlock Access
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="font-serif text-gray-300 leading-loose selection:bg-gold/30 selection:text-white">
                                {column.content}
                                <div className="mt-16 pt-10 border-t border-white/10 flex justify-center">
                                    <span className="w-2 h-2 bg-white/20 rotate-45" />
                                    <span className="w-2 h-2 bg-white/20 rotate-45 mx-2" />
                                    <span className="w-2 h-2 bg-white/20 rotate-45" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Progress Bar (Visual only) */}
                <div className="h-1 bg-white/5 w-full">
                    <div className="h-full bg-gold w-1/3" />
                </div>
            </div>
        </div>
    );
};
