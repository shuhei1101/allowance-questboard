import 'package:allowance_questboard/domain/quest/quest_detail.dart';
import 'package:allowance_questboard/domain/quest/quest_level.dart';

class QuestLevelDetails {
  QuestLevelDetails(this._map);
  final Map<QuestLevel, QuestDetail> _map;
}
