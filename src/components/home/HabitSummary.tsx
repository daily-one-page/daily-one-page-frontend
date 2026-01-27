import { Check } from 'lucide-react';
import type { Habit } from '../../types';

interface HabitSummaryProps {
  habits: Habit[];
  onToggle: (id: string) => void;
}

export default function HabitSummary({ habits, onToggle }: HabitSummaryProps) {
  const completedCount = habits.filter(h =>
    (h.type === 'practice' && h.checked) || (h.type === 'restraint' && !h.checked)
  ).length;

  // 실천 습관만 표시 (최대 4개)
  const practiceHabits = habits.filter(h => h.type === 'practice').slice(0, 4);

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-text">오늘의 습관</h3>
        <span className="text-sm text-text-secondary">{completedCount}/{habits.length} 완료</span>
      </div>
      <ul className="space-y-3">
        {practiceHabits.map(habit => (
          <li key={habit.id} className="flex items-center gap-3">
            <button
              onClick={() => onToggle(habit.id)}
              className={`w-6 h-6 rounded-md flex items-center justify-center transition-all hover:scale-110 ${
                habit.checked
                  ? 'bg-success text-white'
                  : 'border-2 border-secondary'
              }`}
            >
              {habit.checked && <Check size={14} strokeWidth={3} />}
            </button>
            <span className={`${habit.checked ? 'line-through text-text-secondary' : 'text-text'}`}>
              {habit.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
