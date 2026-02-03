import { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import type { TabType, HabitType as UIHabitType, User, SystemHabit } from './types';

// Theme
import { ThemeProvider } from './contexts/ThemeContext';

// API & Hooks
import { authService, getErrorMessage } from './api';
import { useHabits, useDailyPage, useCalendar, useBadges, useAiFeedback } from './hooks';
import type { HabitType as ApiHabitType } from './api/types';

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
import ThemeModal from './components/theme/ThemeModal';

// Common Components
import WriteModal from './components/common/WriteModal';
import Toast from './components/common/Toast';
import SystemHabitModal from './components/common/SystemHabitModal';
import CreateHabitModal from './components/common/CreateHabitModal';

// Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Mock Data (fallback용)
import {
  mockAchievements,
  mockRecords,
  systemHabits,
  getRecordByDate,
  getMonthStats,
} from './data/mockData';

type AuthPage = 'login' | 'signup';

// 날짜 포맷 헬퍼
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

function AppContent() {
  // ============================================
  // 인증 상태
  // ============================================
  const [user, setUser] = useState<User | null>(null);
  const [authPage, setAuthPage] = useState<AuthPage>('login');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // ============================================
  // UI 상태
  // ============================================
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [habitType, setHabitType] = useState<UIHabitType>('practice');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showCreateHabit, setShowCreateHabit] = useState(false);
  const [showSystemHabitModal, setShowSystemHabitModal] = useState(false);
  const [showThemeSettings, setShowThemeSettings] = useState(false);

  // ============================================
  // API Hooks
  // ============================================
  const {
    systemHabits: apiSystemHabits,
    userHabits,
    todayLogs,
    isLoading: isHabitsLoading,
    refresh: refreshHabits,
    registerHabit,
    createCustomHabit,
    checkHabit,
    uncheckHabit,
  } = useHabits();

  const {
    page: todayPage,
    isLoading: isPageLoading,
    fetchPage,
    savePage,
  } = useDailyPage();

  const {
    days: calendarDays,
    fetchCalendar,
  } = useCalendar();

  const {
    acquired: acquiredBadges,
    inProgress: inProgressBadges,
    refresh: refreshBadges,
  } = useBadges();

  const {
    todayFeedback,
    fetchTodayFeedback,
  } = useAiFeedback();

  // ============================================
  // 데이터 로드 (로그인 후)
  // ============================================
  useEffect(() => {
    if (user) {
      // 로그인 후 데이터 로드
      refreshHabits();
      fetchPage(formatDate(new Date()));
      fetchTodayFeedback();
      refreshBadges();
      fetchCalendar(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
    }
  }, [user]);

  // 캘린더 월 변경 시
  useEffect(() => {
    if (user) {
      fetchCalendar(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
    }
  }, [currentMonth, user]);

  // ============================================
  // 인증 핸들러
  // ============================================
  const handleLogin = async (email: string, password: string) => {
    setIsAuthLoading(true);
    try {
      await authService.login({ email, password });
      setUser({
        id: '1',
        email,
        nickname: email.split('@')[0],
        provider: 'email',
      });
      showToastMessage('로그인 성공! 👋');
    } catch (error) {
      showToastMessage(getErrorMessage(error));
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleSignup = async (email: string, password: string, nickname: string) => {
    setIsAuthLoading(true);
    try {
      await authService.signup({ email, password, nickname });
      showToastMessage('회원가입 성공! 로그인해주세요 🎉');
      setAuthPage('login');
    } catch (error) {
      showToastMessage(getErrorMessage(error));
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'kakao') => {
    console.log('소셜 로그인:', provider);
    showToastMessage('소셜 로그인은 준비 중이에요 🔧');
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore logout errors
    }
    setUser(null);
    setAuthPage('login');
    setActiveTab('home');
    showToastMessage('로그아웃 되었어요 👋');
  };

  // ============================================
  // 습관 핸들러 (API 연동)
  // ============================================
  const handleCreateHabit = async (name: string, type: 'practice' | 'restraint') => {
    try {
      const apiType: ApiHabitType = type === 'practice' ? 'PRACTICE' : 'ABSTINENCE';
      await createCustomHabit(name, apiType);
      setShowCreateHabit(false);
      showToastMessage('새 습관이 추가되었어요! 🌱');
    } catch (error) {
      showToastMessage(getErrorMessage(error));
    }
  };

  const handleSelectSystemHabit = async (systemHabit: SystemHabit) => {
    try {
      // 시스템 습관에서 매칭되는 API 습관 찾기
      const apiHabit = apiSystemHabits.find(h => h.name === systemHabit.name);
      if (apiHabit) {
        await registerHabit(apiHabit.id);
      } else {
        // 매칭되는 습관이 없으면 커스텀으로 생성
        const apiType: ApiHabitType = systemHabit.type === 'practice' ? 'PRACTICE' : 'ABSTINENCE';
        await createCustomHabit(systemHabit.name, apiType, systemHabit.icon);
      }
      setShowSystemHabitModal(false);
      showToastMessage(`${systemHabit.name} 습관이 추가되었어요! 🌱`);
    } catch (error) {
      showToastMessage(getErrorMessage(error));
    }
  };

  const handleToggleHabit = async (id: string) => {
    const log = todayLogs.find(l => l.userHabitId.toString() === id);
    if (!log) return;

    try {
      if (log.checked && log.id) {
        // 체크 취소
        await uncheckHabit(log.id);
      } else {
        // 체크
        await checkHabit(log.userHabitId);
      }
    } catch (error) {
      showToastMessage(getErrorMessage(error));
    }
  };

  // ============================================
  // 글쓰기 핸들러 (API 연동)
  // ============================================
  const handleSaveJournal = async (content: string) => {
    try {
      await savePage(content, formatDate(new Date()));
      setIsWriteModalOpen(false);
      showToastMessage('오늘의 기록이 저장되었어요 ✨');
    } catch (error) {
      showToastMessage(getErrorMessage(error));
    }
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

  // API 데이터를 UI 형식으로 변환
  const habits = todayLogs.map(log => ({
    id: log.userHabitId.toString(),
    name: log.habitName,
    type: (log.habitType === 'PRACTICE' ? 'practice' : 'restraint') as UIHabitType,
    checked: log.checked,
    streak: log.currentStreak,
  }));

  // 습관 달성률 계산
  const practiceHabits = habits.filter(h => h.type === 'practice');
  const restraintHabits = habits.filter(h => h.type === 'restraint');
  const completedPractice = practiceHabits.filter(h => h.checked).length;
  const completedRestraint = restraintHabits.filter(h => !h.checked).length;
  const completionRate = habits.length > 0
    ? Math.round(((completedPractice + completedRestraint) / habits.length) * 100)
    : 0;

  // 사용자 스트릭 계산 (최대 스트릭)
  const maxStreak = (userHabits ?? []).reduce((max, h) => Math.max(max, h.currentStreak), 0);

  // 이번 달 통계 (mock 사용, 추후 API 연동)
  const monthStats = getMonthStats(currentMonth.getFullYear(), currentMonth.getMonth());

  // 선택된 날짜의 기록
  const selectedRecord = selectedDate ? getRecordByDate(selectedDate) : undefined;

  // 뱃지 데이터 변환
  const uiBadges = acquiredBadges.map(b => ({
    id: b.id.toString(),
    icon: b.badgeIcon,
    name: b.badgeName,
    description: `${b.habitName}에서 획득`,
    acquiredAt: b.acquiredAt,
    isAcquired: true,
  }));

  const uiBadgeProgress = inProgressBadges.map(b => ({
    name: b.nextBadge.name,
    habitName: b.habitName,
    currentValue: b.currentValue,
    targetValue: b.nextBadge.conditionValue,
    progress: b.progress,
  }));

  // AI 피드백 데이터
  const aiFeedbackData = todayFeedback
    ? { title: '오늘의 피드백', message: todayFeedback.message }
    : { title: '오늘의 피드백', message: '아직 피드백이 없어요. 습관을 기록해보세요!' };

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
  // 로딩 상태
  // ============================================
  const isLoading = isHabitsLoading || isPageLoading;

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
        user={{ nickname: user.nickname, streak: maxStreak }}
      />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-8">
          {/* 로딩 인디케이터 */}
          {isLoading && (
            <div className="fixed top-4 right-4 flex items-center gap-2 bg-surface px-4 py-2 rounded-lg shadow-card z-50">
              <Loader2 size={16} className="animate-spin text-primary" />
              <span className="text-sm text-text-secondary">로딩 중...</span>
            </div>
          )}

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
                  title={aiFeedbackData.title}
                  message={aiFeedbackData.message}
                />
                <TodayPageCTA
                  hasWritten={!!todayPage?.content}
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
              {maxStreak >= 7 && (
                <Banner
                  message={`🎉 ${maxStreak}일 연속 달성 중! 대단해요!`}
                  onActionClick={() => setActiveTab('badges')}
                />
              )}
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
                {uiBadgeProgress.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {uiBadgeProgress.map((progress, index) => (
                      <BadgeProgressCard key={index} progress={progress} />
                    ))}
                  </div>
                ) : (
                  <p className="text-text-secondary">습관을 등록하면 뱃지 도전이 시작돼요!</p>
                )}
              </div>

              {/* 획득한 뱃지 */}
              <div>
                <h2 className="font-semibold text-text mb-4">🏆 획득한 뱃지</h2>
                {uiBadges.length > 0 ? (
                  <BadgeCollection badges={uiBadges} />
                ) : (
                  <p className="text-text-secondary">아직 획득한 뱃지가 없어요. 습관을 꾸준히 실천해보세요!</p>
                )}
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
                  stats={{
                    totalDays: (userHabits ?? []).length > 0 ? Math.max(...(userHabits ?? []).map(h => h.currentStreak)) : 0,
                    totalHabits: (userHabits ?? []).length,
                    completionRate,
                  }}
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
        initialContent={todayPage?.content}
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

      {/* 테마 설정 모달 */}
      <ThemeModal
        isOpen={showThemeSettings}
        onClose={() => setShowThemeSettings(false)}
      />

      {/* 커스텀 습관 생성 모달 */}
      <CreateHabitModal
        isOpen={showCreateHabit}
        onClose={() => setShowCreateHabit(false)}
        onCreate={handleCreateHabit}
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
