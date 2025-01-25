import 'package:allowance_questboard/presentation/component/setting_entry.dart';
import 'package:flutter/material.dart';

// interface

/// 一般設定画面のリストビュー
class GeneralQuestSettingScreen extends StatelessWidget {
  GeneralQuestSettingScreen({required this.questId});
  final String questId;
  // delegate;

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        SettingEntry(
          icon: Icon(Icons.settings),
          title: 'クエスト名',
          body: Text('Setting body'),
        ),
        SettingEntry(
          icon: Icon(Icons.settings),
          title: 'クエストカテゴリ',
          body: Text('Setting body'),
        ),
      ],
    );
  }
}

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Setting'),
        ),
        body: GeneralQuestSettingScreen(questId: "questId"),
      ),
    ),
  );
}
