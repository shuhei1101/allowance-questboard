import 'package:allowance_questboard/domain/model/member/value_object/member_id.dart';
import 'package:allowance_questboard/domain/model/quest/value_object/quest_exp.dart';
import 'package:allowance_questboard/domain/model/quest/value_object/quest_status.dart';

/// クエスト参加者の情報オブジェクト
class QuestParticipant {
  QuestParticipant({required this.memberId, required this.status, required this.questExp});

  /// 参加者のメンバーID
  final MemberId memberId;

  /// クエストの進行状況
  final QuestStatus status;

  /// クエストの現在の経験値
  final QuestExp questExp;
}
