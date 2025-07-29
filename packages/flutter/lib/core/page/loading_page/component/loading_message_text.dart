import 'package:flutter/material.dart';

/// ローディングメッセージテキストコンポーネント
class LoadingMessageText extends StatelessWidget {
  const LoadingMessageText({super.key});

  @override
  Widget build(BuildContext context) {
    return const Text(
      'マスタデータを読み込み中...',
      style: TextStyle(
        fontSize: 16,
        color: Colors.black54,
      ),
    );
  }
}
