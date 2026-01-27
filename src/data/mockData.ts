import type {
  Habit,
  Achievement,
  DayRecord,
  UserProfile,
  SystemHabit,
  BadgeSet,
  BadgeProgress,
  UserBadge,
  UserStats,
} from '../types';

// ============================================
// 사용자 프로필
// ============================================
export const mockUser: UserProfile = {
  nickname: '민지',
  streak: 7,
};

export const mockUserStats: UserStats = {
  totalDays: 45,
  currentStreak: 7,
  longestStreak: 14,
  totalBadges: 5,
  totalHabits: 8,
};

// ============================================
// 시스템 습관 (프리셋)
// ============================================
export const systemHabits: SystemHabit[] = [
  {
    id: 'sys-1',
    name: '달리기',
    type: 'practice',
    description: '매일 달리기로 건강을 챙겨요',
    badgeSets: [
      { id: 'bs-1', name: '거리 도전', description: '달린 거리로 뱃지 획득' },
      { id: 'bs-2', name: '스트릭 도전', description: '연속 달리기 일수로 뱃지 획득' },
    ],
  },
  {
    id: 'sys-2',
    name: '금연',
    type: 'restraint',
    description: '건강한 폐를 되찾아요',
    badgeSets: [
      { id: 'bs-3', name: '절약 금액 도전', description: '금연으로 절약한 금액 뱃지' },
      { id: 'bs-4', name: '건강 회복 도전', description: '금연 기간별 건강 회복 뱃지' },
    ],
  },
  {
    id: 'sys-3',
    name: '물 2L 마시기',
    type: 'practice',
    description: '하루 2L 물 마시기',
    badgeSets: [
      { id: 'bs-5', name: '누적량 도전', description: '마신 물 누적량으로 뱃지 획득' },
    ],
  },
  {
    id: 'sys-4',
    name: '금주',
    type: 'restraint',
    description: '술 없이도 행복해요',
    badgeSets: [
      { id: 'bs-6', name: '절약 금액 도전', description: '금주로 절약한 금액 뱃지' },
    ],
  },
  {
    id: 'sys-5',
    name: '독서',
    type: 'practice',
    description: '매일 30분 독서하기',
    badgeSets: [
      { id: 'bs-7', name: '독서 시간 도전', description: '누적 독서 시간으로 뱃지 획득' },
    ],
  },
  {
    id: 'sys-6',
    name: '명상',
    type: 'practice',
    description: '마음의 평화를 찾아요',
    badgeSets: [
      { id: 'bs-8', name: '명상 시간 도전', description: '누적 명상 시간으로 뱃지 획득' },
    ],
  },
];

// ============================================
// 뱃지 세트 데이터
// ============================================
export const mockBadgeSets: BadgeSet[] = [
  {
    id: 'bs-1',
    name: '거리 도전',
    description: '달린 거리로 뱃지 획득',
    habitId: 'sys-1',
    badges: [
      { id: 'b-1', name: '하프마라톤 완주!', icon: '🏃', conditionValue: 21, description: '21km 달성' },
      { id: 'b-2', name: '풀마라톤 완주!', icon: '🏅', conditionValue: 42, description: '42km 달성' },
      { id: 'b-3', name: '서울에서 부산까지!', icon: '🚄', conditionValue: 400, description: '400km 달성' },
    ],
  },
  {
    id: 'bs-3',
    name: '절약 금액 도전',
    description: '금연으로 절약한 금액 뱃지',
    habitId: 'sys-2',
    badges: [
      { id: 'b-4', name: '치킨 1마리 값 절약!', icon: '🍗', conditionValue: 1, description: '1일 달성' },
      { id: 'b-5', name: '폐가 청소를 시작합니다', icon: '🫁', conditionValue: 7, description: '7일 달성' },
      { id: 'b-6', name: '오마카세 한 끼 값!', icon: '🍣', conditionValue: 30, description: '30일 달성' },
      { id: 'b-7', name: '에어팟 하나 벌었다!', icon: '🎧', conditionValue: 100, description: '100일 달성' },
      { id: 'b-8', name: '유럽 왕복 항공권!', icon: '✈️', conditionValue: 365, description: '365일 달성' },
    ],
  },
  {
    id: 'bs-5',
    name: '누적량 도전',
    description: '마신 물 누적량으로 뱃지 획득',
    habitId: 'sys-3',
    badges: [
      { id: 'b-9', name: '정수기 물통 1개', icon: '🚰', conditionValue: 14, description: '7일 (14L)' },
      { id: 'b-10', name: '대야 가득 채움', icon: '🛁', conditionValue: 60, description: '30일 (60L)' },
      { id: 'b-11', name: '욕조 하나 분량', icon: '🛀', conditionValue: 200, description: '100일 (200L)' },
      { id: 'b-12', name: '소방차 물탱크', icon: '🚒', conditionValue: 730, description: '365일 (730L)' },
    ],
  },
  {
    id: 'bs-universal',
    name: '범용 스트릭 도전',
    description: '모든 습관에 적용되는 연속 달성 뱃지',
    badges: [
      { id: 'b-u1', name: '첫 걸음', icon: '🌱', conditionValue: 1, description: '1일 연속' },
      { id: 'b-u2', name: '일주일 완성', icon: '🔥', conditionValue: 7, description: '7일 연속' },
      { id: 'b-u3', name: '한 달의 기적', icon: '⭐', conditionValue: 30, description: '30일 연속' },
      { id: 'b-u4', name: '100일의 여정', icon: '💎', conditionValue: 100, description: '100일 연속' },
      { id: 'b-u5', name: '1년의 대장정', icon: '👑', conditionValue: 365, description: '365일 연속' },
    ],
  },
];

