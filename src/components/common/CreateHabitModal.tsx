import { useState } from 'react';
import { X, Dumbbell, ShieldOff } from 'lucide-react';
import type { HabitType } from '../../types';

interface CreateHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, type: HabitType) => void;
}

export default function CreateHabitModal({ isOpen, onClose, onCreate }: CreateHabitModalProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<HabitType>('practice');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    onCreate(name.trim(), type);
    setName('');
    setType('practice');
  };

  const handleClose = () => {
    setName('');
    setType('practice');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* 모달 */}
      <div className="relative bg-surface rounded-2xl shadow-modal w-full max-w-lg overflow-hidden animate-slide-up mx-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-accent/30">
          <h2 className="text-xl font-bold text-text">새 습관 만들기</h2>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent/50 transition-colors"
          >
            <X size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 습관 이름 */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              습관 이름
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="예: 운동하기, 물 2L 마시기"
              className="w-full px-4 py-3 bg-background border-2 border-accent rounded-xl text-text placeholder:text-text-secondary/60 focus:outline-none focus:border-primary transition-colors"
              autoFocus
            />
          </div>

          {/* 습관 타입 */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              습관 유형
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* 실천 습관 */}
              <button
                type="button"
                onClick={() => setType('practice')}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  type === 'practice'
                    ? 'border-primary bg-primary/10'
                    : 'border-accent bg-background hover:border-primary/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                  type === 'practice' ? 'bg-primary text-white' : 'bg-accent text-secondary'
                }`}>
                  <Dumbbell size={20} />
                </div>
                <h3 className={`font-semibold text-sm mb-1 ${
                  type === 'practice' ? 'text-primary' : 'text-text'
                }`}>
                  실천 습관
                </h3>
                <p className="text-xs text-text-secondary">
                  체크하면 성공!
                </p>
              </button>

              {/* 절제 습관 */}
              <button
                type="button"
                onClick={() => setType('restraint')}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  type === 'restraint'
                    ? 'border-error bg-error/10'
                    : 'border-accent bg-background hover:border-error/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                  type === 'restraint' ? 'bg-error text-white' : 'bg-accent text-secondary'
                }`}>
                  <ShieldOff size={20} />
                </div>
                <h3 className={`font-semibold text-sm mb-1 ${
                  type === 'restraint' ? 'text-error' : 'text-text'
                }`}>
                  절제 습관
                </h3>
                <p className="text-xs text-text-secondary">
                  체크하면 실패!
                </p>
              </button>
            </div>
          </div>

          {/* 생성 버튼 */}
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            습관 만들기
          </button>
        </form>
      </div>
    </div>
  );
}
