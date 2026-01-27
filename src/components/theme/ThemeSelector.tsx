import { Palette } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import {
  getAllThemeOptions,
  getThemeByTimeOfDay,
  getTimeOfDayText,
  getTimeOfDayEmoji,
} from '../../data/themes';
import ThemeCard from './ThemeCard';

export default function ThemeSelector() {
  const { selectedThemeId, setThemeId } = useTheme();
  const themeOptions = getAllThemeOptions();
  const currentRecommendedTheme = getThemeByTimeOfDay();
  const timeText = getTimeOfDayText();
  const timeEmoji = getTimeOfDayEmoji();

  return (
    <div className="space-y-4">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Palette className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold text-text">테마 설정</h2>
          <p className="text-sm text-text-secondary">
            {timeEmoji} 지금은 {timeText}이에요
          </p>
        </div>
      </div>

      {/* 추천 테마 안내 */}
      {selectedThemeId === 'auto' && (
        <div
          className="p-3 rounded-xl text-sm"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-text)',
          }}
        >
          <span className="font-medium">현재 적용 중:</span>{' '}
          {currentRecommendedTheme.nameKo} ({currentRecommendedTheme.name})
        </div>
      )}

      {/* 테마 카드 그리드 */}
      <div className="grid grid-cols-1 gap-4">
        {themeOptions.map(theme => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            isSelected={selectedThemeId === theme.id}
            isRecommendedNow={
              !theme.isAutoTheme && theme.id === currentRecommendedTheme.id
            }
            onSelect={() => setThemeId(theme.id)}
          />
        ))}
      </div>
    </div>
  );
}
