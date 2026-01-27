import type { BadgeProgress } from '../../types';

interface BadgeProgressCardProps {
  progress: BadgeProgress;
}

export default function BadgeProgressCard({ progress }: BadgeProgressCardProps) {
  const nextBadgeProgress = progress.nextBadge
    ? Math.min(Math.round((progress.currentValue / progress.nextBadge.conditionValue) * 100), 100)
    : 100;

  return (
    <div className="bg-surface rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-text">{progress.badgeSetName}</h4>
        {progress.currentBadge && (
          <span className="text-2xl">{progress.currentBadge.icon}</span>
        )}
      </div>

      {/* 현재 뱃지 표시 */}
      {progress.currentBadge && (
        <div className="flex items-center gap-2 mb-4 p-3 bg-accent/50 rounded-xl">
          <span className="text-xl">{progress.currentBadge.icon}</span>
          <div>
            <p className="text-sm font-medium text-text">{progress.currentBadge.name}</p>
            <p className="text-xs text-success">달성 완료!</p>
          </div>
        </div>
      )}

      {/* 다음 뱃지 진행률 */}
      {progress.nextBadge && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg opacity-50">{progress.nextBadge.icon}</span>
              <span className="text-sm text-text-secondary">{progress.nextBadge.name}</span>
            </div>
            <span className="text-sm font-medium text-primary">
              {progress.currentValue}/{progress.nextBadge.conditionValue}
            </span>
          </div>
          <div className="h-2 bg-accent rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full animate-progress-fill"
              style={{ width: `${nextBadgeProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* 모든 뱃지 달성 시 */}
      {!progress.nextBadge && progress.currentBadge && (
        <div className="text-center py-2">
          <p className="text-success font-medium">🎉 모든 뱃지 달성!</p>
        </div>
      )}
    </div>
  );
}
