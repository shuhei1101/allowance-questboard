/// クエストレベルの値オブジェクト
class QuestLevel {
  /// ### 制約
  /// - 1以上5以下の整数であること
  QuestLevel(this.value) {
    if (value < 1 || value > 5) {
      throw ArgumentError.value(value, "value", "must be between 1 and 5");
    }
  }

  final int value;
}
