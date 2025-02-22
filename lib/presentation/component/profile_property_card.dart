import 'package:flutter/material.dart';

// TODO: カードのサイズを一定にし、角を丸くしないよう変更する

class ProfilePropertyCard extends StatelessWidget {
  /// メンバープロフィール画面のプロパティ情報を表示するカード
  ProfilePropertyCard({required this.color, required this.title, required this.value});

  /// カードの背景色
  final Color color;

  /// プロパティ名
  final String title;

  /// プロパティの値
  final String value;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Card(
          color: color,
          child: Text(title),
        ),
        SizedBox(height: 20),
        Card(
          child: Text(value),
        ),
      ],
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
            ProfilePropertyCard(
              color: Colors.purple,
              title: "ランク",
              value: "8",
            ),
            ProfilePropertyCard(
              color: Colors.red,
              title: "達成クエスト",
              value: "8",
            ),
            ProfilePropertyCard(
              color: Colors.orange,
              title: "合計報酬額",
              value: "10000円",
            ),
            ProfilePropertyCard(
              color: Colors.lightBlue,
              title: "定額報酬",
              value: "1900円/月",
            ),
            ProfilePropertyCard(
              color: Colors.green,
              title: "貯金",
              value: "3000円",
            ),
          ],
        ),
      ),
    ),
  );
}
