import 'package:flutter/material.dart';
import 'package:allowance_questboard/core/page/component/base_component.dart' show BaseComponent;
import 'package:allowance_questboard/quest/page/quest_filter_page/shared/quest_type.dart' show QuestType;
import 'package:allowance_questboard/quest/page/quest_filter_page/component/quest_name_text_field.dart' show QuestNameTextField;
import 'package:allowance_questboard/quest/page/quest_filter_page/component/is_public_checkbox.dart' show IsPublicCheckbox;
import 'package:allowance_questboard/quest/page/quest_filter_page/component/reward_amount_slider.dart' show RewardAmountSlider;
import 'package:allowance_questboard/quest/page/quest_filter_page/component/family_name_text_field.dart' show FamilyNameTextField;
import 'package:allowance_questboard/quest/page/quest_filter_page/component/filter_buttons.dart' show FilterButtons;
import 'package:hooks_riverpod/hooks_riverpod.dart' show WidgetRef;

/// クエスト検索フォームコンポーネント
/// 
/// QuestTypeに応じて表示するフィルター項目を制御する
class QuestFilterForm extends BaseComponent {
  final QuestType questType;

  const QuestFilterForm({
    super.key,
    required this.questType,
  });

  @override
  Widget buildComponent(BuildContext context, WidgetRef ref) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // クエスト名フィルター（全タイプ共通）
        const QuestNameTextField(),
        const SizedBox(height: 16),
        
        // 公開非公開チェックボックス（家族・子供のみ）
        if (_shouldShowPublicFilter()) ...[
          const IsPublicCheckbox(),
          const SizedBox(height: 16),
        ],
        
        // 報酬額スライダー（全タイプ共通）
        const RewardAmountSlider(),
        const SizedBox(height: 16),
        
        // 家名テキストフィールド（オンライン・テンプレートのみ）
        if (_shouldShowFamilyNameFilter()) ...[
          const FamilyNameTextField(),
          const SizedBox(height: 16),
        ],
        
        const Spacer(),
        
        // リセット・検索ボタン
        FilterButtons(questType: questType),
      ],
    );
  }

  /// 公開非公開フィルターを表示するかどうか
  bool _shouldShowPublicFilter() {
    return questType == QuestType.family || questType == QuestType.child;
  }

  /// 家名フィルターを表示するかどうか
  bool _shouldShowFamilyNameFilter() {
    return questType == QuestType.online || questType == QuestType.template;
  }
}
