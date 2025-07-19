import 'dart:ui';

import 'package:allowance_questboard/core/security/auth_tokens.dart';
import 'package:allowance_questboard/core/security/token_storage.dart';
import 'package:allowance_questboard/login/api/login_api_client.dart';
import 'package:allowance_questboard/login/state/auth_state_notifier.dart';
import 'package:get_it/get_it.dart';
import 'package:supabase_auth_ui/supabase_auth_ui.dart';

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

class LoginUsecase {
  final TokenStorage tokenStorage = GetIt.I<TokenStorage>();
  final LoginApiClient loginApiClient = GetIt.I<LoginApiClient>();

  Future<void> execute({
    required LoginUsecaseCommand command,
  }) async {
    final user = command.authResponse.user;
    final session = command.authResponse.session;

    if (user == null || session == null) {
      command.onError('ログインセッションが無効です');
      return;
    }

    try {
      final tokens = AuthTokens(
        accessToken: session.accessToken,
        refreshToken: session.refreshToken!,
      );
      await tokenStorage.save(tokens);

      final loginApiResponse = await loginApiClient.login(request: LoginApiRequest(
          tokens: tokens,
          userId: user.id,
      ));

      command.authNotifier.updateFromResponse(loginApiResponse);

      command.onSuccess();
    } catch (e) {
      command.onError('ログイン処理に失敗しました: $e');
    }
  }
}
