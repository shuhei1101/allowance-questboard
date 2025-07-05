/// クエスト分類ID値オブジェクト
class QuestCategoryId {
  /// ### 制約
  /// - 空文字でないこと
  QuestCategoryId(this.value) {
    if (value == "") {
      throw ArgumentError.value(value, "value", "must not be empty");
    }
  }

  final String value;
}
