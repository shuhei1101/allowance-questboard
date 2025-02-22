/// メンバーの経験値を表す値オブジェクト
///
/// ### 制約
/// - 0 以上の整数であること
class MemberExp {
  MemberExp(this.value) {
    if (value < 0) {
      throw ArgumentError.value(value, 'value', 'must be greater than or equal to 0');
    }
  }
  final int value;
}
