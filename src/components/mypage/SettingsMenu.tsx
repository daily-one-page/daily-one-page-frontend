import { Bell, Palette, Shield, HelpCircle, MessageSquare, ChevronRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { getActiveTheme } from '../../data/themes';

interface SettingsMenuProps {
  onItemClick?: (item: string) => void;
}

export default function SettingsMenu({ onItemClick }: SettingsMenuProps) {
  const { selectedThemeId } = useTheme();
  const activeTheme = getActiveTheme(selectedThemeId);

  // 현재 테마 표시 텍스트
  const currentThemeText = selectedThemeId === 'auto'
    ? `추천 테마 (${activeTheme.nameKo})`
    : activeTheme.nameKo;

  const menuItems = [
    { id: 'notifications', icon: Bell, label: '알림 설정', description: '푸시 알림, 리마인더' },
    { id: 'theme', icon: Palette, label: '테마 설정', description: currentThemeText },
    { id: 'privacy', icon: Shield, label: '개인정보 관리', description: '비밀번호 변경, 계정 보안' },
    { id: 'help', icon: HelpCircle, label: '도움말', description: 'FAQ, 사용 가이드' },
    { id: 'feedback', icon: MessageSquare, label: '피드백 보내기', description: '의견 및 제안' },
  ];

  return (
    <div className="bg-surface rounded-2xl shadow-card overflow-hidden">
      <h3 className="px-6 py-4 font-semibold text-text border-b border-accent/50">설정</h3>
      <ul>
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <button
                onClick={() => onItemClick?.(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 hover:bg-accent/30 transition-colors ${
                  index !== menuItems.length - 1 ? 'border-b border-accent/30' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <Icon size={20} className="text-secondary" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-text">{item.label}</p>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                </div>
                <ChevronRight size={20} className="text-text-secondary" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
