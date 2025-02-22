/// 家族の名前を表す値オブジェクト
///
/// ### 制約
/// - 1文字以上16文字以下であること
class FamilyName {
  FamilyName(this.value) {
    if (value.length < 1 || value.length > 16) {
      throw ArgumentError.value(value, "value", "must be 1 to 16 characters");
    }
  }
  final String value;
}
