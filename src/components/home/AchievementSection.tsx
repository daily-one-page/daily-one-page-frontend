import { Trophy } from 'lucide-react';
import type { Achievement } from '../../types';

interface AchievementSectionProps {
  achievements: Achievement[];
}

export default function AchievementSection({ achievements }: AchievementSectionProps) {
  return (
    <div className="bg-surface rounded-2xl p-6 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <Trophy size={20} className="text-primary" />
        <h3 className="font-semibold text-text">다가오는 성취</h3>
      </div>
      <div className="space-y-4">
        {achievements.map(achievement => {
          const progress = Math.min((achievement.current / achievement.target) * 100, 100);
          return (
            <div key={achievement.id} className="flex items-center gap-4">
              <span className="text-2xl">{achievement.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-text">{achievement.title}</span>
                  <span className={`text-sm font-medium ${achievement.completed ? 'text-success' : 'text-text-secondary'}`}>
                    {achievement.completed ? '달성!' : `${achievement.current}/${achievement.target}${achievement.unit}`}
                  </span>
                </div>
                <div className="h-2 bg-accent rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${achievement.completed ? 'bg-success' : 'bg-primary'}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
