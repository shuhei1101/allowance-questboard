import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/shared/age.dart';
import 'package:allowance_questboard/domain/shared/birthday.dart';
import 'package:allowance_questboard/domain/shared/money.dart';
import 'package:flutter/material.dart';

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
      required this.updatedAt});

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

  Age get age {
    final DateTime today = DateTime.now();
    final DateTime birthDate = birthday.value;
    int rawAge = today.year - birthDate.year;

    // 誕生日がまだ来ていない場合は1歳引く
    if (today.month < birthDate.month || (today.month == birthDate.month && today.day < birthDate.day)) {
      rawAge--;
    }

    return Age(rawAge);
  }

  // // リポジトリ側で実装する
  // MemberLevel getLevel(Map<MemberLevel, MemberExp> map) {
  //   for (var entry in map.entries) {
  //     if (exp.value >= entry.value.value) {
  //       return entry.key;
  //     }
  //   }
  //   // どのレベルにも一致しない場合、レベル1を返却
  //   return MemberLevel(1);
  // }
}
