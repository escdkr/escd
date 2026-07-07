
import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Check, Timer, Play, ChevronDown, User, Star, ArrowLeft, Lock, ShieldCheck, Globe, Clock, ExternalLink, Zap, MessageSquareQuote, Unlock, Download, FileText, Map, Calculator, AlertTriangle, ShieldAlert, ChevronRight, Eye } from 'lucide-react';
import { DaggerIcon } from './Navbar';

interface ProductDetailProps {
  onBack: () => void;
  onCheckout: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ onBack, onCheckout }) => {
  const [activeTab, setActiveTab] = useState('intro');
  const [timeLeft, setTimeLeft] = useState(11565); // 03:12:45 in seconds
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
 
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const scrollToReviews = () => {
    const reviewSection = document.getElementById('reviews');
    if (reviewSection) {
      reviewSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFreeAccess = (id: string, name: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`[SYSTEM] ${name} 자산 열람 모드가 시작되었습니다.`);
    }, 2000);
  };
 
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-32">
        {/* Navigation Breadcrumb */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-brand-muted hover:text-white transition-colors mb-12 font-serif text-sm tracking-widest uppercase"
        >
          <ArrowLeft size={16} /> Back to Library
        </button>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* LEFT: Persuasion Content (68%) */}
          <div className="lg:w-[68%] space-y-20">
            
            {/* Cinematic Preview Frame */}
            <div className="relative aspect-video rounded-sm overflow-hidden bg-[#050505] border border-white/5 shadow-2xl group cursor-pointer">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#BF953F33_0%,_transparent_70%)] opacity-50 z-0" />
              <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_#BF953F_1px,_transparent_1px)] bg-[length:30px_30px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
              </div>

              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-24 h-24 rounded-full border-[1.5px] border-[#FCF6BA]/40 flex items-center justify-center bg-black/50 backdrop-blur-md shadow-[0_0_20px_rgba(191,149,63,0.3)] group-hover:bg-gold-metallic group-hover:shadow-[0_0_60px_rgba(252,246,186,0.7)] group-hover:scale-110 transition-all duration-500 ease-out">
                  <Play className="fill-brand-dark text-brand-dark ml-1 group-hover:scale-110 transition-transform" size={32} />
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <div className="absolute bottom-8 left-8 z-20 flex flex-col gap-2 text-left">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#BF953F] text-[10px] font-black uppercase tracking-[0.2em] rounded-sm text-brand-dark">Top Secret</span>
                  <span className="text-white/40 text-[10px] font-mono tracking-widest uppercase">Encryption Key Required</span>
                </div>
                <h3 className="text-white text-2xl font-serif italic font-bold tracking-tight">"The Architecture of Invisible Wealth: Section A"</h3>
              </div>
            </div>

            {/* Hook Headline */}
            <div className="space-y-8 text-left">
              <h2 className="font-serif font-black text-4xl md:text-5xl lg:text-7xl text-white leading-tight tracking-tighter">
                왜 <span className="text-gold italic font-black pr-3">99.9%</span>의 인간은 평생 <br />
                돈의 노예로 생을 마감하는가?
              </h2>
              <div className="space-y-6 text-xl text-gray-300 font-sans font-light leading-[1.8]">
                <p>
                  당신이 성실하지 않아서가 아닙니다. <span className="bg-[#BF953F]/20 text-[#FCF6BA] px-1 rounded font-medium">잘못된 지도</span>를 들고 전장을 누볐기 때문입니다.
                </p>
                <p>
                  이 책은 단순한 활자의 나열이 아닙니다. 지난 12년간 자본주의라는 거대한 게임의 뒷문을 해킹하며 발견한 
                  <strong className="text-white font-bold ml-1">‘결함(The Glitch)’</strong>을 이용해 시스템을 전복시키는 가장 정교한 실행 파일입니다.
                </p>
                <p>
                  이제 더 이상 땀 흘려 가치를 증명하지 마십시오. 가치를 <strong className="text-gold">'설계'</strong>하는 자만이 모든 것을 가져가는 이 냉혹한 생태계의 규칙을 전수합니다.
                </p>
              </div>
            </div>

            {/* Tabs & Content */}
            <div className="border-t border-white/10 pt-10 text-left">
              <div className="flex flex-wrap gap-8 border-b border-white/5 pb-6 mb-12 overflow-x-auto no-scrollbar">
                {[
                  { id: 'intro', label: '책 소개' },
                  { id: 'toc', label: '목차' },
                  { id: 'author', label: '저자' },
                  { id: 'reviews', label: '독자 후기' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (tab.id === 'reviews') {
                        scrollToReviews();
                      } else {
                        setActiveTab(tab.id);
                      }
                    }}
                    className={`font-serif text-sm font-bold tracking-[0.25em] uppercase pb-2 transition-all relative ${
                      activeTab === tab.id ? 'text-gold' : 'text-brand-muted hover:text-white'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute bottom-[-1.5px] left-0 w-full h-[2px] bg-gold-metallic shadow-[0_0_12px_#BF953F]" />
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[300px] animate-fade-in text-lg text-gray-300 leading-[1.8] font-light">
                {activeTab === 'intro' && (
                  <div className="space-y-8">
                    <p className="text-white/80 font-serif italic text-xl">"이 책은 단순한 글자가 아닙니다. 당신의 뇌를 재설계하는 코드입니다."</p>
                    <p>본 가이드는 상위 0.1%만이 공유하던 부의 증식 시스템을 7가지 단계로 압축했습니다.</p>
                    <ul className="space-y-4">
                      <li className="flex gap-4">
                        <Check className="text-gold shrink-0 mt-1" size={20} />
                        <span>의사결정 프로세스 해킹: 감정에 휘둘리지 않는 1%의 논리 구조</span>
                      </li>
                      <li className="flex gap-4">
                        <Check className="text-gold shrink-0 mt-1" size={20} />
                        <span>심리적 레버리지: 타인의 욕망을 내 이익으로 치환하는 기술</span>
                      </li>
                      <li className="flex gap-4">
                        <Check className="text-gold shrink-0 mt-1" size={20} />
                        <span>절대 권위 설계: 시장이 당신을 갈구하게 만드는 프레임 워크</span>
                      </li>
                    </ul>
                  </div>
                )}
                {activeTab === 'toc' && (
                  <div className="space-y-6 font-serif">
                    <TocItem title="PART 1. 매트릭스 탈출: 노동의 종말과 글리치(Glitch)의 발견" page="12" />
                    <TocItem title="PART 2. 시스템 설계: 무한 동력 머니 머신 (Web Automation)" page="48" />
                    <TocItem title="PART 3. 심리 조작: 호구의 지갑을 여는 최면 언어" page="82" />
                    <TocItem title="PART 4. 부의 추월: 골든 타임은 3개월뿐이다" page="134" />
                    <TocItem title="EPILOGUE: 제국의 문을 열며 (Secret Access)" page="190" />
                  </div>
                )}
                {activeTab === 'author' && (
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-32 h-32 bg-[#1e293b] rounded-sm border border-gold/30 relative overflow-hidden shrink-0 shadow-2xl">
                      <div className="absolute inset-0 noise-texture opacity-40"></div>
                      <User className="absolute inset-0 m-auto text-gold opacity-60" size={56} />
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-white font-serif font-bold text-2xl tracking-tight">The Architect (Identity Restricted)</h4>
                      <p className="text-gold font-serif italic text-xl">"나는 내 가게에 출근하지 않습니다."</p>
                      <p className="leading-[1.8]">
                        지옥철에서 12만 원을 벌던 노동자에서, 6개의 무인 점포와 디지털 제국을 거느린 설계자로. 
                        노동 시간 0, 수익 무한대의 알고리즘을 증명한 <span className="text-white font-bold">유령 점주</span>.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-8 pt-10 text-left">
              <h3 className="font-serif font-bold text-3xl text-white tracking-tight">자주 묻는 질문</h3>
              <div className="space-y-4">
                {[
                  { q: '초보자도 이해할 수 있는 내용인가요?', a: '기본적인 경제 지식만 있다면 누구나 이해할 수 있도록 설계되었습니다.' },
                  { q: '구매 후 환불이 가능한가요?', a: '디지털 콘텐츠 특성상 다운로드 시 환불이 불가하나, 미열람 시 7일 내 가능합니다.' },
                  { q: '종이책으로도 구매 가능한가요?', a: '본 도서는 오직 암호화된 PDF 형태로만 한정 제공됩니다.' }
                ].map((item, idx) => (
                  <div key={idx} className="border border-white/5 rounded-sm overflow-hidden">
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-6 bg-white/[0.03] hover:bg-white/[0.08] transition-colors text-left"
                    >
                      <span className="font-medium text-white/90">{item.q}</span>
                      <ChevronDown className={`transition-transform duration-500 ${openFaq === idx ? 'rotate-180' : ''}`} size={18} />
                    </button>
                    {openFaq === idx && (
                      <div className="p-6 bg-transparent text-gray-300 font-light border-t border-white/5 animate-fade-in-down leading-[1.8]">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Floating Sticky VIP Payment Card */}
          <div className="lg:w-[32%] text-left">
            <div className="sticky top-32 glass-card-vip group">
              <div className="glass-card-inner p-8 relative z-10 border border-gold/20">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gold/15 blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/10 blur-[80px] pointer-events-none" />
                
                <div className="relative z-10 flex flex-col gap-10">
                  <div className="flex gap-6 items-center">
                    <div className="w-20 h-28 bg-[#0a0a0a] border border-gold/40 shadow-[0_5px_15px_rgba(0,0,0,0.5)] relative overflow-hidden shrink-0">
                      <div className="absolute inset-0 bg-gold/5 noise-texture opacity-30" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                      <div className="absolute inset-2 border border-gold/10 flex items-center justify-center">
                        <span className="font-cinzel text-[7px] text-gold font-bold tracking-tighter text-center leading-tight">THE<br/>GLITCH</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-serif font-black text-white text-xl tracking-tight leading-none mb-2">THE GLITCH</h4>
                      <span className="px-2 py-0.5 bg-gold/20 border border-gold/40 text-[#FCF6BA] text-[8px] font-black tracking-widest uppercase rounded-sm">Premium Access Pass</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-brand-muted text-[10px] font-black uppercase tracking-[0.3em] block mb-2 opacity-80">Final Sale Price</span>
                    <div className="flex flex-col">
                      <span className="text-white/30 text-base line-through font-serif tracking-tight">정상가 1,200,000 KRW</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-serif font-black text-7xl text-gold drop-shadow-[0_0_20px_rgba(191,149,63,0.3)] tracking-tighter">290,000</span>
                        <span className="text-gold font-serif text-3xl font-black italic">원</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 border border-gold/30 rounded-sm flex items-center justify-between shadow-inner">
                    <div className="flex items-center gap-2 text-[#FCF6BA]">
                      <Timer size={16} className="animate-pulse" />
                      <span className="text-[10px] font-black font-mono tracking-widest uppercase">Pricing Resets In</span>
                    </div>
                    <span className="font-mono text-[#FCF6BA] font-black text-2xl tracking-tighter">{formatTime(timeLeft)}</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-white/90">
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-gold" />
                        <span>The Glitch 영구 소장 라이선스</span>
                      </div>
                      <span className="text-white/30 font-mono">(500,000원)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/90">
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-gold" />
                        <span>VIP 프라이빗 커뮤니티 초대</span>
                      </div>
                      <span className="text-white/30 font-mono">(300,000원)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/90">
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-gold" />
                        <span>실시간 업데이트 리포트 (평생)</span>
                      </div>
                      <span className="text-white/30 font-mono">(200,000원)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/90">
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-gold" />
                        <span>저자 직통 1:1 히든 상담권</span>
                      </div>
                      <span className="text-white/30 font-mono italic">(Priceless)</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-center text-xs font-bold text-orange-400 tracking-tight">
                      총 120만 원 상당의 가치 → 오늘만 75% OFF
                    </p>

                    <Button 
                      className="w-full text-xl py-8 font-black uppercase tracking-[0.2em] animate-pulse-cta border-none bg-gold-metallic shadow-[0_0_35px_rgba(191,149,63,0.6)] hover:shadow-[0_0_50px_rgba(252,246,186,0.8)] transition-all duration-500 scale-105"
                      onClick={onCheckout}
                    >
                      입장하기
                    </Button>

                    <p className="text-center text-[10px] text-brand-muted font-serif italic opacity-90">
                      * 24시간 내 구매 시 보너스 챕터 즉시 전송
                    </p>
                  </div>

                  <div className="flex justify-center gap-8 pt-4 border-t border-white/10 opacity-40">
                    <ShieldCheck size={20} className="text-white" />
                    <Lock size={20} className="text-white" />
                    <Globe size={20} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- THE ARMORY: STRATEGIC ASSETS SECTION --- */}
        <section id="armory" className="mt-40 space-y-20 relative overflow-hidden">
          <div className="text-center space-y-4 relative z-10 group cursor-default">
            <h2 className="font-serif font-black text-5xl md:text-8xl text-white tracking-tighter uppercase leading-none flex items-center justify-center gap-4">
              <div className="w-0 overflow-hidden transition-all duration-700 group-hover:w-16 opacity-0 group-hover:opacity-100 flex-shrink-0">
                <DaggerIcon className="w-16 h-16 -rotate-45 text-gold" />
              </div>
              <span className="text-white">THE</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#BF953F] bg-[length:200%_auto] animate-shine italic pr-3">ARMORY</span>
            </h2>
            <p className="text-brand-muted text-lg font-serif italic max-w-2xl mx-auto">
              경제적 자유를 위한 무기들을 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
            {/* FREE ACCESS ZONE */}
            <div className="space-y-8">
               <div className="flex items-center gap-4 border-b border-cyan-500/20 pb-4 group/free cursor-default">
                  <Unlock size={20} className="text-cyan-400" />
                  <div className="flex items-center gap-3">
                     <div className="w-0 overflow-hidden transition-all duration-500 group-hover/free:w-8 opacity-0 group-hover/free:opacity-100">
                       <DaggerIcon className="w-8 h-8 -rotate-45 text-[#22D3EE]" />
                     </div>
                     <h3 className="text-xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-[length:200%_auto] animate-shine tracking-widest uppercase">
                        FREE
                     </h3>
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ArmoryCard 
                    icon={<FileText size={24} />} 
                    title="The Glitch 진단 키트 (PDF)" 
                    desc="당신의 노동 소득 의존도를 분석하는 자가 진단표." 
                    theme="cyan"
                    isLoading={downloadingId === 'free1'}
                    onAction={() => handleFreeAccess('free1', 'The Glitch 진단 키트')}
                  />
                  <ArmoryCard 
                    icon={<Map size={24} />} 
                    title="무자본 창업 로드맵 (Map)" 
                    desc="0원에서 100만 원까지 가는 지도." 
                    theme="cyan"
                    isLoading={downloadingId === 'free2'}
                    onAction={() => handleFreeAccess('free2', '무자본 창업 로드맵')}
                  />
               </div>
            </div>

            {/* VIP CLASSIFIED ZONE */}
            <div className="space-y-8">
               <div className="flex items-center gap-4 border-b border-gold/20 pb-4 group/vip cursor-default">
                  <Lock size={20} className="text-gold" />
                  <div className="flex items-center gap-3">
                     <div className="w-0 overflow-hidden transition-all duration-500 group-hover/vip:w-8 opacity-0 group-hover/vip:opacity-100">
                       <DaggerIcon className="w-8 h-8 -rotate-45 text-gold" />
                     </div>
                     <h3 className="text-xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#BF953F] bg-[length:200%_auto] animate-shine tracking-widest uppercase">
                        VIP Only
                     </h3>
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <ArmoryCard 
                    icon={<Calculator size={24} />} 
                    title="자동 수익 계산기" 
                    desc="잠자는 동안 들어올 돈을 예측하는 엑셀." 
                    theme="gold"
                    isLocked
                    onAction={() => setShowAccessDenied(true)}
                  />
                  <ArmoryCard 
                    icon={<MessageSquareQuote size={24} />} 
                    title="카피라이팅 템플릿" 
                    desc="그대로 베껴 쓰면 매출이 발생하는 공식." 
                    theme="gold"
                    isLocked
                    onAction={() => setShowAccessDenied(true)}
                  />
                  <ArmoryCard 
                    icon={<ShieldAlert size={24} />} 
                    title="법인 설립 가이드" 
                    desc="세금을 합법적으로 회피하는 기술." 
                    theme="gold"
                    isLocked
                    onAction={() => setShowAccessDenied(true)}
                  />
               </div>
            </div>
          </div>
        </section>

        {/* --- THE ARCHITECTS: MASONRY REVIEW SECTION --- */}
        <section id="reviews" className="mt-40 space-y-20 relative overflow-hidden">
          <div className="text-center space-y-4 relative z-10 group cursor-default">
            <h2 className="font-serif font-black text-5xl md:text-8xl text-white tracking-tighter uppercase leading-none flex items-center justify-center gap-4">
              <div className="w-0 overflow-hidden transition-all duration-700 group-hover:w-16 opacity-0 group-hover:opacity-100 flex-shrink-0">
                <DaggerIcon className="w-16 h-16 -rotate-45 text-gold" />
              </div>
              <span className="text-white">THE</span> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#BF953F] bg-[length:200%_auto] animate-shine italic pr-3">ARCHITECTS</span>
            </h2>
            <p className="text-brand-muted text-lg font-serif italic max-w-2xl mx-auto">
              경제적 자유를 획득하십시오.
            </p>
          </div>

          {/* Masonry Grid with Fade-out Mask */}
          <div className="relative">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-h-[1200px] overflow-hidden">
               {REVIEWS.map((review, i) => (
                 <ProofCard key={i} {...review} />
               ))}
            </div>

            {/* Bottom Gradient Mask & CTA */}
            <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-brand-dark via-brand-dark/95 to-transparent flex flex-col items-center justify-end pb-10 z-20">
               <div className="flex flex-col items-center gap-6">
                 <div className="flex items-center gap-3 text-gold/60 animate-bounce">
                    <ChevronDown size={20} />
                    <span className="text-[10px] font-mono tracking-[0.4em] uppercase font-black">Scroll to see 1,452+ evidences</span>
                 </div>
                 <Button 
                   variant="secondary" 
                   className="py-6 px-16 border-gold/30 text-gold font-black uppercase tracking-[0.2em] bg-white/5 backdrop-blur-xl hover:bg-gold/10 transition-all"
                   onClick={onCheckout}
                 >
                   더 많은 증거 확인하기
                 </Button>
               </div>
            </div>
          </div>
        </section>
      </div>

      {/* ACCESS DENIED MODAL */}
      {showAccessDenied && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in backdrop-blur-xl bg-black/80">
           <div className="max-w-md w-full bg-[#0a0a0a] border border-red-900/50 p-10 rounded-sm shadow-[0_0_50px_rgba(220,38,38,0.2)] text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600 animate-pulse" />
              <div className="flex flex-col items-center gap-6">
                 <div className="w-20 h-20 rounded-full bg-red-600/10 flex items-center justify-center border border-red-600/30 animate-shake">
                    <ShieldAlert size={40} className="text-red-600" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-red-600 font-mono font-black text-xl tracking-widest uppercase">ACCESS DENIED</h3>
                    <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.3em]">Clearance Level Insufficient</p>
                 </div>
              </div>
              <p className="text-gray-400 font-serif italic text-lg leading-relaxed">
                이 자산은 VIP 멤버십 전용 특수 병기입니다. <br/>
                접근 권한을 획득하여 무기를 잠금 해제하십시오.
              </p>
              <div className="pt-4 space-y-4">
                 <Button 
                    className="w-full bg-gold-metallic py-6 font-black uppercase tracking-widest border-none"
                    onClick={() => { setShowAccessDenied(false); onCheckout(); }}
                 >
                    UPGRADE TO VIP <ChevronRight className="ml-2" />
                 </Button>
                 <button 
                    onClick={() => setShowAccessDenied(false)}
                    className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] hover:text-white transition-colors"
                 >
                    Return to Armory
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Mobile Fixed Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-5 bg-brand-charcoal/95 backdrop-blur-2xl border-t border-[#BF953F]/40 z-50 flex items-center justify-between gap-6 shadow-[0_-20px_40px_rgba(0,0,0,0.6)]">
        <div className="text-left">
          <span className="text-[10px] text-brand-muted line-through">1,200,000</span>
          <p className="text-gold font-serif font-black text-2xl tracking-tighter">290,000원</p>
        </div>
        <Button 
          size="sm" 
          className="flex-grow py-5 font-black uppercase text-sm tracking-widest animate-pulse-cta"
          onClick={onCheckout}
        >
          구매하기
        </Button>
      </div>
    </>
  );
};

const ArmoryCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  theme: 'cyan' | 'gold';
  isLocked?: boolean;
  isLoading?: boolean;
  onAction: () => void;
}> = ({ icon, title, desc, theme, isLocked, isLoading, onAction }) => (
  <div 
    onClick={onAction}
    className={`group relative aspect-square bg-white/[0.03] border rounded-sm p-6 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden ${
      theme === 'cyan' 
        ? 'border-white/5 hover:border-cyan-500/50 hover:bg-cyan-500/5' 
        : 'border-white/5 hover:border-gold/50 hover:bg-gold/5'
    }`}
  >
    {/* Locked chains effect for VIP */}
    {isLocked && (
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[4px] group-hover:backdrop-blur-[2px] transition-all">
         <div className="w-12 h-12 rounded-full bg-black/60 border border-gold/30 flex items-center justify-center text-gold shadow-[0_0_20px_rgba(191,149,63,0.3)] mb-3">
            <Lock size={20} />
         </div>
         <span className="text-[8px] font-mono text-gold/60 font-black tracking-[0.4em] uppercase">VIP ONLY</span>
      </div>
    )}

    <div className={`relative z-10 transition-all duration-500 ${isLocked ? 'blur-[4px] opacity-20' : ''}`}>
       <div className={`mb-4 w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-110 ${theme === 'cyan' ? 'text-cyan-400' : 'text-gold'}`}>
          {isLoading ? <Zap className="animate-spin" size={24} /> : icon}
       </div>
       <div className="space-y-2">
          <h4 className="text-white font-serif font-black text-lg tracking-tight leading-tight group-hover:text-white transition-colors">
            {title}
          </h4>
          <p className="text-gray-500 text-xs font-serif italic leading-relaxed">
            {desc}
          </p>
       </div>
    </div>

    <div className={`mt-4 flex items-center justify-between relative z-10 ${isLocked ? 'opacity-0' : ''}`}>
       <span className={`text-[8px] font-mono tracking-widest uppercase ${theme === 'cyan' ? 'text-cyan-400/50' : 'text-gold/50'}`}>
          {theme === 'cyan' ? 'Read-Only' : 'Classified'}
       </span>
       {theme === 'cyan' && (
         <Eye size={14} className="text-white/20 group-hover:text-cyan-400 transition-colors" />
       )}
    </div>

    {/* Slot corners décor */}
    <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${theme === 'cyan' ? 'border-cyan-500/30' : 'border-gold/30'}`} />
    <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${theme === 'cyan' ? 'border-cyan-500/30' : 'border-gold/30'}`} />
  </div>
);

const ProofCard: React.FC<{ 
  user: string; 
  title: string; 
  content: string; 
  time: string; 
  badgeColor?: string;
  isLong?: boolean;
}> = ({ user, title, content, time, isLong }) => (
  <div className={`break-inside-avoid mb-6 bg-white/[0.03] border border-white/10 rounded-sm p-8 group hover:border-gold/50 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden backdrop-blur-sm shadow-xl`}>
    <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
      <Zap size={60} className="text-gold" />
    </div>
    
    <div className="relative z-10 space-y-6">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center font-serif font-bold text-gold text-xs">
            {user[0]}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white/90">{user}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] font-mono tracking-widest uppercase text-gold/80 font-black">Verified Owner</span>
              <ShieldCheck size={10} className="text-gold" />
            </div>
          </div>
        </div>
        <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{time}</span>
      </div>

      {/* Card Body */}
      <div className="space-y-3">
        <h4 className="text-gold font-serif font-black text-xl italic tracking-tight group-hover:text-white transition-colors">"{title}"</h4>
        <p className={`text-gray-400 font-serif leading-relaxed italic ${isLong ? 'text-sm' : 'text-base'}`}>
          {content}
        </p>
      </div>

      {/* Card Footer */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
         <div className="flex gap-1 text-gold/40">
           {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
         </div>
         <span className="text-[7px] font-mono text-white/10 tracking-[0.5em] uppercase">Private Archive</span>
      </div>
    </div>
  </div>
);

const REVIEWS = [
  {
    user: "최** 대표",
    title: "이 책을 읽고 바로 사표 던졌습니다.",
    content: "반신반의하며 구매했지만, 첫 챕터를 읽고 소름이 돋았습니다. 제가 지난 5년간 했던 모든 노력이 얼마나 효율적이지 못했는지 깨달았죠. 월 300 노예에서 해방되는 법을 이 책에서 찾았습니다.",
    time: "2 hours ago",
    isLong: true
  },
  {
    user: "James L.",
    title: "I resigned today.",
    content: "상사의 눈치를 보던 삶은 끝났습니다. 이 책의 전략대로 '그림자 비즈니스'를 구축했고, 월급의 3배 수익이 고정적으로 발생하고 있습니다. 자유를 샀습니다.",
    time: "5 hours ago",
    isLong: false
  },
  {
    user: "박** (프리랜서)",
    title: "글리치(Glitch) 개념이 미쳤습니다.",
    content: "남들 다 망할 때 저만 돈 복사 중입니다. 시장의 빈틈을 파고드는 이 알고리즘을 모두가 알게 된다면 제 우위가 사라질까 걱정될 정도입니다. 이 가격에 파는 게 말이 안 됩니다.",
    time: "12 hours ago",
    isLong: false
  },
  {
    user: "송** (대학생)",
    title: "무인 점포 1호점 세팅 끝났습니다.",
    content: "진짜 일 안 해도 돈이 들어오네요. 자본주의라는 게임의 공략집을 얻은 기분이에요. 10년의 시행착오를 단 3시간 만에 압축했습니다. 경쟁자가 볼까 봐 무섭네요.",
    time: "1 day ago",
    isLong: true
  },
  {
    user: "정** (자영업)",
    title: "노동의 굴레를 벗어났습니다.",
    content: "몸이 열 개라도 모자랐던 식당 운영... 이제는 자동화 시스템으로 제 몸이 없어도 매장이 돌아갑니다. 매출은 오히려 늘었고요. 설계자가 된다는 게 이런 거군요.",
    time: "2 days ago",
    isLong: false
  },
  {
    user: "H. Watson",
    title: "Brutal and honest.",
    content: "Most business books are full of fluff. This is pure steel. The Architect doesn't hide behind metaphors; he shows you the exact gears and levers of power.",
    time: "3 days ago",
    isLong: true
  },
  {
    user: "윤**",
    title: "첫 달 매출 1,500만 원 찍었습니다.",
    content: "시스템 구축하고 첫 자동 입금 알람이 왔을 때의 전율을 잊지 못합니다. 저자님이 변심해서 판매를 중단하기 전에 구매한 게 제 인생 최고의 선택이었습니다.",
    time: "4 days ago",
    isLong: false
  },
  {
    user: "이** Operative",
    title: "The Glitch is real.",
    content: "시스템의 결함을 이용해 가치를 증식하는 법... 처음엔 마술인 줄 알았지만 철저히 계산된 과학이었습니다. 제 통장 잔고가 그 증거입니다.",
    time: "1 week ago",
    isLong: false
  },
  {
    user: "VIP Agent 09",
    title: "인생의 해답지.",
    content: "막연하게만 느껴졌던 '부의 추월차선'이 이제는 고속도로처럼 선명하게 보입니다. 감히 말하건대, 이 책을 읽기 전과 후의 저는 완전히 다른 종(Species)입니다.",
    time: "1 week ago",
    isLong: true
  }
];

const TocItem: React.FC<{ title: string; page: string }> = ({ title, page }) => (
  <div className="flex justify-between items-center group py-2">
    <span className="group-hover:text-white transition-colors tracking-tight font-serif text-gray-300">{title}</span>
    <div className="flex-grow border-b border-dotted border-white/10 mx-4 opacity-50 group-hover:opacity-100 transition-opacity" />
    <span className="text-brand-muted font-mono text-sm tracking-tighter group-hover:text-gold transition-colors">P. {page}</span>
  </div>
);
