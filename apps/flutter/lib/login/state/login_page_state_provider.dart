import 'package:allowance_questboard/login/state/login_page_state.dart';
import 'package:allowance_questboard/login/state/login_page_state_notifier.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final loginPageStateProvider =
    StateNotifierProvider<LoginPageStateNotifier, LoginPageState>(
  (ref) => LoginPageStateNotifier(const LoginPageState()),
);
