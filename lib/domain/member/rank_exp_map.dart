import 'exceptions.dart';
import 'rank.dart';

class RankExpMap {
  final Map<Rank, int> map;

  RankExpMap({required this.map});

  void add(Rank rank, int exp) {
    if (map.containsKey(rank)) {
      throw KeyAlreadyExistsException();
    }
    map[rank] = exp;
  }

  int? get(Rank rank) {
    return map[rank];
  }

  int count() {
    return map.length;
  }

  List<int> getAllValues() {
    return map.values.toList();
  }
}
