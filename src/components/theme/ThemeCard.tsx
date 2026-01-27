import { Check, Sparkles } from 'lucide-react';
import type { ThemeOption } from '../../data/themes';

interface ThemeCardProps {
  theme: ThemeOption;
  isSelected: boolean;
  isRecommendedNow?: boolean; // 현재 시간대에 추천되는 테마인지
  onSelect: () => void;
}

export default function ThemeCard({
  theme,
  isSelected,
  isRecommendedNow,
  onSelect,
}: ThemeCardProps) {
  const colors = theme.previewColors;

  return (
    <button
      onClick={onSelect}
      className={`
        relative w-full text-left rounded-2xl overflow-hidden
        transition-all duration-300 ease-out
        ${isSelected
          ? 'ring-2 ring-primary scale-[1.02] shadow-lg'
          : 'hover:scale-[1.01] hover:shadow-md'
        }
      `}
      style={{
        backgroundColor: colors?.surface || '#FFFFFF',
      }}
    >
      {/* 색상 미리보기 헤더 */}
      <div
        className="h-16 relative overflow-hidden"
        style={{
          background: colors
            ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`
            : 'linear-gradient(135deg, #7D9B76 0%, #B8C9A3 100%)',
        }}
      >
        {/* 추천 테마인 경우 반짝이 효과 */}
        {theme.isAutoTheme && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles
              className="w-8 h-8 animate-pulse"
              style={{ color: colors?.surface || '#FFFFFF' }}
            />
          </div>
        )}

        {/* 색상 도트 미리보기 */}
        {!theme.isAutoTheme && colors && (
          <div className="absolute bottom-2 right-2 flex gap-1">
            {[colors.primary, colors.secondary, colors.accent].map((color, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full border border-white/30"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}

        {/* 선택됨 체크 */}
        {isSelected && (
          <div
            className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: colors?.surface || '#FFFFFF' }}
          >
            <Check className="w-4 h-4" style={{ color: colors?.primary }} />
          </div>
        )}
      </div>

      {/* 테마 정보 */}
      <div
        className="p-4"
        style={{
          backgroundColor: colors?.background || '#F5F7F2',
        }}
      >
        {/* 테마 이름 & 배지 */}
        <div className="flex items-center gap-2 mb-1">
          <h3
            className="font-semibold text-base"
            style={{ color: colors?.text }}
          >
            {theme.nameKo}
          </h3>
          {theme.isAutoTheme && (
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: colors?.accent,
                color: colors?.text,
              }}
            >
              자동
            </span>
          )}
          {isRecommendedNow && !theme.isAutoTheme && (
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: colors?.primary,
                color: colors?.surface,
              }}
            >
              지금 추천
            </span>
          )}
        </div>

        {/* 영문 이름 */}
        <p
          className="text-xs mb-2"
          style={{ color: colors?.textSecondary }}
        >
          {theme.name}
        </p>

        {/* 컨셉 */}
        <p
          className="text-sm mb-3 line-clamp-2"
          style={{ color: colors?.text }}
        >
          {theme.description}
        </p>

        {/* 무드 태그 */}
        <div className="flex flex-wrap gap-1">
          {theme.mood.map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full"
              style={{
                backgroundColor: colors?.accent + '40',
                color: colors?.secondary,
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
