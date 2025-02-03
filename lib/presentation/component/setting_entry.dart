import 'package:allowance_questboard/presentation/theme/app_themes.dart';
import 'package:flutter/material.dart';

class SettingEntry extends StatelessWidget {
  SettingEntry({required this.icon, required this.title, required this.body});

  final Icon icon;
  final String title;
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
  SettingSubEntry({this.title = "", required this.body, this.onTap, required this.hasArrow});

  final String title;
  final Widget body;
  final VoidCallback? onTap;
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

// runappしてscaffoldの中にSettingEntryを入れる
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
