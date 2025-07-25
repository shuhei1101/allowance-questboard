import 'package:flutter/material.dart';

/// ログインボタンコンポーネント
/// 
/// ログイン用のボタンを表示するコンポーネントです。
class LoginButton extends StatelessWidget {
  /// ボタンのテキスト
  final String text;
  /// ボタンタップ時のコールバック
  final VoidCallback onPressed;
  
  const LoginButton({
    super.key,
    required this.text,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          padding: const EdgeInsets.symmetric(vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
        ),
        child: Text(text),
      ),
    );
  }
}
