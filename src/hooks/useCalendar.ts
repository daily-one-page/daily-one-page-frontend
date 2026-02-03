import { useState, useCallback } from 'react';
import { dailyPageService, getErrorMessage } from '../api';
import type { CalendarDay } from '../api/types';

interface UseCalendarReturn {
  days: CalendarDay[];
  year: number;
  month: number;
  isLoading: boolean;
  error: string | null;
  fetchCalendar: (year: number, month: number) => Promise<void>;
  getDayInfo: (date: string) => CalendarDay | undefined;
}

export function useCalendar(): UseCalendarReturn {
  const [days, setDays] = useState<CalendarDay[]>([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 월별 캘린더 조회
  const fetchCalendar = useCallback(async (y: number, m: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await dailyPageService.getCalendar(y, m);
      setDays(response.days);
      setYear(response.year);
      setMonth(response.month);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 특정 날짜 정보 조회
  const getDayInfo = useCallback((date: string): CalendarDay | undefined => {
    return days.find(day => day.date === date);
  }, [days]);

  return {
    days,
    year,
    month,
    isLoading,
    error,
    fetchCalendar,
    getDayInfo,
  };
}

export default useCalendar;
