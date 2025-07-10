# 🔄 状態管理 (Riverpod)

## Riverpod 概要

RiverpodはFlutterアプリケーションの状態管理ライブラリです。型安全で、テストしやすく、依存関係の注入も提供する、Providerパッケージの進化版です。

## 設計原則

### 1. 責務
- アプリケーション全体の状態管理
- 依存関係の注入と管理
- 非同期処理の統合
- テスト容易性の提供

### 2. 配置場所
- グローバル状態: `lib/shared/state/`
- 機能固有状態: 各機能ディレクトリ内

## Provider の種類と用途

### 1. Provider - 不変値の提供
```dart
// lib/shared/state/app_config.dart
final appConfigProvider = Provider<AppConfig>((ref) {
  return const AppConfig(
    apiBaseUrl: 'https://api.example.com',
    version: '1.0.0',
  );
});

// 使用例
class ApiService {
  ApiService(this.config);
  final AppConfig config;
  
  String get baseUrl => config.apiBaseUrl;
}

final apiServiceProvider = Provider<ApiService>((ref) {
  final config = ref.read(appConfigProvider);
  return ApiService(config);
});
```

### 2. StateProvider - 単純な状態の管理
```dart
// lib/shared/state/ui_state.dart
final selectedTabProvider = StateProvider<int>((ref) => 0);

final isLoadingProvider = StateProvider<bool>((ref) => false);

// 使用例
class HomePage extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final selectedTab = ref.watch(selectedTabProvider);
    
    return BottomNavigationBar(
      currentIndex: selectedTab,
      onTap: (index) {
        ref.read(selectedTabProvider.notifier).state = index;
      },
      items: const [
        BottomNavigationBarItem(icon: Icon(Icons.home), label: 'ホーム'),
        BottomNavigationBarItem(icon: Icon(Icons.list), label: 'クエスト'),
      ],
    );
  }
}
```

### 3. StateNotifierProvider - 複雑な状態の管理
```dart
// lib/quest/state/quest_list_state.dart
@freezed
class QuestListState with _$QuestListState {
  const factory QuestListState({
    @Default([]) List<Quest> quests,
    @Default(false) bool isLoading,
    @Default(null) String? errorMessage,
    @Default(QuestFilter()) QuestFilter filter,
  }) = _QuestListState;
}

class QuestListNotifier extends StateNotifier<QuestListState> {
  QuestListNotifier(this._questRepository) : super(const QuestListState());

  final QuestRepository _questRepository;

  Future<void> loadQuests() async {
    state = state.copyWith(isLoading: true, errorMessage: null);
    
    try {
      final quests = await _questRepository.findAll();
      state = state.copyWith(
        quests: quests,
        isLoading: false,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        errorMessage: e.toString(),
      );
    }
  }

  void addQuest(Quest quest) {
    state = state.copyWith(
      quests: [...state.quests, quest],
    );
  }

  void updateQuest(Quest updatedQuest) {
    state = state.copyWith(
      quests: state.quests.map((quest) {
        return quest.id == updatedQuest.id ? updatedQuest : quest;
      }).toList(),
    );
  }

  void removeQuest(String questId) {
    state = state.copyWith(
      quests: state.quests.where((quest) => quest.id != questId).toList(),
    );
  }

  void applyFilter(QuestFilter filter) {
    state = state.copyWith(filter: filter);
  }
}

final questListProvider = StateNotifierProvider<QuestListNotifier, QuestListState>((ref) {
  final repository = ref.read(questRepositoryProvider);
  return QuestListNotifier(repository);
});
```

### 4. FutureProvider - 非同期処理の結果
```dart
// lib/member/state/member_providers.dart
final memberListProvider = FutureProvider<List<Member>>((ref) async {
  final repository = ref.read(memberRepositoryProvider);
  return repository.findAll();
});

final memberProvider = FutureProvider.family<Member, String>((ref, memberId) async {
  final repository = ref.read(memberRepositoryProvider);
  return repository.findById(memberId);
});

// 使用例
class MemberListScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final membersAsync = ref.watch(memberListProvider);
    
    return membersAsync.when(
      data: (members) => ListView.builder(
        itemCount: members.length,
        itemBuilder: (context, index) {
          return MemberListTile(member: members[index]);
        },
      ),
      loading: () => const CircularProgressIndicator(),
      error: (error, stack) => ErrorWidget(error),
    );
  }
}
```

