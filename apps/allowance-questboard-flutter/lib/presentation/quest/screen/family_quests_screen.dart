import 'package:allowance_questboard/application/quest/family_quest_data.dart';
import 'package:flutter/material.dart';

class FamilyQuestsScreen extends StatelessWidget {
  /// 家族クエスト一覧画面
  ///
  /// ListViewで家族クエスト一覧を表示する
  /// クエストタップ時には[onTap]コールバックが呼ばれる
  /// [quests]には表示対象の家族クエスト一覧を指定する
  ///
  /// ### クエスト表示の構成
  /// - 上段
  ///   - クエストアイコン
  /// - 中段
  ///   - クエスト名
  /// - 下段
  ///   - クエスト参加者のアイコン
  ///   - 共有アイコン（共有済みなら青の地球儀マーク）
  FamilyQuestsScreen({required this.quests, required this.onTap});

  /// 表示対象の家族クエスト一覧
  final List<FamilyQuestData> quests;

  /// クエストタップ時のコールバック
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
                clipBehavior: Clip.antiAlias, // カードの角を丸くする
                // タップ可能にする
                child: InkWell(
                  onTap: () => onTap(quest.id),
                  child: Padding(
                    padding: EdgeInsets.only(bottom: 10, left: 10, right: 10),
                    child: Column(
                      /// クエストカードの上段、中段、下段を表示
                      children: [
                        _topCard(quest),
                        _middleCard(quest),
                        _bottomCard(quest),
                      ],
                    ),
                  ),
                ),
              ));
        },
      ),
    );
  }

  /// クエストカード上段
  Widget _topCard(FamilyQuestData quest) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        quest.icon,
      ],
    );
  }

  /// クエストカード中段
  Widget _middleCard(FamilyQuestData quest) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(quest.name),
      ],
    );
  }

  /// クエストカード下段
  Widget _bottomCard(FamilyQuestData quest) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Row(
          children: [
            for (final participant in quest.participants)
              Padding(
                padding: EdgeInsets.only(right: 5),
                child: participant.icon,
              ),
          ],
        ),
        // 共有アイコンを表示（共有済みなら青の地球儀マーク）
        Icon(
          Icons.public,
          color: quest.isShared ? Colors.blue : Colors.grey,
        ),
      ],
    );
  }
}
