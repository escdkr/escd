
import React from 'react';
import { 
  Activity, Grid, Crosshair, Zap, Network, 
  LayoutTemplate, MessageSquare, Database 
} from 'lucide-react';
import { ArmoryAsset } from '../../types/armory';

export const UNIFIED_ARMORY_ASSETS: ArmoryAsset[] = [
  // --- FREE TIER ASSETS (Standard Public Armory) ---
  {
    id: 'f1',
    tier: 'FREE',
    title: 'The Glitch 진단 키트',
    subtitle: '노동 의존도 자가 진단',
    type: '진단 도구', // DIAGNOSTIC
    icon: <Activity size={24} />,
    desc: "당신의 소득 구조가 시스템에 얼마나 종속되어 있는지 수치로 확인하는 계산기."
  },
  {
    id: 'f2',
    tier: 'FREE',
    title: '무자본 창업 로드맵',
    subtitle: '0 to 1 실행 지도',
    type: '전략 지도', // STRATEGY
    icon: <Grid size={24} />,
    desc: "자본금 0원으로 첫 수익을 만들기까지의 구체적인 단계별 미션."
  },
  {
    id: 'f5',
    tier: 'FREE',
    title: '키워드 스나이퍼',
    subtitle: '황금 키워드 채굴기',
    type: '자동화 툴', // TOOL
    icon: <Crosshair size={24} />,
    desc: "경쟁 강도는 낮고 검색량은 높은 시장의 빈틈을 찾아내는 분석 툴."
  },
  {
    id: 'c2',
    tier: 'FREE',
    title: '파충류 뇌 자극 템플릿',
    subtitle: '본능 타격 카피라이팅',
    type: '템플릿', // TEMPLATE
    icon: <Zap size={24} />,
    desc: "이성을 마비시키고 본능(공포, 욕망)을 자극하여 구매 버튼을 누르게 만드는 문장 공식."
  },
  {
    id: 'c3',
    tier: 'FREE',
    title: '무한 레버리지 프로토콜',
    subtitle: '자동화 시스템 설계',
    type: '시스템', // SYSTEM
    icon: <Network size={24} />,
    desc: "나 대신 일하는 AI와 위임 시스템을 구축하여 시간을 0으로 수렴시키는 법."
  },
  {
    id: 'c5',
    tier: 'FREE',
    title: 'Silent Authority',
    subtitle: '무언의 브랜딩',
    type: '브랜딩', // BRANDING
    icon: <LayoutTemplate size={24} />,
    desc: "말하지 않고도 압도적인 권위를 풍기는 시각적 브랜딩 가이드라인."
  },
  {
    id: 'c6',
    tier: 'FREE',
    title: '프레임 컨트롤 대화법',
    subtitle: '갑의 언어',
    type: '스크립트', // SCRIPT
    icon: <MessageSquare size={24} />,
    desc: "협상 테이블에서 언제나 우위를 점하는 심리적 프레임 장악 기술."
  },
  {
    id: 'f4',
    tier: 'FREE',
    title: '시크릿 소싱 데이터베이스',
    subtitle: '공급처 리스트 50선',
    type: '데이터', // DATA
    icon: <Database size={24} />,
    desc: "유통 마진을 획기적으로 줄여주는 검증된 도매처 및 공장 직거래 리스트."
  },
];
