import 'package:allowance_questboard/presentation/component/member/member_profile_screen.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

import '../../application/member/member_application_service.dart';
import '../../application/member/member_data.dart';

class MemberPage extends StatelessWidget {
  MemberPage({required familyId, required memberId, super.key})
      : _familyId = familyId,
        _memberId = memberId {
    _service = GetIt.I<MemberApplicationService>();
    print("dasadffd");
  }

  final String _familyId;
  final String _memberId;
  late MemberApplicationService _service;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<MemberData?>(
        future: _service.getMember(_memberId),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            // データ読み込み中
            return Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError || snapshot.data == null) {
            return Scaffold(
                appBar: AppBar(
                  title: Text("エラー"),
                ),
                body: Center(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [Text("存在しないページです"), TextButton(onPressed: () => Navigator.of(context).pop(), child: Text("戻る"))],
                  ),
                ));
          }
          final member = snapshot.data;
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
        });
  }
}
