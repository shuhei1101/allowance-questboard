import 'package:allowance_questboard/login/state/auth_state.dart';
import 'package:allowance_questboard/login/state/auth_state_notifier.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final authStateProvider = StateNotifierProvider<AuthStateNotifier, AuthState>(
  (ref) => AuthStateNotifier(AuthState()),
);
