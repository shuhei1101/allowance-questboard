/// メンバーのレベル値オブジェクト
///
/// ### 制約
/// - レベルは1以上の整数であること
class MemberLevel {
  MemberLevel(this.value) {
    if (value < 1) {
      throw ArgumentError.value(value, "value", "must be greater than 0");
    }
  }
  final int value;
}
