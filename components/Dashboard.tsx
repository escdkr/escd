
import React, { useState, useEffect } from 'react';
import { 
  Home, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut, 
  Download, 
  Lock, 
  PlayCircle, 
  CheckCircle2,
  Terminal,
  Cpu,
  ShieldAlert,
  Activity,
  Calculator
} from 'lucide-react';
import { MasterNeonDagger } from './LoginPage';
import { UserProfile } from '../App';
import { ROUTES, RouteType } from '../constants/routes';
import { useSystem } from './SystemCore'; // Import System Hook

interface DashboardProps {
  onLogout: () => void;
  user?: UserProfile | null;
  onNavigate: (route: RouteType) => void;
}

const curriculum = [
  { id: 1, title: "01. The Matrix Revealed", type: "video", status: "completed", duration: "15:20" },
  { id: 2, title: "02. Decrypting Human Desires", type: "video", status: "completed", duration: "24:45" },
  { id: 3, title: "03. The Architecture of Invisible Wealth", type: "pdf", status: "active", duration: "142 Pages" },
  { id: 4, title: "04. Psychological Traps & Triggers", type: "video", status: "locked", duration: "32:10" },
  { id: 5, title: "05. Hacking the Market System", type: "video", status: "locked", duration: "19:55" },
  { id: 6, title: "06. Silent Authority Protocol", type: "video", status: "locked", duration: "45:00" },
  { id: 7, title: "07. The Final Glitch", type: "pdf", status: "locked", duration: "Locked" },
];

const missionLogsSeed = [
  { id: 1, time: "02:14:05", action: "ACCESS_GRANTED", detail: "Encryption key matched." },
  { id: 2, time: "02:14:10", action: "SYST_INIT", detail: "Command center linked." },
  { id: 3, time: "02:14:22", action: "FILE_DECRYPT", detail: "Chapter 03 assets verified." },
  { id: 4, time: "02:14:45", action: "ENV_LOADED", detail: "Stealth protocol active." },
];

