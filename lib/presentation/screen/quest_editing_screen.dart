import 'package:allowance_questboard/presentation/component/setting_entry.dart';
import 'package:allowance_questboard/presentation/page/family_quest_editing_page.dart';
import 'package:flutter/material.dart';

/// 一般設定画面のリストビュー
class GeneralQuestEditingScreen extends StatefulWidget {
  GeneralQuestEditingScreen({
    required this.questId,
    required this.delegate,
    required this.controller1,
    required this.controller2,
  });
  final String questId;
  final ValidateNotifiable delegate;
  final TextEditingController controller1;
  final TextEditingController controller2;

  @override
  State<StatefulWidget> createState() => GeneralQuestEditingScreenState();
}

class GeneralQuestEditingScreenState extends State<GeneralQuestEditingScreen> {
  // final TextEditingController _controller1 = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        SettingEntry(
          icon: Icon(Icons.settings),
          title: 'クエスト名',
          body: TextField(
            controller: widget.controller1,
            onChanged: (value) {
              widget.delegate.notify(true);
              setState(() => {});
            },
          ),
        ),
        SettingEntry(
          icon: Icon(Icons.settings),
          title: 'クエストカテゴリ',
          body: TextField(
            controller: widget.controller2,
            onChanged: (value) {
              // widget.delegate.notify(value.isNotEmpty);
              setState(() => {});
            },
          ),
        ),
      ],
    );
  }
}
