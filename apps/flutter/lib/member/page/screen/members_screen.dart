// import 'package:flutter/material.dart';

// import 'package:allowance_questboard/application/member/member_data.dart';
// import 'package:allowance_questboard/presentation/member/component/member_list_tile.dart';

// class MembersScreen extends StatelessWidget {
//   /// メンバー一覧画面
//   ///
//   /// リスト形式でメンバー情報を表示する
//   ///
//   /// メンバーの表示構成
//   /// ### 上段
//   /// - アイコン
//   /// - 名前
//   /// - メンバーID
//   /// ### 下段
//   /// - ランク
//   /// - 今月の報酬
//   const MembersScreen({required this.members, required this.onTap, super.key});

//   /// メンバー情報リスト
//   final List<MemberData> members;

//   /// メンバータップ時のコールバック関数
//   final Function(String memberId) onTap;

//   @override
//   Widget build(BuildContext context) {
//     return Padding(
//       padding: EdgeInsets.symmetric(horizontal: 10.0),
//       child: ListView.builder(
//         itemCount: members.length,
//         itemBuilder: (context, index) {
//           final member = members[index];
//           return Padding(
//               padding: EdgeInsets.only(bottom: 5),
//               child: Card(
//                 clipBehavior: Clip.antiAlias, // カードの角を丸くする
//                 // タップ可能にする
//                 child: InkWell(
//                   onTap: () => onTap(member.id),
//                   child: Padding(
//                     padding: EdgeInsets.only(bottom: 10, left: 10, right: 10),
//                     child: Column(
//                       children: [
//                         _topCard(member),
//                         _bottomCard(member),
//                       ],
//                     ),
//                   ),
//                 ),
//               ));
//         },
//       ),
//     );
//   }

//   /// メンバーカードの上段の情報を表示する
//   Widget _topCard(MemberData member) {
//     return MemberListTile(member: member);
//   }

//   /// メンバーカードの下段の情報を表示する
//   Widget _bottomCard(MemberData member) {
//     return Column(
//       children: [
//         Row(
//           mainAxisAlignment: MainAxisAlignment.end,
//           children: [
//             Text('ランク:${member.exp}', textAlign: TextAlign.right),
//           ],
//         ),
//         Row(
//           mainAxisAlignment: MainAxisAlignment.end,
//           children: [
//             Text('今月の報酬:${member.balance}', textAlign: TextAlign.right),
//           ],
//         ),
//       ],
//     );
//   }
// }

// // 動作確認用コード
// void main() {
//   runApp(
//     MaterialApp(
//       home: Scaffold(
//         body: MembersScreen(
//           members: [
//             MemberData(
//               id: "member1",
//               name: "メンバー1",
//               icon: Icon(Icons.person),
//               birthday: DateTime.now(),
//               age: 18,
//               education: "大学",
//               grade: 1,
//               exp: 20,
//               balance: 20,
//               minSavings: 20,
//             ),
//             MemberData(
//               id: "member2",
//               name: "メンバー2",
//               icon: Icon(Icons.person),
//               birthday: DateTime.now(),
//               age: 18,
//               education: "大学",
//               grade: 1,
//               exp: 20,
//               balance: 20,
//               minSavings: 20,
//             ),
//           ],
//           onTap: (String memberId) {
//             print('タップされたメンバーID: $memberId');
//           },
//         ),
//       ),
//     ),
//   );
// }
