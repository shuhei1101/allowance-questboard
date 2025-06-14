/// クエスト依頼者の値オブジェクト
class QuestClient {
  /// ### 制約
  /// - 空文字でないこと
  QuestClient(this.value) {
    if (value == "") {
      throw ArgumentError.value(value, "value", "must not be empty");
    }
  }

  final String value;
}
