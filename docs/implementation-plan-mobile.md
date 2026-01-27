# 오늘한장 - 모바일 앱 (Flutter) 구현 계획서

> **목적**: 이 문서를 보고 AI 또는 개발자가 Flutter 앱을 구현할 수 있도록 상세하게 작성

---

## 1. 프로젝트 개요

### 1.1 기술 스택

| 영역 | 기술 | 버전 |
|------|------|------|
| Framework | Flutter | 3.x |
| Language | Dart | 3.x |
| State Management | Riverpod 또는 Provider | 최신 |
| HTTP Client | Dio | 최신 |
| Local Storage | SharedPreferences / Hive | 최신 |
| 이미지 | cached_network_image | 최신 |

### 1.2 디자인 시스템

웹과 동일한 **Peach Dawn** 테마 사용:

```dart
class AppColors {
  static const primary = Color(0xFFE8A87C);      // 피치
  static const secondary = Color(0xFFC98860);    // 테라코타
  static const accent = Color(0xFFF5CDB4);       // 라이트 피치
  static const background = Color(0xFFFFF9F5);   // 크림
  static const surface = Color(0xFFFFFFFF);      // 화이트
  static const text = Color(0xFF4A3228);         // 다크 브라운
  static const textSecondary = Color(0xFF8B7355);
  static const success = Color(0xFF7D9B76);      // 소프트 그린
  static const error = Color(0xFFD4756A);        // 소프트 레드
}
```

---

## 2. 프로젝트 구조

```
lib/
├── main.dart
├── app.dart
│
├── config/
│   ├── theme.dart              # 테마 설정
│   ├── routes.dart             # 라우팅 설정
│   └── constants.dart          # 상수
│
├── models/
│   ├── user.dart
│   ├── habit.dart
│   ├── page.dart
│   ├── badge.dart
│   └── block.dart
│
├── services/
│   ├── api_service.dart        # Dio 인스턴스
│   ├── auth_service.dart
│   ├── habit_service.dart
│   ├── page_service.dart
│   ├── badge_service.dart
│   └── user_service.dart
│
├── providers/                   # Riverpod Providers
│   ├── auth_provider.dart
│   ├── habit_provider.dart
│   ├── page_provider.dart
│   └── badge_provider.dart
│
├── screens/
│   ├── splash/
│   │   └── splash_screen.dart
│   ├── auth/
│   │   ├── login_screen.dart
│   │   └── signup_screen.dart
│   ├── home/
│   │   └── home_screen.dart
│   ├── habits/
│   │   ├── habits_screen.dart
│   │   ├── habit_detail_screen.dart
│   │   ├── create_habit_screen.dart
│   │   └── edit_habit_screen.dart
│   ├── calendar/
│   │   └── calendar_screen.dart
│   ├── badges/
│   │   └── badges_screen.dart
│   ├── write/
│   │   └── write_screen.dart
│   └── profile/
│       └── profile_screen.dart
│
├── widgets/
│   ├── common/
│   │   ├── app_button.dart
│   │   ├── app_card.dart
│   │   ├── app_text_field.dart
│   │   ├── loading_indicator.dart
│   │   └── toast.dart
│   ├── home/
│   │   ├── ai_feedback_card.dart
│   │   ├── today_cta_card.dart
│   │   ├── achievement_section.dart
│   │   └── habit_summary.dart
│   ├── habits/
│   │   ├── habit_card.dart
│   │   └── segment_control.dart
│   ├── calendar/
│   │   ├── calendar_grid.dart
│   │   ├── stats_card.dart
│   │   └── date_detail_card.dart
│   ├── badges/
│   │   ├── badge_card.dart
│   │   └── badge_progress_card.dart
│   └── blocks/
│       ├── block_renderer.dart
│       ├── text_block.dart
│       ├── habit_check_block.dart
│       ├── word_list_block.dart
│       └── image_block.dart
│
└── utils/
    ├── date_utils.dart
    ├── habit_stats.dart
    └── validators.dart
```

---

## 3. 화면별 상세 설계

### 3.1 스플래시 화면

**파일**: `lib/screens/splash/splash_screen.dart`

```dart
// 기능:
// 1. 앱 로고 + 슬로건 표시 (2초)
// 2. 저장된 토큰 확인
// 3. 토큰 있음 → 홈으로, 없음 → 로그인으로

class SplashScreen extends StatefulWidget { ... }

// UI:
// - 중앙에 "오늘한장" 로고 (Primary 색상)
// - 하단에 "하루 한 장, 나를 완성하는 기록" 슬로건
// - 페이드인 애니메이션
```

### 3.2 로그인 화면

**파일**: `lib/screens/auth/login_screen.dart`

