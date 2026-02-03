import apiClient from '../client';
import type {
  ApiResponse,
  AiFeedback,
  FeedbackHistoryResponse,
} from '../types';

const AI_FEEDBACK_BASE = '/api/ai-feedback';

export const aiFeedbackService = {
  /**
   * 오늘의 피드백 조회
   * - 없으면 서버에서 자동 생성
   */
  getTodayFeedback: async (): Promise<AiFeedback> => {
    const response = await apiClient.get<ApiResponse<AiFeedback>>(
      `${AI_FEEDBACK_BASE}/today`
    );
    return response.data.data!;
  },

  /**
   * 특정 날짜 피드백 조회
   * @param date - 조회 날짜 (YYYY-MM-DD)
   */
  getFeedback: async (date: string): Promise<AiFeedback> => {
    const response = await apiClient.get<ApiResponse<AiFeedback>>(
      AI_FEEDBACK_BASE,
      { params: { date } }
    );
    return response.data.data!;
  },

  /**
   * 월별 피드백 히스토리 조회
   * @param year - 연도 (예: 2025)
   * @param month - 월 (예: 1)
   */
  getFeedbackHistory: async (
    year: number,
    month: number
  ): Promise<FeedbackHistoryResponse> => {
    const response = await apiClient.get<ApiResponse<FeedbackHistoryResponse>>(
      `${AI_FEEDBACK_BASE}/history`,
      { params: { year, month } }
    );
    return response.data.data!;
  },
};

export default aiFeedbackService;
