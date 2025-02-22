import 'package:allowance_questboard/application/quest/quest_detail_editing_data.dart';
import 'package:allowance_questboard/domain/member/member.dart';
import 'package:allowance_questboard/domain/quest/family_quest.dart';
import 'package:allowance_questboard/domain/quest/quest_category.dart';
import 'package:allowance_questboard/domain/quest/quest_participant.dart';
import 'package:flutter/material.dart';

/// 家族クエストの編集用DTO
class FamilyQuestUpdateData {
  FamilyQuestUpdateData({
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

  /// ドメインモデル[FamilyQuest]から生成するファクトリコンストラクタ
  factory FamilyQuestUpdateData.fromDomain({
    required FamilyQuest familyQuest,
    required QuestCategory questCategory,
    required List<ParticipantUpdateDTO> participants,
    required Map<int, QuestDetailEditingData> questLevelDetails,
  }) {
    return FamilyQuestUpdateData(
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

  /// クエストID
  final String id;

  /// クエスト名
  final String name;

  /// クエストカテゴリ
  final String category;

  /// クエストアイコン
  final Icon icon;

  /// 年齢制限（下限）
  final int? ageFrom;

  /// 年齢制限（上限）
  final int? ageTill;

  /// クエスト開始日
  final DateTime? startedOn;

  /// クエスト終了日
  final DateTime? endedOn;

  /// 公開設定
  final bool isPublic;

  /// 共有設定
  final bool isShared;

  /// 参加者
  final List<ParticipantUpdateDTO> participants;

  /// クエストレベルに対するquestDetail
  final Map<int, QuestDetailEditingData> questLevelDetails;

  /// クエストの最大レベル
  int get maxLevel => questLevelDetails.length;
}

/// 参加者の編集用DTO
class ParticipantUpdateDTO {
  ParticipantUpdateDTO({required this.icon});

  /// ドメインモデル[QuestParticipant]から生成するファクトリコンストラクタ
  factory ParticipantUpdateDTO.fromDomain({required QuestParticipant status, required Member member}) {
    return ParticipantUpdateDTO(icon: member.icon);
  }
  // 参加者のアイコン
  final Icon icon;
}
