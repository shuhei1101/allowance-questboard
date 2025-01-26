import 'package:allowance_questboard/application/quest/quest_detail_editing_data.dart';
import 'package:allowance_questboard/domain/member/member.dart';
import 'package:allowance_questboard/domain/quest/family_quest.dart';
import 'package:allowance_questboard/domain/quest/quest_category.dart';
import 'package:allowance_questboard/domain/quest/quest_participant.dart';
import 'package:flutter/material.dart';

class FamilyQuestEditingData {
  FamilyQuestEditingData({
    required this.id,
    required this.name,
    required this.icon,
    required this.category,
    required this.questLevelDetails,
    required this.isPublic,
    required this.isShared,
    required this.participants,
  });

  factory FamilyQuestEditingData.fromDomain({
    required FamilyQuest familyQuest,
    required QuestCategory questCategory,
    required List<ParticipantEditingData> participants,
    required Map<int, QuestDetailSettingData> questLevelDetails,
  }) {
    return FamilyQuestEditingData(
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

  final String id;
  final String name;
  final Icon icon;
  final String category;
  final bool isPublic;
  final bool isShared;
  final List<ParticipantEditingData> participants;
  // クエストレベルに対するquestDetail
  final Map<int, QuestDetailSettingData> questLevelDetails;
  int get maxLevel => questLevelDetails.length;
}

class ParticipantEditingData {
  ParticipantEditingData({required this.icon});

  factory ParticipantEditingData.fromDomain({required QuestParticipant status, required Member member}) {
    return ParticipantEditingData(icon: member.icon);
  }

  final Icon icon;
}
