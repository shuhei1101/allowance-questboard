import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:allowance_questboard/presentation/login/screen/login_screen.dart';
import 'package:allowance_questboard/presentation/login/state/login_state_provider.dart';

/// ログインページ
class LoginPage extends ConsumerWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);

    return LoginScreen(
      onLoginSuccess: () {
        // ログイン成功時の遷移処理
        if (authState.isFamilyUser) {
          // 家族ホーム画面に遷移
          context.go('/quests/${authState.familyId!.value}');
        } else if (authState.isMemberUser) {
          // メンバーホーム画面に遷移 (現在は family members 画面に遷移)
          // TODO: メンバー専用ホーム画面の実装後に変更
          context.go('/members/${authState.memberId!.value}');
        }
      },
    );
  }
}