import 'package:allowance_questboard/presentation/component/member/member_profile_card.dart';
import 'package:allowance_questboard/presentation/page/error_page.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

import '../../application/member/member_application_service.dart';
import '../../application/member/member_data.dart';

class MemberPage extends StatelessWidget {
  MemberPage({required this.familyId, required this.memberId, super.key}) : _service = GetIt.I<MemberApplicationService>();

  final String familyId;
  final String memberId;
  final MemberApplicationService _service;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<MemberData?>(
        future: _service.getMember(memberId: memberId),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) Center(child: CircularProgressIndicator());
          if (snapshot.hasError || snapshot.data == null) ErrorPage();
          final _member = snapshot.data;
          return Scaffold(
            appBar: AppBar(
              title: Text("プロフィール"),
            ),
            body: Padding(
              padding: EdgeInsets.symmetric(horizontal: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  MemberProfileScreen(member: _member!),
                ],
              ),
            ),
          );
        });
  }
}
