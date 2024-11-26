import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../application/member/member_application_service.dart';
import '../../application/member/member_data.dart';
import '../component/member/member_list_view.dart';
import '../router/app_route.dart';

class MembersPage extends StatelessWidget {
  MembersPage({required this.familyId, super.key}) {
    members = service.getFamilyMembers(familyId);
  }

  final String familyId;
  late List<MemberData>? members;
  final service = MemberApplicationService();

  @override
  Widget build(BuildContext context) {
    // if (members == null) context.pop();
    showDialog(
        context: context,
        builder: (_) {
          return AlertDialog(
            title: Text("タイトル"),
            content: Text("メッセージメッセージメッセージメッセージメッセージメッセージ"),
            actions: <Widget>[
              // ボタン領域
              TextButton(
                child: Text("Cancel"),
                onPressed: () => Navigator.pop(context),
              ),
              TextButton(
                child: Text("OK"),
                onPressed: () => Navigator.pop(context),
              ),
            ],
          );
        });
    return Scaffold(
      appBar: AppBar(
        title: const Text('メンバ管理'),
        actions: [
          IconButton(onPressed: () {}, icon: Icon(Icons.add)),
          IconButton(onPressed: () {}, icon: Icon(Icons.settings)),
        ],
      ),
      body: MemberListView(
        members: members!,
        onTap: (memberId) {
          MemberRoute(familyId: familyId, memberId: memberId).push(context);
        },
      ),
    );
  }
}
