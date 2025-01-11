import 'package:allowance_questboard/application/quest/quest_detail_data.dart';
import 'package:flutter/material.dart';

class QuestData {
  QuestData({
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
  final Map<int, QuestDetailData> questLevelDetails;

  int get maxLevel => questLevelDetails.length;
}
