import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart' show WidgetRef, ProviderScope;
import 'package:allowance_questboard/core/page/base_page.dart' show BasePage;
import 'package:allowance_questboard/core/page/loading_page/loading_page.dart' show LoadingPage;
import 'package:allowance_questboard/core/page/error_page/error_page.dart' show ErrorPage;
import 'package:allowance_questboard/login/page/login_page/login_page.dart' show LoginPage;
import 'package:allowance_questboard/core/page/app_root_page/component/app_init_state_notifier.dart' show AppInitState, appInitStateProvider;

/// アプリのルートページ
class AppRootPage extends BasePage {
  const AppRootPage({super.key});

  @override
  PreferredSizeWidget? buildAppBar(BuildContext context, WidgetRef ref) {
    return null; // ルートページではAppBarを表示しない
  }

  @override
  Widget buildBody(BuildContext context, WidgetRef ref) {
    final appInitState = ref.watch(appInitStateProvider);

    return switch (appInitState) {
      AppInitState.loading => const LoadingPage(),
      AppInitState.completed => LoginPage(),
      AppInitState.error => ErrorPage(
          message: 'アプリの初期化中にエラーが発生しました',
          onRetry: () {
            ref.read(appInitStateProvider.notifier).retry();
          },
        ),
    };
  }
}

// 動作確認用コード
void main() {
  runApp(
    ProviderScope(
      child: MaterialApp(
        home: AppRootPage(),
      ),
    ),
  );
}
