import 'package:allowance_questboard/core/l10n/l10n_provider.dart';
import 'package:flutter/material.dart';

/// アプリタイトルヘッダーコンポーネント
/// 
/// ログイン画面で表示されるアプリのアイコンとタイトルを表示します。
class AppTitleHeader extends StatelessWidget {
  const AppTitleHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // アプリアイコン
        Container(
          width: 80,
          height: 80,
          decoration: BoxDecoration(
            color: Theme.of(context).primaryColor,
            borderRadius: BorderRadius.circular(16),
          ),
          child: const Icon(
            Icons.assignment,
            size: 48,
            color: Colors.white,
          ),
        ),
        const SizedBox(height: 24),
        
        // アプリタイトル
        Text(
          l10n.I.appTitle,
          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
            fontWeight: FontWeight.bold,
            color: Theme.of(context).primaryColor,
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }
}
