/// 家族のIDを表す値オブジェクト
///
/// ### 制約
/// - 空文字でないこと
class FamilyId {
  FamilyId(this.value) {
    if (value == "") {
      throw ArgumentError.value(value, "value", "must not be empty");
    }
  }
  final String value;
}
