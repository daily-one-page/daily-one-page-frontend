export type HabitType = 'practice' | 'restraint';
export type TabType = 'home' | 'habits' | 'calendar';

export interface Habit {
  id: string;
  name: string;
  type: HabitType;
  checked: boolean;
  streak: number;
}

export interface Achievement {
  id: string;
  emoji: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  completed: boolean;
}

export interface JournalEntry {
  date: string; // YYYY-MM-DD
  content: string;
}

export interface DayRecord {
  date: string; // YYYY-MM-DD
  habits: { id: string; checked: boolean }[];
  journalWritten: boolean;
  completionRate: number;
}

export interface UserProfile {
  nickname: string;
  streak: number;
  avatar?: string;
}

// Auth Types
export type AuthProvider = 'email' | 'google' | 'kakao';

export interface User {
  id: string;
  email: string;
  nickname: string;
  avatar?: string;
  provider: AuthProvider;
}
