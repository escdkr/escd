
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { X, Terminal, AlertTriangle, CheckCircle2, Info, ShieldAlert, Wifi, Zap } from 'lucide-react';

/* --- 1. AUDIO SYNTH ENGINE (Web Audio API) --- */
// No external assets required. Generates cyber-sounds dynamically.
const playSound = (type: 'hover' | 'click' | 'success' | 'error' | 'access' | 'boot') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    switch (type) {
      case 'hover':
        // High, short blip
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
      case 'click':
        // Mechanical click
        osc.type = 'square';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
        break;
      case 'success':
        // Ascending dreamy chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.1); // C#
        osc.frequency.setValueAtTime(659.25, now + 0.2); // E
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
        break;
      case 'error':
        // Low buzz/sawtooth
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.3);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        break;
      case 'access':
        // High-tech computing sound
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.2);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
      case 'boot':
        // Deep power-up
        osc.type = 'square';
        osc.frequency.setValueAtTime(50, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 1.5);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0, now + 1.5);
        osc.start(now);
        osc.stop(now + 1.5);
        break;
    }
  } catch (e) {
    console.error("Audio system failure", e);
  }
};

/* --- 2. TYPES & CONTEXT --- */
type ToastType = 'info' | 'success' | 'warning' | 'error' | 'system';

interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
}

interface SystemContextType {
  toast: {
    info: (msg: string, title?: string) => void;
    success: (msg: string, title?: string) => void;
    warning: (msg: string, title?: string) => void;
    error: (msg: string, title?: string) => void;
    system: (msg: string, title?: string) => void;
  };
  sounds: {
    hover: () => void;
    click: () => void;
    success: () => void;
    error: () => void;
    play: (type: 'hover' | 'click' | 'success' | 'error' | 'access' | 'boot') => void;
  };
}

const SystemContext = createContext<SystemContextType | null>(null);

/* --- 3. TOAST COMPONENT --- */
const ToastItem: React.FC<{ toast: ToastMessage; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Entrance sound
    if (toast.type === 'error') playSound('error');
    else if (toast.type === 'success') playSound('success');
    else playSound('access');

    const timer = setTimeout(() => {
      handleExit();
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => onRemove(toast.id), 400); // Wait for animation
  };

  const getStyle = () => {
    switch (toast.type) {
      case 'success': return 'border-emerald-500/50 bg-emerald-950/80 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
      case 'error': return 'border-red-500/50 bg-red-950/80 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
      case 'warning': return 'border-amber-500/50 bg-amber-950/80 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]';
      case 'system': return 'border-gold/50 bg-[#1a1500]/90 text-gold shadow-[0_0_15px_rgba(191,149,63,0.2)]';
      default: return 'border-cyan-500/50 bg-cyan-950/80 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]';
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success': return <CheckCircle2 size={18} />;
      case 'error': return <ShieldAlert size={18} />;
      case 'warning': return <AlertTriangle size={18} />;
      case 'system': return <Terminal size={18} />;
      default: return <Info size={18} />;
    }
  };

  return (
    <div className={`
      relative w-80 p-4 border rounded-sm backdrop-blur-md overflow-hidden transition-all duration-500 ease-out mb-3 group cursor-pointer
      ${getStyle()}
      ${isExiting ? 'translate-x-[120%] opacity-0' : 'translate-x-0 opacity-100'}
    `} onClick={handleExit}>
      <div className="absolute top-0 left-0 w-1 h-full bg-current opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
      
      <div className="flex items-start gap-3 relative z-10">
        <div className="mt-0.5 shrink-0 animate-pulse">{getIcon()}</div>
        <div className="flex-grow">
          <h4 className="text-[10px] font-mono uppercase tracking-widest font-bold opacity-80 mb-1">{toast.title}</h4>
          <p className="text-xs font-serif leading-relaxed text-white/90">{toast.message}</p>
        </div>
        <button className="text-white/20 hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); handleExit(); }}>
          <X size={14} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-current opacity-30 w-full animate-progress origin-left" style={{ animationDuration: `${toast.duration || 3000}ms` }} />
      
      <style>{`
        @keyframes progress { from { transform: scaleX(1); } to { transform: scaleX(0); } }
        .animate-progress { animation-timing-function: linear; }
      `}</style>
    </div>
  );
};

/* --- 4. BOOT SEQUENCE COMPONENT --- */
export const SystemBoot: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    playSound('boot');
    
    const sequence = [
      { t: 200, msg: "INITIALIZING KERNEL..." },
      { t: 400, msg: "LOADING NEURAL INTERFACE v2.4.1" },
      { t: 800, msg: "CONNECTING TO SYNDICATE NETWORK..." },
      { t: 1200, msg: "ENCRYPTING CONNECTION [256-BIT]... OK" },
      { t: 1600, msg: "SYNCING ASSETS... 1,402 FILES FOUND" },
      { t: 2000, msg: "BYPASSING FIREWALL... SUCCESS" },
      { t: 2400, msg: "ACCESS GRANTED. WELCOME, OPERATIVE." }
    ];

    let timeouts: number[] = [];

    sequence.forEach(({ t, msg }) => {
      const id = window.setTimeout(() => {
        setLogs(prev => [...prev, msg]);
        playSound('click');
      }, t);
      timeouts.push(id);
    });

    const finalId = window.setTimeout(() => {
      setIsComplete(true);
      setTimeout(onComplete, 800); // Fade out time
    }, 3000);
    timeouts.push(finalId);

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center font-mono transition-opacity duration-800 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="w-full max-w-lg p-8 space-y-4">
        <div className="flex items-center gap-4 text-emerald-500 mb-8 animate-pulse">
           <Wifi size={32} />
           <span className="text-xl font-bold tracking-[0.3em]">SYSTEM_BOOT</span>
        </div>
        <div className="h-64 flex flex-col justify-end space-y-2 overflow-hidden border-l-2 border-emerald-900/50 pl-6 relative">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none" />
           {logs.map((log, i) => (
             <div key={i} className="text-xs text-emerald-500/80 tracking-wider animate-fade-in-up">
               <span className="opacity-50 mr-3">[{new Date().toLocaleTimeString('en-GB')}]</span>
               {log}
             </div>
           ))}
           <div className="w-2 h-4 bg-emerald-500 animate-pulse" />
        </div>
        <div className="w-full h-1 bg-emerald-900/30 rounded-full overflow-hidden mt-8">
           <div className="h-full bg-emerald-500 animate-loading-bar-turbo" style={{ animationDuration: '3s' }} />
        </div>
      </div>
    </div>
  );
};

/* --- 5. SYSTEM PROVIDER --- */
export const SystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((type: ToastType, message: string, title?: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    const defaultTitle = type.toUpperCase();
    setToasts(prev => [...prev, { id, type, message, title: title || defaultTitle, duration: 4000 }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const api = {
    toast: {
      info: (msg: string, title?: string) => addToast('info', msg, title),
      success: (msg: string, title?: string) => addToast('success', msg, title),
      warning: (msg: string, title?: string) => addToast('warning', msg, title),
      error: (msg: string, title?: string) => addToast('error', msg, title),
      system: (msg: string, title?: string) => addToast('system', msg, title),
    },
    sounds: {
      hover: () => playSound('hover'),
      click: () => playSound('click'),
      success: () => playSound('success'),
      error: () => playSound('error'),
      play: playSound
    }
  };

  return (
    <SystemContext.Provider value={api}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-24 right-6 z-[9000] flex flex-col items-end pointer-events-none">
        <div className="pointer-events-auto">
          {toasts.map(toast => (
            <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
        </div>
      </div>
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
};
