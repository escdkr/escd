
import React, { useState } from 'react';
import { X, Database, Truck, Globe, Lock, Search, ExternalLink, Container, Barcode, DollarSign, ArrowRight, ShieldCheck, Factory, Copy, CheckCircle2, Download, AlertTriangle, Package, Anchor, Layers } from 'lucide-react';
import { Button } from './Button';

interface SourcingSecretsDocProps {
  onClose: () => void;
  onCheckout: () => void;
  isVip?: boolean; // Prop to determine access level
}

// Mock Data for VIP Mode
const VIP_SUPPLIERS = [
  { id: '01', name: 'Yiwu Go (이우고)', category: '잡화/생활용품', margin: '40%~', note: '소량 사입 가능. "샘플 요청" 멘트 필수.', status: 'OPEN', type: 'CHINA' },
  { id: '02', name: 'Vvic (브이빅)', category: '여성 의류/동대문', margin: '30%~', note: '이미지 사용 허용 업체 위주로 컨택.', status: 'OPEN', type: 'DOMESTIC' },
  { id: '03', name: '1688 Super Factory A', category: '캠핑/아웃도어', margin: '65%~', note: '위챗 ID: camp888. "한국 셀러 소개" 언급 시 MOQ 10개 가능.', status: 'VIP', type: 'CHINA' },
  { id: '04', name: 'Onda B2B (폐쇄몰)', category: '반려동물 용품', margin: '55%~', note: '사업자 등록증 필수. 첫 거래 시 30만원 이상 매입 조건.', status: 'VIP', type: 'DOMESTIC' },
  { id: '05', name: 'Shenzhen Elec OEM', category: '소형 가전', margin: '70%~', note: 'KC인증 대행 가능 공장. 화이트라벨링(로고 박기) 무료.', status: 'VIP', type: 'CHINA' },
  { id: '06', name: 'Euro Dropship Hub', category: '명품/잡화', margin: '25%~', note: '영국 배대지 연동 필수. 인보이스 언더밸류 주의.', status: 'VIP', type: 'DROPSHIP' },
  { id: '07', name: 'K-Food Bulk', category: '가공식품', margin: '40%~', note: '유통기한 임박 상품 땡처리 전문. 마진율 극대화.', status: 'VIP', type: 'DOMESTIC' },
  { id: '08', name: 'Toy World China', category: '유아동/장난감', margin: '50%~', note: '어린이 제품 안전 인증 서류 제공함.', status: 'VIP', type: 'CHINA' },
];

