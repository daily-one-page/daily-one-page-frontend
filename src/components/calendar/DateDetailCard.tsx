import { Check, X, Calendar } from 'lucide-react';
import type { DayRecord, Habit } from '../../types';

interface DateDetailCardProps {
  selectedDate: Date | null;
  record: DayRecord | undefined;
  habits: Habit[];
  onViewDetail: () => void;
}

export default function DateDetailCard({ selectedDate, record, habits, onViewDetail }: DateDetailCardProps) {
  if (!selectedDate) {
    return (
      <div className="bg-surface rounded-2xl p-6 shadow-card border-2 border-dashed border-accent">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Calendar size={32} className="text-text-secondary mb-3" />
          <p className="text-text-secondary">날짜를 선택하면<br />상세 정보를 볼 수 있어요</p>
        </div>
      </div>
    );
  }

  const dateStr = `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`;

  if (!record) {
    return (
      <div className="bg-surface rounded-2xl p-6 shadow-card">
        <h3 className="font-semibold text-text mb-4">{dateStr}</h3>
        <p className="text-text-secondary text-center py-4">이 날의 기록이 없습니다</p>
      </div>
    );
  }

  const habitDetails = record.habits.map(h => {
    const habit = habits.find(hb => hb.id === h.id);
    return { ...h, name: habit?.name || '', type: habit?.type || 'practice' };
  });

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-card">
      <h3 className="font-semibold text-text mb-4">{dateStr}</h3>
      <ul className="space-y-3 mb-4">
        {habitDetails.slice(0, 5).map(habit => {
          const isPractice = habit.type === 'practice';
          const isSuccess = isPractice ? habit.checked : !habit.checked;

          return (
            <li key={habit.id} className="flex items-center gap-2">
              <span className={`${isSuccess ? 'text-success' : 'text-error'}`}>
                {isSuccess ? <Check size={16} /> : <X size={16} />}
              </span>
              <span className="text-text text-sm">{habit.name}</span>
            </li>
          );
        })}
      </ul>
      <button
        onClick={onViewDetail}
        className="w-full py-2 text-center text-secondary font-medium hover:text-primary transition-colors"
      >
        상세 보기
      </button>
    </div>
  );
}
