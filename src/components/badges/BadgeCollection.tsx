import { Award } from 'lucide-react';
import type { UserBadge } from '../../types';
import BadgeCard from './BadgeCard';

interface BadgeCollectionProps {
  badges: UserBadge[];
}

export default function BadgeCollection({ badges }: BadgeCollectionProps) {
  // 최근 획득한 뱃지 (7일 이내)
  const recentBadges = badges.filter((badge) => {
    const completedDate = new Date(badge.completedAt);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - completedDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  });

  // 습관별로 그룹화
  const badgesByHabit = badges.reduce(
    (acc, badge) => {
      if (!acc[badge.habitName]) {
        acc[badge.habitName] = [];
      }
      acc[badge.habitName].push(badge);
      return acc;
    },
    {} as Record<string, UserBadge[]>
  );

  if (badges.length === 0) {
    return (
      <div className="bg-surface rounded-2xl p-8 shadow-card text-center">
        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
          <Award size={32} className="text-text-secondary" />
        </div>
        <h3 className="font-semibold text-text mb-2">아직 획득한 뱃지가 없어요</h3>
        <p className="text-text-secondary text-sm">습관을 꾸준히 실천하면 뱃지를 획득할 수 있어요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 총 뱃지 수 */}
      <div className="flex items-center gap-2">
        <Award size={20} className="text-primary" />
        <span className="font-semibold text-text">획득한 뱃지</span>
        <span className="text-primary font-bold">{badges.length}개</span>
      </div>

      {/* 습관별 뱃지 그리드 */}
      {Object.entries(badgesByHabit).map(([habitName, habitBadges]) => (
        <div key={habitName}>
          <h3 className="text-sm font-medium text-text-secondary mb-3">{habitName}</h3>
          <div className="grid grid-cols-2 gap-4">
            {habitBadges.map((badge, index) => (
              <BadgeCard
                key={`${badge.badgeName}-${index}`}
                badge={badge}
                isNew={recentBadges.some(
                  (rb) => rb.badgeName === badge.badgeName && rb.habitName === badge.habitName
                )}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
