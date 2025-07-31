import 'package:flutter/material.dart';
import 'package:allowance_questboard/core/page/component/base_component.dart' show BaseComponent;
import 'package:hooks_riverpod/hooks_riverpod.dart' show WidgetRef;
import '../state/quest_filter_form_state_notifier.dart' show questFilterFormStateNotifierProvider;

/// 公開非公開チェックボックスコンポーネント
class IsPublicCheckbox extends BaseComponent {
  const IsPublicCheckbox({super.key});

  @override
  Widget buildComponent(BuildContext context, WidgetRef ref) {
    final formState = ref.watch(questFilterFormStateNotifierProvider);
    final notifier = ref.read(questFilterFormStateNotifierProvider.notifier);
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '公開設定',
          style: Theme.of(context).textTheme.labelLarge,
        ),
        const SizedBox(height: 8),
        CheckboxListTile(
          title: const Text('公開のみ表示'),
          value: formState.isPublic.value,
          onChanged: (value) => notifier.updateIsPublic(value ?? false),
          controlAffinity: ListTileControlAffinity.leading,
        ),
      ],
    );
  }
}
