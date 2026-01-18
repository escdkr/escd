
import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, 
  Unlock, 
  ShieldCheck, 
  CreditCard, 
  Briefcase, 
  Fingerprint, 
  Activity,
  Download,
  Zap,
  AlertTriangle,
  Megaphone,
  Radio,
  Brain,
  Landmark,
  Bot,
  Magnet,
  Crown,
  Terminal,
  BookOpen,
  Key,
  Search,
  Filter,
  Grid,
  GitMerge,
  ChevronDown,
  Layout,
  Crosshair, 
  Network,   
  LayoutTemplate, 
  MessageSquare, 
  Database   
} from 'lucide-react';
import { useSystem } from './SystemCore';
// --- EXISTING VIP DOCS ---
import { TaxProtocolDoc } from './TaxProtocolDoc';
import { CopywritingDoc } from './CopywritingDoc';
import { LegalShieldDoc } from './LegalShieldDoc';
import { ArchitectNoteDoc } from './ArchitectNoteDoc';
import { HiddenChapter } from './HiddenChapter';
import { InsiderLeakDoc } from './InsiderLeakDoc';
import { ArchBlueprintDoc } from './ArchBlueprintDoc';
import { FrameControlMaxDoc } from './FrameControlMaxDoc';
import { DigitalFeudalismDoc } from './DigitalFeudalismDoc';
import { OpinionControlDoc } from './OpinionControlDoc';
import { TrafficHijackDoc } from './TrafficHijackDoc'; 
// --- NEWLY IMPORTED STANDARD DOCS ---
import { GlitchDiagnosticDoc } from './GlitchDiagnosticDoc';
import { ZeroToOneRoadmapDoc } from './ZeroToOneRoadmapDoc';
import { ReptilianBrainTemplateDoc } from './ReptilianBrainTemplateDoc';
import { LeverageProtocolDoc } from './LeverageProtocolDoc';
import { SilentAuthorityDoc } from './SilentAuthorityDoc';
import { FrameControlDoc } from './FrameControlDoc';
import { SourcingSecretsDoc } from './SourcingSecretsDoc';
import { KeywordSniperDoc } from './KeywordSniperDoc';

import Portal from './Portal';

interface VIPAsset {
  id: string;
  code: string;
  title: string;
  type: 'CORE' | 'WEAPON' | 'SHIELD' | 'INTEL';
  tier: number; // For Tech Tree level
  desc: string;
  value: string;
  icon: React.ReactNode;
  parentId?: string; // For Tech Tree connections
}

