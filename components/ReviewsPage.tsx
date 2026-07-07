
import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  TrendingUp, 
  Filter, 
  Search, 
  ThumbsUp, 
  MessageSquare, 
  Crown, 
  Quote, 
  CheckCircle2, 
  Lock, 
  ArrowUpRight 
} from 'lucide-react';
import { Button } from './Button';

interface Review {
  id: string;
  user: string;
  tier: 'Free' | 'Tier-01' | 'Architect' | 'VIP';
  rating: number;
  date: string;
  title: string;
  content: string;
  revenue?: string; // Optional verified revenue
  tags: string[];
  likes: number;
  replies: number;
}

const REVIEWS_DATA: Review[] = [
  {
    id: 'r1',
    user: 'Cryptic_Whale',
    tier: 'Architect',
    rating: 5,
    date: '2 hours ago',
    title: "이 책을 읽고 바로 사표 던졌습니다.",
    content: "반신반의하며 구매했지만, 첫 챕터를 읽고 소름이 돋았습니다. 제가 지난 5년간 했던 모든 노력이 얼마나 효율적이지 못했는지 깨달았죠. 월 300 노예에서 해방되는 법을 이 책에서 찾았습니다. 현재 월 순수익 1,500만원 구간 진입했습니다.",
    revenue: '₩15,200,000',
    tags: ['Life Changing', 'Revenue Verified'],
    likes: 242,
    replies: 15
  },
  {
    id: 'r2',
    user: 'James L.',
    tier: 'VIP',
    rating: 5,
    date: '5 hours ago',
    title: "The Glitch is real.",
    content: "시스템의 결함을 이용해 가치를 증식하는 법... 처음엔 마술인 줄 알았지만 철저히 계산된 과학이었습니다. 제 통장 잔고가 그 증거입니다.",
    revenue: '₩8,450,000',
    tags: ['System Hacked'],
    likes: 156,
    replies: 4
  },
  {
    id: 'r3',
    user: '박** (프리랜서)',
    tier: 'Tier-01',
    rating: 5,
    date: '12 hours ago',
    title: "글리치 개념이 미쳤습니다.",
    content: "남들 다 망할 때 저만 돈 복사 중입니다. 시장의 빈틈을 파고드는 이 알고리즘을 모두가 알게 된다면 제 우위가 사라질까 걱정될 정도입니다. 이 가격에 파는 게 말이 안 됩니다.",
    tags: ['Secret Tactics'],
    likes: 89,
    replies: 2
  },
  {
    id: 'r4',
    user: '송** (대학생)',
    tier: 'Free',
    rating: 4,
    date: '1 day ago',
    title: "무인 점포 1호점 세팅 끝났습니다.",
    content: "진짜 일 안 해도 돈이 들어오네요. 자본주의라는 게임의 공략집을 얻은 기분이에요. 10년의 시행착오를 단 3시간 만에 압축했습니다. 경쟁자가 볼까 봐 무섭네요.",
    tags: ['Automation'],
    likes: 45,
    replies: 8
  },
  {
    id: 'r5',
    user: 'VIP Agent 09',
    tier: 'Architect',
    rating: 5,
    date: '1 day ago',
    title: "인생의 해답지.",
    content: "막연하게만 느껴졌던 '부의 추월차선'이 이제는 고속도로처럼 선명하게 보입니다. 감히 말하건대, 이 책을 읽기 전과 후의 저는 완전히 다른 종(Species)입니다.",
    revenue: '₩42,000,000',
    tags: ['Mindset Shift', 'High Ticket'],
    likes: 312,
    replies: 21
  },
  {
    id: 'r6',
    user: '한** 대표',
    tier: 'VIP',
    rating: 5,
    date: '2 days ago',
    title: "사업 10년 차, 머리를 한 대 맞은 기분.",
    content: "내가 지금까지 '사업'이라고 했던 건 그저 고상한 '노동'이었습니다. 시스템이 나를 위해 일하게 만드는 법, 이 책에 모든 정답이 있습니다.",
    revenue: '₩120,000,000',
    tags: ['Business', 'Scaling'],
    likes: 560,
    replies: 42
  },
  {
    id: 'r7',
    user: 'Shadow_Walker',
    tier: 'Tier-01',
    rating: 5,
    date: '3 days ago',
    title: "조용히 혼자만 알고 싶습니다.",
    content: "제발 광고 좀 그만 하세요. 경쟁자 늘어나는 거 싫습니다. 이미 꿀통 찾아서 빨고 있는데 소문나면 곤란합니다.",
    tags: ['Hidden Gem'],
    likes: 120,
    replies: 5
  },
  {
    id: 'r8',
    user: 'Anonymous',
    tier: 'Free',
    rating: 5,
    date: '1 week ago',
    title: "환불하려고 들어왔다가...",
    content: "솔직히 사기인 줄 알고 결제하고 바로 환불받으려 했습니다. 근데 첫 페이지 읽고 밤새서 다 읽었습니다. 환불은커녕 VIP 업그레이드했습니다.",
    tags: ['Conversion'],
    likes: 230,
    replies: 12
  }
];

