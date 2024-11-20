import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../application/members/member_application_service.dart';
import '../../application/members/member_data.dart';
import '../components/members/member_list_view.dart';

class MembersPage extends StatelessWidget {
  MembersPage({required this.familyId, super.key}) {
    members = service.getFamilyMembers(familyId);
  }

  final String familyId;
  late List<MemberData> members;
  final service = MemberApplicationService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('メンバー一覧'),
      ),
      body: MemberListView(
        members: members,
        onTap: (memberId) {
          context.push('/test/member/$memberId');
        },
      ),
    );
  }
}
