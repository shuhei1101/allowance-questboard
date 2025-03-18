import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/quest/family_quest.dart';
import 'package:allowance_questboard/domain/quest/quest_id.dart';

/// [FamilyQuest]のリポジトリインターフェース
abstract interface class FamilyQuestRepository {
  /// 指定した[QuestId]に対応する[FamilyQuest]ドメインモデルを取得する
  Future<FamilyQuest?> find(QuestId questId);

  /// 指定した[FamilyId]に対応する[FamilyQuest]ドメインモデルを全件取得する
  Future<List<FamilyQuest>?> findAll(FamilyId familyId);
}
