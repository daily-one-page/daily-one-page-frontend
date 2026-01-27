import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Theme } from '../data/themes';
import { getActiveTheme, DEFAULT_THEME_ID } from '../data/themes';

interface ThemeContextType {
  selectedThemeId: string;
  activeTheme: Theme;
  setThemeId: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'oneul-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [selectedThemeId, setSelectedThemeId] = useState<string>(() => {
    // localStorage에서 저장된 테마 불러오기
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved || DEFAULT_THEME_ID;
  });

  const [activeTheme, setActiveTheme] = useState<Theme>(() =>
    getActiveTheme(selectedThemeId)
  );

  // 테마 ID 변경 시 activeTheme 업데이트
  useEffect(() => {
    const theme = getActiveTheme(selectedThemeId);
    setActiveTheme(theme);
  }, [selectedThemeId]);

  // 추천 테마(auto)인 경우 시간대 변경 시 테마 업데이트
  useEffect(() => {
    if (selectedThemeId !== 'auto') return;

    // 1분마다 시간대 체크 (시간대 경계에서 테마 변경)
    const interval = setInterval(() => {
      const newTheme = getActiveTheme('auto');
      setActiveTheme(prev => {
        if (prev.id !== newTheme.id) {
          return newTheme;
        }
        return prev;
      });
    }, 60000); // 1분

    return () => clearInterval(interval);
  }, [selectedThemeId]);

  // CSS 변수 업데이트
  useEffect(() => {
    const root = document.documentElement;
    const { colors, isDark } = activeTheme;

    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-surface', colors.surface);
    root.style.setProperty('--color-text', colors.text);
    root.style.setProperty('--color-text-secondary', colors.textSecondary);
    root.style.setProperty('--color-success', colors.success);
    root.style.setProperty('--color-error', colors.error);
    root.style.setProperty('--color-warning', colors.warning);

    // 다크 모드 클래스 토글
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [activeTheme]);

  const setThemeId = (id: string) => {
    setSelectedThemeId(id);
    localStorage.setItem(STORAGE_KEY, id);
  };

  return (
    <ThemeContext.Provider value={{ selectedThemeId, activeTheme, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
