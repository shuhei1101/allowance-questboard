// import 'package:flutter/material.dart';

// class QuestDetailScreen extends StatefulWidget {
//   /// クエスト詳細画面
//   ///
//   /// 3ページのクエスト詳細画面から構成され、
//   /// それぞれのページは[QuestDetailFirstScreen]、[QuestDetailSecondScreen]、[QuestDetailThirdScreen]として定義する。
//   /// ページ間の移動は左右の矢印ボタンで行う。
//   ///
//   /// クエストのレベルごとに応じて、クエストの表示情報を更新する。
//   QuestDetailScreen({
//     required this.quest,
//     this.defaultLevel = 1,
//   });

//   /// 表示対象のクエスト情報
//   final QuestData quest;

//   /// 表示レベルの初期値（デフォルトは1）
//   final int defaultLevel;

//   @override
//   State<StatefulWidget> createState() => _QuestDetailScreenState();
// }

// class _QuestDetailScreenState extends State<QuestDetailScreen> implements QuestLevelsIconDelegate {
//   late List<Widget> _pages;
//   final PageController _pageController = PageController();

//   /// 現在のページ
//   int _currentPage = 0;

//   /// 現在のレベル
//   int _currentLevel = 1;

//   @override
//   void initState() {
//     super.initState();
//     // 初期表示レベルを設定
//     _currentLevel = widget.defaultLevel;
//   }

//   /// 指定レベルに切り替える
//   @override
//   void toLevel(int level) {
//     setState(() {
//       _currentLevel = level;
//     });
//   }

//   /// 指定ページに切り替える
//   ///
//   /// 指定されたページが範囲外の場合は、最初または最後のページに切り替える
//   void _toPage(int page) {
//     if (page < 0) page = _pages.length - 1;
//     if (page > _pages.length - 1) page = 0;
//     _pageController.animateToPage(page,
//         duration: Duration(milliseconds: 300), curve: Curves.easeInOut);
//     setState(() => _currentPage = page);
//   }

//   @override
//   Widget build(BuildContext context) {
//     final screenHeight = MediaQuery.of(context).size.height; // 画面の高さを取得
//     return Stack(
//       children: [
//         _questDetailScreen(),
//         _prevPageButton(screenHeight),
//         _nextPageButton(screenHeight),
//       ],
//     );
//   }

//   /// クエスト詳細画面
//   ///
//   /// 3ページのクエスト詳細画面で構成する。
//   Widget _questDetailScreen() {
//     return PageView(
//       controller: _pageController,
//       children: [
//         QuestDetailFirstScreen(
//           delegate: this,
//           currentLevel: _currentLevel,
//           quest: widget.quest,
//         ),
//         QuestDetailSecondScreen(
//           currentLevel: _currentLevel,
//           quest: widget.quest,
//         ),
//         QuestDetailThirdScreen(
//           currentLevel: _currentLevel,
//           quest: widget.quest,
//         ),
//       ],
//     );
//   }

//   /// 次ページへの移動ボタン
//   Widget _nextPageButton(double screenHeight) {
//     return Positioned(
//       right: 10,
//       top: screenHeight / 2,
//       child: IconButton(
//         onPressed: () => _toPage(_currentPage + 1),
//         icon: Icon(
//           Icons.arrow_forward,
//           color: Colors.black,
//         ),
//       ),
//     );
//   }

//   /// 前ページへの移動ボタン
//   Widget _prevPageButton(double screenHeight) {
//     return Positioned(
//       left: 10,
//       top: screenHeight / 2,
//       child: IconButton(
//         onPressed: () => _toPage(_currentPage - 1),
//         icon: Icon(
//           Icons.arrow_back,
//           color: Colors.black,
//         ),
//       ),
//     );
//   }
// }

// class QuestDetailFirstScreen extends StatelessWidget {
//   /// クエスト詳細画面の1ページ目
//   ///
//   /// 主にクエストの基本情報を表示する
//   QuestDetailFirstScreen({required this.currentLevel, required this.delegate, required this.quest})
//       : _questDetail = quest.questLevelDetails[currentLevel]!,
//         _maxLevel = quest.maxLevel;

//   /// 表示対象のクエスト情報
//   final QuestData quest;

