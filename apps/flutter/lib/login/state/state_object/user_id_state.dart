import 'package:allowance_questboard/core/l10n/l10n_provider.dart';
import 'package:allowance_questboard/core/state/base_state_object.dart';

class UserIdState  extends BaseStateObject<String>{
  UserIdState(super.value);

  @override
  void validate() {
    // ユーザーIDは空であってはいけない
    validateRequired(value, l10n.I.required);
  }
}
