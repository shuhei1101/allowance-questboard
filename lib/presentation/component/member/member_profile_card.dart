import 'package:allowance_questboard/presentation/component/member/member_list_tile.dart';
import 'package:allowance_questboard/presentation/component/shared/profile_property_card.dart';
import 'package:flutter/material.dart';

import '../../../application/member/member_data.dart';

class MemberProfileScreen extends StatelessWidget {
  const MemberProfileScreen({required this.member, super.key});

  final MemberData member;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: EdgeInsets.only(bottom: 10, left: 10, right: 10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            MemberListTile(member: member),
            Text('年齢：${member.age}'),
            Text('誕生日：${member.name}'),
            Text('学年：${member.displayGrade}'),
            GridView.count(
              crossAxisCount: 3,
              crossAxisSpacing: 10,
              mainAxisSpacing: 10,
              shrinkWrap: true, // 内容の高さに合わせる
              physics: NeverScrollableScrollPhysics(), // スクロールを無効化
              children: [
                ProfilePropertyCard(
                  color: Colors.red,
                  title: "ランク",
                  body: member.exp.toString(),
                ),
                ProfilePropertyCard(
                  color: Colors.purple,
                  title: "ランク",
                  body: member.level.toString(),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