```
┌─────────────────────────────────────────┐
│                                         │
│            오늘한장                      │
│    하루 한 장, 나를 완성하는 기록         │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 로그인                          │    │
│  │                                 │    │
│  │ 이메일                          │    │
│  │ ┌─────────────────────────────┐ │    │
│  │ │ 📧 example@email.com       │ │    │
│  │ └─────────────────────────────┘ │    │
│  │                                 │    │
│  │ 비밀번호                        │    │
│  │ ┌─────────────────────────────┐ │    │
│  │ │ 🔒 ••••••••           👁   │ │    │
│  │ └─────────────────────────────┘ │    │
│  │                                 │    │
│  │ [        로그인        ]        │    │
│  │                                 │    │
│  │ ──────── 또는 ────────         │    │
│  │                                 │    │
│  │ [  G  Google로 계속하기  ]      │    │
│  │ [  🗨  카카오로 계속하기  ]      │    │
│  │                                 │    │
│  │ 계정이 없으신가요? 회원가입      │    │
│  └─────────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘
```

### 3.3 메인 화면 (하단 탭바)

**파일**: `lib/screens/home/home_screen.dart`

모바일은 **하단 탭바** 네비게이션 사용:

```dart
// 탭 구성
enum MainTab { home, habits, calendar, badges }

// BottomNavigationBar 아이템
final tabs = [
  BottomNavigationBarItem(icon: Icon(Icons.home), label: '홈'),
  BottomNavigationBarItem(icon: Icon(Icons.check_box), label: '습관'),
  BottomNavigationBarItem(icon: Icon(Icons.calendar_today), label: '캘린더'),
  BottomNavigationBarItem(icon: Icon(Icons.emoji_events), label: '뱃지'),
];
```

**홈 탭 UI**:
```
┌─────────────────────────────────────────┐
│ 좋은 저녁이에요, 민지님 👋              │
│ 2026년 1월 19일 일요일                  │
│                              달성률 76% │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ ✨ AI 피드백                    │    │
│  │ ─────────────────────────────   │    │
│  │ 어제 운동 습관 3일 연속 성공!    │    │
│  │ 이 페이스 대단해요 💪           │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │     오늘 한장 쓰기 ✍️           │    │
│  │     지금 기록하기               │    │
│  └─────────────────────────────────┘    │
│                                         │
│  🏆 다가오는 성취                        │
│  ─────────────────────────────────────  │
│  🏃 하프마라톤    ████████░░ 18/21km   │
│  🚭 금연 1개월   ██████████ 달성!      │
│                                         │
│  오늘의 습관                            │
│  ─────────────────────────────────────  │
│  ☑ 물 2L 마시기                        │
│  ☐ 운동하기                            │
│  ☐ 독서 30분                           │
│                                         │
└─────────────────────────────────────────┘
│  🏠    ✅    📅    🏆  │  ← 하단 탭바
└─────────────────────────┘
```

### 3.4 습관 탭

```
┌─────────────────────────────────────────┐
│ 습관 관리                      [+ 추가] │
├─────────────────────────────────────────┤
│                                         │
│ ┌─────────────────┬─────────────────┐   │
│ │ 실천 습관 (4)   │ 절제 습관 (4)   │   │
│ └─────────────────┴─────────────────┘   │
│                                         │
│ 💪 실천 습관: 체크하면 성공!             │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ ☐ 운동하기                      │    │
│  │    🔥 3일 연속             [3일]│    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │ ☑ 물 2L 마시기                  │    │
│  │    🔥 7일 연속             [7일]│    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │ ☐ 독서 30분                     │    │
│  │    🔥 1일 연속             [1일]│    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │ ☐ 명상 10분                     │    │
│  │    🔥 12일 연속           [12일]│    │
│  └─────────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘
```

### 3.5 습관 생성 화면

**파일**: `lib/screens/habits/create_habit_screen.dart`

```
┌─────────────────────────────────────────┐
│ ←  새 습관 만들기                       │
├─────────────────────────────────────────┤
│                                         │
│  습관 이름                              │
│  ┌─────────────────────────────────┐    │
│  │ 예: 운동하기, 물 2L 마시기       │    │
│  └─────────────────────────────────┘    │
│                                         │
│  습관 유형                              │
│                                         │
│  ┌───────────────┐  ┌───────────────┐   │
│  │               │  │               │   │
│  │     💪        │  │     🛡️        │   │
│  │               │  │               │   │
│  │  실천 습관    │  │  절제 습관    │   │
│  │ 체크하면 성공 │  │ 체크하면 실패 │   │
│  │               │  │               │   │
│  └───────────────┘  └───────────────┘   │
│   ✓ 선택됨                              │
│                                         │
│                                         │
│  [       습관 만들기       ]            │
│                                         │
└─────────────────────────────────────────┘
```

