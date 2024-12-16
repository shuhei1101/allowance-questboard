import 'package:allowance_questboard/application/quest/family_quest_data.dart';
import 'package:flutter/material.dart';

class FamilyQuestListView extends StatelessWidget {
  const FamilyQuestListView({required this.quests, required this.onTap, super.key});

  final List<FamilyQuestData> quests;
  final Function(String questId) onTap;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 10.0),
      child: ListView.builder(
        itemCount: quests.length,
        itemBuilder: (context, index) {
          final quest = quests[index];
          return Padding(
              padding: EdgeInsets.only(bottom: 5),
              child: Card(
                clipBehavior: Clip.antiAlias,
                child: InkWell(
                  onTap: () => onTap(quest.id),
                  child: Padding(
                    padding: EdgeInsets.only(bottom: 10, left: 10, right: 10),
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            quest.icon,
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(quest.name),
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            // メンバーのアイコンを表示
                            Row(
                              children: [
                                if (quest.participants != null)
                                  for (final participant in quest.participants!)
                                    if (participant != null)
                                      Padding(
                                        padding: EdgeInsets.only(right: 5),
                                        child: participant.icon,
                                      ),
                                // 共有アイコンを表示（共有済みなら青の地球儀マーク）
                                Icon(
                                  Icons.public,
                                  color: quest.isShared ? Colors.blue : Colors.grey,
                                ),
                              ],
                            )
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ));
        },
      ),
    );
  }
}
