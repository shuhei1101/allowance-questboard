/// クエスト分類ID値オブジェクト
///
/// ### 制約
/// - 空文字でないこと
class QuestCategoryId {
  QuestCategoryId(this.value) {
    if (value == "") {
      throw ArgumentError.value(value, "value", "must not be empty");
    }
  }
  final String value;
}
