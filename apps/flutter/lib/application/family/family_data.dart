import 'package:allowance_questboard/family/shared/model/family.dart';
import 'package:flutter/material.dart';

/// [Family]の表示用DTO
class FamilyData {
  FamilyData({
    required this.id,
    required this.name,
    required this.icon,
    required this.introduction,
    required this.createdAt,
    required this.updatedAt,
  });

  /// ドメインモデル[Family]から生成するファクトリコンストラクタ
  factory FamilyData.fromDomain(Family source) {
    return FamilyData(
      id: source.id.value,
      name: source.name.value,
      icon: source.icon,
      introduction: source.introduction,
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
    );
  }

  /// 家族ID
  final String id;

  /// 家族名
  final String name;

  /// 家族アイコン
  final Icon icon;

  /// 家族紹介文
  final String introduction;

  /// 作成日時
  final DateTime createdAt;

  /// 更新日時
  final DateTime updatedAt;
}
