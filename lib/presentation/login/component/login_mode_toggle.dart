import 'package:flutter/material.dart';

/// ログインモード切り替えトグルコンポーネント
class LoginModeToggle extends StatelessWidget {
  const LoginModeToggle({
    Key? key,
    required this.isFamilyMode,
    required this.onToggle,
  }) : super(key: key);

  final bool isFamilyMode;
  final VoidCallback onToggle;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const Text(
              'ログインモード',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),
            ToggleButtons(
              isSelected: [isFamilyMode, !isFamilyMode],
              onPressed: (index) => onToggle(),
              borderRadius: BorderRadius.circular(8),
              constraints: const BoxConstraints(
                minHeight: 40,
                minWidth: 80,
              ),
              children: const [
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 16),
                  child: Text('家族'),
                ),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 16),
                  child: Text('メンバー'),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              isFamilyMode 
                ? '家族としてログインし、家族ホーム画面に遷移します' 
                : 'メンバーとしてログインし、メンバーホーム画面に遷移します',
              style: const TextStyle(fontSize: 12, color: Colors.grey),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}