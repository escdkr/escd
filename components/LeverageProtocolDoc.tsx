
import React from 'react';
import { X, Network, Users, FileText, Copy, Bot, Layers, ArrowRight, Activity, Globe, Clock, ChevronRight, Lock, CheckCircle2, ShieldCheck, Scale, Zap } from 'lucide-react';
import { Button } from './Button';

interface LeverageProtocolDocProps {
  onClose: () => void;
  onCheckout: () => void; // Added onCheckout prop for CTA
  isVip?: boolean;
}

export const LeverageProtocolDoc: React.FC<LeverageProtocolDocProps> = ({ onClose, onCheckout, isVip = false }) => {
  const copyToClipboard = (text: string) => {
    alert(`[SYSTEM] 템플릿이 클립보드에 복사되었습니다.\n"${text.substring(0, 20)}..."`);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/95 backdrop-blur-xl animate-fade-in p-4 pt-24 md:p-8 md:pt-28 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0a0a0a] shadow-[0_0_100px_rgba(249,115,22,0.15)] border border-orange-900/40 flex flex-col md:h-[80vh] h-full rounded-sm overflow-hidden mb-20">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-orange-900/30 bg-[#050505] z-20 relative shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-orange-900/10 rounded-sm border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
               <Network size={20} className="text-orange-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-orange-500 font-mono text-[10px] tracking-[0.3em] uppercase font-bold animate-pulse">System Architecture // Level 4</span>
              <h2 className="text-white font-serif font-bold text-lg tracking-tight">PROJECT: INFINITE LEVERAGE</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-orange-500 transition-colors group">
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-grow overflow-y-auto bg-[#080808] text-gray-300 font-sans relative selection:bg-orange-500/30 selection:text-white scroll-smooth">
          {/* Industrial Background Effect */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#f97316 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
          />

          <div className="p-8 md:p-16 max-w-3xl mx-auto space-y-20 relative z-10">
            
            {/* Intro Section */}
            <div className="text-center space-y-8 animate-fade-in-up">
              <div className="inline-block border border-orange-500/30 px-4 py-1.5 rounded-full bg-orange-500/5 text-orange-500 text-[10px] font-mono tracking-[0.3em] uppercase mb-4 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
                 The Scaling Algorithm
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[1.1] text-white">
                당신의 손발을 <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">잘라내라.</span>
              </h1>
              <p className="font-serif text-xl text-white/70 italic max-w-2xl mx-auto leading-relaxed border-l-4 border-orange-500/50 pl-6 text-left md:text-center mt-8">
                "당신이 직접 일하고 있다면, 당신은 CEO가 아닙니다. <br/>
                가장 비싼 급여를 받는 <strong>잡부(Janitor)</strong>일 뿐입니다."
              </p>
            </div>

            {/* Warning Box */}
            <div className="bg-orange-950/20 border border-orange-500/30 p-6 rounded-sm flex gap-4 items-start">
               <Activity className="text-orange-500 shrink-0 mt-1" />
               <div className="space-y-2">
                  <h4 className="text-orange-500 font-bold uppercase text-xs tracking-widest">Time Dilation Warning</h4>
                  <p className="text-sm text-orange-200/60 font-serif leading-relaxed">
                     당신의 시간은 24시간으로 제한되어 있습니다. 
                     이 물리적 한계를 깨지 못하면(Time Decoupling), 당신의 소득은 영원히 노동 시간이라는 감옥에 갇히게 됩니다.
                     지금부터 당신을 1명이 아닌 <strong>100명</strong>으로 복제하는 기술을 전수합니다.
                  </p>
               </div>
            </div>

            {/* Step 1: The Separation */}
            <section className="space-y-8">
               <div className="flex items-center gap-4 text-orange-500">
                  <span className="font-mono text-3xl font-black opacity-30">01</span>
                  <h3 className="text-2xl font-serif font-black uppercase tracking-tight text-white">
                     뇌(Brain)와 손(Hands)의 분리
                  </h3>
               </div>
               <div className="space-y-6 text-lg leading-relaxed font-light">
                  <p>
                     대부분의 1인 사업가는 <strong>기획(Brain)</strong>과 <strong>실행(Hands)</strong>을 동시에 합니다. 이것이 비효율의 극치입니다.
                     뇌가 생각하다가, 손으로 타이핑하다가, 다시 생각합니다. 엔진을 껐다 켰다 하는 것과 같습니다.
                  </p>
                  <p>
                     오늘부터 당신의 업무를 두 가지로 칼같이 나누십시오.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                     <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
                        <span className="text-orange-400 font-bold uppercase text-xs tracking-widest block mb-2">Zone A: The Architect</span>
                        <ul className="text-sm space-y-2 list-disc list-inside text-gray-300">
                           <li>전략 수립 및 의사결정</li>
                           <li>시스템 설계 및 위기 관리</li>
                           <li>핵심 카피라이팅 및 오퍼(Offer) 제작</li>
                           <li><strong>(당신은 오직 이것만 해야 함)</strong></li>
                        </ul>
                     </div>
                     <div className="p-6 bg-[#111] border border-white/5 rounded-sm opacity-60">
                        <span className="text-gray-500 font-bold uppercase text-xs tracking-widest block mb-2">Zone B: The Machine</span>
                        <ul className="text-sm space-y-2 list-disc list-inside text-gray-500">
                           <li>자료 조사 및 데이터 입력</li>
                           <li>CS 답변 및 이메일 발송</li>
                           <li>영상 편집 및 썸네일 제작</li>
                           <li><strong>(이것을 하는 순간 당신은 망함)</strong></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </section>

            {/* Step 2: SOP (Standard Operating Procedure) */}
            <section className="space-y-8">
               <div className="flex items-center gap-4 text-orange-500">
                  <span className="font-mono text-3xl font-black opacity-30">02</span>
                  <h3 className="text-2xl font-serif font-black uppercase tracking-tight text-white">
                     인간을 코딩하라 (SOP)
                  </h3>
               </div>
               <div className="space-y-6 text-lg leading-relaxed font-light">
                  <p>
                     타인에게 일을 맡기지 못하는 이유는 딱 하나입니다. <br/>
                     <span className="text-white font-bold bg-white/10 px-2">"내가 하는 게 더 빨라서."</span>
                  </p>
                  <p>
                     당연합니다. 당신 머릿속에만 알고리즘이 있으니까요. 타인을 당신처럼 움직이게 하려면, 
                     당신의 뇌를 꺼내서 문서화해야 합니다. 이것이 바로 <strong>SOP(표준 운영 절차)</strong>입니다.
                  </p>
                  <p>
                     직원을 '사람'으로 대하지 마십시오. 입력값(Input)을 넣으면 결괏값(Output)을 뱉는 <strong>'함수(Function)'</strong>로 대하십시오.
                     감정을 배제하고, 초등학생도 따라 할 수 있는 매뉴얼을 만드십시오.
                  </p>
                  
                  {/* Interactive SOP Template */}
                  <div className="mt-6 bg-[#151515] border border-orange-500/30 p-6 rounded-sm relative group">
                     <div className="absolute top-4 right-4">
                        <button 
                           onClick={() => copyToClipboard(`[업무명]: 블로그 포스팅 발행\n[목표]: 1일 1포스팅, 체류시간 2분 이상\n\n[Step 1] 주제 선정\n- '키워드마스터' 접속 -> '사무실 간식' 검색\n- 조회수 1000~5000 사이 키워드 3개 선정\n\n[Step 2] 초안 작성 (GPT 활용)\n- 프롬프트 입력: "이 키워드로 30대 직장인이 공감할 글 1500자 작성해줘"\n- 톤앤매너: 친근하게, 옆자리 동료처럼\n\n[Step 3] 이미지 삽입\n- 미드저니 사용 (프롬프트: modern office snack bar, hyper realistic)\n- 3문단마다 이미지 1개 배치\n\n[Checklist]\n- [ ] 맞춤법 검사 완료?\n- [ ] 썸네일에 텍스트 들어갔는가?\n- [ ] 하단에 '구매 링크' 포함되었는가?`)}
                           className="flex items-center gap-2 text-[10px] font-mono uppercase text-orange-500 hover:text-white border border-orange-500/30 px-3 py-1.5 rounded-sm hover:bg-orange-500 transition-all"
                        >
                           <Copy size={12} /> Copy Template
                        </button>
                     </div>
                     <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <FileText size={16} className="text-orange-500"/> 
                        SOP 예시: 블로그 포스팅 자동화
                     </h4>
                     <pre className="font-mono text-xs text-gray-400 whitespace-pre-wrap leading-relaxed">
{`[업무명]: 블로그 포스팅 발행
[목표]: 1일 1포스팅, 체류시간 2분 이상

[Step 1] 주제 선정
- '키워드마스터' 접속 -> '사무실 간식' 검색
- 조회수 1000~5000 사이 키워드 3개 선정

[Step 2] 초안 작성 (GPT 활용)
- 프롬프트 입력: "이 키워드로 30대 직장인이 공감할 글 1500자 작성해줘"
- 톤앤매너: 친근하게, 옆자리 동료처럼

[Step 3] 이미지 삽입
- 미드저니 사용 (프롬프트: modern office snack bar, hyper realistic)
- 3문단마다 이미지 1개 배치

[Checklist]
- [ ] 맞춤법 검사 완료?
- [ ] 썸네일에 텍스트 들어갔는가?
- [ ] 하단에 '구매 링크' 포함되었는가?`}
                     </pre>
                  </div>
               </div>
            </section>

            {/* Step 3: Global Arbitrage */}
            <section className="space-y-8">
               <div className="flex items-center gap-4 text-orange-500">
                  <span className="font-mono text-3xl font-black opacity-30">03</span>
                  <h3 className="text-2xl font-serif font-black uppercase tracking-tight text-white">
                     글로벌 용병(Mercenaries) 고용
                  </h3>
               </div>
               <div className="space-y-6 text-lg leading-relaxed font-light">
                  <p>
                     한국 직원을 고용하지 마십시오. 비쌉니다. 4대 보험, 퇴직금, 노동법... 복잡합니다.
                     우리는 <strong>환차익(Arbitrage)</strong>을 이용해야 합니다.
                  </p>
                  <p>
                     필리핀, 인도의 영어를 구사하는 고학력 인재들은 시간당 <strong>3~5달러(약 5천 원)</strong>에 고용할 수 있습니다.
                     당신의 1시간 가치가 5만 원이라면, 5천 원짜리 용병에게 일을 맡기고 10배의 레버리지를 일으키십시오.
                  </p>
                  
                  <div className="bg-[#111] p-6 rounded-sm border-l-2 border-orange-500 space-y-4">
                     <div className="flex items-center gap-2 text-white font-bold">
                        <Globe size={16} className="text-orange-500" />
                        <span>추천 플랫폼 & 채용 전략</span>
                     </div>
                     <ul className="text-sm space-y-2 text-gray-400 list-disc list-inside">
                        <li><strong>Upwork / Fiverr:</strong> 전 세계 프리랜서 마켓.</li>
                        <li><strong>OnlineJobs.ph:</strong> 필리핀 전용 (가장 저렴하고 성실함).</li>
                        <li><strong>전략:</strong> "간단한 테스트 업무(유급)"를 먼저 시켜보고, 통과한 3명 중 1명을 장기 채용하라.</li>
                     </ul>
                  </div>
               </div>
            </section>

            {/* Step 4: AI Integration */}
            <section className="space-y-8">
               <div className="flex items-center gap-4 text-orange-500">
                  <span className="font-mono text-3xl font-black opacity-30">04</span>
                  <h3 className="text-2xl font-serif font-black uppercase tracking-tight text-white">
                     AI: 잠들지 않는 노예
                  </h3>
               </div>
               <div className="space-y-6 text-lg leading-relaxed font-light">
                  <p>
                     용병조차 귀찮다면, AI를 쓰십시오. 이것은 월 3만 원짜리 무한 동력입니다.
                     하지만 AI는 '알아서' 해주지 않습니다. 
                     앞서 만든 <strong>SOP를 프롬프트(Prompt) 형태로 변환</strong>하여 입력해야 합니다.
                  </p>
                  <p>
                     기획은 당신이, 초안은 AI가, 검수는 용병이.
                     이 3단계 파이프라인이 완성되는 순간, 당신은 일주일에 4시간만 일하고도 제국을 운영할 수 있습니다.
                  </p>
                  <div className="flex justify-center py-6">
                     <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-orange-500/60">
                        <span>You (Architect)</span>
                        <ArrowRight size={14} />
                        <span>AI (Generator)</span>
                        <ArrowRight size={14} />
                        <span>VA (Operator)</span>
                        <ArrowRight size={14} />
                        <span className="text-white font-bold border-b border-orange-500 pb-1">Auto Revenue</span>
                     </div>
                  </div>
               </div>
            </section>

          </div>

          {/* --- FOOTER: CONDITIONAL CONTENT (FREE CTA vs VIP ADVANCED) --- */}
          <div className="mt-20 border-t border-orange-500/30 bg-[#050505] relative">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(249,115,22,0.1)_0%,_transparent_70%)] pointer-events-none" />
             
             {!isVip ? (
                // FREE MODE: THE TIME BILL CTA
                <div className="max-w-3xl mx-auto p-12">
                    <div className="text-center space-y-4 mb-10">
                       <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                          <span className="text-orange-500">The Final Calculation</span>
                       </h2>
                       <p className="text-gray-400 font-serif italic">
                          "당신은 돈을 아끼기 위해 수명을 태우고 있습니다. 계산기를 두드려 보십시오."
                       </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10 rounded-sm overflow-hidden">
                       {/* Left: DIY (Pain) */}
                       <div className="bg-[#111] p-8 space-y-6 opacity-60 hover:opacity-80 transition-opacity">
                          <div className="text-center border-b border-white/10 pb-4">
                             <h4 className="text-gray-500 font-bold uppercase tracking-widest text-sm">Do It Yourself (직접 하기)</h4>
                             <p className="text-[10px] text-gray-600 font-mono mt-1">Trial & Error Path</p>
                          </div>
                          <ul className="space-y-4 text-sm text-gray-500 font-mono">
                             <li className="flex justify-between">
                                <span>시행착오:</span> <span>3 Years</span>
                             </li>
                             <li className="flex justify-between">
                                <span>스트레스:</span> <span>Extreme</span>
                             </li>
                             <li className="flex justify-between">
                                <span>SOP 작성:</span> <span>500 Hours</span>
                             </li>
                             <li className="flex justify-between border-t border-white/10 pt-2 text-white">
                                <span>COST:</span> <span className="line-through decoration-red-500">Your Youth</span>
                             </li>
                          </ul>
                       </div>

                       {/* Right: System (Gain) */}
                       <div className="bg-orange-950/20 p-8 space-y-6 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/20 blur-[40px] pointer-events-none" />
                          <div className="text-center border-b border-orange-500/30 pb-4">
                             <h4 className="text-orange-500 font-bold uppercase tracking-widest text-sm">Copy The System (복제)</h4>
                             <p className="text-[10px] text-orange-400/60 font-mono mt-1">Instant Deployment</p>
                          </div>
                          <ul className="space-y-4 text-sm text-gray-300 font-mono">
                             <li className="flex justify-between">
                                <span>세팅 시간:</span> <span className="text-white font-bold">3 Hours</span>
                             </li>
                             <li className="flex justify-between">
                                <span>리스크:</span> <span className="text-white font-bold">Zero (Verified)</span>
                             </li>
                             <li className="flex justify-between">
                                <span>SOP 제공:</span> <span className="text-white font-bold">Included</span>
                             </li>
                             <li className="flex justify-between border-t border-orange-500/30 pt-2 text-orange-400 text-lg font-bold">
                                <span>COST:</span> <span>290,000 KRW</span>
                             </li>
                          </ul>
                       </div>
                    </div>

                    <div className="mt-10 space-y-6 text-center">
                       <Button 
                          onClick={onCheckout}
                          className="w-full py-6 text-xl font-black uppercase tracking-[0.2em] bg-orange-500 text-black border-none shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:shadow-[0_0_60px_rgba(249,115,22,0.6)] animate-pulse-cta"
                       >
                          <span className="flex items-center justify-center gap-3">
                             <Clock size={24} className="animate-spin-slow" />
                             3년의 시간 훔치기 (Buy Time)
                             <ChevronRight size={24} />
                          </span>
                       </Button>
                       <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                          * 이 제안은 예고 없이 종료될 수 있습니다. 당신의 시간은 지금도 흐르고 있습니다.
                       </p>
                    </div>
                </div>
             ) : (
                // VIP MODE: ADVANCED PROTOCOLS
                <div className="max-w-3xl mx-auto p-12">
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-500 text-[10px] font-mono uppercase tracking-widest">
                            <Lock size={12} /> Confidential Access
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                            PART 2. <span className="text-orange-500">SYSTEM MASTERY</span>
                        </h2>
                        <p className="text-gray-400 font-serif italic text-lg">
                            "축하합니다. 당신은 시간을 샀습니다. 이제 그 시간으로 제국을 완성할 차례입니다."
                        </p>
                    </div>

                    <div className="space-y-16">
                        {/* Module 5: The Panopticon Protocol (Modified per request) */}
                        <section className="relative pl-8 border-l-2 border-orange-500/30">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-500 border-4 border-[#050505]" />
                            <h3 className="text-2xl font-bold text-white mb-4">05. 감시자의 지배 (The Panopticon)</h3>
                            <div className="space-y-4 text-gray-300 leading-relaxed font-light text-lg">
                                <p>
                                    "신뢰는 통제가 아니다. 확인이 통제다."
                                </p>
                                <p>
                                    자동화 시스템의 가장 큰 적은 <strong>엔트로피(무질서)</strong>입니다.
                                    관리자가 사라지면, AI는 할루시네이션을 뱉고, 외주 직원은 태만해집니다.
                                    그렇다고 당신이 매일 감시한다면? 당신은 다시 '관리직 노동자'로 전락합니다.
                                </p>
                                <p>
                                    해답은 <strong>'무작위 감사(Random Audit)'</strong>입니다.
                                    감옥의 죄수들이 간수가 보이지 않아도 규율을 지키는 이유는, 간수가 '언제 볼지 모르기' 때문입니다.
                                    당신은 시스템의 파놉티콘이 되어야 합니다.
                                </p>
                            </div>
                            <div className="mt-6 bg-[#111] p-6 rounded-sm border border-white/10 text-sm font-mono text-orange-400">
                                <span className="block mb-2 text-white/50 uppercase tracking-widest text-xs">Action Item</span>
                                1. 매주 금요일 오후 4시 알람 설정.<br/>
                                2. 지난주 작업물 중 무작위로 3개를 열람.<br/>
                                3. 오타나 오류 발견 시, 수정 지시가 아닌 '경고(Strike)'만 부여.<br/>
                                4. 3 Strike 아웃 제도 도입. (시스템의 긴장감 유지)
                            </div>
                        </section>

                        {/* Module 6: Decision Matrix */}
                        <section className="relative pl-8 border-l-2 border-orange-500/30">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-500 border-4 border-[#050505]" />
                            <h3 className="text-2xl font-bold text-white mb-4">06. 결정의 알고리즘 (Decision Matrix)</h3>
                            <div className="space-y-4 text-gray-300 leading-relaxed font-light text-lg">
                                <p>
                                    "대표가 결정을 내리는 순간, 병목(Bottleneck)이 발생한다."
                                </p>
                                <p>
                                    직원이 당신에게 "이거 환불해줘도 될까요?", "이 메일 어떻게 답장할까요?"라고 묻는다면,
                                    그건 직원의 무능이 아니라 당신의 <strong>직무 유기</strong>입니다.
                                    당신의 뇌 속에 있는 판단 기준을 꺼내어 코드화하지 않았기 때문입니다.
                                </p>
                                <p>
                                    판단(Judgment)을 위임하지 마십시오. 그건 위험합니다.
                                    대신 <strong>규칙(Rule)</strong>을 위임하십시오.
                                    <span className="text-white font-bold"> 'If-Then' 알고리즘</span>을 짜주면, 침팬지도 CEO처럼 결정을 내릴 수 있습니다.
                                </p>
                            </div>
                            <div className="mt-6 p-6 rounded-sm bg-white/5 border border-white/10 font-mono text-xs text-gray-400">
                                <p className="text-orange-500 font-bold mb-2">// EXAMPLE: CS DECISION TREE</p>
                                IF (환불 요청) {'{'}<br/>
                                &nbsp;&nbsp;IF (결제일 &lt; 7일) AND (사용 기록 == NULL) {'{'}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;RETURN "묻지마 전액 환불";<br/>
                                &nbsp;&nbsp;{'}'} ELSE IF (진상 고객 == TRUE) {'{'}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;RETURN "환불 후 영구 차단 (블랙리스트)";<br/>
                                &nbsp;&nbsp;{'}'} ELSE {'{'}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;RETURN "규정 설명 매크로 발송";<br/>
                                &nbsp;&nbsp;{'}'}<br/>
                                {'}'}
                            </div>
                        </section>

                        {/* Module 7: The Exit */}
                        <section className="relative pl-8 border-l-2 border-orange-500/30">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-500 border-4 border-[#050505]" />
                            <h3 className="text-2xl font-bold text-white mb-4">07. 제국의 매각 (The Exit Strategy)</h3>
                            <div className="space-y-4 text-gray-300 leading-relaxed font-light text-lg">
                                <p>
                                    "시스템의 완성은, 시스템의 판매다."
                                </p>
                                <p>
                                    당신이 없어도 100% 돌아가는 회사를 만들었습니까?
                                    그렇다면 당신은 '현금 흐름(Cashflow)' 뿐만 아니라 거대한 '자산(Asset)'을 소유한 것입니다.
                                </p>
                                <p>
                                    월 1,000만 원 버는 쇼핑몰보다, 
                                    <strong>'월 1,000만 원 버는 쇼핑몰을 운영하는 완벽한 매뉴얼'</strong>이 시장 가치가 더 높습니다.
                                    당신이 구축한 모든 SOP, 결정 매트릭스, 자동화 툴을 패키징하십시오.
                                    그리고 기업이나 투자자에게 <strong>M&A(매각)</strong>하십시오.
                                </p>
                                <p>
                                    이것이 자본주의 게임의 <strong>엔딩 크레딧</strong>입니다.
                                    수십 년치의 연봉을 일시불로 땡기는 기술, 엑시트(Exit)를 준비하십시오.
                                </p>
                            </div>
                            <div className="flex justify-end mt-12">
                                <div className="text-right">
                                    <span className="text-[10px] font-mono text-orange-500 uppercase tracking-widest block mb-1">Clearance Level</span>
                                    <span className="text-3xl font-black text-white tracking-tighter">ARCHITECT</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
             )}
          </div>

        </div>
      </div>
    </div>
  );
};
