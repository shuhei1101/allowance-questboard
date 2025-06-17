class PasswordState {
  final String password;
  final bool isValid;

  PasswordState({
    required this.password,
    required this.isValid,
  });

  factory PasswordState.fromInput(String password) {
    final isValid = validate(password);
    return PasswordState(
      password: password,
      isValid: isValid,
    );
  }
  static bool validate(String value) {
    // パスワードのバリデーションルールを定義
    // ここでは、8文字以上であることを確認
    return value.length >= 8;
  }

  bool get isValidPassword => isValid;
}
