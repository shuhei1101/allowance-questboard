import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:allowance_questboard/presentation/login/state/login_state_provider.dart';
import 'package:allowance_questboard/presentation/login/component/login_mode_toggle.dart';
import 'package:allowance_questboard/presentation/login/component/oauth_login_section.dart';
import 'package:allowance_questboard/util/validator.dart';

/// ログイン画面
class LoginScreen extends HookConsumerWidget {
  const LoginScreen({
    Key? key,
    required this.onLoginSuccess,
  }) : super(key: key);

  final VoidCallback onLoginSuccess;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final loginState = ref.watch(loginStateProvider);
    final loginNotifier = ref.read(loginStateProvider.notifier);
    
    final emailController = useTextEditingController();
    final passwordController = useTextEditingController();
    final formKey = useMemoized(() => GlobalKey<FormState>());

    return Scaffold(
      appBar: AppBar(
        title: const Text('ログイン'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: formKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // ログインモード切り替えトグル
              LoginModeToggle(
                isFamilyMode: loginState.isFamilyMode,
                onToggle: loginNotifier.toggleLoginMode,
              ),
              const SizedBox(height: 32),
              
              // メールアドレス入力
              TextFormField(
                controller: emailController,
                decoration: const InputDecoration(
                  labelText: 'メールアドレス',
                  prefixIcon: Icon(Icons.email),
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'メールアドレスを入力してください';
                  }
                  if (!isMailAddress(value)) {
                    return '正しいメールアドレスを入力してください';
                  }
                  return null;
                },
                onChanged: loginNotifier.setEmail,
              ),
              const SizedBox(height: 16),
              
              // パスワード入力
              TextFormField(
                controller: passwordController,
                decoration: const InputDecoration(
                  labelText: 'パスワード',
                  prefixIcon: Icon(Icons.lock),
                  border: OutlineInputBorder(),
                ),
                obscureText: true,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'パスワードを入力してください';
                  }
                  if (value.length < 8) {
                    return 'パスワードは8文字以上で入力してください';
                  }
                  return null;
                },
                onChanged: loginNotifier.setPassword,
              ),
              const SizedBox(height: 24),
              
              // ログインボタン
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: loginState.isLoading 
                    ? null 
                    : () async {
                        if (formKey.currentState!.validate()) {
                          final success = await loginNotifier.login();
                          if (success) {
                            onLoginSuccess();
                          }
                        }
                      },
                  child: loginState.isLoading
                    ? const SizedBox(
                        height: 20,
                        width: 20,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                        ),
                      )
                    : const Text('ログイン'),
                ),
              ),
              const SizedBox(height: 16),
              
              // パスワードリセットボタン
              TextButton(
                onPressed: () async {
                  if (emailController.text.isNotEmpty && isMailAddress(emailController.text)) {
                    final success = await loginNotifier.resetPassword(emailController.text);
                    if (success) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('パスワードリセットメールを送信しました'),
                        ),
                      );
                    }
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('正しいメールアドレスを入力してください'),
                      ),
                    );
                  }
                },
                child: const Text('パスワードを忘れた場合'),
              ),
              
              // エラーメッセージ表示
              if (loginState.errorMessage != null) ...[
                const SizedBox(height: 16),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.red.shade50,
                    border: Border.all(color: Colors.red.shade200),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.error, color: Colors.red.shade600),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          loginState.errorMessage!,
                          style: TextStyle(color: Colors.red.shade600),
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.close),
                        onPressed: loginNotifier.clearError,
                        iconSize: 20,
                      ),
                    ],
                  ),
                ),
              ],
              
              const SizedBox(height: 32),
              
              // OAuth ログイン
              const OAuthLoginSection(),
            ],
          ),
        ),
      ),
    );
  }
}