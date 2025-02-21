// お金の値段を表す値オブジェクト
class Money {
  Money(this.value) {
    if (value < 0) {
      // お金がマイナスの場合
      throw ArgumentError.value(value, 'value', 'Invalid money');
    }
  }
  final int value;
}
