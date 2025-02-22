/// クエストの経験値値オブジェクト
///
/// ### 制約
/// - 0以上の整数であること
class QuestExp {
  QuestExp(this.value) {
    if (value <= 0) {
      throw ArgumentError.value(value, "value", "must be greater than 0");
    }
  }
  final int value;
}
