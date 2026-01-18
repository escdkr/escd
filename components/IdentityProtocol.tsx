import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Shield, 
  User, 
  Key, 
  Fingerprint, 
  AlertTriangle, 
  RefreshCw, 
  LogOut,
  Save,
  Scan,
  CheckCircle2,
  Trash2,
  Lock
} from 'lucide-react';
import { UserProfile } from '../App';
import { Button } from './Button';

interface IdentityProtocolProps {
  onBack: () => void;
  onLogout: () => void;
  user: UserProfile | null;
}

export const IdentityProtocol: React.FC<IdentityProtocolProps> = ({ onBack, onLogout, user }) => {
  const [activeTab, setActiveTab] = useState<'alias' | 'security' | 'erasure'>('alias');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [codename, setCodename] = useState(user?.name || 'Agent-077');
  const [isGhostMode, setIsGhostMode] = useState(false);

  const handleSaveIdentity = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("IDENTITY RE-ENCRYPTED. NEW ALIAS ACTIVE.");
    }, 2000);
  };

  const handleExitMatrix = () => {
    if (confirm("WARNING: Are you sure you want to exit the simulation? This action cannot be undone.")) {
      setIsDeleting(true);
      setTimeout(() => {
        onLogout();
      }, 3000);
    }
  };

  if (isDeleting) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden font-mono z-50">
         <div className="absolute inset-0 bg-red-900/10 animate-pulse" />
         <AlertTriangle size={64} className="text-red-500 mb-8 animate-bounce" />
         <h2 className="text-3xl text-red-500 font-bold tracking-[0.2em] uppercase mb-4">PURGING DATABASE...</h2>
         <p className="text-white/40 tracking-widest">ERASING TRACES: 92%</p>
         <div className="w-64 h-1 bg-red-900/30 mt-8 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 animate-loading-bar-turbo" />
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-red-500/30 relative">
      <div className="absolute inset-0 grid-pattern opacity-5 pointer-events-none" />
      
      {/* Header */}
      <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md relative z-20">
         <div className="flex items-center gap-4">
            <Shield size={24} className="text-red-500" />
            <div>
               <h1 className="text-lg font-serif font-black tracking-tight uppercase text-white">Identity Protocol</h1>
               <p className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">Classified Settings // Level 5</p>
            </div>
         </div>
         <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-mono text-white/40 hover:text-white uppercase tracking-widest border border-white/10 px-4 py-2 rounded-sm transition-all hover:border-white/30">
            <ArrowLeft size={12} /> Return to Dashboard
         </button>
      </header>

      <main className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full p-8 md:p-16 gap-16 relative z-10">
         
         {/* Left: Navigation Panel */}
         <aside className="w-full md:w-64 flex-shrink-0 space-y-12">
            <div className="p-6 border border-white/5 bg-white/[0.02] rounded-sm relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
                     <User size={32} className="text-white/40" />
                     <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#020617]" />
                  </div>
                  <div>
                     <h3 className="font-serif font-bold text-lg">{codename}</h3>
                     <p className="text-[10px] font-mono text-white/30 tracking-widest uppercase mt-1">Clearance: {user?.clearance}</p>
                  </div>
               </div>
            </div>

            <nav className="flex flex-col gap-2">
               <MenuButton 
                  label="Alias Management" 
                  icon={<Scan size={16} />} 
                  active={activeTab === 'alias'} 
                  onClick={() => setActiveTab('alias')} 
               />
               <MenuButton 
                  label="Security Clearance" 
                  icon={<Key size={16} />} 
                  active={activeTab === 'security'} 
                  onClick={() => setActiveTab('security')} 
               />
               <MenuButton 
                  label="Exit Matrix" 
                  icon={<LogOut size={16} />} 
                  active={activeTab === 'erasure'} 
                  onClick={() => setActiveTab('erasure')} 
                  danger 
               />
            </nav>
         </aside>

         {/* Right: Interface Panel */}
         <div className="flex-grow max-w-3xl">
            {activeTab === 'alias' && (
               <div className="space-y-10 animate-fade-in">
                  <div className="border-b border-white/5 pb-6">
                     <h2 className="text-3xl font-serif font-black uppercase tracking-tight">Active Identity</h2>
                     <p className="text-white/40 font-serif italic mt-2">"이름은 중요하지 않습니다. 중요한 건 당신이 남기는 흔적입니다."</p>
                  </div>
                  
                  <div className="space-y-8">
                     <div className="space-y-4">
                        <label className="text-[10px] font-mono tracking-widest uppercase text-white/30 font-bold">Operative Codename</label>
                        <div className="relative group">
                           <input 
                              type="text" 
                              value={codename} 
                              onChange={(e) => setCodename(e.target.value)}
                              className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-mono text-white focus:outline-none focus:border-red-500/50 transition-colors placeholder:text-white/10"
                           />
                           <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                              <RefreshCw size={16} className="text-red-500 animate-spin-slow" />
                           </div>
                        </div>
                        <p className="text-[10px] text-white/20">* Changing codename requires 24h propagation across the syndicate network.</p>
                     </div>

                     <div className="space-y-4">
                        <label className="text-[10px] font-mono tracking-widest uppercase text-white/30 font-bold">Contact Frequency</label>
                        <div className="flex items-center gap-4 opacity-50 cursor-not-allowed">
                           <input 
                              type="text" 
                              value="encrypted_relay@escd.io" 
                              disabled
                              className="w-full bg-white/[0.02] border border-white/5 py-4 px-6 text-sm font-mono text-white/40 focus:outline-none"
                           />
                           <Lock size={16} className="text-white/20" />
                        </div>
                     </div>
                  </div>

                  <div className="pt-8 flex justify-end">
                     <Button 
                        onClick={handleSaveIdentity}
                        className={`bg-white text-black font-mono text-xs font-bold uppercase tracking-widest px-8 py-4 border-none hover:bg-gray-200 transition-all flex items-center gap-2 ${isSaving ? 'opacity-50 pointer-events-none' : ''}`}
                     >
                        {isSaving ? <RefreshCw className="animate-spin" size={14} /> : <Save size={14} />}
                        {isSaving ? 'Encrypting...' : 'Overwrite Identity'}
                     </Button>
                  </div>
               </div>
            )}

            {activeTab === 'security' && (
               <div className="space-y-10 animate-fade-in">
                  <div className="border-b border-white/5 pb-6">
                     <h2 className="text-3xl font-serif font-black uppercase tracking-tight">Security Protocol</h2>
                     <p className="text-white/40 font-serif italic mt-2">"유령은 발자국을 남기지 않습니다."</p>
                  </div>

                  <div className="space-y-8">
                     <div className="p-6 border border-white/10 bg-white/[0.02] rounded-sm flex items-center justify-between group hover:border-emerald-500/30 transition-colors">
                        <div className="space-y-2">
                           <div className="flex items-center gap-3">
                              <Fingerprint size={20} className={isGhostMode ? "text-emerald-500" : "text-white/20"} />
                              <h3 className="font-bold text-white tracking-wide">Ghost Mode (2FA)</h3>
                           </div>
                           <p className="text-xs text-white/40 font-serif">Biometric or hardware key required for login.</p>
                        </div>
                        <button 
                           onClick={() => setIsGhostMode(!isGhostMode)}
                           className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 relative ${isGhostMode ? 'bg-emerald-500/20' : 'bg-white/10'}`}
                        >
                           <div className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-300 ${isGhostMode ? 'translate-x-6 bg-emerald-500' : 'translate-x-0 opacity-50'}`} />
                        </button>
                     </div>

                     <div className="space-y-4">
                        <label className="text-[10px] font-mono tracking-widest uppercase text-white/30 font-bold">Update Access Key</label>
                        <div className="grid grid-cols-1 gap-4">
                           <input 
                              type="password" 
                              placeholder="Current Key" 
                              className="w-full bg-transparent border-b border-white/10 py-3 font-mono text-white focus:outline-none focus:border-white/40 placeholder:text-white/10 text-sm"
                           />
                           <input 
                              type="password" 
                              placeholder="New Strong Key" 
                              className="w-full bg-transparent border-b border-white/10 py-3 font-mono text-white focus:outline-none focus:border-white/40 placeholder:text-white/10 text-sm"
                           />
                        </div>
                     </div>
                  </div>

                  <div className="pt-8 flex justify-end">
                     <Button className="bg-transparent border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-widest px-8 py-4 hover:bg-white/5 transition-all">
                        Rotate Keys
                     </Button>
                  </div>
               </div>
            )}

            {activeTab === 'erasure' && (
               <div className="space-y-10 animate-fade-in">
                  <div className="border-b border-red-500/20 pb-6">
                     <h2 className="text-3xl font-serif font-black uppercase tracking-tight text-red-500">Exit Matrix</h2>
                     <p className="text-red-500/50 font-serif italic mt-2">"현실로 돌아가는 문입니다. 이 결정은 되돌릴 수 없습니다."</p>
                  </div>

                  <div className="p-8 bg-red-500/[0.03] border border-red-500/10 rounded-sm space-y-6">
                     <div className="flex items-start gap-4">
                        <AlertTriangle size={24} className="text-red-500 shrink-0" />
                        <div className="space-y-2">
                           <h3 className="font-bold text-white">Warning: Complete Erasure</h3>
                           <p className="text-sm text-white/50 leading-relaxed">
                              탈출 프로토콜이 시작되면 귀하의 모든 자산(The Glitch PDF, 커뮤니티 권한, 수익 데이터)이 즉시 소각됩니다.
                              Syndicate 네트워크에서 영구적으로 차단됩니다.
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="pt-12 flex justify-center">
                     <button 
                        onClick={handleExitMatrix}
                        className="group relative px-12 py-6 overflow-hidden bg-transparent border border-red-500/30 text-red-500 font-mono font-bold tracking-[0.2em] uppercase transition-all hover:bg-red-500 hover:text-black hover:border-red-500 hover:shadow-[0_0_40px_rgba(239,68,68,0.4)]"
                     >
                        <span className="relative z-10 flex items-center gap-3">
                           <Trash2 size={16} /> Initiate Exit Protocol
                        </span>
                     </button>
                  </div>
               </div>
            )}
         </div>

      </main>

      <style>{`
         .animate-loading-bar-turbo { animation: loading-bar-turbo 1.5s ease-in-out infinite; }
         @keyframes loading-bar-turbo { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  );
};

const MenuButton: React.FC<{ label: string, icon: React.ReactNode, active: boolean, onClick: () => void, danger?: boolean }> = ({ label, icon, active, onClick, danger }) => (
   <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-300 border-l-2 text-left group ${
         active 
            ? danger ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-white bg-white/5 text-white' 
            : 'border-transparent text-white/40 hover:text-white hover:bg-white/[0.02]'
      }`}
   >
      <span className={active ? 'opacity-100' : 'opacity-50 group-hover:opacity-100 transition-opacity'}>{icon}</span>
      <span className={`text-xs font-mono tracking-widest uppercase ${danger && !active ? 'group-hover:text-red-400' : ''}`}>{label}</span>
   </button>
);