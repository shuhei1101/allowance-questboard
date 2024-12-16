import 'package:allowance_questboard/domain/quest/key_quests.dart';
import 'package:allowance_questboard/domain/quest/quest_category_id.dart';
import 'package:allowance_questboard/domain/quest/quest_id.dart';
import 'package:allowance_questboard/domain/quest/quest_level_details.dart';
import 'package:allowance_questboard/domain/quest/quest_limited_time_period.dart';
import 'package:allowance_questboard/domain/quest/quest_name.dart';
import 'package:allowance_questboard/domain/quest/quest_release_period.dart';
import 'package:flutter/material.dart';

abstract class Quest {
  Quest(
      {required this.id,
      required this.name,
      required this.categoryId,
      required this.icon,
      required this.releasePeriod,
      required this.limitedTimePeriod,
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
  final QuestReleasePeriod releasePeriod;
  final QuestLimitedTimePeriod limitedTimePeriod;
  final KeyQuests? keyQuests;
  final String client;
  final String missionDescription;
  final QuestLevelDetails levelDetails;
  final DateTime createdAt;
  final DateTime updatedAt;
}
