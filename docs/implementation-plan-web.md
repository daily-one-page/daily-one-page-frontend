# 오늘한장 - 웹 프론트엔드 구현 계획서

> **목적**: 이 문서를 보고 AI 또는 개발자가 바로 구현할 수 있도록 상세하게 작성

---

## 1. 현재 구현 상태

### 1.1 완료된 기능

| 기능 | 파일 위치 | 상태 |
|------|----------|------|
| 프로젝트 세팅 | vite.config.ts, index.css | ✅ |
| Tailwind + Peach Dawn 테마 | src/index.css | ✅ |
| 로그인 페이지 UI | src/pages/LoginPage.tsx | ✅ (Mock) |
| 회원가입 페이지 UI | src/pages/SignupPage.tsx | ✅ (Mock) |
| 사이드바 레이아웃 | src/components/layout/Sidebar.tsx | ✅ |
| 홈 탭 | src/App.tsx (홈 섹션) | ✅ |
| AI 피드백 카드 | src/components/home/AIFeedbackCard.tsx | ✅ |
| 오늘 한장 CTA | src/components/home/TodayPageCTA.tsx | ✅ |
| 성취 섹션 | src/components/home/AchievementSection.tsx | ✅ |
| 습관 요약 | src/components/home/HabitSummary.tsx | ✅ |
| 배너 | src/components/home/Banner.tsx | ✅ |
| 습관 탭 | src/App.tsx (습관 섹션) | ✅ |
| 세그먼트 컨트롤 | src/components/habits/SegmentControl.tsx | ✅ |
| 습관 카드 | src/components/habits/HabitCard.tsx | ✅ |
| 습관 생성 페이지 | src/pages/CreateHabitPage.tsx | ✅ |
| 캘린더 탭 | src/App.tsx (캘린더 섹션) | ✅ |
| 캘린더 그리드 | src/components/calendar/CalendarGrid.tsx | ✅ |
| 통계 카드 | src/components/calendar/StatsCard.tsx | ✅ |
| 날짜 상세 카드 | src/components/calendar/DateDetailCard.tsx | ✅ |
| 글쓰기 모달 | src/components/common/WriteModal.tsx | ✅ |
| 토스트 | src/components/common/Toast.tsx | ✅ |

### 1.2 현재 디렉토리 구조

```
src/
├── components/
│   ├── layout/
│   │   └── Sidebar.tsx
│   ├── home/
│   │   ├── AIFeedbackCard.tsx
│   │   ├── TodayPageCTA.tsx
│   │   ├── AchievementSection.tsx
│   │   ├── HabitSummary.tsx
│   │   └── Banner.tsx
│   ├── habits/
│   │   ├── HabitCard.tsx
│   │   └── SegmentControl.tsx
│   ├── calendar/
│   │   ├── CalendarGrid.tsx
│   │   ├── StatsCard.tsx
│   │   └── DateDetailCard.tsx
│   └── common/
│       ├── WriteModal.tsx
│       └── Toast.tsx
├── pages/
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   └── CreateHabitPage.tsx
├── data/
│   └── mockData.ts
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## 2. 구현 예정 기능 (우선순위 순)

### Phase 1: 습관 CRUD 완성
1. 습관 수정 페이지
2. 습관 삭제 기능
3. 습관 상세 통계 페이지

### Phase 2: 뱃지 시스템 (MVP)
1. 뱃지 타입 정의
2. 프리셋 뱃지 데이터
3. 뱃지 목록 페이지
4. 뱃지 획득 로직
5. AI 뱃지 생성 (OpenAI 연동)

### Phase 3: 다양한 블럭 타입
1. 블럭 타입 시스템 설계
2. 습관 체크 블럭
3. 단어장 블럭
4. 이미지 블럭

### Phase 4: 설정 및 프로필
1. 프로필 수정 페이지
2. 설정 페이지

### Phase 5: 백엔드 연동
1. API 서비스 레이어 구축
2. 인증 연동 (JWT)
3. 모든 Mock 데이터 → API 호출로 교체

---

## 3. Phase 1: 습관 CRUD 완성

### 3.1 습관 수정 페이지

**파일**: `src/pages/EditHabitPage.tsx`

**UI 구성**:
- CreateHabitPage와 동일한 레이아웃
- 기존 데이터 pre-fill
- "수정하기" 버튼
- "삭제하기" 버튼 (빨간색, 하단)

**Props**:
```typescript
interface EditHabitPageProps {
  habit: Habit;
  onBack: () => void;
  onUpdate: (id: string, name: string, type: HabitType) => void;
  onDelete: (id: string) => void;
}
```

**구현 상세**:
```typescript
// 1. 헤더: 뒤로가기 + "습관 수정"
// 2. 이름 입력 (기존값 pre-fill)
// 3. 타입 선택 (기존값 선택됨)
// 4. "수정하기" 버튼 - Primary 색상
// 5. 구분선
// 6. "습관 삭제" 버튼 - Error 색상, 확인 alert 후 삭제
```

**App.tsx 연결**:
```typescript
// 상태 추가
const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

