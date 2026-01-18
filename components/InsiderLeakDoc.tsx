
import React, { useState, useEffect } from 'react';
import { X, Radio, ShieldAlert, Eye, EyeOff, Lock, Unlock, FileWarning, Globe, Activity, Terminal, AlertTriangle, ScanLine } from 'lucide-react';
import { Button } from './Button';

interface InsiderLeakDocProps {
  onClose: () => void;
}

interface IntelItem {
  id: string;
  sector: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'CRITICAL';
  timestamp: string;
  headline: string;
  body: string; // Contains parts that will be redacted
  redactedParts: string[];
}

const INTEL_FEED: IntelItem[] = [
  {
    id: 'INTEL-092',
    sector: 'KOSDAQ / BIO',
    riskLevel: 'CRITICAL',
    timestamp: 'Received 2 hours ago',
    headline: "대형 바이오 A사, 임상 3상 데이터 유출 의혹",
    body: "내부 관계자 제보에 따르면, 주력 파이프라인 [REDACTED]의 임상 결과에 치명적인 통계적 오류가 발견됨. 현재 경영진은 이를 은폐하고 유상증자를 강행하려는 움직임 포착. 공시 발표 전 [REDACTED] 해야 함.",
    redactedParts: ["XX-702 신약", "전량 매도"]
  },
  {
    id: 'INTEL-089',
    sector: 'REAL ESTATE / POLICY',
    riskLevel: 'HIGH',
    timestamp: 'Received 6 hours ago',
    headline: "GTX-D 노선, 미발표 신설 역사(Station) 도면 입수",
    body: "국토부 비공개 초안 확인 결과, 기존 예정지였던 [REDACTED]가 제외되고, 의외의 지역인 [REDACTED] 사거리에 역사가 신설될 확률 90%. 해당 지역 토지 거래량이 지난주부터 급증 중.",
    redactedParts: ["검단 신도시 일부", "김포 고촌"]
  },
  {
    id: 'INTEL-085',
    sector: 'GLOBAL MACRO',
    riskLevel: 'MEDIUM',
    timestamp: 'Received 14 hours ago',
    headline: "미 연준(FED) 비공개 회의록 요약",
    body: "공식 발표와 달리, 이사회 내부에서는 [REDACTED] 가능성을 심각하게 논의 중. 만약 이 시나리오가 확정되면 나스닥은 단기적으로 [REDACTED] 할 것으로 예상됨.",
    redactedParts: ["금리 50bp 인하", "15% 이상 급등"]
  }
];

