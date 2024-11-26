import 'package:flutter/material.dart';

import '../../domain/family/family.dart';

class FamilyData {
  FamilyData(Family source) {
    id = source.id.value;
    name = source.name.value;
    icon = source.icon;
    introduction = source.introduction;
    createdAt = source.createdAt;
    updatedAt = source.updatedAt;
  }

  late String id;
  late String name;
  late Icon icon;
  late String introduction;
  late DateTime createdAt;
  late DateTime updatedAt;
}
