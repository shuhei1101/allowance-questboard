import 'package:allowance_questboard/application/member/member_application_service.dart';
import 'package:allowance_questboard/mock/mock_member_application_service.dart';
import 'package:allowance_questboard/presentation/router/app_route.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

void main() {
  GetIt.I.registerLazySingleton<MemberApplicationService>(() => MockMemberApplicationService());
  runApp(TestMembersPage());
}

class TestMembersPage extends StatelessWidget {
  final router = GoRouter(initialLocation: '/members/4asdf243', routes: $appRoutes);

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: router,
    );
  }
}
