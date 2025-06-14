/// 年齢値オブジェクト
class Age {
  /// ### 制約
  /// - 0以上の整数であること
  Age(this.value) {
    if (value < 0) throw ArgumentError.value(value, 'age', 'Negative value is invalid');
  }
  final int value;
}
