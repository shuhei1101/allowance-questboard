/// クエスト詳細の値オブジェクト
///
/// ### 制約
/// - 空文字でないこと
class QuestDescription {
  QuestDescription(this.value) {
    if (value == "") {
      throw ArgumentError.value(value, "value", "must not be empty");
    }
  }
  final String value;
}
