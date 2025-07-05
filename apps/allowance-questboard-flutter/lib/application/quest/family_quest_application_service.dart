import 'package:allowance_questboard/application/quest/update_family_quest_response.dart';
import 'package:allowance_questboard/application/quest/quest_detail_update_data.dart';
import 'package:allowance_questboard/application/quest/family_quest_data.dart';
import 'package:allowance_questboard/application/quest/quest_detail_data.dart';
import 'package:allowance_questboard/domain/model/family/family_id.dart';
import 'package:allowance_questboard/domain/repository/member/member_repository.dart';
import 'package:allowance_questboard/domain/model/quest/family_quest.dart';
import 'package:allowance_questboard/domain/repository/quest/family_quest_repository.dart';
import 'package:allowance_questboard/domain/repository/quest/quest_category_repository.dart';
import 'package:allowance_questboard/domain/repository/quest/quest_detail_repository.dart';
import 'package:allowance_questboard/domain/model/quest/value_object/quest_id.dart';
import 'package:allowance_questboard/domain/model/quest/quest_participants.dart';
import 'package:get_it/get_it.dart';

/// [FamilyQuest]に関するアプリケーションサービス
class FamilyQuestApplicationService {
  FamilyQuestApplicationService();

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
  /// - Future<[FamilyQuestData]?>: クエスト情報
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
  /// - Future<List<[FamilyQuestData]>>: クエスト情報リスト
  Future<List<FamilyQuestData>> getFamilyQuests(String familyId) async {
    final familyQuests = await _familyQuestRepository.findAll(FamilyId(familyId));
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

  /// 指定したquestIdに対応するクエスト情報を取得する
  /// 存在しない場合はnullを返却
  ///
  /// ### Parameters
  /// - String questId: クエストID
  /// ### Returns
  /// - Future<[UpdateFamilyQuestResponse]?>: クエスト情報
  /// ### Throws
  /// - StateError: クエスト分類が見つからない場合
  Future<FamilyQuestData> _getFamilyQuestData(FamilyQuest familyQuest) async {
    final participantsData = await _participantsToData(familyQuest.participants);
    final questCategory = await _questCategoryRepository.find(familyQuest.categoryId);
    if (questCategory == null)
      throw StateError('Quest category not found for categoryId: ${familyQuest.categoryId}');
    final questDetails = await _getQuestDetailsData(familyQuest.id);
    return FamilyQuestData.fromDomain(
        familyQuest: familyQuest,
        questCategory: questCategory,
        participants: participantsData,
        questLevelDetails: questDetails);
  }

  /// [QuestParticipants]を[ParticipantData]のリストに変換する
  ///
  /// 対象のメンバーが存在しない場合はリストに含めない
  ///
  /// ### Parameters
  /// - [QuestParticipants] participants: クエスト参加者
  /// ### Returns
  /// - Future<List<[ParticipantData]>>: クエスト参加者情報リスト
  Future<List<ParticipantData>> _participantsToData(QuestParticipants participants) async {
    final List<ParticipantData> participantsData = [];
    for (var participant in participants.list) {
      final member = await _memberRepository.find(participant.memberId);
      if (member == null) continue;
      participantsData.add(ParticipantData.fromDomain(status: participant, member: member));
    }
    return participantsData;
  }

  /// 指定した[QuestId]のクエストが持つ詳細情報をマップで取得する
  ///
  /// ### Parameters
  /// - [QuestId] questId: クエストID
  /// ### Returns
  /// - Future<Map<int, [QuestDetailData]>>: クエスト詳細情報
  Future<Map<int, QuestDetailData>> _getQuestDetailsData(QuestId questId) async {
    final questLevelDetails = await _questDetailRepository.find(questId);
    return {
      for (var questLevelDetail in questLevelDetails.map.entries)
        questLevelDetail.key.value: QuestDetailData.fromDomain(questDetail: questLevelDetail.value)
    };
  }

  /// 指定した[questId]に対応する編集用クエスト情報を取得する
  ///
  /// ### Parameters
  /// - String questId: クエストID
  /// ### Returns
  /// - Future<[UpdateFamilyQuestResponse]?>: クエスト情報
  Future<UpdateFamilyQuestResponse?> getEditFamilyQuestData(String questId) async {
    final familyQuest = await _familyQuestRepository.find(QuestId(questId));
    if (familyQuest == null) return null;
    final participantsData = await _participantsToEditingData(familyQuest.participants);
    final questCategory = await _questCategoryRepository.find(familyQuest.categoryId);
    if (questCategory == null)
      throw StateError('Quest category not found for categoryId: ${familyQuest.categoryId}');
    final questDetails = await _getQuestDetailsEditingData(familyQuest.id);
    return UpdateFamilyQuestResponse.fromDomain(
        familyQuest: familyQuest,
        questCategory: questCategory,
        participants: participantsData,
        questLevelDetails: questDetails);
  }

  /// [QuestParticipants]を[UpdateParticipantResponse]のリストに変換する
  /// 対象のメンバーが存在しない場合はリストに含めない
  ///
  /// ### Parameters
  /// - [QuestParticipants] participants: クエスト参加者
  /// ### Returns
  /// - Future<List<[UpdateParticipantResponse]>>: 編集用クエスト参加者情報リスト
  Future<List<UpdateParticipantResponse>> _participantsToEditingData(
      QuestParticipants participants) async {
    final List<UpdateParticipantResponse> participantsData = [];
    for (var participant in participants.list) {
      final member = await _memberRepository.find(participant.memberId);
      if (member == null) continue;
      participantsData
          .add(UpdateParticipantResponse.fromDomain(status: participant, member: member));
    }
    return participantsData;
  }

  /// 指定した[QuestId]のクエストが持つ詳細情報をマップで取得する
  Future<Map<int, QuestDetailResponse>> _getQuestDetailsEditingData(QuestId questId) async {
    final questLevelDetails = await _questDetailRepository.find(questId);
    return {
      for (var questLevelDetail in questLevelDetails.map.entries)
        questLevelDetail.key.value:
            QuestDetailResponse.fromDomain(questDetail: questLevelDetail.value)
    };
  }
}
