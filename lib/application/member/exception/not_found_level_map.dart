class NotFoundLevelMap implements Exception {
  NotFoundLevelMap([this.message = "Not found level map."]);
  final String message;
  @override
  String toString() => "NotFoundMember Exception: $message";
}
