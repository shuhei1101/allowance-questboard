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

  /// クエストID
  final QuestId id;

  /// クエスト名
  final QuestName name;

  /// クエスト分類ID
  final QuestCategoryId categoryId;

  /// クエストアイコン
  final Icon icon;

  /// クエスト受注年齢制限
  final AgeRestriction ageRestriction;

  /// クエストの公開期間
  final PublishedSeason? publishedSeason;

  /// キークエスト一覧
  final KeyQuests? keyQuests;

  /// クエスト依頼者名
  final QuestClient client;

  /// クエストの詳細情報
  final QuestDescription description;

  /// クエスト詳細とレベルのマップ情報
  final QuestLevelDetails levelDetails;

  /// クエスト作成日時
  final DateTime createdAt;

  /// クエスト更新日時
  final DateTime updatedAt;
}
