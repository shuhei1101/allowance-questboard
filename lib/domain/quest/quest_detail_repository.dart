import 'package:allowance_questboard/domain/quest/quest_id.dart';
import 'package:allowance_questboard/domain/quest/quest_level_details.dart';

abstract interface class QuestDetailRepository {
  Future<QuestLevelDetails> find(QuestId questId);
}