### 5. StreamProvider - リアルタイムデータの監視
```dart
// lib/family/state/family_providers.dart
final familyUpdatesProvider = StreamProvider<FamilyUpdate>((ref) {
  final familyId = ref.watch(currentFamilyIdProvider);
  if (familyId == null) {
    return const Stream.empty();
  }
  
  final repository = ref.read(familyRepositoryProvider);
  return repository.watchUpdates(familyId);
});

// 使用例
class FamilyDashboard extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final updatesAsync = ref.watch(familyUpdatesProvider);
    
    return updatesAsync.when(
      data: (update) => Column(
        children: [
          Text('最新更新: ${update.timestamp}'),
          Text('更新内容: ${update.content}'),
        ],
      ),
      loading: () => const Text('更新を監視中...'),
      error: (error, stack) => Text('エラー: $error'),
    );
  }
}
```

## 依存関係の注入

### Repository パターンとの統合
```dart
// lib/domain/repository/quest_repository.dart
abstract class QuestRepository {
  Future<List<Quest>> findAll();
  Future<Quest> findById(String id);
  Future<void> save(Quest quest);
  Future<void> delete(String id);
}

// lib/infrastructure/repository/firestore_quest_repository.dart
class FirestoreQuestRepository implements QuestRepository {
  FirestoreQuestRepository(this._firestore);
  final FirebaseFirestore _firestore;

  @override
  Future<List<Quest>> findAll() async {
    final snapshot = await _firestore.collection('quests').get();
    return snapshot.docs.map((doc) => Quest.fromFirestore(doc)).toList();
  }

  // その他のメソッドの実装...
}

// lib/shared/state/repository_providers.dart
final questRepositoryProvider = Provider<QuestRepository>((ref) {
  final firestore = ref.read(firestoreProvider);
  return FirestoreQuestRepository(firestore);
});

final firestoreProvider = Provider<FirebaseFirestore>((ref) {
  return FirebaseFirestore.instance;
});
```

### Use Case パターンとの統合
```dart
// lib/application/quest/create_quest_use_case.dart
class CreateQuestUseCase {
  CreateQuestUseCase(this._questRepository, this._memberRepository);
  
  final QuestRepository _questRepository;
  final MemberRepository _memberRepository;

  Future<Quest> execute(CreateQuestCommand command) async {
    // バリデーション
    final assignee = await _memberRepository.findById(command.assigneeId);
    if (assignee == null) {
      throw MemberNotFoundException(command.assigneeId);
    }

    // クエスト作成
    final quest = Quest(
      id: QuestId.generate(),
      title: command.title,
      description: command.description,
      assigneeId: command.assigneeId,
      reward: command.reward,
      createdAt: DateTime.now(),
    );

    await _questRepository.save(quest);
    return quest;
  }
}

final createQuestUseCaseProvider = Provider<CreateQuestUseCase>((ref) {
  final questRepository = ref.read(questRepositoryProvider);
  final memberRepository = ref.read(memberRepositoryProvider);
  return CreateQuestUseCase(questRepository, memberRepository);
});
```

## 状態の永続化

### SharedPreferences との統合
```dart
// lib/shared/state/settings_state.dart
final settingsProvider = StateNotifierProvider<SettingsNotifier, AppSettings>((ref) {
  return SettingsNotifier();
});

class SettingsNotifier extends StateNotifier<AppSettings> {
  SettingsNotifier() : super(const AppSettings()) {
    _loadSettings();
  }

  Future<void> _loadSettings() async {
    final prefs = await SharedPreferences.getInstance();
    
    state = AppSettings(
      isDarkMode: prefs.getBool('isDarkMode') ?? false,
      language: prefs.getString('language') ?? 'ja',
      notificationsEnabled: prefs.getBool('notificationsEnabled') ?? true,
    );
  }

  Future<void> updateDarkMode(bool isDarkMode) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('isDarkMode', isDarkMode);
    
    state = state.copyWith(isDarkMode: isDarkMode);
  }

  Future<void> updateLanguage(String language) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('language', language);
    
    state = state.copyWith(language: language);
  }
}
```

## エラーハンドリング