### 3.6 습관 상세 화면

**파일**: `lib/screens/habits/habit_detail_screen.dart`

```
┌─────────────────────────────────────────┐
│ ←  운동하기                    [수정]   │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐    │
│  │         🔥 현재 연속            │    │
│  │            12일                 │    │
│  │  ─────────────────────────────  │    │
│  │  최장 연속: 21일                │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  📊 이번 달 통계                │    │
│  │  ─────────────────────────────  │    │
│  │  성공: 18일 / 19일 (95%)        │    │
│  │  ████████████████████░░ 95%    │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  🏆 획득한 뱃지                 │    │
│  │  ─────────────────────────────  │    │
│  │  🏃 하프마라톤 완주!            │    │
│  │  🏅 풀마라톤 완주!              │    │
│  └─────────────────────────────────┘    │
│                                         │
│  📅 최근 30일                           │
│  ● ● ● ○ ● ● ● ● ○ ● ● ● ● ● ○ ...   │
│                                         │
└─────────────────────────────────────────┘
```

### 3.7 캘린더 탭

```
┌─────────────────────────────────────────┐
│ 캘린더                                  │
├─────────────────────────────────────────┤
│                                         │
│       ◀   2026년 1월   ▶               │
│                                         │
│  일  월  화  수  목  금  토             │
│  ─────────────────────────────────────  │
│      1   2   3   4   5   6             │
│  7   8   9  10  11  12  13             │
│ 14  15  16  17 [18] 19  20             │
│ 21  22  23  24  25  26  27             │
│ 28  29  30  31                         │
│                                         │
│  ● 기록 있음                            │
│                                         │
├─────────────────────────────────────────┤
│  이번 달 통계                           │
│  ─────────────────────────────────────  │
│  기록한 날: 18일                        │
│  습관 달성률: 76%                       │
│  최장 연속: 7일                         │
├─────────────────────────────────────────┤
│  1월 18일                               │
│  ─────────────────────────────────────  │
│  ✓ 운동하기                            │
│  ✓ 물 2L 마시기                        │
│  ✗ 독서 30분                           │
│                                         │
│  [상세 보기]                            │
└─────────────────────────────────────────┘
```

### 3.8 뱃지 탭

```
┌─────────────────────────────────────────┐
│ 뱃지                                    │
├─────────────────────────────────────────┤
│                                         │
│  획득한 뱃지 (5)                        │
│  ─────────────────────────────────────  │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │
│  │ 🏃  │ │ 🍗  │ │ 🫁  │ │ 🚰  │ ...  │
│  │달성!│ │달성!│ │달성!│ │달성!│       │
│  └─────┘ └─────┘ └─────┘ └─────┘       │
│                                         │
│  도전 중 (3)                            │
│  ─────────────────────────────────────  │
│  ┌─────────────────────────────────┐    │
│  │ 🏅 풀마라톤 완주!                │    │
│  │ ████████░░░░░░ 21/42km (50%)   │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │ 🍣 오마카세 한 끼 값!            │    │
│  │ ██████████████░ 21/30일 (70%)  │    │
│  └─────────────────────────────────┘    │
│                                         │
│  아직 시작하지 않은 뱃지                │
│  ─────────────────────────────────────  │
│  ┌─────┐ ┌─────┐ ┌─────┐               │
│  │ 🎧  │ │ ✈️  │ │ 🛀  │ ...          │
│  │ ??? │ │ ??? │ │ ??? │               │
│  └─────┘ └─────┘ └─────┘               │
│                                         │
└─────────────────────────────────────────┘
```

### 3.9 글쓰기 화면

**파일**: `lib/screens/write/write_screen.dart`

```
┌─────────────────────────────────────────┐
│ ←  오늘의 기록              [저장하기]  │
│    2026년 1월 19일 일요일               │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐    │
│  │                                 │    │
│  │  오늘 하루는 어땠나요?          │    │
│  │  자유롭게 기록해보세요...        │    │
│  │                                 │    │
│  │                                 │    │
│  │                                 │    │
│  │                                 │    │
│  │                                 │    │
│  │                                 │    │
│  │                                 │    │
│  │                                 │    │
│  │                                 │    │
│  │                                 │    │
│  │                                 │    │
│  │                                 │    │
│  └─────────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘
```

### 3.10 프로필 화면

**접근**: 홈 탭 상단 프로필 아이콘 또는 설정

```
┌─────────────────────────────────────────┐
│ ←  프로필 설정                          │
├─────────────────────────────────────────┤
│                                         │
│           ┌─────────┐                   │
│           │   👤    │                   │
│           │ 아바타  │                   │
│           └─────────┘                   │
│          [사진 변경]                    │
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
│  [        저장하기        ]             │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  [로그아웃]                             │
│  [회원탈퇴]                             │
│                                         │
└─────────────────────────────────────────┘
```

