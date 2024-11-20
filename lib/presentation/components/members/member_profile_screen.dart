import 'package:flutter/material.dart';

import '../../../application/members/member_data.dart';

class MemberProfileScreen extends StatelessWidget {
  const MemberProfileScreen(this.member, {super.key});

  final MemberData member;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(member.id),
        Text(member.name),
        Text(member.education),
      ],
    );
  }
}
