import 'package:allowance_questboard/application/quest/quest_detail_data.dart';
import 'package:flutter/material.dart';

/// クエストの表示用DTO
class QuestData {
  QuestData({
    required this.id,
    required this.name,
    required this.icon,
    required this.category,
    required this.questLevelDetails,
  });

  /// クエストID
  final String id;

  /// クエスト名
  final String name;

  /// クエストアイコン
  final Icon icon;

  /// クエスト分類
  final String category;

  /// クエストレベルに対応するクエスト詳細情報のマップ
  final Map<int, QuestDetailData> questLevelDetails;

  /// クエストの最大レベル
  int get maxLevel => questLevelDetails.length;
}
