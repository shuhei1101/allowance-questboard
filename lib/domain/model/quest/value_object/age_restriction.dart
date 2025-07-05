import 'package:allowance_questboard/domain/model/shared/age.dart';

/// 年齢制限オブジェクト
class AgeRestriction {
  /// ### 制約
  /// - 制限開始年齢[ageFrom]が制限終了年齢[ageTill]より小さいこと
  AgeRestriction({required this.ageFrom, required this.ageTill}) {
    if (ageFrom != null && ageTill != null) {
      if (ageFrom!.value > ageTill!.value) {
        throw ArgumentError('ageFrom must be less than or equal to ageTill');
      }
    }
  }

  /// 制限開始年齢
  final Age? ageFrom;

  /// 制限終了年齢
  final Age? ageTill;
}