export const InsiderLeakDoc: React.FC<InsiderLeakDocProps> = ({ onClose }) => {
  const [decryptionStatus, setDecryptionStatus] = useState<'locked' | 'decrypting' | 'unlocked'>('locked');
  const [progress, setProgress] = useState(0);

  const handleDecrypt = () => {
    setDecryptionStatus('decrypting');
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setDecryptionStatus('unlocked');
      }
    }, 30);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/95 backdrop-blur-xl animate-fade-in p-4 pt-24 md:p-8 md:pt-28 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#02040a] shadow-[0_0_100px_rgba(34,211,238,0.1)] border border-cyan-900/40 flex flex-col md:h-[80vh] h-full rounded-sm overflow-hidden mb-20">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-900/30 bg-[#010203] z-20 relative shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-cyan-900/10 rounded-sm border border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
               <Radio size={20} className="text-cyan-500 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-cyan-500 font-mono text-[10px] tracking-[0.3em] uppercase font-bold">Deep Web Monitor // Level 0</span>
              <h2 className="text-white font-serif font-bold text-lg tracking-tight">PROJECT: INSIDER LEAK X</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-cyan-500 transition-colors group">
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-grow overflow-y-auto bg-[#030508] text-cyan-100 font-sans relative selection:bg-cyan-500/30 selection:text-white scroll-smooth">
          
          {/* Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-10 opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.05)_0%,_transparent_80%)] pointer-events-none" />

          <div className="max-w-3xl mx-auto p-8 md:p-12 relative z-20 space-y-12">
            
            {/* Intro Section */}
            <div className="text-center space-y-6 animate-fade-in-up">
              <div className="inline-block border border-cyan-500/30 px-4 py-1.5 rounded-full bg-cyan-500/5 text-cyan-400 text-[10px] font-mono tracking-[0.3em] uppercase mb-4 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                 D-72 Hours Protocol
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[1.1] text-white">
                뉴스가 나오면 <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">이미 늦습니다.</span>
              </h1>
              <p className="font-serif text-lg text-cyan-200/60 italic max-w-xl mx-auto leading-relaxed border-l-4 border-cyan-500/50 pl-6 text-left md:text-center mt-6">
                "개미가 뉴스를 보고 매수 버튼을 누를 때, <br/>
                세력은 이미 매도 버튼에 손을 올리고 있습니다. <br/>
                이 리포트는 <strong className="text-cyan-400">정보의 비대칭</strong>을 역이용합니다."
              </p>
            </div>

            {/* Decryption Control */}
            <div className="sticky top-0 bg-[#030508]/95 backdrop-blur-md border-y border-cyan-900/50 py-4 z-30 flex justify-between items-center px-4 -mx-4 md:mx-0 md:px-0 md:relative md:bg-transparent md:border-none md:py-0 mb-8">
               <div className="flex items-center gap-3">
                  {decryptionStatus === 'unlocked' ? (
                     <Unlock size={18} className="text-emerald-500" />
                  ) : (
                     <Lock size={18} className="text-red-500" />
                  )}
                  <span className={`text-xs font-mono uppercase tracking-widest font-bold ${decryptionStatus === 'unlocked' ? 'text-emerald-500' : 'text-red-500'}`}>
                     {decryptionStatus === 'locked' ? 'Content Encrypted' : decryptionStatus === 'decrypting' ? 'Decrypting...' : 'Decryption Complete'}
                  </span>
               </div>
               
               {decryptionStatus === 'locked' && (
                  <Button onClick={handleDecrypt} className="bg-cyan-900/30 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-black text-[10px] py-2 px-4 h-auto">
                     DECRYPT INTEL
                  </Button>
               )}
            </div>

            {/* Progress Bar */}
            {decryptionStatus === 'decrypting' && (
               <div className="w-full h-1 bg-cyan-900/30 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }} />
               </div>
            )}

            {/* Intel Feed */}
            <div className="space-y-6">
               {INTEL_FEED.map((intel) => (
                  <IntelCard key={intel.id} intel={intel} isUnlocked={decryptionStatus === 'unlocked'} />
               ))}
            </div>

            {/* Footer Signoff */}
            <div className="pt-16 border-t border-cyan-900/30 flex flex-col md:flex-row justify-between items-end gap-6">
               <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-600/70">
                     Source: Unknown
                  </div>
                  <div className="flex items-center gap-2 text-cyan-500 font-bold uppercase tracking-widest text-xs">
                     <Terminal size={14} />
                     Connection Secure
                  </div>
               </div>
               <div className="text-right">
                  <p className="font-serif italic text-white/40 text-sm">"Information is the only currency."</p>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const IntelCard: React.FC<{ intel: IntelItem; isUnlocked: boolean }> = ({ intel, isUnlocked }) => {
   // Function to render text with redactions
   const renderBody = () => {
      let content = intel.body;
      intel.redactedParts.forEach(part => {
         const replacement = isUnlocked 
            ? `<span class="bg-emerald-500/20 text-emerald-400 font-bold px-1 rounded-sm border border-emerald-500/30 animate-pulse-once">${part}</span>`
            : `<span class="bg-white text-transparent select-none px-1 rounded-sm cursor-not-allowed text-[0px] w-16 inline-block align-middle h-3 mx-1 opacity-50 relative overflow-hidden group"><span class="absolute inset-0 bg-black/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"/>REDACTED</span>`; // White block for redaction look
         content = content.replace('[REDACTED]', replacement);
      });
      return <p className="text-sm leading-loose text-gray-300 font-serif" dangerouslySetInnerHTML={{ __html: content }} />;
   };

   return (
      <div className="bg-[#05070a] border border-cyan-900/30 p-6 rounded-sm relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
         {/* Background accent */}
         <div className="absolute top-0 right-0 p-12 bg-cyan-500/5 blur-[50px] rounded-full pointer-events-none" />
         
         <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
               <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-cyan-600 bg-cyan-900/10 px-2 py-1 rounded-[1px] border border-cyan-900/20">{intel.id}</span>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{intel.sector}</span>
               </div>
               <div className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-sm border ${
                  intel.riskLevel === 'CRITICAL' ? 'border-red-500/30 text-red-500 bg-red-500/5' : 
                  intel.riskLevel === 'HIGH' ? 'border-orange-500/30 text-orange-500 bg-orange-500/5' : 
                  'border-blue-500/30 text-blue-500 bg-blue-500/5'
               }`}>
                  {intel.riskLevel === 'CRITICAL' && <AlertTriangle size={10} />}
                  {intel.riskLevel === 'HIGH' && <ShieldAlert size={10} />}
                  {intel.riskLevel === 'MEDIUM' && <Activity size={10} />}
                  {intel.riskLevel} IMPACT
               </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{intel.headline}</h3>
            
            {renderBody()}

            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
               <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{intel.timestamp}</span>
               {!isUnlocked && (
                  <div className="flex items-center gap-2 text-[9px] font-mono text-red-500 uppercase tracking-widest animate-pulse">
                     <EyeOff size={10} /> Needs Decryption
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};
