/// クエスト詳細の値オブジェクト
class QuestDescription {
  /// ### 制約
  /// - 空文字でないこと
  QuestDescription(this.value) {
    if (value == "") {
      throw ArgumentError.value(value, "value", "must not be empty");
    }
  }

  final String value;
}
