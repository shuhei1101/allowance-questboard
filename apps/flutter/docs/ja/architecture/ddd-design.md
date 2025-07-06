# 🎨 DDD設計思想

## Domain Driven Design (ドメイン駆動設計) の適用

このFlutterアプリケーションでは、Eric Evansの提唱するDDD（ドメイン駆動設計）の概念を採用し、ビジネスドメインを中心とした設計を行っています。

## 戦略的設計

### 境界づけられたコンテキスト (Bounded Context)

本アプリケーションでは、以下のコンテキストに分割されています：

#### 1. 👨‍👩‍👧‍👦 家族コンテキスト (Family Context)
- **責務**: 家族の管理、家族メンバーの関係性
- **場所**: `lib/family/`
- **主要概念**: 家族、家族メンバー、親子関係

#### 2. 👤 メンバーコンテキスト (Member Context)
- **責務**: 個別メンバーの管理、プロフィール
- **場所**: `lib/member/`
- **主要概念**: メンバー、プロフィール、権限

#### 3. 🎯 クエストコンテキスト (Quest Context)
- **責務**: クエスト管理、進捗追跡、報酬システム
- **場所**: `lib/quest/`
- **主要概念**: クエスト、進捗、報酬、達成状況

#### 4. 🔐 認証コンテキスト (Authentication Context)
- **責務**: ユーザー認証、セッション管理
- **場所**: `lib/login/`
- **主要概念**: ユーザー、認証、セッション

## 戦術的設計

### エンティティ (Entity)
**特徴**: 一意性を持つオブジェクト
**配置**: `lib/domain/model/`

例:
```dart
class Member {
  final MemberId id;
  final MemberName name;
  final MemberRole role;
  
  // ビジネスロジック
  bool canAssignQuest() {
    return role.isParent();
  }
}
```

### 値オブジェクト (Value Object)
**特徴**: 不変で等価性によって識別されるオブジェクト
**配置**: `lib/domain/model/`

例:
```dart
class QuestReward {
  final int amount;
  final Currency currency;
  
  const QuestReward(this.amount, this.currency);
  
  // 値オブジェクトの等価性
  @override
  bool operator ==(Object other) => 
    other is QuestReward && 
    amount == other.amount && 
    currency == other.currency;
}
```

### リポジトリ (Repository)
**責務**: ドメインオブジェクトのコレクションのような操作を提供
**インターフェース**: `lib/domain/repository/`
**実装**: `lib/infrastracture/`

```dart
// インターフェース
abstract class QuestRepository {
  Future<List<Quest>> findByMember(MemberId memberId);
  Future<void> save(Quest quest);
}

// 実装
class FirestoreQuestRepository implements QuestRepository {
  // Firestoreを使った具体的な実装
}
```

### ドメインサービス (Domain Service)
**責務**: エンティティや値オブジェクトに属さないビジネスロジック
**配置**: `lib/domain/service/`

```dart
class QuestAssignmentService {
  bool canAssignQuestToMember(Quest quest, Member member) {
    // 複数のドメインオブジェクトに関わるビジネスルール
    return member.isActive() && 
           quest.isAssignable() && 
           !member.hasConflictingQuest(quest);
  }
}
```

### アプリケーションサービス (Application Service)
**責務**: ユースケースの実行、トランザクションの制御
**配置**: `lib/application/`

```dart
class AssignQuestUseCase {
  final QuestRepository questRepository;
  final MemberRepository memberRepository;
  
  Future<void> execute(AssignQuestCommand command) async {
    final quest = await questRepository.findById(command.questId);
    final member = await memberRepository.findById(command.memberId);
    
    // ドメインサービスを使用したビジネスルールの検証
    if (!questAssignmentService.canAssignQuestToMember(quest, member)) {
      throw QuestAssignmentNotAllowedException();
    }
    
    quest.assignTo(member);
    await questRepository.save(quest);
  }
}
```

## アーキテクチャパターンの適用

### 1. リポジトリパターン
データアクセスの抽象化により、ドメイン層が具体的なデータストアに依存しない設計

### 2. ファクトリパターン
複雑なドメインオブジェクトの生成を担当
```dart
class QuestFactory {
  static Quest createDailyQuest(
    String title, 
    QuestReward reward, 
    MemberId assigneeId
  ) {
    return Quest(
      id: QuestId.generate(),
      title: QuestTitle(title),
      reward: reward,
      type: QuestType.daily(),
      assigneeId: assigneeId,
      createdAt: DateTime.now(),
    );
  }
}
```

### 3. 仕様パターン (Specification Pattern)
複雑なビジネスルールをオブジェクトとして表現
```dart
class CompletableQuestSpecification {
  bool isSatisfiedBy(Quest quest) {
    return quest.isAssigned() && 
           quest.hasAllRequiredSteps() &&
           !quest.isExpired();
  }
}
```

## ドメインイベント

重要なビジネスイベントをドメインイベントとして表現し、疎結合なシステムを実現

```dart
abstract class DomainEvent {
  final DateTime occurredAt;
  DomainEvent() : occurredAt = DateTime.now();
}

class QuestCompletedEvent extends DomainEvent {
  final QuestId questId;
  final MemberId completedBy;
  final QuestReward earnedReward;
  
  QuestCompletedEvent(this.questId, this.completedBy, this.earnedReward);
}
```

## FlutterにおけるDDDの適用ポイント

### 1. Riverpodとの統合
ドメインサービスやアプリケーションサービスをProviderとして登録
```dart
final questRepositoryProvider = Provider<QuestRepository>((ref) {
  return FirestoreQuestRepository();
});

final assignQuestUseCaseProvider = Provider<AssignQuestUseCase>((ref) {
  return AssignQuestUseCase(ref.read(questRepositoryProvider));
});
```

### 2. 状態管理との連携
ドメインオブジェクトの状態変化をUIに反映
```dart
final questListProvider = StateNotifierProvider<QuestListNotifier, List<Quest>>((ref) {
  return QuestListNotifier(ref.read(questRepositoryProvider));
});
```

### 3. バリデーションの統合
ドメインオブジェクトのバリデーションをUI層で活用
```dart
class QuestTitleInput extends StatelessWidget {
  Widget build(BuildContext context) {
    return TextFormField(
      validator: (value) {
        try {
          QuestTitle(value ?? '');
          return null;
        } catch (e) {
          return e.toString();
        }
      },
    );
  }
}
```