// メールアドレス値オブジェクト
class MailAddress {
  MailAddress(this.value) {
    if (!RegExp(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$').hasMatch(value)) {
      throw ArgumentError.value(value, 'value', 'Invalid mail address');
    }
  }
  final String value;
}
