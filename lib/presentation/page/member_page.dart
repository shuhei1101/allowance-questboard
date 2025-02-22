import 'package:allowance_questboard/presentation/router/app_route.dart';
import 'package:allowance_questboard/presentation/screen/member_profile_screen.dart';
import 'package:allowance_questboard/presentation/page/error_page.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

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
          if (snapshot.hasError || snapshot.data == null) return ErrorPage(error: snapshot.error);
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
                  MemberProfileScreen(member: member!),
                ],
              ),
            ),
          );
        });
  }
}

void main() {
  GetIt.I.registerSingleton<MemberApplicationService>(MockMemberApplicationService());
  final router = GoRouter(initialLocation: '/members/123/member/456', routes: $appRoutes);
  runApp(MaterialApp.router(
    routerConfig: router,
  ));
}

class MockMemberApplicationService implements MemberApplicationService {
  @override
  Future<MemberData?> getMember({required String memberId}) async {
    return MemberData(
      id: "456",
      name: "山田太郎",
      icon: Icon(Icons.person),
      birthday: DateTime(2000, 1, 1),
      age: 21,
      education: "大学",
      grade: 3,
      exp: 100,
      balance: 1000,
      minSavings: 100,
    );
  }

  @override
  Future<List<MemberData>?> getFamilyMembers(String familyId) {
    throw UnimplementedError();
  }
}
