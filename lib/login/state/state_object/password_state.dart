import 'package:allowance_questboard/core/setup/l10n_provider.dart';
import 'package:allowance_questboard/shared/state/state_object.dart';

class PasswordState extends StateObject<String> {
  PasswordState(super.value);

  @override
  String? validate(String value) {
    // パスワードは空であってはいけない
    if (value.isEmpty) {
      return L10nProvider.I.passwordRequired;
    }
    // パスワードは8文字以上でなければならない
    if (value.length < 8) {
      return L10nProvider.I.passwordInvalid;
    }
    return null;
  }
}
