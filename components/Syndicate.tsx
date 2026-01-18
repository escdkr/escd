import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  MessageSquare, 
  Hash, 
  Search, 
  Bell, 
  MoreVertical, 
  Send, 
  Image as ImageIcon,
  Paperclip,
  Lock,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Crown,
  Wifi,
  Eye,
  ArrowLeft
} from 'lucide-react';
import { UserProfile } from '../App';

interface SyndicateProps {
  onBack: () => void;
  user: UserProfile | null;
}

const CHANNELS = [
  { id: 'general', name: 'general-intel', locked: false, type: 'public' },
  { id: 'revenue', name: 'revenue-proof', locked: false, type: 'proof' },
  { id: 'blackhat', name: 'black-tactics', locked: true, type: 'vip' },
  { id: 'tax', name: 'offshore-tax', locked: true, type: 'vip' },
  { id: 'automation', name: 'bot-scripts', locked: true, type: 'vip' },
];

const FEED_MOCK = [
  {
    id: 1,
    user: 'Cryptic_Whale',
    tier: 'Tier-01',
    content: '스마트스토어 로직 변경 감지됨. 상위노출 알고리즘 패턴 분석 파일 공유합니다. 이번 주말까지만 유효할 듯.',
    time: '09:42 AM',
    tags: ['Algorithm', 'Critical'],
    likes: 24
  },
  {
    id: 2,
    user: 'Ghost_Seller',
    tier: 'Architect',
    content: '지난달 자동화 수익 4,200만원 달성. 서버 비용 제외 순수익률 92%. 질문 받는다.',
    time: '10:15 AM',
    tags: ['Profit', 'Verified'],
    likes: 156,
    isHighlight: true
  },
  {
    id: 3,
    user: 'Unknown_Agent',
    tier: 'Tier-02',
    content: '페이스북 광고 효율 급락 이슈 해결책 찾았습니다. 픽셀 우회 스크립트 필요하신 분 DM.',
    time: '10:48 AM',
    tags: ['Ads', 'Tactics'],
    likes: 8
  }
];

const TICKER_DATA = [
  { user: 'Agent_K', amount: '₩12,500,000' },
  { user: 'Void_Walker', amount: '₩8,200,000' },
  { user: 'Neo_Seoul', amount: '₩45,000,000' },
  { user: 'Glitch_Master', amount: '₩120,000,000' },
  { user: 'Zero_One', amount: '₩5,400,000' },
];

