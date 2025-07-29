import 'package:flutter/material.dart';

/// アプリタイトルテキストコンポーネント
class AppTitleText extends StatelessWidget {
  const AppTitleText({super.key});

  @override
  Widget build(BuildContext context) {
    return const Text(
      'allowance-questboard',
      style: TextStyle(
        fontSize: 24,
        fontWeight: FontWeight.bold,
        color: Colors.black87,
      ),
    );
  }
}
