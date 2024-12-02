import 'package:allowance_questboard/domain/shared/like.dart';

class Likes {
  final List<Like> _list;

  Likes(this._list);

  // 日付順にソートしてリストを返却
  List<Like> get sortedByDate => List.from(_list)..sort((a, b) => a.likedAt.compareTo(b.likedAt));

  // 新しいLikeを追加
  void addLike(Like like) {
    _list.add(like);
  }

  List<Like> get all => List.unmodifiable(_list);
}
