import 'package:freezed_annotation/freezed_annotation.dart';
// クエスト一覧に表示するクエストの状態を管理

@freezed
class QuestSummaryState with _$QuestSummaryState {
  const factory QuestSummaryState({
    @Default([]) List<QuestSummary> quests,
    @Default(false) bool isLoading,
    @Default(false) bool isError,
  }) = _QuestSummaryState;

  factory QuestSummaryState.initial() => const QuestSummaryState();
}
