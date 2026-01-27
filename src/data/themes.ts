// 테마 타입 정의
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  success: string;
  error: string;
  warning: string;
}

export interface Theme {
  id: string;
  name: string;
  nameKo: string;
  concept: string;
  mood: string[];
  description: string;
  colors: ThemeColors;
  isDark: boolean;
  isAutoTheme?: boolean; // 추천 테마 여부
  recommendedTime?: 'morning' | 'afternoon' | 'evening' | 'night';
}

// 선택 가능한 테마 옵션 (추천 테마 + 6가지 테마)
export type ThemeOption = {
  id: string;
  name: string;
  nameKo: string;
  concept: string;
  mood: string[];
  description: string;
  isAutoTheme?: boolean;
  previewColors?: ThemeColors; // 미리보기용 색상 (추천 테마의 경우)
};

// 6가지 기본 테마 정의
export const themes: Theme[] = [
  {
    id: 'warm-journal',
    name: 'Warm Journal',
    nameKo: '따뜻한 저널',
    concept: '따뜻한 종이 느낌, 클래식한 다이어리',
    mood: ['차분함', '아날로그 감성', '신뢰'],
    description: '크라프트지와 가죽 다이어리에서 영감. 매일 펜을 들고 싶게 만드는 아날로그 감성입니다.',
    colors: {
      primary: '#D4A574',
      secondary: '#8B7355',
      accent: '#E8C4A0',
      background: '#FDF8F3',
      surface: '#FFFFFF',
      text: '#3D3024',
      textSecondary: '#6B5D4D',
      success: '#7D9B76',
      error: '#C46B5C',
      warning: '#D4A574',
    },
    isDark: false,
    recommendedTime: 'afternoon',
  },
  {
    id: 'soft-sage',
    name: 'Soft Sage',
    nameKo: '소프트 세이지',
    concept: '성장하는 식물, 자연스러운 습관',
    mood: ['평온함', '성장', '힐링'],
    description: '식물이 매일 조금씩 자라듯, 습관도 자연스럽게. 눈이 편안한 그린 톤입니다.',
    colors: {
      primary: '#7D9B76',
      secondary: '#5C7A56',
      accent: '#B8C9A3',
      background: '#F5F7F2',
      surface: '#FFFFFF',
      text: '#2D3A29',
      textSecondary: '#6B7D66',
      success: '#5C9E5C',
      error: '#C46B5C',
      warning: '#D4A84B',
    },
    isDark: false,
    recommendedTime: 'morning',
  },
  {
    id: 'twilight-lavender',
    name: 'Twilight Lavender',
    nameKo: '트와일라잇 라벤더',
    concept: '하루를 마무리하는 저녁 시간',
    mood: ['회고', '명상', '편안함'],
    description: '저녁 알람과 함께 하루를 돌아보는 시간. 차분하고 명상적인 무드입니다.',
    colors: {
      primary: '#9B8AA5',
      secondary: '#7A6B85',
      accent: '#C4B8D0',
      background: '#F8F6FA',
      surface: '#FFFFFF',
      text: '#3A3342',
      textSecondary: '#6B6275',
      success: '#7D9B76',
      error: '#C46B5C',
      warning: '#D4A574',
    },
    isDark: false,
    recommendedTime: 'evening',
  },
  {
    id: 'ocean-calm',
    name: 'Ocean Calm',
    nameKo: '오션 캄',
    concept: '맑은 하늘, 청량한 시작',
    mood: ['집중', '신뢰', '깔끔함'],
    description: '토스, 뱅크샐러드 같은 신뢰감. 깔끔하고 현대적인 느낌을 줍니다.',
    colors: {
      primary: '#5B8FA8',
      secondary: '#3D6B82',
      accent: '#A3C9D9',
      background: '#F4F9FB',
      surface: '#FFFFFF',
      text: '#1E3A4A',
      textSecondary: '#4A6B7A',
      success: '#5C9E8C',
      error: '#C46B5C',
      warning: '#D4A84B',
    },
    isDark: false,
    recommendedTime: 'morning',
  },
  {
    id: 'peach-dawn',
    name: 'Peach Dawn',
    nameKo: '피치 던',
    concept: '새벽의 따뜻한 햇살',
    mood: ['활력', '따뜻함', '긍정'],
    description: 'AI 피드백의 따뜻한 응원과 어울리는 복숭아빛. 매일 열고 싶은 앱을 지향합니다.',
    colors: {
      primary: '#E8A87C',
      secondary: '#C98860',
      accent: '#F5CDB4',
      background: '#FFF9F5',
      surface: '#FFFFFF',
      text: '#4A3228',
      textSecondary: '#7A6258',
      success: '#7D9B76',
      error: '#C46B5C',
      warning: '#E8A87C',
    },
    isDark: false,
    recommendedTime: 'afternoon',
  },
  {
    id: 'midnight-focus',
    name: 'Midnight Focus',
    nameKo: '미드나잇 포커스',
    concept: '집중하는 밤, 프리미엄 다크모드',
    mood: ['몰입', '프리미엄', '모던'],
    description: '밤에 기록하는 사용자를 위한 다크 테마. 눈의 피로를 줄이고 프리미엄한 느낌을 줍니다.',
    colors: {
      primary: '#6B8AFD',
      secondary: '#4A6AE5',
      accent: '#A5B8FF',
      background: '#0F1419',
      surface: '#1C2432',
      text: '#E7E9EA',
      textSecondary: '#8B98A5',
      success: '#5C9E8C',
      error: '#F4585A',
      warning: '#FFAD1F',
    },
    isDark: true,
    recommendedTime: 'night',
  },
];

