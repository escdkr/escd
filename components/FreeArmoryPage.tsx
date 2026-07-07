
import React, { useState } from 'react';
import { 
  Eye, 
  Terminal, 
  Lock, 
  ChevronRight, 
  CheckCircle2
} from 'lucide-react';
import { Button } from './Button';
import { useSystem } from './SystemCore';
import { FreeAsset } from '../types/armory';
import { FREE_ASSETS } from '../data/armory/free';

import { MatrixHackingDoc } from './MatrixHackingDoc';
import { GlitchDiagnosticDoc } from './GlitchDiagnosticDoc';
import { ZeroToOneRoadmapDoc } from './ZeroToOneRoadmapDoc';
import { ReptilianBrainTemplateDoc } from './ReptilianBrainTemplateDoc';
import { LeverageProtocolDoc } from './LeverageProtocolDoc';
import { SilentAuthorityDoc } from './SilentAuthorityDoc';
import { FrameControlDoc } from './FrameControlDoc';
import { SourcingSecretsDoc } from './SourcingSecretsDoc';
import { KeywordSniperDoc } from './KeywordSniperDoc';

export const FreeArmoryPage: React.FC<{ onCheckout: () => void }> = ({ onCheckout }) => {
  const { toast, sounds } = useSystem();
  const [accessingId, setAccessingId] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<FreeAsset | null>(null);

  const handleAccess = (asset: FreeAsset) => {
    sounds.play('access');
    setAccessingId(asset.id);
    
    setTimeout(() => {
      setAccessingId(null);
      sounds.play('success');
      setSelectedAsset(asset);
    }, 800);
  };

  const closeViewer = () => {
    setSelectedAsset(null);
  };

  return (
    <div className="min-h-screen bg-[#020617] relative py-20 px-6 overflow-hidden font-sans">
      
      {/* 1. Tactical Background (Cyan/Slate Theme) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-900/10 blur-[120px]" />
         <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>

      {/* Asset Viewers Overlay */}
      {selectedAsset && (
        <>
          {selectedAsset.id === 'f1' ? <GlitchDiagnosticDoc onClose={closeViewer} onCheckout={onCheckout} /> :
           selectedAsset.id === 'c1' ? <MatrixHackingDoc onClose={closeViewer} /> :
           selectedAsset.id === 'f2' ? <ZeroToOneRoadmapDoc onClose={closeViewer} onCheckout={onCheckout} /> :
           selectedAsset.id === 'c2' ? <ReptilianBrainTemplateDoc onClose={closeViewer} onCheckout={onCheckout} /> :
           selectedAsset.id === 'c3' ? <LeverageProtocolDoc onClose={closeViewer} onCheckout={onCheckout} /> :
           selectedAsset.id === 'c5' ? <SilentAuthorityDoc onClose={closeViewer} onCheckout={onCheckout} /> :
           selectedAsset.id === 'c6' ? <FrameControlDoc onClose={closeViewer} onCheckout={onCheckout} /> :
           selectedAsset.id === 'f4' ? <SourcingSecretsDoc onClose={closeViewer} onCheckout={onCheckout} /> :
           selectedAsset.id === 'f5' ? <KeywordSniperDoc onClose={closeViewer} onCheckout={onCheckout} /> :
           <GenericAssetViewer asset={selectedAsset} onClose={closeViewer} onUpgrade={onCheckout} />
          }
        </>
      )}

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-8 pt-10 border-b border-cyan-900/30 pb-10">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-cyan-500/30 rounded-sm bg-cyan-950/30 backdrop-blur-md">
                 <Terminal size={14} className="text-cyan-400 animate-pulse" />
                 <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-cyan-400">Tactical Supply Depot</span>
              </div>
              <h1 className="font-serif font-black text-5xl md:text-7xl tracking-tighter uppercase leading-none text-white drop-shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                 Standard <span className="text-cyan-400 italic pr-3">Armory</span>
              </h1>
              <p className="text-slate-400 text-lg font-serif italic max-w-xl leading-relaxed">
                 "전쟁을 시작하기 위한 기초 보급품입니다. <br/>
                 이곳의 정보는 <strong className="text-cyan-300">무료(Free)</strong>지만, 그 가치는 당신의 실행력에 달려 있습니다."
              </p>
           </div>

           {/* Live Stat Box */}
           <div className="hidden md:block p-6 border-l-2 border-cyan-500/30 bg-cyan-950/10">
              <div className="text-right space-y-1">
                 <span className="text-[9px] font-mono text-cyan-600 uppercase tracking-widest block">System Status</span>
                 <span className="text-2xl font-mono font-bold text-cyan-400 tracking-tighter">ONLINE</span>
                 <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Access Level: Public</span>
              </div>
           </div>
        </header>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {FREE_ASSETS.map((asset) => (
              <AssetCard 
                key={asset.id} 
                asset={asset} 
                isAccessing={accessingId === asset.id}
                onAccess={() => handleAccess(asset)} 
              />
           ))}
        </div>

        {/* Upsell Teaser */}
        <div className="mt-20 relative p-1 rounded-sm overflow-hidden group cursor-pointer" onClick={onCheckout}>
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent group-hover:via-gold/20 transition-all duration-700" />
           <div className="relative z-10 border border-gold/30 bg-[#0a0a0a] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center">
                    <Lock size={32} className="text-gold" />
                 </div>
                 <div className="space-y-1">
                    <h3 className="text-xl font-serif font-black text-white uppercase tracking-wider">Access VIP Vault</h3>
                    <p className="text-sm text-gray-400 font-mono">Unlock advanced weaponry and classified intel.</p>
                 </div>
              </div>
              <Button className="bg-gold-metallic text-black border-none font-black uppercase tracking-widest px-10 py-4 shadow-[0_0_30px_rgba(191,149,63,0.3)]">
                 Upgrade Clearance
              </Button>
           </div>
        </div>

      </div>
    </div>
  );
};

