import 'package:allowance_questboard/quest/shared/value_object/quest_name.dart' show QuestNameState;
import 'package:allowance_questboard/quest/shared/value_object/is_public.dart' show IsPublicState;
import 'package:allowance_questboard/quest/shared/value_object/reward_amount.dart' show RewardAmountState;
import 'package:allowance_questboard/quest/shared/value_object/family_name.dart' show FamilyNameState;

/// クエスト検索フォームの状態管理クラス
class QuestFilterFormState {
  final QuestNameState questName;
  final IsPublicState isPublic;
  final RewardAmountState rewardAmount;
  final FamilyNameState familyName;

  const QuestFilterFormState({
    required this.questName,
    required this.isPublic,
    required this.rewardAmount,
    required this.familyName,
  });

  /// 初期状態のファクトリーメソッド
  factory QuestFilterFormState.initial() {
    return QuestFilterFormState(
      questName: QuestNameState(''),
      isPublic: IsPublicState(false),
      rewardAmount: RewardAmountState(500.0),
      familyName: FamilyNameState(''),
    );
  }

  /// copyWithメソッド
  QuestFilterFormState copyWith({
    QuestNameState? questName,
    IsPublicState? isPublic,
    RewardAmountState? rewardAmount,
    FamilyNameState? familyName,
  }) {
    return QuestFilterFormState(
      questName: questName ?? this.questName,
      isPublic: isPublic ?? this.isPublic,
      rewardAmount: rewardAmount ?? this.rewardAmount,
      familyName: familyName ?? this.familyName,
    );
  }
}
