import React, { useState } from 'react';
import { Button } from './Button';
import { ArrowLeft, ShieldCheck, Mail, Lock, ChevronRight, Terminal } from 'lucide-react';
import { UserProfile } from '../App';

// Export MasterNeonDagger for use in Dashboard and other components
export const MasterNeonDagger = ({ className, glow = true }: { className?: string; glow?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className={`${className} ${glow ? 'drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]' : ''}`}
  >
    <defs>
      <linearGradient id="neonDaggerGradient" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2E1065" />
        <stop offset="35%" stopColor="#6366F1" />
        <stop offset="80%" stopColor="#22D3EE" />
        <stop offset="100%" stopColor="#E0F2FE" />
      </linearGradient>
    </defs>
    <path 
      d="M11 1 L13 1 L13 8 L15.5 8.5 L13.8 10 L12 22 L10.2 10 L8.5 8.5 L11 8 Z" 
      fill="url(#neonDaggerGradient)" 
    />
  </svg>
);

interface LoginPageProps {
  onBack: () => void;
  onLogin: (profile?: UserProfile) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onBack, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation: Admin login check
    if (email === 'admin@escd.io') {
      onLogin({
        id: 'ADMIN-001',
        name: 'The Architect',
        clearance: 'S-CLASS OVERLORD',
        role: 'admin'
      });
    } else {
      onLogin(); // Default elite user
    }
  };

  const fillCredentials = (type: 'admin' | 'user') => {
    if (type === 'admin') {
      setEmail('admin@escd.io');
      setPassword('master_key_v1');
    } else {
      setEmail('agent_077@escd.io');
      setPassword('glitch_protocol');
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0f172a_0%,_black_100%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#BF953F]/5 blur-[150px] pointer-events-none" />
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="absolute top-10 left-10 flex items-center gap-2 text-brand-muted hover:text-white transition-all font-serif text-xs tracking-widest uppercase z-20"
      >
        <ArrowLeft size={16} /> Return Home
      </button>

      <div className="max-w-md w-full relative z-10 space-y-12 text-center">
        {/* Brand Header */}
        <div className="flex flex-col items-center gap-6">
          <MasterNeonDagger className="w-16 h-16 -rotate-45" />
          <div className="space-y-2">
            <h1 className="font-cinzel text-5xl font-black text-white tracking-tighter uppercase">ESCD</h1>
            <p className="text-[10px] text-gold font-bold tracking-[0.5em] uppercase">Private Operative Login</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white/[0.03] backdrop-blur-xl p-10 rounded-sm border border-white/5 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="relative group">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Operative Email"
                  className="w-full bg-transparent border-none border-b border-white/10 py-4 pl-10 text-white placeholder:text-white/10 focus:outline-none focus:ring-0 transition-all font-serif"
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Access Code"
                  className="w-full bg-transparent border-none border-b border-white/10 py-4 pl-10 text-white placeholder:text-white/10 focus:outline-none focus:ring-0 transition-all font-serif"
                />
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full py-6 font-black uppercase tracking-[0.3em] bg-gold-metallic text-brand-dark border-none hover:shadow-[0_0_30px_rgba(191,149,63,0.5)]"
            >
              Authenticate <ChevronRight size={18} className="ml-2" />
            </Button>

            <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-white/20 uppercase">
              <a href="#" className="hover:text-gold transition-colors">Forgot Credentials?</a>
              <span className="flex items-center gap-2"><ShieldCheck size={12} /> Secure Tunnel Active</span>
            </div>
          </form>

          {/* DEV TOOLS / SEED ACCESS */}
          <div className="mt-10 pt-6 border-t border-white/5 space-y-4">
            <div className="flex items-center justify-center gap-2 text-[8px] font-mono text-white/20 uppercase tracking-[0.2em] opacity-50">
               <Terminal size={10} />
               <span>Dev_Mode :: Quick Access</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => fillCredentials('admin')} 
                className="py-3 px-4 bg-red-900/10 hover:bg-red-900/20 border border-red-500/10 hover:border-red-500/30 rounded-sm text-[8px] font-mono text-red-400 hover:text-red-300 transition-all uppercase tracking-wider flex items-center justify-center gap-2 group"
              >
                <Lock size={10} className="group-hover:unlock" /> Load Admin
              </button>
              <button 
                onClick={() => fillCredentials('user')} 
                className="py-3 px-4 bg-emerald-900/10 hover:bg-emerald-900/20 border border-emerald-500/10 hover:border-emerald-500/30 rounded-sm text-[8px] font-mono text-emerald-400 hover:text-emerald-300 transition-all uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <ShieldCheck size={10} /> Load Agent
              </button>
            </div>
          </div>
        </div>

        <p className="text-brand-muted text-xs font-serif italic">
          * Unauthorized access attempts are monitored and logged.
        </p>
      </div>
    </div>
  );
};