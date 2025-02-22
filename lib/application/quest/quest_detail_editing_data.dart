import 'package:allowance_questboard/domain/quest/quest_detail.dart';

/// クエスト詳細の編集用DTO
class QuestDetailEditingData {
  QuestDetailEditingData({
    required this.successCondition,
    required this.failureCondition,
    required this.targetCount,
    required this.rewards,
    required this.memberExp,
    required this.questExp,
  });

  /// ドメインモデル[QuestDetail]から生成するファクトリコンストラクタ
  factory QuestDetailEditingData.fromDomain({required QuestDetail questDetail}) {
    return QuestDetailEditingData(
      successCondition: questDetail.successCondition.value,
      failureCondition: questDetail.failureCondition.value,
      targetCount: questDetail.targetCount.value,
      rewards: questDetail.rewards.value,
      memberExp: questDetail.memberExp.value,
      questExp: questDetail.questExp.value,
    );
  }

  final String successCondition; // 達成条件
  final String failureCondition; // 失敗条件
  final int targetCount; // 目標の達成回数
  final int rewards; // 報酬額
  final int memberExp; // メンバー経験値
  final int questExp; // クエスト経験値
}
