import 'package:allowance_questboard/domain/quest/quest.dart';

/// アプリ開発者が提供するクエストクラス
class TemplateQuest extends Quest {
  TemplateQuest(
      {required super.id,
      required super.name,
      required super.categoryId,
      required super.icon,
      required super.ageRestriction,
      required super.publishedSeason,
      required super.keyQuests,
      required super.client,
      required super.missionDescription,
      required super.levelDetails,
      required super.createdAt,
      required super.updatedAt});
}
