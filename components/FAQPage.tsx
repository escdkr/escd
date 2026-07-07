
import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  HelpCircle, 
  CreditCard, 
  ShieldCheck, 
  FileKey, 
  Terminal, 
  CornerDownRight 
} from 'lucide-react';

type Category = 'general' | 'finance' | 'access' | 'security';

interface FAQItem {
  id: string;
  category: Category;
  question: string;
  answer: React.ReactNode;
}

const FAQS: FAQItem[] = [
  // GENERAL
  {
    id: 'g1',
    category: 'general',
    question: '이것은 불법적인 방법입니까?',
    answer: '아닙니다. 우리는 법을 어기지 않습니다. 다만 대다수가 모르는 법의 사각지대와 시스템의 비효율성을 공략할 뿐입니다. 자본주의라는 게임의 룰북을 가장 정밀하게 해석한 결과물입니다.'
  },
  {
    id: 'g2',
    category: 'general',
    question: '초보자도 따라 할 수 있습니까?',
    answer: '가능합니다. The Glitch는 전문 지식이 없는 일반인을 위해 설계되었습니다. 복잡한 이론 대신 즉시 실행 가능한 "따라 하기"식의 프로토콜을 제공합니다.'
  },
  {
    id: 'g3',
    category: 'general',
    question: '종이책으로 받아볼 수 있습니까?',
    answer: '불가능합니다. 본 가이드는 정보의 희소성을 위해 오직 암호화된 PDF 형태로만 제공됩니다. 물리적 증거를 남기지 않는 것이 우리의 원칙입니다.'
  },
  // FINANCE
  {
    id: 'f1',
    category: 'finance',
    question: '환불 규정이 어떻게 됩니까?',
    answer: '디지털 콘텐츠 특성상, 파일을 다운로드하거나 열람한 기록이 있는 경우 환불이 불가합니다. 단, 구매 후 7일 이내에 접속 기록이 없는 경우 전액 환불 가능합니다.'
  },
  {
    id: 'f2',
    category: 'finance',
    question: '할부 결제가 가능합니까?',
    answer: '네, 국내 주요 카드사에 대해 최대 12개월 무이자 할부를 지원합니다. 시스템 구축 비용을 미래의 수익으로 갚아나가는 레버리지 전략을 권장합니다.'
  },
  // ACCESS
  {
    id: 'a1',
    category: 'access',
    question: '다운로드 링크는 언제 만료됩니까?',
    answer: '구매하신 자료는 평생 소장 가능합니다. 단, 업데이트된 버전은 VIP 멤버십 회원에게만 실시간으로 동기화됩니다.'
  },
  {
    id: 'a2',
    category: 'access',
    question: '모바일에서도 열람 가능합니까?',
    answer: '가능합니다. 모든 기기(PC, Tablet, Mobile)에 최적화된 포맷으로 제공됩니다.'
  },
  // SECURITY
  {
    id: 's1',
    category: 'security',
    question: '제 개인정보는 안전합니까?',
    answer: 'ESCD는 군사 등급의 암호화 프로토콜을 사용합니다. 귀하의 구매 기록과 신상 정보는 익명화 처리되어 저장되며, 제3자에게 절대 제공되지 않습니다.'
  }
];

