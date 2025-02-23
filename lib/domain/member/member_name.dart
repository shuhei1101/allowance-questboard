/// メンバ名値オブジェクト
class MemberName {
  /// ### 制約
  /// - 空文字でないこと
  MemberName(this.value) {
    if (value == "") {
      throw ArgumentError.value(value, "value", "must not be empty");
    }
  }

  final String value;
}
