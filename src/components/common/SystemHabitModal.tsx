import { X, Dumbbell, ShieldOff, Award } from 'lucide-react';
import type { SystemHabit } from '../../types';

interface SystemHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  systemHabits: SystemHabit[];
  onSelectHabit: (habit: SystemHabit) => void;
  onCreateCustom: () => void;
}

export default function SystemHabitModal({
  isOpen,
  onClose,
  systemHabits,
  onSelectHabit,
  onCreateCustom,
}: SystemHabitModalProps) {
  if (!isOpen) return null;

  const practiceHabits = systemHabits.filter((h) => h.type === 'practice');
  const restraintHabits = systemHabits.filter((h) => h.type === 'restraint');

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-surface rounded-3xl w-full max-w-2xl max-h-[80vh] shadow-modal animate-slide-up flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-accent/50">
          <div>
            <h2 className="text-lg font-bold text-text">습관 추가하기</h2>
            <p className="text-sm text-text-secondary">시스템 습관을 선택하거나 직접 만들어보세요</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <X size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* 콘텐츠 */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* 실천 습관 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Dumbbell size={18} className="text-primary" />
              <h3 className="font-semibold text-text">실천 습관</h3>
              <span className="text-xs text-text-secondary">(체크하면 성공)</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {practiceHabits.map((habit) => (
                <button
                  key={habit.id}
                  onClick={() => onSelectHabit(habit)}
                  className="p-4 bg-background rounded-xl text-left hover:bg-accent/50 transition-colors group"
                >
                  <h4 className="font-medium text-text group-hover:text-primary transition-colors">
                    {habit.name}
                  </h4>
                  {habit.description && (
                    <p className="text-sm text-text-secondary mt-1">{habit.description}</p>
                  )}
                  {habit.badgeSets.length > 0 && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-primary">
                      <Award size={12} />
                      <span>{habit.badgeSets.length}개 뱃지세트</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 절제 습관 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <ShieldOff size={18} className="text-error" />
              <h3 className="font-semibold text-text">절제 습관</h3>
              <span className="text-xs text-text-secondary">(체크하면 실패)</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {restraintHabits.map((habit) => (
                <button
                  key={habit.id}
                  onClick={() => onSelectHabit(habit)}
                  className="p-4 bg-background rounded-xl text-left hover:bg-accent/50 transition-colors group"
                >
                  <h4 className="font-medium text-text group-hover:text-error transition-colors">
                    {habit.name}
                  </h4>
                  {habit.description && (
                    <p className="text-sm text-text-secondary mt-1">{habit.description}</p>
                  )}
                  {habit.badgeSets.length > 0 && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-primary">
                      <Award size={12} />
                      <span>{habit.badgeSets.length}개 뱃지세트</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 커스텀 습관 만들기 */}
          <div className="border-t border-accent/50 pt-6">
            <button
              onClick={onCreateCustom}
              className="w-full p-4 border-2 border-dashed border-accent rounded-xl text-center hover:border-primary hover:bg-accent/30 transition-all"
            >
              <p className="font-medium text-text">+ 직접 습관 만들기</p>
              <p className="text-sm text-text-secondary mt-1">
                나만의 습관을 만들어보세요
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
