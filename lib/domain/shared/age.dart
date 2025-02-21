/// 年齢値オブジェクト
class Age {
  Age(this.value) {
    // 年齢が0未満の場合はエラー
    if (value < 0) throw ArgumentError.value(value, 'age', 'Negative value is invalid');
  }
  final int value;
}
