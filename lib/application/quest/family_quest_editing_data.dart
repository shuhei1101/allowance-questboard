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
    required this.category,
    required this.icon,
    required this.ageFrom,
    required this.ageTill,
    required this.startedOn,
    required this.endedOn,
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
      category: questCategory.value,
      icon: familyQuest.icon,
      ageFrom: familyQuest.ageRestriction.ageFrom?.value,
      ageTill: familyQuest.ageRestriction.ageTill?.value,
      startedOn: familyQuest.publishedSeason?.startedOn,
      endedOn: familyQuest.publishedSeason?.endedOn,
      questLevelDetails: questLevelDetails,
      isPublic: familyQuest.isPublic,
      isShared: familyQuest.isShared,
      participants: participants,
    );
  }

  final String id;
  final String name;
  final String category;
  final Icon icon;
  final int? ageFrom;
  final int? ageTill;
  final DateTime? startedOn;
  final DateTime? endedOn;
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
