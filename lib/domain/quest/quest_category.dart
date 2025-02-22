/// クエスト分類値オブジェクト
///
/// ### 制約
/// - 空文字でないこと
class QuestCategory {
  QuestCategory(this.value) {
    if (value == "") {
      throw ArgumentError.value(value, "value", "must not be empty");
    }
  }
  final String value;
}
