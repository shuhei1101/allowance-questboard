import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/quest/quest.dart';
import 'package:allowance_questboard/domain/quest/quest_id.dart';

/// オンラインから保存したクエストのドメインモデル
class SavedQuest extends Quest {
  SavedQuest({
    required super.id,
    required super.name,
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
  final FamilyId familyId; // 保存した家族ID
  final QuestId sharedQuestId; // 保存元の共有クエストID
  final DateTime savedAt; // 保存日時
}
