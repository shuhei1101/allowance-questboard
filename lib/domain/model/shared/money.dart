/// お金の値段を表す値オブジェクト
class Money {
  /// ### 制約
  /// - 0以上の値であること
  Money(this.value) {
    if (value < 0) {
      throw ArgumentError.value(value, 'value', 'Invalid money');
    }
  }
  final int value;
}
