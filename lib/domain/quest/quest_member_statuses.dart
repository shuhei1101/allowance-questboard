import 'package:allowance_questboard/domain/quest/quest_member_status.dart';

class QuestMemberStatuses {
  QuestMemberStatuses(this._list);
  final List<QuestMemberStatus> _list;
  List<QuestMemberStatus> get list => _list;
}
