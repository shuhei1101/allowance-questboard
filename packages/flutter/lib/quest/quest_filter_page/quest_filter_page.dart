import 'package:flutter/material.dart';
import 'package:allowance_questboard/core/page/base_safed_page.dart' show BaseSafedPage;
import 'package:allowance_questboard/quest/quest_filter_page/component/quest_type.dart' show QuestType;
import 'package:allowance_questboard/quest/quest_filter_page/component/quest_filter_form.dart' show QuestFilterForm;
import 'package:hooks_riverpod/hooks_riverpod.dart' show WidgetRef, ProviderScope;

/// クエスト検索画面
/// 
/// 家族、子供、オンライン、テンプレートの各クエスト種別に応じたフィルター機能を提供する
class QuestFilterPage extends BaseSafedPage {
  final QuestType questType;

  const QuestFilterPage({
    super.key,
    required this.questType,
  });

  @override
  PreferredSizeWidget buildSafedAppBar(BuildContext context, WidgetRef ref) {
    return AppBar(
      title: const Text('クエスト検索'),
      leading: IconButton(
        icon: const Icon(Icons.arrow_back),
        onPressed: () => _onBackPressed(context),
      ),
    );
  }

  @override
  Widget buildSafedBody(BuildContext context, WidgetRef ref) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: QuestFilterForm(questType: questType),
    );
  }

  /// 戻るボタンが押された時の処理
  void _onBackPressed(BuildContext context) {
    Navigator.of(context).pop();
  }
}

// 動作確認用コード
void main() {
  runApp(
    ProviderScope(
      child: MaterialApp(
        home: const QuestFilterPage(questType: QuestType.family),
      ),
    ),
  );
}