//   /// 現在のレベル
//   final int currentLevel;

//   /// レベル変更時の処理を委譲するデリゲート
//   final QuestLevelsIconDelegate delegate;

//   /// 表示対象のクエスト詳細情報
//   final QuestDetailData _questDetail;

//   /// クエストの最大レベル
//   final int _maxLevel;

//   @override
//   Widget build(BuildContext context) {
//     return ListView(
//       children: [
//         quest.icon,
//         SettingEntry(
//             icon: Icon(Icons.abc),
//             title: "クエストレベル",
//             body: QuestLevelsIcon(
//               currentLevel: currentLevel,
//               delegate: delegate,
//               maxLevel: _maxLevel,
//             )),
//         SettingEntry(icon: Icon(Icons.abc), title: "クエストカテゴリ", body: Text(quest.category)),
//         SettingEntry(
//             icon: Icon(Icons.abc), title: "成功条件", body: Text(_questDetail.successCondition)),
//         // TODO: クエスト詳細画面の1ページ目の設定項目を追加する
//       ],
//     );
//   }
// }

// class QuestDetailSecondScreen extends StatelessWidget {
//   /// クエスト詳細画面の2ページ目
//   ///
//   /// 主にクエストの依頼内容を表示する
//   QuestDetailSecondScreen({required this.currentLevel, required QuestData quest})
//       : _questDetail = quest.questLevelDetails[currentLevel]!;

//   /// 表示対象のクエスト詳細情報
//   final int currentLevel;

//   /// 現在のレベル
//   final QuestDetailData _questDetail;

//   /// 表示対象のクエスト情報
//   @override
//   Widget build(BuildContext context) {
//     return ListView(
//       children: [
//         // TODO: 表示する情報を設定する
//         SettingEntry(
//             icon: Icon(Icons.abc), title: "依頼主", body: Text(_questDetail.successCondition)),
//         SettingEntry(icon: Icon(Icons.abc), title: "依頼内容", body: Text("test")),
//       ],
//     );
//   }
// }

// class QuestDetailThirdScreen extends StatelessWidget {
//   /// クエスト詳細画面の3ページ目
//   ///
//   /// 主にクエストの報酬内容を表示する
//   QuestDetailThirdScreen({required this.currentLevel, required QuestData quest})
//       : _questDetail = quest.questLevelDetails[currentLevel]!;

//   /// 現在のレベル
//   final int currentLevel;

//   /// 表示対象のクエスト詳細情報
//   final QuestDetailData _questDetail;
//   @override
//   Widget build(BuildContext context) {
//     return ListView(
//       children: [
//         // TODO: 表示する情報を設定する
//         SettingEntry(
//             icon: Icon(Icons.abc), title: "受注可能年齢", body: Text(_questDetail.successCondition)),
//         SettingEntry(icon: Icon(Icons.abc), title: "掲載開始時期", body: Text("test")),
//         // TODO: 表示情報を追加する
//       ],
//     );
//   }
// }

// // 動作確認用コード
// void main() {
//   runApp(MaterialApp(
//     home: Scaffold(
//       appBar: AppBar(
//         title: Text("test"),
//       ),
//       body: QuestDetailScreen(
//         quest: QuestData(
//             id: "123",
//             icon: Icon(Icons.person),
//             name: "テストクエスト",
//             category: "テスト分類",
//             questLevelDetails: {
//               1: QuestDetailData(
//                 successCondition: "レベル1の成功条件",
//                 failureCondition: "レベル1の失敗条件",
//                 memberExp: 11,
//                 questExp: 11,
//                 rewards: 11,
//                 targetCount: 11,
//               ),
//               2: QuestDetailData(
//                 successCondition: "レベル2の成功条件",
//                 failureCondition: "レベル2の失敗条件",
//                 memberExp: 11,
//                 questExp: 11,
//                 rewards: 11,
//                 targetCount: 11,
//               ),
//               3: QuestDetailData(
//                 successCondition: "レベル3の成功条件",
//                 failureCondition: "レベル3の失敗条件",
//                 memberExp: 11,
//                 questExp: 11,
//                 rewards: 11,
//                 targetCount: 11,
//               ),
//             }),
//       ),
//     ),
//   ));
// }
