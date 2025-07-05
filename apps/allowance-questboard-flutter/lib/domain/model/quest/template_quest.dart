import 'package:allowance_questboard/domain/model/quest/quest.dart';

/// アプリ開発者が提供するデフォルトのクエストドメインモデル
class TemplateQuest extends Quest {
  TemplateQuest(
      {required super.id,
      required super.title,
      required super.categoryId,
      required super.icon,
      required super.ageRestriction,
      required super.publishedSeason,
      required super.keyQuests,
      required super.client,
      required super.description,
      required super.levelDetails,
      required super.createdAt,
      required super.updatedAt});
}
