import 'package:flutter/material.dart';
import 'package:allowance_questboard/core/page/component/base_component.dart' show BaseComponent;
import 'package:hooks_riverpod/hooks_riverpod.dart' show WidgetRef;

/// 公開非公開チェックボックスコンポーネント
class PublicCheckbox extends BaseComponent {
  const PublicCheckbox({super.key});

  @override
  Widget buildComponent(BuildContext context, WidgetRef ref) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '公開設定',
          style: Theme.of(context).textTheme.labelLarge,
        ),
        const SizedBox(height: 8),
        Row(
          children: [
            Checkbox(
              value: true, // TODO: 状態管理で管理する
              onChanged: _onPublicChanged,
            ),
            const Text('公開'),
            const SizedBox(width: 16),
            Checkbox(
              value: false, // TODO: 状態管理で管理する
              onChanged: _onPrivateChanged,
            ),
            const Text('非公開'),
          ],
        ),
      ],
    );
  }

  /// 公開チェックボックスが変更された時の処理
  void _onPublicChanged(bool? value) {
    // TODO: 状態管理を実装する
    // 今のところは何もしない
  }

  /// 非公開チェックボックスが変更された時の処理
  void _onPrivateChanged(bool? value) {
    // TODO: 状態管理を実装する
    // 今のところは何もしない
  }
}
