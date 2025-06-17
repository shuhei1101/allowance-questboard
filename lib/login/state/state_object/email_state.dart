import 'package:allowance_questboard/util/validator.dart';

class EmailState {
  final String email;
  final String? errorMessage;

  EmailState({
    required this.email,
    this.errorMessage,
  });
  factory EmailState.fromInput(String email) {
    if (validate(email)) {
      return EmailState(email: email, errorMessage: null);
    } else {
      return EmailState(email: email, errorMessage: 'メールアドレスの形式が正しくありません');
    }
  }
  static bool validate(String value) {
    return isMailAddress(value);
  }

  bool get isValid => errorMessage == null;
}
