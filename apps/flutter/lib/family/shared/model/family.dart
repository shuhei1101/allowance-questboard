import 'package:flutter/material.dart';

import 'package:allowance_questboard/domain/model/family/family_id.dart';
import 'package:allowance_questboard/domain/model/family/family_name.dart';

/// 家族ドメインモデル
class Family {
  Family(
      {required this.id,
      required this.name,
      required this.icon,
      required this.introduction,
      required this.createdAt,
      required this.updatedAt});

  /// 家族ID
  final FamilyId id;

  /// 家族名
  final FamilyName name;

  /// 家族アイコン
  final Icon icon;

  /// 家族紹介文
  final String introduction;

  /// 作成日時
  final DateTime createdAt;

  /// 更新日時
  final DateTime updatedAt;

  static fromJson(e) {}
}
