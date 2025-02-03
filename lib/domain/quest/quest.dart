import 'package:allowance_questboard/domain/quest/key_quests.dart';
import 'package:allowance_questboard/domain/quest/quest_category_id.dart';
import 'package:allowance_questboard/domain/quest/quest_id.dart';
import 'package:allowance_questboard/domain/quest/quest_level_details.dart';
import 'package:allowance_questboard/domain/quest/published_season.dart';
import 'package:allowance_questboard/domain/quest/quest_name.dart';
import 'package:allowance_questboard/domain/quest/age_restriction.dart';
import 'package:flutter/material.dart';

abstract class Quest {
  Quest(
      {required this.id,
      required this.name,
      required this.categoryId,
      required this.icon,
      required this.ageRestriction,
      required this.publishedSeason,
      required this.keyQuests,
      required this.client,
      required this.missionDescription,
      required this.levelDetails,
      required this.createdAt,
      required this.updatedAt});
  final QuestId id;
  final QuestName name;
  final QuestCategoryId categoryId;
  final Icon icon;
  final AgeRestriction ageRestriction;
  final PublishedSeason? publishedSeason;
  final KeyQuests? keyQuests;
  final String client;
  final String missionDescription;
  final QuestLevelDetails levelDetails;
  final DateTime createdAt;
  final DateTime updatedAt;
}
