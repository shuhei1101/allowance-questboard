import 'package:allowance_questboard/presentation/page/error_page.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

import '../../application/member/member_application_service.dart';
import '../../application/member/member_data.dart';
import '../component/member/member_list_view.dart';
import '../router/app_route.dart';

class MembersPage extends StatelessWidget {
  MembersPage({required this.familyId, super.key}) : _service = GetIt.I<MemberApplicationService>();

  final String familyId;
  final MemberApplicationService _service;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<MemberData>?>(
        future: _service.getFamilyMembers(familyId),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) Center(child: CircularProgressIndicator());
          if (snapshot.hasError || snapshot.data == null) return ErrorPage();
          final members = snapshot.data;
          return Scaffold(
              appBar: AppBar(
                title: const Text('メンバ管理'),
                actions: [
                  IconButton(onPressed: () {}, icon: Icon(Icons.add)),
                  IconButton(onPressed: () {}, icon: Icon(Icons.settings)),
                ],
              ),
              body: Expanded(
                child: MemberListView(
                  members: members!,
                  onTap: (memberId) {
                    MemberRoute(familyId: familyId, memberId: memberId).push(context);
                  },
                ),
              ));
        });
  }
}
