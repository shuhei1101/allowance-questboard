import 'package:allowance_questboard/application/quest/edit_quest_data.dart';
import 'package:allowance_questboard/application/quest/edit_quest_detail_data.dart';
import 'package:allowance_questboard/domain/member/member.dart';
import 'package:allowance_questboard/domain/quest/family_quest.dart';
import 'package:allowance_questboard/domain/quest/quest_category.dart';
import 'package:allowance_questboard/domain/quest/quest_participant.dart';
import 'package:flutter/material.dart';

class EditFamilyQuestData extends EditQuestData {
  EditFamilyQuestData({
    required super.id,
    required super.name,
    required super.icon,
    required super.category,
    required super.questLevelDetails,
    required this.isPublic,
    required this.isShared,
    required this.participants,
  });

  factory EditFamilyQuestData.fromDomain({
    required FamilyQuest familyQuest,
    required QuestCategory questCategory,
    required List<EditParticipantData> participants,
    required Map<int, EditQuestDetailData> questLevelDetails,
  }) {
    return EditFamilyQuestData(
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
  final List<EditParticipantData> participants;
}

class EditParticipantData {
  EditParticipantData({required this.icon});

  factory EditParticipantData.fromDomain({required QuestParticipant status, required Member member}) {
    return EditParticipantData(icon: member.icon);
  }

  final Icon icon;
}
