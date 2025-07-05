/// 家族の名前を表す値オブジェクト
class FamilyName {
  /// ### 制約
  /// - 1文字以上16文字以下であること
  /// - （予定）
  FamilyName(this.value) {
    if (value.isEmpty || value.length > 16) {
      throw ArgumentError.value(value, "value", "must be 1 to 16 characters");
    }
  }
  final String value;
}
