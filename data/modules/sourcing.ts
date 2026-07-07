
import { Supplier } from '../../types/armory';

export const VIP_SUPPLIERS: Supplier[] = [
  { id: '01', name: 'Yiwu Go (이우고)', category: '잡화/생활용품', margin: '40%~', note: '소량 사입 가능. "샘플 요청" 멘트 필수.', status: 'OPEN', type: 'CHINA' },
  { id: '02', name: 'Vvic (브이빅)', category: '여성 의류/동대문', margin: '30%~', note: '이미지 사용 허용 업체 위주로 컨택.', status: 'OPEN', type: 'DOMESTIC' },
  { id: '03', name: '1688 Super Factory A', category: '캠핑/아웃도어', margin: '65%~', note: '위챗 ID: camp888. "한국 셀러 소개" 언급 시 MOQ 10개 가능.', status: 'VIP', type: 'CHINA' },
  { id: '04', name: 'Onda B2B (폐쇄몰)', category: '반려동물 용품', margin: '55%~', note: '사업자 등록증 필수. 첫 거래 시 30만원 이상 매입 조건.', status: 'VIP', type: 'DOMESTIC' },
  { id: '05', name: 'Shenzhen Elec OEM', category: '소형 가전', margin: '70%~', note: 'KC인증 대행 가능 공장. 화이트라벨링(로고 박기) 무료.', status: 'VIP', type: 'CHINA' },
  { id: '06', name: 'Euro Dropship Hub', category: '명품/잡화', margin: '25%~', note: '영국 배대지 연동 필수. 인보이스 언더밸류 주의.', status: 'VIP', type: 'DROPSHIP' },
  { id: '07', name: 'K-Food Bulk', category: '가공식품', margin: '40%~', note: '유통기한 임박 상품 땡처리 전문. 마진율 극대화.', status: 'VIP', type: 'DOMESTIC' },
  { id: '08', name: 'Toy World China', category: '유아동/장난감', margin: '50%~', note: '어린이 제품 안전 인증 서류 제공함.', status: 'VIP', type: 'CHINA' },
];
