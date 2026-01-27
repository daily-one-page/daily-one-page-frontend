import { Check, X } from 'lucide-react';
import type { Habit } from '../../types';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
}

export default function HabitCard({ habit, onToggle }: HabitCardProps) {
  const isPractice = habit.type === 'practice';

  return (
    <div className="bg-surface rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow">
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(habit.id)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110 ${
            habit.checked
              ? isPractice
                ? 'bg-success text-white'
                : 'bg-error text-white'
              : 'border-2 border-secondary'
          }`}
        >
          {habit.checked && (isPractice ? <Check size={18} strokeWidth={3} /> : <X size={18} strokeWidth={3} />)}
        </button>
        <div className="flex-1">
          <p className={`font-medium ${habit.checked && isPractice ? 'line-through text-text-secondary' : 'text-text'}`}>
            {habit.name}
          </p>
          <p className="text-sm text-text-secondary mt-1 flex items-center gap-1">
            <span>🔥</span>
            <span>{habit.streak}일 연속</span>
          </p>
        </div>
        <span className="px-3 py-1 bg-accent rounded-lg text-sm font-medium text-secondary">
          {habit.streak}일
        </span>
      </div>
    </div>
  );
}
