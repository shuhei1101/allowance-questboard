import 'package:allowance_questboard/presentation/component/member/member_list_tile.dart';
import 'package:flutter/material.dart';

import '../../../application/member/member_data.dart';

class MemberProfileScreen extends StatelessWidget {
  const MemberProfileScreen(this.member, {super.key});

  final MemberData member;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: EdgeInsets.only(bottom: 10, left: 10, right: 10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            MemberListTile(member),
            Text('年齢：${member.age}'),
            Text('誕生日：${member.name}'),
            Text('学年：${member.displayGrade}'),
          ],
        ),
      ),
    );
  }
}
