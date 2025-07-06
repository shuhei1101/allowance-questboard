# 🎨 テーマシステム

## テーマシステムの概要

Flutterアプリのテーマシステムは、アプリ全体の一貫した見た目とユーザー体験を提供するための仕組みです。色、フォント、コンポーネントのスタイルなどを統一的に管理します。

## 設計原則

### 1. 責務
- アプリ全体の視覚的な統一感の提供
- ダークモード・ライトモードの対応
- カスタムカラーパレットの管理
- コンポーネントの共通スタイル定義

### 2. 配置場所
- メインテーマ: `lib/shared/theme/`
- カスタムテーマ: `lib/shared/theme/custom/`

## 基本的なテーマ構造

### AppThemes クラス
```dart
// lib/shared/theme/app_themes.dart
class AppThemes {
  static ThemeData get lightTheme => ThemeData(
    useMaterial3: true,
    colorScheme: lightColorScheme,
    fontFamily: 'NotoSansJP',
    textTheme: textTheme,
    appBarTheme: lightAppBarTheme,
    elevatedButtonTheme: elevatedButtonTheme,
    cardTheme: cardTheme,
    inputDecorationTheme: inputDecorationTheme,
  );

  static ThemeData get darkTheme => ThemeData(
    useMaterial3: true,
    colorScheme: darkColorScheme,
    fontFamily: 'NotoSansJP',
    textTheme: textTheme,
    appBarTheme: darkAppBarTheme,
    elevatedButtonTheme: elevatedButtonTheme,
    cardTheme: cardTheme,
    inputDecorationTheme: inputDecorationTheme,
  );

  // 共通テーマ（現在使用中）
  static ThemeData get commonTheme => lightTheme;
}
```

### カラーパレット
```dart
// lib/shared/theme/app_colors.dart
class AppColors {
  // プライマリカラー
  static const Color primary = Color(0xFF4CAF50);
  static const Color primaryVariant = Color(0xFF2E7D32);
  static const Color onPrimary = Colors.white;

  // セカンダリカラー
  static const Color secondary = Color(0xFFFF9800);
  static const Color secondaryVariant = Color(0xFFE65100);
  static const Color onSecondary = Colors.white;

  // サーフェスカラー
  static const Color surface = Colors.white;
  static const Color onSurface = Color(0xFF1C1C1C);

  // バックグラウンドカラー
  static const Color background = Color(0xFFF5F5F5);
  static const Color onBackground = Color(0xFF1C1C1C);

  // エラーカラー
  static const Color error = Color(0xFFD32F2F);
  static const Color onError = Colors.white;

  // クエスト状態別カラー
  static const Color questNotStarted = Color(0xFF9E9E9E);
  static const Color questInProgress = Color(0xFF2196F3);
  static const Color questCompleted = Color(0xFF4CAF50);
  static const Color questFailed = Color(0xFFD32F2F);

  // メンバーロール別カラー
  static const Color parentRole = Color(0xFF673AB7);
  static const Color childRole = Color(0xFFFF5722);

  // ポイント・報酬関連カラー
  static const Color reward = Color(0xFFFFD700);
  static const Color points = Color(0xFFFF9800);
}

// カラースキーム定義
const ColorScheme lightColorScheme = ColorScheme(
  brightness: Brightness.light,
  primary: AppColors.primary,
  onPrimary: AppColors.onPrimary,
  secondary: AppColors.secondary,
  onSecondary: AppColors.onSecondary,
  error: AppColors.error,
  onError: AppColors.onError,
  surface: AppColors.surface,
  onSurface: AppColors.onSurface,
  background: AppColors.background,
  onBackground: AppColors.onBackground,
);

const ColorScheme darkColorScheme = ColorScheme(
  brightness: Brightness.dark,
  primary: Color(0xFF81C784),
  onPrimary: Color(0xFF1B5E20),
  secondary: Color(0xFFFFB74D),
  onSecondary: Color(0xFFE65100),
  error: Color(0xFFEF5350),
  onError: Color(0xFFFFFFFF),
  surface: Color(0xFF121212),
  onSurface: Color(0xFFE0E0E0),
  background: Color(0xFF121212),
  onBackground: Color(0xFFE0E0E0),
);
```

