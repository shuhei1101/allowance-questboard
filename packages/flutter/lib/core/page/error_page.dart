import 'package:allowance_questboard/core/page/base_page.dart' show BasePage;
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart' show WidgetRef;

class ErrorPage extends BasePage {
  /// エラーメッセージ
  final String message;
  
  ErrorPage({required this.message});

  @override
  PreferredSizeWidget? buildAppBar(BuildContext context, WidgetRef ref) {
    return AppBar(
      title: const Text('エラー'),
    );
  }

  @override
  Widget buildBody(BuildContext context, WidgetRef ref) {
    return Center(
      child: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('エラーが発生しました'),
            SizedBox(height: 16),
            Text('メッセージ: $message'),
            SizedBox(height: 16),
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('ログインページに戻る'),
            ),
          ],
        ),
      ),
    );
  }
}

// 動作確認用コード
void main() {
  runApp(MaterialApp(
    home: ErrorPage(
      message: "ページが見つかりません",
    ),
  ));
}
