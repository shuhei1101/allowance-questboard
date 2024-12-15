import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/quest/family_quest.dart';

abstract interface class FamilyQuestRepository {
  Future<List<FamilyQuest>?> findAllBy(FamilyId familyId);
}
