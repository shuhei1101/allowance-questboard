import 'package:allowance_questboard/presentation/components/members/member_profile_screen.dart';
import 'package:flutter/material.dart';

import '../../application/members/member_application_service.dart';
import '../../application/members/member_data.dart';

class MemberPage extends StatelessWidget {
  MemberPage({required this.memberId, super.key}) {
    member = service.getMember(memberId);
  }

  final String memberId;
  late MemberData member;
  final service = MemberApplicationService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("メンバー画面"),
      ),
      body: MemberProfileScreen(member),
    );
  }
}
