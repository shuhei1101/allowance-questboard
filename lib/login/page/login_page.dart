import 'package:allowance_questboard/login/state/login_page_state_provider.dart';
import 'package:allowance_questboard/presentation/shared/router/app_route.dart';
import 'package:allowance_questboard/shared/setup/l10n_provider.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:supabase_auth_ui/supabase_auth_ui.dart';

/// ログインページのウィジェット
///
/// このウィジェットには以下の機能があります。
/// - ユーザー名とパスワードの入力フィールド
/// - ログインボタン
/// - 両方のフィールドのバリデーションを確認
/// - バリデーションが問題なければ、ログインボタンを有効化
class Loginpage extends HookConsumerWidget {
  const Loginpage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    useMemoized(() => L10nProvider.update(context));
    final notifier = ref.read(loginPageStateProvider.notifier);
    final state = ref.watch(loginPageStateProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('ログイン'),
      ),
      body: Column(
        children: [
// Create a Email sign-in/sign-up form
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

                final familyId = await notifier.loginFamily(userId);
                if (!context.mounted) return;
                FamilyHomeRoute(familyId).push(context);
              },
              onSignUpComplete: (response) {
                // たとえば、何かをしてください: navigate("wait_for_email");
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
