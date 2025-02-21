import 'package:allowance_questboard/domain/member/education.dart';
import 'package:allowance_questboard/domain/member/member.dart';
import 'package:flutter/widgets.dart';

/// MemberクラスのDTO
class MemberData {
  MemberData(
      {required this.id,
      required this.name,
      required this.icon,
      required this.birthday,
      required this.age,
      required this.education,
      required this.grade,
      required this.exp,
      required this.balance,
      required this.minSavings});

  factory MemberData.fromDomain(Member source) {
    return MemberData(
      id: source.id.value,
      name: source.name.value,
      icon: source.icon,
      birthday: source.birthday.value,
      age: source.age.value,
      education: source.grade.education.displayName,
      grade: source.grade.grade,
      exp: source.exp.value,
      balance: source.balance.value,
      minSavings: source.minSavings.value,
    );
  }

  final String id;
  final String name;
  final Icon icon;
  final DateTime birthday;
  final int age;
  final String education; // 教育課程
  final int grade; // 学年
  final int exp; // 経験値
  final int balance; // 所持金
  final int minSavings; // 最低貯金額

  // 表示用の学年
  String get displayGrade => "$education$grade年生";
}