### テキストテーマ
```dart
// lib/shared/theme/text_themes.dart
const TextTheme textTheme = TextTheme(
  // ヘッドライン
  headlineLarge: TextStyle(
    fontSize: 32,
    fontWeight: FontWeight.bold,
    letterSpacing: -0.5,
    height: 1.2,
  ),
  headlineMedium: TextStyle(
    fontSize: 28,
    fontWeight: FontWeight.bold,
    letterSpacing: -0.5,
    height: 1.3,
  ),
  headlineSmall: TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.w600,
    letterSpacing: 0,
    height: 1.3,
  ),
  
  // タイトル
  titleLarge: TextStyle(
    fontSize: 22,
    fontWeight: FontWeight.w600,
    letterSpacing: 0,
    height: 1.4,
  ),
  titleMedium: TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.1,
    height: 1.5,
  ),
  titleSmall: TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.1,
    height: 1.4,
  ),
  
  // ボディ
  bodyLarge: TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.normal,
    letterSpacing: 0.5,
    height: 1.5,
  ),
  bodyMedium: TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.normal,
    letterSpacing: 0.25,
    height: 1.4,
  ),
  bodySmall: TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.normal,
    letterSpacing: 0.4,
    height: 1.3,
  ),
  
  // ラベル
  labelLarge: TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.w500,
    letterSpacing: 0.1,
    height: 1.4,
  ),
  labelMedium: TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.w500,
    letterSpacing: 0.5,
    height: 1.3,
  ),
  labelSmall: TextStyle(
    fontSize: 11,
    fontWeight: FontWeight.w500,
    letterSpacing: 0.5,
    height: 1.2,
  ),
);
```

### コンポーネントテーマ

#### AppBarテーマ
```dart
// lib/shared/theme/component_themes.dart
const AppBarTheme lightAppBarTheme = AppBarTheme(
  elevation: 0,
  centerTitle: true,
  backgroundColor: AppColors.primary,
  foregroundColor: AppColors.onPrimary,
  titleTextStyle: TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.w600,
    color: AppColors.onPrimary,
  ),
  iconTheme: IconThemeData(
    color: AppColors.onPrimary,
    size: 24,
  ),
);

const AppBarTheme darkAppBarTheme = AppBarTheme(
  elevation: 0,
  centerTitle: true,
  backgroundColor: Color(0xFF1F1F1F),
  foregroundColor: Color(0xFFE0E0E0),
  titleTextStyle: TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.w600,
    color: Color(0xFFE0E0E0),
  ),
  iconTheme: IconThemeData(
    color: Color(0xFFE0E0E0),
    size: 24,
  ),
);
```

#### ボタンテーマ
```dart
final ElevatedButtonThemeData elevatedButtonTheme = ElevatedButtonThemeData(
  style: ElevatedButton.styleFrom(
    elevation: 2,
    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(8),
    ),
    textStyle: const TextStyle(
      fontSize: 16,
      fontWeight: FontWeight.w600,
      letterSpacing: 0.5,
    ),
  ),
);

final OutlinedButtonThemeData outlinedButtonTheme = OutlinedButtonThemeData(
  style: OutlinedButton.styleFrom(
    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(8),
    ),
    side: const BorderSide(width: 1.5),
    textStyle: const TextStyle(
      fontSize: 16,
      fontWeight: FontWeight.w600,
      letterSpacing: 0.5,
    ),
  ),
);
```

#### カードテーマ
```dart
const CardTheme cardTheme = CardTheme(
  elevation: 2,
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.all(Radius.circular(12)),
  ),
  margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
);
```

#### 入力フィールドテーマ
```dart
final InputDecorationTheme inputDecorationTheme = InputDecorationTheme(
  border: OutlineInputBorder(
    borderRadius: BorderRadius.circular(8),
    borderSide: const BorderSide(color: Color(0xFFE0E0E0)),
  ),
  enabledBorder: OutlineInputBorder(
    borderRadius: BorderRadius.circular(8),
    borderSide: const BorderSide(color: Color(0xFFE0E0E0)),
  ),
  focusedBorder: OutlineInputBorder(
    borderRadius: BorderRadius.circular(8),
    borderSide: const BorderSide(color: AppColors.primary, width: 2),
  ),
  errorBorder: OutlineInputBorder(
    borderRadius: BorderRadius.circular(8),
    borderSide: const BorderSide(color: AppColors.error),
  ),
  contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
  filled: true,
  fillColor: Colors.white,
);
```

## カスタムテーマの活用

### クエスト専用テーマ
```dart
// lib/shared/theme/custom/quest_theme.dart
class QuestTheme {
  static const Map<QuestStatus, Color> statusColors = {
    QuestStatus.notStarted: AppColors.questNotStarted,
    QuestStatus.inProgress: AppColors.questInProgress,
    QuestStatus.completed: AppColors.questCompleted,
    QuestStatus.failed: AppColors.questFailed,
  };

  static const Map<QuestPriority, Color> priorityColors = {
    QuestPriority.low: Color(0xFF4CAF50),
    QuestPriority.medium: Color(0xFFFF9800),
    QuestPriority.high: Color(0xFFD32F2F),
  };

  static Color getStatusColor(QuestStatus status) {
    return statusColors[status] ?? AppColors.questNotStarted;
  }

  static Color getPriorityColor(QuestPriority priority) {
    return priorityColors[priority] ?? AppColors.primary;
  }

  static BoxDecoration getQuestCardDecoration(QuestStatus status, {bool isSelected = false}) {
    return BoxDecoration(
      color: isSelected ? getStatusColor(status).withOpacity(0.1) : Colors.white,
      border: Border.all(
        color: isSelected ? getStatusColor(status) : Colors.grey.shade300,
        width: isSelected ? 2 : 1,
      ),
      borderRadius: BorderRadius.circular(12),
      boxShadow: [
        BoxShadow(
          color: Colors.black.withOpacity(0.05),
          blurRadius: 4,
          offset: const Offset(0, 2),
        ),
      ],
    );
  }
}
```

