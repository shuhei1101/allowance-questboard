import 'package:allowance_questboard/application/member/member_data.dart';
import 'package:flutter/material.dart';

class MemberListTile extends StatelessWidget {
  MemberListTile({required member}) : _member = member;

  final MemberData _member;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: _member.icon,
      title: Text('${_member.name}'),
      subtitle: Text(
        '@${_member.id}',
        style: theme.textTheme.labelSmall,
      ),
    );
  }
}