// ============================================
// 사용자 습관
// ============================================
export const mockHabits: Habit[] = [
  // 실천 습관
  { id: '1', name: '운동하기', type: 'practice', checked: false, streak: 3, isSystem: true },
  { id: '2', name: '물 2L 마시기', type: 'practice', checked: true, streak: 7, isSystem: true },
  { id: '3', name: '독서 30분', type: 'practice', checked: false, streak: 1, isSystem: true },
  { id: '4', name: '명상 10분', type: 'practice', checked: false, streak: 12, isSystem: true },
  // 절제 습관
  { id: '5', name: '야식 먹지 않기', type: 'restraint', checked: false, streak: 5 },
  { id: '6', name: '담배 피우지 않기', type: 'restraint', checked: false, streak: 30, isSystem: true },
  { id: '7', name: 'SNS 1시간 이하', type: 'restraint', checked: true, streak: 0 },
  { id: '8', name: '늦잠 자지 않기', type: 'restraint', checked: false, streak: 14 },
];

// ============================================
// 뱃지 진행 상황
// ============================================
export const mockBadgeProgress: BadgeProgress[] = [
  {
    badgeSetName: '스트릭 도전',
    currentBadge: { id: 'b-u2', name: '일주일 완성', icon: '🔥', conditionValue: 7 },
    currentValue: 7,
    progress: 100,
    nextBadge: { id: 'b-u3', name: '한 달의 기적', icon: '⭐', conditionValue: 30 },
  },
  {
    badgeSetName: '거리 도전',
    currentBadge: null,
    currentValue: 18,
    progress: 86,
    nextBadge: { id: 'b-1', name: '하프마라톤 완주!', icon: '🏃', conditionValue: 21 },
  },
  {
    badgeSetName: '절약 금액 도전',
    currentBadge: { id: 'b-6', name: '오마카세 한 끼 값!', icon: '🍣', conditionValue: 30 },
    currentValue: 30,
    progress: 100,
    nextBadge: { id: 'b-7', name: '에어팟 하나 벌었다!', icon: '🎧', conditionValue: 100 },
  },
];

// ============================================
// 획득한 뱃지
// ============================================
export const mockUserBadges: UserBadge[] = [
  {
    badgeName: '첫 걸음',
    badgeIcon: '🌱',
    habitName: '운동하기',
    completedAt: '2025-01-20T10:00:00Z',
  },
  {
    badgeName: '일주일 완성',
    badgeIcon: '🔥',
    habitName: '물 2L 마시기',
    completedAt: '2025-01-25T22:00:00Z',
  },
  {
    badgeName: '치킨 1마리 값 절약!',
    badgeIcon: '🍗',
    habitName: '금연',
    completedAt: '2024-12-28T10:00:00Z',
  },
  {
    badgeName: '폐가 청소를 시작합니다',
    badgeIcon: '🫁',
    habitName: '금연',
    completedAt: '2025-01-03T10:00:00Z',
  },
  {
    badgeName: '오마카세 한 끼 값!',
    badgeIcon: '🍣',
    habitName: '금연',
    completedAt: '2025-01-27T10:00:00Z',
  },
];

// ============================================
// 성취 (Achievement)
// ============================================
export const mockAchievements: Achievement[] = [
  {
    id: '1',
    emoji: '🏃',
    title: '하프마라톤 준비',
    current: 18,
    target: 21,
    unit: 'km',
    completed: false,
    habitName: '운동하기',
  },
  {
    id: '2',
    emoji: '🚭',
    title: '금연 1개월',
    current: 30,
    target: 30,
    unit: '일',
    completed: true,
    habitName: '금연',
  },
  {
    id: '3',
    emoji: '📚',
    title: '독서왕',
    current: 7,
    target: 30,
    unit: '일',
    completed: false,
    habitName: '독서',
  },
];

