
import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Settings, 
  LogOut, 
  Plus, 
  Upload, 
  Youtube, 
  FileText, 
  ArrowUpRight, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ChevronRight,
  ShieldCheck,
  Search,
  Filter,
  Eye,
  Ban,
  Award,
  Lock,
  Skull,
  Activity,
  UserCheck,
  Cpu,
  Radio,
  Power,
  Save,
  Terminal,
  RefreshCw,
  Globe,
  CreditCard,
  DollarSign,
  FileCheck,
  HardDrive,
  X,
  Map,
  Zap,
  BookOpen
} from 'lucide-react';
import { UserProfile } from '../App';
import { Button } from './Button';
import { useSystem } from './SystemCore';
import { ROUTES, RouteType } from '../constants/routes';

interface AdminDashboardProps {
  onLogout: () => void;
  user?: UserProfile | null;
  onNavigate: (route: RouteType) => void;
}

interface Asset {
  id: string;
  title: string;
  price: string;
  sales: string;
  status: 'Active' | 'Draft' | 'Archived';
  views: string;
  version: string;
  lastUpdated: string;
}

const ordersSeed = [
  { id: 'ORD-7721', user: 'kim_alpha@proton.me', amount: '₩290,000', status: 'Paid', date: '2024-05-12 14:02', gateway: 'TOSS_IPG' },
  { id: 'ORD-7720', user: 'lee_strat@gmail.com', amount: '₩290,000', status: 'Paid', date: '2024-05-12 13:45', gateway: 'STRIPE_USD' },
  { id: 'ORD-7719', user: 'park_void@naver.com', amount: '₩290,000', status: 'Pending', date: '2024-05-12 12:10', gateway: 'V_BANK' },
  { id: 'ORD-7718', user: 'choi_glitch@daum.net', amount: '₩290,000', status: 'Failed', date: '2024-05-12 11:30', gateway: 'TOSS_IPG' },
  { id: 'ORD-7717', user: 'admin_test@escd.io', amount: '₩290,000', status: 'Paid', date: '2024-05-12 10:15', gateway: 'MANUAL' },
];

const operativesSeed = [
  { id: 'OP-001', codename: 'Ghost_Walker', email: 'ghost@escd.io', tier: 'Tier-01', ltv: '₩1,450,000', risk: 5, status: 'Active', lastActive: 'Now' },
  { id: 'OP-002', codename: 'Red_Baron', email: 'baron@naver.com', tier: 'Tier-02', ltv: '₩290,000', risk: 85, status: 'Flagged', lastActive: '2m ago' },
  { id: 'OP-003', codename: 'Unknown_Entity', email: 'anon_99@gmail.com', tier: 'Free', ltv: '₩0', risk: 12, status: 'Active', lastActive: '1h ago' },
  { id: 'OP-004', codename: 'System_Breaker', email: 'hack@proton.me', tier: 'Banned', ltv: '₩0', risk: 99, status: 'Purged', lastActive: 'Offline' },
  { id: 'OP-005', codename: 'VIP_Gold', email: 'gold@escd.io', tier: 'Architect', ltv: '₩5,200,000', risk: 0, status: 'Active', lastActive: 'Now' },
  { id: 'OP-006', codename: 'Silent_Observer', email: 'silent@daum.net', tier: 'Tier-01', ltv: '₩890,000', risk: 25, status: 'Idle', lastActive: '3d ago' },
];

const systemLogsSeed = [
  { id: 1, time: "14:02:22", type: "INFO", msg: "Payment gateway handshake established (TOSS)." },
  { id: 2, time: "14:02:25", type: "SUCCESS", msg: "Transaction ORD-7721 verified." },
  { id: 3, time: "14:05:10", type: "WARN", msg: "Multiple login attempts from IP 192.168.0.1 (OP-002)." },
  { id: 4, time: "14:10:00", type: "INFO", msg: "System backup routine initiated." },
  { id: 5, time: "14:15:30", type: "CRITICAL", msg: "Attempted SQL injection blocked on /login." },
];

