# 🗺️ ルーティング (go_router)

## go_router 概要

go_routerは、FlutterアプリのURL-based navigation（URLベースのナビゲーション）を提供するライブラリです。宣言的なルーティング、型安全、深いリンクをサポートし、複雑なナビゲーションを簡潔に記述できます。

## 設計原則

### 1. 責務
- アプリ内のページ間遷移の管理
- 型安全なルーティング
- URL階層の管理
- 深いリンクの処理

### 2. 配置場所
- メインルート設定: `lib/core/router/`
- 個別ルート定義: 各機能ディレクトリ内

## 基本的なルーティング設定

### AppRoute クラス
```dart
// lib/core/router/app_route.dart
import 'package:go_router/go_router.dart';

part 'app_route.g.dart';

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

@TypedGoRoute<FamilyHomeRoute>(
  path: '/family',
  name: 'family_home',
  routes: [
    TypedGoRoute<QuestListRoute>(
      path: '/quests',
      name: 'quest_list',
      routes: [
        TypedGoRoute<QuestDetailRoute>(
          path: '/:questId',
          name: 'quest_detail',
        ),
        TypedGoRoute<CreateQuestRoute>(
          path: '/create',
          name: 'create_quest',
        ),
      ],
    ),
    TypedGoRoute<MemberListRoute>(
      path: '/members',
      name: 'member_list',
      routes: [
        TypedGoRoute<MemberDetailRoute>(
          path: '/:memberId',
          name: 'member_detail',
        ),
      ],
    ),
  ],
)
class FamilyHomeRoute extends GoRouteData {
  const FamilyHomeRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const FamilyHomePage();
  }
}

@TypedGoRoute<QuestListRoute>(
  path: '/family/quests',
  name: 'quest_list',
)
class QuestListRoute extends GoRouteData {
  const QuestListRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const QuestListPage();
  }
}

@TypedGoRoute<QuestDetailRoute>(
  path: '/family/quests/:questId',
  name: 'quest_detail',
)
class QuestDetailRoute extends GoRouteData {
  const QuestDetailRoute({required this.questId});

  final String questId;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return QuestDetailPage(questId: questId);
  }
}

@TypedGoRoute<CreateQuestRoute>(
  path: '/family/quests/create',
  name: 'create_quest',
)
class CreateQuestRoute extends GoRouteData {
  const CreateQuestRoute({this.memberId});

  final String? memberId;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return CreateQuestPage(preselectedMemberId: memberId);
  }
}
```

### Router 設定
```dart
// lib/core/router/app_router.dart
final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/login',
    debugLogDiagnostics: true,
    routes: $appRoutes,
    redirect: (context, state) {
      // 認証チェック
      final isLoggedIn = ref.read(authStateProvider).valueOrNull?.isLoggedIn ?? false;
      final isLoggingIn = state.uri.path == '/login';

      if (!isLoggedIn && !isLoggingIn) {
        return '/login';
      }
      
      if (isLoggedIn && isLoggingIn) {
        return '/family';
      }
      
      return null;
    },
    errorPageBuilder: (context, state) {
      return MaterialPage(
        key: state.pageKey,
        child: ErrorPage(error: state.error),
      );
    },
  );
});
```

## 型安全なナビゲーション

### ルートの使用例
```dart
class QuestListPage extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final quests = ref.watch(questListProvider);
    
    return Scaffold(
      appBar: AppBar(
        title: const Text('クエスト一覧'),
        actions: [
          IconButton(
            onPressed: () {
              // 型安全なナビゲーション
              const CreateQuestRoute().go(context);
            },
            icon: const Icon(Icons.add),
          ),
        ],
      ),
      body: ListView.builder(
        itemCount: quests.length,
        itemBuilder: (context, index) {
          final quest = quests[index];
          return QuestListTile(
            quest: quest,
            onTap: () {
              // パラメータ付きナビゲーション
              QuestDetailRoute(questId: quest.id).go(context);
            },
          );
        },
      ),
    );
  }
}
```

### push と go の使い分け
```dart
class NavigationExamples extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ElevatedButton(
          onPressed: () {
            // 画面を置き換える（戻るボタンなし）
            const FamilyHomeRoute().go(context);
          },
          child: const Text('ホームに移動'),
        ),
        ElevatedButton(
          onPressed: () {
            // 画面をスタックに追加（戻るボタンあり）
            const QuestListRoute().push(context);
          },
          child: const Text('クエスト一覧を開く'),
        ),
        ElevatedButton(
          onPressed: () {
            // 現在のルートを置き換える
            const CreateQuestRoute().pushReplacement(context);
          },
          child: const Text('クエスト作成'),
        ),
      ],
    );
  }
}
```

