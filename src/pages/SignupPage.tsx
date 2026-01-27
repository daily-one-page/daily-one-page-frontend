import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';

interface SignupPageProps {
  onSignup: (email: string, password: string, nickname: string) => void;
  onSocialLogin: (provider: 'google' | 'kakao') => void;
  onGoToLogin: () => void;
}

export default function SignupPage({ onSignup, onSocialLogin, onGoToLogin }: SignupPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    onSignup(email, password, nickname);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 로고 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">오늘한장</h1>
          <p className="text-text-secondary">하루 한 장, 나를 완성하는 기록</p>
        </div>

        {/* 회원가입 카드 */}
        <div className="bg-surface rounded-3xl p-8 shadow-card">
          <h2 className="text-xl font-bold text-text mb-6">회원가입</h2>

          {/* 소셜 로그인 (먼저 표시) */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => onSocialLogin('google')}
              className="w-full flex items-center justify-center gap-3 py-3 border-2 border-accent rounded-xl font-medium text-text hover:bg-accent/50 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Google로 시작하기</span>
            </button>

            <button
              onClick={() => onSocialLogin('kakao')}
              className="w-full flex items-center justify-center gap-3 py-3 bg-[#FEE500] rounded-xl font-medium text-[#000000]/85 hover:bg-[#FEE500]/90 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#000000" d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.87 5.33 4.67 6.75l-.95 3.49c-.08.3.25.54.52.38l4.16-2.73c.52.07 1.06.11 1.6.11 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
              </svg>
              <span>카카오로 시작하기</span>
            </button>
          </div>

          {/* 구분선 */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-accent" />
            <span className="text-sm text-text-secondary">또는 이메일로 가입</span>
            <div className="flex-1 h-px bg-accent" />
          </div>

          {/* 이메일 회원가입 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 닉네임 */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">닉네임</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                  placeholder="닉네임을 입력하세요"
                  className="w-full pl-11 pr-4 py-3 bg-background border-2 border-accent rounded-xl text-text placeholder:text-text-secondary/60 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* 이메일 */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">이메일</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full pl-11 pr-4 py-3 bg-background border-2 border-accent rounded-xl text-text placeholder:text-text-secondary/60 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* 비밀번호 */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">비밀번호</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="8자 이상 입력하세요"
                  className="w-full pl-11 pr-11 py-3 bg-background border-2 border-accent rounded-xl text-text placeholder:text-text-secondary/60 focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">비밀번호 확인</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordConfirm}
                  onChange={e => setPasswordConfirm(e.target.value)}
                  placeholder="비밀번호를 다시 입력하세요"
                  className="w-full pl-11 pr-4 py-3 bg-background border-2 border-accent rounded-xl text-text placeholder:text-text-secondary/60 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* 가입 버튼 */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform mt-2"
            >
              가입하기
            </button>
          </form>

          {/* 로그인 링크 */}
          <p className="text-center text-text-secondary mt-6">
            이미 계정이 있으신가요?{' '}
            <button
              onClick={onGoToLogin}
              className="text-primary font-medium hover:underline"
            >
              로그인
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
