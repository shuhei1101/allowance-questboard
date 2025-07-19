import 'package:allowance_questboard/core/setup/l10n_provider.dart';
import 'package:allowance_questboard/core/state/base_state_object.dart';

class MemberIdState extends BaseStateObject<int> {
  MemberIdState(super.value);

  @override
  void validate() {
    // メンバーIDは空であってはいけない
    validateRequired(value, L10nProvider.I.memberIdIsInvalid);
  }
}
