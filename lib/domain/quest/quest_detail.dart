import 'package:allowance_questboard/domain/quest/quest_exp.dart';
import 'package:allowance_questboard/domain/quest/quest_failure_condition.dart';
import 'package:allowance_questboard/domain/quest/quest_success_condition.dart';
import 'package:allowance_questboard/domain/quest/quest_target_count.dart';
import 'package:allowance_questboard/domain/member/member_exp.dart';
import 'package:allowance_questboard/domain/shared/money.dart';

class QuestDetail {
  QuestDetail(
      {required this.successCondition, required this.failureCondition, required this.targetCount, required this.rewards, required this.memberExp, required this.questExp, required this.updatedAt});

  final QuestSuccessCondition successCondition;
  final QuestFailureCondition failureCondition;
  final QuestTargetCount targetCount;
  final Money rewards;
  final MemberExp memberExp;
  final QuestExp questExp;
  final DateTime updatedAt;
}
