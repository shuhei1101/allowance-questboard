import 'package:allowance_questboard/application/quest/quest_data.dart';
import 'package:allowance_questboard/application/quest/quest_detail_data.dart';
import 'package:allowance_questboard/domain/model/member/member.dart';
import 'package:allowance_questboard/domain/model/quest/family_quest.dart';
import 'package:allowance_questboard/domain/model/quest/value_object/quest_category.dart';
import 'package:allowance_questboard/domain/model/quest/quest_participant.dart';
import 'package:flutter/material.dart';

/// [FamilyQuest]の表示用DTO
class FamilyQuestData extends QuestData {
  FamilyQuestData({
    required super.id,
    required super.name,
    required super.icon,
    required super.category,
    required super.questLevelDetails,
    required this.isPublic,
    required this.isShared,
    required this.participants,
  });

  /// ドメインモデル[FamilyQuest]から生成するファクトリコンストラクタ
  factory FamilyQuestData.fromDomain({
    required FamilyQuest familyQuest,
    required QuestCategory questCategory,
    required List<ParticipantData> participants,
    required Map<int, QuestDetailData> questLevelDetails,
  }) {
    return FamilyQuestData(
      id: familyQuest.id.value,
      name: familyQuest.title.value,
      icon: familyQuest.icon,
      category: questCategory.value,
      questLevelDetails: questLevelDetails,
      isPublic: familyQuest.isPublic,
      isShared: familyQuest.isShared,
      participants: participants,
    );
  }

  /// 公開クエストかどうか
  final bool isPublic;

  /// 共有クエストかどうか
  final bool isShared;

  /// 参加者情報リスト
  final List<ParticipantData> participants;
}

/// クエスト参加者の情報[QuestParticipant]の表示用DTO
class ParticipantData {
  ParticipantData({required this.icon});

  /// [QuestParticipant]から[ParticipantData]を生成するファクトリコンストラクタ
  factory ParticipantData.fromDomain({required QuestParticipant status, required Member member}) {
    return ParticipantData(icon: member.icon);
  }

  /// 参加者のアイコン
  final Icon icon;
}
