import 'package:hooks_riverpod/hooks_riverpod.dart' show Notifier, NotifierProvider;
import 'quest_filter_form_state.dart' show QuestFilterFormState;
import '../../shared/value_object/quest_name.dart' show QuestNameState;
import '../../shared/value_object/is_public.dart' show IsPublicState;
import '../../shared/value_object/reward_amount.dart' show RewardAmountState;
import '../../shared/value_object/family_name.dart' show FamilyNameState;

/// クエストフィルターフォームの状態管理Notifier
class QuestFilterFormStateNotifier extends Notifier<QuestFilterFormState> {
  @override
  QuestFilterFormState build() {
    return QuestFilterFormState.initial();
  }

  /// クエスト名を更新
  void updateQuestName(String value) {
    state = state.copyWith(questName: QuestNameState(value));
  }

  /// 公開非公開を更新
  void updateIsPublic(bool value) {
    state = state.copyWith(isPublic: IsPublicState(value));
  }

  /// 報酬額を更新
  void updateRewardAmount(double value) {
    state = state.copyWith(rewardAmount: RewardAmountState(value));
  }

  /// 家族名を更新
  void updateFamilyName(String value) {
    state = state.copyWith(familyName: FamilyNameState(value));
  }

  /// フォームをリセット
  void reset() {
    state = QuestFilterFormState.initial();
  }
}

/// QuestFilterFormStateNotifierのProvider
final questFilterFormStateNotifierProvider = 
    NotifierProvider<QuestFilterFormStateNotifier, QuestFilterFormState>(
  QuestFilterFormStateNotifier.new,
);
