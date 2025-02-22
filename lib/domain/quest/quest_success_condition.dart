/// クエストの成功条件を表すオブジェクト
///
/// ### 制約
/// - 空文字でないこと
class QuestSuccessCondition {
  QuestSuccessCondition(this.value) {
    if (value.isEmpty) {
      throw ArgumentError.value(value, "value", "must not be empty");
    }
  }
  final String value;
}
