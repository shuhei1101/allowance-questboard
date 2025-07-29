import 'package:flutter/material.dart';
import 'package:allowance_questboard/core/page/loading_page/component/app_logo_icon.dart' show AppLogoIcon;
import 'package:allowance_questboard/core/page/loading_page/component/app_title_text.dart' show AppTitleText;
import 'package:allowance_questboard/core/page/loading_page/component/loading_indicator.dart' show LoadingIndicator;
import 'package:allowance_questboard/core/page/loading_page/component/loading_message_text.dart' show LoadingMessageText;

/// アプリ初期化中のロード画面
class LoadingPage extends StatelessWidget {
  const LoadingPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const AppLogoIcon(),
            const SizedBox(height: 32),
            const AppTitleText(),
            const SizedBox(height: 48),
            const LoadingIndicator(),
            const SizedBox(height: 16),
            const LoadingMessageText(),
          ],
        ),
      ),
    );
  }
}

// 動作確認用コード
void main() {
  runApp(
    MaterialApp(
      home: LoadingPage(),
    ),
  );
}
