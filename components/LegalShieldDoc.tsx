
import React from 'react';
import { X, Shield, Scale, Gavel, FileText, Copy, AlertTriangle, Lock, CheckCircle2 } from 'lucide-react';

interface LegalShieldDocProps {
  onClose: () => void;
}

export const LegalShieldDoc: React.FC<LegalShieldDocProps> = ({ onClose }) => {
  const copyToClipboard = (text: string) => {
    alert(`[SYSTEM] 법적 대응 문구가 클립보드에 확보되었습니다.\n"${text.substring(0, 30)}..."`);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/90 backdrop-blur-md animate-fade-in p-4 pt-24 md:p-8 md:pt-28 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0f172a] shadow-[0_0_100px_rgba(56,189,248,0.2)] border border-slate-600/30 flex flex-col md:h-[80vh] h-full rounded-sm overflow-hidden mb-20">
        
        {/* Document Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-[#020617]">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-slate-800 rounded-sm border border-slate-600">
               <Shield size={20} className="text-slate-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-400 font-mono text-[10px] tracking-[0.3em] uppercase font-black animate-pulse">Defense Protocol // Level 9</span>
              <h2 className="text-white font-serif font-bold text-lg tracking-tight">PROJECT: LAW SHIELD</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-slate-300 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Document Body */}
        <div className="flex-grow overflow-y-auto p-8 md:p-12 bg-[#1e293b] text-slate-300 font-sans relative selection:bg-slate-500/30 selection:text-white scroll-smooth">
          
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-slate-500/5 blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
          <div className="absolute top-10 right-10 border-4 border-slate-700/30 text-slate-700/30 font-black text-6xl rotate-[-15deg] p-4 uppercase tracking-widest pointer-events-none select-none">
             Legal<br/>Binding
          </div>

          <div className="max-w-3xl mx-auto space-y-16 relative z-10">
            
            {/* Title Section */}
            <div className="text-center space-y-6 pb-8 border-b border-slate-700/50">
              <div className="flex justify-center text-slate-400 mb-2">
                 <Scale size={48} strokeWidth={1} />
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none text-white">
                The Ultimate <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-500">Defense Contract</span>
              </h1>
              <p className="font-serif text-lg text-slate-400 italic max-w-xl mx-auto">
                "고객은 왕이 아닙니다. <br/>
                계약을 준수할 때만 고객이며, 선을 넘으면 <span className="text-white font-bold underline decoration-slate-500 underline-offset-4">적(Hostile)</span>입니다."
              </p>
            </div>

            {/* Warning Box */}
            <div className="bg-slate-900/50 border-l-4 border-slate-500 p-6 flex gap-4 items-start">
               <Gavel className="text-slate-400 shrink-0 mt-1" size={20} />
               <div className="space-y-2">
                  <h4 className="text-slate-300 font-bold uppercase tracking-widest text-xs">Legal Disclaimer</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                     이 문서는 '악성 민원인(Black Consumer)'을 법적으로 무력화하기 위한 강력한 약관 및 대응 매뉴얼입니다.
                     감정적인 대응 대신, 아래의 법적 조항을 근거로 기계처럼 대응하십시오.
                  </p>
               </div>
            </div>

            {/* Clause 1: Digital Asset Protection */}
            <section className="space-y-6">
               <div className="flex items-center gap-4 text-slate-200">
                  <span className="font-mono text-3xl font-black opacity-30">01</span>
                  <h3 className="text-2xl font-serif font-black uppercase tracking-tight">The "No-Refund" Iron Wall</h3>
               </div>
               <div className="pl-6 border-l border-slate-600 space-y-4">
                  <p className="text-lg leading-relaxed">
                     지식 콘텐츠(PDF, 강의)는 파일을 받는 순간 '가치 소비'가 완료됩니다. 이를 악용하여 자료만 받고 환불을 요구하는 자들을 막는 조항입니다.
                  </p>
                  
                  <div className="bg-black/40 p-6 rounded-sm border border-slate-700 relative group">
                     <div className="absolute top-0 right-0 bg-slate-800 text-[9px] font-mono px-2 py-1 text-slate-300 rounded-bl-sm">Clause 17-2</div>
                     <h4 className="font-bold text-white mb-2 flex items-center gap-2"><FileText size={16}/> 약관 필수 삽입 조항</h4>
                     <p className="font-serif text-sm text-slate-400 leading-relaxed mb-4">
                        "본 상품은 <strong className="text-slate-200">전자상거래법 제17조 2항 5호</strong>에 의거, '복제가 가능한 재화의 포장을 훼손한 경우'에 해당하여 
                        열람(다운로드, 스트리밍) 즉시 청약철회가 불가능합니다. 결제 시 이에 동의한 것으로 간주합니다."
                     </p>
                     <button 
                        onClick={() => copyToClipboard("본 상품은 전자상거래법 제17조 2항 5호에 의거, 열람 즉시 가치가 훼손되는 디지털 재화이므로 환불이 불가능합니다.")}
                        className="flex items-center gap-2 text-[10px] font-mono text-slate-400 hover:text-white uppercase tracking-widest border border-slate-700 px-3 py-2 hover:bg-slate-800 transition-all w-full justify-center"
                     >
                        <Copy size={12} /> Copy Defense Script
                     </button>
                  </div>
               </div>
            </section>

            {/* Clause 2: Business Obstruction */}
            <section className="space-y-6">
               <div className="flex items-center gap-4 text-slate-200">
                  <span className="font-mono text-3xl font-black opacity-30">02</span>
                  <h3 className="text-2xl font-serif font-black uppercase tracking-tight">Obstruction & Damages</h3>
               </div>
               <div className="pl-6 border-l border-slate-600 space-y-4">
                  <p className="text-lg leading-relaxed">
                     지속적인 연락, 폭언, 허위 사실 유포로 업무를 마비시키는 경우, 형법상 '업무방해죄'를 언급하여 상대방을 위축시켜야 합니다.
                  </p>
                  
                  <div className="bg-black/40 p-6 rounded-sm border border-slate-700 relative group">
                     <div className="absolute top-0 right-0 bg-slate-800 text-[9px] font-mono px-2 py-1 text-slate-300 rounded-bl-sm">Criminal Law 314</div>
                     <h4 className="font-bold text-white mb-2 flex items-center gap-2"><AlertTriangle size={16} className="text-amber-500"/> 강경 대응 문자 템플릿</h4>
                     <p className="font-serif text-sm text-slate-400 leading-relaxed mb-4">
                        "귀하의 반복적인 민원과 허위 사실 유포는 <strong className="text-slate-200">형법 제314조(업무방해)</strong> 및 정보통신망법 위반 소지가 있습니다. 
                        즉시 중단하지 않을 경우, 당사 법무팀을 통해 민형사상 소송 절차(손해배상 청구 포함)에 착수함을 고지합니다."
                     </p>
                     <button 
                        onClick={() => copyToClipboard("귀하의 행위는 형법 제314조 업무방해죄에 해당할 수 있으며, 즉시 중단하지 않을 시 법적 조치를 취하겠습니다.")}
                        className="flex items-center gap-2 text-[10px] font-mono text-slate-400 hover:text-white uppercase tracking-widest border border-slate-700 px-3 py-2 hover:bg-slate-800 transition-all w-full justify-center"
                     >
                        <Copy size={12} /> Copy Warning Script
                     </button>
                  </div>
               </div>
            </section>

            {/* Clause 3: The Blacklist Protocol */}
            <section className="space-y-6">
               <div className="flex items-center gap-4 text-slate-200">
                  <span className="font-mono text-3xl font-black opacity-30">03</span>
                  <h3 className="text-2xl font-serif font-black uppercase tracking-tight">The "Silence" Protocol</h3>
               </div>
               <p className="text-lg leading-relaxed">
                  환불을 해주는 대신, '비방 금지 서약'을 받고 영구 차단하십시오. 
                  돈을 돌려주는 것은 패배가 아니라, <strong className="text-slate-300">리스크(암세포)를 도려내는 수술비용</strong>입니다.
               </p>
               
               <div className="space-y-3 mt-4">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-sm border border-slate-700/50">
                     <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                     <span className="text-sm text-slate-300">"환불금 지급 조건으로, 향후 본 서비스에 대한 일체의 비방 게시물을 작성하지 않을 것을 확약합니다."</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-sm border border-slate-700/50">
                     <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                     <span className="text-sm text-slate-300">"이를 위반할 시 지급된 환불금의 5배를 위약벌로 배상함에 동의합니다."</span>
                  </div>
               </div>
            </section>

            {/* Footer Signoff */}
            <div className="pt-12 border-t-2 border-slate-700 flex justify-between items-end">
               <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                  Legal Department<br/>
                  Clearance Code: 0x44-Defense
               </div>
               <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-xs">
                  <Lock size={14} />
                  System Secure
               </div>
            </div>

          </div>
        </div>

        {/* Loading Bar (Bottom) */}
        <div className="h-1 bg-black w-full">
           <div className="h-full bg-slate-500 animate-[loading-bar_20s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
};
