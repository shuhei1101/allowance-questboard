/// クエストの成功条件を表すオブジェクト
class QuestSuccessCondition {
  /// ### 制約
  /// - 空文字でないこと
  QuestSuccessCondition(this.value) {
    if (value.isEmpty) {
      throw ArgumentError.value(value, "value", "must not be empty");
    }
  }

  final String value;
}
