import 'package:flutter/material.dart';

/// エラーメッセージテキストコンポーネント
class ErrorMessageText extends StatelessWidget {
  const ErrorMessageText({super.key});

  @override
  Widget build(BuildContext context) {
    return const Text(
      'ネットワークの接続を確認してください',
      style: TextStyle(
        fontSize: 16,
        color: Colors.black54,
      ),
    );
  }
}
