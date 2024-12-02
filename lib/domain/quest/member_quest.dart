import 'package:allowance_questboard/domain/allowance/allowanceable.dart';
import 'package:allowance_questboard/domain/member/member_id.dart';
import 'package:allowance_questboard/domain/quest/key_questable.dart';
import 'package:allowance_questboard/domain/quest/quest_exp.dart';
import 'package:allowance_questboard/domain/quest/quest_status.dart';

class MemberQuest implements Allowanceable, KeyQuestable {
  MemberQuest({required this.memberId, required this.status, required this.questExp});
  final MemberId memberId;
  final QuestExp questExp;
  final QuestStatus status;
}
