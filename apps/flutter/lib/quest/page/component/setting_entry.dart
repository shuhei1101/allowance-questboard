import 'package:allowance_questboard/core/theme/app_themes.dart';
import 'package:flutter/material.dart';

class SettingEntry extends StatelessWidget {
  /// 設定画面のエントリ用ウィジェット
  SettingEntry({required this.icon, required this.title, required this.body});

  /// 設定のアイコン
  final Icon icon;

  /// 設定項目のタイトル
  final String title;

  /// 設定項目の内容
  ///
  /// サブエントリを指定する場合は[SettingSubEntry]を指定する
  final Widget body;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Padding(
              padding: EdgeInsets.all(5),
              child: icon,
            ),
            Text(style: Theme.of(context).textTheme.bodyLarge, title),
          ],
        ),
        body,
      ],
    );
  }
}

class SettingSubEntry extends StatelessWidget {
  /// 設定画面のサブエントリ用ウィジェット
  ///
  /// [SettingEntry]のbodyに指定して使用するサブエントリ
  SettingSubEntry({this.title = "", required this.body, this.onTap, required this.hasArrow});

  /// 設定項目のタイトル
  final String title;

  /// 設定項目の内容。アイコンやテキストなど
  final Widget body;

  /// タップ時の処理
  final VoidCallback? onTap;

  /// 矢印アイコンを表示するか
  final bool hasArrow;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      onTap: onTap,
      title: Text(title),
      trailing: Row(
        mainAxisSize: MainAxisSize.min, // アイコンの幅を最小限に
        children: [
          body,
          hasArrow ? SizedBox(width: 5) : Container(),
          hasArrow ? Icon(Icons.arrow_forward_ios, size: 16) : Container(),
        ],
      ),
    );
  }
}

// 動作確認用コード
void main() {
  runApp(MaterialApp(
    home: Scaffold(
        appBar: AppBar(
          title: const Text('Setting'),
        ),
        body: Theme(
          data: AppThemes.questTheme,
          child: SettingEntry(
            icon: Icon(Icons.settings),
            title: 'Setting',
            body: SettingSubEntry(
              title: "test",
              body: Icon(Icons.settings),
              hasArrow: true,
            ),
          ),
        )),
  ));
}
