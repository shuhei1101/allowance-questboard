import 'package:allowance_questboard/core/router/app_route.dart';
import 'package:allowance_questboard/presentation/member/screen/member_profile_screen.dart';
import 'package:allowance_questboard/core/page/error_page.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

import '../../../application/member/member_application_service.dart';
import '../../../application/member/member_data.dart';

class MemberPage extends StatelessWidget {
  /// メンバー詳細画面
  MemberPage({required this.familyId, required this.memberId, super.key})
      : _service = GetIt.I<MemberApplicationService>();

  final MemberApplicationService _service;

  /// メンバーが所属する家族ID
  final String familyId;

  /// 表示対象のメンバーID
  final String memberId;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<MemberData?>(
        // 画面表示時にメンバー情報を取得
        future: _service.getMember(memberId: memberId),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting)
            Center(child: CircularProgressIndicator());
          if (snapshot.hasError || snapshot.data == null) return ErrorPage(error: snapshot.error);
          final member = snapshot.data;

          // メンバー情報を取得できた場合、詳細画面を表示
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
                  // TODO: メンバーのその他情報を表示
                ],
              ),
            ),
          );
        });
  }
}

// 動作確認用コード
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
