
import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Settings, 
  LogOut, 
  Plus, 
  Upload, 
  FileText, 
  ArrowUpRight, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  Cpu,
  RefreshCw,
  Globe,
  HardDrive,
  Lock,
  Zap,
  BookOpen,
  Eye,
  ShieldCheck,
  Skull
} from 'lucide-react';
import { UserProfile } from '../App';
import { Button } from './Button';
import { useSystem } from './SystemCore';
import { ROUTES, RouteType } from '../constants/routes';
import { COURSES } from '../data/lms/courses';

// Import Real Data
import { VIP_ASSETS } from '../data/armory/vip';
import { FREE_ASSETS } from '../data/armory/free';
import { LIBRARY_DB } from '../data/books';

interface AdminDashboardProps {
  onLogout: () => void;
  user?: UserProfile | null;
  onNavigate: (route: RouteType) => void;
}

// ... (Logs and Operatives Seed Data kept for simulation atmosphere) ...
const systemLogsSeed = [
  { id: 1, time: "14:02:22", type: "INFO", msg: "Payment gateway handshake established (TOSS)." },
  { id: 2, time: "14:02:25", type: "SUCCESS", msg: "Transaction ORD-7721 verified." },
  { id: 3, time: "14:05:10", type: "WARN", msg: "Multiple login attempts from IP 192.168.0.1 (OP-002)." },
  { id: 4, time: "14:10:00", type: "INFO", msg: "System backup routine initiated." },
  { id: 5, time: "14:15:30", type: "CRITICAL", msg: "Attempted SQL injection blocked on /login." },
];

