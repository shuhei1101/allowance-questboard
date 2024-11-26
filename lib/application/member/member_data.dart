import 'package:allowance_questboard/domain/member/education.dart';
import 'package:flutter/widgets.dart';

import '../../domain/member/member.dart';

class MemberData {
  MemberData(Member source) {
    id = source.id.value;
    name = source.name.value;
    icon = source.icon;
    birthday = source.birthday.value;
    age = source.age.value;
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
  late int age;
  late String education;
  late int grade;
  late int exp;
  late int balance;
  late int minSavings;

  String get displayGrade => "$education$grade年生";
}
