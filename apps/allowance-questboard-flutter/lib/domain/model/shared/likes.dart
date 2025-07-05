import 'package:allowance_questboard/domain/model/shared/like.dart';

// HACK: このファイルに定義したメソッドは、試しに実装したものです。

/// いいねリストクラス
///
/// クエストやコメントなどに紐づき、いいねの合計数を提供する
class Likes {
  Likes(this._list);
  final List<Like> _list;

  // 日付順にソートしてリストを返却
  List<Like> get sortedByDate => List.from(_list)..sort((a, b) => a.likedAt.compareTo(b.likedAt));

  // 新しいLikeを追加
  void addLike(Like like) {
    _list.add(like);
  }

  // いいねをリストとして取得（不変リスト）
  List<Like> get list => List.unmodifiable(_list);
}