---

## 4. 모델 (Models)

### 4.1 User

**파일**: `lib/models/user.dart`

```dart
class User {
  final String id;
  final String email;
  final String nickname;
  final String? avatar;
  final String provider; // 'email' | 'google' | 'kakao'

  User({
    required this.id,
    required this.email,
    required this.nickname,
    this.avatar,
    required this.provider,
  });

  factory User.fromJson(Map<String, dynamic> json) => User(
    id: json['id'],
    email: json['email'],
    nickname: json['nickname'],
    avatar: json['avatar'],
    provider: json['provider'],
  );

  Map<String, dynamic> toJson() => {
    'id': id,
    'email': email,
    'nickname': nickname,
    'avatar': avatar,
    'provider': provider,
  };
}
```

### 4.2 Habit

**파일**: `lib/models/habit.dart`

```dart
enum HabitType { practice, restraint }

class Habit {
  final String id;
  final String name;
  final HabitType type;
  final bool checked;
  final int streak;

  Habit({
    required this.id,
    required this.name,
    required this.type,
    required this.checked,
    required this.streak,
  });

  factory Habit.fromJson(Map<String, dynamic> json) => Habit(
    id: json['id'],
    name: json['name'],
    type: json['type'] == 'practice' ? HabitType.practice : HabitType.restraint,
    checked: json['checked'] ?? false,
    streak: json['streak'] ?? 0,
  );

  Habit copyWith({
    String? id,
    String? name,
    HabitType? type,
    bool? checked,
    int? streak,
  }) => Habit(
    id: id ?? this.id,
    name: name ?? this.name,
    type: type ?? this.type,
    checked: checked ?? this.checked,
    streak: streak ?? this.streak,
  );
}
```

### 4.3 Badge

**파일**: `lib/models/badge.dart`

```dart
enum BadgeStatus { locked, unlocked }
enum BadgeCategory { running, noSmoking, water, reading, custom }

class PresetBadge {
  final String id;
  final BadgeCategory category;
  final String name;
  final String description;
  final String emoji;
  final int targetValue;
  final String unit;

  PresetBadge({
    required this.id,
    required this.category,
    required this.name,
    required this.description,
    required this.emoji,
    required this.targetValue,
    required this.unit,
  });

  factory PresetBadge.fromJson(Map<String, dynamic> json) => PresetBadge(
    id: json['id'],
    category: BadgeCategory.values.firstWhere(
      (e) => e.name == json['category'],
      orElse: () => BadgeCategory.custom,
    ),
    name: json['name'],
    description: json['description'],
    emoji: json['emoji'],
    targetValue: json['targetValue'],
    unit: json['unit'],
  );
}

class UserBadge {
  final String id;
  final String badgeId;
  final String habitId;
  final DateTime? unlockedAt;
  final BadgeStatus status;
  final int progress; // 0-100

  UserBadge({
    required this.id,
    required this.badgeId,
    required this.habitId,
    this.unlockedAt,
    required this.status,
    required this.progress,
  });

  factory UserBadge.fromJson(Map<String, dynamic> json) => UserBadge(
    id: json['id'],
    badgeId: json['badgeId'],
    habitId: json['habitId'],
    unlockedAt: json['unlockedAt'] != null
      ? DateTime.parse(json['unlockedAt'])
      : null,
    status: json['status'] == 'unlocked'
      ? BadgeStatus.unlocked
      : BadgeStatus.locked,
    progress: json['progress'] ?? 0,
  );
}
```

### 4.4 DayRecord

**파일**: `lib/models/day_record.dart`

```dart
class HabitRecord {
  final String id;
  final bool checked;

  HabitRecord({required this.id, required this.checked});

  factory HabitRecord.fromJson(Map<String, dynamic> json) => HabitRecord(
    id: json['id'],
    checked: json['checked'],
  );
}

class DayRecord {
  final String date; // YYYY-MM-DD
  final List<HabitRecord> habits;
  final bool journalWritten;
  final int completionRate;

  DayRecord({
    required this.date,
    required this.habits,
    required this.journalWritten,
    required this.completionRate,
  });

  factory DayRecord.fromJson(Map<String, dynamic> json) => DayRecord(
    date: json['date'],
    habits: (json['habits'] as List)
      .map((h) => HabitRecord.fromJson(h))
      .toList(),
    journalWritten: json['journalWritten'] ?? false,
    completionRate: json['completionRate'] ?? 0,
  );
}
```

---

## 5. API 서비스

### 5.1 API 클라이언트

**파일**: `lib/services/api_service.dart`

