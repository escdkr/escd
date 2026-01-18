import React, { useState } from 'react';

type LegalSection = 'terms' | 'privacy' | 'refund' | 'company';

export const LegalPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<LegalSection>('terms');

  const menuItems: { id: LegalSection; label: string }[] = [
    { id: 'terms', label: '이용약관' },
    { id: 'privacy', label: '개인정보처리방침' },
    { id: 'refund', label: '환불 정책' },
    { id: 'company', label: '사업자 정보' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'terms':
        return (
          <div className="space-y-12 animate-fade-in">
            <section className="space-y-6">
              <h2 className="font-serif font-black text-3xl text-gold italic tracking-tight">제1조 (목적)</h2>
              <p className="text-gray-400 leading-loose">
                이 약관은 ESCD(이하 "회사"라 함)가 운영하는 웹사이트 및 관련 서비스(이하 "서비스"라 함)를 이용함에 있어 
                회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>
            <section className="space-y-6">
              <h2 className="font-serif font-black text-3xl text-gold italic tracking-tight">제2조 (용어의 정의)</h2>
              <p className="text-gray-400 leading-loose">
                1. "서비스"란 회사가 지식 콘텐츠 판매 및 교육을 위해 제공하는 온라인 플랫폼을 의미합니다.<br />
                2. "이용자"란 서비스를 이용하는 모든 회원 및 비회원을 의미합니다.<br />
                3. "콘텐츠"란 회사가 제작한 전자책(PDF), 동영상 강의 등 디지털 자산을 의미합니다.
              </p>
            </section>
            <section className="space-y-6">
              <h2 className="font-serif font-black text-3xl text-gold italic tracking-tight">제3조 (서비스 이용 계약)</h2>
              <div className="p-8 bg-white/5 border border-white/5 rounded-sm">
                <p className="text-gray-400 leading-loose">
                  이용 계약은 이용자가 회사가 정한 약관에 동의하고 유료 콘텐츠를 구매함으로써 성립됩니다. 
                  회사는 특정 등급(VIP 등)의 이용자에게 차별화된 서비스를 제공할 수 있습니다.
                </p>
              </div>
            </section>
            <section className="space-y-6">
              <h2 className="font-serif font-black text-3xl text-gold italic tracking-tight">제4조 (지식재산권)</h2>
              <p className="text-gray-400 leading-loose">
                회사가 제공하는 모든 콘텐츠의 저작권 및 기타 지식재산권은 회사에 귀속됩니다. 
                이용자는 회사의 사전 서면 동의 없이 콘텐츠를 복제, 전송, 배포하거나 영리 목적으로 이용할 수 없습니다. 
                이를 위반할 경우 관련 법령에 따른 민형사상의 책임을 질 수 있습니다.
              </p>
            </section>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-12 animate-fade-in">
            <section className="space-y-6">
              <h2 className="font-serif font-black text-3xl text-gold italic tracking-tight">개인정보 수집 및 이용</h2>
              <p className="text-gray-400 leading-loose">
                ESCD는 이용자의 서비스 제공을 위해 최소한의 개인정보를 수집하고 있습니다. 
                수집된 정보는 서비스 제공, 고객 관리, 마케팅 활용(동의 시) 외의 목적으로는 사용되지 않습니다.
              </p>
            </section>
            <section className="space-y-6">
              <h2 className="font-serif font-black text-3xl text-gold italic tracking-tight">수집 항목</h2>
              <ul className="list-disc list-inside text-gray-400 leading-loose space-y-2">
                <li>필수 항목: 성명, 이메일 주소, 휴대전화 번호, 결제 정보</li>
                <li>자동 수집 항목: IP 주소, 쿠키, 서비스 이용 기록</li>
              </ul>
            </section>
            <section className="space-y-6">
              <h2 className="font-serif font-black text-3xl text-gold italic tracking-tight">보유 및 이용 기간</h2>
              <div className="p-8 bg-white/5 border border-white/5 rounded-sm">
                <p className="text-gray-400 leading-loose italic">
                  이용자의 개인정보는 원칙적으로 목적이 달성된 후 지체 없이 파기합니다. 
                  단, 관련 법령(전자상거래법 등)에 따라 보존이 필요한 경우 명시된 기간 동안 보관합니다.
                </p>
              </div>
            </section>
          </div>
        );
      case 'refund':
        return (
          <div className="space-y-12 animate-fade-in">
            <section className="space-y-6">
              <h2 className="font-serif font-black text-3xl text-gold italic tracking-tight">디지털 콘텐츠 환불 규정</h2>
              <div className="p-10 bg-white/5 border border-gold/20 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl pointer-events-none" />
                <p className="text-white/90 font-bold leading-loose mb-6">
                  ESCD가 제공하는 모든 상품은 디지털 콘텐츠(전자책, 동영상)의 특성을 가지고 있습니다.
                </p>
                <ul className="text-gray-400 leading-loose space-y-4">
                  <li>1. 콘텐츠를 다운로드하거나 열람(로그인 후 열람 기록 발생)한 경우 환불이 불가능합니다.</li>
                  <li>2. 구매 후 7일 이내에 콘텐츠를 열람하지 않은 경우 전액 환불이 가능합니다.</li>
                  <li>3. 콘텐츠 자체에 중대한 결함이 있어 이용이 불가능한 경우 별도의 보상 규정에 따릅니다.</li>
                </ul>
              </div>
            </section>
            <section className="space-y-6">
              <h2 className="font-serif font-black text-3xl text-gold italic tracking-tight">환불 절차</h2>
              <p className="text-gray-400 leading-loose">
                환불 요청은 고객센터 이메일(help@escd.io)을 통해 접수하며, 
                본인 확인 및 열람 여부 검토 후 3영업일 이내에 처리됩니다.
              </p>
            </section>
          </div>
        );
      case 'company':
        return (
          <div className="space-y-12 animate-fade-in">
            <section className="space-y-8">
              <h2 className="font-serif font-black text-3xl text-gold italic tracking-tight">사업자 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-sm">
                <div className="space-y-2">
                  <span className="text-white/20 font-mono tracking-widest uppercase">Company Name</span>
                  <p className="text-white font-serif text-xl font-bold">ESCD (Escape Dagger)</p>
                </div>
                <div className="space-y-2">
                  <span className="text-white/20 font-mono tracking-widest uppercase">Representative</span>
                  <p className="text-white font-serif text-xl font-bold">The Architect</p>
                </div>
                <div className="space-y-2">
                  <span className="text-white/20 font-mono tracking-widest uppercase">Registration No.</span>
                  <p className="text-white font-mono text-lg">000-00-00000</p>
                </div>
                <div className="space-y-2">
                  <span className="text-white/20 font-mono tracking-widest uppercase">Contact</span>
                  <p className="text-white font-mono text-lg">help@escd.io</p>
                </div>
                <div className="col-span-full space-y-2 pt-6 border-t border-white/5">
                  <span className="text-white/20 font-mono tracking-widest uppercase">Address</span>
                  <p className="text-gray-400 leading-loose">
                    서울특별시 강남구 테헤란로 000, ESCD 타워 99층 (시스템 지하 사령부)
                  </p>
                </div>
              </div>
            </section>
            <div className="pt-20 border-t border-white/5">
              <p className="text-[10px] text-white/20 font-mono tracking-widest uppercase">
                Last Updated: 2025.01.01 | Version 1.0.4
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-16 py-20 relative min-h-[80vh]">
      {/* Left Sidebar (25%) */}
      <aside className="md:w-1/4">
        <div className="sticky top-32 space-y-12">
          <div className="space-y-2">
             <h1 className="font-serif font-black text-4xl text-white tracking-tighter uppercase">Legal <br/> <span className="text-gold">Archives</span></h1>
             <p className="text-[10px] text-white/30 font-mono tracking-widest uppercase leading-loose">Rule of the empire</p>
          </div>
          
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center py-4 px-6 text-xs tracking-[0.2em] uppercase transition-all duration-300 text-left border-l-[3px] relative ${
                  activeSection === item.id 
                    ? 'text-[#FCF6BA] font-bold bg-[#BF953F]/10 border-[#BF953F] shadow-[inset_4px_0_15px_-5px_rgba(191,149,63,0.3)]' 
                    : 'text-gray-500 hover:text-gray-300 border-transparent hover:bg-white/[0.02]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Right Content (75%) */}
      <main className="md:w-3/4 pb-32">
        <div className="max-w-3xl">
          {renderContent()}
        </div>
      </main>

      <style>{`
        ::-webkit-scrollbar {
          width: 3px;
        }
        ::-webkit-scrollbar-track {
          background: #020617;
        }
        ::-webkit-scrollbar-thumb {
          background: #1e293b;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
    </div>
  );
};