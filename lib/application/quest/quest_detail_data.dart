import 'package:allowance_questboard/domain/quest/quest_detail.dart';

class QuestDetailData {
  QuestDetailData({
    required this.successCondition,
    required this.failureCondition,
    required this.targetCount,
    required this.rewards,
    required this.memberExp,
    required this.questExp,
  });

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

  final String successCondition;
  final String failureCondition;
  final int targetCount;
  final int rewards;
  final int memberExp;
  final int questExp;
}
