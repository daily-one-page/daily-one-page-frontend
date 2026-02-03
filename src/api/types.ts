// =============================================================================
// 오늘한장 API Types
// =============================================================================

// -----------------------------------------------------------------------------
// Common Response Types
// -----------------------------------------------------------------------------
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: ApiError | null;
}

export interface ApiError {
  code: string;
  message: string;
}

// Error codes
export const ERROR_CODES = {
  // Common
  INVALID_INPUT: 'INVALID_INPUT',
  UNAUTHORIZED: 'UNAUTHORIZED',
  ACCESS_DENIED: 'ACCESS_DENIED',
  INVALID_TOKEN: 'INVALID_TOKEN',
  EXPIRED_TOKEN: 'EXPIRED_TOKEN',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  // Auth
  DUPLICATE_EMAIL: 'DUPLICATE_EMAIL',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
  // Habit
  HABIT_NOT_FOUND: 'HABIT_NOT_FOUND',
  HABIT_NOT_OWNED: 'HABIT_NOT_OWNED',
  SYSTEM_HABIT_NOT_MODIFIABLE: 'SYSTEM_HABIT_NOT_MODIFIABLE',
  // UserHabit
  USER_HABIT_NOT_FOUND: 'USER_HABIT_NOT_FOUND',
  DUPLICATE_USER_HABIT: 'DUPLICATE_USER_HABIT',
  // HabitLog
  HABIT_LOG_NOT_FOUND: 'HABIT_LOG_NOT_FOUND',
  DUPLICATE_HABIT_LOG: 'DUPLICATE_HABIT_LOG',
  // DailyPage
  PAGE_NOT_FOUND: 'PAGE_NOT_FOUND',
  DUPLICATE_PAGE: 'DUPLICATE_PAGE',
  // AiFeedback
  FEEDBACK_NOT_FOUND: 'FEEDBACK_NOT_FOUND',
  NO_DATA_FOR_FEEDBACK: 'NO_DATA_FOR_FEEDBACK',
} as const;

// Error messages for user display
export const ERROR_MESSAGES: Record<string, string> = {
  [ERROR_CODES.INVALID_INPUT]: '입력값이 올바르지 않습니다.',
  [ERROR_CODES.UNAUTHORIZED]: '로그인이 필요합니다.',
  [ERROR_CODES.ACCESS_DENIED]: '접근 권한이 없습니다.',
  [ERROR_CODES.INVALID_TOKEN]: '인증 정보가 유효하지 않습니다.',
  [ERROR_CODES.EXPIRED_TOKEN]: '인증이 만료되었습니다. 다시 로그인해주세요.',
  [ERROR_CODES.INTERNAL_ERROR]: '서버 오류가 발생했습니다.',
  [ERROR_CODES.DUPLICATE_EMAIL]: '이미 사용 중인 이메일입니다.',
  [ERROR_CODES.USER_NOT_FOUND]: '존재하지 않는 계정입니다.',
  [ERROR_CODES.INVALID_PASSWORD]: '비밀번호가 일치하지 않습니다.',
  [ERROR_CODES.HABIT_NOT_FOUND]: '존재하지 않는 습관입니다.',
  [ERROR_CODES.HABIT_NOT_OWNED]: '본인의 습관이 아닙니다.',
  [ERROR_CODES.SYSTEM_HABIT_NOT_MODIFIABLE]: '시스템 습관은 수정할 수 없습니다.',
  [ERROR_CODES.USER_HABIT_NOT_FOUND]: '등록된 습관이 없습니다.',
  [ERROR_CODES.DUPLICATE_USER_HABIT]: '이미 등록된 습관입니다.',
  [ERROR_CODES.HABIT_LOG_NOT_FOUND]: '존재하지 않는 기록입니다.',
  [ERROR_CODES.DUPLICATE_HABIT_LOG]: '이미 체크된 습관입니다.',
  [ERROR_CODES.PAGE_NOT_FOUND]: '해당 날짜에 작성된 페이지가 없습니다.',
  [ERROR_CODES.DUPLICATE_PAGE]: '해당 날짜에 이미 페이지가 존재합니다.',
  [ERROR_CODES.FEEDBACK_NOT_FOUND]: '해당 날짜에 피드백이 없습니다.',
  [ERROR_CODES.NO_DATA_FOR_FEEDBACK]: '피드백을 생성할 데이터가 없습니다.',
};

