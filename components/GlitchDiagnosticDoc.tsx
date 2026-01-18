
import React, { useState, useEffect } from 'react';
import { X, Activity, AlertTriangle, Calculator, Check, ChevronRight, RefreshCw, ShieldAlert, Terminal, Lock, ArrowDown, Zap, Bot, Brain, TrendingDown } from 'lucide-react';
import { Button } from './Button';

interface GlitchDiagnosticDocProps {
  onClose: () => void;
  onCheckout: () => void;
}

type StepType = 'intro' | 'q1' | 'q2' | 'q3' | 'q4' | 'ai_intro' | 'ai_q1' | 'ai_analyzing' | 'ai_warning' | 'calculating' | 'result';

export const GlitchDiagnosticDoc: React.FC<GlitchDiagnosticDocProps> = ({ onClose, onCheckout }) => {
  const [step, setStep] = useState<StepType>('intro');
  const [score, setScore] = useState(0);
  const [aiRisk, setAiRisk] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [showOffer, setShowOffer] = useState(false);

  // Simulation for calculation phase
  useEffect(() => {
    if (step === 'calculating') {
      const texts = [
        "MERGING DATA STREAMS...",
        "CALCULATING FREEDOM INDEX...",
        "FINALIZING DIAGNOSIS..."
      ];
      let i = 0;
      const interval = setInterval(() => {
        setLoadingText(texts[i]);
        i++;
        if (i >= texts.length) {
          clearInterval(interval);
          setTimeout(() => setStep('result'), 800);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [step]);

  // AI Analyzing Simulation
  useEffect(() => {
    if (step === 'ai_analyzing') {
        const texts = [
            "ACCESSING GLOBAL JOB DATABASE...",
            "COMPARING HUMAN VS AI EFFICIENCY...",
            "SIMULATING 2027 WORKFORCE...",
            "DETECTING INCOME COLLAPSE POINT..."
        ];
        let i = 0;
        const interval = setInterval(() => {
            setLoadingText(texts[i]);
            i++;
            if (i >= texts.length) {
                clearInterval(interval);
                setTimeout(() => setStep('ai_warning'), 800);
            }
        }, 800);
        return () => clearInterval(interval);
    }
  }, [step]);

  // Effect to delay the offer reveal
  useEffect(() => {
    if (step === 'result') {
      setTimeout(() => setShowOffer(true), 1500);
    }
  }, [step]);

  const handleAnswer = (value: number) => {
    setScore(prev => prev + value);
    if (step === 'q1') setStep('q2');
    else if (step === 'q2') setStep('q3');
    else if (step === 'q3') setStep('q4');
    else if (step === 'q4') setStep('ai_intro'); // Transition to AI Section
  };

  const handleAiAnswer = (risk: number) => {
      setAiRisk(risk);
      setStep('ai_analyzing');
  };

  const reset = () => {
    setStep('intro');
    setScore(0);
    setAiRisk(0);
    setShowOffer(false);
  };

  const handleConversion = () => {
    alert("[SYSTEM] 진단 완료 혜택: VIP 시크릿 코드가 적용되었습니다.");
    onCheckout();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/95 backdrop-blur-xl animate-fade-in p-4 pt-24 md:p-8 md:pt-28 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] shadow-[0_0_100px_rgba(34,211,238,0.2)] border border-cyan-900/40 flex flex-col min-h-[600px] rounded-sm overflow-hidden mb-20">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-900/30 bg-[#050505] relative z-20">
          <div className="flex items-center gap-3">
            <Activity size={18} className="text-cyan-400 animate-pulse" />
            <span className="text-cyan-400 font-mono text-xs tracking-[0.2em] uppercase font-bold">System Diagnostic Tool v2.4</span>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-cyan-400 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-grow flex flex-col p-8 md:p-12 relative">
          {/* Background Grid */}
          <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
          
          <div className="flex-grow flex flex-col justify-center items-center text-center relative z-10 space-y-8">
            
            {/* STEP: INTRO */}
            {step === 'intro' && (
              <div className="space-y-8 animate-fade-in">
                <div className="w-24 h-24 bg-cyan-900/20 border border-cyan-500/30 rounded-full flex items-center justify-center mx-auto relative">
                   <div className="absolute inset-0 border-t-2 border-cyan-500 rounded-full animate-spin" />
                   <Calculator size={40} className="text-cyan-400" />
                </div>
                <div className="space-y-4">
                   <h2 className="text-3xl font-black text-white font-serif tracking-tight">노동 의존도 & 미래 생존율 진단</h2>
                   <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                      당신이 자본주의 시스템의 '주인'인지, 아니면 곧 폐기될 '부품'인지 판별합니다.
                      감정을 배제하고 사실대로 응답하십시오.
                   </p>
                </div>
                <Button onClick={() => setStep('q1')} className="bg-cyan-500 text-black border-none font-bold tracking-widest px-12 py-4 hover:bg-cyan-400">
                   진단 시작하기
                </Button>
              </div>
            )}

            {/* STEP: BASIC QUESTIONS */}
            {(step === 'q1' || step === 'q2' || step === 'q3' || step === 'q4') && (
               <div className="w-full max-w-lg space-y-10 animate-fade-in-up">
                  <div className="flex justify-between items-center text-[10px] font-mono text-cyan-500/60 uppercase tracking-widest border-b border-white/5 pb-4">
                     <span>Phase 1: Present Labor Analysis</span>
                     <span>Step {step.replace('q', '')} / 4</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight font-serif">
                     {step === 'q1' && "당신이 오늘 당장 일을 멈춘다면, 소득도 즉시 0원이 됩니까?"}
                     {step === 'q2' && "당신이 잠을 자거나 여행을 간 사이에도 입금 알림이 울립니까?"}
                     {step === 'q3' && "소득을 2배로 늘리기 위해, 일하는 시간도 2배로 늘려야 합니까?"}
                     {step === 'q4' && "당신의 수입원은 특정 장소(회사, 가게)에 물리적으로 구속되어 있습니까?"}
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                     {step === 'q1' && (
                        <>
                           <AnswerBtn label="네, 일하지 않으면 돈은 없습니다." value={0} onClick={handleAnswer} />
                           <AnswerBtn label="아니요, 자산 소득이나 시스템 소득이 있습니다." value={25} onClick={handleAnswer} />
                        </>
                     )}
                     {step === 'q2' && (
                        <>
                           <AnswerBtn label="아니요, 제가 깨어서 일할 때만 돈을 법니다." value={0} onClick={handleAnswer} />
                           <AnswerBtn label="네, 자는 동안에도 매출이 발생합니다." value={25} onClick={handleAnswer} />
                        </>
                     )}
                     {step === 'q3' && (
                        <>
                           <AnswerBtn label="네, 시간과 소득이 비례합니다." value={0} onClick={handleAnswer} />
                           <AnswerBtn label="아니요, 한 번 구축하면 복제로 수익을 늘립니다." value={25} onClick={handleAnswer} />
                        </>
                     )}
                     {step === 'q4' && (
                        <>
                           <AnswerBtn label="네, 출근해야만 합니다." value={0} onClick={handleAnswer} />
                           <AnswerBtn label="아니요, 노트북만 있으면 어디서든 가능합니다." value={25} onClick={handleAnswer} />
                        </>
                     )}
                  </div>
               </div>
            )}

            {/* --- NEW AI SECTION START --- */}

            {/* STEP: AI INTRO */}
            {step === 'ai_intro' && (
                <div className="space-y-8 animate-fade-in text-center max-w-lg mx-auto">
                    <div className="w-24 h-24 bg-red-900/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto relative animate-pulse">
                        <Bot size={48} className="text-red-500" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-black text-red-500 font-serif tracking-tight uppercase">Warning: AI Threat Detected</h2>
                        <p className="text-gray-400 leading-relaxed">
                            노동 소득 의존도가 확인되었습니다.<br/>
                            이제 <strong>인공지능(AI)</strong>이 당신의 직업을 얼마나 빨리 대체할지 계산합니다.<br/>
                            이 결과는 매우 충격적일 수 있습니다.
                        </p>
                    </div>
                    <Button onClick={() => setStep('ai_q1')} className="bg-red-600 text-white border-none font-bold tracking-widest px-12 py-4 hover:bg-red-500 w-full animate-pulse-cta">
                        미래 생존율 확인하기
                    </Button>
                </div>
            )}

            {/* STEP: AI QUESTION */}
            {step === 'ai_q1' && (
                <div className="w-full max-w-lg space-y-10 animate-fade-in-up">
                    <div className="flex justify-between items-center text-[10px] font-mono text-red-500/60 uppercase tracking-widest border-b border-white/5 pb-4">
                        <span>Phase 2: Future Obsolescence</span>
                        <span>AI Simulation</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight font-serif">
                        당신의 현재 업무는 다음 중 무엇에 가장 가깝습니까?
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                        <AnswerBtn 
                            label="데이터 분석, 번역, 회계, 법률 검토, 코딩" 
                            value={0} 
                            onClick={() => handleAiAnswer(98)} // High AI Risk
                            subLabel="Cognitive Automation Risk: High"
                        />
                        <AnswerBtn 
                            label="단순 반복 사무, 운전, 배달, 제조" 
                            value={0} 
                            onClick={() => handleAiAnswer(95)} // High Robotics Risk
                            subLabel="Physical Automation Risk: High"
                        />
                        <AnswerBtn 
                            label="디자인, 글쓰기, 영상 편집, 예술 창작" 
                            value={0} 
                            onClick={() => handleAiAnswer(85)} // GenAI Risk
                            subLabel="Generative AI Risk: High"
                        />
                        <AnswerBtn 
                            label="사람을 직접 설득, 협상, 리더십, 전략 수립" 
                            value={0} 
                            onClick={() => handleAiAnswer(40)} // Low Risk but needs leverage
                            subLabel="Human Touch Required"
                        />
                    </div>
                </div>
            )}

            {/* STEP: AI ANALYZING */}
            {step === 'ai_analyzing' && (
               <div className="space-y-6 animate-pulse">
                  <Brain size={48} className="text-red-500 mx-auto" />
                  <div className="font-mono text-red-500 text-sm tracking-[0.2em] uppercase">{loadingText}</div>
                  <div className="w-64 h-1 bg-red-900/30 rounded-full overflow-hidden mx-auto">
                     <div className="h-full bg-red-500 animate-loading-bar-turbo" />
                  </div>
               </div>
            )}

            {/* STEP: AI WARNING (FEAR APPEAL) */}
            {step === 'ai_warning' && (
                <div className="w-full max-w-xl space-y-8 animate-fade-in bg-red-950/10 border border-red-500/20 p-8 rounded-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.1)_0%,_transparent_70%)] animate-pulse pointer-events-none" />
                    
                    <div className="flex items-center justify-center gap-3 text-red-500 mb-4">
                        <ShieldAlert size={32} />
                        <span className="font-mono font-black text-xl tracking-[0.2em] uppercase">CRITICAL ALERT</span>
                    </div>

                    <div className="text-center space-y-2">
                        <h2 className="text-5xl font-black text-white font-mono tracking-tighter">
                            {aiRisk}% <span className="text-lg text-red-400 font-serif font-normal">Replacement Probability</span>
                        </h2>
                        <p className="text-sm font-mono text-red-400/80 uppercase tracking-widest">
                            Estimated Time to Obsolescence: <span className="text-white font-bold underline">3 Years</span>
                        </p>
                    </div>

                    {/* FEAR GRAPH */}
                    <div className="h-32 w-full border-l border-b border-white/20 relative mt-8">
                        {/* Labels */}
                        <span className="absolute -left-6 top-0 text-[8px] text-white/40">Value</span>
                        <span className="absolute right-0 -bottom-4 text-[8px] text-white/40">Time (2024-2030)</span>
                        
                        {/* Human Line (Dropping) */}
                        <div className="absolute inset-0 overflow-hidden">
                            <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                                <path d="M0,20 Q50,30 100,90" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
                                <text x="10" y="30" fontSize="5" fill="#ef4444" className="font-mono">YOU (Labor)</text>
                            </svg>
                        </div>

                        {/* AI Line (Rising) */}
                        <div className="absolute inset-0 overflow-hidden">
                            <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                                <path d="M0,90 Q50,80 100,10" fill="none" stroke="#22d3ee" strokeWidth="2" />
                                <text x="70" y="20" fontSize="5" fill="#22d3ee" className="font-mono">AI (Efficiency)</text>
                            </svg>
                        </div>

                        {/* Death Cross Point */}
                        <div className="absolute top-[50%] left-[55%] w-2 h-2 bg-white rounded-full animate-ping" />
                        <span className="absolute top-[55%] left-[55%] text-[8px] text-white font-bold bg-red-600 px-1">INCOME CLIFF</span>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed font-serif text-left border-t border-red-500/20 pt-6">
                        <strong className="text-white">경고:</strong> 당신이 잠을 자고 휴식하는 동안, AI는 24시간 쉬지 않고 당신의 업무 데이터를 학습하고 있습니다. 
                        단순 노동 소득에 의존한다면, <strong className="text-red-500 underline">2027년 이전에 당신의 소득은 급격히 소멸할 것입니다.</strong>
                        <br/><br/>
                        AI를 이기려 하지 마십시오. <span className="text-cyan-400 font-bold">AI를 부리는 '설계자'</span>가 되어야만 살아남습니다.
                    </p>

                    <Button onClick={() => setStep('calculating')} className="w-full bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 mt-4">
                        최종 생존 전략 확인하기 <ChevronRight size={14} className="ml-1" />
                    </Button>
                </div>
            )}

            {/* STEP: CALCULATING FINAL */}
            {step === 'calculating' && (
               <div className="space-y-6 animate-pulse">
                  <Terminal size={48} className="text-cyan-500 mx-auto" />
                  <div className="font-mono text-cyan-400 text-sm tracking-[0.2em] uppercase">{loadingText}</div>
                  <div className="w-64 h-1 bg-cyan-900/30 rounded-full overflow-hidden mx-auto">
                     <div className="h-full bg-cyan-500 animate-loading-bar-turbo" />
                  </div>
               </div>
            )}

            {/* STEP: RESULT (The Sales Pitch) */}
            {step === 'result' && (
               <div className="w-full max-w-xl space-y-6 animate-fade-in">
                  <div className="border border-white/10 bg-white/5 p-8 rounded-sm relative overflow-hidden">
                     <div className={`absolute top-0 left-0 w-full h-1 ${score > 50 ? 'bg-emerald-500' : 'bg-red-600'}`} />
                     
                     <div className="space-y-6">
                        <div className="flex items-center justify-center gap-3">
                           {score > 50 ? <Check size={24} className="text-emerald-500" /> : <ShieldAlert size={24} className="text-red-600" />}
                           <span className="font-mono text-xs tracking-[0.3em] uppercase text-white/50">Analysis Complete</span>
                        </div>
                        
                        <div className="space-y-2">
                           <h2 className="text-5xl font-black text-white font-mono tracking-tighter">
                              {score}% <span className="text-lg text-gray-500 font-serif font-normal">Survival Score</span>
                           </h2>
                           <p className={`text-xl font-bold uppercase tracking-widest ${score > 50 ? 'text-emerald-400' : 'text-red-600'}`}>
                              {score <= 25 ? "CRITICAL: SYSTEM SLAVE" : score <= 75 ? "WARNING: LABOR TRAP" : "STATUS: ARCHITECT"}
                           </p>
                        </div>

                        {/* Prescriptive Text */}
                        <div className="text-gray-300 leading-relaxed text-sm font-serif border-t border-white/10 pt-6 text-left">
                           {score <= 75 ? (
                              <div className="space-y-4">
                                 <p className="font-bold text-white text-lg">
                                    <span className="text-red-500 mr-2">[진단]</span>
                                    당신은 '시한부 노동자'입니다.
                                 </p>
                                 <p>
                                    현재 당신의 소득 구조는 AI와 인플레이션이라는 두 가지 적에게 완전히 노출되어 있습니다. 
                                    시간을 멈추면 소득도 멈추는 구조는 <strong className="text-white underline decoration-red-500">시한폭탄</strong>과 같습니다.
                                    3년 안에 시스템을 만들지 못하면, 당신은 알고리즘의 하위 계급으로 전락합니다.
                                 </p>
                                 <p className="text-cyan-400 font-bold animate-pulse">
                                    > 유일한 탈출구는 노동자가 아닌 '설계자'가 되는 것뿐입니다.
                                 </p>
                              </div>
                           ) : (
                              <p>
                                 축하합니다. 당신은 시스템의 지배자입니다. 하지만 방심하지 마십시오. 
                                 AI의 발전 속도는 당신의 방어벽을 뚫을 수 있습니다. VIP 솔루션으로 제국을 요새화하십시오.
                              </p>
                           )}
                        </div>
                     </div>
                  </div>

                  {/* THE OFFER (Build-up to Checkout) */}
                  <div className={`transition-all duration-1000 transform ${showOffer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                     <div className="flex flex-col items-center gap-4">
                        <ArrowDown className="text-gold animate-bounce" size={24} />
                        
                        <div className="w-full bg-gradient-to-r from-black via-gold/10 to-black border border-gold/30 p-1 rounded-sm">
                           <Button 
                              onClick={handleConversion}
                              className="w-full py-5 bg-gold-metallic text-black font-black uppercase tracking-widest border-none shadow-[0_0_30px_rgba(191,149,63,0.4)] hover:shadow-[0_0_50px_rgba(191,149,63,0.6)] group relative overflow-hidden"
                           >
                              <span className="relative z-10 flex items-center justify-center gap-2">
                                 <Lock size={16} className="group-hover:hidden" />
                                 <Zap size={16} className="hidden group-hover:block animate-pulse" />
                                 {score <= 75 ? "시스템 설계도(The Glitch) 확보하기" : "제국 건설 설계도 확인하기"}
                              </span>
                              {/* Shine Effect */}
                              <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                           </Button>
                        </div>
                        
                        <div className="flex items-center gap-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                           <span className="text-red-400 font-bold">Limited Offer Applied</span>
                           <span>•</span>
                           <span className="hover:text-white cursor-pointer transition-colors" onClick={reset}>Re-Test</span>
                        </div>
                     </div>
                  </div>
               </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

const AnswerBtn: React.FC<{ label: string, value: number, onClick: (v: number) => void, subLabel?: string }> = ({ label, value, onClick, subLabel }) => (
   <button 
      onClick={() => onClick(value)}
      className="w-full text-left p-6 border border-white/10 bg-white/[0.02] hover:bg-cyan-900/20 hover:border-cyan-500/50 transition-all rounded-sm group flex flex-col gap-1"
   >
      <div className="flex items-center justify-between w-full">
        <span className="text-gray-300 group-hover:text-cyan-100 font-medium">{label}</span>
        <ChevronRight className="text-white/10 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all" size={18} />
      </div>
      {subLabel && <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{subLabel}</span>}
   </button>
);
