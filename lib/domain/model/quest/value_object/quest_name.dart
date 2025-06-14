/// クエスト名値オブジェクト
class QuestTitle {
  /// ### 制約
  /// - 空文字でないこと
  QuestTitle(this.value) {
    if (value.isEmpty) {
      throw ArgumentError.value(value, "value", "must not be empty");
    }
  }

  final String value;
}
