import 'package:allowance_questboard/domain/model/member/value_object/education.dart';
import 'package:allowance_questboard/domain/model/member/member.dart';
import 'package:flutter/widgets.dart';

/// [Member]クラスの表示用DTO
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

  /// ドメインモデル[Member]から生成するファクトリコンストラクタ
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

  /// メンバーID
  final String id;

  /// メンバー名
  final String name;

  /// メンバーアイコン
  final Icon icon;

  /// 誕生日
  final DateTime birthday;

  /// 年齢
  final int age;

  /// 教育課程
  final String education;

  /// 学年
  final int grade;

  /// 経験値
  final int exp;

  /// 所持金
  final int balance;

  /// 最低貯金額
  final int minSavings;

  /// 表示用の学年
  String get displayGrade => "$education$grade年生";
}
