import 'package:allowance_questboard/domain/member/member.dart';
import 'package:allowance_questboard/domain/quest/family_quest.dart';
import 'package:allowance_questboard/domain/quest/quest_member_status.dart';
import 'package:flutter/material.dart';

class FamilyQuestData {
  FamilyQuestData({required FamilyQuest familyQuest, required this.participants})
      : name = familyQuest.name.value,
        icon = familyQuest.icon,
        isPublic = familyQuest.isPublic,
        isShared = familyQuest.isShared;

  final String name;
  final Icon icon;
  final bool isPublic;
  final bool isShared;
  final List<ParticipantData?> participants;
}

class ParticipantData {
  ParticipantData({required QuestMemberStatus status, required Member member}) : icon = member.icon;
  final Icon icon;
}
