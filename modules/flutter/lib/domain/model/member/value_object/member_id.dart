class MemberId {
  /// メンバーID値オブジェクト
  ///
  /// ### 制約
  /// - 空文字でないこと
  MemberId(this.value) {
    if (value == "") {
      throw ArgumentError.value(value, "value", "must not be empty");
    }
  }

  final String value;
}
