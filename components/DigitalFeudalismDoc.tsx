
import React from 'react';
import { X, Cpu, Globe, Users, TrendingUp, Lock, Server, Crown, Network } from 'lucide-react';
import { Button } from './Button';

interface DigitalFeudalismDocProps {
  onClose: () => void;
}

export const DigitalFeudalismDoc: React.FC<DigitalFeudalismDocProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/95 backdrop-blur-xl animate-fade-in p-4 pt-24 md:p-8 md:pt-28 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#030014] shadow-[0_0_100px_rgba(147,51,234,0.15)] border border-purple-900/40 flex flex-col md:h-[80vh] h-full rounded-sm overflow-hidden mb-20">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-900/30 bg-[#02010a] z-20 relative shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-purple-900/10 rounded-sm border border-purple-500/20 shadow-[0_0_10px_rgba(147,51,234,0.2)]">
               <Cpu size={20} className="text-purple-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-purple-500 font-mono text-[10px] tracking-[0.3em] uppercase font-bold animate-pulse">Future Intelligence // Level 9</span>
              <h2 className="text-white font-serif font-bold text-lg tracking-tight">PROJECT: DIGITAL FEUDALISM</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-purple-500 transition-colors group">
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-grow overflow-y-auto bg-[#050508] text-purple-100 font-sans relative selection:bg-purple-500/30 selection:text-white scroll-smooth">
          
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(88,28,135,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(88,28,135,0.05)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[150px] pointer-events-none" />

          <div className="max-w-3xl mx-auto p-8 md:p-16 relative z-10 space-y-24">
            
            {/* Intro Section */}
            <div className="text-center space-y-8 animate-fade-in-up">
              <div className="inline-block border border-purple-500/30 px-4 py-1.5 rounded-full bg-purple-500/5 text-purple-400 text-[10px] font-mono tracking-[0.3em] uppercase mb-4 shadow-[0_0_20px_rgba(147,51,234,0.2)]">
                 The Next Wave Protocol
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[1.1] text-white">
                새로운 계급 사회: <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-600">디지털 봉건제</span>
              </h1>
              <p className="font-serif text-xl text-purple-200/60 italic max-w-2xl mx-auto leading-relaxed border-l-4 border-purple-500/50 pl-6 text-left md:text-center mt-8">
                "AI는 인간을 대체하지 않습니다. <br/>
                AI를 소유한 <strong className="text-purple-400">지주(Landlord)</strong>가, AI를 쓰지 못하는 <strong className="text-white/50 line-through">소작농</strong>을 대체할 뿐입니다."
              </p>
            </div>

            {/* The Hierarchy Visual */}
            <div className="space-y-8">
               <h3 className="text-2xl font-serif font-black text-white uppercase tracking-widest text-center">The New Class Structure</h3>
               <div className="flex flex-col gap-1 relative">
                  {/* Tier 1 */}
                  <div className="p-8 bg-purple-900/20 border border-purple-500/40 rounded-t-sm flex items-center gap-6 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div className="p-4 bg-black rounded-full border border-purple-500/50 text-purple-400 z-10"><Crown size={32} /></div>
                     <div className="z-10">
                        <h4 className="text-xl font-bold text-white tracking-wide">The Landlords (디지털 지주)</h4>
                        <p className="text-sm text-purple-300/60 font-serif">알고리즘, 플랫폼, AI 모델 소유자. 노동하지 않고 '구독료(Rent)'를 걷는 최상위 포식자.</p>
                     </div>
                  </div>
                  {/* Tier 2 */}
                  <div className="p-8 bg-purple-900/10 border-x border-purple-500/20 flex items-center gap-6 relative overflow-hidden group">
                     <div className="p-4 bg-black rounded-full border border-purple-500/20 text-purple-300 z-10"><Server size={32} /></div>
                     <div className="z-10">
                        <h4 className="text-lg font-bold text-purple-100 tracking-wide">The Knights (AI 오퍼레이터)</h4>
                        <p className="text-sm text-purple-300/40 font-serif">지주의 도구(AI)를 능숙하게 다루는 기술자. 지주에게 고용되어 높은 연봉을 받지만, 자산은 없다.</p>
                     </div>
                  </div>
                  {/* Tier 3 */}
                  <div className="p-8 bg-black/40 border border-purple-500/10 rounded-b-sm flex items-center gap-6 relative overflow-hidden opacity-60">
                     <div className="p-4 bg-black rounded-full border border-white/10 text-gray-600 z-10"><Users size={32} /></div>
                     <div className="z-10">
                        <h4 className="text-lg font-bold text-gray-500 tracking-wide">The Serfs (디지털 소작농)</h4>
                        <p className="text-sm text-gray-600 font-serif">단순 노동 제공자. AI보다 효율이 낮아 시장에서 도태되거나, 최저임금 경쟁으로 내몰림.</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Strategy 1: Data Monopoly */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-purple-900/30 pt-16">
               <div className="md:col-span-4 space-y-2">
                  <span className="text-purple-500 font-mono text-xs tracking-[0.2em] uppercase">Strategy 01</span>
                  <h3 className="text-2xl font-bold text-white">데이터 영지화<br/>(Data Fiefdom)</h3>
               </div>
               <div className="md:col-span-8 space-y-6 text-lg text-purple-100/80 font-light leading-relaxed">
                  <p>
                     과거의 땅은 '토지'였지만, 미래의 땅은 <strong>'데이터(Data)'</strong>입니다.
                     당신의 고객들이 남기는 흔적(이메일, 구매 기록, 행동 패턴)을 플랫폼(네이버, 유튜브)에 뺏기지 마십시오.
                  </p>
                  <p>
                     유튜브 구독자는 당신의 자산이 아닙니다. 구글의 자산입니다. 계정이 삭제되면 끝입니다.
                     반드시 <strong>자사몰, 뉴스레터, 커뮤니티</strong>로 고객을 이주시켜, 당신만이 통제 가능한 '데이터 영지'를 구축하십시오.
                  </p>
                  <div className="bg-black p-4 rounded-sm border-l-2 border-purple-500 text-sm font-mono text-purple-300">
                     Action: "무료 소책자를 미끼로 이메일 리스트(DB)를 확보하라. 그것이 당신의 영토 문서다."
                  </div>
               </div>
            </section>

            {/* Strategy 2: AI Workforce */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-purple-900/30 pt-16">
               <div className="md:col-span-4 space-y-2">
                  <span className="text-purple-500 font-mono text-xs tracking-[0.2em] uppercase">Strategy 02</span>
                  <h3 className="text-2xl font-bold text-white">무생물 노동력<br/>(Silicon Workforce)</h3>
               </div>
               <div className="md:col-span-8 space-y-6 text-lg text-purple-100/80 font-light leading-relaxed">
                  <p>
                     인간 직원을 고용하는 것은 '봉건제' 시대의 방식입니다. 
                     이제는 먹지도, 자지도, 불평하지도 않는 <strong>AI 에이전트(Agent)</strong>를 고용해야 합니다.
                  </p>
                  <p>
                     CS 응대, 상세페이지 제작, SNS 포스팅... 이 모든 것을 자동화 봇에게 위임하십시오.
                     당신은 1명이지만, 100명의 AI 군단을 거느린 <strong>'사령관'</strong>이 되어야 합니다.
                     인건비가 0에 수렴할 때, 마진율은 무한대로 발산합니다.
                  </p>
               </div>
            </section>

            {/* Strategy 3: The Toll Booth */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-purple-900/30 pt-16 pb-10">
               <div className="md:col-span-4 space-y-2">
                  <span className="text-purple-500 font-mono text-xs tracking-[0.2em] uppercase">Strategy 03</span>
                  <h3 className="text-2xl font-bold text-white">통행세 징수<br/>(The Toll Booth)</h3>
               </div>
               <div className="md:col-span-8 space-y-6 text-lg text-purple-100/80 font-light leading-relaxed">
                  <p>
                     물건을 팔아서 돈을 버는 건 하수입니다. 물건이 오가는 <strong>'길목'</strong>을 지키고 서서 통행세를 받아야 합니다.
                  </p>
                  <p>
                     정보의 격차(Information Asymmetry)가 있는 곳에 다리를 놓으십시오.
                     공급자와 수요자를 연결하는 매칭 플랫폼, 큐레이션 뉴스레터, 중개 에이전시.
                     직접 생산하지 않고, <strong>연결(Connect)</strong>하고 수수료를 챙기는 구조가 가장 안전한 지주의 수익 모델입니다.
                  </p>
               </div>
            </section>

            {/* Footer */}
            <div className="mt-20 p-10 bg-purple-950/20 border border-purple-500/30 rounded-sm text-center">
               <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-full mb-6">
                  <Globe size={24} className="text-purple-400" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-4">당신의 위치를 정하십시오.</h3>
               <p className="text-purple-200/60 font-serif mb-8">
                  변화는 이미 시작되었습니다. <br/>
                  알고리즘의 지배를 받을 것인가, 알고리즘을 지배할 것인가.
               </p>
               <div className="inline-block px-6 py-2 border border-purple-500/50 text-purple-400 font-mono text-xs uppercase tracking-widest rounded-sm">
                  Status: Architect Clearance Verified
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
