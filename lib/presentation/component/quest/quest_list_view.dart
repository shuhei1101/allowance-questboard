import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class QuestListView extends StatelessWidget {
  const QuestListView({required this.quests, required this.onTap, super.key});

  final List<QuestData> quests;
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
                      children: [row],
                    ),
                  ),
                ),
              ));
        },
      ),
    );
  }
}
