import 'package:flutter/material.dart';
import 'package:allowance_questboard/core/page/component/base_component.dart' show BaseComponent;
import 'package:allowance_questboard/quest/quest_filter_page/component/quest_type.dart' show QuestType;
import 'package:hooks_riverpod/hooks_riverpod.dart' show WidgetRef;
import '../state/quest_filter_form_state_notifier.dart' show questFilterFormStateNotifierProvider;

/// フィルターボタンコンポーネント（リセット・検索ボタン）
class FilterButtons extends BaseComponent {
  final QuestType questType;

  const FilterButtons({
    super.key,
    required this.questType,
  });

  @override
  Widget buildComponent(BuildContext context, WidgetRef ref) {
    final notifier = ref.read(questFilterFormStateNotifierProvider.notifier);
    
    return Row(
      children: [
        Expanded(
          child: OutlinedButton(
            onPressed: () => _onResetPressed(notifier),
            child: const Text('リセット'),
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: ElevatedButton(
            onPressed: () => _onSearchPressed(ref),
            child: const Text('検索'),
          ),
        ),
      ],
    );
  }

  /// リセットボタンが押されたときの処理
  void _onResetPressed(notifier) {
    notifier.reset();
  }

  /// 検索ボタンが押されたときの処理
  void _onSearchPressed(WidgetRef ref) {
    // TODO: 検索処理を実装する
    // QuestTypeに応じて適切なStateNotifierを使用する
    switch (questType) {
      case QuestType.family:
        // FamilyQuestFilterStateNotifierを使用
        break;
      case QuestType.child:
        // ChildQuestFilterStateNotifierを使用
        break;
      case QuestType.online:
        // OnlineQuestFilterStateNotifierを使用
        break;
      case QuestType.template:
        // TemplateQuestFilterStateNotifierを使用
        break;
    }
  }
}
