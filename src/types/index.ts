// ============================================
// 기본 타입
// ============================================
export type HabitType = 'practice' | 'restraint';
export type TabType = 'home' | 'habits' | 'calendar' | 'badges' | 'mypage';

// ============================================
// 인증 관련 타입
// ============================================
export type AuthProvider = 'email' | 'google' | 'kakao';

export interface User {
  id: string;
  email: string;
  nickname: string;
  avatar?: string;
  provider: AuthProvider;
}

export interface UserProfile {
  nickname: string;
  streak: number;
  avatar?: string;
}

// ============================================
// 습관 관련 타입
// ============================================
export interface SystemHabit {
  id: string;
  name: string;
  type: HabitType;
  description?: string;
  badgeSets: BadgeSetPreview[];
}

export interface Habit {
  id: string;
  name: string;
  type: HabitType;
  checked: boolean;
  streak: number;
  isSystem?: boolean;
  lastCheckedDate?: string; // YYYY-MM-DD
}

export interface UserHabit {
  id: string;
  habit: {
    id: string;
    name: string;
    type: HabitType;
  };
  currentStreak: number;
  lastCheckedDate?: string;
  createdAt: string;
}

// ============================================
// 뱃지 관련 타입
// ============================================
export interface Badge {
  id: string;
  name: string;
  icon: string;
  conditionValue: number;
  description?: string;
}

export interface BadgeSetPreview {
  id: string;
  name: string;
  description: string;
}

export interface BadgeSet {
  id: string;
  name: string;
  description: string;
  habitId?: string; // null이면 범용 뱃지세트
  badges: Badge[];
}

export interface BadgeProgress {
  badgeSetName: string;
  currentBadge: Badge | null;
  currentValue: number;
  progress: number;
  nextBadge: Badge | null;
}

export interface UserBadge {
  badgeName: string;
  badgeIcon: string;
  habitName: string;
  completedAt: string;
}

// ============================================
// 성취 관련 타입
// ============================================
export interface Achievement {
  id: string;
  emoji: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  completed: boolean;
  habitName?: string;
}

// ============================================
// 일기/페이지 관련 타입
// ============================================
export interface JournalEntry {
  date: string; // YYYY-MM-DD
  content: string;
}

export interface DailyPage {
  id: string;
  date: string; // YYYY-MM-DD
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface DayRecord {
  date: string; // YYYY-MM-DD
  habits: { id: string; checked: boolean }[];
  journalWritten: boolean;
  completionRate: number;
}

export interface MonthlyPageInfo {
  date: string;
  hasContent: boolean;
}

// ============================================
// AI 피드백 관련 타입
// ============================================
export interface AIFeedback {
  id: string;
  date: string;
  message: string;
  createdAt: string;
}

// ============================================
// 습관 로그 타입
// ============================================
export interface HabitLog {
  logId: string;
  userHabitId: string;
  habitName: string;
  habitType: HabitType;
  date: string;
  checked: boolean;
  createdAt: string;
}

// ============================================
// 통계 타입
// ============================================
export interface MonthStats {
  recordedDays: number;
  avgCompletion: number;
  maxStreak: number;
}

export interface UserStats {
  totalDays: number;
  currentStreak: number;
  longestStreak: number;
  totalBadges: number;
  totalHabits: number;
}
