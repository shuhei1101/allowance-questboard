import 'package:allowance_questboard/application/quest/quest_data.dart';
import 'package:allowance_questboard/application/quest/quest_detail_data.dart';
import 'package:allowance_questboard/domain/member/member.dart';
import 'package:allowance_questboard/domain/quest/family_quest.dart';
import 'package:allowance_questboard/domain/quest/quest_category.dart';
import 'package:allowance_questboard/domain/quest/quest_participant.dart';
import 'package:flutter/material.dart';

/// [FamilyQuest]のDTO
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

  factory FamilyQuestData.fromDomain({
    required FamilyQuest familyQuest,
    required QuestCategory questCategory,
    required List<ParticipantData> participants,
    required Map<int, QuestDetailData> questLevelDetails,
  }) {
    return FamilyQuestData(
      id: familyQuest.id.value,
      name: familyQuest.name.value,
      icon: familyQuest.icon,
      category: questCategory.value,
      questLevelDetails: questLevelDetails,
      isPublic: familyQuest.isPublic,
      isShared: familyQuest.isShared,
      participants: participants,
    );
  }

  final bool isPublic; // 公開クエストかどうか
  final bool isShared; // 共有クエストかどうか
  final List<ParticipantData> participants; // 参加者情報リスト
}

/// [QuestParticipant]のDTO
///
/// クエスト参加者の情報をまとめたDTO
class ParticipantData {
  ParticipantData({required this.icon});

  factory ParticipantData.fromDomain({required QuestParticipant status, required Member member}) {
    return ParticipantData(icon: member.icon);
  }

  final Icon icon; // 参加者のアイコン
}
