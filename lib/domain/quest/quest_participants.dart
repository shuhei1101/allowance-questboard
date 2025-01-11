import 'package:allowance_questboard/domain/quest/quest_participant.dart';

class QuestParticipants {
  QuestParticipants(this._list);
  final List<QuestParticipant> _list;
  List<QuestParticipant> get list => _list;
}
