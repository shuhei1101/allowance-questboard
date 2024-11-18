import 'exceptions/key_already_exists_exception.dart';
import 'member_exp.dart';
import 'rank.dart';

class RankExpMap {
  final Map<Rank, MemberExp> map;

  RankExpMap({required this.map});

  void add(Rank rank, MemberExp exp) {
    if (map.containsKey(rank)) {
      throw KeyAlreadyExistsException();
    }
    map[rank] = exp;
  }

  MemberExp? get(Rank rank) {
    return map[rank];
  }

  int count() {
    return map.length;
  }

  List<MemberExp> getAllValues() {
    return map.values.toList();
  }
}
