import { Home, CheckSquare, Calendar, Edit3, Settings, User, LogOut } from 'lucide-react';
import type { TabType, UserProfile } from '../../types';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onWriteClick: () => void;
  onLogout: () => void;
  user: UserProfile;
}

const navItems: { id: TabType; label: string; icon: typeof Home }[] = [
  { id: 'home', label: '홈', icon: Home },
  { id: 'habits', label: '습관', icon: CheckSquare },
  { id: 'calendar', label: '캘린더', icon: Calendar },
];

export default function Sidebar({ activeTab, onTabChange, onWriteClick, onLogout, user }: SidebarProps) {
  return (
    <aside className="w-66 h-screen bg-surface flex flex-col border-r border-accent/50">
      {/* 로고 영역 */}
      <div className="p-6 border-b border-accent/50">
        <h1 className="text-2xl font-bold text-primary">오늘한장</h1>
        <p className="text-sm text-text-secondary mt-1">하루 한 장, 나를 완성하는 기록</p>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-accent text-primary font-medium'
                      : 'text-text-secondary hover:bg-accent/50'
                  }`}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* 오늘 한장 쓰기 CTA */}
        <button
          onClick={onWriteClick}
          className="w-full mt-6 flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-xl font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          <Edit3 size={18} />
          <span>오늘 한장 쓰기</span>
        </button>
      </nav>

      {/* 프로필 영역 */}
      <div className="p-4 border-t border-accent/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
            <User size={20} className="text-secondary" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-text">{user.nickname}</p>
            <p className="text-xs text-text-secondary">{user.streak}일 연속 기록 중</p>
          </div>
          <button className="p-2 rounded-lg hover:bg-accent/50 transition-colors">
            <Settings size={18} className="text-text-secondary" />
          </button>
        </div>
        {/* 로그아웃 버튼 */}
        <button
          onClick={onLogout}
          className="w-full mt-3 flex items-center justify-center gap-2 py-2 text-text-secondary hover:text-error hover:bg-error/10 rounded-lg transition-colors"
        >
          <LogOut size={16} />
          <span className="text-sm">로그아웃</span>
        </button>
      </div>
    </aside>
  );
}
