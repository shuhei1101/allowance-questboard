import 'package:allowance_questboard/domain/member/education.dart';
import 'package:allowance_questboard/domain/member/member.dart';
import 'package:flutter/widgets.dart';

class MemberData {
  MemberData(Member source)
      : id = source.id.value,
        name = source.name.value,
        icon = source.icon,
        birthday = source.birthday.value,
        age = source.age.value,
        education = source.grade.education.displayName,
        grade = source.grade.grade,
        exp = source.exp.value,
        balance = source.balance.value,
        minSavings = source.minSavings.value;

  final String id;
  final String name;
  final Icon icon;
  final DateTime birthday;
  final int age;
  final String education;
  final int grade;
  final int exp;
  final int balance;
  final int minSavings;

  String get displayGrade => "$education$grade年生";
}