export const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    const newSet = new Set(openItems);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setOpenItems(newSet);
  };

  const filteredFaqs = FAQS.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories: { id: Category | 'all', label: string, icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Data', icon: <Terminal size={14} /> },
    { id: 'general', label: 'Protocol', icon: <HelpCircle size={14} /> },
    { id: 'finance', label: 'Transaction', icon: <CreditCard size={14} /> },
    { id: 'access', label: 'Extraction', icon: <FileKey size={14} /> },
    { id: 'security', label: 'Security', icon: <ShieldCheck size={14} /> },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 min-h-screen">
      
      {/* Header */}
      <div className="text-center space-y-6 mb-20 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-gold/80 tracking-widest uppercase">
           <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
           Knowledge Base
        </div>
        <h1 className="font-serif font-black text-5xl md:text-7xl text-white tracking-tighter uppercase">
          Frequently Asked <br/> <span className="text-gold italic pr-3">Questions</span>
        </h1>
        <p className="text-brand-muted text-sm font-serif max-w-lg mx-auto leading-relaxed">
          시스템에 대한 의문을 해소하십시오. <br/>
          우리는 투명성을 가장한 완벽한 통제를 지향합니다.
        </p>
      </div>

      {/* Controls */}
      <div className="sticky top-24 z-30 bg-brand-dark/95 backdrop-blur-xl border-y border-white/5 py-4 mb-12 space-y-4">
         {/* Search Bar */}
         <div className="relative max-w-lg mx-auto">
            <input 
               type="text" 
               placeholder="검색어 입력 (예: 환불, 불법, 모바일...)" 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-gold/50 transition-colors font-mono placeholder:text-white/20"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
         </div>

         {/* Category Tabs */}
         <div className="flex justify-center flex-wrap gap-2">
            {categories.map(cat => (
               <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-sm text-[10px] font-mono uppercase tracking-widest transition-all border ${
                     activeCategory === cat.id 
                        ? 'bg-gold/10 border-gold text-gold shadow-[0_0_15px_rgba(191,149,63,0.2)]' 
                        : 'bg-transparent border-transparent text-white/40 hover:text-white hover:bg-white/5'
                  }`}
               >
                  {cat.icon}
                  {cat.label}
               </button>
            ))}
         </div>
      </div>

      {/* FAQ Grid */}
      <div className="space-y-4">
         {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
               <div 
                  key={faq.id} 
                  className={`group border rounded-sm overflow-hidden transition-all duration-300 ${
                     openItems.has(faq.id) 
                        ? 'bg-white/[0.03] border-gold/30' 
                        : 'bg-transparent border-white/5 hover:border-white/10'
                  }`}
               >
                  <button 
                     onClick={() => toggleItem(faq.id)}
                     className="w-full flex items-center justify-between p-6 text-left"
                  >
                     <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded-[2px] border ${
                           openItems.has(faq.id) ? 'border-gold/20 text-gold bg-gold/5' : 'border-white/10 text-white/20 bg-white/5'
                        }`}>
                           {faq.category}
                        </span>
                        <span className={`font-serif font-bold text-lg tracking-tight transition-colors ${
                           openItems.has(faq.id) ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                        }`}>
                           {faq.question}
                        </span>
                     </div>
                     <ChevronDown 
                        className={`text-white/20 transition-transform duration-300 ${openItems.has(faq.id) ? 'rotate-180 text-gold' : ''}`} 
                        size={20} 
                     />
                  </button>
                  
                  <div 
                     className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        openItems.has(faq.id) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                     }`}
                  >
                     <div className="overflow-hidden">
                        <div className="p-6 pt-0 pl-20 pr-10">
                           <div className="flex gap-4 border-l border-white/10 pl-6 py-2">
                              <CornerDownRight className="text-gold shrink-0 mt-1" size={16} />
                              <p className="text-brand-muted text-sm leading-relaxed font-serif">
                                 {faq.answer}
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            ))
         ) : (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-sm">
               <Terminal className="mx-auto text-white/20 mb-4" size={32} />
               <p className="text-white/40 font-mono text-xs uppercase tracking-widest">No matching data found in archives.</p>
            </div>
         )}
      </div>

      {/* Support CTA */}
      <div className="mt-20 p-10 bg-[#0a0a0a] border border-white/10 rounded-sm text-center relative overflow-hidden group">
         <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
         <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[80px] pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />
         
         <div className="relative z-10 space-y-6">
            <h3 className="text-2xl font-serif font-black text-white uppercase tracking-tight">
               아직 의문이 남았습니까?
            </h3>
            <p className="text-brand-muted text-sm max-w-md mx-auto">
               시스템 설계자에게 직접 문의하십시오. <br/>
               VIP 회원은 1시간 이내 우선 답변을 받습니다.
            </p>
            <a href="mailto:help@escd.io" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors rounded-sm">
               help@escd.io <ArrowUpRightIcon className="w-3 h-3" />
            </a>
         </div>
      </div>

    </div>
  );
};

const ArrowUpRightIcon = ({ className }: { className?: string }) => (
   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
   </svg>
);
