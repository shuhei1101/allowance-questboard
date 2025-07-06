# 🧩 Component（部品）

## Component の概要

Componentは、再利用可能な画面の部品となるコンポーネントです。複数の画面で使用されることを前提として設計され、高い再利用性を持ちます。

## 設計原則

### 1. 責務
- 特定の機能を持つUI部品の提供
- 複数の画面で再利用可能な設計
- プロパティによる柔軟なカスタマイズ
- 状態を持たない（またはローカル状態のみ）

### 2. 命名規則
- ファイル名: `{機能名}_component.dart`
- クラス名: `{機能名}Component`
- 例: `QuestCardComponent`, `MemberAvatarComponent`

### 3. 配置場所
- 共通コンポーネント: `lib/shared/component/`
- 機能固有コンポーネント: 各機能ディレクトリ内の`component/`

## Component の基本構造

```dart
class QuestCardComponent extends StatelessWidget {
  final Quest quest;
  final VoidCallback? onTap;
  final bool isSelected;
  final EdgeInsets? padding;

  const QuestCardComponent({
    required this.quest,
    this.onTap,
    this.isSelected = false,
    this.padding,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: padding ?? const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isSelected ? Theme.of(context).primaryColor.withOpacity(0.1) : null,
        border: Border.all(
          color: isSelected ? Theme.of(context).primaryColor : Colors.grey,
        ),
        borderRadius: BorderRadius.circular(8),
      ),
      child: InkWell(
        onTap: onTap,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              quest.title,
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 8),
            Text(
              quest.description,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                RewardChip(reward: quest.reward),
                StatusBadge(status: quest.status),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
```

## Component の種類

### 1. 🎴 カードコンポーネント
**用途**: 情報をカード形式で表示
```dart
class MemberCardComponent extends StatelessWidget {
  final Member member;
  final VoidCallback? onTap;
  
  const MemberCardComponent({
    required this.member,
    this.onTap,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: MemberAvatarComponent(member: member),
        title: Text(member.name),
        subtitle: Text(member.role.displayName),
        trailing: member.isOnline ? const OnlineIndicator() : null,
        onTap: onTap,
      ),
    );
  }
}
```

### 2. 🏷️ バッジ・チップコンポーネント
**用途**: 状態や属性を視覚的に表示
```dart
class StatusBadge extends StatelessWidget {
  final QuestStatus status;
  final double? size;
  
  const StatusBadge({
    required this.status,
    this.size,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: _getStatusColor(status),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        status.displayName,
        style: TextStyle(
          color: Colors.white,
          fontSize: size ?? 12,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
  
  Color _getStatusColor(QuestStatus status) {
    switch (status) {
      case QuestStatus.notStarted:
        return Colors.grey;
      case QuestStatus.inProgress:
        return Colors.blue;
      case QuestStatus.completed:
        return Colors.green;
      case QuestStatus.failed:
        return Colors.red;
    }
  }
}
```

### 3. 🖼️ アバター・アイコンコンポーネント
**用途**: プロフィール画像や状態アイコンの表示
```dart
class MemberAvatarComponent extends StatelessWidget {
  final Member member;
  final double size;
  final bool showOnlineStatus;
  
  const MemberAvatarComponent({
    required this.member,
    this.size = 40,
    this.showOnlineStatus = true,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        CircleAvatar(
          radius: size / 2,
          backgroundColor: member.avatarColor,
          child: member.avatarUrl != null
              ? ClipOval(
                  child: Image.network(
                    member.avatarUrl!,
                    width: size,
                    height: size,
                    fit: BoxFit.cover,
                  ),
                )
              : Text(
                  member.name.substring(0, 1).toUpperCase(),
                  style: TextStyle(
                    fontSize: size / 2.5,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
        ),
        if (showOnlineStatus && member.isOnline)
          Positioned(
            bottom: 0,
            right: 0,
            child: Container(
              width: size / 4,
              height: size / 4,
              decoration: const BoxDecoration(
                color: Colors.green,
                shape: BoxShape.circle,
              ),
            ),
          ),
      ],
    );
  }
}
```

