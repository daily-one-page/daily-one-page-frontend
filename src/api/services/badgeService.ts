import apiClient from '../client';
import type {
  ApiResponse,
  BadgeSetsResponse,
  MyBadgesResponse,
} from '../types';

const BADGE_BASE = '/api/badges';

export const badgeService = {
  /**
   * 전체 뱃지 세트 조회
   */
  getBadgeSets: async (): Promise<BadgeSetsResponse> => {
    const response = await apiClient.get<ApiResponse<BadgeSetsResponse>>(
      BADGE_BASE
    );
    return response.data.data!;
  },

  /**
   * 내 뱃지 현황 조회 (획득 + 진행 중)
   */
  getMyBadges: async (): Promise<MyBadgesResponse> => {
    const response = await apiClient.get<ApiResponse<MyBadgesResponse>>(
      `${BADGE_BASE}/my`
    );
    return response.data.data!;
  },
};

export default badgeService;
