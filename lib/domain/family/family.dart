import 'package:flutter/material.dart';

import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/family/family_name.dart';

/// 家族ドメインモデル
class Family {
  Family(this.id, this.name, this.icon, this.introduction, this.createdAt, this.updatedAt);
  final FamilyId id; // 家族ID
  final FamilyName name; // 家族名
  final Icon icon; // 家族アイコン
  final String introduction; // 家族紹介文
  final DateTime createdAt; // 作成日時
  final DateTime updatedAt; // 更新日時
}
