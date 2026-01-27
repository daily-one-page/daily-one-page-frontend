interface StatsCardProps {
  recordedDays: number;
  avgCompletion: number;
  maxStreak: number;
}

export default function StatsCard({ recordedDays, avgCompletion, maxStreak }: StatsCardProps) {
  const stats = [
    { label: '기록한 날', value: `${recordedDays}일` },
    { label: '습관 달성률', value: `${avgCompletion}%` },
    { label: '최장 연속', value: `${maxStreak}일` },
  ];

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-card">
      <h3 className="font-semibold text-text mb-4">이번 달 통계</h3>
      <div className="space-y-4">
        {stats.map(stat => (
          <div key={stat.label} className="flex items-center justify-between">
            <span className="text-text-secondary">{stat.label}</span>
            <span className="font-bold text-primary">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
