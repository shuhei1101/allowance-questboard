import 'package:flutter/material.dart';
import 'package:allowance_questboard/core/router/app_route.dart' show FamilyHomeRoute;
import 'package:allowance_questboard/login/state/auth_state_notifier.dart' show authStateNotifierProvider;
import 'package:allowance_questboard/core/page/base_safed_page.dart' show BaseSafedPage;
import 'package:allowance_questboard/login/usecase/login_usecase.dart' show LoginUsecase, LoginUsecaseCommand;
import 'package:allowance_questboard/login/page/login_page/component/app_title_header.dart' show AppTitleHeader;
import 'package:allowance_questboard/login/page/login_page/component/auth_form.dart' show AuthForm;
import 'package:allowance_questboard/login/page/login_page/component/login_selection_dialog/login_selection_dialog.dart' show LoginSelectionDialog;
import 'package:allowance_questboard/core/l10n/l10n_provider.dart' show l10n;
import 'package:get_it/get_it.dart' show GetIt;
import 'package:hooks_riverpod/hooks_riverpod.dart' show WidgetRef;

/// ログインページ
class LoginPage extends BaseSafedPage {
  final LoginUsecase loginUsecase = GetIt.I<LoginUsecase>();

  LoginPage();

  @override
  PreferredSizeWidget? buildSafedAppBar(BuildContext context, WidgetRef ref) => null;

  @override
  Widget buildSafedBody(BuildContext context, WidgetRef ref) {
    final notifier = ref.read(authStateNotifierProvider.notifier);
    
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // アプリアイコンとタイトル
          const AppTitleHeader(),
          const SizedBox(height: 48),
          
          // SupabaseUI のサインイン/サインアップフォーム
          AuthForm(
            onSignInComplete: (response) => _onSignInComplete(context, notifier, response),
            onSignUpComplete: (response) => _onSignUpComplete(context, response),
            onError: (error) => _onError(context, error),
          ),
        ],
      ),
    );
  }

  /// ログイン完了時の処理
  Future<void> _onSignInComplete(
    BuildContext context,
    dynamic notifier,
    dynamic response,
  ) async {
    loginUsecase.execute(command: LoginUsecaseCommand(
      authNotifier: notifier,
      authResponse: response,
      onSuccess: () {
        // authStateを確認してポップアップを表示
        _showLoginSelectionDialog(context);
      },
      onError: (message){
        errorSnackBar(context, l10n.I.loginError(message));
      }, 
    ));
  }

  /// ログイン選択ダイアログを表示
  void _showLoginSelectionDialog(BuildContext context) {
    // TODO: authStateから親ID・子IDの存在を確認
    // 仮の値を設定（後で実装）
    const familyName = 'サンプル家族'; // authStateから取得
    const hasParentId = true; // authStateから取得
    const hasChildId = true; // authStateから取得

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => LoginSelectionDialog(
        familyName: familyName,
        hasParentId: hasParentId,
        hasChildId: hasChildId,
        onLoginAsParent: () => _onLoginAsParent(context),
        onLoginAsChild: () => _onLoginAsChild(context),
        onCancel: () => _onCancelLogin(context),
      ),
    );
  }

  /// 親でログイン選択時の処理
  void _onLoginAsParent(BuildContext context) {
    Navigator.of(context).pop(); // ダイアログを閉じる
    successSnackBar(context, l10n.I.loginSuccess);
    // 親として家族ホーム画面に遷移
    FamilyHomeRoute().go(context);
  }

  /// 子供でログイン選択時の処理
  void _onLoginAsChild(BuildContext context) {
    Navigator.of(context).pop(); // ダイアログを閉じる
    successSnackBar(context, l10n.I.loginSuccess);
    // 子供として適切な画面に遷移（後で実装）
    // ChildHomeRoute().go(context);
    FamilyHomeRoute().go(context); // 仮に家族ホーム画面に遷移
  }

  /// ログインキャンセル時の処理
  void _onCancelLogin(BuildContext context) {
    Navigator.of(context).pop(); // ダイアログを閉じる
    // 前画面に戻る（ログアウト処理も必要かも）
  }

  /// サインアップ完了時の処理
  void _onSignUpComplete(BuildContext context, dynamic response) {
    print('${l10n.I.signUpComplete}: $response');
    // サインアップ完了時は家族作成画面に遷移
    // CreateFamilyRoute().go(context); // ここは後で実装
  }

  /// エラー発生時の処理
  void _onError(BuildContext context, Object error) {
    print('${l10n.I.loginError('')}: $error');
    errorSnackBar(context, l10n.I.loginError(error.toString()));
  }
}
