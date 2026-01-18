
import React, { useState, useEffect } from 'react';
import { 
  Lock, Unlock, Zap, Database, Terminal, Cpu, LayoutTemplate, 
  MessageSquare, Globe, Search, ShieldCheck, CreditCard, 
  MousePointer2, Eye, PenTool, Layers, Grid, Crosshair, 
  FileText, Activity, AlertCircle, Network, ChevronRight, Box, Hexagon, Key,
  Crown, ShieldAlert, Binary, Brain, BookOpen, Star,
  Bot, Magnet, Megaphone, Radio, Landmark
} from 'lucide-react';
import { Button } from './Button';
import { useSystem } from './SystemCore';
import { GlitchDiagnosticDoc } from './GlitchDiagnosticDoc';
import { MatrixHackingDoc } from './MatrixHackingDoc';
import { ZeroToOneRoadmapDoc } from './ZeroToOneRoadmapDoc';
import { ReptilianBrainTemplateDoc } from './ReptilianBrainTemplateDoc';
import { LeverageProtocolDoc } from './LeverageProtocolDoc';
import { SilentAuthorityDoc } from './SilentAuthorityDoc';
import { FrameControlDoc } from './FrameControlDoc';
import { SourcingSecretsDoc } from './SourcingSecretsDoc';
import { KeywordSniperDoc } from './KeywordSniperDoc';
import { TaxProtocolDoc } from './TaxProtocolDoc';
import { CopywritingDoc } from './CopywritingDoc';
import { LegalShieldDoc } from './LegalShieldDoc';
import { ArchitectNoteDoc } from './ArchitectNoteDoc';
import { HiddenChapter } from './HiddenChapter';
import { DigitalFeudalismDoc } from './DigitalFeudalismDoc';
import { OpinionControlDoc } from './OpinionControlDoc';
import { InsiderLeakDoc } from './InsiderLeakDoc';
import { ArchBlueprintDoc } from './ArchBlueprintDoc';
import { FrameControlMaxDoc } from './FrameControlMaxDoc';
import { TrafficHijackDoc } from './TrafficHijackDoc'; // Import New Doc

interface UnifiedArmoryPageProps {
  onBack?: () => void;
  onGoToVIP?: () => void; // New Prop for Navigation
  initialMode?: 'standard' | 'blueprint'; 
}

interface ArmoryAsset {
  id: string;
  tier: 'FREE' | 'VIP';
  title: string;
  subtitle: string;
  type: string;
  icon: React.ReactNode;
  desc: string;
  highlight?: boolean; // New prop for Hero items
}

const ARMORY_DB: ArmoryAsset[] = [
  // --- FREE TIER ASSETS (Standard Public Armory) ---
  {
    id: 'f1',
    tier: 'FREE',
    title: 'The Glitch 진단 키트',
    subtitle: '노동 의존도 자가 진단',
    type: 'DIAGNOSTIC',
    icon: <Activity size={24} />,
    desc: "당신의 소득 구조가 시스템에 얼마나 종속되어 있는지 수치로 확인하는 계산기."
  },
  {
    id: 'f2',
    tier: 'FREE',
    title: '무자본 창업 로드맵',
    subtitle: '0 to 1 실행 지도',
    type: 'STRATEGY',
    icon: <Grid size={24} />,
    desc: "자본금 0원으로 첫 수익을 만들기까지의 구체적인 단계별 미션."
  },
  {
    id: 'f5',
    tier: 'FREE',
    title: '키워드 스나이퍼',
    subtitle: '황금 키워드 채굴기',
    type: 'TOOL',
    icon: <Crosshair size={24} />,
    desc: "경쟁 강도는 낮고 검색량은 높은 시장의 빈틈을 찾아내는 분석 툴."
  },
  {
    id: 'c2',
    tier: 'FREE',
    title: '파충류 뇌 자극 템플릿',
    subtitle: '본능 타격 카피라이팅',
    type: 'TEMPLATE',
    icon: <Zap size={24} />,
    desc: "이성을 마비시키고 본능(공포, 욕망)을 자극하여 구매 버튼을 누르게 만드는 문장 공식."
  },
  {
    id: 'c3',
    tier: 'FREE',
    title: '무한 레버리지 프로토콜',
    subtitle: '자동화 시스템 설계',
    type: 'SYSTEM',
    icon: <Network size={24} />,
    desc: "나 대신 일하는 AI와 위임 시스템을 구축하여 시간을 0으로 수렴시키는 법."
  },
  {
    id: 'c5',
    tier: 'FREE',
    title: 'Silent Authority',
    subtitle: '무언의 브랜딩',
    type: 'BRANDING',
    icon: <LayoutTemplate size={24} />,
    desc: "말하지 않고도 압도적인 권위를 풍기는 시각적 브랜딩 가이드라인."
  },
  {
    id: 'c6',
    tier: 'FREE',
    title: '프레임 컨트롤 대화법',
    subtitle: '갑의 언어',
    type: 'SCRIPT',
    icon: <MessageSquare size={24} />,
    desc: "협상 테이블에서 언제나 우위를 점하는 심리적 프레임 장악 기술."
  },
  {
    id: 'f4',
    tier: 'FREE',
    title: '시크릿 소싱 데이터베이스',
    subtitle: '공급처 리스트 50선',
    type: 'DATA',
    icon: <Database size={24} />,
    desc: "유통 마진을 획기적으로 줄여주는 검증된 도매처 및 공장 직거래 리스트."
  },
];