```dart
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;
  ApiService._internal();

  final Dio _dio = Dio(BaseOptions(
    baseUrl: 'https://api.oneulhanjang.com', // 또는 환경변수
    connectTimeout: const Duration(seconds: 10),
    receiveTimeout: const Duration(seconds: 10),
    headers: {'Content-Type': 'application/json'},
  ));

  Future<void> init() async {
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final prefs = await SharedPreferences.getInstance();
        final token = prefs.getString('token');
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        return handler.next(options);
      },
      onError: (error, handler) async {
        if (error.response?.statusCode == 401) {
          final prefs = await SharedPreferences.getInstance();
          await prefs.remove('token');
          // 로그인 화면으로 이동 로직
        }
        return handler.next(error);
      },
    ));
  }

  Dio get dio => _dio;
}
```

### 5.2 인증 서비스

**파일**: `lib/services/auth_service.dart`

```dart
import 'package:dio/dio.dart';
import '../models/user.dart';
import 'api_service.dart';

class AuthService {
  final Dio _dio = ApiService().dio;

  Future<({User user, String token})> login(String email, String password) async {
    final response = await _dio.post('/api/auth/login', data: {
      'email': email,
      'password': password,
    });
    return (
      user: User.fromJson(response.data['user']),
      token: response.data['token'],
    );
  }

  Future<({User user, String token})> signup(String email, String password, String nickname) async {
    final response = await _dio.post('/api/auth/signup', data: {
      'email': email,
      'password': password,
      'nickname': nickname,
    });
    return (
      user: User.fromJson(response.data['user']),
      token: response.data['token'],
    );
  }

  Future<({User user, String token})> socialLogin(String provider, String accessToken) async {
    final response = await _dio.post('/api/auth/oauth/$provider', data: {
      'accessToken': accessToken,
    });
    return (
      user: User.fromJson(response.data['user']),
      token: response.data['token'],
    );
  }

  Future<void> logout() async {
    await _dio.post('/api/auth/logout');
  }

  Future<User> getCurrentUser() async {
    final response = await _dio.get('/api/auth/me');
    return User.fromJson(response.data['user']);
  }
}
```

### 5.3 습관 서비스

**파일**: `lib/services/habit_service.dart`

```dart
import 'package:dio/dio.dart';
import '../models/habit.dart';
import 'api_service.dart';

class HabitService {
  final Dio _dio = ApiService().dio;

  Future<List<Habit>> getHabits() async {
    final response = await _dio.get('/api/habits');
    return (response.data['habits'] as List)
      .map((h) => Habit.fromJson(h))
      .toList();
  }

  Future<Habit> createHabit(String name, HabitType type) async {
    final response = await _dio.post('/api/habits', data: {
      'name': name,
      'type': type == HabitType.practice ? 'practice' : 'restraint',
    });
    return Habit.fromJson(response.data['habit']);
  }

  Future<Habit> updateHabit(String id, String name, HabitType type) async {
    final response = await _dio.put('/api/habits/$id', data: {
      'name': name,
      'type': type == HabitType.practice ? 'practice' : 'restraint',
    });
    return Habit.fromJson(response.data['habit']);
  }

  Future<void> deleteHabit(String id) async {
    await _dio.delete('/api/habits/$id');
  }

  Future<void> checkHabit(String id, String date, bool checked) async {
    await _dio.post('/api/habits/$id/check', data: {
      'date': date,
      'checked': checked,
    });
  }

  Future<Map<String, dynamic>> getHabitStats(String id, {String? month}) async {
    final response = await _dio.get('/api/habits/$id/stats',
      queryParameters: month != null ? {'month': month} : null,
    );
    return response.data['stats'];
  }
}
```

---

## 6. 상태 관리 (Riverpod)

### 6.1 Auth Provider

**파일**: `lib/providers/auth_provider.dart`

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user.dart';
import '../services/auth_service.dart';

final authServiceProvider = Provider((ref) => AuthService());

final authStateProvider = StateNotifierProvider<AuthNotifier, AsyncValue<User?>>((ref) {
  return AuthNotifier(ref.watch(authServiceProvider));
});

class AuthNotifier extends StateNotifier<AsyncValue<User?>> {
  final AuthService _authService;

  AuthNotifier(this._authService) : super(const AsyncValue.loading()) {
    _init();
  }

  Future<void> _init() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');

