import 'package:allowance_questboard/application/quest/update_family_quest_response.dart';
import 'package:allowance_questboard/application/quest/quest_detail_update_data.dart';
import 'package:allowance_questboard/application/quest/family_quest_application_service.dart';
import 'package:allowance_questboard/application/quest/family_quest_data.dart';
import 'package:allowance_questboard/presentation/quest/screen/quest_editing_screen.dart';
import 'package:allowance_questboard/presentation/quest/state/edit_family_quest_state_provider.dart';
import 'package:allowance_questboard/shared/page/error_page.dart';
import 'package:allowance_questboard/core/router/app_route.dart';
import 'package:allowance_questboard/core/setup/l10n_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class EditFamilyQuestPage extends HookConsumerWidget {
  EditFamilyQuestPage({required this.questId});

  final String questId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    useMemoized(() => L10nProvider.update(context));
    final notifier = ref.read(editFamilyQuestStateProvider.notifier);
    final state = ref.watch(editFamilyQuestStateProvider);
    final future = useMemoized(() => notifier.getEditFamilyQuestData(questId));

    return FutureBuilder<UpdateFamilyQuestResponse?>(
      future: future,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting)
          return Center(child: CircularProgressIndicator());
        if (snapshot.hasError) return ErrorPage(error: snapshot.error);
        final quest = snapshot.data!;

        return DefaultTabController(
          // TODO: 試験用に1にしているが、最終的には3にする。また、画面は最終的にクラス分割する。
          length: 1,
          child: Scaffold(
              appBar: AppBar(
                title: Text("クエスト編集"),
                bottom: TabBar(
                  tabs: [
                    Tab(text: "一般"),
                  ],
                ),
                actions: [
                  IconButton(
                    icon: Icon(Icons.delete),
                    onPressed: state.isValid ? () {} : null,
                    color: state.isValid ? Colors.red : Colors.grey,
                  ),
                  IconButton(
                    icon: Icon(Icons.preview),
                    onPressed: () {},
                  ),
                  IconButton(
                    icon: Icon(Icons.save),
                    onPressed: () {},
                  ),
                ],
              ),
              body: EditFamilyQuestTab(quest: quest)),
        );
      },
    );
  }
}

class EditFamilyQuestTab extends StatelessWidget {
  const EditFamilyQuestTab({required this.quest});
  final UpdateFamilyQuestResponse quest;

  @override
  Widget build(BuildContext context) {
    return TabBarView(
      children: [
        EditGeneralQuestScreen(
          quest: quest,
        ),
      ],
    );
  }
}

// 動作確認用コード
void main() {
  GetIt.I.registerSingleton<FamilyQuestApplicationService>(
      MockFamilyQuestApplicationService());
  final router =
      GoRouter(initialLocation: '/quest/123/edit', routes: $appRoutes);
  runApp(ProviderScope(
      child: MaterialApp.router(
    routerConfig: router,
  )));
}

class MockFamilyQuestApplicationService
    implements FamilyQuestApplicationService {
  @override
  Future<FamilyQuestData?> getFamilyQuest(String questId) async {
    throw UnimplementedError();
  }

  @override
  Future<List<FamilyQuestData>> getFamilyQuests(String familyId) async {
    throw UnimplementedError();
  }

  @override
  Future<UpdateFamilyQuestResponse?> getEditFamilyQuestData(
      String questId) async {
    return UpdateFamilyQuestResponse(
      id: "123",
      title: "Test Quest",
      icon: Icon(Icons.ac_unit),
      category: "テスト分類",
      isPublic: true,
      isShared: true,
      participants: [
        UpdateParticipantResponse(icon: Icon(Icons.person)),
      ],
      questLevelDetails: {
        1: QuestDetailResponse(
          successCondition: "Complete all tasks",
          failureCondition: "Fail any task",
          targetCount: 10,
          rewards: 12,
          memberExp: 50,
          questExp: 100,
        ),
      },
      ageFrom: 3,
      ageTill: 12,
      startedOn: DateTime.now(),
      endedOn: DateTime.now().add(Duration(days: 7)),
    );
  }
}
