import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/quest/quest.dart';
import 'package:allowance_questboard/domain/shared/like.dart';
import 'package:allowance_questboard/domain/shared/reportable.dart';

/// オンライン上で共有されているクエストのドメインモデル
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
    required super.description,
    required super.levelDetails,
    required super.createdAt,
    required super.updatedAt,
    required this.familyId,
    required this.sharedAt,
    required this.likes,
  });
  final FamilyId familyId; // 共有した家族ID
  final DateTime sharedAt; // 共有日時
  final List<Like> likes; // いいねリスト
}
