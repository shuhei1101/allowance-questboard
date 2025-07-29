import 'package:flutter/material.dart';

/// 再試行ボタンコンポーネント
class RetryButton extends StatelessWidget {
  /// ボタンが押された時のコールバック
  final VoidCallback onPressed;

  const RetryButton({
    super.key,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: _onPressed,
      child: const Text('再試行'),
    );
  }

  /// ボタン押下時の処理
  void _onPressed() {
    onPressed();
  }
}
