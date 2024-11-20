class KeyAlreadyExistsException implements Exception {
  KeyAlreadyExistsException([this.message = 'This key already exists.']);
  final String message;
  @override
  String toString() => "KeyAlreadyExistsException: $message";
}
