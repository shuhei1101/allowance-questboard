import 'package:allowance_questboard/domain/model/family/family_id.dart';

/// いいね情報オブジェクト
class Like {
  /// ### # 制約
  /// - いいねをした日時は現在よりも過去の日時であること
  Like({required this.familyId, required this.likedAt}) {
    if (likedAt.isAfter(DateTime.now())) {
      // いいねをした日時が未来の日時の場合
      throw ArgumentError.value(likedAt, 'likedAt', 'Invalid likedAt');
    }
  }

  /// いいねをした家族のID
  final FamilyId familyId;

  /// いいねをした日時
  final DateTime likedAt;
}