### グローバルエラーハンドリング
```dart
// lib/shared/state/error_state.dart
final errorProvider = StateNotifierProvider<ErrorNotifier, ErrorState>((ref) {
  return ErrorNotifier();
});

@freezed
class ErrorState with _$ErrorState {
  const factory ErrorState({
    @Default(null) AppError? currentError,
    @Default([]) List<AppError> errorHistory,
  }) = _ErrorState;
}

class ErrorNotifier extends StateNotifier<ErrorState> {
  ErrorNotifier() : super(const ErrorState());

  void reportError(AppError error) {
    state = state.copyWith(
      currentError: error,
      errorHistory: [...state.errorHistory, error],
    );
  }

  void clearCurrentError() {
    state = state.copyWith(currentError: null);
  }

  void clearAllErrors() {
    state = const ErrorState();
  }
}

// 使用例
class QuestService {
  Future<void> createQuest(CreateQuestCommand command) async {
    try {
      final useCase = ref.read(createQuestUseCaseProvider);
      await useCase.execute(command);
    } catch (e) {
      final errorNotifier = ref.read(errorProvider.notifier);
      errorNotifier.reportError(AppError.fromException(e));
      rethrow;
    }
  }
}
```

## パフォーマンス最適化

### 適切な監視スコープ
```dart
class QuestCard extends ConsumerWidget {
  final String questId;
  
  const QuestCard({required this.questId, super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // 特定のクエストのみを監視
    final questAsync = ref.watch(questProvider(questId));
    
    return questAsync.when(
      data: (quest) => Card(
        child: ListTile(
          title: Text(quest.title),
          subtitle: Text(quest.description),
          // 必要な部分のみ再描画
          trailing: Consumer(
            builder: (context, ref, child) {
              final isCompleted = ref.watch(
                questProvider(questId).select((async) => 
                  async.valueOrNull?.isCompleted ?? false
                ),
              );
              
              return Icon(
                isCompleted ? Icons.check_circle : Icons.circle,
                color: isCompleted ? Colors.green : Colors.grey,
              );
            },
          ),
        ),
      ),
      loading: () => const SkeletonCard(),
      error: (error, stack) => ErrorCard(error: error),
    );
  }
}
```

### キャッシュとリフレッシュ
```dart
// lib/shared/state/cache_providers.dart
final questCacheProvider = FutureProvider.autoDispose.family<Quest, String>((ref, questId) async {
  // 30秒間キャッシュを保持
  ref.keepAlive();
  
  Timer(const Duration(seconds: 30), () {
    ref.invalidateSelf();
  });
  
  final repository = ref.read(questRepositoryProvider);
  return repository.findById(questId);
});

// 手動リフレッシュ
class QuestDetailPage extends ConsumerWidget {
  final String questId;
  
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final questAsync = ref.watch(questCacheProvider(questId));
    
    return Scaffold(
      appBar: AppBar(
        actions: [
          IconButton(
            onPressed: () {
              ref.refresh(questCacheProvider(questId));
            },
            icon: const Icon(Icons.refresh),
          ),
        ],
      ),
      body: questAsync.when(
        data: (quest) => QuestDetailScreen(quest: quest),
        loading: () => const LoadingScreen(),
        error: (error, stack) => ErrorScreen(error: error),
      ),
    );
  }
}
```

## テストとの統合

### Provider のオーバーライド
```dart
void main() {
  group('QuestListScreen', () {
    testWidgets('should display quest list', (tester) async {
      final mockQuests = [
        const Quest(id: '1', title: 'テストクエスト1'),
        const Quest(id: '2', title: 'テストクエスト2'),
      ];

      await tester.pumpWidget(
        ProviderScope(
          overrides: [
            questListProvider.overrideWith((ref) => 
              QuestListNotifier(MockQuestRepository(mockQuests))
            ),
          ],
          child: const MaterialApp(
            home: QuestListScreen(),
          ),
        ),
      );

      expect(find.text('テストクエスト1'), findsOneWidget);
      expect(find.text('テストクエスト2'), findsOneWidget);
    });
  });
}
```

## ベストプラクティス

### 1. 適切なProvider の選択
- 不変値 → Provider
- 単純な状態 → StateProvider
- 複雑な状態 → StateNotifierProvider
- 非同期処理 → FutureProvider
- リアルタイム → StreamProvider

### 2. 状態の正規化
- データの重複を避ける
- 正規化されたデータ構造の使用
- 関連データの適切な管理

### 3. メモリリーク対策
- autoDispose の活用
- 適切なライフサイクル管理
- 不要なProvider の無効化

### 4. デバッグとツール
- ProviderObserver の使用
- 状態の変更履歴の追跡
- デバッグ情報の適切な出力