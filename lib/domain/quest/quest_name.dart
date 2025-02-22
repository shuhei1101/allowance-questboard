/// クエスト名値オブジェクト
class QuestName {
  /// ### 制約
  /// - 空文字でないこと
  QuestName(this.value) {
    if (value.isEmpty) {
      throw ArgumentError.value(value, "value", "must not be empty");
    }
  }

  final String value;
}