    if (token != null) {
      try {
        final user = await _authService.getCurrentUser();
        state = AsyncValue.data(user);
      } catch (e) {
        await prefs.remove('token');
        state = const AsyncValue.data(null);
      }
    } else {
      state = const AsyncValue.data(null);
    }
  }

  Future<void> login(String email, String password) async {
    state = const AsyncValue.loading();
    try {
      final result = await _authService.login(email, password);
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', result.token);
      state = AsyncValue.data(result.user);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }

  Future<void> logout() async {
    await _authService.logout();
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
    state = const AsyncValue.data(null);
  }
}
```

### 6.2 Habit Provider

**파일**: `lib/providers/habit_provider.dart`

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/habit.dart';
import '../services/habit_service.dart';

final habitServiceProvider = Provider((ref) => HabitService());

final habitsProvider = StateNotifierProvider<HabitsNotifier, AsyncValue<List<Habit>>>((ref) {
  return HabitsNotifier(ref.watch(habitServiceProvider));
});

class HabitsNotifier extends StateNotifier<AsyncValue<List<Habit>>> {
  final HabitService _habitService;

  HabitsNotifier(this._habitService) : super(const AsyncValue.loading()) {
    loadHabits();
  }

  Future<void> loadHabits() async {
    state = const AsyncValue.loading();
    try {
      final habits = await _habitService.getHabits();
      state = AsyncValue.data(habits);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }

  Future<void> createHabit(String name, HabitType type) async {
    try {
      final habit = await _habitService.createHabit(name, type);
      state.whenData((habits) {
        state = AsyncValue.data([...habits, habit]);
      });
    } catch (e) {
      rethrow;
    }
  }

  Future<void> toggleHabit(String id) async {
    state.whenData((habits) {
      final updatedHabits = habits.map((h) {
        if (h.id == id) {
          return h.copyWith(checked: !h.checked);
        }
        return h;
      }).toList();
      state = AsyncValue.data(updatedHabits);
    });

    // API 호출은 백그라운드에서
    final habit = state.value?.firstWhere((h) => h.id == id);
    if (habit != null) {
      final today = DateTime.now().toIso8601String().split('T')[0];
      await _habitService.checkHabit(id, today, !habit.checked);
    }
  }

  Future<void> updateHabit(String id, String name, HabitType type) async {
    final updated = await _habitService.updateHabit(id, name, type);
    state.whenData((habits) {
      state = AsyncValue.data(
        habits.map((h) => h.id == id ? updated : h).toList(),
      );
    });
  }

  Future<void> deleteHabit(String id) async {
    await _habitService.deleteHabit(id);
    state.whenData((habits) {
      state = AsyncValue.data(habits.where((h) => h.id != id).toList());
    });
  }
}
```

---

## 7. 위젯 (Widgets)

### 7.1 공통 버튼

**파일**: `lib/widgets/common/app_button.dart`

```dart
import 'package:flutter/material.dart';
import '../../config/theme.dart';

enum AppButtonType { primary, secondary, ghost, danger }

class AppButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final AppButtonType type;
  final bool isLoading;
  final IconData? icon;

  const AppButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.type = AppButtonType.primary,
    this.isLoading = false,
    this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: isLoading ? null : onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: _backgroundColor,
        foregroundColor: _foregroundColor,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
      child: isLoading
        ? const SizedBox(
            width: 20,
            height: 20,
            child: CircularProgressIndicator(strokeWidth: 2),
          )
        : Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (icon != null) ...[
                Icon(icon, size: 18),
                const SizedBox(width: 8),
              ],
              Text(text, style: const TextStyle(fontWeight: FontWeight.w600)),
            ],
          ),
    );
  }

  Color get _backgroundColor {
    switch (type) {
      case AppButtonType.primary:
        return AppColors.primary;
      case AppButtonType.secondary:
        return AppColors.accent;
      case AppButtonType.ghost:
        return Colors.transparent;
      case AppButtonType.danger:
        return AppColors.error;
    }
  }

  Color get _foregroundColor {
    switch (type) {
      case AppButtonType.primary:
      case AppButtonType.danger:
        return Colors.white;
      case AppButtonType.secondary:
      case AppButtonType.ghost:
        return AppColors.secondary;
    }
  }
}
```

### 7.2 습관 카드

**파일**: `lib/widgets/habits/habit_card.dart`

