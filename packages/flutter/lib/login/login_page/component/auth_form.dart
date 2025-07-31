import 'package:allowance_questboard/core/l10n/l10n_provider.dart' show l10n;
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:supabase_auth_ui/supabase_auth_ui.dart' show SupaEmailAuth, SupaEmailAuthLocalization;
import 'package:supabase_flutter/supabase_flutter.dart' show AuthResponse;

/// 認証フォームコンポーネント
/// 
/// SupabaseUIを使用したログイン/サインアップフォームを提供します。
/// 多言語化は将来的にSupabaseUIのlocalizationパラメータで対応予定
class AuthForm extends StatelessWidget {
  /// ログイン完了時のコールバック関数
  final Future<void> Function(AuthResponse response) onSignInComplete;
  
  /// サインアップ完了時のコールバック関数
  final void Function(AuthResponse response) onSignUpComplete;
  
  /// エラー発生時のコールバック関数
  final void Function(Object error) onError;

  const AuthForm({
    super.key,
    required this.onSignInComplete,
    required this.onSignUpComplete,
    required this.onError,
  });

  @override
  Widget build(BuildContext context) {
    return SupaEmailAuth(
      redirectTo: kIsWeb ? null : 'io.mydomain.myapp://callback',
      onSignInComplete: onSignInComplete,
      onSignUpComplete: onSignUpComplete,
      onError: onError,
      localization: SupaEmailAuthLocalization(
        enterEmail: l10n.I.enterYourEmail,
        validEmailError: l10n.I.validEmailError,
        enterPassword: l10n.I.enterYourPassword,
        passwordLengthError: l10n.I.passwordLengthError,
        signIn: l10n.I.signIn,
        signUp: l10n.I.signUp,
        forgotPassword: l10n.I.forgotPassword,
        dontHaveAccount: l10n.I.dontHaveAccount,
        haveAccount: l10n.I.haveAccount,
        sendPasswordReset: l10n.I.sendPasswordReset,
        passwordResetSent: l10n.I.passwordResetSent,
        backToSignIn: l10n.I.backToSignIn,
        unexpectedError: l10n.I.unexpectedError,
        requiredFieldError: l10n.I.requiredFieldError,
        confirmPasswordError: l10n.I.confirmPasswordError,
        confirmPassword: l10n.I.confirmPassword,
      ),
    );
  }
}