// ============================================
// AI 피드백
// ============================================
export const mockAIFeedback = {
  title: '어제의 기록을 읽었어요',
  message:
    '어제 힘든 하루였지만 운동을 빠뜨리지 않으셨네요. 정말 대단해요! 🌱 금연 30일 달성도 축하드려요! 이제 오마카세 한 끼 값을 아끼셨네요. 오늘도 작은 습관들을 이어가며 하루를 보내보세요. 민지님의 꾸준함이 빛나는 날이 될 거예요. ✨',
};

export const mockAIFeedbacks = [
  {
    id: '1',
    date: '2025-01-27',
    message:
      '어제 힘든 하루였지만 운동을 빠뜨리지 않으셨네요. 정말 대단해요! 🌱 금연 30일 달성도 축하드려요!',
    createdAt: '2025-01-27T08:00:00Z',
  },
  {
    id: '2',
    date: '2025-01-26',
    message:
      '물 마시기 7일 연속 성공! 💧 이제 정수기 물통 하나를 다 마신 셈이에요. 정말 잘하고 계세요!',
    createdAt: '2025-01-26T08:00:00Z',
  },
  {
    id: '3',
    date: '2025-01-25',
    message:
      '어제 독서를 시작하셨네요! 📚 첫 걸음이 가장 중요해요. 꾸준히 이어가면 큰 변화가 올 거예요.',
    createdAt: '2025-01-25T08:00:00Z',
  },
];

// ============================================
// 일일 기록 생성
// ============================================
const generateMonthRecords = (): DayRecord[] => {
  const records: DayRecord[] = [];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  for (let day = 1; day <= today.getDate(); day++) {
    const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const hasRecord = Math.random() > 0.2; // 80% 확률로 기록 있음

    if (hasRecord) {
      const completionRate = Math.floor(Math.random() * 40) + 60; // 60-100%
      records.push({
        date,
        habits: mockHabits.map((h) => ({
          id: h.id,
          checked: Math.random() > 0.3,
        })),
        journalWritten: Math.random() > 0.3,
        completionRate,
      });
    }
  }

  return records;
};

export const mockRecords: DayRecord[] = generateMonthRecords();

// ============================================
// 데일리 페이지 Mock
// ============================================
export const mockDailyPages = [
  {
    id: '1',
    date: '2025-01-27',
    content:
      '오늘은 아침에 달리기를 했다. 날씨가 좋아서 기분이 상쾌했다. 금연 30일째, 이제 담배 생각이 거의 나지 않는다. 물도 2L를 채웠고, 저녁에는 명상까지 했다. 알찬 하루였다!',
    createdAt: '2025-01-27T22:00:00Z',
    updatedAt: '2025-01-27T22:30:00Z',
  },
  {
    id: '2',
    date: '2025-01-26',
    content:
      '회사에서 힘든 일이 있었지만, 운동으로 스트레스를 풀었다. 금연 유지 중! 내일은 더 좋은 하루가 될 것 같다.',
    createdAt: '2025-01-26T21:00:00Z',
    updatedAt: '2025-01-26T21:00:00Z',
  },
];

// ============================================
// 유틸리티 함수
// ============================================
export const getTodayRecord = (): DayRecord | undefined => {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  return mockRecords.find((r) => r.date === todayStr);
};

export const getRecordByDate = (date: Date): DayRecord | undefined => {
  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  return mockRecords.find((r) => r.date === dateStr);
};

export const getMonthStats = (year: number, month: number) => {
  const monthRecords = mockRecords.filter((r) => {
    const [y, m] = r.date.split('-').map(Number);
    return y === year && m === month + 1;
  });

  const recordedDays = monthRecords.filter((r) => r.journalWritten).length;
  const avgCompletion =
    monthRecords.length > 0
      ? Math.round(
          monthRecords.reduce((sum, r) => sum + r.completionRate, 0) / monthRecords.length
        )
      : 0;

  // 최장 연속 일수 계산
  let maxStreak = 0;
  let currentStreak = 0;
  for (let day = 1; day <= 31; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const record = mockRecords.find((r) => r.date === dateStr && r.journalWritten);
    if (record) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return {
    recordedDays,
    avgCompletion,
    maxStreak,
  };
};

export const getBadgeSetByHabitId = (habitId: string): BadgeSet[] => {
  return mockBadgeSets.filter((bs) => bs.habitId === habitId || !bs.habitId);
};

export const getSystemHabitById = (id: string): SystemHabit | undefined => {
  return systemHabits.find((h) => h.id === id);
};
