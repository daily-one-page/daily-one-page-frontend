import type { HabitType } from '../../types';

interface SegmentControlProps {
  activeType: HabitType;
  onTypeChange: (type: HabitType) => void;
  practiceCount: number;
  restraintCount: number;
}

export default function SegmentControl({
  activeType,
  onTypeChange,
  practiceCount,
  restraintCount,
}: SegmentControlProps) {
  return (
    <div className="bg-accent p-1 rounded-xl inline-flex">
      <button
        onClick={() => onTypeChange('practice')}
        className={`px-6 py-2 rounded-lg font-medium transition-all ${
          activeType === 'practice'
            ? 'bg-surface text-primary shadow-sm'
            : 'text-text-secondary hover:text-text'
        }`}
      >
        실천 습관 ({practiceCount})
      </button>
      <button
        onClick={() => onTypeChange('restraint')}
        className={`px-6 py-2 rounded-lg font-medium transition-all ${
          activeType === 'restraint'
            ? 'bg-surface text-primary shadow-sm'
            : 'text-text-secondary hover:text-text'
        }`}
      >
        절제 습관 ({restraintCount})
      </button>
    </div>
  );
}
