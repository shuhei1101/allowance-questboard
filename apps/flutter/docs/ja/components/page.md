# 📱 Page（画面）

## Page コンポーネントの概要

Pageは、画面遷移時に最初に表示されるコンポーネントです。必ず`Scaffold`を含み、画面全体の土台となる役割を持ちます。

## 設計原則

### 1. 責務
- 画面全体のレイアウト構成
- `Scaffold`による基本的な画面構造の提供
- AppBar、BottomNavigationBar、FloatingActionButtonなどの配置
- 画面レベルの状態管理

### 2. 命名規則
- ファイル名: `{機能名}_page.dart`
- クラス名: `{機能名}Page`
- 例: `LoginPage`, `QuestListPage`, `MemberProfilePage`

### 3. 配置場所
- 各機能ディレクトリ内の`page/`配下
- 例: `lib/login/page/login_page.dart`

## Page の基本構造

```dart
class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('ログイン'),
      ),
      body: const LoginScreen(), // Screen コンポーネントを配置
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // アクション処理
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

## go_router との連携

### ルート定義
```dart
@TypedGoRoute<LoginRoute>(
  path: '/login',
  name: 'login',
)
class LoginRoute extends GoRouteData {
  const LoginRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const LoginPage();
  }
}
```

### 画面遷移の実装
```dart
class LoginPage extends StatelessWidget {
  void _navigateToHome(BuildContext context) {
    // 型安全な画面遷移
    HomeRoute().go(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: LoginScreen(
        onLoginSuccess: () => _navigateToHome(context),
      ),
    );
  }
}
```

## 状態管理の統合

### Riverpod Provider の使用
```dart
class QuestListPage extends ConsumerWidget {
  const QuestListPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final questList = ref.watch(questListProvider);
    
    return Scaffold(
      appBar: AppBar(
        title: const Text('クエスト一覧'),
        actions: [
          IconButton(
            onPressed: () => ref.refresh(questListProvider),
            icon: const Icon(Icons.refresh),
          ),
        ],
      ),
      body: questList.when(
        data: (quests) => QuestListScreen(quests: quests),
        loading: () => const LoadingScreen(),
        error: (error, stack) => ErrorScreen(error: error),
      ),
    );
  }
}
```

## エラーハンドリング

### エラー表示の責務
```dart
class QuestDetailPage extends ConsumerWidget {
  final String questId;
  
  const QuestDetailPage({required this.questId, super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final questAsync = ref.watch(questDetailProvider(questId));
    
    return Scaffold(
      appBar: AppBar(title: const Text('クエスト詳細')),
      body: questAsync.when(
        data: (quest) => QuestDetailScreen(quest: quest),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, stack) => ErrorScreen(
          error: error,
          onRetry: () => ref.refresh(questDetailProvider(questId)),
        ),
      ),
    );
  }
}
```

## Page の種類と特徴

### 1. 🏠 メインページ
- **用途**: アプリのメイン画面
- **特徴**: BottomNavigationBarを持つ
- **例**: `FamilyHomePage`

### 2. 📝 フォームページ
- **用途**: データ入力画面
- **特徴**: フォームバリデーション、保存処理
- **例**: `CreateQuestPage`

### 3. 📋 リストページ
- **用途**: データ一覧表示
- **特徴**: 検索、フィルタリング、ページネーション
- **例**: `QuestListPage`

### 4. 🔍 詳細ページ
- **用途**: 個別データの詳細表示
- **特徴**: 編集、削除アクション
- **例**: `QuestDetailPage`

### 5. ⚙️ 設定ページ
- **用途**: アプリ設定画面
- **特徴**: 設定値の変更、永続化
- **例**: `SettingsPage`

## ベストプラクティス

### 1. 単一責任の原則
- 1つのPageは1つの画面の責務のみを持つ
- 複雑な画面は複数のScreenコンポーネントに分割

### 2. 状態の適切な管理
- 画面レベルの状態はProviderで管理
- 一時的な状態は`useState`や`StatefulWidget`を使用

### 3. パフォーマンス最適化
- 不要な再描画を避けるためのWidget分割
- 重い処理は非同期で実行

### 4. アクセシビリティ
- 適切な`Semantics`の設定
- キーボードナビゲーションの考慮

## テストの観点

### Widget テスト
```dart
void main() {
  testWidgets('LoginPage should display login form', (tester) async {
    await tester.pumpWidget(
      MaterialApp(home: LoginPage()),
    );
    
    expect(find.byType(LoginScreen), findsOneWidget);
    expect(find.text('ログイン'), findsOneWidget);
  });
}
```

### 統合テスト
```dart
void main() {
  group('QuestListPage integration test', () {
    testWidgets('should show quest list when data is loaded', (tester) async {
      // Provider のモックを設定
      await tester.pumpWidget(
        ProviderScope(
          overrides: [
            questListProvider.overrideWith((ref) async => mockQuestList),
          ],
          child: MaterialApp(home: QuestListPage()),
        ),
      );
      
      await tester.pumpAndSettle();
      
      expect(find.byType(QuestListScreen), findsOneWidget);
    });
  });
}
```