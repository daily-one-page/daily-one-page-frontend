import apiClient, { tokenManager } from '../client';
import type {
  ApiResponse,
  SignupRequest,
  LoginRequest,
  TokenResponse,
  LogoutRequest,
} from '../types';

const AUTH_BASE = '/api/auth';

export const authService = {
  /**
   * 회원가입
   * @returns 생성된 사용자 ID
   */
  signup: async (data: SignupRequest): Promise<number> => {
    const response = await apiClient.post<ApiResponse<number>>(
      `${AUTH_BASE}/signup`,
      data
    );
    return response.data.data!;
  },

  /**
   * 로그인
   * - 성공 시 토큰을 localStorage에 저장
   */
  login: async (data: LoginRequest): Promise<TokenResponse> => {
    const response = await apiClient.post<ApiResponse<TokenResponse>>(
      `${AUTH_BASE}/login`,
      data
    );
    const tokens = response.data.data!;
    tokenManager.setTokens(tokens);
    return tokens;
  },

  /**
   * 토큰 재발급 (RTR)
   * - 자동으로 새 토큰을 저장
   */
  reissue: async (): Promise<TokenResponse> => {
    const refreshToken = tokenManager.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<ApiResponse<TokenResponse>>(
      `${AUTH_BASE}/reissue`,
      { refreshToken }
    );
    const tokens = response.data.data!;
    tokenManager.setTokens(tokens);
    return tokens;
  },

  /**
   * 로그아웃
   * - 토큰을 localStorage에서 제거
   */
  logout: async (): Promise<void> => {
    const refreshToken = tokenManager.getRefreshToken();
    if (refreshToken) {
      try {
        await apiClient.post(`${AUTH_BASE}/logout`, {
          refreshToken,
        } as LogoutRequest);
      } catch {
        // Ignore logout API errors, still clear local tokens
      }
    }
    tokenManager.clearTokens();
  },

  /**
   * 현재 로그인 상태 확인
   */
  isLoggedIn: (): boolean => {
    return !!tokenManager.getAccessToken();
  },

  /**
   * 토큰 만료 여부 확인
   */
  isTokenExpired: (): boolean => {
    return tokenManager.isTokenExpired();
  },
};

export default authService;
