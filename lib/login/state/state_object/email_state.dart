import 'package:allowance_questboard/core/setup/l10n_provider.dart';
import 'package:allowance_questboard/shared/state/state_object.dart';
import 'package:allowance_questboard/shared/util/validator.dart';

class EmailState extends StateObject<String> {
  EmailState(super.value);

  @override
  String? validate(String value) {
    // メールアドレスは空であってはいけない
    if (value.isEmpty) {
      return L10nProvider.I.emailRequired;
    }
    // メールアドレスの形式が正しいかを検証
    if (isMailAddress(value)) {
      return L10nProvider.I.emailInvalid;
    }
    return null;
  }
}
