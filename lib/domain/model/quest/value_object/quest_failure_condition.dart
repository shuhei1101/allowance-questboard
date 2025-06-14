/// クエスト失敗条件の値オブジェクト
class QuestFailureCondition {
  /// ### 制約
  /// - 空文字でないこと
  QuestFailureCondition(this.value) {
    if (value.isEmpty) {
      throw ArgumentError.value(value, "value", "must not be empty");
    }
  }
  final String value;
}
