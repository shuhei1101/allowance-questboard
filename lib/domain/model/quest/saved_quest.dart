import 'package:allowance_questboard/domain/model/family/family_id.dart';
import 'package:allowance_questboard/domain/model/quest/quest.dart';
import 'package:allowance_questboard/domain/model/quest/value_object/quest_id.dart';

/// オンラインから保存したクエストのドメインモデル
class SavedQuest extends Quest {
  SavedQuest({
    required super.id,
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
    required super.updatedAt,
    required this.familyId,
    required this.sharedQuestId,
    required this.savedAt,
  });

  /// 保存した家族ID
  final FamilyId familyId;

  /// 保存元の共有クエストID
  final QuestId sharedQuestId;

  /// 保存日時
  final DateTime savedAt;
}
