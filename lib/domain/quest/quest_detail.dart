import 'package:allowance_questboard/domain/quest/quest_exp.dart';
import 'package:allowance_questboard/domain/quest/quest_success_criteria.dart';
import 'package:allowance_questboard/domain/quest/quest_target_count.dart';
import 'package:allowance_questboard/domain/member/member_exp.dart';
import 'package:allowance_questboard/domain/shared/money.dart';

class QuestDetail {
  QuestDetail({required this.successCriteria, required this.targetCount, required this.rewards, required this.memberExp, required this.questExp, required this.updatedAt});

  final QuestSuccessCriteria successCriteria;
  final QuestTargetCount targetCount;
  final Money rewards;
  final MemberExp memberExp;
  final QuestExp questExp;
  final DateTime updatedAt;
}
