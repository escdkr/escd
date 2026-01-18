import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { ArrowLeft, ShieldCheck, Lock, Timer, CreditCard, Wallet, Smartphone, ChevronRight, Check, RotateCw, ArrowDownRight } from 'lucide-react';

interface CheckoutPageProps {
  onBack: () => void;
  onComplete: () => void;
}

const ESCDCardLogo = ({ className }: { className?: string }) => (
  <div className={`flex flex-col items-center gap-2 ${className}`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="w-16 h-16 drop-shadow-[0_0_15px_rgba(191,149,63,0.5)]"
    >
      <defs>
        <linearGradient id="cardGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#BF953F" />
          <stop offset="25%" stopColor="#FCF6BA" />
          <stop offset="50%" stopColor="#B38728" />
          <stop offset="75%" stopColor="#FBF5B7" />
          <stop offset="100%" stopColor="#AA771C" />
        </linearGradient>
        <linearGradient id="hologramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="45%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path 
        d="M11 1 L13 1 L13 8 L15.5 8.5 L13.8 10 L12 22 L10.2 10 L8.5 8.5 L11 8 Z" 
        fill="url(#cardGoldGradient)" 
      />
      <path 
        d="M11 1 L13 1 L13 8 L15.5 8.5 L13.8 10 L12 22 L10.2 10 L8.5 8.5 L11 8 Z" 
        fill="url(#hologramGradient)"
        className="animate-pulse"
        style={{ mixBlendMode: 'overlay' }}
      />
    </svg>
    <div className="flex flex-col items-center -space-y-1">
      <span className="font-cinzel text-2xl font-black text-gold tracking-widest">ESCD</span>
      <span className="text-[7px] text-[#BF953F] font-bold tracking-[0.5em] uppercase">The only weapon for your freedom.</span>
    </div>
  </div>
);

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBack, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(600);
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsTyping(true);
    if (typingTimeoutRef.current) window.clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = window.setTimeout(() => setIsTyping(false), 500);
  };

  const handleFinalCheckout = () => {
    if (!formData.name || !formData.email) {
      alert("Please provide your name and email to issue the VIP card.");
      return;
    }
    alert(`${formData.name}님, VIP 멤버십 발급이 완료되었습니다.`);
    onComplete();
  };

  const memberId = formData.email 
    ? formData.email.split('@')[0].toUpperCase().substring(0, 8) 
    : 'ES-2401';

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col md:flex-row overflow-hidden font-sans selection:bg-[#BF953F]">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_#0f172a_0%,_black_100%)] pointer-events-none" />
      <div className="fixed inset-0 grid-pattern opacity-10 pointer-events-none" />

      {/* LEFT: The VIP Membership Card Area */}
      <div className="relative w-full md:w-1/2 min-h-[50vh] md:min-h-screen flex flex-col items-center justify-center p-8 md:p-12 overflow-hidden border-r border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#BF953F]/5 blur-[180px] pointer-events-none z-0" />
        
        <button 
          onClick={onBack}
          className="absolute top-10 left-10 flex items-center gap-2 text-brand-muted hover:text-white transition-all z-50 font-serif text-xs tracking-widest uppercase outline-none"
        >
          <ArrowLeft size={16} /> Return to Lounge
        </button>

        {/* HIGH VISIBILITY EXTERNAL HINT (Placed Above the Card) */}
        <div className="mb-10 flex flex-col items-center gap-2 animate-pulse pointer-events-none select-none z-10">
          <div className="flex items-center gap-2 text-gold/70 text-[10px] font-sans tracking-[0.3em] uppercase font-black drop-shadow-[0_0_8px_rgba(191,149,63,0.4)]">
            <RotateCw size={14} className="stroke-[2.5px]" />
            <span>View Receipt</span>
          </div>
          <span className="text-white/40 text-[9px] font-sans tracking-[0.1em] font-medium italic">
            (마우스를 올려 영수증 확인)
          </span>
        </div>

        {/* Flip Container */}
        <div className="group perspective-1000 w-full max-w-[440px] aspect-[1.58/1] relative z-10 cursor-help">
          <div className="relative w-full h-full transition-transform duration-[1000ms] preserve-3d group-hover:[transform:rotateY(180deg)]">
            
            {/* FRONT: The Matte Black Metal Card */}
            <div className="absolute inset-0 backface-hidden">
              <div className="w-full h-full bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,1)] border border-[#BF953F]/30 relative flex flex-col p-10 justify-between">
                <div className="absolute inset-0 noise-texture opacity-40 mix-blend-overlay pointer-events-none z-0" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/40 pointer-events-none z-0" />
                
                <div className="relative z-10 flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] text-gold font-black tracking-[0.4em] uppercase opacity-70">Privilege Pass</span>
                      <h2 className="font-cinzel text-white text-base font-bold tracking-[0.2em]">VIP Membership</h2>
                    </div>
                    <div className="w-12 h-9 bg-gradient-to-br from-[#BF953F] via-[#FCF6BA] to-[#B38728] rounded-md relative overflow-hidden shadow-inner opacity-90">
                      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5 opacity-30">
                        {[...Array(9)].map((_, i) => <div key={i} className="border border-black/20"></div>)}
                      </div>
                    </div>
                </div>

                <div className="relative z-10 flex justify-center py-2">
                  <ESCDCardLogo />
                </div>

                <div className="relative z-10 flex justify-between items-end">
                  <div className="space-y-2">
                    <div className="flex flex-col">
                      <span className="text-[7px] text-white/30 font-mono tracking-[0.3em] uppercase mb-1">Honored Guest</span>
                      <p className={`font-serif font-bold text-xl text-gold tracking-tight min-h-[28px] transition-all duration-300 ${isTyping ? 'animate-pulse scale-[1.02] blur-[0.5px]' : ''}`}>
                        {formData.name || 'YOUR NAME'}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <span className="text-[7px] text-white/20 font-mono tracking-[0.2em] uppercase">Member ID</span>
                        <span className="text-[9px] text-white/50 font-mono tracking-widest">{memberId}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[7px] text-white/20 font-mono tracking-[0.2em] uppercase">Issued</span>
                        <span className="text-[9px] text-white/50 font-mono tracking-widest">{new Date().getFullYear()}. LIMITED</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sophisticated Security Seal */}
                  <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center backdrop-blur-md relative shadow-[0_0_15px_rgba(191,149,63,0.3)]">
                    <div className="absolute inset-0 bg-gold/10 rounded-full animate-pulse blur-[4px]" />
                    <div className="absolute inset-[2px] border border-gold/10 rounded-full" />
                    <ShieldCheck size={20} className="text-gold/80 drop-shadow-[0_0_8px_rgba(191,149,63,0.5)]" />
                  </div>
                </div>
              </div>
            </div>

            {/* BACK: The Receipt / Invoice View */}
            <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)]">
              <div className="w-full h-full bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,1)] border border-[#BF953F]/60 relative flex flex-col p-10 justify-between">
                <div className="absolute inset-0 noise-texture opacity-40 mix-blend-overlay pointer-events-none z-0" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-black/60 pointer-events-none z-0" />
                
                <div className="relative z-10 flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-[10px] font-mono font-black text-gold tracking-[0.4em] uppercase">Order Summary</span>
                  <span className="text-[8px] font-mono text-white/40 tracking-widest">INV-2024-X99</span>
                </div>

                {/* Gilded Itemized Value List */}
                <div className="relative z-10 flex-grow py-5 space-y-2.5">
                  {[
                    { label: 'The Glitch 영구 소장 라이선스', val: '500,000 KRW' },
                    { label: 'VIP 프라이빗 커뮤니티 초대', val: '300,000 KRW' },
                    { label: '실시간 업데이트 리포트 (평생)', val: '200,000 KRW' },
                    { label: '저자 직통 1:1 히든 상담권', val: 'Priceless' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-baseline gap-2 text-[10px] font-mono">
                      <Check size={10} className="text-[#FCF6BA] shrink-0 translate-y-0.5 drop-shadow-[0_0_5px_rgba(252,246,186,0.5)]" />
                      <span className="text-white/80 whitespace-nowrap">{item.label}</span>
                      <div className="flex-grow border-b border-dotted border-white/5 mb-1" />
                      {item.val === 'Priceless' ? (
                        <span className="font-serif italic text-[#FCF6BA] drop-shadow-[0_0_8px_rgba(252,246,186,0.6)] font-black text-xs tracking-tight">Priceless</span>
                      ) : (
                        <span className="text-white/50 whitespace-nowrap">{item.val}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* The Anchor Point: The Visual Bridge of Wealth Transformation */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col">
                  {/* Step 1: Total Value (Anchor) */}
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[8px] font-mono text-white/20 tracking-[0.4em] uppercase">TOTAL VALUE</span>
                    <span className="text-sm font-mono text-gray-500 line-through decoration-red-600/60 decoration-2">1,200,000 KRW</span>
                  </div>

                  {/* Step 2: The Visual Bridge (Z-Arrow) */}
                  <div className="flex justify-center -my-2 pr-8">
                     <ArrowDownRight 
                        size={32} 
                        className="text-[#BF953F] opacity-80 animate-bounce drop-shadow-[0_0_10px_rgba(191,149,63,0.5)]" 
                        strokeWidth={2.5}
                     />
                  </div>

                  {/* Step 3: Final Price with Red Tag */}
                  <div className="flex justify-between items-end relative">
                    <span className="text-[8px] font-mono text-gold/40 tracking-[0.4em] uppercase pb-2">TODAY'S PRICE</span>
                    <div className="text-right relative">
                       {/* The Red Tag Stamp */}
                       <div className="absolute -top-4 -right-2 bg-[#DC2626] text-white text-[9px] font-black px-2 py-0.5 rounded-sm rotate-[-12deg] shadow-lg animate-pulse z-20 border border-white/10">
                          SAVE 75%
                       </div>
                       <span className="text-4xl font-serif font-black text-[#FCF6BA] tracking-tighter drop-shadow-[0_0_25px_rgba(252,246,186,0.7)]">290,000 <span className="text-xl font-black italic">KRW</span></span>
                    </div>
                  </div>
                </div>

                {/* Micro-text for authority */}
                <p className="relative z-10 text-[6px] font-mono text-white/10 mt-4 uppercase tracking-[0.5em] text-center">
                  Terms governed by ESCD strategic guidelines. High confidentiality required.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT: The Registration (Payment Form) */}
      <div className="w-full md:w-1/2 min-h-screen bg-black/40 backdrop-blur-3xl z-20 flex items-center justify-center p-8 md:p-20 relative">
        <div className="max-w-md w-full space-y-12">
          
          <div className="space-y-4 text-center md:text-left">
            <h2 className="font-serif font-black text-4xl md:text-5xl text-white tracking-tighter">VIP Membership</h2>
            <p className="text-brand-muted font-light leading-relaxed font-serif">
              오직 소수에게만 허락된 자리입니다. <br />
              귀하의 이름을 블랙 메탈 카드에 정교하게 새겨드리겠습니다.
            </p>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#BF953F]/10 border border-[#BF953F]/20 rounded-sm text-[#FCF6BA]">
              <Timer size={14} className="animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase">입장 마감까지 {formatTime(timeLeft)}</span>
            </div>
          </div>

          <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-8">
              <div className="relative group">
                <label className="block text-[10px] text-brand-muted font-bold uppercase tracking-[0.2em] mb-1 opacity-70 font-sans">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  autoComplete="off"
                  placeholder="성함을 입력하세요" 
                  className="w-full bg-transparent border-none border-b border-white/10 py-3 text-white placeholder:text-white/10 focus:outline-none focus:ring-0 transition-all font-serif tracking-tight text-lg relative z-10"
                />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 group-focus-within:bg-gold transition-colors duration-500 shadow-[0_0_10px_#BF953F] z-0" />
              </div>

              <div className="relative group">
                <label className="block text-[10px] text-brand-muted font-bold uppercase tracking-[0.2em] mb-1 opacity-70 font-sans">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="off"
                  placeholder="이메일을 입력하세요" 
                  className="w-full bg-transparent border-none border-b border-white/10 py-3 text-[#FCF6BA] placeholder:text-white/10 focus:outline-none focus:ring-0 transition-all font-serif tracking-tight text-lg relative z-10"
                />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 group-focus-within:bg-gold transition-colors duration-500 shadow-[0_0_10px_#BF953F] z-0" />
              </div>

              <div className="relative group">
                <label className="block text-[10px] text-brand-muted font-bold uppercase tracking-[0.2em] mb-1 opacity-70 font-sans">Mobile Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  autoComplete="off"
                  placeholder="연락처를 입력하세요" 
                  className="w-full bg-transparent border-none border-b border-white/10 py-3 text-white placeholder:text-white/10 focus:outline-none focus:ring-0 transition-all font-serif tracking-tight text-lg relative z-10"
                />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 group-focus-within:bg-gold transition-colors duration-500 shadow-[0_0_10px_#BF953F] z-0" />
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] text-brand-muted font-bold uppercase tracking-[0.2em] font-sans">Admission Protocol</span>
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={() => setSelectedMethod('card')}
                  className={`p-4 flex flex-col items-center gap-3 rounded-sm border transition-all duration-300 ${selectedMethod === 'card' ? 'bg-[#BF953F]/10 border-[#BF953F] text-[#FCF6BA] shadow-[0_0_15px_rgba(191,149,63,0.2)]' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}`}
                >
                  <CreditCard size={18} className={selectedMethod === 'card' ? 'text-[#FCF6BA]' : 'text-gray-500'} />
                  <span className="text-[9px] font-bold tracking-widest uppercase">신용카드</span>
                </button>
                <button 
                  onClick={() => setSelectedMethod('toss')}
                  className={`p-4 flex flex-col items-center gap-3 rounded-sm border transition-all duration-300 ${selectedMethod === 'toss' ? 'bg-[#BF953F]/10 border-[#BF953F] text-[#FCF6BA] shadow-[0_0_15px_rgba(191,149,63,0.2)]' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}`}
                >
                  <Smartphone size={18} className={selectedMethod === 'toss' ? 'text-[#FCF6BA]' : 'text-gray-500'} />
                  <span className="text-[9px] font-bold tracking-widest uppercase">토스페이</span>
                </button>
                <button 
                  onClick={() => setSelectedMethod('wallet')}
                  className={`p-4 flex flex-col items-center gap-3 rounded-sm border transition-all duration-300 ${selectedMethod === 'wallet' ? 'bg-[#BF953F]/10 border-[#BF953F] text-[#FCF6BA] shadow-[0_0_15px_rgba(191,149,63,0.2)]' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}`}
                >
                  <Wallet size={18} className={selectedMethod === 'wallet' ? 'text-[#FCF6BA]' : 'text-gray-500'} />
                  <span className="text-[9px] font-bold tracking-widest uppercase">무통장</span>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <Button 
                className="w-full py-8 text-xl font-black uppercase tracking-[0.3em] bg-gold-metallic shadow-[0_0_40px_rgba(191,149,63,0.4)] hover:shadow-[0_0_60px_rgba(252,246,186,0.8)] transform hover:scale-[1.02] transition-all border-none group font-serif"
                onClick={handleFinalCheckout}
              >
                VIP CARD 발급 (290,000원)
                <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>

              <div className="flex items-center justify-center gap-6 opacity-30">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={12} className="text-white" />
                  <span className="text-[8px] font-mono tracking-widest uppercase text-white">SSL Encrypted Connection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={12} className="text-white" />
                  <span className="text-[8px] font-mono tracking-widest uppercase text-white">Verified Hospitality</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