// Merged Assets Database (VIP + Standard) with Enhanced Copy
const VIP_ASSETS: VIPAsset[] = [
  // --- TIER 1: FOUNDATION (CORE) ---
  {
    id: 'c0', 
    code: 'GAGE-GPS-O-ECC',
    title: '무노동의 제국 : Original',
    type: 'CORE',
    tier: 1,
    desc: '당신의 뇌에 박힌 \'노동자\'라는 악성 코드를 영구 삭제합니다. 시스템의 부품이 아닌 설계자로 다시 태어나는 29만 원짜리 원본 OS.',
    value: 'The Origin',
    icon: <BookOpen size={24} />
  },
  {
    id: 'f1', // Standard Asset
    code: 'DIAGNOSTIC-TOOL',
    title: 'The Glitch 진단 키트',
    type: 'CORE',
    tier: 1,
    desc: '당신은 언제까지 멈추면 굶어 죽는 삶을 살 것입니까? 당신의 소득 구조가 시스템에 얼마나 끔찍하게 종속되어 있는지 수치로 증명해 드립니다.',
    value: 'Standard',
    icon: <Activity size={24} />,
    parentId: 'c0'
  },
  {
    id: 'f2', // Standard Asset
    code: 'ZERO-TO-ONE-MAP',
    title: '무자본 창업 로드맵',
    type: 'CORE',
    tier: 1,
    desc: '돈이 없어서 사업을 못 한다고요? 핑계입니다. 0원으로 시작해 첫 수익 100만 원을 찍는 순간까지의, 실패가 불가능한 내비게이션.',
    value: 'Standard',
    icon: <Grid size={24} />,
    parentId: 'c0'
  },
  {
    id: 'v6',
    code: 'CEO-MINDSET',
    title: 'The Architect\'s Note',
    type: 'CORE',
    tier: 1,
    desc: '대중이 알면 폭동이 일어날지도 모릅니다. 자본주의 먹이사슬 최상위 포식자들이 쉬쉬하며 돌려보는 그들만의 생각법.',
    value: 'Mindset Patch',
    icon: <Briefcase size={24} />,
    parentId: 'c0'
  },

  // --- TIER 2: DEFENSE & BASICS (SHIELD/SYSTEM) ---
  {
    id: 'v1',
    code: 'TAX-HAVEN-01',
    title: '합법적 절세 프로토콜',
    type: 'SHIELD',
    tier: 2,
    desc: '버는 것보다 지키는 것이 전쟁입니다. 당신의 피 같은 돈을 시스템에 뺏기지 않고, 합법적으로 0원에 수렴하게 만드는 방어막 기술.',
    value: '₩5,000,000',
    icon: <CreditCard size={24} />,
    parentId: 'c0'
  },
  {
    id: 'c3', // Standard Asset
    code: 'LEVERAGE-PROTOCOL',
    title: '무한 레버리지 프로토콜',
    type: 'CORE',
    tier: 2,
    desc: '당신의 시간은 하루 24시간이 아닙니다. AI와 타인의 시간을 착취하여, 당신을 100명으로 복제하는 \'분신술\'을 전수합니다.',
    value: 'Standard',
    icon: <Network size={24} />,
    parentId: 'f2'
  },
  {
    id: 'f4', // Standard Asset
    code: 'SOURCING-DB',
    title: '시크릿 소싱 데이터베이스',
    type: 'INTEL',
    tier: 2,
    desc: '남들이 도매꾹 뒤질 때, 당신은 공장 사장과 직거래하십시오. 유통 마진을 90% 남기는 1급 기밀 공급처 리스트 50선.',
    value: 'Standard',
    icon: <Database size={24} />,
    parentId: 'f2'
  },
  {
    id: 'v4',
    code: 'LAW-SHIELD-V2',
    title: '블랙 컨슈머 방어권',
    type: 'SHIELD',
    tier: 2,
    desc: '진상 고객에게 쩔쩔매지 마십시오. 법적 조항 한 줄로 그들의 입을 막고, 당신의 멘탈과 자산을 철통같이 지키는 변호사급 방패.',
    value: '₩2,000,000',
    icon: <ShieldCheck size={24} />,
    parentId: 'v1'
  },

  // --- TIER 3: OFFENSE & PSYCHOLOGY (WEAPON) ---
  {
    id: 'v2',
    code: 'PSYCH-OPS-01',
    title: '무조건 YES를 받아내기',
    type: 'WEAPON',
    tier: 3,
    desc: '이건 대화가 아닙니다. 최면입니다. 상대방의 무의식에 침투하여, 거절이라는 선택지 자체를 지워버리는 악마의 설득 기술.',
    value: '₩3,500,000',
    icon: <Brain size={24} />,
    parentId: 'v6'
  },
  {
    id: 'c2', // Standard Asset
    code: 'LIZARD-BRAIN-COPY',
    title: '파충류 뇌 자극 템플릿',
    type: 'WEAPON',
    tier: 3,
    desc: '고객의 이성을 마비시키십시오. 오직 본능(공포, 욕망)만을 타격하여, 읽는 순간 결제 버튼을 누르지 않고는 못 배기게 만듭니다.',
    value: 'Standard',
    icon: <Zap size={24} />,
    parentId: 'v2'
  },
  {
    id: 'c6', // Standard Asset
    code: 'FRAME-CONTROL-LITE',
    title: '프레임 컨트롤 대화법',
    type: 'WEAPON',
    tier: 3,
    desc: '더 이상 \'을\'로 살지 마십시오. 어떤 거물 앞에서도 기죽지 않고, 대화의 주도권을 쥐고 흔드는 \'갑\'의 언어 습관.',
    value: 'Standard',
    icon: <MessageSquare size={24} />,
    parentId: 'v2'
  },
  {
    id: 'v7',
    code: 'TRAFFIC-HIJACK',
    title: '손님을 줄 세우는 법',
    type: 'WEAPON',
    tier: 3,
    desc: '광고비 0원으로 오픈런을 만드십시오. 글 하나만 툭 던져도 좀비 떼처럼 사람들이 몰려오게 만드는 트래픽 하이재킹(Hijacking).',
    value: '₩8,000,000',
    icon: <Magnet size={24} />,
    parentId: 'v2'
  },
  {
    id: 'v8',
    code: 'OPINION-CTRL',
    title: '여론 조작 프로토콜',
    type: 'WEAPON',
    tier: 3,
    desc: '진실은 중요하지 않습니다. 믿게 만드는 것이 진실입니다. 대중의 심리를 조종하여 당신을 \'신\'으로 숭배하게 만드는 선동의 기술.',
    value: '₩15,000,000',
    icon: <Megaphone size={24} />,
    parentId: 'v7'
  },

  // --- TIER 4: EMPIRE & AUTOMATION (INTEL/CORE) ---
  {
    id: 'v3',
    code: 'KIOSK-WEB-V9',
    title: '자고 있어도 돈 버는 기계',
    type: 'WEAPON',
    tier: 4,
    desc: '당신이 잠든 사이에도, 여행을 간 사이에도 돈이 쏟아집니다. 24시간 불평 없이 일하는 \'디지털 노예\'를 고용하십시오.',
    value: '₩12,000,000',
    icon: <Bot size={24} />,
    parentId: 'v1'
  },
  {
    id: 'c5', // Standard Asset
    code: 'SILENT-AUTHORITY',
    title: 'Silent Authority',
    type: 'SHIELD',
    tier: 4,
    desc: '진정한 왕은 소리치지 않습니다. 존재 자체만으로 압도적인 권위를 풍기며, 고객을 무릎 꿇게 만드는 무언의 브랜딩.',
    value: 'Standard',
    icon: <LayoutTemplate size={24} />,
    parentId: 'v9'
  },
  {
    id: 'f5', // Standard Asset
    code: 'KEYWORD-SNIPER',
    title: '키워드 스나이퍼',
    type: 'INTEL',
    tier: 4,
    desc: '경쟁자들이 피 터지게 싸우는 레드오션은 피하십시오. 아직 아무도 깃발을 꽂지 않은 황금 키워드를 저격하여 독점하십시오.',
    value: 'Standard',
    icon: <Crosshair size={24} />,
    parentId: 'v3'
  },
  {
    id: 'v9',
    code: 'ARCH-BLUEPRINT',
    title: '30분 만에 10억 가게 짓기',
    type: 'CORE',
    tier: 4,
    desc: '인테리어 업자에게 사기 당하지 마십시오. AI를 노예로 부려, 대기업도 울고 갈 압도적인 브랜드를 단 30분 만에 설계합니다.',
    value: '₩4,500,000',
    icon: <Landmark size={24} />,
    parentId: 'v3'
  },
  {
    id: 'v11',
    code: 'DIGITAL-FEUDAL',
    title: '디지털 봉건제 리포트',
    type: 'INTEL',
    tier: 4,
    desc: '미래는 두 계급으로 나뉩니다. AI를 소유한 지주와, AI에게 지배당하는 소작농. 당신은 어느 쪽이 될 것입니까? 지주가 되는 비밀 문서.',
    value: 'Future Intel',
    icon: <Zap size={24} />,
    parentId: 'v9'
  },

  // --- TIER 5: GOD MODE (APEX) ---
  {
    id: 'v5',
    code: 'INSIDER-LEAK-X',
    title: '내부자 거래 리포트',
    type: 'INTEL',
    tier: 5,
    desc: '뉴스가 나오면 이미 늦습니다. 세력들이 개미들에게 물량을 떠넘기기 72시간 전, 그들이 은밀하게 주고받는 1급 첩보.',
    value: 'Priceless',
    icon: <Radio size={24} />,
    parentId: 'v11'
  },
  {
    id: 'v10',
    code: 'FRAME-CTRL-MAX',
    title: '프레임 컨트롤 : Grand Master',
    type: 'CORE',
    tier: 5,
    desc: '대화의 연금술. 상대의 무의식을 해킹하여 적을 아군으로, 거절을 승낙으로 바꾸는 0.1%의 현실 왜곡장(Reality Distortion Field).',
    value: 'God Tier',
    icon: <Crown size={24} />,
    parentId: 'v11'
  }
];

