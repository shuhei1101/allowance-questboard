/// クエストの目標達成回数を表す値オブジェクト
///
/// ### 制約
/// - 1以上の整数であること
class QuestTargetCount {
  QuestTargetCount(this.value) {
    if (value < 1) {
      throw ArgumentError.value(value, "value", "must be greater than 0");
    }
  }
  final int value;
}
