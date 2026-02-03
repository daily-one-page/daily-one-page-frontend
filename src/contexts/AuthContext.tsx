import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { authService } from '../api/services/authService';
import { tokenManager } from '../api/client';
import type { LoginRequest, SignupRequest } from '../api/types';

// =============================================================================
// Types
// =============================================================================
interface User {
  isLoggedIn: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  signup: (data: SignupRequest) => Promise<number>;
  logout: () => Promise<void>;
  checkAuth: () => void;
}

// =============================================================================
// Context
// =============================================================================
const AuthContext = createContext<AuthContextType | null>(null);

// =============================================================================
// Provider
// =============================================================================
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  const checkAuth = useCallback(() => {
    const hasToken = !!tokenManager.getAccessToken();
    if (hasToken) {
      setUser({ isLoggedIn: true });
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Login
  const login = useCallback(async (data: LoginRequest) => {
    setIsLoading(true);
    try {
      await authService.login(data);
      setUser({ isLoggedIn: true });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Signup
  const signup = useCallback(async (data: SignupRequest): Promise<number> => {
    setIsLoading(true);
    try {
      const userId = await authService.signup(data);
      return userId;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user?.isLoggedIn,
    login,
    signup,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// =============================================================================
// Hook
// =============================================================================
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
