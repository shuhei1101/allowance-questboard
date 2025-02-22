import 'package:allowance_questboard/domain/quest/key_quests.dart';
import 'package:allowance_questboard/domain/quest/quest_category_id.dart';
import 'package:allowance_questboard/domain/quest/quest_client.dart';
import 'package:allowance_questboard/domain/quest/quest_description.dart';
import 'package:allowance_questboard/domain/quest/quest_id.dart';
import 'package:allowance_questboard/domain/quest/quest_level_details.dart';
import 'package:allowance_questboard/domain/quest/published_season.dart';
import 'package:allowance_questboard/domain/quest/quest_name.dart';
import 'package:allowance_questboard/domain/quest/age_restriction.dart';
import 'package:flutter/material.dart';

/// クエストドメインモデル
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
      required this.description,
      required this.levelDetails,
      required this.createdAt,
      required this.updatedAt});
  final QuestId id;
  final QuestName name; // クエスト名
  final QuestCategoryId categoryId; // クエスト分類ID
  final Icon icon; // クエストアイコン
  final AgeRestriction ageRestriction; // クエスト受注年齢制限
  final PublishedSeason? publishedSeason; // クエストの公開期間
  final KeyQuests? keyQuests; // キークエスト一覧
  final QuestClient client; // クエスト依頼者名
  final QuestDescription description; // クエストの詳細情報
  final QuestLevelDetails levelDetails; // クエスト詳細とレベルのマップ情報
  final DateTime createdAt;
  final DateTime updatedAt;
}
