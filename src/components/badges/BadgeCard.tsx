import type { UserBadge } from '../../types';

interface BadgeCardProps {
  badge: UserBadge;
  isNew?: boolean;
}

export default function BadgeCard({ badge, isNew = false }: BadgeCardProps) {
  const formattedDate = new Date(badge.completedAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className={`relative bg-surface rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all hover:scale-[1.02] ${
        isNew ? 'animate-badge-pop ring-2 ring-primary' : ''
      }`}
    >
      {isNew && (
        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
          NEW
        </span>
      )}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center text-3xl">
          {badge.badgeIcon}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-text">{badge.badgeName}</h4>
          <p className="text-sm text-text-secondary">{badge.habitName}</p>
          <p className="text-xs text-text-secondary mt-1">{formattedDate} 획득</p>
        </div>
      </div>
    </div>
  );
}