// 시간대별 추천 테마 로직 (20:00 ~ 05:59는 밤)
export function getThemeByTimeOfDay(): Theme {
  const hour = new Date().getHours();

  // 밤 (20:00 ~ 05:59) - 미드나잇 포커스
  if (hour >= 20 || hour < 6) {
    return themes.find(t => t.id === 'midnight-focus')!;
  }

  // 아침 (06:00 ~ 11:59) - 소프트 세이지
  if (hour >= 6 && hour < 12) {
    return themes.find(t => t.id === 'soft-sage')!;
  }

  // 오후 (12:00 ~ 17:59) - 피치 던
  if (hour >= 12 && hour < 18) {
    return themes.find(t => t.id === 'peach-dawn')!;
  }

  // 저녁 (18:00 ~ 19:59) - 트와일라잇 라벤더
  return themes.find(t => t.id === 'twilight-lavender')!;
}

// 시간대 텍스트 반환
export function getTimeOfDayText(): string {
  const hour = new Date().getHours();

  if (hour >= 20 || hour < 6) return '밤';
  if (hour >= 6 && hour < 12) return '아침';
  if (hour >= 12 && hour < 18) return '오후';
  return '저녁';
}

// 시간대 이모지 반환
export function getTimeOfDayEmoji(): string {
  const hour = new Date().getHours();

  if (hour >= 20 || hour < 6) return '🌙';
  if (hour >= 6 && hour < 12) return '🌅';
  if (hour >= 12 && hour < 18) return '☀️';
  return '🌆';
}

// 추천 테마 옵션 (시간대에 따라 자동 변경)
export const autoThemeOption: ThemeOption = {
  id: 'auto',
  name: 'Recommended',
  nameKo: '추천 테마',
  concept: '시간대에 맞는 최적의 테마',
  mood: ['자동', '스마트', '최적화'],
  description: '아침엔 상쾌하게, 저녁엔 차분하게, 밤엔 눈이 편안하게. 시간대에 맞춰 자동으로 테마가 바뀝니다.',
  isAutoTheme: true,
};

// 모든 테마 옵션 (추천 테마 포함)
export function getAllThemeOptions(): ThemeOption[] {
  // 현재 시간대의 추천 테마 색상을 미리보기로 제공
  const currentAutoTheme = getThemeByTimeOfDay();

  return [
    {
      ...autoThemeOption,
      previewColors: currentAutoTheme.colors,
    },
    ...themes.map(t => ({
      id: t.id,
      name: t.name,
      nameKo: t.nameKo,
      concept: t.concept,
      mood: t.mood,
      description: t.description,
      previewColors: t.colors,
    })),
  ];
}

// 테마 ID로 실제 적용될 테마 가져오기
export function getActiveTheme(selectedThemeId: string): Theme {
  if (selectedThemeId === 'auto') {
    return getThemeByTimeOfDay();
  }
  return themes.find(t => t.id === selectedThemeId) || themes[1]; // 기본: soft-sage
}

// 테마 ID로 테마 찾기
export function getThemeById(id: string): Theme | undefined {
  return themes.find(t => t.id === id);
}

// 기본 테마 (추천 테마)
export const DEFAULT_THEME_ID = 'auto';
