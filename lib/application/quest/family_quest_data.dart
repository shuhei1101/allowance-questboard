import 'package:allowance_questboard/domain/member/member.dart';
import 'package:allowance_questboard/domain/quest/family_quest.dart';
import 'package:allowance_questboard/domain/quest/quest_participant.dart';
import 'package:flutter/material.dart';

class FamilyQuestData {
  FamilyQuestData({required FamilyQuest familyQuest, required this.participants})
      : id = familyQuest.id.value,
        name = familyQuest.name.value,
        icon = familyQuest.icon,
        isPublic = familyQuest.isPublic,
        isShared = familyQuest.isShared;

  final String id;
  final String name;
  final Icon icon;
  final bool isPublic;
  final bool isShared;
  final List<ParticipantData?>? participants;
}

class ParticipantData {
  ParticipantData({required QuestParticipant status, required Member member}) : icon = member.icon;
  final Icon icon;
}
