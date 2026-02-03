import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';
import type { ApiResponse, TokenResponse } from './types';

// Axios 내부 타입 정의
type InternalAxiosRequestConfig = AxiosRequestConfig & { headers: Record<string, string>; _retry?: boolean };

// =============================================================================
// Configuration
// =============================================================================
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Storage keys
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  TOKEN_EXPIRES_AT: 'tokenExpiresAt',
} as const;

// =============================================================================
// Token Management
// =============================================================================
export const tokenManager = {
  getAccessToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  setTokens: (tokens: TokenResponse): void => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
    // Store expiration time for potential proactive refresh
    const expiresAt = Date.now() + tokens.expiresIn;
    localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRES_AT, expiresAt.toString());
  },

  clearTokens: (): void => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRES_AT);
  },

  isTokenExpired: (): boolean => {
    const expiresAt = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRES_AT);
    if (!expiresAt) return true;
    // Consider token expired 30 seconds before actual expiry
    return Date.now() > parseInt(expiresAt, 10) - 30000;
  },

  hasValidRefreshToken: (): boolean => {
    return !!tokenManager.getRefreshToken();
  },
};

// =============================================================================
// Axios Instance
// =============================================================================
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// =============================================================================
// Request Interceptor
// =============================================================================
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenManager.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =============================================================================
// Response Interceptor
// =============================================================================
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
  config: InternalAxiosRequestConfig;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      resolve(apiClient(config));
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiResponse<null>>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Check if error is 401 and not a retry
    const errorCode = error.response?.data?.error?.code;
    const isAuthError = error.response?.status === 401 ||
                        errorCode === 'EXPIRED_TOKEN' ||
                        errorCode === 'INVALID_TOKEN';

    // Don't retry if:
    // - Already retried
    // - No config
    // - Auth endpoints (login, signup, reissue)
    // - No refresh token available
    if (
      originalRequest._retry ||
      !originalRequest ||
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/signup') ||
      originalRequest.url?.includes('/auth/reissue') ||
      !tokenManager.hasValidRefreshToken()
    ) {
      // Clear tokens and redirect to login
      if (isAuthError) {
        tokenManager.clearTokens();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }

    if (isAuthError) {
      if (isRefreshing) {
        // Queue the request while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = tokenManager.getRefreshToken();
        const response = await axios.post<ApiResponse<TokenResponse>>(
          `${BASE_URL}/api/auth/reissue`,
          { refreshToken }
        );

        if (response.data.success && response.data.data) {
          const newTokens = response.data.data;
          tokenManager.setTokens(newTokens);

          // Update authorization header
          originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;

          // Process queued requests
          processQueue(null, newTokens.accessToken);

          return apiClient(originalRequest);
        } else {
          throw new Error('Token refresh failed');
        }
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        tokenManager.clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// =============================================================================
// Helper Functions
// =============================================================================
export const isApiError = (error: unknown): error is AxiosError<ApiResponse<null>> => {
  return axios.isAxiosError(error);
};

export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    const apiError = error.response?.data?.error;
    if (apiError?.message) {
      return apiError.message;
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  return '알 수 없는 오류가 발생했습니다.';
};

export const getErrorCode = (error: unknown): string | null => {
  if (isApiError(error)) {
    return error.response?.data?.error?.code ?? null;
  }
  return null;
};

export default apiClient;