// --- TACTICAL CARD COMPONENT ---
const AssetCard: React.FC<{ asset: FreeAsset; isAccessing: boolean; onAccess: () => void }> = ({ asset, isAccessing, onAccess }) => {
  return (
    <div className="group relative bg-[#0f172a]/40 border border-white/5 hover:border-cyan-500/50 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)] flex flex-col h-full backdrop-blur-sm">
      
      {/* Corner Markers */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-cyan-400 transition-colors" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-cyan-400 transition-colors" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-cyan-400 transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-cyan-400 transition-colors" />

      <div className="p-8 flex-grow space-y-6 relative z-10">
        <div className="flex justify-between items-start">
          <div className={`p-3 rounded-sm bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 group-hover:text-cyan-200 group-hover:bg-cyan-500/20 transition-all duration-300 ${isAccessing ? 'animate-pulse' : ''}`}>
            {asset.icon}
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-mono text-cyan-700 group-hover:text-cyan-500 uppercase tracking-widest">SYS-{asset.id}</span>
            <span className="text-[8px] font-mono text-slate-500 border border-slate-800 px-2 py-0.5 rounded-[1px] mt-1 bg-black/50">{asset.category}</span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-serif font-bold text-white group-hover:text-cyan-50 transition-colors leading-tight">
            {asset.title}
          </h3>
          <p className="text-sm text-slate-400 group-hover:text-slate-300 font-sans leading-relaxed">
            {asset.desc}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-8 pb-8 pt-0 mt-auto relative z-10">
        <div className="w-full h-[1px] bg-white/5 mb-4 group-hover:bg-cyan-500/30 transition-colors" />
        
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-4 uppercase tracking-wider">
          <span className="text-cyan-600 group-hover:text-cyan-400">{asset.volume}</span>
          <span className="flex items-center gap-1"><Eye size={10} /> {asset.views.toLocaleString()}</span>
        </div>

        <button 
          onClick={onAccess}
          disabled={isAccessing}
          className={`w-full py-3 border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 font-mono text-xs font-bold tracking-[0.2em] uppercase hover:bg-cyan-500 hover:text-black hover:border-cyan-500 transition-all flex items-center justify-center gap-2 relative overflow-hidden group/btn ${isAccessing ? 'cursor-wait opacity-80' : ''}`}
        >
          {isAccessing ? (
            <>
              <span className="relative z-10">Initializing...</span>
              <div className="absolute inset-0 bg-cyan-500/20 w-full animate-loading-bar-turbo" />
            </>
          ) : (
            <>
              <Terminal size={12} className="group-hover/btn:rotate-90 transition-transform" />
              <span>EXECUTE</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const GenericAssetViewer: React.FC<{ asset: FreeAsset; onClose: () => void; onUpgrade: () => void }> = ({ asset, onClose, onUpgrade }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/95 backdrop-blur-xl animate-fade-in p-6 pt-24 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-cyan-500/30 shadow-[0_0_100px_rgba(34,211,238,0.15)] rounded-sm p-8 md:p-12 text-center space-y-8 mb-20">
        
        <div className="flex justify-center">
          <div className="p-4 bg-cyan-900/10 rounded-full border border-cyan-500/30 text-cyan-400 animate-pulse">
            {asset.icon}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-black text-white uppercase tracking-tight">
            {asset.title}
          </h2>
          <p className="text-gray-400 leading-relaxed font-sans max-w-md mx-auto">
            {asset.desc}
          </p>
        </div>

        <div className="py-8 border-y border-white/5 space-y-4 bg-white/[0.02]">
          <div className="flex items-center justify-center gap-2 text-cyan-500 text-sm font-mono uppercase tracking-widest animate-pulse">
            <Lock size={14} /> Encrypted Preview Mode
          </div>
          <p className="text-xs text-white/30 font-serif">
            본 자료는 보안 프로토콜에 의해 실시간 스트리밍으로만 제공됩니다. <br/>
            완전한 소유권(Download)은 VIP 멤버십 전용 혜택입니다.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button onClick={onClose} variant="outline" className="border-white/20 text-white/60 hover:text-white hover:border-white">
            Terminate Session
          </Button>
          <Button onClick={onUpgrade} className="bg-cyan-500 text-black border-none hover:bg-cyan-400 font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            Unlock Full Access
          </Button>
        </div>

      </div>
    </div>
  );
};