## クエリパラメータの処理

### クエリパラメータ付きルート
```dart
@TypedGoRoute<QuestListRoute>(
  path: '/family/quests',
  name: 'quest_list',
)
class QuestListRoute extends GoRouteData {
  const QuestListRoute({
    this.status,
    this.assigneeId,
    this.sortBy,
  });

  final String? status;
  final String? assigneeId;
  final String? sortBy;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return QuestListPage(
      initialFilter: QuestFilter(
        status: status != null ? QuestStatus.fromString(status!) : null,
        assigneeId: assigneeId,
        sortBy: sortBy != null ? SortBy.fromString(sortBy!) : null,
      ),
    );
  }
}

// 使用例
class FilterDialog extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('フィルター'),
      content: Column(
        children: [
          // フィルター設定UI
        ],
      ),
      actions: [
        ElevatedButton(
          onPressed: () {
            // フィルター付きでナビゲーション
            QuestListRoute(
              status: 'in_progress',
              assigneeId: 'member_123',
              sortBy: 'created_at',
            ).go(context);
          },
          child: const Text('適用'),
        ),
      ],
    );
  }
}
```

## ネストされたナビゲーション

### ShellRoute を使用した階層ナビゲーション
```dart
// lib/core/router/shell_routes.dart
@TypedShellRoute<FamilyShellRoute>(
  routes: [
    TypedGoRoute<FamilyHomeRoute>(path: '/family'),
    TypedGoRoute<QuestListRoute>(path: '/family/quests'),
    TypedGoRoute<MemberListRoute>(path: '/family/members'),
  ],
)
class FamilyShellRoute extends ShellRouteData {
  const FamilyShellRoute();

  @override
  Widget builder(BuildContext context, GoRouterState state, Widget child) {
    return FamilyShellPage(child: child);
  }
}

// シェルページの実装
class FamilyShellPage extends ConsumerWidget {
  final Widget child;
  
  const FamilyShellPage({required this.child, super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      body: child,
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _calculateSelectedIndex(context),
        onTap: (index) => _onItemTapped(context, index),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'ホーム',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.list),
            label: 'クエスト',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.people),
            label: 'メンバー',
          ),
        ],
      ),
    );
  }

  int _calculateSelectedIndex(BuildContext context) {
    final location = GoRouterState.of(context).uri.path;
    if (location.startsWith('/family/quests')) return 1;
    if (location.startsWith('/family/members')) return 2;
    return 0;
  }

  void _onItemTapped(BuildContext context, int index) {
    switch (index) {
      case 0:
        const FamilyHomeRoute().go(context);
        break;
      case 1:
        const QuestListRoute().go(context);
        break;
      case 2:
        const MemberListRoute().go(context);
        break;
    }
  }
}
```

## Riverpod との統合

### 状態に基づくリダイレクト
```dart
// lib/core/router/router_provider.dart
final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authStateProvider);
  final familyState = ref.watch(currentFamilyProvider);
  
  return GoRouter(
    initialLocation: '/login',
    redirect: (context, state) {
      final isLoggedIn = authState.valueOrNull?.isLoggedIn ?? false;
      final hasFamily = familyState.valueOrNull != null;
      final location = state.uri.path;

      // 認証チェック
      if (!isLoggedIn && !location.startsWith('/login')) {
        return '/login';
      }

      // 家族選択チェック
      if (isLoggedIn && !hasFamily && !location.startsWith('/family/select')) {
        return '/family/select';
      }

      // ログイン後のリダイレクト
      if (isLoggedIn && hasFamily && location == '/login') {
        return '/family';
      }

      return null;
    },
    routes: $appRoutes,
  );
});
```

### ナビゲーションの状態管理
```dart
// lib/shared/state/navigation_state.dart
final navigationHistoryProvider = StateNotifierProvider<NavigationHistoryNotifier, List<String>>((ref) {
  return NavigationHistoryNotifier();
});

class NavigationHistoryNotifier extends StateNotifier<List<String>> {
  NavigationHistoryNotifier() : super([]);

  void addLocation(String location) {
    state = [...state, location];
  }

  void removeLastLocation() {
    if (state.isNotEmpty) {
      state = state.sublist(0, state.length - 1);
    }
  }

  String? get previousLocation {
    return state.length > 1 ? state[state.length - 2] : null;
  }
}
```

## ディープリンクの処理