### 4. 📝 フォーム関連コンポーネント
**用途**: 入力フォームの再利用可能な部品
```dart
class CustomTextFormField extends StatelessWidget {
  final String label;
  final String? hintText;
  final TextEditingController? controller;
  final String? Function(String?)? validator;
  final bool obscureText;
  final TextInputType? keyboardType;
  final Widget? prefixIcon;
  final Widget? suffixIcon;
  
  const CustomTextFormField({
    required this.label,
    this.hintText,
    this.controller,
    this.validator,
    this.obscureText = false,
    this.keyboardType,
    this.prefixIcon,
    this.suffixIcon,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      validator: validator,
      obscureText: obscureText,
      keyboardType: keyboardType,
      decoration: InputDecoration(
        labelText: label,
        hintText: hintText,
        prefixIcon: prefixIcon,
        suffixIcon: suffixIcon,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 16,
          vertical: 12,
        ),
      ),
    );
  }
}
```

## 状態管理との連携

### Consumer を使用した状態の監視
```dart
class QuestProgressComponent extends ConsumerWidget {
  final String questId;
  
  const QuestProgressComponent({
    required this.questId,
    super.key,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final progress = ref.watch(questProgressProvider(questId));
    
    return Column(
      children: [
        LinearProgressIndicator(
          value: progress.percentage,
          backgroundColor: Colors.grey[300],
          valueColor: AlwaysStoppedAnimation<Color>(
            _getProgressColor(progress.percentage),
          ),
        ),
        const SizedBox(height: 8),
        Text(
          '${(progress.percentage * 100).toInt()}% 完了',
          style: Theme.of(context).textTheme.bodySmall,
        ),
      ],
    );
  }
  
  Color _getProgressColor(double percentage) {
    if (percentage < 0.3) return Colors.red;
    if (percentage < 0.7) return Colors.orange;
    return Colors.green;
  }
}
```

## アニメーションの活用

### 基本的なアニメーション
```dart
class AnimatedQuestCard extends StatefulWidget {
  final Quest quest;
  final VoidCallback? onTap;
  
  const AnimatedQuestCard({
    required this.quest,
    this.onTap,
    super.key,
  });

  @override
  State<AnimatedQuestCard> createState() => _AnimatedQuestCardState();
}

class _AnimatedQuestCardState extends State<AnimatedQuestCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 0.95,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    ));
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => _controller.forward(),
      onTapUp: (_) => _controller.reverse(),
      onTapCancel: () => _controller.reverse(),
      onTap: widget.onTap,
      child: AnimatedBuilder(
        animation: _scaleAnimation,
        builder: (context, child) {
          return Transform.scale(
            scale: _scaleAnimation.value,
            child: QuestCardComponent(quest: widget.quest),
          );
        },
      ),
    );
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
```

## テーマとの連携

### テーマを活用したスタイリング
```dart
class ThemedButtonComponent extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final ButtonStyle? style;
  
  const ThemedButtonComponent({
    required this.text,
    this.onPressed,
    this.style,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return ElevatedButton(
      onPressed: onPressed,
      style: style ?? ElevatedButton.styleFrom(
        backgroundColor: theme.colorScheme.primary,
        foregroundColor: theme.colorScheme.onPrimary,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
      child: Text(text),
    );
  }
}
```

## ベストプラクティス

### 1. 再利用性の確保
- プロパティによる柔軟なカスタマイズ
- デフォルト値の適切な設定
- 不要な依存関係の排除

### 2. パフォーマンス最適化
- `const` コンストラクターの活用
- 不要な再描画の防止
- 重い処理の最適化

### 3. アクセシビリティ
- 適切なセマンティクス情報の提供
- キーボードナビゲーションの対応
- 色覚障害者への配慮

### 4. テスト容易性
- 依存関係の注入
- モックしやすい設計
- 単体テストの実行しやすさ

## テストの実装

```dart
void main() {
  group('QuestCardComponent', () {
    testWidgets('should display quest information', (tester) async {
      const quest = Quest(
        id: 'test-id',
        title: 'テストクエスト',
        description: 'テスト用のクエストです',
        reward: QuestReward(amount: 100, currency: Currency.yen),
        status: QuestStatus.notStarted,
      );
      
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: QuestCardComponent(quest: quest),
          ),
        ),
      );
      
      expect(find.text('テストクエスト'), findsOneWidget);
      expect(find.text('テスト用のクエストです'), findsOneWidget);
      expect(find.byType(RewardChip), findsOneWidget);
      expect(find.byType(StatusBadge), findsOneWidget);
    });
  });
}
```