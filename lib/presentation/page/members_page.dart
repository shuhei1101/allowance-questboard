import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

import '../../application/member/member_application_service.dart';
import '../../application/member/member_data.dart';
import '../component/member/member_list_view.dart';
import '../router/app_route.dart';

class MembersPage extends StatelessWidget {
  MembersPage({required familyId, super.key})
      : _familyId = familyId,
        _service = GetIt.I<MemberApplicationService>();

  final String _familyId;
  late List<MemberData>? _members;
  final MemberApplicationService _service;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<MemberData>?>(
        future: _service.getFamilyMembers(_familyId),
        builder: (context, snapshot) {
          _members = snapshot.data;

          return Scaffold(
            appBar: AppBar(
              title: const Text('メンバ管理'),
              actions: [
                IconButton(onPressed: () {}, icon: Icon(Icons.add)),
                IconButton(onPressed: () {}, icon: Icon(Icons.settings)),
              ],
            ),
            body: MemberListView(
              members: _members!,
              onTap: (memberId) {
                MemberRoute(familyId: _familyId, memberId: memberId).push(context);
              },
            ),
          );
        });
  }
}