// 핸들러 추가
const handleUpdateHabit = (id: string, name: string, type: HabitType) => {
  setHabits(prev => prev.map(h => h.id === id ? { ...h, name, type } : h));
  setEditingHabit(null);
};

const handleDeleteHabit = (id: string) => {
  setHabits(prev => prev.filter(h => h.id !== id));
  setEditingHabit(null);
};

// 라우팅 추가
if (editingHabit) {
  return <EditHabitPage habit={editingHabit} onBack={() => setEditingHabit(null)} ... />;
}
```

**HabitCard 수정**:
- 카드 클릭 시 → 수정 페이지로 이동
- 체크박스 클릭은. stopPropagation()으로 분리

---

### 3.2 습관 상세 통계 페이지

**파일**: `src/pages/HabitDetailPage.tsx`

**UI 구성**:
```
┌─────────────────────────────────────────┐
│ ← 운동하기                    [수정]    │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  🔥 현재 연속                    │    │
│  │     12일                        │    │
│  │  ───────────────────────────    │    │
│  │  최장 연속: 21일                │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  📊 이번 달 통계                 │    │
│  │  ───────────────────────────    │    │
│  │  성공: 18일 / 19일 (95%)        │    │
│  │  ████████████████████░░ 95%    │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  🏆 획득한 뱃지                  │    │
│  │  ───────────────────────────    │    │
│  │  🏃 하프마라톤 완주!             │    │
│  │  🏅 풀마라톤 완주!               │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  📅 히스토리 (최근 30일)         │    │
│  │  ───────────────────────────    │    │
│  │  ● ● ● ○ ● ● ● ● ○ ● ...      │    │
│  └─────────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘
```

**Props**:
```typescript
interface HabitDetailPageProps {
  habit: Habit;
  records: DayRecord[];
  badges: Badge[];
  onBack: () => void;
  onEdit: () => void;
}
```

**통계 계산 함수**:
```typescript
// 현재 연속 일수 계산
const calculateCurrentStreak = (habitId: string, records: DayRecord[]): number => { ... }

// 최장 연속 일수 계산
const calculateMaxStreak = (habitId: string, records: DayRecord[]): number => { ... }

// 이번 달 성공률 계산
const calculateMonthlyRate = (habitId: string, records: DayRecord[]): { success: number, total: number, rate: number } => { ... }

// 최근 30일 히스토리
const getLast30DaysHistory = (habitId: string, records: DayRecord[]): boolean[] => { ... }
```

---

## 4. Phase 2: 뱃지 시스템

### 4.1 타입 정의

**파일**: `src/types/index.ts`에 추가

```typescript
// 뱃지 카테고리
export type BadgeCategory = 'running' | 'no_smoking' | 'water' | 'reading' | 'custom';

// 뱃지 상태
export type BadgeStatus = 'locked' | 'unlocked';

// 프리셋 뱃지 정의
export interface PresetBadge {
  id: string;
  category: BadgeCategory;
  name: string;
  description: string;
  emoji: string;
  condition: {
    type: 'streak' | 'total' | 'count';
    value: number;
    unit: string;
  };
}

// 사용자 뱃지 (획득 정보 포함)
export interface UserBadge {
  id: string;
  badgeId: string;
  habitId: string;
  unlockedAt: string | null;
  status: BadgeStatus;
  progress: number; // 0-100
}

