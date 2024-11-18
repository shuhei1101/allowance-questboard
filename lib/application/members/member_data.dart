import 'package:allowance_questboard/domain/members/education.dart';
import 'package:flutter/widgets.dart';

import '../../domain/members/member.dart';

class MemberData {
  MemberData(Member source) {
    id = source.id.value;
    name = source.name.value;
    icon = source.icon;
    birthday = source.birthday.date;
    education = source.grade.education.displayName;
    grade = source.grade.grade;
    exp = source.exp.value;
    balance = source.balance.value;
    minSavings = source.minSavings.value;
  }

  late String id;
  late String name;
  late Icon icon;
  late DateTime birthday;
  late String education;
  late int grade;
  late int exp;
  late int balance;
  late int minSavings;
}
