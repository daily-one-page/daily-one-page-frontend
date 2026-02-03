import { useState, useEffect, useCallback } from 'react';
import { habitService, userHabitService, habitLogService, getErrorMessage } from '../api';
import type { Habit, UserHabit, HabitLog, HabitType } from '../api/types';

interface UseHabitsReturn {
  // 시스템 습관
  systemHabits: Habit[];
  // 내 습관 (등록된)
  userHabits: UserHabit[];
  // 오늘의 습관 로그
  todayLogs: HabitLog[];
  // 상태
  isLoading: boolean;
  error: string | null;
  // 액션
  fetchHabits: () => Promise<void>;
  fetchUserHabits: () => Promise<void>;
  fetchTodayLogs: (date?: string) => Promise<void>;
  registerHabit: (habitId: number) => Promise<void>;
  unregisterHabit: (userHabitId: number) => Promise<void>;
  createCustomHabit: (name: string, type: HabitType, icon?: string) => Promise<void>;
  checkHabit: (userHabitId: number, checked?: boolean) => Promise<void>;
  uncheckHabit: (logId: number) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useHabits(): UseHabitsReturn {
  const [systemHabits, setSystemHabits] = useState<Habit[]>([]);
  const [userHabits, setUserHabits] = useState<UserHabit[]>([]);
  const [todayLogs, setTodayLogs] = useState<HabitLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 시스템 습관 조회
  const fetchHabits = useCallback(async () => {
    try {
      const response = await habitService.getHabits();
      setSystemHabits(response?.habits ?? []);
    } catch (err) {
      console.error('fetchHabits error:', err);
      setSystemHabits([]);
    }
  }, []);

  // 내 습관 조회
  const fetchUserHabits = useCallback(async () => {
    try {
      const response = await userHabitService.getUserHabits();
      setUserHabits(response?.userHabits ?? []);
    } catch (err) {
      console.error('fetchUserHabits error:', err);
      setUserHabits([]);
    }
  }, []);

  // 오늘의 습관 로그 조회
  const fetchTodayLogs = useCallback(async (date?: string) => {
    try {
      const response = await habitLogService.getHabitLogs(date);
      setTodayLogs(response?.logs ?? []);
    } catch (err) {
      console.error('fetchTodayLogs error:', err);
      setTodayLogs([]);
    }
  }, []);

  // 습관 등록
  const registerHabit = useCallback(async (habitId: number) => {
    setIsLoading(true);
    try {
      await userHabitService.registerHabit(habitId);
      await fetchUserHabits();
      await fetchTodayLogs();
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserHabits, fetchTodayLogs]);

  // 습관 해제
  const unregisterHabit = useCallback(async (userHabitId: number) => {
    setIsLoading(true);
    try {
      await userHabitService.unregisterHabit(userHabitId);
      await fetchUserHabits();
      await fetchTodayLogs();
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserHabits, fetchTodayLogs]);

  // 커스텀 습관 생성
  const createCustomHabit = useCallback(async (name: string, type: HabitType, icon: string = '✨') => {
    setIsLoading(true);
    try {
      const habit = await habitService.createHabit({ name, type, icon });
      // 생성 후 바로 등록
      await userHabitService.registerHabit(habit.id);
      await fetchHabits();
      await fetchUserHabits();
      await fetchTodayLogs();
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchHabits, fetchUserHabits, fetchTodayLogs]);

  // 습관 체크
  const checkHabit = useCallback(async (userHabitId: number, checked: boolean = true) => {
    try {
      await habitLogService.checkHabit(userHabitId, checked);
      await fetchTodayLogs();
      await fetchUserHabits(); // 스트릭 업데이트
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    }
  }, [fetchTodayLogs, fetchUserHabits]);

  // 습관 체크 취소
  const uncheckHabit = useCallback(async (logId: number) => {
    try {
      await habitLogService.uncheckHabit(logId);
      await fetchTodayLogs();
      await fetchUserHabits(); // 스트릭 업데이트
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    }
  }, [fetchTodayLogs, fetchUserHabits]);

  // 전체 새로고침
  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await Promise.all([fetchHabits(), fetchUserHabits(), fetchTodayLogs()]);
    } finally {
      setIsLoading(false);
    }
  }, [fetchHabits, fetchUserHabits, fetchTodayLogs]);

  return {
    systemHabits,
    userHabits,
    todayLogs,
    isLoading,
    error,
    fetchHabits,
    fetchUserHabits,
    fetchTodayLogs,
    registerHabit,
    unregisterHabit,
    createCustomHabit,
    checkHabit,
    uncheckHabit,
    refresh,
  };
}

export default useHabits;
