import 'package:allowance_questboard/application/quest/family_quest_editing_data.dart';
import 'package:allowance_questboard/application/quest/quest_detail_editing_data.dart';
import 'package:allowance_questboard/application/quest/family_quest_data.dart';
import 'package:allowance_questboard/application/quest/quest_detail_data.dart';
import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/member/member_repository.dart';
import 'package:allowance_questboard/domain/quest/family_quest.dart';
import 'package:allowance_questboard/domain/quest/family_quest_repository.dart';
import 'package:allowance_questboard/domain/quest/quest_category_repository.dart';
import 'package:allowance_questboard/domain/quest/quest_detail_repository.dart';
import 'package:allowance_questboard/domain/quest/quest_id.dart';
import 'package:allowance_questboard/domain/quest/quest_participants.dart';
import 'package:get_it/get_it.dart';

/// [FamilyQuest]に関するアプリケーションサービス
class FamilyQuestApplicationService {
  final FamilyQuestRepository _familyQuestRepository = GetIt.I<FamilyQuestRepository>();
  final MemberRepository _memberRepository = GetIt.I<MemberRepository>();
  final QuestDetailRepository _questDetailRepository = GetIt.I<QuestDetailRepository>();
  final QuestCategoryRepository _questCategoryRepository = GetIt.I<QuestCategoryRepository>();

  /// 指定した[questId]に対応するクエスト情報を取得する
  /// 存在しない場合はnullを返却
  ///
  /// ### Parameters
  /// - String questId: クエストID
  /// ### Returns
  /// - Future<FamilyQuestData?>: クエスト情報
  Future<FamilyQuestData?> getFamilyQuest(String questId) async {
    final familyQuest = await _familyQuestRepository.find(QuestId(questId));
    if (familyQuest == null) return null;
    return await _getFamilyQuestData(familyQuest);
  }

  /// 指定した[familyId]に対応するクエスト情報リストを取得する \
  /// 存在しない場合は空のリストを返却
  ///
  /// ### Parameters
  /// - String familyId: 家族ID
  /// ### Returns
  /// - Future<List<FamilyQuestData>>: クエスト情報リスト
  Future<List<FamilyQuestData>> getFamilyQuests(String familyId) async {
    final familyQuests = await _familyQuestRepository.findAllBy(FamilyId(familyId));
    List<FamilyQuestData> familyQuestsData = [];
    for (var familyQuest in familyQuests ?? []) {
      late FamilyQuestData quest;
      try {
        quest = await _getFamilyQuestData(familyQuest);
        familyQuestsData.add(quest);
      } on StateError {
        // クエスト分類が見つからない場合
        continue;
      }
    }
    return familyQuestsData;
  }

  Future<FamilyQuestData> _getFamilyQuestData(FamilyQuest familyQuest) async {
    final participantsData = await _getParticipantsData(familyQuest.participants);
    final questCategory = await _questCategoryRepository.find(familyQuest.categoryId);
    if (questCategory == null) throw StateError('Quest category not found for categoryId: ${familyQuest.categoryId}');
    final questDetails = await _getQuestDetailsData(familyQuest.id);
    return FamilyQuestData.fromDomain(familyQuest: familyQuest, questCategory: questCategory, participants: participantsData, questLevelDetails: questDetails);
  }

  Future<List<ParticipantData>> _getParticipantsData(QuestParticipants participants) async {
    final List<ParticipantData> participantsData = [];
    for (var participant in participants.list) {
      final member = await _memberRepository.find(participant.memberId);
      if (member == null) continue;
      participantsData.add(ParticipantData.fromDomain(status: participant, member: member));
    }
    return participantsData;
  }

  Future<Map<int, QuestDetailData>> _getQuestDetailsData(QuestId questId) async {
    final questLevelDetails = await _questDetailRepository.find(questId);
    return {for (var questLevelDetail in questLevelDetails.map.entries) questLevelDetail.key.value: QuestDetailData.fromDomain(questDetail: questLevelDetail.value)};
  }

  Future<FamilyQuestEditingData?> getFamilyQuestEditingData(String questId) async {
    final familyQuest = await _familyQuestRepository.find(QuestId(questId));
    if (familyQuest == null) return null;
    final participantsData = await _getParticipantEditingData(familyQuest.participants);
    final questCategory = await _questCategoryRepository.find(familyQuest.categoryId);
    if (questCategory == null) throw StateError('Quest category not found for categoryId: ${familyQuest.categoryId}');
    final questDetails = await _getQuestDetailsEditingData(familyQuest.id);
    return FamilyQuestEditingData.fromDomain(familyQuest: familyQuest, questCategory: questCategory, participants: participantsData, questLevelDetails: questDetails);
  }

  Future<List<ParticipantEditingData>> _getParticipantEditingData(QuestParticipants participants) async {
    final List<ParticipantEditingData> participantsData = [];
    for (var participant in participants.list) {
      final member = await _memberRepository.find(participant.memberId);
      if (member == null) continue;
      participantsData.add(ParticipantEditingData.fromDomain(status: participant, member: member));
    }
    return participantsData;
  }

  Future<Map<int, QuestDetailSettingData>> _getQuestDetailsEditingData(QuestId questId) async {
    final questLevelDetails = await _questDetailRepository.find(questId);
    return {for (var questLevelDetail in questLevelDetails.map.entries) questLevelDetail.key.value: QuestDetailSettingData.fromDomain(questDetail: questLevelDetail.value)};
  }
}
