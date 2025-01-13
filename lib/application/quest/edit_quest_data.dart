import 'package:allowance_questboard/application/quest/edit_quest_detail_data.dart';
import 'package:flutter/material.dart';

class EditQuestData {
  EditQuestData({
    required this.id,
    required this.name,
    required this.icon,
    required this.category,
    required this.questLevelDetails,
  });
  final String id;
  final String name;
  final Icon icon;
  final String category;
  // クエストレベルに対するquestDetail
  final Map<int, EditQuestDetailData> questLevelDetails;

  int get maxLevel => questLevelDetails.length;
}
