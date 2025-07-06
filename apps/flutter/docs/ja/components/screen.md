# 🖼️ Screen（画面要素）

## Screen の概要

Screenは、PageよりもPageよりも細かいが、Componentよりも大きいコンポーネントです。基本的に`Scaffold`を含まず、Page内で使用される画面の主要な内容部分を担当します。

## 設計原則

### 1. 責務
- Page内の主要なコンテンツエリアの実装
- 複数のComponentを組み合わせた画面構成
- 画面固有のビジネスロジックとUIの連携
- Scaffoldは含まない（PageからScaffoldのbodyとして使用される）

### 2. 命名規則
- ファイル名: `{機能名}_screen.dart`
- クラス名: `{機能名}Screen`
- 例: `LoginScreen`, `QuestListScreen`, `MemberProfileScreen`

### 3. 配置場所
- 各機能ディレクトリ内の`screen/`配下
- 例: `lib/quest/screen/quest_list_screen.dart`

## Screen の基本構造

```dart
class QuestListScreen extends ConsumerWidget {
  final List<Quest> quests;
  final VoidCallback? onRefresh;
  final Function(Quest)? onQuestTap;
  
  const QuestListScreen({
    required this.quests,
    this.onRefresh,
    this.onQuestTap,
    super.key,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    if (quests.isEmpty) {
      return const EmptyQuestScreen();
    }
    
    return RefreshIndicator(
      onRefresh: () async {
        onRefresh?.call();
      },
      child: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: quests.length,
        itemBuilder: (context, index) {
          final quest = quests[index];
          return Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: QuestCardComponent(
              quest: quest,
              onTap: () => onQuestTap?.call(quest),
            ),
          );
        },
      ),
    );
  }
}
```

## Screen の種類と特徴

### 1. 📋 リスト表示Screen
**用途**: データの一覧表示
```dart
class MemberListScreen extends ConsumerWidget {
  final List<Member> members;
  final Function(Member)? onMemberSelect;
  final bool isSelectionMode;
  
  const MemberListScreen({
    required this.members,
    this.onMemberSelect,
    this.isSelectionMode = false,
    super.key,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Column(
      children: [
        if (isSelectionMode)
          Container(
            padding: const EdgeInsets.all(16),
            color: Theme.of(context).primaryColor.withOpacity(0.1),
            child: Row(
              children: [
                const Icon(Icons.info_outline),
                const SizedBox(width: 8),
                Text(
                  'メンバーを選択してください',
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              ],
            ),
          ),
        Expanded(
          child: ListView.separated(
            itemCount: members.length,
            separatorBuilder: (context, index) => const Divider(height: 1),
            itemBuilder: (context, index) {
              final member = members[index];
              return MemberListTile(
                member: member,
                onTap: () => onMemberSelect?.call(member),
                showSelection: isSelectionMode,
              );
            },
          ),
        ),
      ],
    );
  }
}
```

### 2. 📝 フォーム入力Screen
**用途**: データ入力・編集
```dart
class CreateQuestScreen extends ConsumerStatefulWidget {
  final Quest? initialQuest;
  final Function(Quest)? onSave;
  
  const CreateQuestScreen({
    this.initialQuest,
    this.onSave,
    super.key,
  });

  @override
  ConsumerState<CreateQuestScreen> createState() => _CreateQuestScreenState();
}

class _CreateQuestScreenState extends ConsumerState<CreateQuestScreen> {
  final _formKey = GlobalKey<FormState>();
  late final TextEditingController _titleController;
  late final TextEditingController _descriptionController;
  late final TextEditingController _rewardController;
  
  @override
  void initState() {
    super.initState();
    _titleController = TextEditingController(text: widget.initialQuest?.title);
    _descriptionController = TextEditingController(text: widget.initialQuest?.description);
    _rewardController = TextEditingController(text: widget.initialQuest?.reward.amount.toString());
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            CustomTextFormField(
              label: 'クエストタイトル',
              controller: _titleController,
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'タイトルを入力してください';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),
            CustomTextFormField(
              label: '説明',
              controller: _descriptionController,
              maxLines: 3,
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return '説明を入力してください';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),
            CustomTextFormField(
              label: '報酬金額',
              controller: _rewardController,
              keyboardType: TextInputType.number,
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return '報酬金額を入力してください';
                }
                if (int.tryParse(value) == null) {
                  return '正しい数値を入力してください';
                }
                return null;
              },
            ),
            const SizedBox(height: 24),
            ThemedButtonComponent(
              text: widget.initialQuest == null ? 'クエストを作成' : 'クエストを更新',
              onPressed: _saveQuest,
            ),
          ],
        ),
      ),
    );
  }
  
  void _saveQuest() {
    if (_formKey.currentState!.validate()) {
      final quest = Quest(
        id: widget.initialQuest?.id ?? QuestId.generate(),
        title: _titleController.text,
        description: _descriptionController.text,
        reward: QuestReward(
          amount: int.parse(_rewardController.text),
          currency: Currency.yen,
        ),
        status: widget.initialQuest?.status ?? QuestStatus.notStarted,
      );
      
      widget.onSave?.call(quest);
    }
  }
  
  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    _rewardController.dispose();
    super.dispose();
  }
}
```

