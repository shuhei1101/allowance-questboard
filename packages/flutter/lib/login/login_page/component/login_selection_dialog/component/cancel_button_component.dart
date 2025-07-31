import 'package:flutter/material.dart';

/// キャンセルボタンコンポーネント
/// 
/// キャンセル用のテキストボタンを表示するコンポーネントです。
class CancelButton extends StatelessWidget {
  /// ボタンのテキスト
  final String text;
  /// ボタンタップ時のコールバック
  final VoidCallback onPressed;
  
  const CancelButton({
    super.key,
    required this.text,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: TextButton(
        onPressed: onPressed,
        style: TextButton.styleFrom(
          padding: const EdgeInsets.symmetric(vertical: 16),
        ),
        child: Text(text),
      ),
    );
  }
}

// 動作確認用コード
void main() {
  runApp(MaterialApp(
    home: Scaffold(
      appBar: AppBar(title: const Text('Cancel Button Example')),
      body: Center(
        child: CancelButton(
          text: 'キャンセル',
          onPressed: () {
            print('キャンセルボタンが押されました');
          },
        ),
      ),
    ),
  ));
}