export const UnifiedArmoryPage: React.FC<UnifiedArmoryPageProps> = ({ onBack, onGoToVIP, initialMode = 'standard' }) => {
  const { toast, sounds } = useSystem();
  const [viewMode, setViewMode] = useState<'standard' | 'vip'>('standard'); // Default standard
  const [activeViewerId, setActiveViewerId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Force standard mode on mount unless explicitly overridden (though we navigate away for VIP)
    setViewMode('standard'); 
  }, []);

  const handleToggleToVIP = () => {
    sounds.play('boot');
    setIsAnimating(true);
    setTimeout(() => {
        if (onGoToVIP) onGoToVIP();
    }, 500); // Short delay for animation
  };

  const handleAssetClick = (asset: ArmoryAsset) => {
    sounds.play('access');
    setActiveViewerId(asset.id);
  };

  const closeViewer = () => setActiveViewerId(null);

  // Always show FREE assets in this component
  const displayedAssets = ARMORY_DB;

  return (
    <div className={`min-h-screen transition-colors duration-1000 relative overflow-hidden font-sans bg-[#020617]`}>
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 transition-all duration-1000">
         {/* Standard Mode Background (Cyan/Tactical) */}
         <>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[length:40px_40px]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-900/10 blur-[120px]" />
         </>
      </div>

      {/* Asset Viewers Overlay */}
      {activeViewerId === 'f1' && <GlitchDiagnosticDoc onClose={closeViewer} onCheckout={() => {}} />}
      {activeViewerId === 'c1' && <MatrixHackingDoc onClose={closeViewer} />}
      {activeViewerId === 'f2' && <ZeroToOneRoadmapDoc onClose={closeViewer} onCheckout={() => {}} isVip={false} />}
      {activeViewerId === 'c2' && <ReptilianBrainTemplateDoc onClose={closeViewer} onCheckout={() => {}} isVip={false} />}
      {activeViewerId === 'c3' && <LeverageProtocolDoc onClose={closeViewer} onCheckout={() => {}} isVip={false} />}
      {activeViewerId === 'c5' && <SilentAuthorityDoc onClose={closeViewer} onCheckout={() => {}} isVip={false} />}
      {activeViewerId === 'c6' && <FrameControlDoc onClose={closeViewer} onCheckout={() => {}} />}
      {activeViewerId === 'f4' && <SourcingSecretsDoc onClose={closeViewer} onCheckout={() => {}} isVip={false} />}
      {activeViewerId === 'f5' && <KeywordSniperDoc onClose={closeViewer} onCheckout={() => {}} isVip={false} />}
      
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* Header Controller */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-white/5 pb-8">
          <div className="space-y-4">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-sm border backdrop-blur-md transition-colors duration-500 border-cyan-500/30 bg-cyan-900/10 text-cyan-400`}>
               <Terminal size={14} />
               <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase">
                  Phase 1: Standard Clearance
               </span>
            </div>
            <h1 className={`text-5xl md:text-7xl font-serif font-black tracking-tighter uppercase leading-none text-white drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]`}>
              The <span className={`italic transition-colors duration-500 text-cyan-400`}>Armory</span>
            </h1>
            <p className={`text-sm font-serif italic transition-colors duration-500 text-slate-400`}>
               전쟁터로 나가는 초심자를 위한 기초 보급품입니다.
            </p>
          </div>

          {/* THE SWITCH */}
          <div className="flex items-center gap-4 bg-black/40 p-2 rounded-full border border-white/10 backdrop-blur-md">
             <button 
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-500 bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]`}
             >
                <Unlock size={14} />
                <span className="text-[10px] font-mono font-black tracking-widest uppercase">Public</span>
             </button>
             
             <button 
                onClick={handleToggleToVIP}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-500 text-white/40 hover:text-gold`}
             >
                <Lock size={14} />
                <span className="text-[10px] font-mono font-black tracking-widest uppercase">VIP Vault</span>
             </button>
          </div>
        </header>

        {/* --- ASSETS GRID --- */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500 ${isAnimating ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
           {displayedAssets.map((asset) => (
              <ArmoryCard 
                 key={asset.id} 
                 asset={asset} 
                 mode="standard"
                 onClick={() => handleAssetClick(asset)}
              />
           ))}
        </div>

      </div>
    </div>
  );
};

const ArmoryCard: React.FC<{ asset: ArmoryAsset; mode: 'standard' | 'vip'; onClick: () => void }> = ({ asset, mode, onClick }) => {
   const themeColor = 'text-cyan-400';
   const borderColor = 'group-hover:border-cyan-500/50';
   const bgHover = 'group-hover:bg-cyan-500/5';

   return (
      <div 
         onClick={onClick}
         className={`group relative p-8 border border-white/5 bg-white/[0.02] rounded-sm overflow-hidden transition-all duration-300 ${borderColor} ${bgHover} cursor-pointer flex flex-col h-full`}
      >
         
         <div className="flex justify-between items-start mb-6">
            <div className={`p-3 rounded-sm border border-white/10 bg-black/40 ${themeColor}`}>
               {asset.icon}
            </div>
            <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded-full">
               {asset.type}
            </span>
         </div>

         <div className="space-y-2 mb-8 flex-grow">
            <h3 className={`font-serif font-bold text-xl leading-tight text-white`}>
               {asset.title}
            </h3>
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider">
               {asset.subtitle}
            </p>
         </div>

         <div className={`text-sm font-serif leading-relaxed text-gray-400`}>
            {asset.desc}
         </div>

         <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20" />
      </div>
   );
};
