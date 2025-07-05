import 'package:allowance_questboard/domain/model/quest/value_object/quest_exp.dart';
import 'package:allowance_questboard/domain/model/quest/value_object/quest_failure_condition.dart';
import 'package:allowance_questboard/domain/model/quest/value_object/quest_success_condition.dart';
import 'package:allowance_questboard/domain/model/quest/value_object/quest_target_count.dart';
import 'package:allowance_questboard/domain/model/member/value_object/member_exp.dart';
import 'package:allowance_questboard/domain/model/shared/money.dart';

/// クエストの詳細情報オブジェクト
class QuestDetail {
  QuestDetail(
      {required this.successCondition, required this.failureCondition, required this.targetCount, required this.rewards, required this.memberExp, required this.questExp, required this.updatedAt});

  /// クエスト成功条件
  final QuestSuccessCondition successCondition;

  /// クエスト失敗条件
  final QuestFailureCondition failureCondition;

  /// 成功までの目標回数
  final QuestTargetCount targetCount;

  /// 達成報酬
  final Money rewards;

  /// クエスト達成時のメンバー経験値
  final MemberExp memberExp;

  /// クエスト経験値
  final QuestExp questExp;

  /// 更新日時
  final DateTime updatedAt;
}