### 3. 🔍 詳細表示Screen
**用途**: 個別データの詳細表示
```dart
class QuestDetailScreen extends ConsumerWidget {
  final Quest quest;
  final Function(Quest)? onEdit;
  final Function(Quest)? onDelete;
  final Function(Quest)? onComplete;
  
  const QuestDetailScreen({
    required this.quest,
    this.onEdit,
    this.onDelete,
    this.onComplete,
    super.key,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // クエスト基本情報
          QuestInfoCard(quest: quest),
          
          const SizedBox(height: 16),
          
          // 進捗情報
          QuestProgressCard(quest: quest),
          
          const SizedBox(height: 16),
          
          // 担当者情報
          if (quest.assigneeId != null)
            AssigneeInfoCard(assigneeId: quest.assigneeId!),
          
          const SizedBox(height: 24),
          
          // アクションボタン群
          QuestActionButtons(
            quest: quest,
            onEdit: () => onEdit?.call(quest),
            onDelete: () => onDelete?.call(quest),
            onComplete: () => onComplete?.call(quest),
          ),
        ],
      ),
    );
  }
}
```

### 4. 📊 ダッシュボードScreen
**用途**: 統計情報やサマリーの表示
```dart
class FamilyDashboardScreen extends ConsumerWidget {
  const FamilyDashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final familyStats = ref.watch(familyStatsProvider);
    final recentQuests = ref.watch(recentQuestsProvider);
    
    return familyStats.when(
      data: (stats) => SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 統計カード群
            Row(
              children: [
                Expanded(
                  child: StatCard(
                    title: '今月の完了クエスト',
                    value: stats.completedQuestsThisMonth.toString(),
                    icon: Icons.check_circle,
                    color: Colors.green,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: StatCard(
                    title: '今月の獲得ポイント',
                    value: stats.earnedPointsThisMonth.toString(),
                    icon: Icons.star,
                    color: Colors.orange,
                  ),
                ),
              ],
            ),
            
            const SizedBox(height: 16),
            
            // 最近のクエスト
            Text(
              '最近のクエスト',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 8),
            recentQuests.when(
              data: (quests) => RecentQuestsList(quests: quests),
              loading: () => const LoadingIndicator(),
              error: (error, stack) => ErrorDisplay(error: error),
            ),
          ],
        ),
      ),
      loading: () => const LoadingScreen(),
      error: (error, stack) => ErrorScreen(error: error),
    );
  }
}
```

### 5. ⚠️ エラー・空状態Screen
**用途**: エラーや空状態の表示
```dart
class EmptyQuestScreen extends StatelessWidget {
  final VoidCallback? onCreateQuest;
  
  const EmptyQuestScreen({
    this.onCreateQuest,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.assignment_outlined,
              size: 80,
              color: Colors.grey[400],
            ),
            const SizedBox(height: 16),
            Text(
              'クエストがありません',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                color: Colors.grey[600],
              ),
            ),
            const SizedBox(height: 8),
            Text(
              '新しいクエストを作成して\n家族みんなで楽しみましょう！',
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Colors.grey[500],
              ),
            ),
            const SizedBox(height: 24),
            if (onCreateQuest != null)
              ThemedButtonComponent(
                text: 'クエストを作成',
                onPressed: onCreateQuest,
              ),
          ],
        ),
      ),
    );
  }
}
```

## 状態管理との統合

### 非同期データの処理
```dart
class MemberProfileScreen extends ConsumerWidget {
  final String memberId;
  
  const MemberProfileScreen({
    required this.memberId,
    super.key,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final memberAsync = ref.watch(memberProvider(memberId));
    final questsAsync = ref.watch(memberQuestsProvider(memberId));
    
    return memberAsync.when(
      data: (member) => Column(
        children: [
          MemberProfileHeader(member: member),
          const SizedBox(height: 16),
          Expanded(
            child: questsAsync.when(
              data: (quests) => MemberQuestsList(quests: quests),
              loading: () => const LoadingIndicator(),
              error: (error, stack) => ErrorDisplay(error: error),
            ),
          ),
        ],
      ),
      loading: () => const LoadingScreen(),
      error: (error, stack) => ErrorScreen(error: error),
    );
  }
}
```

## レスポンシブデザイン

### 画面サイズに応じたレイアウト
```dart
class ResponsiveQuestListScreen extends ConsumerWidget {
  final List<Quest> quests;
  
  const ResponsiveQuestListScreen({
    required this.quests,
    super.key,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth > 600) {
          // タブレット・デスクトップレイアウト
          return QuestGridView(quests: quests);
        } else {
          // スマートフォンレイアウト
          return QuestListView(quests: quests);
        }
      },
    );
  }
}
```

## ベストプラクティス

### 1. 責務の分離
- ScreenはUI構成に集中し、ビジネスロジックはProviderに委譲
- 複雑なScreenは複数のComponentに分割

### 2. パフォーマンス最適化
- 重いウィジェットのconst化
- 必要な部分のみの再描画
- 仮想化されたリストの使用

### 3. エラーハンドリング
- 適切なエラー状態の表示
- リトライ機能の提供
- ユーザーフレンドリーなメッセージ

### 4. アクセシビリティ
- 適切なセマンティクス情報
- 十分なタップターゲットサイズ
- 色に依存しない情報伝達

## テストの実装

```dart
void main() {
  group('QuestListScreen', () {
    testWidgets('should display quest list', (tester) async {
      const quests = [
        Quest(id: '1', title: 'クエスト1'),
        Quest(id: '2', title: 'クエスト2'),
      ];
      
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: QuestListScreen(quests: quests),
          ),
        ),
      );
      
      expect(find.text('クエスト1'), findsOneWidget);
      expect(find.text('クエスト2'), findsOneWidget);
      expect(find.byType(QuestCardComponent), findsNWidgets(2));
    });
    
    testWidgets('should show empty state when no quests', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: QuestListScreen(quests: []),
          ),
        ),
      );
      
      expect(find.byType(EmptyQuestScreen), findsOneWidget);
    });
  });
}
```