import 'package:allowance_questboard/application/quest/edit_quest_data.dart';
import 'package:allowance_questboard/application/quest/edit_quest_detail_data.dart';
import 'package:allowance_questboard/domain/member/member.dart';
import 'package:allowance_questboard/domain/quest/family_quest.dart';
import 'package:allowance_questboard/domain/quest/quest_category.dart';
import 'package:allowance_questboard/domain/quest/quest_participant.dart';
import 'package:flutter/material.dart';

class FamilyQuestEditingData extends EditQuestData {
  FamilyQuestEditingData({
    required super.id,
    required super.name,
    required super.icon,
    required super.category,
    required super.questLevelDetails,
    required this.isPublic,
    required this.isShared,
    required this.participants,
  });

  factory FamilyQuestEditingData.fromDomain({
    required FamilyQuest familyQuest,
    required QuestCategory questCategory,
    required List<ParticipantEditingData> participants,
    required Map<int, QuestEditingDetailData> questLevelDetails,
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

  final bool isPublic;
  final bool isShared;
  final List<ParticipantEditingData> participants;
}

class ParticipantEditingData {
  ParticipantEditingData({required this.icon});

  factory ParticipantEditingData.fromDomain({required QuestParticipant status, required Member member}) {
    return ParticipantEditingData(icon: member.icon);
  }

  final Icon icon;
}