// 커스텀 뱃지 (사용자 또는 AI 생성)
export interface CustomBadge {
  id: string;
  habitId: string;
  name: string;
  description: string;
  emoji: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  createdBy: 'user' | 'ai';
}
```

### 4.2 프리셋 뱃지 데이터

**파일**: `src/data/presetBadges.ts`

```typescript
import type { PresetBadge } from '../types';

export const presetBadges: PresetBadge[] = [
  // 달리기 (매일 3km 기준)
  {
    id: 'running_half',
    category: 'running',
    name: '하프마라톤 완주!',
    description: '누적 21km 달성',
    emoji: '🏃',
    condition: { type: 'total', value: 21, unit: 'km' }
  },
  {
    id: 'running_full',
    category: 'running',
    name: '풀마라톤 완주!',
    description: '누적 42km 달성',
    emoji: '🏅',
    condition: { type: 'total', value: 42, unit: 'km' }
  },
  {
    id: 'running_busan',
    category: 'running',
    name: '서울에서 부산까지!',
    description: '누적 400km 달성',
    emoji: '🚄',
    condition: { type: 'total', value: 400, unit: 'km' }
  },

  // 금연 (1갑 5,000원 기준)
  {
    id: 'smoking_chicken',
    category: 'no_smoking',
    name: '치킨 1마리 값 절약!',
    description: '금연 1일 달성',
    emoji: '🍗',
    condition: { type: 'streak', value: 1, unit: '일' }
  },
  {
    id: 'smoking_lung',
    category: 'no_smoking',
    name: '폐가 청소를 시작합니다',
    description: '금연 7일 달성',
    emoji: '🫁',
    condition: { type: 'streak', value: 7, unit: '일' }
  },
  {
    id: 'smoking_omakase',
    category: 'no_smoking',
    name: '오마카세 한 끼 값!',
    description: '금연 30일 달성',
    emoji: '🍣',
    condition: { type: 'streak', value: 30, unit: '일' }
  },
  {
    id: 'smoking_airpods',
    category: 'no_smoking',
    name: '에어팟 하나 벌었다!',
    description: '금연 100일 달성',
    emoji: '🎧',
    condition: { type: 'streak', value: 100, unit: '일' }
  },
  {
    id: 'smoking_europe',
    category: 'no_smoking',
    name: '유럽 왕복 항공권!',
    description: '금연 365일 달성',
    emoji: '✈️',
    condition: { type: 'streak', value: 365, unit: '일' }
  },

  // 물 마시기 (매일 2L 기준)
  {
    id: 'water_bottle',
    category: 'water',
    name: '정수기 물통 1개',
    description: '누적 14L 달성 (7일)',
    emoji: '🚰',
    condition: { type: 'total', value: 14, unit: 'L' }
  },
  {
    id: 'water_basin',
    category: 'water',
    name: '대야 가득 채움',
    description: '누적 60L 달성 (30일)',
    emoji: '🛁',
    condition: { type: 'total', value: 60, unit: 'L' }
  },
  {
    id: 'water_bathtub',
    category: 'water',
    name: '욕조 하나 분량',
    description: '누적 200L 달성 (100일)',
    emoji: '🛀',
    condition: { type: 'total', value: 200, unit: 'L' }
  },
  {
    id: 'water_firetruck',
    category: 'water',
    name: '소방차 물탱크',
    description: '누적 730L 달성 (365일)',
    emoji: '🚒',
    condition: { type: 'total', value: 730, unit: 'L' }
  },
  {
    id: 'water_pool',
    category: 'water',
    name: '작은 수영장 완성',
    description: '누적 2,000L 달성 (1,000일)',
    emoji: '🏊',
    condition: { type: 'total', value: 2000, unit: 'L' }
  },
];

