
import React from 'react';
import { Button } from './Button';
import { AlertTriangle, Home } from 'lucide-react';

interface NotFoundPageProps {
  onReturn: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onReturn }) => {
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6 text-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0f172a_0%,_black_100%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-lg w-full space-y-10">
        <div className="flex flex-col items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center animate-pulse">
            <AlertTriangle className="text-red-500" size={48} />
          </div>
          <div className="space-y-2">
            <h1 className="font-cinzel text-7xl font-black text-white tracking-tighter">404</h1>
            <p className="text-gold font-bold tracking-[0.5em] uppercase text-xs">Sector Restricted or Missing</p>
          </div>
        </div>

        <p className="text-brand-muted font-serif italic text-lg leading-relaxed">
          요청하신 좌표는 존재하지 않거나, <br />
          귀하의 권한으로는 접근할 수 없는 구역입니다.
        </p>

        <Button 
          onClick={onReturn}
          className="px-12 py-5 font-black uppercase tracking-[0.3em] bg-white/5 text-white hover:bg-white/10 border border-white/10"
        >
          <Home size={18} className="mr-3" /> Return to Base
        </Button>
      </div>
    </div>
  );
};
