import 'package:allowance_questboard/domain/model/family/family_id.dart';
import 'package:allowance_questboard/domain/model/shared/age.dart';
import 'package:allowance_questboard/domain/model/shared/birthday.dart';
import 'package:allowance_questboard/domain/model/shared/money.dart';
import 'package:flutter/material.dart';

import 'value_object/grade.dart';
import 'value_object/member_exp.dart';
import 'value_object/member_id.dart';
import 'value_object/member_name.dart';

/// 家族メンバーのドメインモデル
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

  /// メンバーID
  final MemberId id;

  /// 属する家族ID
  final FamilyId familyId;

  /// メンバー名
  final MemberName name;

  /// メンバーのアイコン
  final Icon icon;

  /// 誕生日
  final Birthday birthday;

  /// 教育課程名と年数
  final Grade grade;

  /// 経験値
  final MemberExp exp;

  /// 残高
  final Money balance;

  /// 最低貯金額
  final Money minSavings;

  /// 作成日時
  final DateTime createdAt;

  /// 更新日時
  final DateTime updatedAt;

  /// 年齢
  ///
  /// 誕生日から現在日時を引いて年齢を計算する
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
