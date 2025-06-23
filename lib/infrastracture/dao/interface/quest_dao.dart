// import 'package:allowance_questboard/infrastracture/entity/quest_entity.dart';
// import 'package:cloud_firestore/cloud_firestore.dart';

// class QuestDao {
//   final FirebaseFirestore _firestore = FirebaseFirestore.instance;
//   static const String collectionPath = 'quests';

//   /// クエスト一覧取得
//   Future<List<QuestEntity>> fetchQuests() async {
//     final snapshot = await _firestore.collection(collectionPath).get();
//     return snapshot.docs.map((doc) => QuestEntity.fromMap(doc.data(), doc.id)).toList();
//   }
// }
