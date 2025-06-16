/// クエストIDの値オブジェクト
class QuestId {
  /// ##### 制約
  /// - 空文字でないこと
  QuestId(this.value) {
    if (value.isEmpty) {
      throw ArgumentError.value(value, "value", "must not be empty");
    }
  }

  final String value;
}
