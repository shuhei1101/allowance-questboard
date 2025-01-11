import 'package:allowance_questboard/application/member/member_application_service.dart';
import 'package:allowance_questboard/presentation/router/app_route.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

import 'package:allowance_questboard/application/member/member_data.dart';
import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/member/education.dart';
import 'package:allowance_questboard/domain/member/grade.dart';
import 'package:allowance_questboard/domain/member/member.dart';
import 'package:allowance_questboard/domain/member/member_exp.dart';
import 'package:allowance_questboard/domain/member/member_id.dart';
import 'package:allowance_questboard/domain/member/member_name.dart';
import 'package:allowance_questboard/domain/shared/birthday.dart';
import 'package:allowance_questboard/domain/shared/money.dart';

void main() {
  GetIt.I.registerFactory<MemberApplicationService>(() => MockMemberApplicationService());
  runApp(TestMemberPage());
}

class TestMemberPage extends StatelessWidget {
  final router = GoRouter(initialLocation: '/members/:testFamilyId/member/:testMemberId', routes: $appRoutes);

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(routerConfig: router);
  }
}

class MockMemberApplicationService implements MemberApplicationService {
  @override
  Future<List<MemberData>?> getFamilyMembers(String familyId) async {
    return null;
  }

  @override
  Future<MemberData?> getMember(String memberId) async {
    final member = Member(
      id: MemberId("234567"),
      familyId: FamilyId("123456"),
      name: MemberName("alice"),
      icon: const Icon(Icons.person),
      birthday: Birthday(DateTime(2020, 1, 1)),
      grade: Grade(Education.elementary, 2),
      exp: MemberExp(111),
      balance: Money(33),
      minSavings: Money(44),
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    );
    return MemberData(member);
  }
}
