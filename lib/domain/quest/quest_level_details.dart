import 'package:allowance_questboard/domain/quest/quest_detail.dart';
import 'package:allowance_questboard/domain/quest/quest_level.dart';

/// クエストレベルに対するクエスト詳細を定めたマップ
class QuestLevelDetails {
  /// ### Raises
  /// - [ArgumentError]: レベルが連番でない場合
  QuestLevelDetails(this._map) {
    _validateMap(_map);
  }
  final Map<QuestLevel, QuestDetail> _map;

  Map<QuestLevel, QuestDetail> get map => _map;

  /// レベル順にソートした配列を取得
  List<QuestDetail?> toSortedList() {
    final sortedLevels = _map.keys.toList()..sort((a, b) => a.value.compareTo(b.value));
    return sortedLevels
        .map(
          (e) => _map[e],
        )
        .toList();
  }

  /// レベルが連番かどうか確認する
  ///
  /// 連番でない場合、[ArgumentError]をスローする
  /// - 正常: 1, 2, 3, 4, 5
  /// - 正常: 1, 2, 3
  /// - 異常: 1, 2, 4, 5
  /// - 異常: 1, 3
  void _validateMap(Map<QuestLevel, QuestDetail> map) {
    final sortedLevels = map.keys.map((e) => e.value).toList()..sort();
    for (var entry in sortedLevels.asMap().entries) {
      final i = entry.key + 1;
      final level = entry.value;
      if (level != i) throw ArgumentError();
    }
  }
}
