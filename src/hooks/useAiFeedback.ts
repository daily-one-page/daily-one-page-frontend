import { useState, useCallback } from 'react';
import { aiFeedbackService, getErrorMessage } from '../api';
import type { AiFeedback } from '../api/types';

interface UseAiFeedbackReturn {
  todayFeedback: AiFeedback | null;
  isLoading: boolean;
  error: string | null;
  fetchTodayFeedback: () => Promise<void>;
  fetchFeedback: (date: string) => Promise<AiFeedback | null>;
}

export function useAiFeedback(): UseAiFeedbackReturn {
  const [todayFeedback, setTodayFeedback] = useState<AiFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 오늘의 피드백 조회
  const fetchTodayFeedback = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await aiFeedbackService.getTodayFeedback();
      setTodayFeedback(response);
    } catch (err: unknown) {
      // 데이터가 없는 경우는 에러가 아님
      const errorObj = err as { response?: { data?: { error?: { code?: string } } } };
      if (errorObj?.response?.data?.error?.code === 'NO_DATA_FOR_FEEDBACK') {
        setTodayFeedback(null);
      } else {
        setError(getErrorMessage(err));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 특정 날짜 피드백 조회
  const fetchFeedback = useCallback(async (date: string): Promise<AiFeedback | null> => {
    try {
      const response = await aiFeedbackService.getFeedback(date);
      return response;
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { error?: { code?: string } } } };
      if (errorObj?.response?.data?.error?.code === 'FEEDBACK_NOT_FOUND') {
        return null;
      }
      throw err;
    }
  }, []);

  return {
    todayFeedback,
    isLoading,
    error,
    fetchTodayFeedback,
    fetchFeedback,
  };
}

export default useAiFeedback;
