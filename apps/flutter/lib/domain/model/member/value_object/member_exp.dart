/// メンバーの経験値を表す値オブジェクト
class MemberExp {
  /// ### 制約
  /// - 0 以上の整数であること
  MemberExp(this.value) {
    if (value < 0) {
      throw ArgumentError.value(value, 'value', 'must be greater than or equal to 0');
    }
  }
  final int value;
}
