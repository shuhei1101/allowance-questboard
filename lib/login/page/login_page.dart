import 'package:allowance_questboard/login/state/auth_state_provider.dart';
import 'package:allowance_questboard/core/setup/l10n_provider.dart';
import 'package:allowance_questboard/login/usecase/get_family_id_usecase.dart';
import 'package:allowance_questboard/login/usecase/get_member_id_usecase.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:get_it/get_it.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:supabase_auth_ui/supabase_auth_ui.dart';

/// ログインページのウィジェット
///
/// このウィジェットには以下の機能があります。
/// - ユーザー名とパスワードの入力フィールド
/// - ログインボタン
/// - 両方のフィールドのバリデーションを確認
/// - バリデーションが問題なければ、ログインボタンを有効化
class LoginPage extends HookConsumerWidget {
  final GetFamilyIdUsecase getFamilyIdUsecase = GetIt.I<GetFamilyIdUsecase>();
  final GetMemberIdUsecase getMemberIdUsecase = GetIt.I<GetMemberIdUsecase>();

  LoginPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    useMemoized(() => L10nProvider.update(context));
    final notifier = ref.watch(authStateProvider.notifier);

    return Scaffold(
      appBar: AppBar(
        title: const Text('ログイン'),
      ),
      body: Column(
        children: [
          // 電子メールサインイン/サインアップフォームを作成します
          SupaEmailAuth(
              redirectTo: kIsWeb ? null : 'io.mydomain.myapp://callback',
              onSignInComplete: (response) async {
                final supabaseUser = Supabase.instance.client.auth.currentUser;
                final userId = supabaseUser?.id;

                if (userId == null) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('ユーザーIDの取得に失敗しました')),
                  );
                  return;
                }

                notifier.updateUserId(userId);
                notifier.updateFamilyId(await getFamilyIdUsecase.execute(userId));
                notifier.updateMemberId(await getMemberIdUsecase.execute(userId));
              },
              onSignUpComplete: (response) {
                print('サインアップ完了: $response');
                // たとえば、何かをしてください: navigate("wait_for_email");
              },
              onError: (error) {
                print('ログインエラー: $error');
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('ログインエラー: ${error.toString()}')),
                );
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
                  label: 'I wish to receive marketing emails',
                  key: 'marketing_consent',
                  checkboxPosition: ListTileControlAffinity.leading,
                ),
                // インタラクティブなテキストをサポートします。 フィールドは、必要に応じてフォームをブロックすることができます
                // チェックボックスがチェックされない限り、提出。
                BooleanMetaDataField(
                  key: 'terms_agreement',
                  isRequired: true,
                  checkboxPosition: ListTileControlAffinity.leading,
                  richLabelSpans: [
                    const TextSpan(text: 'I have read and agree to the '),
                    TextSpan(
                      text: 'Terms and Conditions',
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

// 動作確認用
void main() {
  print('Starting LoginPage...');
  runApp(
    ProviderScope(
      child: MaterialApp(
        home: LoginPage(),
      ),
    ),
  );
}
