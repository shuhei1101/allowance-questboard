import 'package:allowance_questboard/domain/quest/quest.dart';
import 'package:allowance_questboard/domain/quest/quest_id.dart';

abstract interface class QuestRepository {
  Future<Quest?> find(QuestId questId);
  Future<List<Quest>?> findMembersBy(QuestId questId);
}
