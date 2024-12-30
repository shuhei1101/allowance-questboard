import 'package:allowance_questboard/application/quest/family_quest_data.dart';
import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/member/member_repository.dart';
import 'package:allowance_questboard/domain/quest/family_quest.dart';
import 'package:allowance_questboard/domain/quest/family_quest_repository.dart';
import 'package:get_it/get_it.dart';

class FamilyQuestApplicationService {
  final FamilyQuestRepository _familyQuestRepository = GetIt.I<FamilyQuestRepository>();
  final MemberRepository _memberRepository = GetIt.I<MemberRepository>();

  Future<List<FamilyQuestData>> getFamilyQuests(String familyId) async {
    final familyQuests = await _familyQuestRepository.findAllBy(FamilyId(familyId));
    List<FamilyQuestData> familyQuestsData = [];
    for (var familyQuest in familyQuests ?? []) {
      final quest = await _getFamilyQuestData(familyQuest);
      familyQuestsData.add(quest);
    }
    return familyQuestsData;
  }

  Future<FamilyQuestData> _getFamilyQuestData(FamilyQuest familyQuest) async {
    final participants = familyQuest.participants;
    final List<ParticipantData> participantsData = [];
    for (var participant in participants.list) {
      final member = await _memberRepository.find(participant.memberId);
      if (member == null) continue;
      participantsData.add(ParticipantData.fromDomain(status: participant, member: member));
    }
    return FamilyQuestData.fromDomain(familyQuest: familyQuest, participants: participantsData);
  }
}
