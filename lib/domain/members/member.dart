import 'package:flutter/material.dart';

import '../families/family_id.dart';
import '../shared/birthday.dart';
import '../shared/money.dart';
import 'grade.dart';
import 'member_exp.dart';
import 'member_id.dart';
import 'member_name.dart';

class Member {
  Member(
      {required this.id,
      required this.familyId,
      required this.name,
      required this.icon,
      required this.birthday,
      required this.grade,
      required this.exp,
      required this.balance,
      required this.minSavings,
      required this.createdAt,
      required this.updatedAt
    }
  );

  final MemberId id;
  final FamilyId familyId;
  final MemberName name;
  final Icon icon;
  final Birthday birthday;
  final Grade grade;
  final MemberExp exp;
  final Money balance;
  final Money minSavings;
  final DateTime createdAt;
  final DateTime updatedAt;
}
