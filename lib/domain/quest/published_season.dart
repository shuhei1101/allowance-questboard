/// クエストの公開シーズン情報オブジェクト
///
/// ### 制約
/// - 公開開始日時が公開終了日時より後の場合はエラー
class PublishedSeason {
  PublishedSeason({required this.startedOn, required this.endedOn}) {
    if (startedOn.isAfter(endedOn)) {
      throw ArgumentError.value(endedOn, "endedOn", "must be after startedOn");
    }
  }
  final DateTime startedOn; // 公開開始日時
  final DateTime endedOn; // 公開終了日時
}
