import apiClient from '../client';
import type {
  ApiResponse,
  DailyPage,
  CreateDailyPageRequest,
  UpdateDailyPageRequest,
  CalendarResponse,
} from '../types';

const DAILY_PAGE_BASE = '/api/daily-pages';

export const dailyPageService = {
  /**
   * 날짜별 페이지 조회
   * @param date - 조회 날짜 (YYYY-MM-DD)
   */
  getPage: async (date: string): Promise<DailyPage> => {
    const response = await apiClient.get<ApiResponse<DailyPage>>(
      DAILY_PAGE_BASE,
      { params: { date } }
    );
    return response.data.data!;
  },

  /**
   * 오늘 페이지 조회
   */
  getTodayPage: async (): Promise<DailyPage> => {
    const today = new Date().toISOString().split('T')[0];
    return dailyPageService.getPage(today);
  },

  /**
   * 페이지 작성
   * @param content - 내용
   * @param date - 작성 날짜 (YYYY-MM-DD), 기본값: 오늘
   */
  createPage: async (content: string, date?: string): Promise<DailyPage> => {
    const data: CreateDailyPageRequest = {
      content,
      ...(date && { date }),
    };
    const response = await apiClient.post<ApiResponse<DailyPage>>(
      DAILY_PAGE_BASE,
      data
    );
    return response.data.data!;
  },

  /**
   * 페이지 수정
   * @param id - 페이지 ID
   * @param content - 수정할 내용
   */
  updatePage: async (id: number, content: string): Promise<DailyPage> => {
    const data: UpdateDailyPageRequest = { content };
    const response = await apiClient.put<ApiResponse<DailyPage>>(
      `${DAILY_PAGE_BASE}/${id}`,
      data
    );
    return response.data.data!;
  },

  /**
   * 페이지 삭제
   * @param id - 페이지 ID
   */
  deletePage: async (id: number): Promise<void> => {
    await apiClient.delete(`${DAILY_PAGE_BASE}/${id}`);
  },

  /**
   * 월별 캘린더 조회
   * @param year - 연도 (예: 2025)
   * @param month - 월 (예: 1)
   */
  getCalendar: async (year: number, month: number): Promise<CalendarResponse> => {
    const response = await apiClient.get<ApiResponse<CalendarResponse>>(
      `${DAILY_PAGE_BASE}/calendar`,
      { params: { year, month } }
    );
    return response.data.data!;
  },

  /**
   * 페이지 저장 또는 업데이트 (Upsert)
   * - 페이지가 없으면 생성, 있으면 수정
   * @param content - 내용
   * @param date - 날짜 (YYYY-MM-DD)
   * @param existingId - 기존 페이지 ID (있을 경우)
   */
  savePage: async (
    content: string,
    date?: string,
    existingId?: number
  ): Promise<DailyPage> => {
    if (existingId) {
      return dailyPageService.updatePage(existingId, content);
    }
    return dailyPageService.createPage(content, date);
  },
};

export default dailyPageService;
