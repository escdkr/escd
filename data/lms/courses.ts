export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  type: 'video' | 'pdf' | 'text';
  duration: string;
  locked: boolean;
  content?: string;
  videoUrl?: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  level: string;
  totalDuration: string;
  chapters: Chapter[];
}

export const COURSES: Course[] = [
  {
    id: 'the-glitch',
    title: 'The Glitch',
    subtitle: '탈출의 설계도 — 시스템을 이해하고 설계자가 되는 법',
    description:
      '수십 년의 마케팅 전쟁에서 살아남은 자들의 비밀. 노동자가 아닌 설계자의 시각으로 세계를 재편하는 7개 챕터, 16개 레슨.',
    level: 'Tier-01 Elite',
    totalDuration: '8h 45m',
    chapters: [
      {
        id: 'ch-01',
        number: 1,
        title: 'Chapter 01. The Matrix Revealed',
        lessons: [
          {
            id: 'l-01-01',
            title: 'The Matrix Revealed',
            subtitle: '당신이 살고 있는 세계의 진짜 코드',
            type: 'video',
            duration: '15:20',
            locked: false,
            content:
              '당신이 믿어온 경제 시스템, 성공의 공식, 노력과 보상의 관계. 이 모든 것이 누군가가 설계한 레이어 위에 존재합니다. 이 레슨에서는 그 레이어를 처음으로 직시합니다.',
          },
          {
            id: 'l-01-02',
            title: 'Red Pill Protocol',
            subtitle: '각성의 첫 번째 단계',
            type: 'text',
            duration: '12 min read',
            locked: false,
            content:
              '각성은 불편함에서 시작됩니다. 이 텍스트 레슨은 당신의 현재 포지션을 냉정하게 진단하는 프로토콜을 제공합니다. 세 가지 질문에 솔직하게 답하십시오.',
          },
        ],
      },
      {
        id: 'ch-02',
        number: 2,
        title: 'Chapter 02. Decrypting Human Desires',
        lessons: [
          {
            id: 'l-02-01',
            title: 'Decrypting Human Desires',
            subtitle: '인간 욕구의 암호 해독',
            type: 'video',
            duration: '24:45',
            locked: false,
            content:
              '모든 구매 결정의 97%는 무의식에서 이루어집니다. 이 레슨은 그 무의식의 지도를 해독합니다.',
          },
          {
            id: 'l-02-02',
            title: 'The 7 Hidden Triggers',
            subtitle: '비가시적 구매 트리거 7가지',
            type: 'video',
            duration: '18:30',
            locked: false,
            content:
              '공포, 탐욕, 귀속감, 권위, 희소성, 사회적 증거, 호기심. 각각이 어떻게 작동하는지, 그리고 어떻게 윤리적으로 활용하는지 배웁니다.',
          },
          {
            id: 'l-02-03',
            title: 'Desire Mapping Workshop',
            subtitle: '욕구 지도 실습',
            type: 'text',
            duration: '20 min read',
            locked: false,
            content:
              '당신의 타겟 오디언스의 욕구 지도를 직접 작성하는 실습입니다. 템플릿과 예시가 포함되어 있습니다.',
          },
        ],
      },
      {
        id: 'ch-03',
        number: 3,
        title: 'Chapter 03. The Architecture of Invisible Wealth',
        lessons: [
          {
            id: 'l-03-01',
            title: 'The Architecture of Invisible Wealth',
            subtitle: '보이지 않는 부의 구조',
            type: 'pdf',
            duration: '142 Pages',
            locked: false,
            content: '부는 축적되는 것이 아니라 설계되는 것입니다. 142페이지의 마스터 에셋에서 그 설계도를 공개합니다.',
          },
          {
            id: 'l-03-02',
            title: 'Leverage Protocol',
            subtitle: '레버리지 시스템 구축법',
            type: 'video',
            duration: '28:15',
            locked: false,
            content: '1의 노력으로 10의 결과를 만드는 레버리지 시스템. 이 레슨에서는 당신만의 레버리지 포인트를 발견합니다.',
          },
        ],
      },
      {
        id: 'ch-04',
        number: 4,
        title: 'Chapter 04. Psychological Traps & Triggers',
        lessons: [
          {
            id: 'l-04-01',
            title: 'Psychological Traps & Triggers',
            subtitle: '심리 함정과 트리거의 완전 분해',
            type: 'video',
            duration: '32:10',
            locked: true,
            content: '당신이 매일 걸리는 심리적 함정들. 그리고 그것을 역으로 이용하는 법.',
          },
          {
            id: 'l-04-02',
            title: 'The Reptilian Brain Template',
            subtitle: '파충류 뇌를 자극하는 카피라이팅',
            type: 'text',
            duration: '15 min read',
            locked: true,
            content: '인간의 생존 본능을 자극하는 메시지 설계법. 3가지 핵심 템플릿 포함.',
          },
          {
            id: 'l-04-03',
            title: 'Frame Control Masterclass',
            subtitle: '프레임을 제어하는 자가 게임을 지배한다',
            type: 'video',
            duration: '22:00',
            locked: true,
            content: '협상, 세일즈, 설득의 근본은 프레임 컨트롤입니다.',
          },
        ],
      },
      {
        id: 'ch-05',
        number: 5,
        title: 'Chapter 05. Hacking the Market System',
        lessons: [
          {
            id: 'l-05-01',
            title: 'Hacking the Market System',
            subtitle: '시장 시스템 해킹',
            type: 'video',
            duration: '19:55',
            locked: true,
            content: '블루오션은 발견하는 것이 아니라 만드는 것입니다.',
          },
          {
            id: 'l-05-02',
            title: 'Traffic Hijack Protocol',
            subtitle: '트래픽 하이재킹 프로토콜',
            type: 'video',
            duration: '25:40',
            locked: true,
            content: '경쟁자의 트래픽을 합법적으로 가져오는 고급 전술.',
          },
        ],
      },
      {
        id: 'ch-06',
        number: 6,
        title: 'Chapter 06. Silent Authority Protocol',
        lessons: [
          {
            id: 'l-06-01',
            title: 'Silent Authority Protocol',
            subtitle: '말하지 않아도 권위가 생기는 시스템',
            type: 'video',
            duration: '45:00',
            locked: true,
            content: '권위는 주장하는 것이 아닙니다. 시스템으로 만드는 것입니다.',
          },
          {
            id: 'l-06-02',
            title: 'Insider Leak Formula',
            subtitle: '내부자 정보 효과 만들기',
            type: 'text',
            duration: '18 min read',
            locked: true,
            content: '모든 사람이 당신을 내부자로 인식하게 만드는 콘텐츠 전략.',
          },
        ],
      },
      {
        id: 'ch-07',
        number: 7,
        title: 'Chapter 07. The Final Glitch',
        lessons: [
          {
            id: 'l-07-01',
            title: 'The Final Glitch — Master Key',
            subtitle: '모든 것을 하나로 묶는 마스터 키',
            type: 'pdf',
            duration: '88 Pages',
            locked: true,
            content: '6개의 챕터를 하나의 실행 가능한 시스템으로 통합하는 최종 마스터 가이드.',
          },
          {
            id: 'l-07-02',
            title: 'Your 90-Day Launch Protocol',
            subtitle: '90일 실행 로드맵',
            type: 'text',
            duration: '30 min read',
            locked: true,
            content: '오늘부터 90일, 일별·주별 실행 계획. 당신의 첫 번째 탈출 경로.',
          },
        ],
      },
    ],
  },
];

export function getCourse(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

export function getLesson(courseId: string, lessonId: string): { course: Course; chapter: Chapter; lesson: Lesson; index: number; total: number } | undefined {
  const course = getCourse(courseId);
  if (!course) return undefined;

  const allLessons: { chapter: Chapter; lesson: Lesson }[] = [];
  for (const ch of course.chapters) {
    for (const l of ch.lessons) {
      allLessons.push({ chapter: ch, lesson: l });
    }
  }

  const idx = allLessons.findIndex((x) => x.lesson.id === lessonId);
  if (idx === -1) return undefined;

  return {
    course,
    chapter: allLessons[idx].chapter,
    lesson: allLessons[idx].lesson,
    index: idx,
    total: allLessons.length,
  };
}

export function getAllLessons(courseId: string): { chapter: Chapter; lesson: Lesson }[] {
  const course = getCourse(courseId);
  if (!course) return [];
  return course.chapters.flatMap((ch) => ch.lessons.map((l) => ({ chapter: ch, lesson: l })));
}
