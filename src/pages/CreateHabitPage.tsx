import { useState } from 'react';
import { ArrowLeft, Dumbbell, ShieldOff } from 'lucide-react';
import type { HabitType } from '../types';

interface CreateHabitPageProps {
  onBack: () => void;
  onCreate: (name: string, type: HabitType) => void;
}

export default function CreateHabitPage({ onBack, onCreate }: CreateHabitPageProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<HabitType>('practice');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('습관 이름을 입력해주세요.');
      return;
    }
    onCreate(name.trim(), type);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="bg-surface border-b border-accent/50">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-lg hover:bg-accent/50 transition-colors"
          >
            <ArrowLeft size={24} className="text-text" />
          </button>
          <h1 className="text-xl font-bold text-text">새 습관 만들기</h1>
        </div>
      </header>

      {/* 폼 */}
      <main className="max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 습관 이름 */}
          <div>
            <label className="block text-sm font-medium text-text mb-3">
              습관 이름
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="예: 운동하기, 물 2L 마시기"
              className="w-full px-4 py-4 bg-surface border-2 border-accent rounded-xl text-text text-lg placeholder:text-text-secondary/60 focus:outline-none focus:border-primary transition-colors"
              autoFocus
            />
          </div>

          {/* 습관 타입 */}
          <div>
            <label className="block text-sm font-medium text-text mb-3">
              습관 유형
            </label>
            <div className="grid grid-cols-2 gap-4">
              {/* 실천 습관 */}
              <button
                type="button"
                onClick={() => setType('practice')}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  type === 'practice'
                    ? 'border-primary bg-primary/10'
                    : 'border-accent bg-surface hover:border-primary/50'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  type === 'practice' ? 'bg-primary text-white' : 'bg-accent text-secondary'
                }`}>
                  <Dumbbell size={24} />
                </div>
                <h3 className={`font-semibold mb-1 ${
                  type === 'practice' ? 'text-primary' : 'text-text'
                }`}>
                  실천 습관
                </h3>
                <p className="text-sm text-text-secondary">
                  체크하면 성공!<br />
                  매일 하고 싶은 일
                </p>
              </button>

              {/* 절제 습관 */}
              <button
                type="button"
                onClick={() => setType('restraint')}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  type === 'restraint'
                    ? 'border-error bg-error/10'
                    : 'border-accent bg-surface hover:border-error/50'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  type === 'restraint' ? 'bg-error text-white' : 'bg-accent text-secondary'
                }`}>
                  <ShieldOff size={24} />
                </div>
                <h3 className={`font-semibold mb-1 ${
                  type === 'restraint' ? 'text-error' : 'text-text'
                }`}>
                  절제 습관
                </h3>
                <p className="text-sm text-text-secondary">
                  체크하면 실패!<br />
                  줄이고 싶은 일
                </p>
              </button>
            </div>
          </div>

          {/* 생성 버튼 */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-4 rounded-xl font-medium text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            습관 만들기
          </button>
        </form>
      </main>
    </div>
  );
}
