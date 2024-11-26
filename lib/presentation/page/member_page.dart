import 'package:allowance_questboard/presentation/component/member/member_profile_screen.dart';
import 'package:allowance_questboard/presentation/router/app_route.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../application/member/member_application_service.dart';
import '../../application/member/member_data.dart';

class MemberPage extends StatelessWidget {
  MemberPage({required this.familyId, required this.memberId, super.key}) {
    member = service.getMember(memberId);
  }

  final String familyId;
  final String memberId;
  late MemberData? member;
  final service = MemberApplicationService();

  @override
  Widget build(BuildContext context) {
    if (member == null) context.pop();

    return Scaffold(
      appBar: AppBar(
        title: Text("プロフィール"),
      ),
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            MemberProfileScreen(member!),
          ],
        ),
      ),
    );
  }
}
