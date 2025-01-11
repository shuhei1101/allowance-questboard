import 'package:allowance_questboard/domain/family/family.dart';
import 'package:flutter/material.dart';

class FamilyData {
  FamilyData(Family source)
      : id = source.id.value,
        name = source.name.value,
        icon = source.icon,
        introduction = source.introduction,
        createdAt = source.createdAt,
        updatedAt = source.updatedAt;

  final String id;
  final String name;
  final Icon icon;
  final String introduction;
  final DateTime createdAt;
  final DateTime updatedAt;
}
