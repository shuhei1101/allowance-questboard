/// メンバーのレベル値オブジェクト
class MemberLevel {
  /// ### 制約
  /// - レベルは1以上の整数であること
  MemberLevel(this.value) {
    if (value < 1) {
      throw ArgumentError.value(value, "value", "must be greater than 0");
    }
  }

  final int value;
}
