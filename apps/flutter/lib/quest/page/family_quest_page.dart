import 'package:allowance_questboard/application/quest/update_family_quest_response.dart';
import 'package:allowance_questboard/application/quest/family_quest_application_service.dart';
import 'package:allowance_questboard/application/quest/family_quest_data.dart';
import 'package:allowance_questboard/application/quest/quest_detail_data.dart';
import 'package:allowance_questboard/presentation/quest/screen/quest_detail_screen.dart';
import 'package:allowance_questboard/shared/page/error_page.dart';
import 'package:allowance_questboard/core/router/app_route.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

class FamilyQuestPage extends StatelessWidget {
  /// 家族クエストの詳細画面
  FamilyQuestPage({required this.questId})
      : _service = GetIt.I<FamilyQuestApplicationService>();

  /// 表示対象のクエストID
  final String questId;
  final FamilyQuestApplicationService _service;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<FamilyQuestData?>(
      // 画面表示時にクエスト情報を取得
      future: _service.getFamilyQuest(questId),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting)
          Center(
            child: CircularProgressIndicator(),
          );
        if (snapshot.hasError || snapshot.data == null)
          return ErrorPage(error: snapshot.error);
        final familyQuest = snapshot.data!;

        // クエスト情報を取得できた場合、詳細画面を表示
        return Scaffold(
          appBar: AppBar(
            title: Text(familyQuest.name),
          ),
          body: Column(
            children: [
              Expanded(
                child: QuestDetailScreen(
                  quest: familyQuest,
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}

// 動作確認用コード
void main() {
  GetIt.I.registerSingleton<FamilyQuestApplicationService>(
      MockFamilyQuestApplicationService());
  final router = GoRouter(initialLocation: '/quest/123', routes: $appRoutes);
  runApp(MaterialApp.router(
    routerConfig: router,
  ));
}

class MockFamilyQuestApplicationService
    implements FamilyQuestApplicationService {
  @override
  Future<FamilyQuestData?> getFamilyQuest(String questId) async {
    return FamilyQuestData(
      id: "123",
      name: "Test Quest",
      icon: Icon(Icons.person),
      isPublic: true,
      isShared: true,
      category: 'テスト分類',
      participants: [
        ParticipantData(icon: Icon(Icons.person)),
      ],
      questLevelDetails: {
        1: QuestDetailData(
            successCondition: "successCondition1",
            failureCondition: "failureCondition2",
            targetCount: 1,
            rewards: 1,
            memberExp: 1,
            questExp: 1),
        2: QuestDetailData(
            successCondition: "successCondition2",
            failureCondition: "failureCondition2",
            targetCount: 1,
            rewards: 1,
            memberExp: 1,
            questExp: 1)
      },
    );
  }

  @override
  Future<List<FamilyQuestData>> getFamilyQuests(String familyId) {
    //
    throw UnimplementedError();
  }

  @override
  Future<UpdateFamilyQuestResponse?> getEditFamilyQuestData(String questId) {
    throw UnimplementedError();
  }
}
