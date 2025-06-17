import 'package:allowance_questboard/shared/state/state_object.dart';

class PasswordState extends StateObject<String> {
  PasswordState({required super.value});

  @override
  String? validate(String value) {
    // パスワードは空であってはいけない
    if (value.isEmpty) {
      return "パスワードは必須です";
    }
    // パスワードは8文字以上でなければならない
    if (value.length < 8) {
      return "パスワードは8文字以上でなければなりません";
    }
    return null;
  }
}
