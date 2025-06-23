import 'package:allowance_questboard/login/state/login_page_state.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class LoginPageStateNotifier extends StateNotifier<LoginPageState> {
  LoginPageStateNotifier(super.state);
  int getFamilyId(String userId) {
    return 1;
  }
}
