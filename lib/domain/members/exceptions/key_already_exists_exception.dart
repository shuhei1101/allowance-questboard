class KeyAlreadyExistsException implements Exception {
  final String message;
  KeyAlreadyExistsException([this.message = 'This key already exists.']);
}