```dart
import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/habit.dart';

class HabitCard extends StatelessWidget {
  final Habit habit;
  final VoidCallback onTap;
  final VoidCallback onCheck;

  const HabitCard({
    super.key,
    required this.habit,
    required this.onTap,
    required this.onCheck,
  });

  @override
  Widget build(BuildContext context) {
    final isPractice = habit.type == HabitType.practice;

    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: AppColors.text.withOpacity(0.08),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          children: [
            // 체크박스
            GestureDetector(
              onTap: onCheck,
              child: Container(
                width: 32,
                height: 32,
                decoration: BoxDecoration(
                  color: habit.checked
                    ? (isPractice ? AppColors.success : AppColors.error)
                    : Colors.transparent,
                  borderRadius: BorderRadius.circular(8),
                  border: habit.checked
                    ? null
                    : Border.all(color: AppColors.secondary, width: 2),
                ),
                child: habit.checked
                  ? Icon(
                      isPractice ? Icons.check : Icons.close,
                      color: Colors.white,
                      size: 20,
                    )
                  : null,
              ),
            ),
            const SizedBox(width: 16),
            // 습관 정보
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    habit.name,
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                      color: habit.checked && isPractice
                        ? AppColors.textSecondary
                        : AppColors.text,
                      decoration: habit.checked && isPractice
                        ? TextDecoration.lineThrough
                        : null,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      const Text('🔥', style: TextStyle(fontSize: 12)),
                      const SizedBox(width: 4),
                      Text(
                        '${habit.streak}일 연속',
                        style: TextStyle(
                          fontSize: 14,
                          color: AppColors.textSecondary,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            // 연속 일수 뱃지
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
              decoration: BoxDecoration(
                color: AppColors.accent,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                '${habit.streak}일',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: AppColors.secondary,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

---

## 8. 라우팅

**파일**: `lib/config/routes.dart`

```dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../screens/splash/splash_screen.dart';
import '../screens/auth/login_screen.dart';
import '../screens/auth/signup_screen.dart';
import '../screens/home/home_screen.dart';
import '../screens/habits/create_habit_screen.dart';
import '../screens/habits/edit_habit_screen.dart';
import '../screens/habits/habit_detail_screen.dart';
import '../screens/write/write_screen.dart';
import '../screens/profile/profile_screen.dart';

final router = GoRouter(
  initialLocation: '/splash',
  routes: [
    GoRoute(
      path: '/splash',
      builder: (context, state) => const SplashScreen(),
    ),
    GoRoute(
      path: '/login',
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: '/signup',
      builder: (context, state) => const SignupScreen(),
    ),
    GoRoute(
      path: '/home',
      builder: (context, state) => const HomeScreen(),
    ),
    GoRoute(
      path: '/habits/create',
      builder: (context, state) => const CreateHabitScreen(),
    ),
    GoRoute(
      path: '/habits/:id',
      builder: (context, state) {
        final id = state.pathParameters['id']!;
        return HabitDetailScreen(habitId: id);
      },
    ),
    GoRoute(
      path: '/habits/:id/edit',
      builder: (context, state) {
        final id = state.pathParameters['id']!;
        return EditHabitScreen(habitId: id);
      },
    ),
    GoRoute(
      path: '/write',
      builder: (context, state) => const WriteScreen(),
    ),
    GoRoute(
      path: '/profile',
      builder: (context, state) => const ProfileScreen(),
    ),
  ],
);
```

---

## 9. 테마 설정

**파일**: `lib/config/theme.dart`

```dart
import 'package:flutter/material.dart';

class AppColors {
  static const primary = Color(0xFFE8A87C);
  static const secondary = Color(0xFFC98860);
  static const accent = Color(0xFFF5CDB4);
  static const background = Color(0xFFFFF9F5);
  static const surface = Color(0xFFFFFFFF);
  static const text = Color(0xFF4A3228);
  static const textSecondary = Color(0xFF8B7355);
  static const success = Color(0xFF7D9B76);
  static const error = Color(0xFFD4756A);
}

