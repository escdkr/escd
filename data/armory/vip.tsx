
import React from 'react';
import { 
  BookOpen, Activity, Grid, Briefcase, CreditCard, Network, Database, ShieldCheck, 
  Brain, Zap, MessageSquare, Magnet, Megaphone, Bot, LayoutTemplate, Crosshair, 
  Landmark, Radio, Crown 
} from 'lucide-react';
import { VIPAsset } from '../../types/armory';

export const VIP_ASSETS: VIPAsset[] = [
  // --- TIER 1: FOUNDATION (CORE) ---
  {
    id: 'c0', 
    code: 'GAGE-GPS-O-ECC',
    title: '무노동의 제국 : Original',
    type: 'CORE',
    tier: 1,
    desc: '당신의 뇌에 박힌 \'노동자\'라는 악성 코드를 영구 삭제합니다. 시스템의 부품이 아닌 설계자로 다시 태어나는 29만 원짜리 원본 OS.',
    value: 'The Origin',
    icon: <BookOpen size={24} />
  },
  {
    id: 'f1', // Standard Asset
    code: 'DIAGNOSTIC-TOOL',
    title: 'The Glitch 진단 키트',
    type: 'CORE',
    tier: 1,
    desc: '당신은 언제까지 멈추면 굶어 죽는 삶을 살 것입니까? 당신의 소득 구조가 시스템에 얼마나 끔찍하게 종속되어 있는지 수치로 증명해 드립니다.',
    value: 'Standard',
    icon: <Activity size={24} />,
    parentId: 'c0'
  },
  {
    id: 'f2', // Standard Asset
    code: 'ZERO-TO-ONE-MAP',
    title: '무자본 창업 로드맵',
    type: 'CORE',
    tier: 1,
    desc: '돈이 없어서 사업을 못 한다고요? 핑계입니다. 0원으로 시작해 첫 수익 100만 원을 찍는 순간까지의, 실패가 불가능한 내비게이션.',
    value: 'Standard',
    icon: <Grid size={24} />,
    parentId: 'c0'
  },
  {
    id: 'v6',
    code: 'CEO-MINDSET',
    title: 'The Architect\'s Note',
    type: 'CORE',
    tier: 1,
    desc: '대중이 알면 폭동이 일어날지도 모릅니다. 자본주의 먹이사슬 최상위 포식자들이 쉬쉬하며 돌려보는 그들만의 생각법.',
    value: 'Mindset Patch',
    icon: <Briefcase size={24} />,
    parentId: 'c0'
  },

  // --- TIER 2: DEFENSE & BASICS (SHIELD/SYSTEM) ---
  {
    id: 'v1',
    code: 'TAX-HAVEN-01',
    title: '합법적 절세 프로토콜',
    type: 'SHIELD',
    tier: 2,
    desc: '버는 것보다 지키는 것이 전쟁입니다. 당신의 피 같은 돈을 시스템에 뺏기지 않고, 합법적으로 0원에 수렴하게 만드는 방어막 기술.',
    value: '₩5,000,000',
    icon: <CreditCard size={24} />,
    parentId: 'c0'
  },
  {
    id: 'c3', // Standard Asset
    code: 'LEVERAGE-PROTOCOL',
    title: '무한 레버리지 프로토콜',
    type: 'CORE',
    tier: 2,
    desc: '당신의 시간은 하루 24시간이 아닙니다. AI와 타인의 시간을 착취하여, 당신을 100명으로 복제하는 \'분신술\'을 전수합니다.',
    value: 'Standard',
    icon: <Network size={24} />,
    parentId: 'f2'
  },
  {
    id: 'f4', // Standard Asset
    code: 'SOURCING-DB',
    title: '시크릿 소싱 데이터베이스',
    type: 'INTEL',
    tier: 2,
    desc: '남들이 도매꾹 뒤질 때, 당신은 공장 사장과 직거래하십시오. 유통 마진을 90% 남기는 1급 기밀 공급처 리스트 50선.',
    value: 'Standard',
    icon: <Database size={24} />,
    parentId: 'f2'
  },
  {
    id: 'v4',
    code: 'LAW-SHIELD-V2',
    title: '블랙 컨슈머 방어권',
    type: 'SHIELD',
    tier: 2,
    desc: '진상 고객에게 쩔쩔매지 마십시오. 법적 조항 한 줄로 그들의 입을 막고, 당신의 멘탈과 자산을 철통같이 지키는 변호사급 방패.',
    value: '₩2,000,000',
    icon: <ShieldCheck size={24} />,
    parentId: 'v1'
  },

  // --- TIER 3: OFFENSE & PSYCHOLOGY (WEAPON) ---
  {
    id: 'v2',
    code: 'PSYCH-OPS-01',
    title: '무조건 YES를 받아내기',
    type: 'WEAPON',
    tier: 3,
    desc: '이건 대화가 아닙니다. 최면입니다. 상대방의 무의식에 침투하여, 거절이라는 선택지 자체를 지워버리는 악마의 설득 기술.',
    value: '₩3,500,000',
    icon: <Brain size={24} />,
    parentId: 'v6'
  },
  {
    id: 'c2', // Standard Asset
    code: 'LIZARD-BRAIN-COPY',
    title: '파충류 뇌 자극 템플릿',
    type: 'WEAPON',
    tier: 3,
    desc: '고객의 이성을 마비시키십시오. 오직 본능(공포, 욕망)을 타격하여, 읽는 순간 결제 버튼을 누르지 않고는 못 배기게 만듭니다.',
    value: 'Standard',
    icon: <Zap size={24} />,
    parentId: 'v2'
  },
  {
    id: 'c6', // Standard Asset
    code: 'FRAME-CONTROL-LITE',
    title: '프레임 컨트롤 대화법',
    type: 'WEAPON',
    tier: 3,
    desc: '더 이상 \'을\'로 살지 마십시오. 어떤 거물 앞에서도 기죽지 않고, 대화의 주도권을 쥐고 흔드는 \'갑\'의 언어 습관.',
    value: 'Standard',
    icon: <MessageSquare size={24} />,
    parentId: 'v2'
  },
  {
    id: 'v7',
    code: 'TRAFFIC-HIJACK',
    title: '손님을 줄 세우는 법',
    type: 'WEAPON',
    tier: 3,
    desc: '광고비 0원으로 오픈런을 만드십시오. 글 하나만 툭 던져도 좀비 떼처럼 사람들이 몰려오게 만드는 트래픽 하이재킹(Hijacking).',
    value: '₩8,000,000',
    icon: <Magnet size={24} />,
    parentId: 'v2'
  },
  {
    id: 'v8',
    code: 'OPINION-CTRL',
    title: '여론 조작 프로토콜',
    type: 'WEAPON',
    tier: 3,
    desc: '진실은 중요하지 않습니다. 믿게 만드는 것이 진실입니다. 대중의 심리를 조종하여 당신을 \'신\'으로 숭배하게 만드는 선동의 기술.',
    value: '₩15,000,000',
    icon: <Megaphone size={24} />,
    parentId: 'v7'
  },

  // --- TIER 4: EMPIRE & AUTOMATION (INTEL/CORE) ---
  {
    id: 'v3',
    code: 'KIOSK-WEB-V9',
    title: '자고 있어도 돈 버는 기계',
    type: 'WEAPON',
    tier: 4,
    desc: '당신이 잠든 사이에도, 여행을 간 사이에도 돈이 쏟아집니다. 24시간 불평 없이 일하는 \'디지털 노예\'를 고용하십시오.',
    value: '₩12,000,000',
    icon: <Bot size={24} />,
    parentId: 'v1'
  },
  {
    id: 'c5', // Standard Asset
    code: 'SILENT-AUTHORITY',
    title: 'Silent Authority',
    type: 'SHIELD',
    tier: 4,
    desc: '진정한 왕은 소리치지 않습니다. 존재 자체만으로 압도적인 권위를 풍기며, 고객을 무릎 꿇게 만드는 무언의 브랜딩.',
    value: 'Standard',
    icon: <LayoutTemplate size={24} />,
    parentId: 'v9'
  },
  {
    id: 'f5', // Standard Asset
    code: 'KEYWORD-SNIPER',
    title: '키워드 스나이퍼',
    type: 'INTEL',
    tier: 4,
    desc: '경쟁자들이 피 터지게 싸우는 레드오션은 피하십시오. 아직 아무도 깃발을 꽂지 않은 황금 키워드를 저격하여 독점하십시오.',
    value: 'Standard',
    icon: <Crosshair size={24} />,
    parentId: 'v3'
  },
  {
    id: 'v9',
    code: 'ARCH-BLUEPRINT',
    title: '30분 만에 10억 가게 짓기',
    type: 'CORE',
    tier: 4,
    desc: '인테리어 업자에게 사기 당하지 마십시오. AI를 노예로 부려, 대기업도 울고 갈 압도적인 브랜드를 단 30분 만에 설계합니다.',
    value: '₩4,500,000',
    icon: <Landmark size={24} />,
    parentId: 'v3'
  },
  {
    id: 'v11',
    code: 'DIGITAL-FEUDAL',
    title: '디지털 봉건제 리포트',
    type: 'INTEL',
    tier: 4,
    desc: '미래는 두 계급으로 나뉩니다. AI를 소유한 지주와, AI에게 지배당하는 소작농. 당신은 어느 쪽이 될 것입니까? 지주가 되는 비밀 문서.',
    value: 'Future Intel',
    icon: <Zap size={24} />,
    parentId: 'v9'
  },

  // --- TIER 5: GOD MODE (APEX) ---
  {
    id: 'v5',
    code: 'INSIDER-LEAK-X',
    title: '내부자 거래 리포트',
    type: 'INTEL',
    tier: 5,
    desc: '뉴스가 나오면 이미 늦습니다. 세력들이 개미들에게 물량을 떠넘기기 72시간 전, 그들이 은밀하게 주고받는 1급 첩보.',
    value: 'Priceless',
    icon: <Radio size={24} />,
    parentId: 'v11'
  },
  {
    id: 'v10',
    code: 'FRAME-CTRL-MAX',
    title: '프레임 컨트롤 : Grand Master',
    type: 'CORE',
    tier: 5,
    desc: '대화의 연금술. 상대의 무의식을 해킹하여 적을 아군으로, 거절을 승낙으로 바꾸는 0.1%의 현실 왜곡장(Reality Distortion Field).',
    value: 'God Tier',
    icon: <Crown size={24} />,
    parentId: 'v11'
  }
];
