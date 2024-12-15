import 'package:allowance_questboard/application/quest/family_quest_data.dart';
import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/member/member_repository.dart';
import 'package:allowance_questboard/domain/quest/family_quest.dart';
import 'package:allowance_questboard/domain/quest/family_quest_repository.dart';
import 'package:allowance_questboard/domain/quest/quest_member_statuses.dart';
import 'package:get_it/get_it.dart';

class FamilyQuestApplicationService {
  final FamilyQuestRepository _familyQuestRepository = GetIt.I<FamilyQuestRepository>();
  final MemberRepository _memberRepository = GetIt.I<MemberRepository>();

  Future<List<FamilyQuestData?>?> getFamilyQuests(FamilyId familyId) async {
    final familyQuests = await _familyQuestRepository.findAllBy(familyId);
    if (familyQuests == null) return null;

    return Future.wait(familyQuests.map((familyQuest) async {
      final memberStatuses = familyQuest.memberStatuses;
      if (memberStatuses == null) return null;

      final participants = await _getParticipants(memberStatuses);
      return FamilyQuestData(familyQuest: familyQuest, participants: participants);
    }).toList());
  }

  Future<List<ParticipantData?>> _getParticipants(QuestMemberStatuses memberStatuses) async {
    return Future.wait(memberStatuses.list.map((memberStatus) async {
      final member = await _memberRepository.find(memberStatus.memberId);
      if (member == null) return null;
      return ParticipantData(status: memberStatus, member: member);
    }).toList());
  }
}

extension on List<FamilyQuest> {
  get membersStatuses => null;
}