const operativesSeed = [
  { id: 'OP-001', codename: 'Ghost_Walker', email: 'ghost@escd.io', tier: 'Tier-01', ltv: '₩1,450,000', risk: 5, status: 'Active', lastActive: 'Now' },
  { id: 'OP-002', codename: 'Red_Baron', email: 'baron@naver.com', tier: 'Tier-02', ltv: '₩290,000', risk: 85, status: 'Flagged', lastActive: '2m ago' },
  { id: 'OP-005', codename: 'VIP_Gold', email: 'gold@escd.io', tier: 'Architect', ltv: '₩5,200,000', risk: 0, status: 'Active', lastActive: 'Now' },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, user, onNavigate }) => {
  const { toast, sounds } = useSystem();
  const [activeTab, setActiveTab] = useState('products');
  
  // Real Data Integration
  const [vipAssets, setVipAssets] = useState(VIP_ASSETS);
  const [freeAssets, setFreeAssets] = useState(FREE_ASSETS);
  const [books, setBooks] = useState(LIBRARY_DB);

  // System State
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));
  const [systemLogs, setSystemLogs] = useState(systemLogsSeed);
  const [isUpdating, setIsUpdating] = useState(false);

  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate incoming logs
    const logTimer = setInterval(() => {
      if (Math.random() > 0.7) {
        const newLog = {
          id: Date.now(),
          time: new Date().toLocaleTimeString('en-US', { hour12: false }),
          type: Math.random() > 0.9 ? "WARN" : "INFO",
          msg: `Background process ${Math.floor(Math.random() * 999)} sync complete.`
        };
        setSystemLogs(prev => [...prev.slice(-19), newLog]);
      }
    }, 3000);
    return () => clearInterval(logTimer);
  }, []);

  useEffect(() => {
    if (activeTab === 'mainframe' && logsEndRef.current) {
        logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [systemLogs, activeTab]);

  const handleRefreshData = () => {
      setIsUpdating(true);
      sounds.play('access');
      setTimeout(() => {
          setIsUpdating(false);
          sounds.play('success');
          toast.success("Database synchronized with Mainframe.", "SYNC COMPLETE");
      }, 1500);
  }

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden font-sans selection:bg-emerald-500/30">
      
      {/* 1. Sidebar (Compact Cockpit) */}
      <aside className="w-16 md:w-20 flex-shrink-0 bg-black border-r border-white/5 flex flex-col items-center py-8 z-30">
        <div className="mb-12 p-2 bg-luxury-gradient rounded-sm transform rotate-45 scale-75 shadow-[0_0_15px_rgba(191,149,63,0.3)]">
           <TrendingUp size={20} className="text-black -rotate-45" />
        </div>
        
        <nav className="flex flex-col gap-8 flex-grow">
          <AdminSidebarIcon icon={<BarChart3 size={20} />} active={activeTab === 'overwatch'} onClick={() => setActiveTab('overwatch')} label="종합 현황" />
          <AdminSidebarIcon icon={<Package size={20} />} active={activeTab === 'products'} onClick={() => setActiveTab('products')} label="자산 관리" />
          <AdminSidebarIcon icon={<BookOpen size={20} />} active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} label="강의 관리" />
          <AdminSidebarIcon icon={<Users size={20} />} active={activeTab === 'operatives'} onClick={() => setActiveTab('operatives')} label="요원 명부" />
          <AdminSidebarIcon icon={<Cpu size={20} />} active={activeTab === 'mainframe'} onClick={() => setActiveTab('mainframe')} label="메인프레임" />
          
          <div className="w-8 h-[1px] bg-white/10 my-2" />
          
          {/* VIEW LIVE SITE BUTTON */}
          <AdminSidebarIcon 
            icon={<Globe size={20} />} 
            active={false} 
            onClick={() => onNavigate(ROUTES.HOME)} 
            label="실서버 보기" 
          />
        </nav>

        <button onClick={onLogout} className="p-4 text-white/10 hover:text-red-500 transition-colors" title="Disconnect Session">
          <LogOut size={20} />
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden relative">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none z-0" />
        
        {/* 2. Top Header Bar (Terminal Header) */}
        <header className="h-14 border-b border-white/5 bg-black/60 backdrop-blur-md flex items-center justify-between px-8 z-20">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-[0.6em] text-white/30 uppercase">System.Terminal</span>
              <div className="text-white/20">/</div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-500">{activeTab}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
             <div className="text-right">
                <span className="block text-[9px] font-mono text-white/30 tracking-widest leading-none">SERVER_TIME</span>
                <span className="text-[11px] font-mono text-white/60 tracking-tighter">{currentTime}</span>
             </div>
             <div className="h-4 w-[1px] bg-white/10" />
             <div className="flex items-center gap-4 group cursor-pointer">
                <div className="text-right">
                  <span className="block text-[9px] font-mono text-white/30 tracking-widest leading-none">OVERLORD_LEVEL</span>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase">{user?.clearance || 'S-CLASS'}</span>
                </div>
                <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
                  <Users size={14} className="text-white/40" />
                </div>
             </div>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto no-scrollbar p-8 space-y-8 relative z-10">
          
          {/* OVERWATCH TAB */}
          {activeTab === 'overwatch' && (
            <div className="animate-fade-in space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard label="Total Asset Value" value="₩ 14.5B" change="+2.4%" positive={true} icon={<Lock size={14} />} />
                <MetricCard label="Active Agents" value="1,452" change="+8.2%" positive={true} icon={<Users size={14} />} />
                <MetricCard label="System Load" value="12 %" change="-0.4%" positive={true} icon={<Cpu size={14} />} />
                <MetricCard label="Security Status" value="SECURE" change="100%" positive={true} icon={<ShieldCheck size={14} />} />
              </div>
            </div>
          )}

          {/* ASSETS TAB (VIP + FREE) */}
          {activeTab === 'products' && (
            <div className="space-y-12 animate-fade-in">
               
               {/* VIP Section */}
               <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                     <h3 className="text-xl font-serif font-black text-gold tracking-tight uppercase flex items-center gap-3">
                        <Lock size={20} /> VIP Armory Assets
                     </h3>
                     <span className="text-[10px] font-mono text-white/40 tracking-widest">{vipAssets.length} ITEMS DEPLOYED</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {vipAssets.map(asset => (
                        <div key={asset.id} className="bg-[#0a0a0a] border border-white/10 p-6 rounded-sm relative overflow-hidden group hover:border-gold/30 transition-all">
                           <div className="flex justify-between items-start mb-4">
                              <div className="p-2 bg-gold/10 text-gold rounded-sm border border-gold/20">{asset.icon}</div>
                              <span className="text-[8px] border border-white/10 px-2 py-1 rounded text-white/30 uppercase tracking-widest">{asset.type}</span>
                           </div>
                           <h4 className="font-bold text-white mb-1 truncate">{asset.title}</h4>
                           <p className="text-xs text-white/40 font-mono mb-4">{asset.code}</p>
                           <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-white/30 font-mono">
                              <span>Tier {asset.tier}</span>
                              <span className="text-emerald-500">Active</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Free Section */}
               <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                     <h3 className="text-xl font-serif font-black text-cyan-400 tracking-tight uppercase flex items-center gap-3">
                        <Zap size={20} /> Standard Assets
                     </h3>
                     <span className="text-[10px] font-mono text-white/40 tracking-widest">{freeAssets.length} ITEMS DEPLOYED</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     {freeAssets.map(asset => (
                        <div key={asset.id} className="bg-[#0a0a0a] border border-white/10 p-5 rounded-sm relative overflow-hidden group hover:border-cyan-500/30 transition-all">
                           <div className="flex items-center gap-3 mb-3">
                              <div className="text-cyan-500">{asset.icon}</div>
                              <span className="text-[9px] font-mono text-white/30 uppercase">{asset.category}</span>
                           </div>
                           <h4 className="font-bold text-white text-sm mb-2 line-clamp-1">{asset.title}</h4>
                           <div className="flex justify-between text-[9px] text-white/30 font-mono">
                              <span>{asset.volume}</span>
                              <span className="flex items-center gap-1"><Eye size={8} /> {asset.views}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          )}

          {/* COURSES TAB */}
          {activeTab === 'courses' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center border-b border-white/5 pb-6">
                <div>
                  <h2 className="text-lg font-serif font-black text-white">강의 관리</h2>
                  <p className="text-xs text-white/30 font-mono mt-1">LMS 강의 · 챕터 · 레슨 관리</p>
                </div>
                <Button variant="outline" size="sm" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 text-xs tracking-widest">
                  + 강의 추가
                </Button>
              </div>

              {COURSES.map((course) => {
                const totalLessons = course.chapters.reduce((a, ch) => a + ch.lessons.length, 0);
                const lockedLessons = course.chapters.reduce((a, ch) => a + ch.lessons.filter((l) => l.locked).length, 0);
                return (
                  <div key={course.id} className="bg-white/[0.02] border border-white/5 rounded-sm overflow-hidden">
                    {/* Course Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                      <div>
                        <p className="font-serif font-black text-white">{course.title}</p>
                        <p className="text-xs text-white/30 mt-0.5">{course.subtitle.split('—')[0].trim()}</p>
                      </div>
                      <div className="flex items-center gap-6 text-xs font-mono">
                        <div className="text-center">
                          <p className="text-white/20 mb-0.5">레슨</p>
                          <p className="text-white font-bold">{totalLessons}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white/20 mb-0.5">잠금</p>
                          <p className="text-[#FBBF24] font-bold">{lockedLessons}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white/20 mb-0.5">챕터</p>
                          <p className="text-white font-bold">{course.chapters.length}</p>
                        </div>
                        <span className="px-2 py-1 text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-sm tracking-widest uppercase">Active</span>
                      </div>
                    </div>

                    {/* Chapter / Lesson list */}
                    <div className="divide-y divide-white/[0.03]">
                      {course.chapters.map((ch) => (
                        <div key={ch.id}>
                          <div className="flex items-center gap-4 px-6 py-3 bg-black/20">
                            <span className="text-[10px] font-mono text-white/20 w-8">Ch.{String(ch.number).padStart(2, '0')}</span>
                            <span className="text-xs font-semibold text-white/60">{ch.title.replace(/^Chapter \d+\. /, '')}</span>
                            <span className="ml-auto text-[10px] text-white/20 font-mono">{ch.lessons.length}개 레슨</span>
                          </div>
                          {ch.lessons.map((l) => (
                            <div key={l.id} className="flex items-center gap-4 px-6 py-2.5 hover:bg-white/[0.01] transition-colors group">
                              <span className="w-8 shrink-0" />
                              <span className={`text-[10px] font-mono uppercase tracking-widest shrink-0 ${l.locked ? 'text-[#FBBF24]/50' : 'text-emerald-400/50'}`}>
                                {l.locked ? 'LOCKED' : 'OPEN'}
                              </span>
                              <span className="text-xs text-white/50 flex-1 truncate">{l.title}</span>
                              <span className="text-[10px] text-white/20 font-mono shrink-0">{l.type} · {l.duration}</span>
                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="text-[10px] font-mono text-cyan-400/60 hover:text-cyan-400 transition-colors tracking-widest uppercase">편집</button>
                                <button className="text-[10px] font-mono text-[#FBBF24]/60 hover:text-[#FBBF24] transition-colors tracking-widest uppercase">
                                  {l.locked ? '잠금 해제' : '잠금'}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* LIBRARY TAB */}
          {activeTab === 'library' && (
             <div className="space-y-8 animate-fade-in">
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                   <h2 className="text-3xl font-serif font-black tracking-tight uppercase text-white">Master Library</h2>
                   <Button onClick={handleRefreshData} className="text-xs px-6 py-3 bg-white/5 border-none hover:bg-white/10">
                      {isUpdating ? <RefreshCw className="animate-spin" size={14}/> : 'SYNC DATABASE'}
                   </Button>
                </div>
                <div className="grid gap-4">
                   {books.map((book) => (
                      <div key={book.id} className="flex items-center p-4 bg-[#080808] border border-white/10 rounded-sm hover:border-white/20 transition-all group">
                         <div className="w-12 h-16 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mr-6" style={{ borderColor: book.baseColor }}>
                            <BookOpen size={20} style={{ color: book.baseColor }} />
                         </div>
                         <div className="flex-grow">
                            <h4 className="font-bold text-white text-lg tracking-tight mb-1">{book.title}</h4>
                            <p className="text-xs text-gray-500 font-mono">{book.subtitle} // {book.stats.type}</p>
                         </div>
                         <div className="text-right px-6 border-l border-white/5">
                            <span className="block text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Power Level</span>
                            <span className="text-xl font-black" style={{ color: book.baseColor }}>{book.stats.power}</span>
                         </div>
                         <div className="text-right pl-6">
                            <span className={`px-2 py-1 rounded-[1px] text-[8px] font-black uppercase border ${book.stats.risk === 'HIGH' || book.stats.risk === 'CRITICAL' ? 'border-red-500 text-red-500 bg-red-500/10' : 'border-emerald-500 text-emerald-500 bg-emerald-500/10'}`}>
                               {book.stats.risk} RISK
                            </span>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          )}

          {/* OPERATIVES TAB (Keep visual seed data) */}
          {activeTab === 'operatives' && (
            <div className="animate-fade-in space-y-8">
               <div className="flex justify-between items-end border-b border-white/5 pb-6">
                   <div>
                     <h2 className="text-3xl font-serif font-black tracking-tight uppercase">The Panopticon</h2>
                     <p className="text-[10px] font-mono text-white/30 tracking-widest uppercase mt-1">Network Surveillance & Operative Control</p>
                   </div>
               </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {operativesSeed.map(op => (
                     <div key={op.id} className={`bg-[#050505] border rounded-sm p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 ${op.status === 'Purged' ? 'border-red-900/30 opacity-50' : op.risk > 50 ? 'border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 'border-white/10 hover:border-emerald-500/30'}`}>
                        {op.risk > 50 && op.status !== 'Purged' && <div className="absolute inset-0 bg-amber-500/5 animate-pulse pointer-events-none" />}
                        <div className="flex justify-between items-start mb-6 relative z-10">
                           <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-sm border flex items-center justify-center font-bold text-lg font-serif ${op.status === 'Purged' ? 'border-red-500/50 text-red-500 bg-red-900/20' : 'border-white/20 text-white bg-white/5'}`}>
                                 {op.status === 'Purged' ? <Skull size={18} /> : op.codename[0]}
                              </div>
                              <div className="space-y-0.5">
                                 <h4 className={`font-bold tracking-tight ${op.status === 'Purged' ? 'text-red-500 line-through' : 'text-white'}`}>{op.codename}</h4>
                                 <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block">{op.id}</span>
                              </div>
                           </div>
                           <div className={`px-2 py-1 rounded-[1px] border text-[8px] font-mono uppercase tracking-widest font-bold ${op.tier === 'Architect' ? 'border-gold/50 text-gold bg-gold/10' : op.tier === 'Banned' ? 'border-red-500/50 text-red-500 bg-red-500/10' : 'border-white/10 text-white/40 bg-white/5'}`}>
                              {op.tier}
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
            </div>
          )}

          {/* MAINFRAME TAB */}
          {activeTab === 'mainframe' && (
             <div className="animate-fade-in space-y-12 pb-20">
                <div className="text-center py-20 border border-dashed border-white/10 rounded-sm">
                   <Cpu className="mx-auto text-white/20 mb-4" size={48} />
                   <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Mainframe Core Active</p>
                   <p className="text-emerald-500 font-mono text-xs mt-2">All Data Streams Synchronized</p>
                </div>
             </div>
          )}

        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-spin-slow { animation: spin 3s linear infinite; }
      `}</style>
    </div>
  );
};

/* Sub-components for Admin Terminal */

const AdminSidebarIcon: React.FC<{ icon: React.ReactNode, active: boolean, onClick: () => void, label: string }> = ({ icon, active, onClick, label }) => (
  <button 
    onClick={onClick}
    className={`w-12 h-14 flex flex-col items-center justify-center transition-all duration-300 relative group
      ${active ? 'text-emerald-400' : 'text-white/20 hover:text-white/60'}
    `}
  >
    <div className={`p-2.5 rounded-sm transition-all ${active ? 'bg-emerald-500/10' : 'group-hover:bg-white/5'}`}>
       {icon}
    </div>
    <span className="text-[7px] font-mono tracking-widest uppercase mt-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{label}</span>
    {active && (
      <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-[1.5px] h-8 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
    )}
  </button>
);

const MetricCard: React.FC<{ label: string, value: string, change: string, positive: boolean, icon: React.ReactNode }> = ({ label, value, change, positive, icon }) => (
  <div className="bg-[#050505] border border-white/10 p-7 space-y-4 hover:border-white/20 transition-all group relative overflow-hidden">
     <div className="absolute top-0 left-0 w-1 h-full bg-white/5 group-hover:bg-emerald-500/20 transition-colors" />
     <div className="flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
           <div className="text-white/20 group-hover:text-white/40 transition-colors">{icon}</div>
           <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/30">{label}</span>
        </div>
        <div className={`flex items-center gap-1.5 text-[10px] font-mono font-bold ${positive ? 'text-emerald-500' : 'text-red-500'}`}>
           <span className="opacity-50">{positive ? '▲' : '▼'}</span>
           {change}
        </div>
     </div>
     <p className={`font-mono text-2xl font-bold tracking-tighter transition-all ${positive && label.includes('Revenue') ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'text-white/90'}`}>
       {value}
     </p>
  </div>
);
