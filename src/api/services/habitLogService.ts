import apiClient from '../client';
import type {
  ApiResponse,
  HabitLogsResponse,
  CreateHabitLogRequest,
  HabitLogResult,
} from '../types';

const HABIT_LOG_BASE = '/api/habit-logs';

export const habitLogService = {
  /**
   * 날짜별 습관 현황 조회
   * @param date - 조회 날짜 (YYYY-MM-DD), 기본값: 오늘
   */
  getHabitLogs: async (date?: string): Promise<HabitLogsResponse> => {
    const params = date ? { date } : undefined;
    const response = await apiClient.get<ApiResponse<HabitLogsResponse>>(
      HABIT_LOG_BASE,
      { params }
    );
    return response.data.data!;
  },

  /**
   * 오늘의 습관 현황 조회
   */
  getTodayLogs: async (): Promise<HabitLogsResponse> => {
    return habitLogService.getHabitLogs();
  },

  /**
   * 습관 체크
   * @param userHabitId - 사용자 습관 ID
   * @param checked - 체크 여부
   * @param date - 체크 날짜 (YYYY-MM-DD), 기본값: 오늘
   */
  checkHabit: async (
    userHabitId: number,
    checked: boolean = true,
    date?: string
  ): Promise<HabitLogResult> => {
    const data: CreateHabitLogRequest = {
      userHabitId,
      checked,
      ...(date && { date }),
    };
    const response = await apiClient.post<ApiResponse<HabitLogResult>>(
      HABIT_LOG_BASE,
      data
    );
    return response.data.data!;
  },

  /**
   * 습관 체크 취소
   * @param logId - 체크 기록 ID
   */
  uncheckHabit: async (logId: number): Promise<void> => {
    await apiClient.delete(`${HABIT_LOG_BASE}/${logId}`);
  },
};

export default habitLogService;
