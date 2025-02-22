import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/shared/age.dart';
import 'package:allowance_questboard/domain/shared/birthday.dart';
import 'package:allowance_questboard/domain/shared/money.dart';
import 'package:flutter/material.dart';

import 'grade.dart';
import 'member_exp.dart';
import 'member_id.dart';
import 'member_name.dart';

/// 家族メンバードメインモデル
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

  final MemberId id; // メンバーID
  final FamilyId familyId; // 属する家族ID
  final MemberName name; // メンバー名
  final Icon icon; // メンバーのアイコン
  final Birthday birthday; // 誕生日
  final Grade grade; // 教育課程名と年数
  final MemberExp exp; // 経験値
  final Money balance; // 残高
  final Money minSavings; // 最低貯金額
  final DateTime createdAt; // 作成日時
  final DateTime updatedAt; // 更新日時

  // 年齢
  Age get age {
    final DateTime today = DateTime.now();
    final DateTime birthDate = birthday.value;
    int rawAge = today.year - birthDate.year;

    if (today.month < birthDate.month || (today.month == birthDate.month && today.day < birthDate.day)) {
      // 誕生日がまだ来ていない場合は1歳引く
      rawAge--;
    }

    return Age(rawAge);
  }

  // TODO: MemberProfileアプリケーションサービスで実装する
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
