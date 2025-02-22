/// メンバ名値オブジェクト
///
/// ### 制約
/// - 空文字でないこと
class MemberName {
  MemberName(this.value) {
    if (value == "") {
      throw ArgumentError.value(value, "value", "must not be empty");
    }
  }

  late String value;
}