// -----------------------------------------------------------------------------
// Auth Types
// -----------------------------------------------------------------------------
export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ReissueRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

// -----------------------------------------------------------------------------
// Habit Types
// -----------------------------------------------------------------------------
export type HabitType = 'PRACTICE' | 'ABSTINENCE';

export interface Habit {
  id: number;
  name: string;
  description: string;
  icon: string;
  type: HabitType;
  isSystem: boolean;
}

export interface HabitsResponse {
  habits: Habit[];
  totalCount: number;
}

export interface CreateHabitRequest {
  name: string;
  description?: string;
  icon: string;
  type: HabitType;
}

export interface UpdateHabitRequest {
  name: string;
  description?: string;
  icon: string;
  type: HabitType;
}

// -----------------------------------------------------------------------------
// UserHabit Types
// -----------------------------------------------------------------------------
export interface UserHabit {
  id: number;
  habitId: number;
  habitName: string;
  habitType: HabitType;
  currentStreak: number;
  lastCheckedDate: string | null;
  createdAt: string;
}

export interface UserHabitsResponse {
  userHabits: UserHabit[];
  totalCount: number;
}

export interface UserHabitDetail {
  id: number;
  habit: Omit<Habit, 'isSystem'>;
  currentStreak: number;
  lastCheckedDate: string | null;
  createdAt: string;
}

export interface RegisterUserHabitRequest {
  habitId: number;
}

// -----------------------------------------------------------------------------
// HabitLog Types
// -----------------------------------------------------------------------------
export interface HabitLog {
  id: number | null;
  userHabitId: number;
  habitName: string;
  habitType: HabitType;
  checked: boolean;
  currentStreak: number;
}

export interface HabitLogsResponse {
  date: string;
  logs: HabitLog[];
  totalCount: number;
}

export interface CreateHabitLogRequest {
  userHabitId: number;
  date?: string;
  checked: boolean;
}

export interface HabitLogResult {
  id: number;
  userHabitId: number;
  habitName: string;
  date: string;
  checked: boolean;
  currentStreak: number;
  createdAt: string;
}

// -----------------------------------------------------------------------------
// DailyPage Types
// -----------------------------------------------------------------------------
export interface DailyPage {
  id: number;
  date: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDailyPageRequest {
  content: string;
  date?: string;
}

export interface UpdateDailyPageRequest {
  content: string;
}

export interface CalendarDay {
  date: string;
  hasContent: boolean;
  preview: string | null;
}

export interface CalendarResponse {
  year: number;
  month: number;
  days: CalendarDay[];
}

// -----------------------------------------------------------------------------
// Badge Types
// -----------------------------------------------------------------------------
export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  conditionValue: number;
}

export interface BadgeSet {
  id: number;
  name: string;
  description: string;
  badges: Badge[];
}

export interface BadgeSetsResponse {
  badgeSets: BadgeSet[];
}

export interface AcquiredBadge {
  id: number;
  badgeId: number;
  badgeName: string;
  badgeIcon: string;
  habitName: string;
  acquiredAt: string;
}

export interface InProgressBadge {
  badgeSetName: string;
  habitName: string;
  currentValue: number;
  nextBadge: {
    name: string;
    conditionValue: number;
  };
  progress: number;
}

export interface MyBadgesResponse {
  acquired: AcquiredBadge[];
  inProgress: InProgressBadge[];
}

// -----------------------------------------------------------------------------
// AiFeedback Types
// -----------------------------------------------------------------------------
export interface AiFeedback {
  id: number;
  date: string;
  message: string;
  createdAt: string;
}

export interface FeedbackHistoryResponse {
  year: number;
  month: number;
  feedbacks: AiFeedback[];
  totalCount: number;
}
