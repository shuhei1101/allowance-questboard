/// クエスト経験値の値オブジェクト
class QuestExp {
  /// ### 制約
  /// - 0以上の整数であること
  QuestExp(this.value) {
    if (value <= 0) {
      throw ArgumentError.value(value, "value", "must be greater than 0");
    }
  }

  final int value;
}
