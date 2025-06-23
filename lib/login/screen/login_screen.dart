import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:supabase_auth_ui/supabase_auth_ui.dart';
import '../state/login_state_provider.dart';

/// ログイン画面のUI
class LoginScreen extends HookConsumerWidget {
  final VoidCallback? onLoginSuccess;

  const LoginScreen({
    Key? key,
    this.onLoginSuccess,
  }) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final loginState = ref.watch(loginStateProvider);
    final loginNotifier = ref.read(loginStateProvider.notifier);

    return Scaffold(
      appBar: AppBar(
        title: const Text('ログイン'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // エラーメッセージ
            if (loginState.errorMessage != null)
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(12),
                margin: const EdgeInsets.only(bottom: 16),
                decoration: BoxDecoration(
                  color: Colors.red.shade50,
                  border: Border.all(color: Colors.red.shade200),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(
                  loginState.errorMessage!,
                  style: TextStyle(color: Colors.red.shade700),
                ),
              ),

            // ログインタイプ切り替えボタン
            Container(
              width: double.infinity,
              margin: const EdgeInsets.only(bottom: 24),
              child: SegmentedButton<bool>(
                segments: const [
                  ButtonSegment<bool>(
                    value: true,
                    label: Text('家族'),
                    icon: Icon(Icons.family_restroom),
                  ),
                  ButtonSegment<bool>(
                    value: false,
                    label: Text('メンバー'),
                    icon: Icon(Icons.person),
                  ),
                ],
                selected: {loginState.isFamilyLogin},
                onSelectionChanged: (Set<bool> selected) {
                  if (selected.first != loginState.isFamilyLogin) {
                    loginNotifier.toggleLoginType();
                  }
                },
              ),
            ),

            // ログイン状態の説明
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(12),
              margin: const EdgeInsets.only(bottom: 24),
              decoration: BoxDecoration(
                color: Colors.blue.shade50,
                border: Border.all(color: Colors.blue.shade200),
                borderRadius: BorderRadius.circular(4),
              ),
              child: Text(
                loginState.isFamilyLogin
                    ? '家族としてログインして、家族ホーム画面に移動します'
                    : 'メンバーとしてログインして、ユーザーホーム画面に移動します',
                style: TextStyle(color: Colors.blue.shade700),
              ),
            ),

            // Supabase Auth UI
            Expanded(
              child: SupaEmailAuth(
                redirectTo: null,
                onSignInComplete: (response) {
                  final userId = response.user?.id;
                  if (userId != null) {
                    loginNotifier.handleLogin(userId).then((_) {
                      if (loginState.errorMessage == null) {
                        onLoginSuccess?.call();
                      }
                    });
                  }
                },
                onSignUpComplete: (response) {
                  final userId = response.user?.id;
                  if (userId != null) {
                    loginNotifier.handleLogin(userId).then((_) {
                      if (loginState.errorMessage == null) {
                        onLoginSuccess?.call();
                      }
                    });
                  }
                },
                metadataFields: const [
                  MetaDataField(
                    prefixIcon: Icon(Icons.person),
                    label: 'ユーザー名',
                    key: 'username',
                    validator: null,
                  ),
                ],
              ),
            ),

            // ローディング表示
            if (loginState.isLoading)
              Container(
                padding: const EdgeInsets.all(16),
                child: const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    CircularProgressIndicator(),
                    SizedBox(width: 16),
                    Text('ログイン中...'),
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }
}