// 카테고리별 프리셋 가져오기
export const getBadgesByCategory = (category: BadgeCategory): PresetBadge[] => {
  return presetBadges.filter(b => b.category === category);
};
```

### 4.3 뱃지 목록 페이지

**파일**: `src/pages/BadgesPage.tsx`

**UI 구성**:
```
┌─────────────────────────────────────────┐
│ ← 뱃지                                  │
├─────────────────────────────────────────┤
│                                         │
│  획득한 뱃지 (5)                         │
│  ─────────────────────────────────────  │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │
│  │ 🏃  │ │ 🍗  │ │ 🫁  │ │ 🚰  │       │
│  │달성!│ │달성!│ │달성!│ │달성!│       │
│  └─────┘ └─────┘ └─────┘ └─────┘       │
│                                         │
│  도전 중인 뱃지 (3)                      │
│  ─────────────────────────────────────  │
│  ┌───────────────────────────────────┐  │
│  │ 🏅 풀마라톤 완주!                  │  │
│  │ ████████░░░░░░░░ 21/42km (50%)   │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │ 🍣 오마카세 한 끼 값!              │  │
│  │ ██████████████░░ 21/30일 (70%)   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  아직 시작하지 않은 뱃지                 │
│  ─────────────────────────────────────  │
│  ┌─────┐ ┌─────┐ ┌─────┐               │
│  │ 🎧  │ │ ✈️  │ │ 🛀  │ ...          │
│  │ ???│ │ ???│ │ ???│               │
│  └─────┘ └─────┘ └─────┘               │
│                                         │
└─────────────────────────────────────────┘
```

**컴포넌트 분리**:
- `BadgeCard.tsx` - 개별 뱃지 카드
- `BadgeProgressCard.tsx` - 진행 중인 뱃지 (프로그레스 바 포함)
- `BadgeGrid.tsx` - 뱃지 그리드 레이아웃

### 4.4 AI 뱃지 생성

**파일**: `src/services/badgeAI.ts`

**API 요청 형식** (백엔드에서 OpenAI 호출):
```typescript
interface GenerateBadgeRequest {
  habitName: string;
  habitType: 'practice' | 'restraint';
  unitPerDay?: number; // 예: 3km, 2L
  unit?: string;
}

interface GenerateBadgeResponse {
  badges: {
    name: string;
    description: string;
    emoji: string;
    targetValue: number;
    unit: string;
  }[];
}

