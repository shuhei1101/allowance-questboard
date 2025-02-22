/// お金の値段を表す値オブジェクト
///
/// ### 制約
/// - 0以上の値であること
class Money {
  Money(this.value) {
    if (value < 0) {
      throw ArgumentError.value(value, 'value', 'Invalid money');
    }
  }
  final int value;
}
