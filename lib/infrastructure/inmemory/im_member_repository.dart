import 'package:flutter/material.dart';

import '../../domain/families/family_id.dart';
import '../../domain/members/education.dart';
import '../../domain/members/grade.dart';
import '../../domain/members/member.dart';
import '../../domain/members/member_exp.dart';
import '../../domain/members/member_id.dart';
import '../../domain/members/member_name.dart';
import '../../domain/members/member_repository.dart';
import '../../domain/shared/birthday.dart';
import '../../domain/shared/money.dart';

class InMemoryMemberRepository implements MemberRepository {
  @override
  Member? find(MemberId memberId) {
    return Member(
      id: MemberId("123456"),
      familyId: FamilyId("123456"),
      name: MemberName("Alice"),
      icon: const Icon(Icons.person),
      birthday: Birthday(DateTime(1990, 1, 1)),
      grade: Grade(Education.elementary, 2),
      exp: MemberExp(11),
      balance: Money(10),
      minSavings: Money(10),
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    );
  }

  @override
  List<Member>? findMembersBy(FamilyId familyId) {
    return [
      Member(
        id: MemberId("123456"),
        familyId: FamilyId("123456"),
        name: MemberName("Alice"),
        icon: const Icon(Icons.person),
        birthday: Birthday(DateTime(1990, 1, 1)),
        grade: Grade(Education.elementary, 2),
        exp: MemberExp(11),
        balance: Money(10),
        minSavings: Money(10),
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      ),
      Member(
        id: MemberId("234567"),
        familyId: FamilyId("123456"),
        name: MemberName("Bob"),
        icon: const Icon(Icons.person),
        birthday: Birthday(DateTime(1990, 1, 1)),
        grade: Grade(Education.elementary, 2),
        exp: MemberExp(111),
        balance: Money(33),
        minSavings: Money(44),
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      ),
    ];
  }
}
