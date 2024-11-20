class NotFoundMember implements Exception {
  NotFoundMember([this.message = "Not found member."]);
  final String message;
  @override
  String toString() => "NotFoundMember Exception: $message";
}
