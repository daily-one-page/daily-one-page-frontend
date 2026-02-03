import apiClient from '../client';
import type {
  ApiResponse,
  UserHabit,
  UserHabitsResponse,
  UserHabitDetail,
  RegisterUserHabitRequest,
} from '../types';

const USER_HABIT_BASE = '/api/user-habits';

export const userHabitService = {
  /**
   * 내 습관 목록 조회
   */
  getUserHabits: async (): Promise<UserHabitsResponse> => {
    const response = await apiClient.get<ApiResponse<UserHabitsResponse>>(
      USER_HABIT_BASE
    );
    return response.data.data!;
  },

  /**
   * 내 습관 상세 조회
   */
  getUserHabit: async (id: number): Promise<UserHabitDetail> => {
    const response = await apiClient.get<ApiResponse<UserHabitDetail>>(
      `${USER_HABIT_BASE}/${id}`
    );
    return response.data.data!;
  },

  /**
   * 습관 등록 (시스템 또는 커스텀 습관을 내 습관으로 등록)
   */
  registerHabit: async (habitId: number): Promise<UserHabit> => {
    const response = await apiClient.post<ApiResponse<UserHabit>>(
      USER_HABIT_BASE,
      { habitId } as RegisterUserHabitRequest
    );
    return response.data.data!;
  },

  /**
   * 습관 해제 (관련 기록도 삭제됨)
   */
  unregisterHabit: async (id: number): Promise<void> => {
    await apiClient.delete(`${USER_HABIT_BASE}/${id}`);
  },
};

export default userHabitService;
