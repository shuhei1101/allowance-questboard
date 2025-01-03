import 'package:allowance_questboard/application/quest/quest_data.dart';
import 'package:allowance_questboard/application/quest/quest_detail_data.dart';
import 'package:allowance_questboard/presentation/component/quest/quest_levels_icon.dart';
import 'package:allowance_questboard/presentation/component/shared/setting_entry.dart';
import 'package:flutter/material.dart';

class QuestDetailPageView extends StatefulWidget {
  QuestDetailPageView({required this.quest});
  final QuestData quest;

  @override
  State<StatefulWidget> createState() => _QuestDetailPageViewState();
}

class _QuestDetailPageViewState extends State<QuestDetailPageView> implements QuestLevelsIconDelegate {
  late List<Widget> _pages;
  final PageController _pageController = PageController();
  int _currentPage = 0;
  int _currentLevel = 1;

  void toLevel(int level) {
    setState(() {
      _currentLevel = level;
    });
  }

  void _toPage(int page) {
    if (page < 0) page = _pages.length - 1;
    if (page > _pages.length - 1) page = 0;
    _pageController.animateToPage(page, duration: Duration(milliseconds: 300), curve: Curves.easeInOut);
    setState(() => _currentPage = page);
  }

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    _pages = [
      QuestDetailFirst(
        delegate: this,
        currentLevel: _currentLevel,
        quest: widget.quest,
      ),
      QuestDetailSecond(
        currentLevel: _currentLevel,
        quest: widget.quest,
      ),
      QuestDetailThird(
        currentLevel: _currentLevel,
        quest: widget.quest,
      ),
    ];
    return Stack(
      children: [
        PageView(
          controller: _pageController,
          children: _pages,
        ),
        Positioned(
          left: 10,
          top: screenHeight / 2,
          child: IconButton(
            onPressed: () => _toPage(_currentPage - 1),
            icon: Icon(
              Icons.arrow_back,
              color: Colors.black,
            ),
          ),
        ),
        Positioned(
          right: 10,
          top: screenHeight / 2,
          child: IconButton(
            onPressed: () => _toPage(_currentPage + 1),
            icon: Icon(
              Icons.arrow_forward,
              color: Colors.black,
            ),
          ),
        )
      ],
    );
  }
}

class QuestDetailFirst extends StatelessWidget {
  QuestDetailFirst({required this.currentLevel, required this.delegate, required this.quest})
      : _questDetail = quest.questLevelDetails[currentLevel]!,
        _maxLevel = quest.maxLevel;
  final QuestData quest;
  final int currentLevel;
  final QuestLevelsIconDelegate delegate;
  final QuestDetailData _questDetail;
  final int _maxLevel;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        quest.icon,
        SettingEntry(
            icon: Icon(Icons.abc),
            title: "クエストレベル",
            body: QuestLevelsIcon(
              currentLevel: currentLevel,
              delegate: delegate,
              maxLevel: _maxLevel,
            )),
        SettingEntry(icon: Icon(Icons.abc), title: "クエストカテゴリ", body: Text(_questDetail.successCondition)),
      ],
    );
  }
}

class QuestDetailSecond extends StatelessWidget {
  QuestDetailSecond({required this.currentLevel, required QuestData quest}) : _questDetail = quest.questLevelDetails[currentLevel]!;
  final int currentLevel;
  final QuestDetailData _questDetail;
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SettingEntry(icon: Icon(Icons.abc), title: "second", body: Text(_questDetail.successCondition)),
        SettingEntry(icon: Icon(Icons.abc), title: "クエストカテゴリ", body: Text("test")),
      ],
    );
  }
}

class QuestDetailThird extends StatelessWidget {
  QuestDetailThird({required this.currentLevel, required QuestData quest}) : _questDetail = quest.questLevelDetails[currentLevel]!;
  final int currentLevel;
  final QuestDetailData _questDetail;
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SettingEntry(icon: Icon(Icons.abc), title: "third", body: Text(_questDetail.successCondition)),
        SettingEntry(icon: Icon(Icons.abc), title: "クエストカテゴリ", body: Text("test")),
      ],
    );
  }
}

void main() {
  runApp(MaterialApp(
    home: Scaffold(
      appBar: AppBar(
        title: Text("test"),
      ),
      body: QuestDetailPageView(
        quest: QuestData(id: "123", icon: Icon(Icons.person), name: "テストクエスト", questLevelDetails: {
          1: QuestDetailData(
            successCondition: "レベル1の成功条件",
            failureCondition: "レベル1の失敗条件",
            memberExp: 11,
            questExp: 11,
            rewards: 11,
            targetCount: 11,
          ),
          2: QuestDetailData(
            successCondition: "レベル2の成功条件",
            failureCondition: "レベル2の失敗条件",
            memberExp: 11,
            questExp: 11,
            rewards: 11,
            targetCount: 11,
          ),
          3: QuestDetailData(
            successCondition: "レベル3の成功条件",
            failureCondition: "レベル3の失敗条件",
            memberExp: 11,
            questExp: 11,
            rewards: 11,
            targetCount: 11,
          ),
        }),
      ),
    ),
  ));
}
