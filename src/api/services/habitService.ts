import apiClient from '../client';
import type {
  ApiResponse,
  Habit,
  HabitsResponse,
  CreateHabitRequest,
  UpdateHabitRequest,
} from '../types';

const HABIT_BASE = '/api/habits';

export const habitService = {
  /**
   * 습관 목록 조회
   * @param type - 'system': 시스템 습관, 'custom': 내 커스텀 습관
   */
  getHabits: async (type?: 'system' | 'custom'): Promise<HabitsResponse> => {
    const params = type ? { type } : undefined;
    const response = await apiClient.get<ApiResponse<HabitsResponse>>(
      HABIT_BASE,
      { params }
    );
    return response.data.data!;
  },

  /**
   * 시스템 습관만 조회
   */
  getSystemHabits: async (): Promise<HabitsResponse> => {
    return habitService.getHabits('system');
  },

  /**
   * 내 커스텀 습관만 조회
   */
  getCustomHabits: async (): Promise<HabitsResponse> => {
    return habitService.getHabits('custom');
  },

  /**
   * 커스텀 습관 생성
   */
  createHabit: async (data: CreateHabitRequest): Promise<Habit> => {
    const response = await apiClient.post<ApiResponse<Habit>>(
      HABIT_BASE,
      data
    );
    return response.data.data!;
  },

  /**
   * 커스텀 습관 수정
   */
  updateHabit: async (id: number, data: UpdateHabitRequest): Promise<Habit> => {
    const response = await apiClient.put<ApiResponse<Habit>>(
      `${HABIT_BASE}/${id}`,
      data
    );
    return response.data.data!;
  },

  /**
   * 커스텀 습관 삭제
   */
  deleteHabit: async (id: number): Promise<void> => {
    await apiClient.delete(`${HABIT_BASE}/${id}`);
  },
};

export default habitService;
