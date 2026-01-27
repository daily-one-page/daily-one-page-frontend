import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { TabType, HabitType, Habit, User } from './types';

// Layout
import Sidebar from './components/layout/Sidebar';

// Home Components
import AIFeedbackCard from './components/home/AIFeedbackCard';
import TodayPageCTA from './components/home/TodayPageCTA';
import AchievementSection from './components/home/AchievementSection';
import HabitSummary from './components/home/HabitSummary';
import Banner from './components/home/Banner';

// Habits Components
import SegmentControl from './components/habits/SegmentControl';
import HabitCard from './components/habits/HabitCard';

// Calendar Components
import CalendarGrid from './components/calendar/CalendarGrid';
import StatsCard from './components/calendar/StatsCard';
import DateDetailCard from './components/calendar/DateDetailCard';

// Common Components
import WriteModal from './components/common/WriteModal';
import Toast from './components/common/Toast';

// Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CreateHabitPage from './pages/CreateHabitPage';

// Mock Data
import {
  mockHabits as initialHabits,
  mockAchievements,
  mockAIFeedback,
  mockRecords,
  getRecordByDate,
  getMonthStats,
} from './data/mockData';

type AuthPage = 'login' | 'signup';

function App() {
  // 인증 상태 (Mock - 나중에 백엔드 연결 시 교체)
  const [user, setUser] = useState<User | null>(null);
  const [authPage, setAuthPage] = useState<AuthPage>('login');

  // 탭 상태
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // 습관 관련 상태
  const [habitType, setHabitType] = useState<HabitType>('practice');
  const [habits, setHabits] = useState<Habit[]>(initialHabits);

  // 캘린더 관련 상태
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 글쓰기 모달 상태
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [todayWritten, setTodayWritten] = useState(false);

  // 토스트 상태
  const [showToast, setShowToast] = useState(false);

  // 습관 생성 페이지 상태
  const [showCreateHabit, setShowCreateHabit] = useState(false);

  // ============================================
  // 인증 핸들러 (Mock - 백엔드 연결 시 교체)
  // ============================================
  const handleLogin = (email: string, password: string) => {
    // TODO: 백엔드 API 연결
    console.log('로그인 시도:', email, password);

    // Mock 로그인 - 무조건 성공
    setUser({
      id: '1',
      email,
      nickname: email.split('@')[0],
      provider: 'email',
    });
  };

  const handleSignup = (email: string, password: string, nickname: string) => {
    // TODO: 백엔드 API 연결
    console.log('회원가입 시도:', email, password, nickname);

    // Mock 회원가입 - 무조건 성공 후 로그인
    setUser({
      id: '1',
      email,
      nickname,
      provider: 'email',
    });
  };

  const handleSocialLogin = (provider: 'google' | 'kakao') => {
    // TODO: 백엔드 OAuth 연결
    console.log('소셜 로그인:', provider);

    // Mock 소셜 로그인
    setUser({
      id: '1',
      email: `user@${provider}.com`,
      nickname: `${provider}유저`,
      provider,
    });
  };

  const handleLogout = () => {
    // TODO: 백엔드 로그아웃 API 연결
    setUser(null);
    setAuthPage('login');
  };

  const handleCreateHabit = (name: string, type: 'practice' | 'restraint') => {
    const newHabit = {
      id: Date.now().toString(),
      name,
      type,
      checked: false,
      streak: 0,
    };
    setHabits(prev => [...prev, newHabit]);
    setShowCreateHabit(false);
  };

  // ============================================
  // 기존 핸들러
  // ============================================
  const handleToggleHabit = (id: string) => {
    setHabits(prev =>
      prev.map(h => (h.id === id ? { ...h, checked: !h.checked } : h))
    );
  };

  const handleSaveJournal = (content: string) => {
    console.log('저장된 내용:', content);
    setTodayWritten(true);
    setIsWriteModalOpen(false);
    setShowToast(true);
  };

  // 인사말 생성
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) return '좋은 새벽이에요';
    if (hour < 12) return '좋은 아침이에요';
    if (hour < 18) return '좋은 오후예요';
    return '좋은 저녁이에요';
  };

  // 오늘 날짜 포맷
  const today = new Date();
  const todayStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

  // 습관 달성률 계산
  const practiceHabits = habits.filter(h => h.type === 'practice');
  const restraintHabits = habits.filter(h => h.type === 'restraint');
  const completedPractice = practiceHabits.filter(h => h.checked).length;
  const completedRestraint = restraintHabits.filter(h => !h.checked).length;
  const completionRate = Math.round(
    ((completedPractice + completedRestraint) / habits.length) * 100
  );

  // 이번 달 통계
  const monthStats = getMonthStats(currentMonth.getFullYear(), currentMonth.getMonth());

  // 선택된 날짜의 기록
  const selectedRecord = selectedDate ? getRecordByDate(selectedDate) : undefined;

  // ============================================
  // 비로그인 상태: 로그인/회원가입 페이지
  // ============================================
  if (!user) {
    if (authPage === 'login') {
      return (
        <LoginPage
          onLogin={handleLogin}
          onSocialLogin={handleSocialLogin}
          onGoToSignup={() => setAuthPage('signup')}
        />
      );
    }
    return (
      <SignupPage
        onSignup={handleSignup}
        onSocialLogin={handleSocialLogin}
        onGoToLogin={() => setAuthPage('login')}
      />
    );
  }

  // ============================================
  // 습관 생성 페이지
  // ============================================
  if (showCreateHabit) {
    return (
      <CreateHabitPage
        onBack={() => setShowCreateHabit(false)}
        onCreate={handleCreateHabit}
      />
    );
  }

  // ============================================
  // 로그인 상태: 메인 앱
  // ============================================
  return (
    <div className="flex h-screen bg-background">
      {/* 사이드바 */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onWriteClick={() => setIsWriteModalOpen(true)}
        onLogout={handleLogout}
        user={{ nickname: user.nickname, streak: 7 }}
      />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-8">
          {/* 홈 탭 */}
          {activeTab === 'home' && (
            <div className="animate-fade-in">
              {/* 헤더 */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-text">
                    {getGreeting()}, {user.nickname}님
                  </h1>
                  <p className="text-text-secondary mt-1">{todayStr} {dayNames[today.getDay()]}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-text-secondary">오늘 습관 달성률</p>
                  <p className="text-3xl font-bold text-primary">{completionRate}%</p>
                </div>
              </div>

              {/* AI 피드백 + 오늘 한장 CTA */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <AIFeedbackCard
                  title={mockAIFeedback.title}
                  message={mockAIFeedback.message}
                />
                <TodayPageCTA
                  hasWritten={todayWritten}
                  onWriteClick={() => setIsWriteModalOpen(true)}
                  onViewClick={() => setIsWriteModalOpen(true)}
                />
              </div>

              {/* 성취 + 습관 요약 */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="col-span-2">
                  <AchievementSection achievements={mockAchievements} />
                </div>
                <HabitSummary habits={habits} onToggle={handleToggleHabit} />
              </div>

              {/* 배너 */}
              <Banner
                message="새로운 뱃지 시스템이 업데이트되었어요!"
                onActionClick={() => console.log('배너 클릭')}
              />
            </div>
          )}

          {/* 습관 탭 */}
          {activeTab === 'habits' && (
            <div className="animate-fade-in">
              {/* 헤더 */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-text">습관 관리</h1>
                  <p className="text-text-secondary mt-1">매일 꾸준히, 작은 실천이 큰 변화를 만듭니다</p>
                </div>
                <button
                  onClick={() => setShowCreateHabit(true)}
                  className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  <Plus size={18} />
                  <span>습관 추가</span>
                </button>
              </div>

              {/* 세그먼트 컨트롤 */}
              <div className="mb-6">
                <SegmentControl
                  activeType={habitType}
                  onTypeChange={setHabitType}
                  practiceCount={practiceHabits.length}
                  restraintCount={restraintHabits.length}
                />
              </div>

              {/* 안내 배너 */}
              <div className="bg-accent rounded-xl px-4 py-3 mb-6">
                <p className="text-secondary text-sm">
                  {habitType === 'practice'
                    ? '💪 실천 습관: 체크하면 성공!'
                    : '🛑 절제 습관: 체크하면 실패!'}
                </p>
              </div>

              {/* 습관 그리드 */}
              <div className="grid grid-cols-2 gap-4">
                {habits
                  .filter(h => h.type === habitType)
                  .map(habit => (
                    <HabitCard
                      key={habit.id}
                      habit={habit}
                      onToggle={handleToggleHabit}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* 캘린더 탭 */}
          {activeTab === 'calendar' && (
            <div className="animate-fade-in">
              {/* 헤더 */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-text">캘린더</h1>
                <p className="text-text-secondary mt-1">나의 기록을 한눈에 확인하세요</p>
              </div>

              {/* 캘린더 + 사이드 패널 */}
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <CalendarGrid
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    records={mockRecords}
                    onMonthChange={setCurrentMonth}
                    onDateSelect={setSelectedDate}
                  />
                </div>
                <div className="space-y-6">
                  <StatsCard
                    recordedDays={monthStats.recordedDays}
                    avgCompletion={monthStats.avgCompletion}
                    maxStreak={monthStats.maxStreak}
                  />
                  <DateDetailCard
                    selectedDate={selectedDate}
                    record={selectedRecord}
                    habits={habits}
                    onViewDetail={() => console.log('상세 보기')}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 글쓰기 모달 */}
      <WriteModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        onSave={handleSaveJournal}
      />

      {/* 토스트 */}
      <Toast
        message="오늘의 기록이 저장되었어요 ✨"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

export default App;
