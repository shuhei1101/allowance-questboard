import 'package:flutter/material.dart';
import 'package:allowance_questboard/presentation/member/component/member_list_tile.dart';
import 'package:allowance_questboard/presentation/member/component/profile_property_card.dart';
import 'package:allowance_questboard/application/member/member_data.dart';

// TODO: 下段の情報を追加する
// - 合計報酬額
// - 定額報酬
// - 貯金
// TODO: 右上のアクションボタンを追加する

class MemberProfileScreen extends StatelessWidget {
  /// メンバーのプロフィール画面
  ///
  /// ### プロフィール表示の構成
  /// - 上段
  ///   - アイコン
  ///   - 名前
  ///   - 学年
  /// - 中段
  ///   - 年齢
  ///   - 誕生日
  ///   - 学年を表示
  /// - 下段
  ///   - ランク
  ///   - 達成クエスト数
  ///   - 合計報酬額
  ///   - 定額報酬
  ///   - 貯金
  /// - 右上のアクションボタン
  ///   - 編集ボタン
  MemberProfileScreen({required this.member});

  /// メンバー情報
  final MemberData member;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: EdgeInsets.only(bottom: 10, left: 10, right: 10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start, // 左寄せ
          children: [
            _topCard(member),
            _middleCard(member),
            _bottomCard(member),
          ],
        ),
      ),
    );
  }

  /// 上段の情報を表示する
  Widget _topCard(MemberData member) {
    return MemberListTile(member: member);
  }

  /// 中段の情報を表示する
  Widget _middleCard(MemberData member) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text('年齢：${member.age}'),
        Text('誕生日：${member.name}'),
        Text('学年：${member.displayGrade}'),
      ],
    );
  }

  /// 下段の情報を表示する
  Widget _bottomCard(MemberData member) {
    return GridView.count(
      crossAxisCount: 3,
      crossAxisSpacing: 10,
      mainAxisSpacing: 10,
      shrinkWrap: true, // 内容の高さに合わせる
      physics: NeverScrollableScrollPhysics(), // スクロールを無効化
      children: [
        ProfilePropertyCard(
          color: Colors.purple,
          title: "ランク",
          // TODO: 経験値ランクマップに現在のランクを指定し、ランク名を取得する
          value: member.exp.toString(),
        ),
        ProfilePropertyCard(
          color: Colors.red,
          title: "達成クエスト",
          value: member.exp.toString(),
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
        body: MemberProfileScreen(
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
      ),
    ),
  );
}