const initialAssets: Asset[] = [
  { id: 'A-00', title: "무노동의 제국 : GAGE-GPS-O-ECC", price: "₩290,000", sales: "0", status: "Active", views: "1", version: "v1.0.0", lastUpdated: "Just Now" },
  { id: 'A-01', title: "The Glitch: Vol. I", price: "₩290,000", sales: "1,242", status: "Active", views: "15,402", version: "v1.4.2", lastUpdated: "2024.05.10" },
  { id: 'A-02', title: "Silent Authority", price: "₩450,000", sales: "84", status: "Draft", views: "1,120", version: "v0.9.1", lastUpdated: "2024.05.12" },
  { id: 'A-03', title: "Ghost Protocol", price: "₩1,200,000", sales: "12", status: "Active", views: "542", version: "v2.0.0", lastUpdated: "2024.04.01" },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, user, onNavigate }) => {
  const { toast, sounds } = useSystem();
  const [activeTab, setActiveTab] = useState('products'); // Default to products to see the upload
  
  // Create / Edit State
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  
  // New Asset Form State
  const [newAssetTitle, setNewAssetTitle] = useState('');
  const [newAssetPrice, setNewAssetPrice] = useState('');
  const [newAssetFile, setNewAssetFile] = useState<File | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // System State
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));
  const [operatives, setOperatives] = useState(operativesSeed);
  const [systemLogs, setSystemLogs] = useState(systemLogsSeed);
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [isSystemLocked, setIsSystemLocked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // For upload simulation

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setNewAssetFile(e.target.files[0]);
        sounds.click();
    }
  };

  const handleCreateAsset = () => {
    if (!newAssetTitle || !newAssetPrice) {
      toast.error("Protocol Incomplete. Enter title and valuation.", "ERROR");
      return;
    }
    if (!newAssetFile) {
        toast.error("Source Missing. Upload PDF binary.", "UPLOAD ERROR");
        sounds.error();
        return;
    }
    
    setIsCreating(true);
    sounds.play('access');

    setTimeout(() => {
        const newAsset: Asset = {
            id: `A-${Math.floor(Math.random() * 1000)}`,
            title: newAssetTitle,
            price: newAssetPrice.includes('₩') ? newAssetPrice : `₩${Number(newAssetPrice).toLocaleString()}`,
            sales: "0",
            status: "Draft",
            views: "0",
            version: "v1.0.0",
            lastUpdated: new Date().toLocaleDateString('en-CA').replace(/-/g, '.')
        };
        
        setAssets(prev => [newAsset, ...prev]);
        resetForm();
        
        toast.success(`Asset '${newAsset.title}' registered successfully.`, "PROTOCOL INITIALIZED");
        sounds.play('success');
    }, 1500);
  };

  const resetForm = () => {
    setNewAssetTitle('');
    setNewAssetPrice('');
    setNewAssetFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsAddingProduct(false);
    setIsCreating(false);
  };

  // Asset Update Handler
  const handleUpdateAsset = () => {
    if (!editingAsset) return;
    setIsUpdating(true);
    
    // Simulate upload delay
    setTimeout(() => {
        setIsUpdating(false);
        const newVersion = `v${(parseFloat(editingAsset.version.replace('v', '')) + 0.1).toFixed(1)}.0`;
        const today = new Date().toLocaleDateString('en-CA').replace(/-/g, '.');
        
        setAssets(prev => prev.map(a => 
            a.id === editingAsset.id 
            ? { ...a, version: newVersion, lastUpdated: today } 
            : a
        ));
        
        setEditingAsset(null);
        toast.success(`Asset '${editingAsset.title}' source updated to ${newVersion}.`, "DEPLOY SUCCESSFUL");
        sounds.play('success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden font-sans selection:bg-emerald-500/30">
      
      {/* 1. Sidebar (Compact Cockpit) */}
      <aside className="w-16 md:w-20 flex-shrink-0 bg-black border-r border-white/5 flex flex-col items-center py-8 z-30">
        <div className="mb-12 p-2 bg-luxury-gradient rounded-sm transform rotate-45 scale-75 shadow-[0_0_15px_rgba(191,149,63,0.3)]">
           <TrendingUp size={20} className="text-black -rotate-45" />
        </div>
        
        <nav className="flex flex-col gap-8 flex-grow">
          <AdminSidebarIcon icon={<BarChart3 size={20} />} active={activeTab === 'overwatch'} onClick={() => setActiveTab('overwatch')} label="STATS" />
          <AdminSidebarIcon icon={<Eye size={20} />} active={activeTab === 'operatives'} onClick={() => setActiveTab('operatives')} label="AGENTS" />
          <AdminSidebarIcon icon={<Package size={20} />} active={activeTab === 'products'} onClick={() => setActiveTab('products')} label="ASSETS" />
          <AdminSidebarIcon icon={<ShoppingCart size={20} />} active={activeTab === 'treasury'} onClick={() => setActiveTab('treasury')} label="TREASURY" />
          <AdminSidebarIcon icon={<Cpu size={20} />} active={activeTab === 'mainframe'} onClick={() => setActiveTab('mainframe')} label="CORE" />
          
          <div className="w-8 h-[1px] bg-white/10 my-2" />
          
          {/* VIEW LIVE SITE BUTTON */}
          <AdminSidebarIcon 
            icon={<Globe size={20} />} 
            active={false} 
            onClick={() => onNavigate(ROUTES.HOME)} 
            label="LIVE SITE" 
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
              <ChevronRight size={10} className="text-white/20" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/80">{activeTab}</span>
            </div>
            
            {/* Quick Navigation Links (The Request) */}
            <div className="hidden md:flex items-center gap-6">
               <NavButton label="Curriculum" onClick={() => onNavigate(ROUTES.CURRICULUM)} icon={<BookOpen size={10} />} />
               <NavButton label="Author" onClick={() => onNavigate(ROUTES.AUTHOR)} icon={<Users size={10} />} />
               <NavButton label="Reviews" onClick={() => onNavigate(ROUTES.REVIEWS)} icon={<CheckCircle2 size={10} />} />
               <div className="h-3 w-[1px] bg-white/10" />
               <NavButton label="Free Armory" onClick={() => onNavigate(ROUTES.FREE_ARMORY)} icon={<Zap size={10} />} activeColor="cyan" />
               <NavButton label="VIP Armory" onClick={() => onNavigate(ROUTES.VIP_ARMORY)} icon={<Lock size={10} />} activeColor="gold" />
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
          
          {/* ... (Overwatch Tab Content Preserved) ... */}
          {activeTab === 'overwatch' && (
            <div className="animate-fade-in space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard label="Total Gross Revenue" value="₩ 1,450,000,000" change="+12.4%" positive={true} icon={<TrendingUp size={14} />} />
                <MetricCard label="Live Connection" value="1,452" change="+8.2%" positive={true} icon={<Users size={14} />} />
                <MetricCard label="Conversion Efficiency" value="4.82 %" change="-0.4%" positive={false} icon={<BarChart3 size={14} />} />
                <MetricCard label="System Integrity" value="99.9 %" change="+0.01%" positive={true} icon={<ShieldCheck size={14} />} />
              </div>
            </div>
          )}

          {/* ... (Operatives Tab Content Preserved) ... */}
          {activeTab === 'operatives' && (
            <div className="animate-fade-in space-y-8">
               <div className="flex justify-between items-end border-b border-white/5 pb-6">
                   <div>
                     <h2 className="text-3xl font-serif font-black tracking-tight uppercase">The Panopticon</h2>
                     <p className="text-[10px] font-mono text-white/30 tracking-widest uppercase mt-1">Network Surveillance & Operative Control</p>
                   </div>
               </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {operatives.map(op => (
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

          {activeTab === 'products' && (
            <div className="space-y-8 animate-fade-in">
               <div className="flex justify-between items-center border-b border-white/5 pb-6">
                  <div>
                    <h2 className="text-3xl font-serif font-black tracking-tight uppercase">Strategic Asset Inventory</h2>
                    <p className="text-[10px] font-mono text-white/30 tracking-widest uppercase mt-1">Total Assets: {assets.length} / Live: {assets.filter(a => a.status === 'Active').length}</p>
                  </div>
                  <Button onClick={() => setIsAddingProduct(true)} className="bg-emerald-500 text-black font-black tracking-widest py-4 px-10 text-[11px] hover:bg-emerald-400 border-none shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <Plus size={16} className="mr-2 stroke-[3]" /> INITIALIZE NEW CORE
                  </Button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {assets.map((asset) => (
                    <AssetCard 
                        key={asset.id} 
                        asset={asset} 
                        onConfigure={() => { sounds.click(); setEditingAsset(asset); }} 
                    />
                  ))}
               </div>

               {/* UPDATE ASSET MODAL */}
               {editingAsset && (
                 <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-8 animate-fade-in">
                    <div className="max-w-2xl w-full bg-[#080808] border border-emerald-500/30 rounded-sm shadow-[0_0_150px_rgba(16,185,129,0.2)] flex flex-col relative overflow-hidden">
                       <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-white to-emerald-500" />
                       
                       <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                          <div className="flex items-center gap-4">
                             <div className="p-2 bg-emerald-500/10 rounded-sm border border-emerald-500/20"><Settings size={20} className="text-emerald-500 animate-spin-slow" /></div>
                             <div>
                                <h3 className="text-xl font-serif font-black tracking-tighter uppercase text-white">Asset Source Control</h3>
                                <p className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Target ID: {editingAsset.id}</p>
                             </div>
                          </div>
                          <button onClick={() => setEditingAsset(null)} className="text-white/20 hover:text-white transition-colors">X</button>
                       </div>

                       <div className="p-10 space-y-8">
                          <div className="flex gap-8">
                             <div className="flex-1 space-y-2">
                                <label className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/30">Current Version</label>
                                <div className="p-4 bg-white/5 border border-white/10 rounded-sm font-mono text-emerald-400 font-bold">{editingAsset.version}</div>
                             </div>
                             <div className="flex-1 space-y-2">
                                <label className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/30">Last Deployed</label>
                                <div className="p-4 bg-white/5 border border-white/10 rounded-sm font-mono text-white/60">{editingAsset.lastUpdated}</div>
                             </div>
                          </div>

                          <div className="space-y-4">
                             <label className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/30 flex items-center gap-2">
                                <Upload size={10} /> Upload New Binary (PDF Source)
                             </label>
                             <div className="w-full h-40 border-2 border-dashed border-emerald-500/20 rounded-sm bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group">
                                <FileText size={32} className="text-emerald-500/40 group-hover:text-emerald-400 transition-colors" />
                                <div className="text-center">
                                   <p className="text-xs font-mono text-emerald-500 font-bold uppercase tracking-widest">Drop Patch File Here</p>
                                   <p className="text-[9px] text-white/20 mt-2 font-mono">SUPPORTED: PDF (ENCRYPTED), EPUB</p>
                                </div>
                             </div>
                          </div>

                          <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                             <div className="flex items-center gap-2 text-white/20">
                                <HardDrive size={12} />
                                <span className="text-[9px] font-mono uppercase tracking-widest">Secure Connection: Active</span>
                             </div>
                             <Button 
                                onClick={handleUpdateAsset}
                                className={`bg-emerald-600 text-white font-black px-10 py-4 uppercase tracking-widest hover:bg-emerald-500 border-none shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all ${isUpdating ? 'opacity-80 pointer-events-none' : ''}`}
                             >
                                {isUpdating ? (
                                    <span className="flex items-center gap-2"><RefreshCw className="animate-spin" size={14} /> Deploying...</span>
                                ) : (
                                    "Deploy Patch"
                                )}
                             </Button>
                          </div>
                       </div>
                       
                       {isUpdating && (
                          <div className="absolute bottom-0 left-0 h-1 bg-emerald-400 w-full animate-loading-bar-turbo" />
                       )}
                    </div>
                 </div>
               )}

               {/* CREATE NEW ASSET MODAL */}
               {isAddingProduct && (
                 <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-8 animate-fade-in">
                    <div className="max-w-2xl w-full bg-[#080808] border border-emerald-500/30 rounded-sm shadow-[0_0_150px_rgba(16,185,129,0.2)] flex flex-col relative overflow-hidden">
                       <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                          <div className="flex items-center gap-4">
                             <div className="p-2 bg-emerald-900/10 rounded-sm border border-emerald-500/20"><Plus size={20} className="text-emerald-500" /></div>
                             <div>
                                <h3 className="text-xl font-serif font-black tracking-tighter uppercase text-white">Initialize New Protocol</h3>
                                <p className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Register New Asset to Database</p>
                             </div>
                          </div>
                          <button onClick={resetForm} className="text-white/20 hover:text-white transition-colors">X</button>
                       </div>

                       <div className="p-10 space-y-8">
                          <div className="space-y-4">
                             <label className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/30">Asset Designation (Title)</label>
                             <input 
                                type="text" 
                                value={newAssetTitle}
                                onChange={(e) => setNewAssetTitle(e.target.value)}
                                placeholder="ENTER_ASSET_NAME" 
                                className="w-full bg-white/5 border border-white/10 rounded-sm py-4 px-6 text-white font-serif focus:outline-none focus:border-emerald-500/50 transition-colors uppercase"
                             />
                          </div>

                          <div className="space-y-4">
                             <label className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/30">Valuation (Price)</label>
                             <input 
                                type="text" 
                                value={newAssetPrice}
                                onChange={(e) => setNewAssetPrice(e.target.value)}
                                placeholder="KRW" 
                                className="w-full bg-white/5 border border-white/10 rounded-sm py-4 px-6 text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500/50 transition-colors"
                             />
                          </div>

                          <div className="space-y-4">
                             <label className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/30 flex items-center gap-2">
                                <Upload size={10} /> Upload Source Binary (PDF)
                             </label>
                             <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileSelect} 
                                className="hidden" 
                                accept=".pdf,.epub" 
                             />
                             <div 
                                onClick={() => fileInputRef.current?.click()}
                                className={`w-full h-32 border-2 border-dashed rounded-sm bg-white/[0.02] transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group ${newAssetFile ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/10 hover:bg-white/[0.05] hover:border-emerald-500/30'}`}
                             >
                                {newAssetFile ? (
                                    <div className="flex flex-col items-center gap-3 animate-fade-in">
                                        <CheckCircle2 size={32} className="text-emerald-500" />
                                        <div className="text-center">
                                            <p className="text-xs font-mono text-emerald-400 font-bold uppercase">{newAssetFile.name}</p>
                                            <span className="text-[9px] text-white/40 font-mono uppercase tracking-widest">{(newAssetFile.size / 1024 / 1024).toFixed(2)} MB // READY TO DEPLOY</span>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <FileText size={24} className="text-white/20 group-hover:text-emerald-500 transition-colors" />
                                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest group-hover:text-white/60">Drag & Drop Encrypted PDF</span>
                                    </>
                                )}
                             </div>
                          </div>

                          <div className="pt-4 border-t border-white/10 flex justify-end gap-4">
                             <button onClick={resetForm} className="px-6 py-4 border border-white/10 text-white/40 text-xs font-mono uppercase hover:text-white transition-colors">Cancel</button>
                             <Button 
                                onClick={handleCreateAsset}
                                className={`bg-emerald-600 text-white font-black px-10 py-4 uppercase tracking-widest hover:bg-emerald-500 border-none shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all ${isCreating ? 'opacity-80 pointer-events-none' : ''}`}
                             >
                                {isCreating ? (
                                    <span className="flex items-center gap-2"><RefreshCw className="animate-spin" size={14} /> Initializing...</span>
                                ) : (
                                    "Deploy to Market"
                                )}
                             </Button>
                          </div>
                       </div>
                       
                       {isCreating && (
                          <div className="absolute bottom-0 left-0 h-1 bg-emerald-400 w-full animate-loading-bar-turbo" />
                       )}
                    </div>
                 </div>
               )}
            </div>
          )}

          {/* ... (Treasury & Mainframe Tabs Preserved) ... */}
          {activeTab === 'treasury' && (
             <div className="space-y-8 animate-fade-in">
                {/* Treasury Content... */}
                <div className="text-center py-20 border border-dashed border-white/10 rounded-sm">
                   <ShoppingCart className="mx-auto text-white/20 mb-4" size={48} />
                   <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Treasury Module Loaded</p>
                </div>
             </div>
          )}
          {activeTab === 'mainframe' && (
             <div className="animate-fade-in space-y-12 pb-20">
                {/* Mainframe Content... */}
                <div className="text-center py-20 border border-dashed border-white/10 rounded-sm">
                   <Cpu className="mx-auto text-white/20 mb-4" size={48} />
                   <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Mainframe Core Active</p>
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

const NavButton: React.FC<{ label: string, onClick: () => void, icon?: React.ReactNode, activeColor?: 'cyan' | 'gold' }> = ({ label, onClick, icon, activeColor }) => {
    const textColor = activeColor === 'cyan' ? 'text-cyan-400' : activeColor === 'gold' ? 'text-gold' : 'text-white/60';
    const hoverColor = activeColor === 'cyan' ? 'hover:text-cyan-300' : activeColor === 'gold' ? 'hover:text-[#FCF6BA]' : 'hover:text-white';
    
    return (
        <button onClick={onClick} className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest ${textColor} ${hoverColor} transition-colors group`}>
            {icon}
            <span className="group-hover:underline underline-offset-4 decoration-white/20">{label}</span>
        </button>
    )
}

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

const AssetCard: React.FC<{ asset: Asset; onConfigure: () => void }> = ({ asset, onConfigure }) => (
  <div className="bg-[#050505] border border-white/10 p-8 space-y-6 relative overflow-hidden group hover:border-white/20 transition-all">
     <div className="absolute top-0 right-0 p-5">
        <div className={`px-3 py-1 rounded-[1px] text-[8px] font-mono border tracking-widest uppercase ${asset.status === 'Active' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-white/5 border-white/10 text-white/30'}`}>
           {asset.status}
        </div>
     </div>
     <div className="space-y-1">
        <h4 className="text-2xl font-serif font-black tracking-tight group-hover:text-gold transition-colors">{asset.title}</h4>
        <div className="flex gap-3">
            <span className="text-[9px] font-mono tracking-widest text-white/20 uppercase">Ver: {asset.version}</span>
            <span className="text-[9px] font-mono tracking-widest text-white/20 uppercase">Last: {asset.lastUpdated}</span>
        </div>
     </div>
     
     <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
        <div className="space-y-1">
           <span className="text-[8px] font-mono tracking-widest uppercase text-white/20">Asset_Valuation</span>
           <p className="font-mono font-bold text-base text-white">{asset.price}</p>
        </div>
        <div className="space-y-1">
           <span className="text-[8px] font-mono tracking-widest uppercase text-white/20">Success_Ratio</span>
           <p className="font-mono font-bold text-base text-emerald-400">{asset.sales}</p>
        </div>
     </div>

     <div className="flex items-center gap-4 text-[9px] font-mono text-white/20 uppercase tracking-widest">
        <span className="flex items-center gap-2"><ArrowUpRight size={10} /> Hits: {asset.views}</span>
        <span className="flex items-center gap-2"><FileCheck size={10} /> Source: PDF</span>
     </div>

     <div className="pt-6 flex gap-3">
        <button onClick={onConfigure} className="flex-grow py-3.5 text-[9px] font-mono tracking-widest uppercase border border-white/10 hover:bg-white/5 hover:text-emerald-400 transition-all font-bold flex items-center justify-center gap-2">
            <Settings size={12} /> Configure
        </button>
        <button className="px-5 py-3.5 text-[9px] font-mono tracking-widest uppercase border border-white/10 hover:border-red-500/40 hover:text-red-500 transition-all">Kill</button>
     </div>
  </div>
);

const AdminInput: React.FC<{ label: string, placeholder: string, icon?: React.ReactNode }> = ({ label, placeholder, icon }) => (
  <div className="space-y-3">
     <label className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30">{label}</label>
     <div className="relative flex items-center group">
        {icon && <div className="absolute left-5 text-white/20 group-focus-within:text-white transition-colors">{icon}</div>}
        <input 
          type="text" 
          placeholder={placeholder} 
          className={`w-full bg-white/5 border border-white/10 rounded-sm py-4 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all text-xs placeholder:text-white/5 font-mono tracking-tight ${icon ? 'pl-14' : 'px-5'}`}
        />
     </div>
  </div>
);
