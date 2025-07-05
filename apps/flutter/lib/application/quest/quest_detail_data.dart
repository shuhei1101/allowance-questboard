import 'package:allowance_questboard/domain/model/quest/value_object/quest_detail.dart';

/// クエスト詳細情報の表示用DTO
class QuestDetailData {
  QuestDetailData({
    required this.successCondition,
    required this.failureCondition,
    required this.targetCount,
    required this.rewards,
    required this.memberExp,
    required this.questExp,
  });

  /// ドメインモデル[QuestDetail]から生成するファクトリコンストラクタ
  factory QuestDetailData.fromDomain({required QuestDetail questDetail}) {
    return QuestDetailData(
      successCondition: questDetail.successCondition.value,
      failureCondition: questDetail.failureCondition.value,
      targetCount: questDetail.targetCount.value,
      rewards: questDetail.rewards.value,
      memberExp: questDetail.memberExp.value,
      questExp: questDetail.questExp.value,
    );
  }

  /// クエストの成功条件
  final String successCondition;

  /// クエストの失敗条件
  final String failureCondition;

  /// クエストの目標達成回数
  final int targetCount;

  /// クエスト達成時の報酬
  final int rewards;

  /// クエスト達成時のメンバー経験値
  final int memberExp;

  /// クエスト達成時のクエスト経験値
  final int questExp;
}
