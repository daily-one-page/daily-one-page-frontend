import { Edit3, BookOpen } from 'lucide-react';

interface TodayPageCTAProps {
  hasWritten: boolean;
  onWriteClick: () => void;
  onViewClick: () => void;
}

export default function TodayPageCTA({ hasWritten, onWriteClick, onViewClick }: TodayPageCTAProps) {
  if (hasWritten) {
    return (
      <button
        onClick={onViewClick}
        className="h-full bg-surface rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all border-2 border-primary flex flex-col items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99]"
      >
        <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
          <BookOpen size={28} className="text-primary" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-text">오늘의 기록 완료!</p>
          <p className="text-sm text-text-secondary mt-1">기록 보러가기 →</p>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onWriteClick}
      className="h-full bg-primary rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99]"
    >
      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
        <Edit3 size={28} className="text-white" />
      </div>
      <div className="text-center">
        <p className="font-semibold text-white">오늘 한장 쓰기</p>
        <p className="text-sm text-white/80 mt-1">지금 기록하기 ✍️</p>
      </div>
    </button>
  );
}
