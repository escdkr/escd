
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, 
  Calculator, 
  TrendingUp, 
  RefreshCw, 
  AlertTriangle,
  Zap,
  DollarSign,
  Briefcase,
  Activity,
  Lock,
  MousePointer2
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
    glitchRevenue: 50, // Automated revenue in 10,000 KRW (Start with some value for visual)
    reinvestRate: 50 // Reinvestment rate percentage
  });
  
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0); // For animation frame
  const [freedomPoint, setFreedomPoint] = useState<number | null>(null);

  // --- REAL-TIME CALCULATION ENGINE ---
  const chartData = useMemo(() => {
    const months = 120; // 10 Years visualization
    const data = [];
    let capital = 0;
    let laborIncome = inputs.monthlyWage;
    let systemIncome = inputs.glitchRevenue;
    let freedomMonth = null;

    for (let i = 0; i <= months; i++) {
      // 1. Labor Income: Static (Realistically stagnates)
      const currentLabor = laborIncome;

      // 2. System Income: Compounds based on reinvestment
      const netSavings = currentLabor - inputs.monthlyExpense;
      const investable = netSavings + systemIncome;
      
      // Compound Logic: Reinvested portion grows @ 5% monthly (Aggressive Glitch Logic)
      // Non-reinvested portion is consumed or safe kept
      const reinvestAmount = investable * (inputs.reinvestRate / 100);
      
      // System income grows as capital grows
      const monthlyReturn = reinvestAmount * 0.05; // 5% monthly ROI on new capital
      systemIncome += monthlyReturn;

      // Check Freedom Point (System Income > Expenses)
      if (freedomMonth === null && systemIncome >= inputs.monthlyExpense) {
        freedomMonth = i;
      }

      data.push({
        month: i,
        labor: currentLabor,
        system: systemIncome,
        expense: inputs.monthlyExpense
      });
    }
    return { data, freedomMonth };
  }, [inputs]);

  useEffect(() => {
    setFreedomPoint(chartData.freedomMonth);
  }, [chartData]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 0 }).format(val * 10000);
  };

  const runSimulation = () => {
    sounds.play('boot');
    setIsSimulating(true);
    setSimulationStep(0);

    const interval = setInterval(() => {
      setSimulationStep(prev => prev + 1);
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      setIsSimulating(false);
      setSimulationStep(100); // Complete
      
      if (chartData.freedomMonth) {
          const years = (chartData.freedomMonth / 12).toFixed(1);
          sounds.play('success');
          toast.success(`Freedom Coordinate Found: T-${years} Years`, "OPTIMAL PATH");
      } else {
          sounds.error();
          toast.warning("Escape Velocity Not Reached. Increase Glitch Revenue.", "WARNING");
      }
    }, 2000);
  };

  // --- SVG CHART HELPERS ---
  const width = 600;
  const height = 300;
  const padding = 40;
  const maxVal = Math.max(...chartData.data.map(d => Math.max(d.labor, d.system, d.expense))) * 1.2;
  
  const getX = (month: number) => padding + (month / 120) * (width - padding * 2);
  const getY = (val: number) => height - padding - (val / maxVal) * (height - padding * 2);

  const laborPath = chartData.data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.month)} ${getY(d.labor)}`).join(' ');
  const systemPath = chartData.data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.month)} ${getY(d.system)}`).join(' ');
  const expensePath = chartData.data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.month)} ${getY(d.expense)}`).join(' ');

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#10b981_0%,_transparent_20%)] opacity-10 pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

      {/* Header */}
      <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md relative z-20">
         <div className="flex items-center gap-4">
            <div className="p-2 bg-emerald-500/10 rounded-sm border border-emerald-500/20">
                <Calculator size={20} className="text-emerald-500" />
            </div>
            <div>
               <h1 className="text-lg font-serif font-black tracking-tight uppercase text-white">The Oracle</h1>
               <p className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">Financial Future Simulator // v3.0</p>
            </div>
         </div>
         <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-mono text-white/40 hover:text-white uppercase tracking-widest border border-white/10 px-4 py-2 rounded-sm transition-all hover:border-white/30">
            <ArrowLeft size={12} /> Dashboard
         </button>
      </header>

      <main className="flex-grow flex flex-col lg:flex-row max-w-7xl mx-auto w-full p-6 md:p-12 gap-12 relative z-10">
        
        {/* Left: Input Console */}
        <div className="w-full lg:w-1/3 space-y-8 animate-fade-in-up">
           <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-sm space-y-10 relative overflow-hidden group shadow-2xl">
              {/* Scanline */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-20 animate-scan-fast pointer-events-none" />
              
              {/* Section 1: The Trap */}
              <div className="space-y-6">
                <h3 className="text-xs font-mono tracking-[0.3em] uppercase text-red-400 border-b border-white/5 pb-2 flex items-center gap-2">
                    <Lock size={12} /> Current Reality (Trap)
                </h3>
                
                <div className="space-y-5">
                   <InputSlider 
                      label="노동 소득 (Monthly Wage)" 
                      value={inputs.monthlyWage} 
                      min={0} max={2000} step={10}
                      icon={<Briefcase size={12} />}
                      color="text-white"
                      onChange={(v) => setInputs({...inputs, monthlyWage: v})}
                   />
                   <InputSlider 
                      label="생존 비용 (Burn Rate)" 
                      value={inputs.monthlyExpense} 
                      min={0} max={1500} step={10}
                      icon={<AlertTriangle size={12} />}
                      color="text-red-400"
                      onChange={(v) => setInputs({...inputs, monthlyExpense: v})}
                   />
                </div>
              </div>

              {/* Section 2: The Escape */}
              <div className="space-y-6">
                <h3 className="text-xs font-mono tracking-[0.3em] uppercase text-emerald-400 border-b border-white/5 pb-2 flex items-center gap-2">
                    <Zap size={12} /> Glitch Variables
                </h3>
                
                <div className="space-y-5">
                   <InputSlider 
                      label="시스템 자동 수익 (System Revenue)" 
                      value={inputs.glitchRevenue} 
                      min={0} max={5000} step={50}
                      icon={<Activity size={12} />}
                      color="text-emerald-400"
                      onChange={(v) => setInputs({...inputs, glitchRevenue: v})}
                   />
                   <InputSlider 
                      label="재투자 비율 (Compound Rate)" 
                      value={inputs.reinvestRate} 
                      min={0} max={100} step={5}
                      icon={<TrendingUp size={12} />}
                      color="text-gold"
                      unit="%"
                      onChange={(v) => setInputs({...inputs, reinvestRate: v})}
                   />
                </div>
              </div>

              <Button 
                onClick={runSimulation}
                className={`w-full py-5 bg-emerald-500 text-black font-black uppercase tracking-widest border-none hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all ${isSimulating ? 'opacity-80 pointer-events-none' : ''}`}
              >
                {isSimulating ? <RefreshCw className="animate-spin mx-auto" size={20} /> : 'SIMULATE FUTURE'}
              </Button>
           </div>
        </div>

        {/* Right: Holographic Visualization */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6 animate-fade-in">
           
           {/* Graph Screen */}
           <div className="flex-grow bg-[#050505] border border-white/10 rounded-sm relative overflow-hidden min-h-[450px] flex flex-col shadow-inner">
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none" />
              
              {/* Chart Header */}
              <div className="absolute top-6 left-8 right-8 flex justify-between items-start z-10 pointer-events-none">
                 <div>
                    <h3 className="text-xl font-serif font-black text-white uppercase tracking-tight">Financial Projection</h3>
                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mt-1">
                        Timeline: 10 Years // Model: Exponential Growth
                    </p>
                 </div>
                 <div className="text-right">
                    <span className="block text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Projected Passive Income (10y)</span>
                    <span className="text-2xl font-mono font-bold text-emerald-400 tracking-tighter">
                       {formatCurrency(chartData.data[chartData.data.length - 1].system)}
                    </span>
                 </div>
              </div>

              {/* THE CHART (SVG) */}
              <div className="absolute inset-0 flex items-center justify-center p-8 pt-20">
                 <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                    {/* Axes */}
                    <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="#333" strokeWidth="1" />
                    <line x1={padding} y1={padding} x2={padding} y2={height-padding} stroke="#333" strokeWidth="1" />
                    
                    {/* Simulation Effect (Random Noise Lines) */}
                    {isSimulating && Array.from({length: 5}).map((_, i) => (
                        <path 
                            key={i}
                            d={`M ${padding} ${height-padding} Q ${width/2} ${height - padding - (Math.random() * 200)} ${width-padding} ${height - padding - (Math.random() * 250)}`}
                            fill="none"
                            stroke="rgba(16, 185, 129, 0.1)"
                            strokeWidth="1"
                            className="animate-pulse"
                        />
                    ))}

                    {/* Data Lines */}
                    {!isSimulating && (
                        <>
                            {/* Expense Line (Dotted Red) */}
                            <path d={expensePath} fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                            
                            {/* Labor Income Line (Grey) */}
                            <path d={laborPath} fill="none" stroke="#52525b" strokeWidth="2" />
                            
                            {/* System Income Line (Glowing Emerald) */}
                            <path 
                                d={systemPath} 
                                fill="none" 
                                stroke="#10b981" 
                                strokeWidth="3" 
                                filter="url(#glow)"
                                className="animate-draw-path"
                            />
                            
                            {/* Freedom Point Marker */}
                            {freedomPoint && (
                                <g className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                                    <circle cx={getX(freedomPoint)} cy={getY(inputs.monthlyExpense)} r="6" fill="#10b981" stroke="white" strokeWidth="2" />
                                    <line x1={getX(freedomPoint)} y1={getY(inputs.monthlyExpense)} x2={getX(freedomPoint)} y2={height-padding} stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
                                    <text x={getX(freedomPoint)} y={getY(inputs.monthlyExpense) - 15} textAnchor="middle" fill="#10b981" fontSize="10" fontFamily="monospace" fontWeight="bold">
                                        FREEDOM
                                    </text>
                                    <text x={getX(freedomPoint)} y={height - padding + 15} textAnchor="middle" fill="#666" fontSize="9" fontFamily="monospace">
                                        {(freedomPoint/12).toFixed(1)}Y
                                    </text>
                                </g>
                            )}
                        </>
                    )}

                    {/* Defs for Glow */}
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>
                 </svg>
              </div>
           </div>

           {/* Metrics Grid */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <SummaryBox 
                 label="Monthly Cashflow" 
                 value={formatCurrency(inputs.monthlyWage + inputs.glitchRevenue - inputs.monthlyExpense)}
                 sub="Disposable Income"
              />
              <SummaryBox 
                 label="Labor Ratio" 
                 value={`${Math.round((inputs.monthlyWage / (inputs.monthlyWage + inputs.glitchRevenue)) * 100)}%`}
                 sub="Target: 0%"
                 color={inputs.monthlyWage > inputs.glitchRevenue ? 'red' : 'white'}
              />
              <SummaryBox 
                 label="System Ratio" 
                 value={`${Math.round((inputs.glitchRevenue / (inputs.monthlyWage + inputs.glitchRevenue)) * 100)}%`}
                 sub="Target: 100%"
                 color="emerald"
                 icon={<Zap size={10} className="text-emerald-500"/>}
              />
              <SummaryBox 
                 label="Freedom Status" 
                 value={freedomPoint ? "ACHIEVED" : "SLAVE"} 
                 sub={freedomPoint ? `In ${(freedomPoint/12).toFixed(1)} Years` : "Never"}
                 color={freedomPoint ? 'gold' : 'red'}
              />
           </div>
        </div>

      </main>

      <style>{`
         .animate-draw-path {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: draw 2s ease-out forwards;
         }
         @keyframes draw {
            to { stroke-dashoffset: 0; }
         }
         @keyframes scan-fast {
            0% { top: 0; }
            100% { top: 100%; }
         }
         .animate-scan-fast { animation: scan-fast 2s linear infinite; }
      `}</style>
    </div>
  );
};

const InputSlider: React.FC<{ 
    label: string, 
    value: number, 
    min: number, 
    max: number, 
    step: number, 
    icon: React.ReactNode, 
    color: string, 
    unit?: string,
    onChange: (val: number) => void 
}> = ({ label, value, min, max, step, icon, color, unit = '원', onChange }) => {
    // Helper to format large numbers
    const displayValue = unit === '원' 
        ? new Intl.NumberFormat('ko-KR', { notation: "compact", maximumFractionDigits: 1 }).format(value * 10000)
        : `${value}`;

    return (
        <div className="space-y-3 group">
            <div className="flex justify-between text-xs font-bold tracking-tight">
                <span className={`flex items-center gap-2 ${color} opacity-80 uppercase tracking-wider`}>
                    {icon} {label}
                </span>
                <span className={`font-mono text-sm ${color} group-hover:scale-110 transition-transform`}>
                    {displayValue}{unit !== '%' && unit}
                    {unit === '%' && '%'}
                </span>
            </div>
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                    className={`absolute top-0 left-0 h-full ${color.replace('text-', 'bg-')} opacity-80`} 
                    style={{ width: `${(value / max) * 100}%` }}
                />
                <input 
                    type="range" min={min} max={max} step={step}
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
        </div>
    );
};

const SummaryBox: React.FC<{ label: string, value: string, sub: string, color?: 'red' | 'gold' | 'emerald' | 'white', icon?: React.ReactNode }> = ({ label, value, sub, color = 'white', icon }) => {
  const colorClasses = {
    red: 'text-red-500 border-red-900/30 bg-red-900/10',
    gold: 'text-gold border-gold/30 bg-gold/5',
    emerald: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
    white: 'text-white border-white/10 bg-white/5'
  };

  return (
    <div className={`border p-4 rounded-sm flex flex-col justify-between h-24 ${colorClasses[color]}`}>
       <span className="flex items-center gap-2 text-[9px] font-mono opacity-70 uppercase tracking-widest">
          {icon} {label}
       </span>
       <div>
          <span className="block font-serif font-black text-xl tracking-tight leading-none mb-1">{value}</span>
          <span className="block text-[8px] font-mono opacity-50 uppercase tracking-widest">{sub}</span>
       </div>
    </div>
  );
};
