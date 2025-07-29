import 'package:flutter/material.dart';

/// エラータイトルテキストコンポーネント
class ErrorTitleText extends StatelessWidget {
  const ErrorTitleText({super.key});

  @override
  Widget build(BuildContext context) {
    return const Text(
      'アプリの初期化に失敗しました',
      style: TextStyle(
        fontSize: 20,
        fontWeight: FontWeight.bold,
        color: Colors.black87,
      ),
    );
  }
}
