import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/quest/quest_category.dart';
import 'package:allowance_questboard/domain/quest/quest_category_id.dart';

/// [QuestCategory]のリポジトリインターフェース
abstract interface class QuestCategoryRepository {
  /// 指定した[QuestCategoryId]に対応する[QuestCategory]ドメインモデルを取得する
  Future<QuestCategory?> find(QuestCategoryId categoryId);

  /// 指定した[FamilyId]に対応する[QuestCategory]ドメインモデルを全件取得する
  Future<Map<QuestCategoryId, QuestCategory>?> findCategoriesBy(FamilyId familyId);
}
