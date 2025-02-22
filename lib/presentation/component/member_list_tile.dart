import 'package:allowance_questboard/application/member/member_data.dart';
import 'package:flutter/material.dart';

class MemberListTile extends StatelessWidget {
  /// 渡された[MemberData]を表示用リストタイルに変換する
  ///
  /// リストタイルのカプセル化ウィジェット
  ///
  /// ### 表示する情報
  /// - MemberData.icon: アイコン
  /// - MemberData.name: 名前
  /// - MemberData.id: ID
  MemberListTile({super.key, required this.member});

  /// 表示対象のメンバー情報
  final MemberData member;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context); // テーマを取得
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: member.icon,
      title: Text(member.name),
      subtitle: Text(
        '@${member.id}',
        style: theme.textTheme.labelSmall, // テーマのラベルスタイルを使用
      ),
    );
  }
}

// 動作確認用コード
void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: ListView(
          children: [
            MemberListTile(
              member: MemberData(
                id: "member1",
                name: "メンバー1",
                icon: Icon(Icons.person),
                birthday: DateTime.now(),
                age: 18,
                education: "大学",
                grade: 1,
                exp: 20,
                balance: 20,
                minSavings: 20,
              ),
            ),
            MemberListTile(
              member: MemberData(
                id: "member2",
                name: "メンバー2",
                icon: Icon(Icons.person),
                birthday: DateTime.now(),
                age: 18,
                education: "中学",
                grade: 1,
                exp: 20,
                balance: 20,
                minSavings: 20,
              ),
            ),
          ],
        ),
      ),
    ),
  );
}
