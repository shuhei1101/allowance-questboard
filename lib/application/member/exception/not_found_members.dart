class NotFoundFamily implements Exception {
  NotFoundFamily([this.message = "Not found members."]);
  final String message;
  @override
  String toString() => "NotFoundMembers Exception: $message";
}
