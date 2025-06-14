import 'package:allowance_questboard/domain/model/quest/value_object/quest_id.dart';
import 'package:allowance_questboard/domain/model/quest/quest_level_details.dart';

/// [QuestLevelDetails]のリポジトリインターフェース
abstract interface class QuestDetailRepository {
  /// 指定した[QuestId]に対応する[QuestLevelDetails]ドメインモデルを取得する
  Future<QuestLevelDetails> find(QuestId questId);
}