### URL からのデータ取得
```dart
@TypedGoRoute<QuestDetailRoute>(
  path: '/family/quests/:questId',
  name: 'quest_detail',
)
class QuestDetailRoute extends GoRouteData {
  const QuestDetailRoute({
    required this.questId,
    this.tab,
  });

  final String questId;
  final String? tab;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return QuestDetailPage(
      questId: questId,
      initialTab: tab != null ? TabType.fromString(tab!) : null,
    );
  }
}

// 使用例
class QuestDetailPage extends ConsumerWidget {
  final String questId;
  final TabType? initialTab;

  const QuestDetailPage({
    required this.questId,
    this.initialTab,
    super.key,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final questAsync = ref.watch(questProvider(questId));
    
    return questAsync.when(
      data: (quest) => QuestDetailScreen(
        quest: quest,
        initialTab: initialTab ?? TabType.overview,
      ),
      loading: () => const LoadingScreen(),
      error: (error, stack) => ErrorScreen(error: error),
    );
  }
}
```

## エラーハンドリング

### カスタムエラーページ
```dart
// lib/core/router/error_pages.dart
class ErrorPage extends StatelessWidget {
  final Object? error;
  
  const ErrorPage({this.error, super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('エラー'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.error_outline,
              size: 64,
              color: Colors.red[300],
            ),
            const SizedBox(height: 16),
            Text(
              'ページが見つかりません',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 8),
            Text(
              error?.toString() ?? 'Unknown error',
              style: Theme.of(context).textTheme.bodyMedium,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () {
                const FamilyHomeRoute().go(context);
              },
              child: const Text('ホームに戻る'),
            ),
          ],
        ),
      ),
    );
  }
}
```

### 404 エラーの処理
```dart
final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    routes: $appRoutes,
    errorPageBuilder: (context, state) {
      return MaterialPage(
        key: state.pageKey,
        child: NotFoundPage(requestedPath: state.uri.path),
      );
    },
  );
});

class NotFoundPage extends StatelessWidget {
  final String requestedPath;
  
  const NotFoundPage({required this.requestedPath, super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('ページが見つかりません')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.search_off, size: 64),
            const SizedBox(height: 16),
            Text('要求されたページ: $requestedPath'),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () => const FamilyHomeRoute().go(context),
              child: const Text('ホームに戻る'),
            ),
          ],
        ),
      ),
    );
  }
}
```

## トランジション・アニメーション

### カスタムページトランジション
```dart
@TypedGoRoute<QuestDetailRoute>(
  path: '/family/quests/:questId',
  name: 'quest_detail',
)
class QuestDetailRoute extends GoRouteData {
  const QuestDetailRoute({required this.questId});

  final String questId;

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return CustomTransitionPage(
      key: state.pageKey,
      child: QuestDetailPage(questId: questId),
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        const begin = Offset(1.0, 0.0);
        const end = Offset.zero;
        const curve = Curves.ease;

        var tween = Tween(begin: begin, end: end).chain(
          CurveTween(curve: curve),
        );

        return SlideTransition(
          position: animation.drive(tween),
          child: child,
        );
      },
    );
  }
}
```

## デバッグとテスト

### ナビゲーションのテスト
```dart
void main() {
  group('App Navigation Tests', () {
    testWidgets('should navigate to quest detail', (tester) async {
      await tester.pumpWidget(
        ProviderScope(
          child: MaterialApp.router(
            routerConfig: GoRouter(
              routes: $appRoutes,
              initialLocation: '/family/quests',
            ),
          ),
        ),
      );

      // クエストをタップ
      await tester.tap(find.text('テストクエスト'));
      await tester.pumpAndSettle();

      // 詳細ページに遷移していることを確認
      expect(find.byType(QuestDetailPage), findsOneWidget);
    });

    testWidgets('should redirect to login when not authenticated', (tester) async {
      await tester.pumpWidget(
        ProviderScope(
          overrides: [
            authStateProvider.overrideWith((ref) => 
              const AsyncValue.data(AuthState(isLoggedIn: false))
            ),
          ],
          child: MaterialApp.router(
            routerConfig: GoRouter(
              routes: $appRoutes,
              initialLocation: '/family',
            ),
          ),
        ),
      );

      await tester.pumpAndSettle();

      // ログインページにリダイレクトされていることを確認
      expect(find.byType(LoginPage), findsOneWidget);
    });
  });
}
```

## ベストプラクティス

### 1. 型安全性の確保
- `TypedGoRoute` の使用
- パラメータの型チェック
- コンパイル時エラーの活用

### 2. パフォーマンス最適化
- 適切なページキャッシュ戦略
- 不要な再描画の防止
- 遅延ロードの活用

### 3. メンテナンス性
- ルートの論理的な分割
- 一貫した命名規則
- 適切なコメントの追加

### 4. ユーザビリティ
- 直感的なナビゲーション
- 適切な戻るボタンの動作
- エラー時の適切な案内