import 'package:allowance_questboard/domain/member/member.dart';
import 'package:allowance_questboard/domain/quest/family_quest.dart';
import 'package:allowance_questboard/domain/quest/quest_participant.dart';
import 'package:flutter/material.dart';

class FamilyQuestData {
  FamilyQuestData({
    required this.id,
    required this.name,
    required this.icon,
    required this.isPublic,
    required this.isShared,
    required this.participants,
  });

  factory FamilyQuestData.fromDomain({required FamilyQuest familyQuest, required List<ParticipantData> participants}) {
    return FamilyQuestData(
      id: familyQuest.id.value,
      name: familyQuest.name.value,
      icon: familyQuest.icon,
      isPublic: familyQuest.isPublic,
      isShared: familyQuest.isShared,
      participants: participants,
    );
  }

  final String id;
  final String name;
  final Icon icon;
  final bool isPublic;
  final bool isShared;
  final List<ParticipantData> participants;
}

class ParticipantData {
  ParticipantData({required this.icon});

  factory ParticipantData.fromDomain({required QuestParticipant status, required Member member}) {
    return ParticipantData(icon: member.icon);
  }

  final Icon icon;
}
