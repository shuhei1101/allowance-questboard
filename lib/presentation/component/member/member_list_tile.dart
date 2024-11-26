import 'package:allowance_questboard/application/member/member_data.dart';
import 'package:flutter/material.dart';

class MemberListTile extends StatelessWidget {
  MemberListTile(this.member);

  final MemberData member;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: member.icon,
      title: Text('${member.name}'),
      subtitle: Text(
        '@${member.id}',
        style: theme.textTheme.labelSmall,
      ),
    );
  }
}