export const SourcingSecretsDoc: React.FC<SourcingSecretsDocProps> = ({ onClose, onCheckout, isVip = false }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'domestic' | 'china' | 'dropship'>('all');
  const [activeScript, setActiveScript] = useState<'moq' | 'price' | 'exclusive'>('moq');

  // Filter suppliers
  const filteredSuppliers = VIP_SUPPLIERS.filter(s => {
    if (activeTab === 'all') return true;
    return s.type.toLowerCase() === activeTab;
  });

  const copyToClipboard = (text: string) => {
    alert(`[SYSTEM] 클립보드에 복사되었습니다.\n"${text.substring(0, 30)}..."`);
  };

  const downloadExcel = () => {
    alert(`[SYSTEM] Sourcing_Database_Full_v2.4.xlsx 다운로드가 시작됩니다.\n보안 코드: ARCHITECT-77`);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/95 backdrop-blur-xl animate-fade-in p-4 pt-24 md:p-8 md:pt-28 overflow-y-auto">
      <div className={`relative w-full max-w-5xl shadow-[0_0_150px_rgba(16,185,129,0.15)] border flex flex-col md:h-[80vh] h-full rounded-sm overflow-hidden mb-20 ${isVip ? 'bg-[#050505] border-gold/30' : 'bg-[#0f172a] border-emerald-900/40'}`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b z-20 relative shrink-0 ${isVip ? 'bg-black border-gold/20' : 'bg-[#020617] border-emerald-900/30'}`}>
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-sm border shadow-[0_0_10px_rgba(16,185,129,0.2)] ${isVip ? 'bg-gold/10 border-gold/30 text-gold' : 'bg-emerald-900/10 border-emerald-500/20 text-emerald-500'}`}>
               <Database size={20} />
            </div>
            <div className="flex flex-col">
              <span className={`font-mono text-[10px] tracking-[0.3em] uppercase font-bold animate-pulse ${isVip ? 'text-gold' : 'text-emerald-500'}`}>
                {isVip ? 'MASTER CLEARANCE // UNLOCKED' : 'Supply Chain Hack // Level 6'}
              </span>
              <h2 className="text-white font-serif font-bold text-lg tracking-tight">PROJECT: BACKDOOR SOURCING</h2>
            </div>
          </div>
          <button onClick={onClose} className={`transition-colors group ${isVip ? 'text-white/40 hover:text-gold' : 'text-white/40 hover:text-emerald-500'}`}>
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-grow overflow-y-auto bg-[#020617] text-slate-300 font-sans relative selection:bg-emerald-500/30 selection:text-white scroll-smooth">
          {/* Background Grid */}
          <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
          
          <div className="max-w-4xl mx-auto p-8 md:p-12 space-y-16 relative z-10">
            
            {/* Intro Section */}
            <div className="text-center space-y-8 animate-fade-in-up">
               <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-mono uppercase tracking-widest mb-4 ${isVip ? 'border-gold/30 bg-gold/5 text-gold' : 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400'}`}>
                  <Container size={12} /> {isVip ? 'Full Database Access' : 'Logistics Data Decrypted'}
               </div>
               <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[1.1] text-white">
                  마진은 팔 때가 아니라 <br/>
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isVip ? 'from-gold via-[#FCF6BA] to-amber-600' : 'from-emerald-400 to-teal-600'}`}>살 때 결정된다.</span>
               </h1>
               
               {/* VIP Status Banner */}
               {isVip && (
                 <div className="max-w-xl mx-auto bg-gold/5 border border-gold/20 p-4 rounded-sm flex items-center justify-center gap-3 text-gold/80 text-sm font-serif italic">
                    <ShieldCheck size={18} />
                    <span>"VIP 권한이 확인되었습니다. 모든 공급처 정보와 공략 팁이 공개됩니다."</span>
                 </div>
               )}
            </div>

            {/* The Database Interface */}
            <div className="space-y-6">
               <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <h3 className={`text-xl font-serif font-bold text-white flex items-center gap-3 ${isVip ? 'text-gold' : ''}`}>
                     <Factory size={20} className={isVip ? 'text-gold' : 'text-emerald-500'} /> 
                     Part 1. Sourcing Database {isVip && '(Full Unlocked)'}
                  </h3>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-full">
                     <TabButton active={activeTab === 'all'} onClick={() => setActiveTab('all')} label="ALL" isVip={isVip} />
                     <TabButton active={activeTab === 'domestic'} onClick={() => setActiveTab('domestic')} label="국내 폐쇄몰" isVip={isVip} />
                     <TabButton active={activeTab === 'china'} onClick={() => setActiveTab('china')} label="중국 직거래" isVip={isVip} />
                     <TabButton active={activeTab === 'dropship'} onClick={() => setActiveTab('dropship')} label="해외 위탁" isVip={isVip} />
                  </div>
               </div>

               <div className={`bg-[#0a0a0a] border rounded-sm overflow-hidden ${isVip ? 'border-gold/30' : 'border-slate-800'}`}>
                  {/* Table Header */}
                  <div className={`grid grid-cols-12 gap-4 p-4 border-b text-[10px] font-mono uppercase tracking-widest font-bold ${isVip ? 'bg-gold/5 border-gold/20 text-gold' : 'bg-[#0f172a] border-slate-800 text-slate-500'}`}>
                     <div className="col-span-1">No.</div>
                     <div className="col-span-3">Supplier Name</div>
                     <div className="col-span-2">Category</div>
                     <div className="col-span-2">Margin</div>
                     <div className="col-span-4">{isVip ? 'Attack Strategy (Hidden Note)' : 'Access'}</div>
                  </div>

                  {/* Table Body */}
                  <div className={`divide-y ${isVip ? 'divide-gold/10' : 'divide-slate-800/50'}`}>
                     {filteredSuppliers.map((supplier, idx) => {
                        const isLocked = !isVip && supplier.status === 'VIP';
                        return (
                           <div key={idx} className={`grid grid-cols-12 gap-4 p-4 items-center transition-colors group ${isVip ? 'hover:bg-gold/5' : 'hover:bg-white/[0.02]'}`}>
                              <div className={`col-span-1 font-mono ${isVip ? 'text-gold/60' : 'text-slate-500'}`}>{String(idx + 1).padStart(2, '0')}</div>
                              
                              <div className={`col-span-3 font-bold text-white flex items-center gap-2 ${isLocked ? 'blur-[4px] select-none opacity-50' : ''}`}>
                                 <Globe size={12} className={isVip ? 'text-gold' : 'text-emerald-500'} /> 
                                 {isLocked ? 'Hidden Supplier' : supplier.name}
                              </div>
                              
                              <div className={`col-span-2 text-xs ${isLocked ? 'blur-[4px] select-none text-slate-700' : 'text-slate-400'}`}>
                                 {supplier.category}
                              </div>
                              
                              <div className={`col-span-2 font-mono ${isLocked ? 'blur-[4px] select-none text-slate-700' : (isVip ? 'text-white font-bold' : 'text-emerald-400')}`}>
                                 {supplier.margin}
                              </div>
                              
                              <div className="col-span-4 relative">
                                 {isLocked ? (
                                    <div className="flex items-center justify-end gap-2 text-slate-600">
                                       <Lock size={12} /> <span className="text-[10px] uppercase tracking-widest">VIP Only</span>
                                    </div>
                                 ) : (
                                    <div className={`text-xs leading-tight ${isVip ? 'text-[#FCF6BA] font-serif italic' : 'text-slate-500'}`}>
                                       {isVip ? `"${supplier.note}"` : <span className="border border-emerald-500/30 text-emerald-500 px-2 py-1 rounded-[1px] uppercase text-[9px]">Open Access</span>}
                                    </div>
                                 )}
                              </div>
                           </div>
                        );
                     })}
                  </div>
                  
                  {/* Footer of Table */}
                  <div className={`p-4 border-t text-center ${isVip ? 'bg-gold/5 border-gold/20' : 'bg-[#0f172a] border-slate-800'}`}>
                     <span className={`text-[10px] font-mono uppercase tracking-[0.2em] ${isVip ? 'text-gold' : 'text-slate-500'}`}>
                        {isVip ? 'All 50 Suppliers Revealed' : '+ 43 More Hidden Suppliers in Database'}
                     </span>
                  </div>
               </div>
            </div>

            {/* Negotiation Script Section - EXPANDED FOR VIP */}
            <div className="space-y-6">
               <h3 className={`text-xl font-serif font-bold text-white flex items-center gap-3 ${isVip ? 'text-gold' : ''}`}>
                  <ShieldCheck size={20} className={isVip ? 'text-gold' : 'text-emerald-500'} /> 
                  Protocol: The Deal Maker {isVip && '(Unlocked Scripts)'}
               </h3>
               
               {isVip ? (
                  // VIP: FULL INTERACTIVE SCRIPTS
                  <div className="bg-[#0a0a0a] border border-gold/30 rounded-sm overflow-hidden">
                     <div className="flex border-b border-gold/20">
                        <ScriptTab active={activeScript === 'moq'} onClick={() => setActiveScript('moq')} label="MOQ 파괴 (소량 발주)" />
                        <ScriptTab active={activeScript === 'price'} onClick={() => setActiveScript('price')} label="단가 인하 (네고)" />
                        <ScriptTab active={activeScript === 'exclusive'} onClick={() => setActiveScript('exclusive')} label="독점 공급 (총판)" />
                     </div>
                     <div className="p-8 space-y-6">
                        <div className="flex justify-between items-start">
                           <div>
                              <h4 className="text-gold font-bold uppercase tracking-widest text-sm mb-2">
                                 {activeScript === 'moq' && "MOQ (최소 주문 수량) 파괴술"}
                                 {activeScript === 'price' && "단가 후려치기 (Competitor Leverage)"}
                                 {activeScript === 'exclusive' && "독점 계약 따내기 (Exclusive Rights)"}
                              </h4>
                              <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                                 {activeScript === 'moq' && "공장은 소량 주문을 싫어합니다. '샘플 테스트' 명분과 '미래 물량'을 담보로 MOQ를 1/10로 줄이는 스크립트입니다."}
                                 {activeScript === 'price' && "무조건 깎아달라고 하면 하수입니다. 가상의 경쟁사 견적을 명분으로 제시하여 담당자의 체면을 세워주며 가격을 깎습니다."}
                                 {activeScript === 'exclusive' && "단순 판매가 아닌 '한국 파트너'로서의 지위를 요구하십시오. 마케팅 계획서를 첨부하면 승률이 90%로 올라갑니다."}
                              </p>
                           </div>
                           <button 
                              onClick={() => copyToClipboard(activeScript === 'moq' ? "저희는 한국의 OOO 플랫폼 입점 업체입니다..." : "현재 타 공장(B사)에서 $3.2에 제안을 받았습니다...")}
                              className="flex items-center gap-2 text-[10px] font-mono text-gold hover:text-white uppercase tracking-widest border border-gold/30 px-4 py-2 hover:bg-gold/20 transition-all rounded-sm"
                           >
                              <Copy size={12} /> Copy Script
                           </button>
                        </div>
                        <div className="bg-white/5 p-6 rounded-sm border-l-2 border-gold font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                           {activeScript === 'moq' && `"안녕하세요, 한국의 프리미엄 셀러 [브랜드명]입니다.\n귀사의 제품 [제품명]을 당사의 메인 라인업으로 런칭하고자 합니다.\n다만, 당사의 엄격한 QC(품질관리) 기준을 통과해야 대량 발주가 가능합니다.\n초기 시장 테스트 및 QC를 위해 1차 발주는 [희망수량]개로 진행하고자 하며,\n이 테스트가 통과될 시 2차 발주부터는 [약속수량]개 이상을 보장합니다.\n미래의 파트너십을 위해 이번 제안을 긍정적으로 검토 부탁드립니다."`}
                           {activeScript === 'price' && `"귀사의 제품 퀄리티는 매우 만족스럽습니다.\n다만, 솔직히 말씀드리면 타 공장(B사)에서 동일 스펙을 개당 [$낮은가격]에 제안받았습니다.\n저희는 귀사와 장기적인 관계를 맺고 싶기에, 가격만 맞춰주신다면 B사의 제안을 거절하고 귀사와 계약하고 싶습니다.\n[$희망가격]으로 맞춰주실 수 있다면 지금 즉시 보증금을 송금하겠습니다."`}
                           {activeScript === 'exclusive' && `"귀사의 제품은 한국 시장에서 큰 잠재력이 있습니다.\n하지만 현재처럼 여러 셀러에게 중구난방으로 공급될 경우, 가격 경쟁으로 인해 브랜드 가치가 훼손될 것입니다.\n저희에게 [기간] 동안 한국 독점 판매권을 주신다면, 당사의 마케팅 채널(SNS, 유튜버 협찬 등)을 총동원하여 귀사의 제품을 브랜딩하겠습니다.\n월 최소 발주량 [수량]개를 보장하는 조건으로 독점 계약을 제안합니다."`}
                        </div>
                     </div>
                  </div>
               ) : (
                  // FREE: TEASER CARDS
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="bg-white/[0.02] border border-slate-800 p-6 rounded-sm opacity-80">
                        <h4 className="text-sm font-bold text-emerald-400 mb-3 uppercase tracking-wider">MOQ (최소 주문 수량) 파괴술</h4>
                        <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                           공장은 소량 주문을 싫어합니다. 하지만 '샘플 테스트'라는 명분과 '미래 물량'을 담보로 MOQ를 1/10로 줄이는 스크립트입니다.
                        </p>
                        <div className="bg-black p-4 rounded-sm border-l-2 border-emerald-500 font-mono text-xs text-slate-500 leading-relaxed blur-[2px] select-none">
                           "저희는 한국의 OOO 플랫폼 입점 업체입니다. 귀사의 제품을 메인으로 런칭할 계획이나, 초기 품질 검증(QC)을 위해..."
                        </div>
                     </div>
                     <div className="bg-white/[0.02] border border-slate-800 p-6 rounded-sm opacity-80">
                        <h4 className="text-sm font-bold text-emerald-400 mb-3 uppercase tracking-wider">단가 후려치기 (Price Slash)</h4>
                        <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                           무조건 깎아달라고 하면 하수입니다. 경쟁 공장의 견적서를(가짜라도) 들이밀며 '명분'을 줘야 담당자가 상사를 설득할 수 있습니다.
                        </p>
                        <div className="bg-black p-4 rounded-sm border-l-2 border-emerald-500 font-mono text-xs text-slate-500 leading-relaxed blur-[2px] select-none">
                           "현재 타 공장(B사)에서 $3.2에 제안을 받았습니다. 하지만 귀사의 마감이 더 마음에 들어 $3.3까지는..."
                        </div>
                     </div>
                  </div>
               )}
            </div>

            {/* --- FOOTER: CONDITIONAL CONTENT (FREE CTA vs VIP ADVANCED) --- */}
            <div className={`mt-20 border-t ${isVip ? 'border-gold/30 bg-[#050505]' : 'border-emerald-900/30 bg-[#020617]'} relative`}>
               {!isVip ? (
                  // FREE MODE: THE CTA
                  <div className="pt-16 pb-8 text-center space-y-10">
                     <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-900/20 border border-emerald-500/30 rounded-full text-emerald-500 text-[10px] font-mono uppercase tracking-widest animate-pulse">
                        <AlertTriangle size={12} /> Database Locked
                     </div>
                     <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                           이 리스트가 퍼지면 <br/>
                           <span className="text-emerald-500 italic">제 마진도 줄어듭니다.</span>
                        </h2>
                        <p className="text-slate-400 font-serif italic text-lg">
                           "공급처는 한정되어 있습니다. 먼저 깃발을 꽂는 사람이 물량을 독점합니다."
                        </p>
                     </div>

                     <div className="max-w-md mx-auto">
                        <Button 
                           onClick={onCheckout}
                           className="w-full py-6 text-lg font-black uppercase tracking-[0.2em] bg-emerald-500 text-black border-none hover:bg-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.3)] animate-pulse-cta"
                        >
                           <span className="flex items-center justify-center gap-3">
                              <Database size={20} />
                              전체 리스트 해제하기 (Excel)
                              <ArrowRight size={20} />
                           </span>
                        </Button>
                     </div>
                     
                     <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                        Contains: 50+ Verified Suppliers, Contact Info, Negotiation Scripts
                     </p>
                  </div>
               ) : (
                  // VIP MODE: ADVANCED PROTOCOLS (PART 2)
                  <div className="p-12">
                      <div className="text-center mb-16 space-y-4">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-[10px] font-mono uppercase tracking-widest">
                              <Lock size={12} /> Confidential Access
                          </div>
                          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                              PART 2. <span className="text-gold">Supply Chain Dominance</span>
                          </h2>
                          <p className="text-slate-400 font-serif italic text-lg">
                              "싸게 사는 것을 넘어, 공급망 자체를 장악하는 포식자의 기술입니다."
                          </p>
                      </div>

                      <div className="space-y-16 mb-20">
                          {/* Module 4: Ghost Factory Protocol */}
                          <section className="relative pl-8 border-l-2 border-gold/30">
                              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gold border-4 border-[#050505]" />
                              <h3 className="text-2xl font-bold text-white mb-4">04. 유령 공장 판별법 (Ghost Factory Protocol)</h3>
                              <div className="space-y-4 text-slate-300 leading-relaxed font-light text-lg">
                                  <p>
                                      "알리바바 업체의 90%는 공장이 아닙니다."
                                  </p>
                                  <p>
                                      그들은 공장인 척하며 중간 마진을 떼어먹는 <strong>무역상사(Trading Company)</strong>입니다. 
                                      이들을 걸러내고 '진짜 공장(Real Factory)'과 직거래를 터야 마진이 20% 늘어납니다.
                                  </p>
                                  <p>
                                      공장 정문 사진에 포토샵 흔적을 찾으십시오. 비디오 콜을 요청했을 때 거절하면 가짜입니다.
                                      "생산 라인을 지금 보여달라"고 했을 때 사무실만 보여주면 100% 무역상사입니다.
                                  </p>
                              </div>
                              <div className="mt-6 flex items-center gap-2 text-gold font-mono text-xs">
                                  <Factory size={14} />
                                  <span>Action: 사업자 등록증의 'Business Scope' 확인 (Produce vs Trade)</span>
                              </div>
                          </section>

                          {/* Module 5: Hostage Negotiation */}
                          <section className="relative pl-8 border-l-2 border-gold/30">
                              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gold border-4 border-[#050505]" />
                              <h3 className="text-2xl font-bold text-white mb-4">05. 인질극 협상술 (Hostage Negotiation)</h3>
                              <div className="space-y-4 text-slate-300 leading-relaxed font-light text-lg">
                                  <p>
                                      "돈을 다 주는 순간, 당신은 '을'이 됩니다."
                                  </p>
                                  <p>
                                      대금을 100% 선입금하면 공장은 당신의 주문을 가장 늦게 처리합니다. 
                                      반드시 <strong>30% 선금(착수), 70% 잔금(선적 전 QC 통과 후)</strong> 조건을 관철시키십시오.
                                  </p>
                                  <p>
                                      계약서에 "QC에서 불량률 3% 넘으면 잔금 지급을 보류하고 전량 재생산한다"는 특약을 거십시오.
                                      잔금 70%가 바로 당신의 돈을 지키는 <strong>인질(Hostage)</strong>입니다.
                                  </p>
                              </div>
                              <div className="mt-6 flex items-center gap-2 text-gold font-mono text-xs">
                                  <Anchor size={14} />
                                  <span>Action: 알리바바 Trade Assurance 결제 필수</span>
                              </div>
                          </section>

                          {/* Module 6: White Labeling */}
                          <section className="relative pl-8 border-l-2 border-gold/30">
                              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gold border-4 border-[#050505]" />
                              <h3 className="text-2xl font-bold text-white mb-4">06. 라벨 갈이의 미학 (White Labeling)</h3>
                              <div className="space-y-4 text-slate-300 leading-relaxed font-light text-lg">
                                  <p>
                                      "제품을 개발하지 마십시오. 껍데기만 바꾸십시오."
                                  </p>
                                  <p>
                                      다이소에서 1,000원에 팔리는 물건도, 패키징을 고급화하고 로고를 박으면 인스타그램에서 15,000원에 팔립니다.
                                      이것이 <strong>OEM(주문자 상표 부착)</strong>의 마법입니다.
                                  </p>
                                  <p>
                                      고객은 '플라스틱'을 사는 게 아니라 '브랜드 경험'을 삽니다. 
                                      공장은 제품을 만들게 하고, 당신은 브랜드라는 <strong>환상(Illusion)</strong>을 입히십시오.
                                  </p>
                              </div>
                              <div className="mt-6 flex items-center gap-2 text-gold font-mono text-xs">
                                  <Package size={14} />
                                  <span>Action: 로고 AI 파일(Vector) 준비 및 박스 디자인 의뢰</span>
                              </div>
                          </section>
                      </div>
                      
                      <div className="flex flex-col items-center gap-6 border-t border-gold/20 pt-12">
                          <Button 
                             onClick={downloadExcel}
                             className="w-full md:w-auto px-16 py-6 text-xl font-black uppercase tracking-[0.2em] bg-gold-metallic text-black border-none shadow-[0_0_50px_rgba(191,149,63,0.4)] hover:shadow-[0_0_80px_rgba(191,149,63,0.6)] animate-pulse-cta"
                          >
                             <span className="flex items-center gap-3">
                                <Download size={24} />
                                Download Excel DB
                                <ArrowRight size={24} />
                             </span>
                          </Button>
                          <div className="text-right w-full">
                              <span className="text-[10px] font-mono text-gold uppercase tracking-widest block mb-1">Clearance Level</span>
                              <span className="text-3xl font-black text-white tracking-tighter">ARCHITECT</span>
                          </div>
                      </div>
                  </div>
               )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; label: string; isVip?: boolean }> = ({ active, onClick, label, isVip }) => (
   <button 
      onClick={onClick}
      className={`px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest rounded-sm border transition-all whitespace-nowrap ${
         active 
            ? (isVip ? 'bg-gold text-black border-gold' : 'bg-emerald-500 text-black border-emerald-500') 
            : 'bg-transparent text-slate-500 border-slate-700 hover:text-white hover:border-slate-500'
      }`}
   >
      {label}
   </button>
);

const ScriptTab: React.FC<{ active: boolean; onClick: () => void; label: string }> = ({ active, onClick, label }) => (
   <button
      onClick={onClick}
      className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${
         active 
            ? 'bg-gold/10 text-gold border-b-2 border-gold' 
            : 'text-gray-500 hover:text-white hover:bg-white/5 border-b-2 border-transparent'
      }`}
   >
      {label}
   </button>
);