export const ReviewsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'VERIFIED' | 'VIP'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReviews = REVIEWS_DATA.filter(review => {
    const matchesSearch = review.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          review.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'ALL' 
      ? true 
      : activeFilter === 'VERIFIED' 
        ? !!review.revenue 
        : review.tier === 'Architect' || review.tier === 'VIP';
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-brand-dark relative py-20 px-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[150px]" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[150px]" />
         <div className="absolute inset-0 grid-pattern opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Header Area */}
        <header className="text-center space-y-10">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-emerald-500/30 rounded-full bg-emerald-500/5 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.1)] animate-fade-in-up">
                 <ShieldCheck size={14} className="text-emerald-500" />
                 <span className="text-[10px] font-serif font-bold tracking-[0.2em] uppercase text-emerald-500">Hall of Evidence</span>
              </div>
              <h1 className="font-serif font-black text-5xl md:text-7xl text-white tracking-tighter uppercase leading-none drop-shadow-2xl">
                 The <span className="text-gold italic pr-3">Proof</span>
              </h1>
           </div>
           
           <p className="text-brand-muted text-lg font-serif italic max-w-2xl mx-auto leading-relaxed">
              "우리는 결과를 조작하지 않습니다. <br className="hidden md:block"/> 오직 시스템을 해킹한 생존자들의 전리품만을 전시합니다."
           </p>

           {/* Stats Dashboard */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <StatCard label="Total Revenue Generated" value="₩14.2B+" sub="Verified User Income" icon={<TrendingUp size={20} />} color="emerald" />
              <StatCard label="Active Architects" value="1,452" sub="Currently Deploying" icon={<Crown size={20} />} color="gold" />
              <StatCard label="Satisfaction Rate" value="4.9/5.0" sub="Based on 892 Reviews" icon={<Star size={20} />} color="white" />
           </div>
        </header>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white/[0.02] border border-white/5 p-4 rounded-sm backdrop-blur-sm sticky top-24 z-30">
           <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
              <FilterBtn label="All Evidence" active={activeFilter === 'ALL'} onClick={() => setActiveFilter('ALL')} />
              <FilterBtn label="Revenue Verified" active={activeFilter === 'VERIFIED'} onClick={() => setActiveFilter('VERIFIED')} icon={<CheckCircle2 size={12} />} />
              <FilterBtn label="VIP Inner Circle" active={activeFilter === 'VIP'} onClick={() => setActiveFilter('VIP')} icon={<Lock size={12} />} />
           </div>
           
           <div className="relative w-full md:w-64">
              <input 
                 type="text" 
                 placeholder="Search archives..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-black/40 border border-white/10 rounded-sm py-2.5 pl-10 pr-4 text-xs font-mono text-white focus:border-gold/50 focus:outline-none transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
           </div>
        </div>

        {/* Reviews Grid (Masonry-like) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
           ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 p-12 bg-gradient-to-r from-brand-dark to-[#0a0a0a] border border-white/10 rounded-sm text-center relative overflow-hidden group">
           <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" />
           <div className="absolute -right-20 -top-20 text-[15rem] font-serif font-black text-white/5 select-none pointer-events-none rotate-12">?</div>
           
           <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-4xl font-serif font-black text-white uppercase tracking-tight">
                 당신의 성공을 <span className="text-gold italic">전시하십시오.</span>
              </h2>
              <p className="text-brand-muted max-w-xl mx-auto font-light">
                 시스템을 통해 얻은 수익을 인증하고, '설계자' 등급으로 승격하십시오. <br/>
                 베스트 리뷰어에게는 시크릿 챕터 접근 권한이 부여됩니다.
              </p>
              <Button className="px-12 py-5 font-black uppercase tracking-widest bg-white text-black hover:bg-gold hover:scale-105 border-none shadow-xl">
                 증거 제출하기 <ArrowUpRight className="ml-2" size={16} />
              </Button>
           </div>
        </div>

      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string, value: string, sub: string, icon: React.ReactNode, color: 'emerald' | 'gold' | 'white' }> = ({ label, value, sub, icon, color }) => {
   const colors = {
      emerald: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
      gold: 'text-gold border-gold/20 bg-gold/5',
      white: 'text-white border-white/10 bg-white/5'
   };

   return (
      <div className={`p-6 border rounded-sm flex flex-col gap-3 ${colors[color]} relative overflow-hidden group`}>
         <div className="flex items-center justify-between opacity-80 relative z-10">
            <span className="text-[10px] font-mono uppercase tracking-widest">{label}</span>
            {icon}
         </div>
         <p className="text-3xl font-serif font-black tracking-tight relative z-10">{value}</p>
         <p className="text-[9px] font-mono opacity-50 relative z-10">{sub}</p>
         <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-[40px] opacity-20 bg-current pointer-events-none transition-opacity group-hover:opacity-40`} />
      </div>
   );
};

const FilterBtn: React.FC<{ label: string, active: boolean, onClick: () => void, icon?: React.ReactNode }> = ({ label, active, onClick, icon }) => (
   <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-[1px] text-[10px] font-mono uppercase tracking-widest transition-all whitespace-nowrap border ${
         active 
            ? 'bg-white text-black border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
            : 'bg-transparent text-white/40 border-transparent hover:text-white hover:bg-white/5'
      }`}
   >
      {icon}
      {label}
   </button>
);

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
   <div className="bg-[#050505] border border-white/10 p-8 rounded-sm hover:border-white/30 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
      {/* Revenue Verified Badge Background */}
      {review.revenue && (
         <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingUp size={80} className="text-emerald-500" />
         </div>
      )}

      <div className="flex justify-between items-start mb-6">
         <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-sm flex items-center justify-center font-bold font-serif border ${
               review.tier === 'Architect' ? 'bg-gold/10 border-gold text-gold' : 
               review.tier === 'VIP' ? 'bg-purple-500/10 border-purple-500 text-purple-400' :
               'bg-white/5 border-white/10 text-white/40'
            }`}>
               {review.user[0]}
            </div>
            <div>
               <h4 className={`text-sm font-bold tracking-tight ${
                  review.tier === 'Architect' ? 'text-gold' : 
                  review.tier === 'VIP' ? 'text-purple-400' : 'text-white'
               }`}>
                  {review.user}
               </h4>
               <div className="flex items-center gap-2">
                  <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">{review.tier}</span>
                  {review.revenue && <CheckCircle2 size={10} className="text-emerald-500" />}
               </div>
            </div>
         </div>
         <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
               <Star key={i} size={10} className={i < review.rating ? "text-gold fill-gold" : "text-white/10"} />
            ))}
         </div>
      </div>

      {review.revenue && (
         <div className="mb-6 p-3 bg-emerald-900/10 border border-emerald-500/20 rounded-[2px] flex items-center justify-between">
            <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest font-bold flex items-center gap-2">
               <TrendingUp size={12} /> Revenue Verified
            </span>
            <span className="font-mono font-bold text-white text-sm tracking-tight">{review.revenue}</span>
         </div>
      )}

      <div className="space-y-3 flex-grow">
         <h3 className="font-serif font-bold text-lg text-white group-hover:text-gold transition-colors leading-tight">"{review.title}"</h3>
         <p className="text-sm text-gray-400 font-light leading-relaxed">
            {review.content}
         </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-6 mb-6">
         {review.tags.map(tag => (
            <span key={tag} className="text-[9px] font-mono text-white/30 px-2 py-1 bg-white/5 rounded-[1px] uppercase">#{tag}</span>
         ))}
      </div>

      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-white/20 text-[10px] font-mono uppercase tracking-widest">
         <span>{review.date}</span>
         <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"><ThumbsUp size={12} /> {review.likes}</span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"><MessageSquare size={12} /> {review.replies}</span>
         </div>
      </div>
   </div>
);
