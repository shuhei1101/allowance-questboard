import 'package:flutter/material.dart';
import 'package:allowance_questboard/core/page/component/base_component.dart' show BaseComponent;
import 'package:hooks_riverpod/hooks_riverpod.dart' show WidgetRef;
import '../state/quest_filter_form_state_notifier.dart' show questFilterFormStateNotifierProvider;

/// クエスト名検索テキストフィールドコンポーネント
class QuestNameTextField extends BaseComponent {
  const QuestNameTextField({super.key});

  @override
  Widget buildComponent(BuildContext context, WidgetRef ref) {
    final formState = ref.watch(questFilterFormStateNotifierProvider);
    final notifier = ref.read(questFilterFormStateNotifierProvider.notifier);
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'クエスト名',
          style: Theme.of(context).textTheme.labelLarge,
        ),
        const SizedBox(height: 8),
        TextFormField(
          initialValue: formState.questName.value,
          decoration: const InputDecoration(
            hintText: 'クエスト名を入力してください',
            border: OutlineInputBorder(),
            prefixIcon: Icon(Icons.search),
          ),
          onChanged: (value) => notifier.updateQuestName(value),
          maxLength: 100,
        ),
      ],
    );
  }

}
