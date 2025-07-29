import 'package:allowance_questboard/core/page/base_page.dart' show BasePage;
import 'package:allowance_questboard/core/page/error_page/component/error_icon.dart' show ErrorIcon;
import 'package:allowance_questboard/core/page/error_page/component/error_title_text.dart' show ErrorTitleText;
import 'package:allowance_questboard/core/page/error_page/component/error_message_text.dart' show ErrorMessageText;
import 'package:allowance_questboard/core/page/error_page/component/retry_button.dart' show RetryButton;
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart' show WidgetRef, ProviderScope;

class ErrorPage extends BasePage {
  /// エラーメッセージ
  final String message;
  /// 再試行コールバック
  final VoidCallback? onRetry;
  
  ErrorPage({required this.message, this.onRetry});

  @override
  PreferredSizeWidget? buildAppBar(BuildContext context, WidgetRef ref) {
    return AppBar(
      title: const Text('エラー'),
    );
  }

  @override
  Widget buildBody(BuildContext context, WidgetRef ref) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const ErrorIcon(),
          const SizedBox(height: 32),
          const ErrorTitleText(),
          const SizedBox(height: 16),
          const ErrorMessageText(),
          const SizedBox(height: 48),
          RetryButton(
            onPressed: _onRetryPressed,
          ),
        ],
      ),
    );
  }

  /// 再試行ボタン押下時の処理
  void _onRetryPressed() {
    if (onRetry != null) {
      onRetry!();
    }
  }
}

// 動作確認用コード
void main() {
  runApp(
    ProviderScope(
      child: MaterialApp(
        home: ErrorPage(
          message: 'テストエラーメッセージです',
          onRetry: () {
            print('再試行ボタンが押されました');
          },
        ),
      ),
    ),
  );
}
