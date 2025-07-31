import 'package:flutter/material.dart';
import 'package:allowance_questboard/core/l10n/l10n_provider.dart' show l10n;

/// 家族名表示コンポーネント
/// 
/// 家族名を表示するためのコンポーネントです。
class FamilyNameDisplay extends StatelessWidget {
  /// 家族名
  final String familyName;
  
  const FamilyNameDisplay({
    super.key,
    required this.familyName,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          l10n.I.familyName,
          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 8),
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.grey.shade100,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Text(
            familyName,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 16),
          ),
        ),
      ],
    );
  }
}