export const Dashboard: React.FC<DashboardProps> = ({ onLogout, user, onNavigate }) => {
  const [activeChapter, setActiveChapter] = useState(curriculum[2]);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [logs, setLogs] = useState(missionLogsSeed);
  const { toast, sounds } = useSystem(); // Use System Hook

  // Simulation: Add a new log every few seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
        action: "PING_RESPONSE",
        detail: `Node ${Math.floor(Math.random() * 100)} responding.`
      };
      setLogs(prev => [newLog, ...prev].slice(0, 5));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleDownload = () => {
    sounds.click();
    setIsDecrypting(true);
    setTimeout(() => {
      setIsDecrypting(false);
      toast.success("Encypted PDF Asset Downloaded. Clearance Granted.", "DOWNLOAD COMPLETE");
    }, 2500);
  };

  const handleChapterSelect = (chapter: any) => {
    if (chapter.status === 'locked') {
        sounds.error();
        toast.error("You do not have clearance to access this module yet.", "ACCESS DENIED");
    } else {
        sounds.click();
        setActiveChapter(chapter);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex overflow-hidden font-sans selection:bg-cyan-500/30">
      <div className="fixed inset-0 grid-pattern opacity-10 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.05)_0%,_transparent_50%)] pointer-events-none z-0" />

      {/* Desktop Sidebar (Hidden on Mobile) */}
      <aside className="hidden md:flex w-20 flex-shrink-0 bg-black/40 border-r border-white/5 flex-col items-center py-10 z-20 backdrop-blur-xl">
        <div className="mb-12 cursor-pointer" onClick={() => { sounds.hover(); onNavigate(ROUTES.HOME); }}>
          <MasterNeonDagger className="w-10 h-10 -rotate-45" glow={false} />
        </div>
        <nav className="flex flex-col gap-10 flex-grow">
          <SidebarIcon icon={<Home size={22} />} active={false} onClick={() => onNavigate(ROUTES.HOME)} tooltip="HQ" />
          <SidebarIcon icon={<BookOpen size={22} />} active={true} onClick={() => {}} tooltip="Classroom" />
          <SidebarIcon icon={<Users size={22} />} active={false} onClick={() => onNavigate(ROUTES.SYNDICATE)} tooltip="The Syndicate" />
          <SidebarIcon icon={<Calculator size={22} />} active={false} onClick={() => onNavigate(ROUTES.ORACLE)} tooltip="The Oracle" />
          <SidebarIcon icon={<Settings size={22} />} active={false} onClick={() => onNavigate(ROUTES.SETTINGS)} tooltip="Identity Protocol" />
        </nav>
        <button onClick={() => { sounds.click(); onLogout(); }} className="p-4 text-white/20 hover:text-red-500 transition-colors"><LogOut size={22} /></button>
      </aside>

      {/* Main & Right */}
      <div className="flex-grow flex flex-col md:flex-row h-screen pb-20 md:pb-0">
        <main className="flex-grow p-6 md:p-10 flex flex-col gap-6 overflow-y-auto no-scrollbar relative z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22D3EE]" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-cyan-400/80">Command Center Online</span>
                <span className="text-[9px] text-white/40 uppercase font-mono tracking-widest">Active Operative: {user?.name || 'AGENT-077'}</span>
              </div>
            </div>
            <div className="text-[10px] font-mono text-white/20 tracking-widest uppercase bg-white/5 px-4 py-1.5 border border-white/5 rounded-full backdrop-blur-md">
              Clearance: <span className="text-cyan-400 font-bold">{user?.clearance || 'Tier-01 Elite'}</span>
            </div>
          </div>

          <div className="flex-grow flex flex-col">
            <h1 className="font-serif text-3xl md:text-4xl font-black tracking-tight mb-8">{activeChapter.title}</h1>
            <div className="flex-grow bg-[#050505] rounded-sm border border-white/5 shadow-2xl overflow-hidden relative group min-h-[400px]">
               {activeChapter.type === 'pdf' ? (
                 <div className="h-full w-full flex flex-col items-center justify-center p-10 relative overflow-hidden">
                    {isDecrypting ? (
                      <div className="relative flex flex-col items-center gap-8 animate-fade-in">
                        <MasterNeonDagger className="w-32 h-32 animate-spin-slow" />
                        <p className="font-mono text-cyan-400 text-xs tracking-[0.5em] uppercase">Decrypting Assets...</p>
                        <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden"><div className="absolute top-0 left-0 h-full bg-cyan-400 animate-loading-bar" /></div>
                      </div>
                    ) : (
                      <div className="relative flex flex-col items-center gap-10 text-center">
                        <MasterNeonDagger className="w-48 h-48 drop-shadow-[0_0_30px_rgba(34,211,238,0.2)]" />
                        <h3 className="font-serif text-2xl italic text-white/80">"The code to your liberation is ready."</h3>
                        <button onClick={handleDownload} className="group relative flex items-center justify-center px-12 py-5 rounded-sm border border-cyan-500/30 text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs hover:bg-cyan-500/10 transition-colors">
                             <Download size={18} className="mr-4 group-hover:translate-y-1" /> Download Master Asset
                        </button>
                      </div>
                    )}
                 </div>
               ) : (
                 <div className="h-full w-full relative group/player cursor-pointer" onClick={() => { sounds.click(); toast.info("Streaming Module Loaded.", "VIDEO BUFFER"); }}>
                    <div className="absolute inset-0 bg-black flex items-center justify-center">
                       <PlayCircle size={80} className="text-violet-500/20 group-hover/player:text-violet-500/40 transition-all" />
                    </div>
                 </div>
               )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
               <StatBox icon={<Terminal size={14} />} label="Protocol" value="Silent Mode" color="cyan" />
               <StatBox icon={<Cpu size={14} />} label="Sync Rate" value="12.5%" color="violet" />
               <StatBox icon={<Activity size={14} />} label="Mission Log" value="Active Stream" color="white" />
               <StatBox icon={<ShieldAlert size={14} />} label="Defense" value="Maximum" color="cyan" />
            </div>

            {/* LIVE SEED LOGS (Mission Control Activity) */}
            <div className="mt-8 p-6 bg-black/40 border border-white/5 rounded-sm">
               <div className="flex items-center gap-3 mb-4">
                  <Terminal size={14} className="text-cyan-400" />
                  <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-cyan-400">Live Mission Logs</span>
               </div>
               <div className="space-y-2 font-mono text-[10px]">
                  {logs.map((log) => (
                    <div key={log.id} className="flex gap-4 animate-fade-in">
                       <span className="text-white/20">[{log.time}]</span>
                       <span className="text-violet-400 font-bold tracking-widest">{log.action}</span>
                       <span className="text-white/60">:: {log.detail}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </main>

        {/* Right Panel */}
        <aside className="w-full md:w-96 flex-shrink-0 bg-black/60 border-l border-white/5 flex flex-col z-20 backdrop-blur-3xl hidden md:flex">
          <div className="p-8 space-y-6 border-b border-white/5">
            <div className="flex justify-between items-end">
               <h4 className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">System Synchronization</h4>
               <span className="text-xl font-serif font-black text-cyan-400 italic tracking-tighter">12%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
               <div className="h-full w-[12%] bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            </div>
          </div>
          <div className="flex-grow overflow-y-auto no-scrollbar py-6">
            <div className="px-8 mb-6"><span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/20">Operations Blueprint</span></div>
            <div className="space-y-1">
               {curriculum.map((chapter) => (
                 <button key={chapter.id} onClick={() => handleChapterSelect(chapter)} className={`w-full flex items-center justify-between px-8 py-5 text-left transition-all relative group ${activeChapter.id === chapter.id ? 'bg-cyan-500/5' : 'hover:bg-white/[0.02]'} ${chapter.status === 'locked' ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}>
                   {activeChapter.id === chapter.id && <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-cyan-400 shadow-[2px_0_10px_rgba(34,211,238,0.5)]" />}
                   <div className="flex items-center gap-4">
                     {chapter.status === 'completed' ? <CheckCircle2 size={16} className="text-cyan-400" /> : chapter.status === 'locked' ? <Lock size={16} className="text-white/20" /> : <div className="w-4 h-4 rounded-full border border-cyan-400/50 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" /></div>}
                     <div className="space-y-1">
                        <span className={`text-xs font-serif font-bold tracking-tight block ${activeChapter.id === chapter.id ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>{chapter.title}</span>
                        <div className="flex items-center gap-3 text-[9px] font-mono tracking-widest uppercase text-white/20">
                           <span className="flex items-center gap-1">{chapter.type === 'video' ? <PlayCircle size={10} /> : <BookOpen size={10} />}{chapter.type}</span>
                           <span>{chapter.duration}</span>
                        </div>
                     </div>
                   </div>
                 </button>
               ))}
            </div>
          </div>
        </aside>
      </div>

      {/* MOBILE TACTICAL DOCK (Bottom Nav) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#020617]/95 backdrop-blur-xl border-t border-white/10 z-50 flex items-center justify-around px-2 py-3 pb-safe safe-area-pb">
         <MobileNavItem icon={<Home size={20} />} label="HQ" active={false} onClick={() => onNavigate(ROUTES.HOME)} />
         <MobileNavItem icon={<BookOpen size={20} />} label="Class" active={true} onClick={() => {}} />
         <MobileNavItem icon={<Users size={20} />} label="Syndicate" active={false} onClick={() => onNavigate(ROUTES.SYNDICATE)} />
         <MobileNavItem icon={<Calculator size={20} />} label="Oracle" active={false} onClick={() => onNavigate(ROUTES.ORACLE)} />
         <MobileNavItem icon={<Settings size={20} />} label="ID" active={false} onClick={() => onNavigate(ROUTES.SETTINGS)} />
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes loading-bar { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-loading-bar { animation: loading-bar 2s ease-in-out infinite; }
        @keyframes spin-slow { from { transform: rotate(-45deg); } to { transform: rotate(315deg); } }
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }
        .safe-area-pb { padding-bottom: env(safe-area-inset-bottom); }
      `}</style>
    </div>
  );
};

const SidebarIcon: React.FC<{ icon: React.ReactNode, active: boolean, onClick: () => void, tooltip: string }> = ({ icon, active, onClick, tooltip }) => {
  const { sounds } = useSystem();
  return (
    <button onClick={() => { sounds.click(); onClick(); }} onMouseEnter={() => sounds.hover()} className={`p-4 transition-all duration-300 relative group flex items-center justify-center ${active ? 'text-cyan-400' : 'text-white/20 hover:text-white/60'}`}>
      {icon}
      {active && <div className="absolute inset-0 bg-cyan-400/5 blur-xl rounded-full" />}
      {active && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#22D3EE]" />}
      
      {/* Tooltip */}
      <div className="absolute left-full ml-4 px-3 py-1 bg-black border border-white/10 text-[9px] font-mono tracking-widest uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none rounded-sm">
          {tooltip}
      </div>
    </button>
  );
};

const MobileNavItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => {
   const { sounds } = useSystem();
   return (
      <button onClick={() => { sounds.click(); onClick(); }} className={`flex flex-col items-center gap-1 p-2 relative ${active ? 'text-cyan-400' : 'text-white/30'}`}>
         {active && <div className="absolute -top-3 w-8 h-1 bg-cyan-400 rounded-b-sm shadow-[0_0_10px_#22D3EE]" />}
         {icon}
         <span className="text-[9px] font-mono uppercase tracking-wider">{label}</span>
      </button>
   );
};

const StatBox: React.FC<{ icon: React.ReactNode, label: string, value: string, color: 'cyan' | 'violet' | 'white' }> = ({ icon, label, value, color }) => (
  <div className="p-4 rounded-sm border border-white/5 bg-white/[0.02] space-y-2 group hover:border-white/10 transition-colors">
     <div className="flex items-center gap-2 text-white/20">
        {icon}
        <span className="text-[9px] font-mono tracking-widest uppercase">{label}</span>
     </div>
     <p className={`font-serif font-black text-lg tracking-tight ${color === 'cyan' ? 'text-cyan-400' : color === 'violet' ? 'text-violet-400' : 'text-white/80'}`}>{value}</p>
  </div>
);
