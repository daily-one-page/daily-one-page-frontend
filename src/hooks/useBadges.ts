import { useState, useCallback } from 'react';
import { badgeService, getErrorMessage } from '../api';
import type { BadgeSet, AcquiredBadge, InProgressBadge } from '../api/types';

interface UseBadgesReturn {
  badgeSets: BadgeSet[];
  acquired: AcquiredBadge[];
  inProgress: InProgressBadge[];
  isLoading: boolean;
  error: string | null;
  fetchBadgeSets: () => Promise<void>;
  fetchMyBadges: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useBadges(): UseBadgesReturn {
  const [badgeSets, setBadgeSets] = useState<BadgeSet[]>([]);
  const [acquired, setAcquired] = useState<AcquiredBadge[]>([]);
  const [inProgress, setInProgress] = useState<InProgressBadge[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 전체 뱃지 세트 조회
  const fetchBadgeSets = useCallback(async () => {
    try {
      const response = await badgeService.getBadgeSets();
      setBadgeSets(response?.badgeSets ?? []);
    } catch (err) {
      console.error('fetchBadgeSets error:', err);
      setBadgeSets([]);
    }
  }, []);

  // 내 뱃지 현황 조회
  const fetchMyBadges = useCallback(async () => {
    try {
      const response = await badgeService.getMyBadges();
      setAcquired(response?.acquired ?? []);
      setInProgress(response?.inProgress ?? []);
    } catch (err) {
      console.error('fetchMyBadges error:', err);
      setAcquired([]);
      setInProgress([]);
    }
  }, []);

  // 전체 새로고침
  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await Promise.all([fetchBadgeSets(), fetchMyBadges()]);
    } finally {
      setIsLoading(false);
    }
  }, [fetchBadgeSets, fetchMyBadges]);

  return {
    badgeSets,
    acquired,
    inProgress,
    isLoading,
    error,
    fetchBadgeSets,
    fetchMyBadges,
    refresh,
  };
}

export default useBadges;
