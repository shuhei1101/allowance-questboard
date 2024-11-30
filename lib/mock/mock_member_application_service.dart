import 'package:allowance_questboard/application/member/member_application_service.dart';
import 'package:allowance_questboard/domain/member/member_level.dart';
import 'package:flutter/material.dart';

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

class MockMemberApplicationService implements MemberApplicationService {
  @override
  Future<List<MemberData>?> getFamilyMembers(String familyId) async {
    return null;
  }

  @override
  Future<MemberData?> getMember({required String memberId}) async {
    final member = Member(
      id: MemberId("234567"),
      familyId: FamilyId("123456"),
      name: MemberName("123"),
      icon: const Icon(Icons.person),
      birthday: Birthday(DateTime(2020, 1, 1)),
      grade: Grade(Education.elementary, 2),
      exp: MemberExp(111),
      level: MemberLevel(1),
      balance: Money(33),
      minSavings: Money(44),
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    );
    return MemberData(member);
  }
}
