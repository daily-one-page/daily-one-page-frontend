import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { DayRecord } from '../../types';

interface CalendarGridProps {
  currentMonth: Date;
  selectedDate: Date | null;
  records: DayRecord[];
  onMonthChange: (date: Date) => void;
  onDateSelect: (date: Date) => void;
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function CalendarGrid({
  currentMonth,
  selectedDate,
  records,
  onMonthChange,
  onDateSelect,
}: CalendarGridProps) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const prevMonth = () => {
    onMonthChange(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    onMonthChange(new Date(year, month + 1, 1));
  };

  const getRecord = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return records.find(r => r.date === dateStr);
  };

  const isToday = (day: number) => {
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  };

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-card">
      {/* 월 네비게이션 */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-accent transition-colors"
        >
          <ChevronLeft size={20} className="text-text-secondary" />
        </button>
        <h3 className="text-lg font-semibold text-text">
          {year}년 {month + 1}월
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-accent transition-colors"
        >
          <ChevronRight size={20} className="text-text-secondary" />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map(day => (
          <div key={day} className="text-center text-sm font-medium text-text-secondary py-2">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          if (day === null) {
            return <div key={idx} className="aspect-square" />;
          }

          const record = getRecord(day);
          const hasRecord = !!record?.journalWritten;

          return (
            <button
              key={idx}
              onClick={() => onDateSelect(new Date(year, month, day))}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center relative transition-all hover:bg-accent/50 ${
                isSelected(day) ? 'bg-accent' : ''
              } ${isToday(day) ? 'ring-2 ring-primary' : ''}`}
            >
              <span className={`text-sm ${isToday(day) ? 'font-bold text-primary' : 'text-text'}`}>
                {day}
              </span>
              {hasRecord && (
                <div
                  className="w-1.5 h-1.5 rounded-full bg-primary mt-1"
                  style={{ opacity: record ? record.completionRate / 100 : 0.5 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* 범례 */}
      <div className="mt-4 flex items-center gap-2 text-sm text-text-secondary">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <span>기록 있음 (농도로 달성률 표현)</span>
      </div>
    </div>
  );
}
