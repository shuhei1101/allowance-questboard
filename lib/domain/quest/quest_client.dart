/// クエスト依頼者の値オブジェクト
///
/// ### 制約
/// - 空文字でないこと
class QuestClient {
  QuestClient(this.value) {
    if (value == "") {
      throw ArgumentError.value(value, "value", "must not be empty");
    }
  }
  final String value;
}
