/// クエストID値オブジェクト
///
/// ### 制約
/// - 空文字でないこと
class QuestId {
  QuestId(this.value) {
    if (value.isEmpty) {
      throw ArgumentError.value(value, "value", "must not be empty");
    }
  }
  final String value;
}
