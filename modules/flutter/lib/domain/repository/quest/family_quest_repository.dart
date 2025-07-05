import 'package:allowance_questboard/domain/model/family/family_id.dart';
import 'package:allowance_questboard/domain/model/quest/family_quest.dart';
import 'package:allowance_questboard/domain/model/quest/value_object/quest_id.dart';

/// [FamilyQuest]のリポジトリインターフェース
abstract interface class FamilyQuestRepository {
  /// 指定した[QuestId]に対応する[FamilyQuest]ドメインモデルを取得する
  Future<FamilyQuest?> find(QuestId questId);

  /// 指定した[FamilyId]に対応する[FamilyQuest]ドメインモデルを全件取得する
  Future<List<FamilyQuest>?> findAll(FamilyId familyId);
}
