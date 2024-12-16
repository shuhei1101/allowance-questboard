import 'package:allowance_questboard/application/quest/family_quest_data.dart';
import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/member/member_repository.dart';
import 'package:allowance_questboard/domain/quest/family_quest.dart';
import 'package:allowance_questboard/domain/quest/family_quest_repository.dart';
import 'package:allowance_questboard/domain/quest/quest_participant.dart';
import 'package:get_it/get_it.dart';

class FamilyQuestApplicationService {
  final FamilyQuestRepository _familyQuestRepository = GetIt.I<FamilyQuestRepository>();
  final MemberRepository _memberRepository = GetIt.I<MemberRepository>();

  Future<List<FamilyQuestData?>?> getFamilyQuests(FamilyId familyId) async {
    final familyQuests = await _familyQuestRepository.findAllBy(familyId);
    if (familyQuests == null) return null;
    return Future.wait(familyQuests.map((familyQuest) async {
      return await _getFamilyQuestData(familyQuest);
    }).toList());
  }

  Future<FamilyQuestData?> _getFamilyQuestData(FamilyQuest familyQuest) async {
    final participants = familyQuest.participants;
    if (participants == null) return FamilyQuestData(familyQuest: familyQuest, participants: null);
    final participantsData = await Future.wait(participants.list.map((participant) async {
      return await _getParticipantData(participant);
    }).toList());
    return FamilyQuestData(familyQuest: familyQuest, participants: participantsData);
  }

  Future<ParticipantData?> _getParticipantData(QuestParticipant participant) async {
    final member = await _memberRepository.find(participant.memberId);
    if (member == null) return null;
    return ParticipantData(status: participant, member: member);
  }
}
