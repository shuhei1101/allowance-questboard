import 'package:allowance_questboard/domain/family/family_id.dart';

/// いいねエンティティ
class Like {
  Like({required this.familyId, required this.likedAt}) {
    if (likedAt.isAfter(DateTime.now())) {
      // いいねをした日時が未来の日時の場合
      throw ArgumentError.value(likedAt, 'likedAt', 'Invalid likedAt');
    }
  }
  final FamilyId familyId; // いいねをした家族のID
  final DateTime likedAt; // いいねをした日時
}
