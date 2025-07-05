/// クエスト分類値オブジェクト
class QuestCategory {
  /// ### 制約
  /// - 空文字でないこと
  QuestCategory(this.value) {
    if (value == "") {
      throw ArgumentError.value(value, "value", "must not be empty");
    }
  }

  final String value;
}
