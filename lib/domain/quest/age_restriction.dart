import 'package:allowance_questboard/domain/shared/age.dart';

/// 年齢制限オブジェクト
///
/// ### 制約
/// - 制限開始年齢が制限終了年齢より小さいこと
class AgeRestriction {
  AgeRestriction({required this.ageFrom, required this.ageTill}) {
    if (ageFrom != null && ageTill != null) {
      if (ageFrom!.value > ageTill!.value) {
        throw ArgumentError('ageFrom must be less than or equal to ageTill');
      }
    }
  }
  final Age? ageFrom; // 制限開始年齢
  final Age? ageTill; // 制限終了年齢
}
