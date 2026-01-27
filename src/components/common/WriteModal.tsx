import { X } from 'lucide-react';
import { useState } from 'react';

interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: string) => void;
  initialContent?: string;
}

export default function WriteModal({ isOpen, onClose, onSave, initialContent = '' }: WriteModalProps) {
  const [content, setContent] = useState(initialContent);

  if (!isOpen) return null;

  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const dayStr = dayNames[today.getDay()];

  const handleSave = () => {
    onSave(content);
    setContent('');
  };

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
            <h2 className="text-lg font-bold text-text">오늘의 기록</h2>
            <p className="text-sm text-text-secondary">{dateStr} {dayStr}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-primary text-white rounded-xl font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              저장하기
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <X size={20} className="text-text-secondary" />
            </button>
          </div>
        </div>

        {/* 에디터 */}
        <div className="flex-1 p-6 overflow-hidden">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="오늘 하루는 어땠나요? 자유롭게 기록해보세요..."
            className="w-full h-80 p-4 bg-background border-2 border-accent rounded-xl text-text placeholder:text-text-secondary/60 resize-none focus:outline-none focus:border-primary transition-colors leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
