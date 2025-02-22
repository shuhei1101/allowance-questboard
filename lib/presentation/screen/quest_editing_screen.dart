import 'package:allowance_questboard/application/quest/family_quest_editing_data.dart';
import 'package:allowance_questboard/presentation/component/setting_entry.dart';
import 'package:allowance_questboard/presentation/page/family_quest_editing_page.dart';
import 'package:flutter/material.dart';

/// 一般設定画面のリストビュー
///
/// クエストの一般設定を行う画面のリストビュー
class GeneralQuestEditingScreen extends StatefulWidget {
  GeneralQuestEditingScreen({
    required this.quest,
    required this.delegate,
    required this.questNameController,
    required this.questCategoryController,
  });
  final FamilyQuestEditingData quest;
  final ValidateNotifiable delegate;
  final TextEditingController questNameController;
  final TextEditingController questCategoryController;

  @override
  State<StatefulWidget> createState() => GeneralQuestEditingScreenState();
}

class GeneralQuestEditingScreenState extends State<GeneralQuestEditingScreen> {
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        SettingEntry(
          icon: Icon(Icons.settings),
          title: 'クエスト名',
          body: TextField(
            controller: widget.questNameController,
            onChanged: (value) {
              widget.delegate.notify();
            },
            // onChanged: (value) => print(value),
          ),
        ),
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
