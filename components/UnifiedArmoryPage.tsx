
import React, { useState, useEffect } from 'react';
import { 
  Lock, Unlock, Terminal 
} from 'lucide-react';
import { useSystem } from './SystemCore';
import { ArmoryAsset } from '../types/armory';
import { UNIFIED_ARMORY_ASSETS } from '../data/armory/unified';

import { GlitchDiagnosticDoc } from './GlitchDiagnosticDoc';
import { MatrixHackingDoc } from './MatrixHackingDoc';
import { ZeroToOneRoadmapDoc } from './ZeroToOneRoadmapDoc';
import { ReptilianBrainTemplateDoc } from './ReptilianBrainTemplateDoc';
import { LeverageProtocolDoc } from './LeverageProtocolDoc';
import { SilentAuthorityDoc } from './SilentAuthorityDoc';
import { FrameControlDoc } from './FrameControlDoc';
import { SourcingSecretsDoc } from './SourcingSecretsDoc';
import { KeywordSniperDoc } from './KeywordSniperDoc';

interface UnifiedArmoryPageProps {
  onBack?: () => void;
  onGoToVIP?: () => void; // New Prop for Navigation
  initialMode?: 'standard' | 'blueprint'; 
}

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
  const displayedAssets = UNIFIED_ARMORY_ASSETS;

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
              The <span className={`italic transition-colors duration-500 text-cyan-400 pr-3`}>Armory</span>
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
