import { User, Award, Calendar, Flame } from 'lucide-react';
import type { UserStats } from '../../types';

interface ProfileCardProps {
  nickname: string;
  email: string;
  stats: UserStats;
}

export default function ProfileCard({ nickname, email, stats }: ProfileCardProps) {
  const statItems = [
    { icon: Calendar, label: '총 기록', value: `${stats.totalDays}일` },
    { icon: Flame, label: '현재 스트릭', value: `${stats.currentStreak}일` },
    { icon: Flame, label: '최장 스트릭', value: `${stats.longestStreak}일` },
    { icon: Award, label: '획득 뱃지', value: `${stats.totalBadges}개` },
  ];

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-card">
      {/* 프로필 정보 */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
          <User size={32} className="text-secondary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-text">{nickname}</h2>
          <p className="text-text-secondary">{email}</p>
        </div>
      </div>

      {/* 통계 그리드 */}
      <div className="grid grid-cols-2 gap-4">
        {statItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="bg-background rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon size={16} className="text-primary" />
                <span className="text-sm text-text-secondary">{item.label}</span>
              </div>
              <p className="text-lg font-bold text-text">{item.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
