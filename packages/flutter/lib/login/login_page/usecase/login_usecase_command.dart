import 'dart:ui' show VoidCallback;

import 'package:allowance_questboard/login/login_page/state/auth_state_notifier.dart' show AuthStateNotifier;
import 'package:supabase_auth_ui/supabase_auth_ui.dart' show AuthResponse;

class LoginUsecaseCommand {
  final AuthStateNotifier authNotifier;
  final AuthResponse authResponse;
  final VoidCallback onSuccess;
  final void Function(String msg) onError;

  LoginUsecaseCommand({
    required this.authNotifier,
    required this.authResponse,
    required this.onSuccess,
    required this.onError,
  });
}
