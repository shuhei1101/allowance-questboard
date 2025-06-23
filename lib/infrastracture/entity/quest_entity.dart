// import 'package:cloud_firestore/cloud_firestore.dart';

// class QuestEntity {
//   final String? id;
//   final String title;
//   final String client;
//   final String requestDetails;
//   final DateTime createdAt;
//   final DateTime updatedAt;

//   QuestEntity({
//     this.id,
//     required this.title,
//     required this.client,
//     required this.requestDetails,
//     required this.createdAt,
//     required this.updatedAt,
//   });

//   factory QuestEntity.fromMap(Map<String, dynamic> map, String documentId) {
//     return QuestEntity(
//         id: documentId,
//         title: map['title'],
//         client: map['client'] ?? '',
//         requestDetails: map['request_details'] ?? '',
//         createdAt: (map['created_at'] as Timestamp).toDate(),
//         updatedAt: (map['updated_at'] as Timestamp).toDate());
//   }

//   Map<String, dynamic> toMap() {
//     return {
//       'title': title,
//       'client': client,
//       'request_details': requestDetails,
//       'created_at': Timestamp.fromDate(createdAt),
//       'updated_at': Timestamp.fromDate(updatedAt),
//     };
//   }
// }
