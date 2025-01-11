import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/quest/quest_category.dart';
import 'package:allowance_questboard/domain/quest/quest_category_id.dart';

abstract interface class QuestCategoryRepository {
  Future<QuestCategory?> find(QuestCategoryId categoryId);
  Future<Map<QuestCategoryId, QuestCategory>?> findCategoriesBy(FamilyId familyId);
}
