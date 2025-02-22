/// 家族のIDを表す値オブジェクト
class FamilyId {
  /// ### 制約
  /// - 空文字でないこと
  FamilyId(this.value) {
    if (value == "") {
      throw ArgumentError.value(value, "value", "must not be empty");
    }
  }
  final String value;
}
