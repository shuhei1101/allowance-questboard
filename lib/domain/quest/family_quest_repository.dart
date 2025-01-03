import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/quest/family_quest.dart';
import 'package:allowance_questboard/domain/quest/quest_id.dart';

abstract interface class FamilyQuestRepository {
  Future<FamilyQuest?> find(QuestId questId);
  Future<List<FamilyQuest>?> findAllBy(FamilyId familyId);
}
