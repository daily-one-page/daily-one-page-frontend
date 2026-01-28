import { X } from 'lucide-react';
import ThemeSelector from './ThemeSelector';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeModal({ isOpen, onClose }: ThemeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 모달 */}
      <div className="relative bg-surface rounded-2xl shadow-modal w-full max-w-2xl max-h-[85vh] overflow-hidden animate-slide-up mx-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-accent/30">
          <div>
            <h2 className="text-xl font-bold text-text">테마 설정</h2>
            <p className="text-sm text-text-secondary">나에게 맞는 테마를 선택하세요</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent/50 transition-colors"
          >
            <X size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* 컨텐츠 */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
          <ThemeSelector />
        </div>
      </div>
    </div>
  );
}
