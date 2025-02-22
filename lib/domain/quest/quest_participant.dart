import 'package:allowance_questboard/domain/member/member_id.dart';
import 'package:allowance_questboard/domain/quest/quest_exp.dart';
import 'package:allowance_questboard/domain/quest/quest_status.dart';

/// クエスト参加者の情報オブジェクト
class QuestParticipant {
  QuestParticipant({required this.memberId, required this.status, required this.questExp});
  final MemberId memberId; // 参加者のメンバーID
  final QuestStatus status; // クエストの進行状況
  final QuestExp questExp; // クエストの現在の経験値
}
