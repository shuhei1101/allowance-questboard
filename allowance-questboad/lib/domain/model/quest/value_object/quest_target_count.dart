/// クエストの目標達成回数を表す値オブジェクト
class QuestTargetCount {
  /// ### 制約
  /// - 1以上の整数であること
  QuestTargetCount(this.value) {
    if (value < 1) {
      throw ArgumentError.value(value, "value", "must be greater than 0");
    }
  }
  final int value;
}
