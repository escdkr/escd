import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Calculator, 
  TrendingUp, 
  RefreshCw, 
  AlertTriangle,
  Zap,
  Target,
  DollarSign,
  Briefcase,
  Activity
} from 'lucide-react';
import { UserProfile } from '../App';
import { Button } from './Button';
import { useSystem } from './SystemCore';

interface OracleProps {
  onBack: () => void;
  user: UserProfile | null;
}

export const Oracle: React.FC<OracleProps> = ({ onBack, user }) => {
  const { toast, sounds } = useSystem();
  const [inputs, setInputs] = useState({
    monthlyWage: 300, // Monthly salary in 10,000 KRW
    monthlyExpense: 200, // Monthly expense in 10,000 KRW
    glitchRevenue: 0, // Automated revenue in 10,000 KRW
    reinvestRate: 50 // Reinvestment rate percentage
  });
  
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<{ yearsToFreedom: number | string; freedomAge: number; status: 'slave' | 'free' | 'tycoon' } | null>(null);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('ko-KR').format(val * 10000);
  };

  const calculateFreedom = () => {
    sounds.click();
    setIsSimulating(true);
    setResult(null);

    // Simulation delay
    setTimeout(() => {
      const netSavings = inputs.monthlyWage - inputs.monthlyExpense;
      const totalMonthlyInvest = netSavings + inputs.glitchRevenue;
      
      // Target: Monthly passive income > Monthly Expense * 2 (Safety margin)
      const targetMonthlyPassive = inputs.monthlyExpense * 2;
      
      // Simple compounding logic for simulation
      // Assuming 'Glitch' method yields 5% monthly return on invested capital (aggressive)
      // Standard savings yields 0.3% monthly
      
      let capital = 0;
      let months = 0;
      const MAX_MONTHS = 600; // 50 years cap

      while (months < MAX_MONTHS) {
        // Accrue interest (Hybrid model: Glitch capital grows faster)
        const glitchPortion = capital * (inputs.reinvestRate / 100);
        const safePortion = capital * ((100 - inputs.reinvestRate) / 100);
        
        const glitchReturn = glitchPortion * 0.05; // 5% monthly
        const safeReturn = safePortion * 0.003; // 0.3% monthly
        
        const monthlyPassive = glitchReturn + safeReturn;
        
        if (monthlyPassive >= targetMonthlyPassive) {
          break;
        }

        capital += totalMonthlyInvest + monthlyPassive;
        months++;
      }

      const years = (months / 12).toFixed(1);
      
      let status: 'slave' | 'free' | 'tycoon' = 'slave';
      if (months < 12) status = 'tycoon';
      else if (months < 120) status = 'free'; // < 10 years
      
      setResult({
        yearsToFreedom: months >= MAX_MONTHS ? "FOREVER" : years,
        freedomAge: 30 + Math.floor(months / 12), // Assuming current age 30
        status
      });

      setIsSimulating(false);
      
      if (months >= MAX_MONTHS) {
          sounds.error();
          toast.error("System Failure: Financial Freedom Not Found in this timeline.", "SIMULATION FAILED");
      } else {
          sounds.success();
          toast.success(`Optimal Path Found: Freedom in ${years} years.`, "SIMULATION COMPLETE");
      }

    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md relative z-20">
         <div className="flex items-center gap-4">
            <Calculator size={24} className="text-emerald-500" />
            <div>
               <h1 className="text-lg font-serif font-black tracking-tight uppercase text-white">The Oracle</h1>
               <p className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">Future Revenue Simulator // Ver 2.0</p>
            </div>
         </div>
         <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-mono text-white/40 hover:text-white uppercase tracking-widest border border-white/10 px-4 py-2 rounded-sm transition-all hover:border-white/30">
            <ArrowLeft size={12} /> Return to Dashboard
         </button>
      </header>

      <main className="flex-grow flex flex-col lg:flex-row max-w-7xl mx-auto w-full p-6 md:p-12 gap-12 relative z-10">
        
        {/* Left: Control Panel */}
        <div className="w-full lg:w-1/3 space-y-8">
           <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-sm space-y-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity" />
              
              <div className="space-y-6">
                <h3 className="text-sm font-mono tracking-widest uppercase text-white/40 border-b border-white/5 pb-2">Reality Parameters (Current)</h3>
                
                <div className="space-y-4">
                   <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-white/80">
                         <span className="flex items-center gap-2"><Briefcase size={12} /> 노동 소득 (월급)</span>
                         <span className="font-mono text-emerald-400">{formatCurrency(inputs.monthlyWage)}</span>
                      </div>
                      <input 
                        type="range" min="0" max="2000" step="10"
                        value={inputs.monthlyWage}
                        onChange={(e) => setInputs({...inputs, monthlyWage: parseInt(e.target.value)})}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400"
                      />
                   </div>

                   <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-white/80">
                         <span className="flex items-center gap-2"><DollarSign size={12} /> 생존 비용 (생활비)</span>
                         <span className="font-mono text-red-400">-{formatCurrency(inputs.monthlyExpense)}</span>
                      </div>
                      <input 
                        type="range" min="0" max="2000" step="10"
                        value={inputs.monthlyExpense}
                        onChange={(e) => setInputs({...inputs, monthlyExpense: parseInt(e.target.value)})}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-red-500 hover:accent-red-400"
                      />
                   </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-mono tracking-widest uppercase text-gold/40 border-b border-white/5 pb-2">Glitch Parameters (Future)</h3>
                
                <div className="space-y-4">
                   <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-white/80">
                         <span className="flex items-center gap-2 text-gold"><Zap size={12} /> 시스템 자동 수익</span>
                         <span className="font-mono text-gold">{formatCurrency(inputs.glitchRevenue)}</span>
                      </div>
                      <input 
                        type="range" min="0" max="5000" step="50"
                        value={inputs.glitchRevenue}
                        onChange={(e) => setInputs({...inputs, glitchRevenue: parseInt(e.target.value)})}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold hover:accent-yellow-300"
                      />
                   </div>

                   <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-white/80">
                         <span className="flex items-center gap-2"><TrendingUp size={12} /> 재투자 비율</span>
                         <span className="font-mono text-white">{inputs.reinvestRate}%</span>
                      </div>
                      <input 
                        type="range" min="0" max="100" step="5"
                        value={inputs.reinvestRate}
                        onChange={(e) => setInputs({...inputs, reinvestRate: parseInt(e.target.value)})}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400"
                      />
                   </div>
                </div>
              </div>

              <Button 
                onClick={calculateFreedom}
                className="w-full py-4 bg-emerald-500 text-black font-black uppercase tracking-widest border-none hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                disabled={isSimulating}
              >
                {isSimulating ? <RefreshCw className="animate-spin mx-auto" size={20} /> : 'Run Simulation'}
              </Button>
           </div>
        </div>

        {/* Right: Visualization & Verdict */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
           
           {/* Visualizer Screen */}
           <div className="flex-grow bg-[#050505] border border-white/10 rounded-sm relative overflow-hidden min-h-[400px] flex items-center justify-center">
              <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,.03)_25%,rgba(255,255,255,.03)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.03)_75%,rgba(255,255,255,.03)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,255,255,.03)_25%,rgba(255,255,255,.03)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.03)_75%,rgba(255,255,255,.03)_76%,transparent_77%,transparent)] bg-[length:50px_50px] pointer-events-none" />
              
              {!result && !isSimulating && (
                 <div className="text-center space-y-4 opacity-30">
                    <Activity size={48} className="mx-auto text-white" />
                    <p className="font-mono text-xs uppercase tracking-widest">Awaiting Input Parameters...</p>
                 </div>
              )}

              {isSimulating && (
                 <div className="text-center space-y-6 w-full px-12">
                    <div className="font-mono text-emerald-500 text-xs tracking-widest uppercase animate-pulse">Calculating Escape Velocity...</div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 animate-loading-bar-turbo" />
                    </div>
                    <div className="font-mono text-[10px] text-white/30 h-20 overflow-hidden text-left font-light leading-relaxed">
                       {Array(5).fill(0).map((_, i) => (
                          <div key={i}>Processing Vector {Math.random().toFixed(4)}... OK</div>
                       ))}
                    </div>
                 </div>
              )}

              {result && !isSimulating && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center p-8 animate-fade-in-up">
                    <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black/50 backdrop-blur-sm ${
                        result.status === 'slave' ? 'border-red-500 text-red-500 shadow-red-900/50' : 
                        result.status === 'free' ? 'border-emerald-500 text-emerald-500 shadow-emerald-900/50' : 
                        'border-gold text-gold shadow-gold/50'
                    }`}>
                       <span className="font-serif font-black text-4xl">{result.yearsToFreedom}</span>
                       {result.status !== 'tycoon' && <span className="text-[10px] font-mono absolute mt-12 font-bold">YEARS</span>}
                    </div>

                    <div className="text-center space-y-2">
                       <h2 className={`text-4xl font-black uppercase tracking-tighter ${
                          result.status === 'slave' ? 'text-red-500' : 
                          result.status === 'free' ? 'text-white' : 
                          'text-gold'
                       }`}>
                          {result.status === 'slave' ? 'SYSTEM PRISONER' : 
                           result.status === 'free' ? 'ESCAPE SUCCESSFUL' : 
                           'EMPIRE BUILDER'}
                       </h2>
                       <p className="text-white/60 font-serif italic max-w-md mx-auto">
                          {result.status === 'slave' 
                             ? "경고: 현재 속도로는 시스템을 탈출할 수 없습니다. 당신은 평생 노동 소득에 의존하며, 은퇴 후 빈곤층으로 전락할 확률이 94%입니다." 
                             : result.status === 'free' 
                             ? `축하합니다. 당신은 ${result.freedomAge}세에 경제적 자유를 얻습니다. 시스템의 결함을 성공적으로 활용했습니다.`
                             : "압도적입니다. 당신은 시스템을 지배하는 설계자입니다. 돈이 당신을 위해 일하는 속도가 빛보다 빠릅니다."
                          }
                       </p>
                    </div>

                    {result.status === 'slave' && (
                       <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-red-900/20 border border-red-500/30 rounded-sm">
                          <AlertTriangle size={16} className="text-red-500" />
                          <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-bold">Critical: Need more glitch revenue</span>
                       </div>
                    )}
                 </div>
              )}
           </div>

           {/* Metrics Summary Grid */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <SummaryBox label="Monthly Net" value={formatCurrency(inputs.monthlyWage - inputs.monthlyExpense)} />
              <SummaryBox label="Annual Burn" value={formatCurrency(inputs.monthlyExpense * 12)} color="red" />
              <SummaryBox label="Glitch Power" value={formatCurrency(inputs.glitchRevenue * 12)} color="gold" />
              <SummaryBox label="Projected CAGR" value={`${(inputs.reinvestRate * 0.2 + 3).toFixed(1)}%`} color="emerald" />
           </div>
        </div>

      </main>

      <style>{`
         .animate-loading-bar-turbo { animation: loading-bar-turbo 1.0s ease-in-out infinite; }
         @keyframes loading-bar-turbo { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  );
};

const SummaryBox: React.FC<{ label: string, value: string, color?: 'red' | 'gold' | 'emerald' | 'white' }> = ({ label, value, color = 'white' }) => {
  const colorClasses = {
    red: 'text-red-400',
    gold: 'text-gold',
    emerald: 'text-emerald-400',
    white: 'text-white'
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/5 p-4 rounded-sm">
       <span className="block text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">{label}</span>
       <span className={`block font-serif font-bold text-lg ${colorClasses[color]}`}>{value}</span>
    </div>
  );
};