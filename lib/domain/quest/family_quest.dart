import 'package:allowance_questboard/domain/allowance/allowanceable.dart';
import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/quest/key_questable.dart';
import 'package:allowance_questboard/domain/quest/quest.dart';
import 'package:allowance_questboard/domain/quest/quest_id.dart';
import 'package:allowance_questboard/domain/quest/quest_participants.dart';

class FamilyQuest extends Quest implements Allowanceable, KeyQuestable {
  FamilyQuest({
    required super.id,
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
    required super.updatedAt,
    required this.familyId,
    required this.isPublic,
    required this.participants,
    required this.isShared,
    required this.sharedQuestId,
  });
  final FamilyId familyId;
  final bool isPublic;
  final QuestParticipants participants;
  final bool isShared;
  final QuestId? sharedQuestId;
}
