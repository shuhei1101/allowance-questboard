import 'package:allowance_questboard/application/quest/family_quest_application_service.dart';
import 'package:allowance_questboard/application/quest/family_quest_data.dart';
import 'package:allowance_questboard/presentation/component/quest/family_quest_list_view.dart';
import 'package:allowance_questboard/presentation/page/error_page.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

class FamilyQuestsPage extends StatelessWidget {
  FamilyQuestsPage({required this.familyId}) : _service = GetIt.I<FamilyQuestApplicationService>();
  final String familyId;
  final FamilyQuestApplicationService _service;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<FamilyQuestData>>(
        future: _service.getFamilyQuests(familyId),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) Center(child: CircularProgressIndicator());
          if (snapshot.hasError || snapshot.data == null) return ErrorPage();
          final quests = snapshot.data;
          return Scaffold(
              appBar: AppBar(
                title: const Text('クエスト画面'),
                actions: [],
              ),
              body: Column(
                children: [
                  Expanded(
                    child: FamilyQuestListView(quests: quests!, onTap: (str) {}),
                  )
                ],
              )
              // FamilyQuestListView(quests: quests!, onTap: (str) {}),
              );
        });
  }
}
