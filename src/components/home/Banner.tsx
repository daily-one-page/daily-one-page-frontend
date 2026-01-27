import { Megaphone, ChevronRight } from 'lucide-react';

interface BannerProps {
  message: string;
  onActionClick?: () => void;
}

export default function Banner({ message, onActionClick }: BannerProps) {
  return (
    <div className="bg-accent rounded-2xl px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Megaphone size={20} className="text-secondary" />
        <p className="text-text">{message}</p>
      </div>
      {onActionClick && (
        <button
          onClick={onActionClick}
          className="flex items-center gap-1 text-secondary font-medium hover:text-primary transition-colors"
        >
          <span>자세히 보기</span>
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
