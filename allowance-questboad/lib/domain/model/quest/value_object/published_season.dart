/// クエストの公開シーズン情報オブジェクト
class PublishedSeason {
  /// ### 制約
  /// - 公開開始日時[startedOn]が公開終了日時[endedOn]より後の場合はエラー
  PublishedSeason({required this.startedOn, required this.endedOn}) {
    if (startedOn.isAfter(endedOn)) {
      throw ArgumentError.value(endedOn, "endedOn", "must be after startedOn");
    }
  }

  /// 公開開始日時
  final DateTime startedOn;

  /// 公開終了日時
  final DateTime endedOn;
}
