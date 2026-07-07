
import React from 'react';
import { 
  Activity, Brain, Map, Zap, Network, LayoutTemplate, 
  MessageSquare, Database, Crosshair 
} from 'lucide-react';
import { FreeAsset } from '../../types/armory';

export const FREE_ASSETS: FreeAsset[] = [
  // --- CORE SYSTEM (Base) ---
  {
    id: 'f1',
    title: 'The Glitch 진단 키트',
    category: '진단 도구', // WEB
    desc: '노동 소득 의존도 정밀 분석 및 탈출 시뮬레이션.',
    volume: 'Interactive',
    views: 12450,
    icon: <Activity size={24} />
  },
  {
    id: 'c1',
    title: '자본주의 매트릭스 해킹',
    category: '마인드셋', // PDF -> Mindset
    desc: '노동자의 마인드셋을 영구 삭제하는 초기화 코드.',
    volume: '34 Pages',
    views: 4200,
    icon: <Brain size={24} />
  },
  {
    id: 'f2',
    title: '무자본 창업 0 to 1 로드맵',
    category: '전략 지도', // MAP
    desc: '아이템 선정부터 첫 수익 발생까지의 시각화된 지도.',
    volume: 'High Res',
    views: 8902,
    icon: <Map size={24} />
  },
  {
    id: 'c2',
    title: '파충류 뇌 자극 템플릿',
    category: '템플릿', // EXCEL
    desc: '본능을 타격하여 구매 전환율을 높이는 카피라이팅 구조.',
    volume: 'Live Doc',
    views: 9800,
    icon: <Zap size={24} />
  },
  {
    id: 'c3',
    title: '무한 레버리지 위임 프로토콜',
    category: '시스템', // NOTION
    desc: '업무 위임 체크리스트 및 자동화 매뉴얼.',
    volume: 'System',
    views: 6500,
    icon: <Network size={24} />
  },
  {
    id: 'c5',
    title: '무언의 브랜딩(Silent Authority)',
    category: '브랜딩', // PDF
    desc: '말하지 않고도 권위를 풍기는 디자인 가이드라인.',
    volume: '60 Pages',
    views: 3120,
    icon: <LayoutTemplate size={24} />
  },
  {
    id: 'c6',
    title: '프레임 컨트롤 대화법',
    category: '스크립트', // PDF
    desc: '협상에서 우위를 점하는 "갑"의 언어 습관 분석.',
    volume: 'Script',
    views: 5400,
    icon: <MessageSquare size={24} />
  },
  {
    id: 'f4',
    title: '시크릿 소싱처 50선',
    category: '데이터', // EXCEL
    desc: '검증된 도매처와 위탁 판매 사이트 데이터베이스.',
    volume: 'Database',
    views: 15200,
    icon: <Database size={24} />
  },
  {
    id: 'f5',
    title: '키워드 스나이퍼',
    category: '자동화 툴', // WEB
    desc: '경쟁 강도는 낮고 검색량은 높은 황금 키워드 발굴 툴.',
    volume: 'Tool',
    views: 3400,
    icon: <Crosshair size={24} />
  }
];