// API 호출 함수
export const generateBadgesWithAI = async (request: GenerateBadgeRequest): Promise<GenerateBadgeResponse> => {
  const response = await fetch('/api/badges/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  return response.json();
};
```

**AI 뱃지 생성 모달**:
- 습관 생성 시 "AI로 뱃지 추천받기" 버튼
- AI가 5개 정도 뱃지 제안
- 사용자가 선택/수정 후 저장

---

## 5. Phase 3: 다양한 블럭 타입

### 5.1 블럭 타입 시스템 설계

**파일**: `src/types/blocks.ts`

```typescript
// 블럭 타입
export type BlockType = 'text' | 'habit_check' | 'word_list' | 'image';

// 기본 블럭 인터페이스
interface BaseBlock {
  id: string;
  type: BlockType;
  order: number;
}

// 자유 텍스트 블럭
export interface TextBlock extends BaseBlock {
  type: 'text';
  content: string;
  placeholder?: string;
}

// 습관 체크 블럭
export interface HabitCheckBlock extends BaseBlock {
  type: 'habit_check';
  habitIds: string[]; // 표시할 습관 ID 목록
}

// 단어장 블럭
export interface WordListBlock extends BaseBlock {
  type: 'word_list';
  title: string; // 예: "오늘의 영단어"
  words: {
    word: string;
    meaning: string;
  }[];
  maxWords: number; // 예: 5
}

// 이미지 블럭
export interface ImageBlock extends BaseBlock {
  type: 'image';
  imageUrl: string | null;
  caption?: string;
}

// 통합 블럭 타입
export type Block = TextBlock | HabitCheckBlock | WordListBlock | ImageBlock;

// 페이지 템플릿
export interface PageTemplate {
  id: string;
  name: string;
  blocks: Block[];
}
```

### 5.2 블럭 컴포넌트

**디렉토리**: `src/components/blocks/`

```
blocks/
├── BlockRenderer.tsx      # 블럭 타입에 따라 렌더링
├── TextBlockEditor.tsx    # 자유 텍스트 편집
├── HabitCheckBlock.tsx    # 습관 체크 블럭
├── WordListBlock.tsx      # 단어장 블럭
├── ImageBlock.tsx         # 이미지 블럭
└── BlockSelector.tsx      # 블럭 추가 시 타입 선택
```

**BlockRenderer.tsx**:
```typescript
interface BlockRendererProps {
  block: Block;
  isEditing: boolean;
  onChange: (block: Block) => void;
}

export default function BlockRenderer({ block, isEditing, onChange }: BlockRendererProps) {
  switch (block.type) {
    case 'text':
      return <TextBlockEditor block={block} isEditing={isEditing} onChange={onChange} />;
    case 'habit_check':
      return <HabitCheckBlock block={block} />;
    case 'word_list':
      return <WordListBlock block={block} isEditing={isEditing} onChange={onChange} />;
    case 'image':
      return <ImageBlock block={block} isEditing={isEditing} onChange={onChange} />;
    default:
      return null;
  }
}
```

---

## 6. Phase 4: 설정 및 프로필

### 6.1 프로필 수정 페이지

**파일**: `src/pages/ProfilePage.tsx`

**UI 구성**:
```
┌─────────────────────────────────────────┐
│ ← 프로필 설정                           │
├─────────────────────────────────────────┤
│                                         │
│         ┌─────────┐                     │
│         │  👤     │  [사진 변경]         │
│         │ 아바타  │                     │
│         └─────────┘                     │
│                                         │
│  닉네임                                 │
│  ┌─────────────────────────────────┐    │
│  │ 민지                            │    │
│  └─────────────────────────────────┘    │
│                                         │
│  이메일                                 │
│  ┌─────────────────────────────────┐    │
│  │ minji@email.com        (변경불가)│    │
│  └─────────────────────────────────┘    │
│                                         │
│  [저장하기]                             │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  [로그아웃]                             │
│  [회원탈퇴]                             │
│                                         │
└─────────────────────────────────────────┘
```

**Props**:
```typescript
interface ProfilePageProps {
  user: User;
  onBack: () => void;
  onUpdate: (nickname: string, avatar?: string) => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
}
```

---

## 7. Phase 5: 백엔드 연동

### 7.1 API 서비스 레이어

**디렉토리 구조**:
```
src/
├── services/
│   ├── api.ts           # Axios 인스턴스 + 인터셉터
│   ├── authService.ts   # 인증 관련 API
│   ├── habitService.ts  # 습관 CRUD API
│   ├── pageService.ts   # 데일리 페이지 API
│   ├── badgeService.ts  # 뱃지 API
│   └── userService.ts   # 사용자 정보 API
```

### 7.2 API 엔드포인트 정의

#### 인증 API

| Method | Endpoint | 설명 | Request Body | Response |
|--------|----------|------|--------------|----------|
| POST | `/api/auth/signup` | 회원가입 | `{ email, password, nickname }` | `{ user, token }` |
| POST | `/api/auth/login` | 로그인 | `{ email, password }` | `{ user, token }` |
| POST | `/api/auth/logout` | 로그아웃 | - | `{ success }` |
| POST | `/api/auth/oauth/{provider}` | 소셜 로그인 | `{ accessToken }` | `{ user, token }` |
| GET | `/api/auth/me` | 현재 사용자 | - | `{ user }` |
| DELETE | `/api/auth/withdraw` | 회원탈퇴 | - | `{ success }` |

#### 습관 API

| Method | Endpoint | 설명 | Request Body | Response |
|--------|----------|------|--------------|----------|
| GET | `/api/habits` | 습관 목록 | - | `{ habits: Habit[] }` |
| POST | `/api/habits` | 습관 생성 | `{ name, type }` | `{ habit }` |
| GET | `/api/habits/{id}` | 습관 상세 | - | `{ habit, stats }` |
| PUT | `/api/habits/{id}` | 습관 수정 | `{ name, type }` | `{ habit }` |
| DELETE | `/api/habits/{id}` | 습관 삭제 | - | `{ success }` |
| POST | `/api/habits/{id}/check` | 습관 체크 | `{ date, checked }` | `{ record }` |
| GET | `/api/habits/{id}/stats` | 습관 통계 | `?month=2026-01` | `{ stats }` |

#### 데일리 페이지 API

| Method | Endpoint | 설명 | Request Body | Response |
|--------|----------|------|--------------|----------|
| GET | `/api/pages` | 페이지 목록 | `?month=2026-01` | `{ pages: Page[] }` |
| GET | `/api/pages/{date}` | 특정 날짜 페이지 | - | `{ page }` |
| POST | `/api/pages` | 페이지 저장 | `{ date, blocks }` | `{ page }` |
| PUT | `/api/pages/{date}` | 페이지 수정 | `{ blocks }` | `{ page }` |
| GET | `/api/pages/calendar` | 캘린더 데이터 | `?year=2026&month=1` | `{ records: DayRecord[] }` |

#### 뱃지 API

| Method | Endpoint | 설명 | Request Body | Response |
|--------|----------|------|--------------|----------|
| GET | `/api/badges` | 내 뱃지 목록 | - | `{ badges: UserBadge[] }` |
| GET | `/api/badges/presets` | 프리셋 뱃지 | `?category=running` | `{ presets: PresetBadge[] }` |
| POST | `/api/badges/generate` | AI 뱃지 생성 | `{ habitName, type, unit }` | `{ badges }` |
| POST | `/api/badges/custom` | 커스텀 뱃지 저장 | `{ habitId, badges }` | `{ badges }` |

#### AI 피드백 API

| Method | Endpoint | 설명 | Request Body | Response |
|--------|----------|------|--------------|----------|
| GET | `/api/feedback/today` | 오늘의 AI 피드백 | - | `{ feedback }` |

#### 사용자 API

| Method | Endpoint | 설명 | Request Body | Response |
|--------|----------|------|--------------|----------|
| GET | `/api/users/profile` | 프로필 조회 | - | `{ profile }` |
| PUT | `/api/users/profile` | 프로필 수정 | `{ nickname, avatar }` | `{ profile }` |
| GET | `/api/users/stats` | 사용자 통계 | - | `{ streak, totalPages }` |

### 7.3 API 서비스 구현 예시

**파일**: `src/services/api.ts`

```typescript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request 인터셉터 - JWT 토큰 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response 인터셉터 - 에러 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

**파일**: `src/services/habitService.ts`

```typescript
import { api } from './api';
import type { Habit, HabitType } from '../types';

export const habitService = {
  // 습관 목록 조회
  getHabits: async (): Promise<Habit[]> => {
    const response = await api.get('/api/habits');
    return response.data.habits;
  },

  // 습관 생성
  createHabit: async (name: string, type: HabitType): Promise<Habit> => {
    const response = await api.post('/api/habits', { name, type });
    return response.data.habit;
  },

  // 습관 수정
  updateHabit: async (id: string, name: string, type: HabitType): Promise<Habit> => {
    const response = await api.put(`/api/habits/${id}`, { name, type });
    return response.data.habit;
  },

  // 습관 삭제
  deleteHabit: async (id: string): Promise<void> => {
    await api.delete(`/api/habits/${id}`);
  },

  // 습관 체크
  checkHabit: async (id: string, date: string, checked: boolean): Promise<void> => {
    await api.post(`/api/habits/${id}/check`, { date, checked });
  },

  // 습관 통계
  getHabitStats: async (id: string, month?: string): Promise<any> => {
    const response = await api.get(`/api/habits/${id}/stats`, { params: { month } });
    return response.data.stats;
  },
};
```

---

## 8. 색상 테마 (Peach Dawn)

**파일**: `src/index.css`

현재 정의된 색상 (변경 시 이 값만 수정):

```css
@theme {
  --color-primary: #E8A87C;      /* 피치 - CTA, 강조 */
  --color-secondary: #C98860;    /* 테라코타 - 부제목, 보조 */
  --color-accent: #F5CDB4;       /* 라이트 피치 - 카드 배경 */
  --color-background: #FFF9F5;   /* 크림 - 전체 배경 */
  --color-surface: #FFFFFF;      /* 화이트 - 카드, 모달 */
  --color-text: #4A3228;         /* 다크 브라운 - 본문 */
  --color-text-secondary: #8B7355; /* 부가 설명 */
  --color-success: #7D9B76;      /* 소프트 그린 - 성공 */
  --color-error: #D4756A;        /* 소프트 레드 - 실패 */
}
```

---

## 9. 컴포넌트 스타일 가이드

### 버튼

```typescript
// Primary 버튼
className="bg-primary text-white rounded-xl px-6 py-3 font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform"

// Secondary 버튼
className="bg-accent text-secondary rounded-xl px-6 py-3 font-medium hover:bg-accent/80 transition-colors"

// Ghost 버튼
className="text-secondary hover:bg-accent/50 rounded-xl px-6 py-3 transition-colors"

// Danger 버튼
className="bg-error text-white rounded-xl px-6 py-3 font-medium hover:bg-error/90 transition-colors"
```

### 카드

```typescript
// 기본 카드
className="bg-surface rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"

// 클릭 가능한 카드
className="bg-surface rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
```

### 입력 필드

```typescript
className="w-full px-4 py-3 bg-background border-2 border-accent rounded-xl text-text placeholder:text-text-secondary/60 focus:outline-none focus:border-primary transition-colors"
```

### 체크박스

```typescript
// 미체크
className="w-8 h-8 rounded-lg border-2 border-secondary flex items-center justify-center transition-all hover:scale-110"

// 체크됨 (실천 습관)
className="w-8 h-8 rounded-lg bg-success text-white flex items-center justify-center transition-all hover:scale-110"

// 체크됨 (절제 습관)
className="w-8 h-8 rounded-lg bg-error text-white flex items-center justify-center transition-all hover:scale-110"
```

---

## 10. 사이드바 네비게이션 추가 항목

현재 메뉴:
- 홈
- 습관
- 캘린더

추가 예정:
- **뱃지** (Trophy 아이콘)

```typescript
const navItems: { id: TabType; label: string; icon: typeof Home }[] = [
  { id: 'home', label: '홈', icon: Home },
  { id: 'habits', label: '습관', icon: CheckSquare },
  { id: 'calendar', label: '캘린더', icon: Calendar },
  { id: 'badges', label: '뱃지', icon: Trophy },  // 추가
];
```

---

## 11. 파일 생성 체크리스트

### Phase 1
- [ ] `src/pages/EditHabitPage.tsx`
- [ ] `src/pages/HabitDetailPage.tsx`
- [ ] `src/utils/habitStats.ts` (통계 계산 함수)

### Phase 2
- [ ] `src/types/badges.ts`
- [ ] `src/data/presetBadges.ts`
- [ ] `src/pages/BadgesPage.tsx`
- [ ] `src/components/badges/BadgeCard.tsx`
- [ ] `src/components/badges/BadgeProgressCard.tsx`
- [ ] `src/components/badges/BadgeGrid.tsx`
- [ ] `src/components/badges/AIBadgeModal.tsx`
- [ ] `src/services/badgeAI.ts`

### Phase 3
- [ ] `src/types/blocks.ts`
- [ ] `src/components/blocks/BlockRenderer.tsx`
- [ ] `src/components/blocks/TextBlockEditor.tsx`
- [ ] `src/components/blocks/HabitCheckBlock.tsx`
- [ ] `src/components/blocks/WordListBlock.tsx`
- [ ] `src/components/blocks/ImageBlock.tsx`
- [ ] `src/components/blocks/BlockSelector.tsx`

### Phase 4
- [ ] `src/pages/ProfilePage.tsx`
- [ ] `src/pages/SettingsPage.tsx`

### Phase 5
- [ ] `src/services/api.ts`
- [ ] `src/services/authService.ts`
- [ ] `src/services/habitService.ts`
- [ ] `src/services/pageService.ts`
- [ ] `src/services/badgeService.ts`
- [ ] `src/services/userService.ts`

---

## 12. 주의사항

1. **Mock → API 전환 시**: `src/data/mockData.ts`의 함수들을 서비스 레이어 호출로 교체
2. **상태 관리**: 현재 App.tsx에서 useState로 관리 중. 복잡해지면 Context 또는 Zustand 고려
3. **에러 처리**: API 호출 시 try-catch + 사용자 친화적 에러 메시지
4. **로딩 상태**: API 호출 중 스켈레톤 UI 또는 로딩 스피너 표시
5. **토큰 관리**: localStorage에 저장, 앱 시작 시 자동 로그인 체크

---

**문서 버전**: v1.0
**작성일**: 2026-01-19
