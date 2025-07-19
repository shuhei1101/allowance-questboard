import 'package:allowance_questboard/core/setup/l10n_provider.dart';
import 'package:allowance_questboard/core/state/base_state_object.dart';

class UserIdState  extends BaseStateObject<String>{
  UserIdState(super.value);

  @override
  void validate() {
    // ユーザーIDは空であってはいけない
    validateRequired(value, L10nProvider.I.userIdRequired);
  }
}
