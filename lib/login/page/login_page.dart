import 'package:allowance_questboard/login/screen/login_screen.dart';
import 'package:allowance_questboard/login/state/login_state_provider.dart';
import 'package:allowance_questboard/presentation/shared/router/app_route.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:go_router/go_router.dart';

/// ログイン画面ページ
class LoginPage extends ConsumerWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Consumer(
      builder: (context, ref, child) {
        // 認証状態を監視
        ref.listen(authProvider, (previous, next) {
          if (next.isAuthenticated) {
            // ログイン成功時の画面遷移
            if (next.isFamilyLogin && next.familyId != null) {
              // 家族ホーム画面に遷移（現在は家族クエスト画面に遷移）
              FamilyQuestsRoute(familyId: next.familyId!).go(context);
            } else if (next.isMemberLogin && next.memberId != null) {
              // ユーザーホーム画面に遷移（現在はメンバー詳細画面に遷移）
              // 注意: MemberRouteはfamilyIdも必要だが、仮の値を使用
              // 実際の実装では適切なfamilyIdを取得する必要がある
              MemberRoute(familyId: 'temp', memberId: next.memberId!).go(context);
            }
          }
        });

        return LoginScreen(
          onLoginSuccess: () {
            // ログイン成功時のコールバック（必要に応じて処理を追加）
          },
        );
      },
    );
  }
}