import 'package:allowance_questboard/core/setup/l10n_provider.dart';
import 'package:allowance_questboard/core/state/base_state_object.dart';
import 'package:allowance_questboard/core/state/error_message.dart';

class UserIdState extends BaseStateObject<String> {
  UserIdState(super.value);

  @override
  ErrorMessage? validate() {
    // ユーザーIDは空であってはいけない
    if (value.isEmpty) {
      return ErrorMessage(L10nProvider.I.userIdRequired);
    }
    return null;
  }
}
