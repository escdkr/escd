
import React, { useRef } from 'react';
import { Button } from './Button';
import { 
  ChevronRight, 
  ShieldAlert, 
  TrendingUp, 
  Lock, 
  Download, 
  Map, 
  FileText, 
  Calculator, 
  Zap, 
  ShieldCheck, 
  Unlock,
  Package,
  Crosshair,
  Database,
  Eye
} from 'lucide-react';
import { Book3D, Book3DRef } from './Book3D';

interface HomeProps {
  onOpenAction: () => void;
  onGoToDetail: () => void;
  onGoToLegal: () => void;
  onGoToLogin: () => void;
  onGoToPreview: () => void;
  onGoToFreeArmory: () => void; // Added Prop
}

export const Home: React.FC<HomeProps> = ({ 
  onOpenAction, 
  onGoToDetail, 
  onGoToLegal, 
  onGoToLogin,
  onGoToPreview,
  onGoToFreeArmory
}) => {
  const bookRef = useRef<Book3DRef>(null);

  const handleTriggerOpen = () => {
    bookRef.current?.open();
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#BF953F]/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-black/40 border border-[#BF953F]/30 backdrop-blur-md mb-10 animate-fade-in-up shadow-[0_0_15px_rgba(191,149,63,0.1)]">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#FCF6BA] animate-pulse shadow-[0_0_10px_#FCF6BA]"></span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#BF953F] font-serif font-bold">Private Access Only</span>
          </div>

          <div className="mb-8 space-y-6">
            <h1 className="font-serif font-black text-5xl md:text-7xl lg:text-9xl text-white leading-[1.05] tracking-tighter drop-shadow-2xl">
              경제적 자유를<br />
              <span className="text-gold">팝니다.</span>
            </h1>
            <p className="font-serif text-xl md:text-3xl text-brand-muted font-bold tracking-tight opacity-90 animate-fade-in">
              "성실함은 <span className="text-red-500 italic decoration-red-500/50 underline-offset-4">병</span>이다."
            </p>
          </div>

          <p className="font-serif font-medium text-brand-muted text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed tracking-tight">
            <span className="text-white/90">숨만 쉬어도 돈이 꽂히는 0.1%의 설계도.</span><br/>
            당신이 평생 노동의 굴레에 갇혀 있었던<br className="md:hidden"/> 진짜 이유를 폭로합니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" className="w-full sm:w-auto group text-lg font-black tracking-tight" onClick={handleTriggerOpen}>
              시스템 훔치기 (290,000원) <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-brand-muted hover:text-white font-medium" onClick={onGoToDetail}>
              증거 확인하기 (무료)
            </Button>
          </div>

          <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-20 border-t border-[#BF953F]/20 pt-10">
            <div className="flex flex-col items-center gap-3 group cursor-pointer" onClick={onGoToDetail}>
              <TrendingUp className="text-[#BF953F] h-6 w-6 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(191,149,63,0.5)]" />
              <span className="text-sm font-serif font-bold text-brand-text tracking-wider">누적 매출 5억 달성</span>
            </div>
            <div className="flex flex-col items-center gap-3 group cursor-pointer" onClick={onGoToLegal}>
              <ShieldAlert className="text-[#BF953F] h-6 w-6 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(191,149,63,0.5)]" />
              <span className="text-sm font-serif font-bold text-brand-text tracking-wider">불만족 시 100% 환불</span>
            </div>
            <div className="flex flex-col items-center gap-3 group cursor-pointer" onClick={onGoToLogin}>
              <Lock className="text-[#BF953F] h-6 w-6 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(191,149,63,0.5)]" />
              <span className="text-sm font-serif font-bold text-brand-text tracking-wider">시크릿 커뮤니티 초대</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE ARMORY: CYBERPUNK WEAPON SHOP --- */}
      <section id="armory" className="py-40 relative bg-[#020617] overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,_rgba(191,149,63,0.1),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-32 space-y-6">
            <h2 className="font-serif font-black text-6xl md:text-8xl text-white tracking-tighter uppercase leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              THE <span className="text-gold italic">ARMORY</span>
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-8 shadow-[0_0_15px_rgba(191,149,63,0.5)]" />
            <p className="text-brand-muted text-xl font-serif italic max-w-2xl mx-auto leading-relaxed">
              전쟁에서 승리하기 위한 무기들을 제공합니다. <br/>
              등급에 따라 접근 권한이 나뉩니다.
            </p>
          </div>

          {/* ZONE A: SUPPLY DROP (Free Access) */}
          <div className="mb-40">
            <div className="flex items-center gap-4 mb-12 border-b border-cyan-500/20 pb-6">
               <div className="p-3 bg-cyan-500/10 rounded-full">
                  <Unlock size={24} className="text-[#22D3EE] animate-pulse" />
               </div>
               <div>
                  <h3 className="text-2xl font-serif font-black text-white tracking-[0.2em] uppercase">SUPPLY DROP</h3>
                  <p className="text-[10px] font-mono text-cyan-400 font-bold tracking-[0.4em] uppercase opacity-70">보급품 투하 :: Read Only</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <LootCard 
                type="free"
                icon={<ShieldCheck size={32} />}
                title="노예 지수 진단 키트"
                desc="당신의 노동 의존도를 뼈저리게 확인하고 탈출 지점을 확보하십시오. (Excel)"
                onAction={onGoToFreeArmory}
              />
              <LootCard 
                type="free"
                icon={<Map size={32} />}
                title="무자본 창업 0 to 1 지도"
                desc="길을 잃지 않게 해주는 정교한 나침반. 0원에서 첫 수익까지의 최단 경로. (PDF)"
                onAction={onGoToFreeArmory}
              />
              <LootCard 
                type="free"
                icon={<FileText size={32} />}
                title="초사고 마인드셋 요약본"
                desc="설계자의 뇌 구조를 이식하는 기초 코드. 패배주의 유전자를 영구 제거합니다. (Notion)"
                onAction={onGoToFreeArmory}
              />
            </div>
          </div>

          {/* ZONE B: CLASSIFIED WEAPONS (VIP Access) */}
          <div className="relative">
            {/* Darker background for VIP section */}
            <div className="absolute -inset-20 bg-black/40 blur-[100px] pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-12 border-b border-gold/20 pb-6 relative z-10">
               <div className="p-3 bg-gold/10 rounded-full">
                  <Lock size={24} className="text-gold" />
               </div>
               <div>
                  <h3 className="text-2xl font-serif font-black text-white tracking-[0.2em] uppercase">CLASSIFIED WEAPONS</h3>
                  <p className="text-[10px] font-mono text-gold font-bold tracking-[0.4em] uppercase opacity-70">1급 기밀 무기 :: VIP ONLY</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <LootCard 
                type="vip"
                icon={<Calculator size={32} />}
                title="자동 수익 시뮬레이터"
                desc="잠자는 동안 들어올 돈을 소수점 단위로 예측하는 정교한 알고리즘 툴."
                onAction={onGoToPreview}
              />
              <LootCard 
                type="vip"
                icon={<Zap size={32} />}
                title="카피라이팅 템플릿"
                desc="고객의 지갑을 무의식적으로 열게 만드는 훔친 문장들과 전환 공식 7선."
                onAction={onGoToPreview}
              />
              <LootCard 
                type="vip"
                icon={<Database size={32} />}
                title="법인 절세 시크릿 가이드"
                desc="시스템이 부과하는 세금을 합법적으로 지우고 수익을 온전히 보전하는 기술."
                onAction={onGoToPreview}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Area (Existing) */}
      <section className="py-40 bg-transparent relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative z-10 text-left">
            <h2 className="font-serif font-black text-4xl md:text-6xl mb-8 leading-[1.1] text-white tracking-tighter">
              노동 소득의 <br />
              <span className="text-gold relative inline-block">
                배신을 깨닫다
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[linear-gradient(90deg,transparent_0%,#BF953F_50%,transparent_100%)] opacity-90 shadow-[0_0_10px_#BF953F]"></span>
              </span>
            </h2>
            <div className="space-y-6 text-lg text-white/60 font-sans font-light leading-relaxed">
              <p>착하게 살면 부자가 된다는 말은 거짓말입니다. 이 시스템은 당신의 윤리관을 송두리째 흔들 수 있습니다.</p>
              <p>사람을 홀리고, 지갑을 열게 만드는 <strong className="text-[#BF953F]">‘악마의 기술’</strong>을 전수합니다.</p>
            </div>
            <div className="mt-10">
              <button 
                onClick={onGoToPreview}
                className="group inline-flex items-center gap-3 text-[#FCF6BA] hover:text-[#BF953F] transition-colors font-serif font-bold tracking-widest text-sm border-b border-[#BF953F]/30 pb-2 outline-none"
              >
                금지된 챕터 미리보기 
                <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform"/>
              </button>
            </div>
          </div>
          
          <Book3D ref={bookRef} onOpenComplete={onOpenAction} />
        </div>
      </section>
    </>
  );
};

// LootCard Component for Armory
const LootCard: React.FC<{
  type: 'free' | 'vip';
  icon: React.ReactNode;
  title: string;
  desc: string;
  onAction: () => void;
}> = ({ type, icon, title, desc, onAction }) => {
  const isFree = type === 'free';
  
  return (
    <div 
      onClick={onAction}
      className={`group relative overflow-hidden rounded-sm border p-8 transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[340px] shadow-2xl ${
        isFree 
          ? 'bg-cyan-900/10 border-cyan-500/20 hover:border-cyan-400 hover:bg-cyan-400/5 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]' 
          : 'bg-black border-gold/20 hover:border-gold/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
      }`}
    >
      {/* Noise Texture for Depth */}
      <div className="absolute inset-0 noise-texture opacity-30 pointer-events-none" />
      
      {/* VIP Locked Styling */}
      {!isFree && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] group-hover:backdrop-blur-0 transition-all duration-700">
           <div className="w-16 h-16 rounded-full bg-black/80 border border-gold/40 flex items-center justify-center text-gold shadow-[0_0_25px_rgba(191,149,63,0.4)] mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all">
              <Lock size={28} />
           </div>
           <span className="text-[10px] font-mono text-gold/80 font-black tracking-[0.5em] uppercase">ACCESS RESTRICTED</span>
        </div>
      )}

      <div className="relative z-10 space-y-6">
        <div className={`w-14 h-14 rounded-sm border flex items-center justify-center transition-all duration-500 ${
          isFree 
            ? 'border-cyan-500/20 text-[#22D3EE] bg-cyan-500/5 group-hover:scale-110 group-hover:rotate-6' 
            : 'border-gold/20 text-gold bg-gold/5 group-hover:scale-110 group-hover:rotate-6'
        }`}>
          {isFree ? icon : <Package size={28} className="text-gold/40" />}
        </div>
        
        <div className="space-y-3">
          <h4 className={`text-2xl font-serif font-black tracking-tight leading-tight ${
            isFree ? 'text-white' : 'text-white/90'
          }`}>
            {title}
          </h4>
          <p className={`text-sm font-serif italic leading-relaxed transition-all duration-700 ${
            isFree 
              ? 'text-cyan-100/40 group-hover:text-cyan-100/80' 
              : 'text-gray-600 blur-[3px] group-hover:blur-none'
          }`}>
            {desc}
          </p>
        </div>
      </div>

      <div className="relative z-10 pt-6">
        {isFree ? (
          <button className="w-full py-4 border border-[#22D3EE]/30 text-[#22D3EE] font-mono text-[11px] font-black tracking-[0.3em] uppercase hover:bg-[#22D3EE] hover:text-black transition-all flex items-center justify-center gap-3">
            <Eye size={14} /> 무료 열람하기
          </button>
        ) : (
          <button className="w-full py-4 bg-gold-metallic text-black font-mono text-[11px] font-black tracking-[0.3em] uppercase hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(191,149,63,0.2)]">
            <Lock size={14} /> 접근 권한 필요
          </button>
        )}
      </div>

      {/* Decorative Corners for High-Tech feel */}
      <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${isFree ? 'border-cyan-500/40' : 'border-gold/40'}`} />
      <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${isFree ? 'border-cyan-500/40' : 'border-gold/40'}`} />
    </div>
  );
};