### メンバー専用テーマ
```dart
// lib/shared/theme/custom/member_theme.dart
class MemberTheme {
  static const Map<MemberRole, Color> roleColors = {
    MemberRole.parent: AppColors.parentRole,
    MemberRole.child: AppColors.childRole,
  };

  static Color getRoleColor(MemberRole role) {
    return roleColors[role] ?? AppColors.primary;
  }

  static Widget getRoleIcon(MemberRole role, {double size = 24}) {
    IconData iconData;
    Color color = getRoleColor(role);

    switch (role) {
      case MemberRole.parent:
        iconData = Icons.supervisor_account;
        break;
      case MemberRole.child:
        iconData = Icons.child_care;
        break;
    }

    return Icon(
      iconData,
      size: size,
      color: color,
    );
  }
}
```

## テーマの使用方法

### Context からのテーマ取得
```dart
class ExampleWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final textTheme = theme.textTheme;

    return Container(
      color: colorScheme.surface,
      child: Text(
        'テーマを適用したテキスト',
        style: textTheme.titleMedium?.copyWith(
          color: colorScheme.onSurface,
        ),
      ),
    );
  }
}
```

### カスタムテーマの適用
```dart
class QuestCard extends StatelessWidget {
  final Quest quest;
  final bool isSelected;

  const QuestCard({
    required this.quest,
    this.isSelected = false,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: QuestTheme.getQuestCardDecoration(
        quest.status,
        isSelected: isSelected,
      ),
      child: Column(
        children: [
          Text(
            quest.title,
            style: Theme.of(context).textTheme.titleMedium,
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: QuestTheme.getStatusColor(quest.status),
              borderRadius: BorderRadius.circular(4),
            ),
            child: Text(
              quest.status.displayName,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 12,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
```

## ダークモード対応

### テーマ切り替えの実装
```dart
// lib/shared/state/theme_state.dart
final themeProvider = StateNotifierProvider<ThemeNotifier, ThemeMode>((ref) {
  return ThemeNotifier();
});

class ThemeNotifier extends StateNotifier<ThemeMode> {
  ThemeNotifier() : super(ThemeMode.system);

  void setLightMode() {
    state = ThemeMode.light;
  }

  void setDarkMode() {
    state = ThemeMode.dark;
  }

  void setSystemMode() {
    state = ThemeMode.system;
  }

  void toggleMode() {
    switch (state) {
      case ThemeMode.light:
        setDarkMode();
        break;
      case ThemeMode.dark:
        setLightMode();
        break;
      case ThemeMode.system:
        setLightMode();
        break;
    }
  }
}
```

### MaterialApp での適用
```dart
class MyApp extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeProvider);

    return MaterialApp(
      title: 'Allowance QuestBoard',
      theme: AppThemes.lightTheme,
      darkTheme: AppThemes.darkTheme,
      themeMode: themeMode,
      home: const HomePage(),
    );
  }
}
```

## レスポンシブデザインの考慮

### 画面サイズに応じたスタイル調整
```dart
class ResponsiveTextStyle {
  static TextStyle getHeadlineStyle(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final baseStyle = Theme.of(context).textTheme.headlineMedium!;

    if (screenWidth > 600) {
      // タブレット・デスクトップ
      return baseStyle.copyWith(fontSize: 32);
    } else {
      // スマートフォン
      return baseStyle.copyWith(fontSize: 24);
    }
  }

  static EdgeInsets getScreenPadding(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;

    if (screenWidth > 600) {
      return const EdgeInsets.all(24);
    } else {
      return const EdgeInsets.all(16);
    }
  }
}
```

## ベストプラクティス

### 1. 一貫性の保持
- すべてのコンポーネントで統一されたテーマを使用
- カスタムカラーよりもテーマカラーを優先

### 2. アクセシビリティ
- 十分なコントラスト比の確保
- 色だけに依存しない情報伝達

### 3. パフォーマンス
- テーマの頻繁な変更を避ける
- 重いカスタムテーマの最適化

### 4. 保守性
- テーマ関連コードの適切な分離
- 命名規則の統一