import 'package:flutter/material.dart';
import 'package:allowance_questboard/core/page/component/base_component.dart' show BaseComponent;
import 'package:hooks_riverpod/hooks_riverpod.dart' show WidgetRef;
import '../state/quest_filter_form_state_notifier.dart' show questFilterFormStateNotifierProvider;

/// 報酬額スライダーコンポーネント
class RewardAmountSlider extends BaseComponent {
  const RewardAmountSlider({super.key});

  @override
  Widget buildComponent(BuildContext context, WidgetRef ref) {
    final formState = ref.watch(questFilterFormStateNotifierProvider);
    final notifier = ref.read(questFilterFormStateNotifierProvider.notifier);
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '報酬額',
          style: Theme.of(context).textTheme.labelLarge,
        ),
        const SizedBox(height: 8),
        Row(
          children: [
            const Text('0円'),
            Expanded(
              child: Slider(
                value: formState.rewardAmount.value,
                min: 0,
                max: 2000,
                divisions: 20,
                label: '${formState.rewardAmount.value.round()}円',
                onChanged: (value) => notifier.updateRewardAmount(value),
              ),
            ),
            const Text('2000円'),
          ],
        ),
        Center(
          child: Text(
            '現在の設定: ${formState.rewardAmount.value.round()}円',
            style: Theme.of(context).textTheme.bodyMedium,
          ),
        ),
      ],
    );
  }
}