export const VIPArmoryPage: React.FC<{ onBack: () => void; onGoToPublic?: () => void }> = ({ onBack, onGoToPublic }) => {
  const { toast, sounds } = useSystem();
  const [securityCheck, setSecurityCheck] = useState<'scanning' | 'verified' | 'complete'>('scanning');
  const [scanProgress, setScanProgress] = useState(0);
  
  // Viewer State
  const [openedAssetId, setOpenedAssetId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Filter & View State
  const [viewMode, setViewMode] = useState<'GRID' | 'TREE'>('GRID');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'CORE' | 'WEAPON' | 'SHIELD' | 'INTEL'>('ALL');
  const [isAnimating, setIsAnimating] = useState(false);

  // Security Check Animation
  useEffect(() => {
    sounds.play('boot');
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSecurityCheck('verified');
          sounds.play('success');
          setTimeout(() => setSecurityCheck('complete'), 1500);
          return 100;
        }
        return prev + 4; // Faster boot for UX
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const handleExtract = (asset: VIPAsset) => {
    sounds.play('access');
    setDownloadingId(asset.id);
    
    setTimeout(() => {
      setDownloadingId(null);
      sounds.play('success');
      
      // Determine viewer - All assets (Free + VIP) are viewable here
      setOpenedAssetId(asset.id);
      
      if (asset.tier > 2) {
          toast.success(`'${asset.title}' Decrypted. Launching Viewer.`, "ACCESS GRANTED");
      } else {
          // Toast for standard assets
          toast.info(`Opening '${asset.title}' in VIP Mode.`, "SYSTEM READY");
      }
    }, 1200);
  };

  const handleToggleToPublic = () => {
    sounds.play('click');
    setIsAnimating(true);
    setTimeout(() => {
        if (onGoToPublic) onGoToPublic();
    }, 500);
  };

  // Filtering Logic
  const filteredAssets = VIP_ASSETS.filter(asset => {
    const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          asset.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'ALL' || asset.type === activeFilter;
    return matchesSearch && matchesFilter;
  }).sort((a, b) => a.tier - b.tier); // SORT BY TIER ASCENDING

  if (securityCheck !== 'complete') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden z-50">
         <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
         
         <div className="w-full max-w-md text-center space-y-8 relative z-10">
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
               <div className="absolute inset-0 border-2 border-[#BF953F]/30 rounded-full border-t-transparent animate-spin" />
               <div className="absolute inset-2 border-2 border-[#BF953F]/20 rounded-full border-b-transparent animate-[spin_3s_linear_infinite_reverse]" />
               
               {securityCheck === 'scanning' ? (
                  <Fingerprint size={48} className="text-[#BF953F] animate-pulse" />
               ) : (
                  <Unlock size={48} className="text-emerald-500 animate-bounce" />
               )}
            </div>

            <div className="space-y-2">
               <h2 className="font-mono text-xl font-bold tracking-[0.3em] text-[#BF953F] uppercase">
                  {securityCheck === 'scanning' ? 'Verifying Clearance...' : 'Access Granted'}
               </h2>
               <p className="text-[10px] font-mono text-white/40 tracking-widest">
                  ID: VIP-AGENT-077 // CLASS: ARCHITECT
               </p>
            </div>

            <div className="w-64 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
               <div 
                  className={`h-full transition-all duration-100 ease-out ${securityCheck === 'verified' ? 'bg-emerald-500' : 'bg-[#BF953F]'}`}
                  style={{ width: `${scanProgress}%` }}
               />
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#020202] relative py-12 px-6 overflow-hidden flex flex-col font-sans transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Document Viewers (Wrapped in Portal) */}
      {openedAssetId && (
        <Portal>
          {/* VIP DOCS */}
          {openedAssetId === 'c0' && <HiddenChapter onBack={() => setOpenedAssetId(null)} onCheckout={() => {}} />}
          {openedAssetId === 'v1' && <TaxProtocolDoc onClose={() => setOpenedAssetId(null)} />}
          {openedAssetId === 'v2' && <CopywritingDoc onClose={() => setOpenedAssetId(null)} />}
          {openedAssetId === 'v4' && <LegalShieldDoc onClose={() => setOpenedAssetId(null)} />}
          {openedAssetId === 'v6' && <ArchitectNoteDoc onClose={() => setOpenedAssetId(null)} />}
          {openedAssetId === 'v7' && <TrafficHijackDoc onClose={() => setOpenedAssetId(null)} />}
          {openedAssetId === 'v8' && <OpinionControlDoc onClose={() => setOpenedAssetId(null)} />}
          {openedAssetId === 'v5' && <InsiderLeakDoc onClose={() => setOpenedAssetId(null)} />}
          {openedAssetId === 'v9' && <ArchBlueprintDoc onClose={() => setOpenedAssetId(null)} />}
          {openedAssetId === 'v10' && <FrameControlMaxDoc onClose={() => setOpenedAssetId(null)} />}
          {openedAssetId === 'v11' && <DigitalFeudalismDoc onClose={() => setOpenedAssetId(null)} />}
          
          {/* STANDARD DOCS (Enabled with isVip=true) */}
          {openedAssetId === 'f1' && <GlitchDiagnosticDoc onClose={() => setOpenedAssetId(null)} onCheckout={() => {}} />}
          {openedAssetId === 'f2' && <ZeroToOneRoadmapDoc onClose={() => setOpenedAssetId(null)} onCheckout={() => {}} isVip={true} />}
          {openedAssetId === 'c3' && <LeverageProtocolDoc onClose={() => setOpenedAssetId(null)} onCheckout={() => {}} isVip={true} />}
          {openedAssetId === 'f4' && <SourcingSecretsDoc onClose={() => setOpenedAssetId(null)} onCheckout={() => {}} isVip={true} />}
          {openedAssetId === 'c2' && <ReptilianBrainTemplateDoc onClose={() => setOpenedAssetId(null)} onCheckout={() => {}} isVip={true} />}
          {openedAssetId === 'c6' && <FrameControlDoc onClose={() => setOpenedAssetId(null)} onCheckout={() => {}} isVip={true} />}
          {openedAssetId === 'c5' && <SilentAuthorityDoc onClose={() => setOpenedAssetId(null)} onCheckout={() => {}} isVip={true} />}
          {openedAssetId === 'f5' && <KeywordSniperDoc onClose={() => setOpenedAssetId(null)} onCheckout={() => {}} isVip={true} />}
        </Portal>
      )}

      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-[#BF953F]/5 blur-[200px]" />
         <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#1a1500] blur-[150px]" />
         <div className="absolute inset-0 noise-texture opacity-20 mix-blend-overlay" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-12 flex-grow flex flex-col">
        
        {/* 1. Header & Stats with Toggle */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-[#BF953F]/20 pb-8 animate-fade-in">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#BF953F]/40 rounded-full bg-[#BF953F]/5 backdrop-blur-md shadow-[0_0_30px_rgba(191,149,63,0.15)]">
                 <Key size={14} className="text-[#BF953F]" />
                 <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FCF6BA]">Top Secret // Eyes Only</span>
              </div>
              <h1 className="font-serif font-black text-5xl md:text-7xl tracking-tighter uppercase leading-none text-white drop-shadow-[0_0_30px_rgba(191,149,63,0.2)]">
                 THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] to-[#FCF6BA] italic">ARMORY</span>
              </h1>
              <p className="text-sm font-serif italic text-[#94a3b8]">
                 설계자(Architect)를 위한 제국 건설의 모든 도구. 29만 원의 가치, 그 이상.
              </p>
           </div>

           {/* Dashboard Ticker & Toggle */}
           <div className="flex flex-col items-end gap-6">
              {/* THE SWITCH */}
              <div className="flex items-center gap-4 bg-black/40 p-2 rounded-full border border-white/10 backdrop-blur-md">
                 <button 
                    onClick={handleToggleToPublic}
                    className="flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-500 text-white/40 hover:text-white"
                 >
                    <Unlock size={14} />
                    <span className="text-[10px] font-mono font-black tracking-widest uppercase">Public</span>
                 </button>
                 
                 <button 
                    className="flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-500 bg-gold-metallic text-black shadow-[0_0_20px_rgba(191,149,63,0.4)]"
                 >
                    <Lock size={14} />
                    <span className="text-[10px] font-mono font-black tracking-widest uppercase">VIP Vault</span>
                 </button>
              </div>

              {/* Stats */}
              <div className="flex gap-4">
                  <div className="bg-[#050505] border border-[#BF953F]/20 p-4 rounded-sm flex items-center gap-4">
                     <div className="p-2 bg-[#BF953F]/10 rounded-full"><Lock size={16} className="text-[#BF953F]" /></div>
                     <div>
                        <span className="block text-[9px] font-mono text-white/40 uppercase tracking-widest">Total Assets</span>
                        <span className="block text-xl font-bold text-white font-mono">{VIP_ASSETS.length}</span>
                     </div>
                  </div>
                  <div className="bg-[#050505] border border-[#BF953F]/20 p-4 rounded-sm flex items-center gap-4">
                     <div className="p-2 bg-emerald-500/10 rounded-full"><Activity size={16} className="text-emerald-500 animate-pulse" /></div>
                     <div>
                        <span className="block text-[9px] font-mono text-white/40 uppercase tracking-widest">System Status</span>
                        <span className="block text-xl font-bold text-emerald-500 font-mono">SECURE</span>
                     </div>
                  </div>
              </div>
           </div>
        </header>

        {/* 2. Control Bar (Search, Filter, Toggle) */}
        <div className="sticky top-4 z-40 bg-[#020202]/80 backdrop-blur-xl border border-white/10 p-2 rounded-sm flex flex-col md:flex-row gap-4 justify-between items-center shadow-2xl">
           
           {/* Search */}
           <div className="relative w-full md:w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#BF953F] transition-colors" size={14} />
              <input 
                 type="text" 
                 placeholder="SEARCH ASSET CODE..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-white/5 border border-white/5 rounded-sm py-2 pl-9 pr-4 text-xs font-mono text-[#FCF6BA] focus:outline-none focus:border-[#BF953F]/50 transition-all uppercase placeholder:text-white/20"
              />
           </div>

           {/* Filter Tabs */}
           <div className="flex gap-1 overflow-x-auto no-scrollbar w-full md:w-auto">
              {(['ALL', 'CORE', 'WEAPON', 'SHIELD', 'INTEL'] as const).map((filter) => (
                 <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider rounded-sm transition-all border ${
                       activeFilter === filter 
                          ? 'bg-[#BF953F] text-black border-[#BF953F] shadow-[0_0_15px_rgba(191,149,63,0.3)]' 
                          : 'bg-transparent text-white/40 border-transparent hover:text-white hover:bg-white/5'
                    }`}
                 >
                    {filter}
                 </button>
              ))}
           </div>

           {/* View Toggle */}
           <div className="flex bg-white/5 rounded-sm p-1 border border-white/5">
              <button 
                 onClick={() => setViewMode('GRID')}
                 className={`p-2 rounded-sm transition-all ${viewMode === 'GRID' ? 'bg-white/10 text-[#BF953F]' : 'text-white/20 hover:text-white'}`}
                 title="Grid View"
              >
                 <Grid size={16} />
              </button>
              <button 
                 onClick={() => setViewMode('TREE')}
                 className={`p-2 rounded-sm transition-all ${viewMode === 'TREE' ? 'bg-white/10 text-[#BF953F]' : 'text-white/20 hover:text-white'}`}
                 title="Tech Tree View"
              >
                 <GitMerge size={16} />
              </button>
           </div>
        </div>

        {/* 3. Main Content Area */}
        <div className="flex-grow min-h-[500px]">
           {viewMode === 'GRID' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                 {filteredAssets.length > 0 ? (
                    filteredAssets.map((asset) => (
                       <VIPCard 
                          key={asset.id} 
                          asset={asset} 
                          isDownloading={downloadingId === asset.id}
                          onExtract={() => handleExtract(asset)} 
                       />
                    ))
                 ) : (
                    <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-sm">
                       <Terminal className="mx-auto text-white/20 mb-4" size={32} />
                       <p className="text-white/40 font-mono text-xs uppercase tracking-widest">No Assets Found matching Protocol</p>
                    </div>
                 )}
              </div>
           ) : (
              <TechTreeView assets={VIP_ASSETS} onSelect={handleExtract} />
           )}
        </div>

        {/* 4. Footer */}
        <div className="mt-auto pt-10 border-t border-[#BF953F]/10 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-[#BF953F]/40">
           <span>Session ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
           <span>Vault Encryption: 512-bit Quantum</span>
        </div>

      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

// 1. VIP Card
const VIPCard: React.FC<{ asset: VIPAsset; isDownloading: boolean; onExtract: () => void }> = ({ asset, isDownloading, onExtract }) => {
   const getTypeColor = (type: string) => {
      switch(type) {
         case 'WEAPON': return 'text-red-500 border-red-500/20 bg-red-500/5';
         case 'SHIELD': return 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5';
         case 'INTEL': return 'text-cyan-400 border-cyan-400/20 bg-cyan-400/5';
         default: return 'text-[#BF953F] border-[#BF953F]/20 bg-[#BF953F]/5'; // CORE
      }
   };

   return (
      <div className="group relative bg-[#080808] border border-white/10 hover:border-[#BF953F]/50 rounded-sm overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(191,149,63,0.1)] flex flex-col h-full">
         <div className="absolute inset-0 bg-gradient-to-br from-[#BF953F]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
         
         <div className="p-8 flex-grow space-y-6 relative z-10">
            <div className="flex justify-between items-start">
               <div className={`p-4 rounded-sm border transition-all duration-500 shadow-inner ${isDownloading ? 'bg-[#BF953F] text-black border-[#BF953F]' : getTypeColor(asset.type)}`}>
                  {isDownloading ? <Activity className="animate-spin" size={24} /> : asset.icon}
               </div>
               <div className="flex flex-col items-end">
                  <span className="text-[9px] font-mono text-[#BF953F]/40 group-hover:text-[#BF953F] uppercase tracking-widest transition-colors">{asset.code}</span>
                  <span className={`text-[8px] font-mono uppercase tracking-widest mt-2 px-2 py-0.5 rounded-full border ${getTypeColor(asset.type)}`}>{asset.type}</span>
               </div>
            </div>

            <div className="space-y-3">
               <h3 className="text-xl font-serif font-black text-white group-hover:text-[#FCF6BA] transition-colors leading-tight">
                  {asset.title}
               </h3>
               <p className="text-xs text-gray-500 font-serif leading-relaxed group-hover:text-gray-400 transition-colors">
                  {asset.desc}
               </p>
            </div>
         </div>

         <div className="px-8 pb-8 pt-0 mt-auto relative z-10">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6 group-hover:via-[#BF953F]/40 transition-colors" />
            <div className="flex items-center justify-between text-[10px] font-mono text-white/20 mb-4 uppercase tracking-wider">
               <span className={asset.value === 'Standard' ? 'text-white/60' : 'text-[#BF953F]'}>{asset.value}</span>
               <span className="flex items-center gap-2"><ShieldCheck size={10} /> Verified</span>
            </div>
            <button 
               onClick={onExtract}
               disabled={isDownloading}
               className={`w-full py-4 border border-[#BF953F]/30 text-[#BF953F] font-mono text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#BF953F] hover:text-black transition-all flex items-center justify-center gap-2 relative overflow-hidden group/btn ${isDownloading ? 'cursor-wait' : ''}`}
            >
               {isDownloading ? (
                  <>
                     <span className="relative z-10">DECRYPTING...</span>
                     <div className="absolute inset-0 bg-[#BF953F]/20 w-full animate-loading-bar-turbo" />
                  </>
               ) : (
                  <>
                     <Download size={12} className="group-hover/btn:translate-y-0.5 transition-transform" />
                     <span>ACCESS NODE</span>
                  </>
               )}
            </button>
         </div>
      </div>
   );
};

// 2. Tech Tree View Component
const TechTreeView: React.FC<{ assets: VIPAsset[]; onSelect: (asset: VIPAsset) => void }> = ({ assets, onSelect }) => {
   // Hardcoded layout for the tree structure
   const tiers = [
      { id: 1, name: 'FOUNDATION', subtitle: 'The Awakening' },
      { id: 2, name: 'DEFENSE', subtitle: 'Shield & Basics' },
      { id: 3, name: 'OFFENSE', subtitle: 'Psychological Warfare' },
      { id: 4, name: 'EMPIRE', subtitle: 'Automation & Scale' },
      { id: 5, name: 'APEX', subtitle: 'God Mode' },
   ];

   return (
      <div className="w-full h-full min-h-[800px] bg-[#050505] border border-white/5 rounded-sm p-10 relative overflow-hidden flex flex-col items-center">
         <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
         
         <div className="relative z-10 flex flex-col gap-12 w-full max-w-4xl">
            {tiers.map((tier) => {
               const tierAssets = assets.filter(a => a.tier === tier.id);
               return (
                  <div key={tier.id} className="relative flex flex-col items-center gap-6 group">
                     {/* Connector Line to Next Tier */}
                     {tier.id < 5 && <div className="absolute bottom-[-48px] w-[1px] h-12 bg-gradient-to-b from-white/10 to-white/5" />}
                     
                     <div className="flex flex-col items-center gap-1">
                        <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">Tier 0{tier.id}</span>
                        <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest">{tier.name}</h3>
                     </div>

                     <div className="flex flex-wrap justify-center gap-6">
                        {tierAssets.map(asset => (
                           <div key={asset.id} className="relative">
                              {/* Connection Lines (Simplified visual hack) */}
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[1px] h-6 bg-white/10" />
                              
                              <button 
                                 onClick={() => onSelect(asset)}
                                 className="w-40 p-4 bg-[#0a0a0a] border border-white/10 hover:border-[#BF953F] hover:shadow-[0_0_20px_rgba(191,149,63,0.3)] transition-all duration-300 rounded-sm flex flex-col items-center gap-3 group/node"
                              >
                                 <div className={`p-2 rounded-full border border-white/10 group-hover/node:bg-[#BF953F] group-hover/node:text-black group-hover/node:border-[#BF953F] transition-all text-white/50`}>
                                    {asset.icon}
                                 </div>
                                 <span className="text-[10px] font-bold text-white/80 uppercase text-center leading-tight group-hover/node:text-white">
                                    {asset.title}
                                 </span>
                              </button>
                           </div>
                        ))}
                     </div>
                  </div>
               )
            })}
         </div>
      </div>
   );
};
