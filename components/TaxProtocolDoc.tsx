
import React from 'react';
import { X, Printer, Download, AlertTriangle, CheckSquare, TrendingDown, Table2 } from 'lucide-react';

interface TaxProtocolDocProps {
  onClose: () => void;
}

export const TaxProtocolDoc: React.FC<TaxProtocolDocProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/90 backdrop-blur-md animate-fade-in p-4 pt-24 md:p-8 md:pt-28 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#1a1a1a] shadow-[0_0_100px_rgba(0,0,0,1)] border border-white/10 flex flex-col md:h-[80vh] h-full rounded-sm overflow-hidden mb-20">
        
        {/* Document Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#111]">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-red-500 font-mono text-[10px] tracking-[0.3em] uppercase font-black animate-pulse">Classified // Level 5</span>
              <h2 className="text-white font-serif font-bold text-lg tracking-tight">PROJECT: ZERO TAX</h2>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">
              <Printer size={14} /> Print
            </button>
            <button className="hidden md:flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">
              <Download size={14} /> Save PDF
            </button>
            <div className="w-[1px] h-6 bg-white/10 mx-2" />
            <button onClick={onClose} className="text-white/40 hover:text-red-500 transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Document Body */}
        <div className="flex-grow overflow-y-auto p-8 md:p-16 bg-[#e5e5e5] text-[#1a1a1a] font-serif relative selection:bg-red-500/30 selection:text-white">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] overflow-hidden">
            <span className="text-[15vw] font-black transform -rotate-45 whitespace-nowrap">CONFIDENTIAL</span>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-12 relative z-10">
            
            {/* Title Section */}
            <div className="text-center border-b-2 border-black pb-8 space-y-4">
              <div className="flex justify-center mb-4">
                 <div className="border-2 border-red-700 text-red-700 px-4 py-1 font-black text-xl uppercase tracking-widest rotate-[-5deg] opacity-80">
                    Top Secret
                 </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                The Zero Tax <br/> Protocol
              </h1>
              <p className="font-mono text-xs uppercase tracking-[0.4em] opacity-60">
                Author: The Architect // Date: 2024.05.15
              </p>
            </div>

            {/* Warning Box */}
            <div className="bg-red-50 border-l-4 border-red-600 p-6 text-sm leading-relaxed text-red-900 font-medium">
              <div className="flex items-center gap-2 mb-2 font-bold uppercase tracking-widest text-xs text-red-600">
                <AlertTriangle size={14} /> Warning
              </div>
              본 문서는 <span className="bg-red-200 px-1 font-bold">조세 회피(Tax Avoidance)</span>의 구체적 기술을 다룹니다. 
              이는 불법적인 탈세와는 다르며, 현행 세법의 '허점'을 이용한 합법적 전략입니다. 
              외부 유출 시 귀하의 VIP 자격은 즉시 박탈됩니다.
            </div>

            {/* Content: Phase 0 */}
            <section className="space-y-4">
              <h3 className="text-2xl font-bold uppercase tracking-tight flex items-center gap-3">
                <span className="bg-black text-white w-8 h-8 flex items-center justify-center text-sm rounded-full">0</span>
                The Awakening
              </h3>
              <p className="text-lg leading-relaxed opacity-90">
                기억하십시오. <strong className="bg-yellow-200 px-1">세금은 '무지'에 대한 벌금입니다.</strong> 
                연봉 1억 개인 사업자는 소득세로 약 35%를 뜯기지만, 법인은 단 9%(2억 이하)만 냅니다.
                당신이 '개인(Individual)'으로 존재하는 한, 당신은 영원히 시스템의 착취 대상입니다.
                우리의 목표는 단 하나입니다. 당신을 개인이 아닌 <strong className="underline decoration-red-500 decoration-2 underline-offset-2">법인격(Legal Entity)</strong>으로 재탄생시키는 것입니다.
              </p>
            </section>

            {/* Content: Phase 1 */}
            <section className="space-y-6">
              <h3 className="text-2xl font-bold uppercase tracking-tight flex items-center gap-3">
                <span className="bg-black text-white w-8 h-8 flex items-center justify-center text-sm rounded-full">1</span>
                The Shell (갑옷 입기)
              </h3>
              <div className="pl-4 border-l-2 border-black/10 space-y-4">
                <p className="leading-relaxed font-bold">
                  아무 곳에나 법인을 세우지 마십시오. 주소지가 당신의 세율을 결정합니다.
                </p>
                
                <div className="bg-white border border-black/10 p-4 rounded-sm space-y-4">
                   <h4 className="font-bold flex items-center gap-2 text-sm"><CheckSquare size={16} /> 실행 프로토콜</h4>
                   <ul className="list-disc list-inside space-y-2 text-sm opacity-80">
                      <li>
                         <span className="font-bold bg-black text-white px-1 mr-1">과밀억제권역 회피:</span> 
                         서울/수도권 주요 지역에 법인을 세우면 취등록세가 3배 중과됩니다. 반드시 <strong>비상주 사무실</strong>을 이용해 '비과밀억제권역(용인, 화성 등)'에 본점을 등록하십시오.
                      </li>
                      <li>
                         <span className="font-bold bg-black text-white px-1 mr-1">벤처 인증 (Venture):</span> 
                         창업 3년 이내 벤처기업 인증 시 <strong className="text-red-600">법인세 50% 감면</strong>, 취등록세 75% 감면 혜택이 주어집니다. 기술보증기금 대출을 활용하여 이 자격을 획득하십시오.
                      </li>
                      <li>
                         <span className="font-bold bg-black text-white px-1 mr-1">청년 창업:</span> 
                         만 34세 이하, 비과밀지역 창업 시 <strong className="text-red-600">5년간 법인세 100% 면제</strong>입니다. 대표자 명의를 전략적으로 선택하십시오.
                      </li>
                   </ul>
                </div>
              </div>
            </section>

            {/* Content: Phase 2 */}
            <section className="space-y-6">
              <h3 className="text-2xl font-bold uppercase tracking-tight flex items-center gap-3">
                <span className="bg-black text-white w-8 h-8 flex items-center justify-center text-sm rounded-full">2</span>
                Expense Alchemy (비용의 연금술)
              </h3>
              <p className="leading-relaxed">
                개인의 소비는 사라지는 돈이지만, 법인의 소비는 <strong className="bg-yellow-200 px-1">비용(Expense)</strong>이 되어 세금을 줄여줍니다.
                당신의 라이프스타일 전체를 법인의 운영 활동으로 재정의하십시오.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div className="border border-black p-4">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">Amateur</span>
                  <div className="font-bold text-base line-through decoration-red-500">집 월세 (주거비)</div>
                  <div className="text-xs text-red-600 mt-1">개인 비용 (손실)</div>
                </div>
                <div className="border border-black p-4 bg-black text-white">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1">Architect</span>
                  <div className="font-bold text-base text-emerald-400">법인 사택 (기숙사)</div>
                  <div className="text-xs text-gray-400 mt-1">100% 비용 처리 + 부가세 환급</div>
                </div>
                <div className="border border-black p-4">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">Amateur</span>
                  <div className="font-bold text-base line-through decoration-red-500">슈퍼카 할부</div>
                  <div className="text-xs text-red-600 mt-1">단순 사치재</div>
                </div>
                <div className="border border-black p-4 bg-black text-white">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1">Architect</span>
                  <div className="font-bold text-base text-emerald-400">업무용 리스</div>
                  <div className="text-xs text-gray-400 mt-1">연 1,500만 원 비용 인정 (운행일지 작성 시 한도 해제)</div>
                </div>
              </div>
            </section>

            {/* Content: Phase 3 */}
            <section className="space-y-6">
              <h3 className="text-2xl font-bold uppercase tracking-tight flex items-center gap-3">
                <span className="bg-black text-white w-8 h-8 flex items-center justify-center text-sm rounded-full">3</span>
                The Exit Strategy (이익 회수)
              </h3>
              <p className="leading-relaxed">
                법인에 쌓인 잉여금을 개인화할 때 세금(배당소득세 max 49.5%)이 발생합니다. 하수들은 급여를 올리지만, 고수들은 주식을 태웁니다.
              </p>
              
              <div className="space-y-4 mt-4">
                 <div className="flex gap-4 items-start">
                    <div className="mt-1 bg-black text-white p-1 rounded-sm"><TrendingDown size={16} /></div>
                    <div>
                       <h4 className="font-bold text-lg">자사주 매입 및 이익 소각 (Stock Burn)</h4>
                       <p className="text-sm opacity-80 leading-relaxed mt-1">
                          대표가 가진 주식을 법인에 매각하고, 법인은 그 주식을 소각합니다. 이는 배당이 아닌 '주식 양도'로 간주되어 세율이 20%대로 낮아집니다.
                          또한 배우자에게 주식을 증여(6억 원 공제)한 후 이익 소각을 진행하면 <strong className="underline">세금이 0원에 수렴합니다.</strong>
                       </p>
                    </div>
                 </div>
                 <div className="flex gap-4 items-start">
                    <div className="mt-1 bg-black text-white p-1 rounded-sm"><Table2 size={16} /></div>
                    <div>
                       <h4 className="font-bold text-lg">직무발명보상제도</h4>
                       <p className="text-sm opacity-80 leading-relaxed mt-1">
                          당신이 만든 노하우를 법인에 '특허' 등으로 양도하십시오. 이에 대한 보상금은 연 700만 원까지 비과세이며, 법인은 이를 비용으로 처리하여 법인세를 깎습니다.
                       </p>
                    </div>
                 </div>
              </div>
            </section>

            {/* Content: Phase 4 (Secret) */}
            <section className="space-y-6 p-6 border-2 border-red-600/20 bg-red-500/5 rounded-sm">
              <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-3 text-red-800">
                <span className="bg-red-800 text-white w-8 h-8 flex items-center justify-center text-sm rounded-full">4</span>
                Hidden Protocol: The R&D Center
              </h3>
              <p className="leading-relaxed text-sm font-medium text-red-900/80">
                대부분의 1인 기업이 놓치는 가장 강력한 무기입니다. '기업부설연구소'를 설립하십시오. 
                칸막이 하나와 현판 하나면 충분합니다.
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-red-900/80 font-bold">
                 <li>연구원(본인 또는 직원) 인건비의 25%를 세액 공제해 줍니다.</li>
                 <li>비용 처리가 아니라 <span className="underline">세금 자체를 깎아주는</span> 가장 강력한 혜택입니다.</li>
                 <li>최저한세 적용 배제 등 다양한 혜택이 따라옵니다.</li>
              </ul>
            </section>

            {/* Footer Signoff */}
            <div className="pt-12 border-t-2 border-black flex justify-between items-end">
               <div className="text-sm font-bold uppercase tracking-widest">
                  End of Document<br/>
                  Clearance Code: 0x82A-Zero
               </div>
               <div className="w-24 h-24 border-4 border-red-700 rounded-full flex items-center justify-center transform -rotate-12 opacity-60">
                  <span className="text-red-700 font-black text-xs uppercase text-center leading-tight">
                     ESCD<br/>APPROVED<br/>PROTOCOL
                  </span>
               </div>
            </div>

          </div>
        </div>

        {/* Loading Bar (Bottom) */}
        <div className="h-1 bg-black w-full">
           <div className="h-full bg-red-600 animate-[loading-bar_10s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
};
