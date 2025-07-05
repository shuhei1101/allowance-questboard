/// パスワード値オブジェクト
class Password {
  /// ### 制約
  /// - 空文字列でないこと
  /// - 8文字以上であること
  Password(this.value) {
    if (value.isEmpty) {
      throw ArgumentError.value(value, 'value', 'must not be empty');
    }
    if (value.length < 8) {
      throw ArgumentError.value(value, 'value', 'must be longer than 8 characters');
    }
  }
  final String value;
}
