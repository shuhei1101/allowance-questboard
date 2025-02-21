import 'package:allowance_questboard/domain/family/family.dart';
import 'package:flutter/material.dart';

/// [Family]のDTO
class FamilyData {
  FamilyData({
    required this.id,
    required this.name,
    required this.icon,
    required this.introduction,
    required this.createdAt,
    required this.updatedAt,
  });

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

  final String id;
  final String name;
  final Icon icon;
  final String introduction; // 家族紹介文
  final DateTime createdAt;
  final DateTime updatedAt;
}
