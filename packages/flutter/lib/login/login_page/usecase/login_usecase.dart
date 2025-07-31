import 'package:allowance_questboard/core/auth/auth_tokens.dart' show AuthTokens;
import 'package:allowance_questboard/core/auth/token_storage.dart' show TokenStorage;
import 'package:allowance_questboard/core/logger/app_logger.dart' show logger;
import 'package:allowance_questboard/login/login_page/api/login_api.dart' show LoginApi;
import 'package:allowance_questboard/login/login_page/api/login_api_request.dart' show LoginApiRequest;
import 'package:allowance_questboard/login/login_page/usecase/login_usecase_command.dart' show LoginUsecaseCommand;
import 'package:get_it/get_it.dart' show GetIt;



class LoginUsecase {
  final TokenStorage tokenStorage = GetIt.I<TokenStorage>();
  final LoginApi loginApiClient = GetIt.I<LoginApi>();

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

      // デバッグ用ログ追加
      logger.d('アクセストークン取得成功: ${tokens.accessToken.substring(0, 20)}...');
      logger.d('ユーザーID: ${user.id}');

      final loginApiResponse = await loginApiClient.execute(LoginApiRequest(
        userId: user.id,
        tokens: tokens,
      ));

      command.authNotifier.updateFromResponse(loginApiResponse);

      command.onSuccess();
    } catch (e) {
      logger.e('ログインユースケースエラー詳細: $e');
      command.onError('ログイン処理に失敗しました: $e');
    }
  }
}
