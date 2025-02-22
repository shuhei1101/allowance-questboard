/// 年齢値オブジェクト
///
/// ### 制約
/// - 0以上の整数であること
class Age {
  Age(this.value) {
    if (value < 0) throw ArgumentError.value(value, 'age', 'Negative value is invalid');
  }
  final int value;
}
