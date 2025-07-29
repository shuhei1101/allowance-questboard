import 'package:flutter/material.dart';

/// エラーアイコンコンポーネント
class ErrorIcon extends StatelessWidget {
  const ErrorIcon({super.key});

  @override
  Widget build(BuildContext context) {
    return const Icon(
      Icons.error_outline,
      size: 80,
      color: Colors.red,
    );
  }
}
