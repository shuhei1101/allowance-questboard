import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/quest/quest.dart';
import 'package:allowance_questboard/domain/shared/like.dart';
import 'package:allowance_questboard/domain/shared/reportable.dart';

class SharedQuest extends Quest implements Reportable {
  SharedQuest({
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
    required this.sharedAt,
    required this.likes,
  });
  final FamilyId familyId;
  final DateTime sharedAt;
  final List<Like> likes;
}
