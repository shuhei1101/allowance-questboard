import 'package:allowance_questboard/application/quest/update_family_quest_response.dart';
import 'package:allowance_questboard/presentation/quest/component/setting_entry.dart';
import 'package:allowance_questboard/presentation/quest/state/edit_family_quest_state_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class EditGeneralQuestScreen extends HookConsumerWidget {
  EditGeneralQuestScreen({
    required this.quest,
  });

  final UpdateFamilyQuestResponse quest;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final notifier = ref.watch(editFamilyQuestStateProvider.notifier);

    final titleController = useTextEditingController(text: quest.title);

    return ListView(
      children: [
        SettingEntry(
          icon: Icon(Icons.settings),
          title: 'クエスト名',
          body: TextField(
            controller: titleController,
            onChanged: (value) {
              print("value: $value");
              notifier.updateQuestTitle(title: value);
            },
          ),
        ),
        // TOOD: クエスト分類の選択ボックスを追加

        // SettingEntry(
        //   icon: Icon(Icons.settings),
        //   title: 'クエスト分類',
        //   body: SettingSubEntry(
        //     body: DropdownButton<String>(
        //       value // ここにクエスト分類を入れる。
        //       // TODO: Categoryを取得するアプリケーションサービスの作成
        // ),
        // SettingEntry(
        //   icon: Icon(Icons.settings),
        //   title: 'アイコン',
        //   body: SettingSubEntry(body: widget.quest.icon, hasArrow: true),
        // ),
        // SettingSubEntry(
        //   title: 'クエスト詳細',
        //   body: Text('設定なし'),
        //   hasArrow: true,
        // ),
        // SettingEntry(icon: Icon(Icons.settings), title: "受注要件", body: Column(
        //   children: [
        //     SettingSubEntry(
        //       title: '指定方法',
        //       // セレクトボックス
        //       body: DropdownButton<String>(
        //         value: ,
        //     ),
        //     )
        //   ]
        // ))
      ],
    );
  }
}
