import 'package:allowance_questboard/domain/member/member_id.dart';
import 'package:allowance_questboard/domain/quest/quest_exp.dart';
import 'package:allowance_questboard/domain/quest/quest_status.dart';

class QuestMemberStatus {
  QuestMemberStatus({required this.memberId, required this.status, required this.questExp});
  final MemberId memberId;
  final QuestStatus status;
  final QuestExp questExp;
}
