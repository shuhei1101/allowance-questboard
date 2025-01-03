import 'package:allowance_questboard/domain/quest/quest_detail.dart';
import 'package:allowance_questboard/domain/quest/quest_level.dart';

class QuestLevelDetails {
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

  /// レベルに虫食いがないか確認
  void _validateMap(Map<QuestLevel, QuestDetail> map) {
    final sortedLevels = map.keys.map((e) => e.value).toList()..sort();
    for (var entry in sortedLevels.asMap().entries) {
      final i = entry.key + 1;
      final level = entry.value;
      if (level != i) throw ArgumentError();
    }
  }
}
