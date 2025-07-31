import 'package:flutter/material.dart';
import 'package:allowance_questboard/core/page/component/base_component.dart' show BaseComponent;
import 'package:hooks_riverpod/hooks_riverpod.dart' show WidgetRef;
import '../state/quest_filter_form_state_notifier.dart' show questFilterFormStateNotifierProvider;

/// 家名テキストフィールドコンポーネント
class FamilyNameTextField extends BaseComponent {
  const FamilyNameTextField({super.key});

  @override
  Widget buildComponent(BuildContext context, WidgetRef ref) {
    final formState = ref.watch(questFilterFormStateNotifierProvider);
    final notifier = ref.read(questFilterFormStateNotifierProvider.notifier);
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '家名',
          style: Theme.of(context).textTheme.labelLarge,
        ),
        const SizedBox(height: 8),
        TextFormField(
          initialValue: formState.familyName.value,
          onChanged: (value) => notifier.updateFamilyName(value),
          decoration: const InputDecoration(
            hintText: '家名を入力してください',
            border: OutlineInputBorder(),
          ),
          maxLength: 50,
        ),
      ],
    );
  }
}
