import 'package:flutter/material.dart';

import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/family/family_name.dart';

class Family {
  final FamilyId id;
  final FamilyName name;
  final Icon icon;
  final String introduction;
  final DateTime createdAt;
  final DateTime updatedAt;
  Family(this.id, this.name, this.icon, this.introduction, this.createdAt, this.updatedAt);
}
