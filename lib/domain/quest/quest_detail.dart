import 'package:allowance_questboard/domain/quest/quest_exp.dart';
import 'package:allowance_questboard/domain/quest/quest_failure_condition.dart';
import 'package:allowance_questboard/domain/quest/quest_success_condition.dart';
import 'package:allowance_questboard/domain/quest/quest_target_count.dart';
import 'package:allowance_questboard/domain/member/member_exp.dart';
import 'package:allowance_questboard/domain/shared/money.dart';

/// クエストの詳細情報オブジェクト
class QuestDetail {
  QuestDetail(
      {required this.successCondition, required this.failureCondition, required this.targetCount, required this.rewards, required this.memberExp, required this.questExp, required this.updatedAt});

  final QuestSuccessCondition successCondition; // クエスト成功条件
  final QuestFailureCondition failureCondition; // クエスト失敗条件
  final QuestTargetCount targetCount; // 成功までの目標回数
  final Money rewards; // 達成報酬
  final MemberExp memberExp; // クエスト達成時のメンバー経験値
  final QuestExp questExp; // クエスト経験値
  final DateTime updatedAt; // 更新日時
}
