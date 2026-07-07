
import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  ShieldCheck, 
  Activity,
  Download,
  Terminal,
  Search,
  Grid,
  GitMerge
} from 'lucide-react';
import { useSystem } from './SystemCore';
import { VIPAsset } from '../types/armory';
import { VIP_ASSETS } from '../data/armory/vip';
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

  // 한글 매핑
  const categoryLabels: Record<string, string> = {
    'ALL': '전체',
    'CORE': '본질 (Core)',
    'WEAPON': '공격 (Weapon)',
    'SHIELD': '방어 (Shield)',
    'INTEL': '첩보 (Intel)'
  };

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
                  <Activity size={48} className="text-[#BF953F] animate-pulse" />
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
          {openedAssetId === 'c0' && <HiddenChapter onBack={() => setOpenedAssetId(null)} onCheckout={() => {}} isUnlocked={true} />}
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
                 <Terminal size={14} className="text-[#BF953F]" />
                 <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FCF6BA]">Top Secret // Eyes Only</span>
              </div>
              <h1 className="font-serif font-black text-5xl md:text-7xl tracking-tighter uppercase leading-none text-white drop-shadow-[0_0_30px_rgba(191,149,63,0.2)]">
                 THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] to-[#FCF6BA] italic pr-3">ARMORY</span>
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
                 placeholder="자산 검색..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-white/5 border border-white/5 rounded-sm py-2 pl-9 pr-4 text-xs font-mono text-[#FCF6BA] focus:outline-none focus:border-[#BF953F]/50 transition-all placeholder:text-white/20"
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
                    {categoryLabels[filter]}
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
                          labels={categoryLabels}
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
const VIPCard: React.FC<{ asset: VIPAsset; isDownloading: boolean; onExtract: () => void; labels: Record<string, string> }> = ({ asset, isDownloading, onExtract, labels }) => {
   const getTypeColor = (type: string) => {
      switch(type) {
         case 'WEAPON': return 'text-red-500 border-red-500/20 bg-red-500/5';
         case 'SHIELD': return 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5';
         case 'INTEL': return 'text-cyan-400 border-cyan-400/20 bg-cyan-400/5';
         default: return 'text-[#BF953F] border-[#BF953F]/20 bg-[#BF953F]/5'; // CORE
      }
   };

   // 한글 라벨 추출 (괄호 앞부분만)
   const typeLabel = labels[asset.type]?.split(' (')[0] || asset.type;

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
                  <span className={`text-[9px] font-bold font-mono uppercase tracking-widest mt-2 px-2 py-0.5 rounded-full border ${getTypeColor(asset.type)}`}>{typeLabel}</span>
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
