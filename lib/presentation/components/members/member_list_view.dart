import 'package:flutter/material.dart';

import '../../../application/members/member_data.dart';

class MemberListView extends StatelessWidget {
  const MemberListView(this.members, {super.key});
  
  final List<MemberData> members;

  @override
  Widget build(BuildContext context) {
    return ListView.builder (
      itemCount: members.length,
      itemBuilder: (context, index) {
        final member = members[index];
        return ListTile (
          leading: member.icon,
          title: Text(member.name),
          subtitle: Text('残高: ${member.balance}'),
        );
      },
    );
  }
}
