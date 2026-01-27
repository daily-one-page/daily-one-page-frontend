import { useState } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import type { TabType, HabitType, Habit, User, SystemHabit } from './types';

// Theme
import { ThemeProvider } from './contexts/ThemeContext';

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

// Badge Components
import BadgeCollection from './components/badges/BadgeCollection';
import BadgeProgressCard from './components/badges/BadgeProgressCard';

// MyPage Components
import ProfileCard from './components/mypage/ProfileCard';
import SettingsMenu from './components/mypage/SettingsMenu';

// Theme Components
import ThemeSelector from './components/theme/ThemeSelector';

// Common Components
import WriteModal from './components/common/WriteModal';
import Toast from './components/common/Toast';
import SystemHabitModal from './components/common/SystemHabitModal';

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
  mockUserBadges,
  mockBadgeProgress,
  mockUserStats,
  systemHabits,
  getRecordByDate,
  getMonthStats,
} from './data/mockData';

type AuthPage = 'login' | 'signup';

function AppContent() {
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
  const [toastMessage, setToastMessage] = useState('');

  // 습관 생성 페이지/모달 상태
  const [showCreateHabit, setShowCreateHabit] = useState(false);
  const [showSystemHabitModal, setShowSystemHabitModal] = useState(false);

  // 테마 설정 페이지 상태
  const [showThemeSettings, setShowThemeSettings] = useState(false);

  // ============================================
  // 인증 핸들러 (Mock - 백엔드 연결 시 교체)
  // ============================================
  const handleLogin = (email: string, password: string) => {
    console.log('로그인 시도:', email, password);
    setUser({
      id: '1',
      email,
      nickname: email.split('@')[0],
      provider: 'email',
    });
  };

  const handleSignup = (email: string, password: string, nickname: string) => {
    console.log('회원가입 시도:', email, password, nickname);
    setUser({
      id: '1',
      email,
      nickname,
      provider: 'email',
    });
  };

  const handleSocialLogin = (provider: 'google' | 'kakao') => {
    console.log('소셜 로그인:', provider);
    setUser({
      id: '1',
      email: `user@${provider}.com`,
      nickname: `${provider}유저`,
      provider,
    });
  };

  const handleLogout = () => {
    setUser(null);
    setAuthPage('login');
    setActiveTab('home');
  };

  // ============================================
  // 습관 핸들러
  // ============================================
  const handleCreateHabit = (name: string, type: 'practice' | 'restraint') => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      type,
      checked: false,
      streak: 0,
    };
    setHabits(prev => [...prev, newHabit]);
    setShowCreateHabit(false);
    showToastMessage('새 습관이 추가되었어요! 🌱');
  };

  const handleSelectSystemHabit = (systemHabit: SystemHabit) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: systemHabit.name,
      type: systemHabit.type,
      checked: false,
      streak: 0,
      isSystem: true,
    };
    setHabits(prev => [...prev, newHabit]);
    setShowSystemHabitModal(false);
    showToastMessage(`${systemHabit.name} 습관이 추가되었어요! 🌱`);
  };

  const handleToggleHabit = (id: string) => {
    setHabits(prev =>
      prev.map(h => (h.id === id ? { ...h, checked: !h.checked } : h))
    );
  };

  // ============================================
  // 설정 핸들러
  // ============================================
  const handleSettingsClick = (item: string) => {
    if (item === 'theme') {
      setShowThemeSettings(true);
    } else {
      showToastMessage('설정 기능은 준비 중이에요 🛠️');
    }
  };

  // ============================================
  // 글쓰기 핸들러
  // ============================================
  const handleSaveJournal = (content: string) => {
    console.log('저장된 내용:', content);
    setTodayWritten(true);
    setIsWriteModalOpen(false);
    showToastMessage('오늘의 기록이 저장되었어요 ✨');
  };

  // ============================================
  // 토스트 핸들러
  // ============================================
  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  // ============================================
  // 유틸리티 함수
  // ============================================
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
  const completionRate = habits.length > 0
    ? Math.round(((completedPractice + completedRestraint) / habits.length) * 100)
    : 0;

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
  // 테마 설정 페이지
  // ============================================
  if (showThemeSettings) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto p-8">
          {/* 뒤로가기 헤더 */}
          <button
            onClick={() => setShowThemeSettings(false)}
            className="flex items-center gap-2 text-text-secondary hover:text-text mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>마이페이지로 돌아가기</span>
          </button>

          {/* 테마 선택기 */}
          <ThemeSelector />
        </div>
      </div>
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
          {/* ============================================ */}
          {/* 홈 탭 */}
          {/* ============================================ */}
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
                message="🎉 금연 30일 달성! 오마카세 한 끼 값을 절약했어요!"
                onActionClick={() => setActiveTab('badges')}
              />
            </div>
          )}

          {/* ============================================ */}
          {/* 습관 탭 */}
          {/* ============================================ */}
          {activeTab === 'habits' && (
            <div className="animate-fade-in">
              {/* 헤더 */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-text">습관 관리</h1>
                  <p className="text-text-secondary mt-1">매일 꾸준히, 작은 실천이 큰 변화를 만듭니다</p>
                </div>
                <button
                  onClick={() => setShowSystemHabitModal(true)}
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

              {/* 빈 상태 */}
              {habits.filter(h => h.type === habitType).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-text-secondary mb-4">
                    아직 {habitType === 'practice' ? '실천' : '절제'} 습관이 없어요
                  </p>
                  <button
                    onClick={() => setShowSystemHabitModal(true)}
                    className="text-primary font-medium hover:underline"
                  >
                    습관 추가하기 →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ============================================ */}
          {/* 캘린더 탭 */}
          {/* ============================================ */}
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

          {/* ============================================ */}
          {/* 뱃지 탭 */}
          {/* ============================================ */}
          {activeTab === 'badges' && (
            <div className="animate-fade-in">
              {/* 헤더 */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-text">뱃지</h1>
                <p className="text-text-secondary mt-1">습관을 통해 얻은 나의 성취들</p>
              </div>

              {/* 진행 중인 뱃지 */}
              <div className="mb-8">
                <h2 className="font-semibold text-text mb-4">🎯 진행 중인 도전</h2>
                <div className="grid grid-cols-2 gap-4">
                  {mockBadgeProgress.map((progress, index) => (
                    <BadgeProgressCard key={index} progress={progress} />
                  ))}
                </div>
              </div>

              {/* 획득한 뱃지 */}
              <div>
                <h2 className="font-semibold text-text mb-4">🏆 획득한 뱃지</h2>
                <BadgeCollection badges={mockUserBadges} />
              </div>
            </div>
          )}

          {/* ============================================ */}
          {/* 마이페이지 탭 */}
          {/* ============================================ */}
          {activeTab === 'mypage' && (
            <div className="animate-fade-in">
              {/* 헤더 */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-text">마이페이지</h1>
                <p className="text-text-secondary mt-1">내 정보와 설정을 관리하세요</p>
              </div>

              {/* 프로필 + 설정 */}
              <div className="grid grid-cols-2 gap-6">
                <ProfileCard
                  nickname={user.nickname}
                  email={user.email}
                  stats={mockUserStats}
                />
                <SettingsMenu onItemClick={handleSettingsClick} />
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

      {/* 시스템 습관 선택 모달 */}
      <SystemHabitModal
        isOpen={showSystemHabitModal}
        onClose={() => setShowSystemHabitModal(false)}
        systemHabits={systemHabits}
        onSelectHabit={handleSelectSystemHabit}
        onCreateCustom={() => {
          setShowSystemHabitModal(false);
          setShowCreateHabit(true);
        }}
      />

      {/* 토스트 */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

// ThemeProvider로 감싼 App 컴포넌트
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