export const Syndicate: React.FC<SyndicateProps> = ({ onBack, user }) => {
  const [activeChannel, setActiveChannel] = useState(CHANNELS[0]);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [inputMessage, setInputMessage] = useState('');
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  // Ticker Animation
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TICKER_DATA.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleChannelClick = (channel: typeof CHANNELS[0]) => {
    if (channel.locked) {
      setShowAccessDenied(true);
      setTimeout(() => setShowAccessDenied(false), 2000);
    } else {
      setActiveChannel(channel);
    }
  };

  return (
    <div className="h-screen bg-[#050505] text-gray-300 font-sans flex overflow-hidden relative selection:bg-gold/30">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] pointer-events-none" />
      
      {/* 1. LEFT SIDEBAR (Channels) */}
      <aside className="w-64 bg-black/40 border-r border-white/5 flex flex-col z-20 backdrop-blur-md">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-black/20">
          <div className="flex items-center gap-2 text-gold">
            <Users size={18} />
            <span className="font-cinzel font-bold tracking-widest text-sm">SYNDICATE</span>
          </div>
          <button onClick={onBack} className="text-white/20 hover:text-white transition-colors">
            <ArrowLeft size={16} />
          </button>
        </div>

        {/* Channel List */}
        <div className="flex-grow overflow-y-auto py-6 px-3 space-y-8">
          
          {/* Public Channels */}
          <div className="space-y-1">
             <div className="px-3 mb-2 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 font-bold">Open Frequencies</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_#10b981]" />
             </div>
             {CHANNELS.filter(c => !c.locked).map(channel => (
               <ChannelItem 
                  key={channel.id} 
                  channel={channel} 
                  isActive={activeChannel.id === channel.id} 
                  onClick={() => handleChannelClick(channel)} 
                />
             ))}
          </div>

          {/* VIP Channels */}
          <div className="space-y-1">
             <div className="px-3 mb-2 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-gold/40 font-bold">Encrypted Nodes</span>
                <Lock size={10} className="text-gold/40" />
             </div>
             {CHANNELS.filter(c => c.locked).map(channel => (
               <ChannelItem 
                  key={channel.id} 
                  channel={channel} 
                  isActive={activeChannel.id === channel.id} 
                  onClick={() => handleChannelClick(channel)} 
                />
             ))}
          </div>
        </div>

        {/* User Status */}
        <div className="p-4 bg-white/5 border-t border-white/5">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-gold/20 to-black border border-gold/30 flex items-center justify-center text-gold font-bold font-serif">
                 {user?.name?.[0] || 'A'}
              </div>
              <div className="flex flex-col">
                 <span className="text-xs font-bold text-white tracking-tight">{user?.name || 'Agent-077'}</span>
                 <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-wider">Online :: Tier-01</span>
              </div>
           </div>
        </div>
      </aside>

      {/* 2. MAIN FEED (Central Terminal) */}
      <main className="flex-grow flex flex-col relative z-10 bg-black/20">
         {/* Top Bar */}
         <div className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 backdrop-blur-sm">
            <div className="flex items-center gap-4">
               <Hash size={20} className="text-white/40" />
               <div className="flex flex-col">
                  <span className="text-white font-bold tracking-tight uppercase">{activeChannel.name}</span>
                  <span className="text-[10px] text-white/30 font-mono tracking-widest">{activeChannel.type === 'vip' ? 'E2E ENCRYPTED :: TOP SECRET' : 'PUBLIC FREQUENCY'}</span>
               </div>
            </div>
            <div className="flex items-center gap-6 text-white/40">
               <div className="relative">
                  <Search size={18} className="hover:text-white transition-colors cursor-pointer" />
               </div>
               <Bell size={18} className="hover:text-white transition-colors cursor-pointer" />
               <MoreVertical size={18} className="hover:text-white transition-colors cursor-pointer" />
            </div>
         </div>

         {/* Messages Area */}
         <div className="flex-grow overflow-y-auto p-8 space-y-6">
            <div className="flex justify-center pb-8">
               <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono text-white/30">Yesterday</span>
            </div>
            
            {FEED_MOCK.map(msg => (
               <div key={msg.id} className={`group flex gap-4 animate-fade-in ${msg.isHighlight ? 'bg-gold/5 p-4 rounded-sm border border-gold/10' : ''}`}>
                  <div className={`w-10 h-10 rounded-sm flex items-center justify-center text-xs font-bold font-serif shrink-0 border ${msg.isHighlight ? 'bg-gold text-black border-gold' : 'bg-white/5 border-white/10 text-white/60'}`}>
                     {msg.user[0]}
                  </div>
                  <div className="flex-grow space-y-1">
                     <div className="flex items-center gap-3">
                        <span className={`text-sm font-bold hover:underline cursor-pointer ${msg.isHighlight ? 'text-gold' : 'text-white/90'}`}>{msg.user}</span>
                        <span className="px-1.5 py-0.5 rounded-[2px] bg-white/5 text-[9px] font-mono text-white/40 border border-white/5">{msg.tier}</span>
                        <span className="text-[10px] text-white/20">{msg.time}</span>
                     </div>
                     <p className="text-sm leading-relaxed text-gray-300 font-sans">
                        {msg.content}
                     </p>
                     {/* Tags */}
                     <div className="flex gap-2 pt-1">
                        {msg.tags.map(t => (
                           <span key={t} className="text-[9px] font-mono text-emerald-500/80 bg-emerald-500/5 px-2 py-0.5 rounded-[1px]">#{t}</span>
                        ))}
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* Input Area */}
         <div className="p-6 border-t border-white/5 bg-black/40">
            <div className="relative flex items-center gap-3 bg-white/5 border border-white/10 rounded-sm p-3 focus-within:border-gold/30 focus-within:bg-white/[0.07] transition-all">
               <button className="p-2 text-white/20 hover:text-white transition-colors"><Paperclip size={18} /></button>
               <input 
                  type="text" 
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Message #${activeChannel.name}`}
                  className="flex-grow bg-transparent border-none focus:outline-none text-sm text-white placeholder:text-white/20 font-sans"
               />
               <button className="p-2 text-white/20 hover:text-gold transition-colors"><ImageIcon size={18} /></button>
               <div className="h-4 w-[1px] bg-white/10 mx-1" />
               <button className={`p-2 rounded-sm transition-all ${inputMessage ? 'bg-gold text-black' : 'text-white/20'}`}>
                  <Send size={16} />
               </button>
            </div>
            <div className="mt-2 flex justify-end items-center gap-2">
               <Wifi size={10} className="text-emerald-500 animate-pulse" />
               <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest">Secure Connection Established</span>
            </div>
         </div>
         
         {/* Access Denied Overlay (Flash) */}
         {showAccessDenied && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
               <div className="p-8 bg-[#0a0a0a] border border-red-500/50 rounded-sm shadow-[0_0_50px_rgba(239,68,68,0.2)] text-center space-y-4 max-w-sm">
                  <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto animate-shake">
                     <Lock size={32} className="text-red-500" />
                  </div>
                  <div className="space-y-1">
                     <h3 className="text-red-500 font-mono font-black text-xl tracking-widest uppercase">ACCESS DENIED</h3>
                     <p className="text-white/40 text-[10px] font-mono tracking-widest uppercase">Insufficient Clearance Level</p>
                  </div>
               </div>
            </div>
         )}
      </main>

      {/* 3. RIGHT SIDEBAR (Live Intel) */}
      <aside className="w-72 bg-[#020202] border-l border-white/5 flex flex-col z-20 hidden lg:flex">
         <div className="p-6 border-b border-white/5 space-y-4">
            <h3 className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30 font-bold">Live Market Depth</h3>
            
            {/* Ticker Card */}
            <div className="bg-white/[0.02] border border-white/5 p-4 rounded-sm space-y-3 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-2 opacity-20"><TrendingUp size={40} /></div>
               <span className="text-[9px] text-emerald-500 uppercase tracking-widest font-bold flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"/>Live Revenue Feed</span>
               
               <div className="space-y-1 relative z-10">
                  <div className="text-xs text-white/60 font-mono">{TICKER_DATA[tickerIndex].user}</div>
                  <div className="text-xl font-mono font-bold text-white tracking-tight">{TICKER_DATA[tickerIndex].amount}</div>
               </div>
               
               <div className="h-1 w-full bg-white/5 mt-2 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[60%] animate-loading-bar-turbo" />
               </div>
            </div>
         </div>

         <div className="flex-grow p-6 space-y-6 overflow-y-auto">
            <div className="space-y-4">
               <h3 className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30 font-bold">Top Architects</h3>
               {/* Leaderboard */}
               {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-2 rounded-sm -mx-2 transition-colors">
                     <div className={`w-8 h-8 rounded-sm flex items-center justify-center font-bold text-xs border ${i === 1 ? 'bg-gold/10 border-gold text-gold shadow-[0_0_10px_rgba(191,149,63,0.2)]' : 'bg-white/5 border-white/10 text-white/40'}`}>
                        {i}
                     </div>
                     <div className="flex flex-col">
                        <span className={`text-xs font-bold ${i === 1 ? 'text-white' : 'text-white/60'}`}>Anonymous_User_{i}9</span>
                        <span className="text-[9px] font-mono text-white/20">Revenue Verified</span>
                     </div>
                     {i === 1 && <Crown size={12} className="text-gold ml-auto" />}
                  </div>
               ))}
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
               <h3 className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30 font-bold">Active Operations</h3>
               <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-white/40">
                     <span>Node_Alpha</span>
                     <span className="text-emerald-500">Online</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-white/40">
                     <span>Intel_Relay</span>
                     <span className="text-emerald-500">Online</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-white/40">
                     <span>Crypto_Bridge</span>
                     <span className="text-amber-500 animate-pulse">Syncing...</span>
                  </div>
               </div>
            </div>
         </div>
      </aside>

      <style>{`
         .animate-loading-bar-turbo { animation: loading-bar-turbo 1.5s ease-in-out infinite; }
         @keyframes loading-bar-turbo { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  );
};

const ChannelItem: React.FC<{ channel: any; isActive: boolean; onClick: () => void }> = ({ channel, isActive, onClick }) => (
   <button 
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-2 rounded-sm transition-all group ${
         isActive 
            ? 'bg-gold/10 text-gold font-bold shadow-[inset_2px_0_0_#BF953F]' 
            : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
      }`}
   >
      {channel.locked ? <Lock size={12} className="opacity-50" /> : <Hash size={14} className="opacity-50" />}
      <span className="text-xs font-mono tracking-wide">{channel.name}</span>
      {channel.locked && <span className="ml-auto text-[8px] border border-white/10 px-1 rounded text-white/20 group-hover:border-gold/30 group-hover:text-gold/50">VIP</span>}
   </button>
);