final appTheme = ThemeData(
  useMaterial3: true,
  scaffoldBackgroundColor: AppColors.background,
  colorScheme: ColorScheme.fromSeed(
    seedColor: AppColors.primary,
    primary: AppColors.primary,
    secondary: AppColors.secondary,
    surface: AppColors.surface,
    background: AppColors.background,
    error: AppColors.error,
  ),
  textTheme: const TextTheme(
    headlineLarge: TextStyle(
      fontSize: 32,
      fontWeight: FontWeight.bold,
      color: AppColors.text,
    ),
    headlineMedium: TextStyle(
      fontSize: 24,
      fontWeight: FontWeight.bold,
      color: AppColors.text,
    ),
    titleLarge: TextStyle(
      fontSize: 20,
      fontWeight: FontWeight.w600,
      color: AppColors.text,
    ),
    titleMedium: TextStyle(
      fontSize: 18,
      fontWeight: FontWeight.w600,
      color: AppColors.text,
    ),
    bodyLarge: TextStyle(
      fontSize: 16,
      color: AppColors.text,
    ),
    bodyMedium: TextStyle(
      fontSize: 14,
      color: AppColors.text,
    ),
    bodySmall: TextStyle(
      fontSize: 12,
      color: AppColors.textSecondary,
    ),
  ),
  appBarTheme: const AppBarTheme(
    backgroundColor: AppColors.surface,
    foregroundColor: AppColors.text,
    elevation: 0,
    centerTitle: false,
  ),
  bottomNavigationBarTheme: const BottomNavigationBarThemeData(
    backgroundColor: AppColors.surface,
    selectedItemColor: AppColors.primary,
    unselectedItemColor: AppColors.textSecondary,
  ),
  inputDecorationTheme: InputDecorationTheme(
    filled: true,
    fillColor: AppColors.background,
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: const BorderSide(color: AppColors.accent, width: 2),
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: const BorderSide(color: AppColors.accent, width: 2),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: const BorderSide(color: AppColors.primary, width: 2),
    ),
    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
  ),
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      backgroundColor: AppColors.primary,
      foregroundColor: Colors.white,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
    ),
  ),
);
```

---

## 10. 파일 생성 체크리스트

### 설정
- [ ] `lib/main.dart`
- [ ] `lib/app.dart`
- [ ] `lib/config/theme.dart`
- [ ] `lib/config/routes.dart`
- [ ] `lib/config/constants.dart`

### 모델
- [ ] `lib/models/user.dart`
- [ ] `lib/models/habit.dart`
- [ ] `lib/models/badge.dart`
- [ ] `lib/models/day_record.dart`
- [ ] `lib/models/page.dart`
- [ ] `lib/models/block.dart`

### 서비스
- [ ] `lib/services/api_service.dart`
- [ ] `lib/services/auth_service.dart`
- [ ] `lib/services/habit_service.dart`
- [ ] `lib/services/page_service.dart`
- [ ] `lib/services/badge_service.dart`
- [ ] `lib/services/user_service.dart`

### Provider
- [ ] `lib/providers/auth_provider.dart`
- [ ] `lib/providers/habit_provider.dart`
- [ ] `lib/providers/page_provider.dart`
- [ ] `lib/providers/badge_provider.dart`

### 화면
- [ ] `lib/screens/splash/splash_screen.dart`
- [ ] `lib/screens/auth/login_screen.dart`
- [ ] `lib/screens/auth/signup_screen.dart`
- [ ] `lib/screens/home/home_screen.dart`
- [ ] `lib/screens/habits/habits_screen.dart`
- [ ] `lib/screens/habits/habit_detail_screen.dart`
- [ ] `lib/screens/habits/create_habit_screen.dart`
- [ ] `lib/screens/habits/edit_habit_screen.dart`
- [ ] `lib/screens/calendar/calendar_screen.dart`
- [ ] `lib/screens/badges/badges_screen.dart`
- [ ] `lib/screens/write/write_screen.dart`
- [ ] `lib/screens/profile/profile_screen.dart`

### 위젯
- [ ] `lib/widgets/common/app_button.dart`
- [ ] `lib/widgets/common/app_card.dart`
- [ ] `lib/widgets/common/app_text_field.dart`
- [ ] `lib/widgets/common/loading_indicator.dart`
- [ ] `lib/widgets/common/toast.dart`
- [ ] `lib/widgets/home/ai_feedback_card.dart`
- [ ] `lib/widgets/home/today_cta_card.dart`
- [ ] `lib/widgets/home/achievement_section.dart`
- [ ] `lib/widgets/home/habit_summary.dart`
- [ ] `lib/widgets/habits/habit_card.dart`
- [ ] `lib/widgets/habits/segment_control.dart`
- [ ] `lib/widgets/calendar/calendar_grid.dart`
- [ ] `lib/widgets/calendar/stats_card.dart`
- [ ] `lib/widgets/calendar/date_detail_card.dart`
- [ ] `lib/widgets/badges/badge_card.dart`
- [ ] `lib/widgets/badges/badge_progress_card.dart`

### 유틸리티
- [ ] `lib/utils/date_utils.dart`
- [ ] `lib/utils/habit_stats.dart`
- [ ] `lib/utils/validators.dart`

---

## 11. 웹과의 차이점

| 항목 | 웹 | 모바일 |
|------|-----|--------|
| 네비게이션 | 사이드바 (264px) | 하단 탭바 |
| 글쓰기 | 모달 | 별도 화면 (전체화면) |
| 레이아웃 | 2-3열 그리드 | 1열 리스트 |
| 화면 전환 | 상태 기반 | GoRouter 라우팅 |
| 상태 관리 | useState (React) | Riverpod (Flutter) |

---

## 12. 주의사항

1. **iOS/Android 권한**: 이미지 업로드 시 카메라/갤러리 권한 필요
2. **딥링크**: 추후 알림 클릭 시 특정 화면으로 이동
3. **오프라인**: Hive로 로컬 캐싱 고려
4. **푸시 알림**: Firebase Cloud Messaging 연동 (후순위)
5. **소셜 로그인**: google_sign_in, kakao_flutter_sdk 패키지 사용

---

**문서 버전**: v1.0
**작성일**: 2026-01-19
**작성자**: Claude AI
