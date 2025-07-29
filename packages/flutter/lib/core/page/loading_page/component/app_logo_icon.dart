import 'package:flutter/material.dart';

/// アプリのロゴアイコンコンポーネント
class AppLogoIcon extends StatelessWidget {
  const AppLogoIcon({super.key});

  @override
  Widget build(BuildContext context) {
    return const Icon(
      Icons.account_balance_wallet,
      size: 80,
      color: Colors.blue,
    );
  }
}
