import { useState, useCallback } from 'react';
import { dailyPageService, getErrorMessage } from '../api';
import type { DailyPage } from '../api/types';

interface UseDailyPageReturn {
  page: DailyPage | null;
  isLoading: boolean;
  error: string | null;
  fetchPage: (date: string) => Promise<void>;
  savePage: (content: string, date?: string) => Promise<void>;
  deletePage: (id: number) => Promise<void>;
  hasContent: boolean;
}

export function useDailyPage(): UseDailyPageReturn {
  const [page, setPage] = useState<DailyPage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 날짜별 페이지 조회
  const fetchPage = useCallback(async (date: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await dailyPageService.getPage(date);
      setPage(response);
    } catch (err: unknown) {
      // 페이지가 없는 경우 (PAGE_NOT_FOUND)는 에러가 아님
      const errorObj = err as { response?: { data?: { error?: { code?: string } } } };
      if (errorObj?.response?.data?.error?.code === 'PAGE_NOT_FOUND') {
        setPage(null);
      } else {
        setError(getErrorMessage(err));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 페이지 저장 (생성 또는 수정)
  const savePage = useCallback(async (content: string, date?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const savedPage = await dailyPageService.savePage(content, date, page?.id);
      setPage(savedPage);
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [page?.id]);

  // 페이지 삭제
  const deletePage = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await dailyPageService.deletePage(id);
      setPage(null);
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    page,
    isLoading,
    error,
    fetchPage,
    savePage,
    deletePage,
    hasContent: !!page?.content,
  };
}

export default useDailyPage;
