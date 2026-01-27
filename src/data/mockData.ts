import type { Habit, Achievement, DayRecord, UserProfile } from '../types';

export const mockUser: UserProfile = {
  nickname: '민지',
  streak: 7,
};

export const mockHabits: Habit[] = [
  // 실천 습관
  { id: '1', name: '운동하기', type: 'practice', checked: false, streak: 3 },
  { id: '2', name: '물 2L 마시기', type: 'practice', checked: true, streak: 7 },
  { id: '3', name: '독서 30분', type: 'practice', checked: false, streak: 1 },
  { id: '4', name: '명상 10분', type: 'practice', checked: false, streak: 12 },
  // 절제 습관
  { id: '5', name: '야식 먹지 않기', type: 'restraint', checked: false, streak: 5 },
  { id: '6', name: '담배 피우지 않기', type: 'restraint', checked: false, streak: 30 },
  { id: '7', name: 'SNS 1시간 이하', type: 'restraint', checked: true, streak: 0 },
  { id: '8', name: '늦잠 자지 않기', type: 'restraint', checked: false, streak: 14 },
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    emoji: '🏃',
    title: '하프마라톤 준비',
    current: 18,
    target: 21,
    unit: 'km',
    completed: false,
  },
  {
    id: '2',
    emoji: '🚭',
    title: '금연 1개월',
    current: 30,
    target: 30,
    unit: '일',
    completed: true,
  },
  {
    id: '3',
    emoji: '📚',
    title: '독서왕',
    current: 7,
    target: 30,
    unit: '일',
    completed: false,
  },
];

export const mockAIFeedback = {
  title: '어제의 기록을 읽었어요',
  message: '어제 힘든 하루였지만 운동을 빠뜨리지 않으셨네요. 정말 대단해요! 오늘도 작은 습관들을 이어가며 하루를 보내보세요. 민지님의 꾸준함이 빛나는 날이 될 거예요. ✨',
};

// 이번 달 기록 데이터 생성
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
        habits: mockHabits.map(h => ({
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

export const getTodayRecord = (): DayRecord | undefined => {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  return mockRecords.find(r => r.date === todayStr);
};

export const getRecordByDate = (date: Date): DayRecord | undefined => {
  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  return mockRecords.find(r => r.date === dateStr);
};

export const getMonthStats = (year: number, month: number) => {
  const monthRecords = mockRecords.filter(r => {
    const [y, m] = r.date.split('-').map(Number);
    return y === year && m === month + 1;
  });

  const recordedDays = monthRecords.filter(r => r.journalWritten).length;
  const avgCompletion = monthRecords.length > 0
    ? Math.round(monthRecords.reduce((sum, r) => sum + r.completionRate, 0) / monthRecords.length)
    : 0;

  // 최장 연속 일수 계산 (간단 버전)
  let maxStreak = 0;
  let currentStreak = 0;
  for (let day = 1; day <= 31; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const record = mockRecords.find(r => r.date === dateStr && r.journalWritten);
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
