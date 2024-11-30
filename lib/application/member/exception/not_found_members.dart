class NotFoundMembers implements Exception {
  NotFoundMembers([this.message = "Not found members."]);
  final String message;
  @override
  String toString() => "NotFoundMembers Exception: $message";
}
