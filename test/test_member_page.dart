import 'package:allowance_questboard/domain/member/member_repository.dart';
import 'package:allowance_questboard/infrastructure/inmemory/im_member_repository.dart';
import 'package:allowance_questboard/presentation/router/app_route.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

void main() {
  GetIt.I.registerLazySingleton<MemberRepository>(() => InMemoryMemberRepository());
  runApp(TestMemberPage());
}

class TestMemberPage extends StatelessWidget {
  final router = GoRouter(initialLocation: '/members/:testFamilyId/member/:testMemberId', routes: $appRoutes);

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(routerConfig: router);
  }
}
