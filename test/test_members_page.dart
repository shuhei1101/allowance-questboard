import 'package:allowance_questboard/domain/members/member_repository.dart';
import 'package:allowance_questboard/infrastructure/inmemory/im_member_repository.dart';
import 'package:allowance_questboard/presentation/pages/member_page.dart';
import 'package:allowance_questboard/presentation/pages/members_page.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

void main() {
  GetIt.I.registerLazySingleton<MemberRepository>(() => InMemoryMemberRepository());
  runApp(TestMembersPage());
}

// ignore: must_be_immutable
class TestMembersPage extends StatelessWidget {
  TestMembersPage({super.key});

  final router = GoRouter(
    initialLocation: '/family/testid',
    routes: <GoRoute>[
      GoRoute(
          path: '/family/:family_id',
          builder: (context, state) {
            final familyId = state.pathParameters['family_id']!;
            return MembersPage(
              familyId: familyId,
            );
          }),
      GoRoute(
          path: '/test/member/:member_id',
          builder: (context, state) {
            final memberId = state.pathParameters['member_id']!;
            return MemberPage(
              memberId: memberId,
            );
          })
    ],
    errorBuilder: (context, state) {
      // エラーページを設定
      return Scaffold(
        appBar: AppBar(title: Text('Not Found')),
        body: Center(child: Text('Page not found')),
      );
    },
  );

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: router,
    );
  }
}
