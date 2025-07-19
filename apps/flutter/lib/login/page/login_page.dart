import 'package:allowance_questboard/core/router/app_route.dart';
import 'package:allowance_questboard/login/state/auth_state_provider.dart';
import 'package:allowance_questboard/core/setup/l10n_provider.dart';
import 'package:allowance_questboard/login/usecase/login_usecase.dart';
import 'package:allowance_questboard/core/widget/ui_helper_mixin.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:get_it/get_it.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:supabase_auth_ui/supabase_auth_ui.dart';

/// ログインページで使用する認証タイプを定義します。
enum AuthType { family, member }

class LoginPage extends HookConsumerWidget with UiHelperMixin {
  final LoginUsecase loginUsecase = GetIt.I<LoginUsecase>();

  LoginPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    useMemoized(() => L10nProvider.update(context));
    final notifier = ref.read(authStateProvider.notifier);
    final authType = useState(AuthType.family);
    return Scaffold(
      appBar: AppBar(
        title: const Text('ログイン'),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // `家族`か`メンバー`どちらでログインするかを選択するためのラジオボタン
          const Text('ユーザータイプの選択'),
          RadioGroup<AuthType>(
            groupValue: authType.value,
            onChanged: (value) {
              if (value != null) {authType.value = value;}
            },
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Radio<AuthType>(value: AuthType.family), const Text('親'),
                Radio<AuthType>(value: AuthType.member), const Text('子供'),
              ],
            ),
          ),
          // 電子メールサインイン/サインアップフォームを作成します
          SupaEmailAuth(
              redirectTo: kIsWeb ? null : 'io.mydomain.myapp://callback',
              onSignInComplete: (response) async {
                loginUsecase.execute(command: LoginUsecaseCommand(
                  authNotifier: notifier,
                  authResponse: response,
                  onSuccess: () {
                    successSnackBar(context, 'ログイン成功');
                  },
                  onError: (message){
                    errorSnackBar(context, 'ログインエラー: $message');
                  }, 
                ));
                switch (authType.value) {
                  case AuthType.family:
                    // 画面遷移: TypedGoRouterを使用
                    FamilyHomeRoute().go(context);
                    break;
                  case AuthType.member:
                    // 画面遷移
                    break;
                }
              },
              onSignUpComplete: (response) {
                print('サインアップ完了: $response');
                // たとえば、何かをしてください: navigate("wait_for_email");
              },
              onError: (error) {
                print('ログインエラー: $error');
                errorSnackBar(context, 'ログインエラー: ${error.toString()}');
              },
              metadataFields: [
                // たとえば、文字列メタデータ用の追加のテキストフィールドを作成します:
                // {'username': 'exampleUsername'}
                MetaDataField(
                  prefixIcon: const Icon(Icons.person),
                  label: 'Username',
                  key: 'username',
                  validator: (val) {
                    if (val == null || val.isEmpty) {
                      return 'Please enter something';
                    }
                    return null;
                  },
                ),

                // たとえば、ブールメタデータのチェックボックスリストを作成します。
                // {'marketing_consent': true}
                BooleanMetaDataField(
                  label: 'マーケティングメールを受け取りたいです',
                  key: 'Marketing_Consent',
                  checkboxPosition: ListTileControlAffinity.leading,
                ),
                // インタラクティブなテキストをサポートします。 フィールドは、必要に応じてフォームをブロックすることができます
                // チェックボックスがチェックされない限り、提出。
                BooleanMetaDataField(
                  key: 'terms_agreement',
                  isRequired: true,
                  checkboxPosition: ListTileControlAffinity.leading,
                  richLabelSpans: [
                    const TextSpan(text: '私は読んで同意しました'),
                    TextSpan(
                      text: '利用規約',
                      style: const TextStyle(
                        color: Colors.blue,
                      ),
                      recognizer: TapGestureRecognizer()
                        ..onTap = () {
                          // たとえば、何かをしてください: navigate("terms_and_conditions");
                        },
                    ),
                    // または、他のカスタムウィジェットを使用します。
                  ],
                ),
              ]),
        ],
      ),
    );
  }
}
