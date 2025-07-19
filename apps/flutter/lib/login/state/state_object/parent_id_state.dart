import 'package:allowance_questboard/core/setup/l10n_provider.dart';
import 'package:allowance_questboard/core/state/base_state_object.dart';

class ParentIdState extends BaseStateObject<int> {
  ParentIdState(super.value);

  @override
  void validate() {
    // 親IDは正の整数でなければならない
    validatePositiveInteger(value, L10nProvider.I.parentIdIsInvalid);
  }
}
