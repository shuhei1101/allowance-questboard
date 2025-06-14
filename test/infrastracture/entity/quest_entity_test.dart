import 'package:allowance_questboard/infrastracture/entity/quest_entity.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:test/test.dart';

void main() {
  test('mapから初期化できること', () {
    final map = {
      'title': 'Quest Title',
      'client': 'Client Name',
      'request_details': 'Request Details',
      'created_at': Timestamp.fromDate(DateTime(2023, 10, 1)),
      'updated_at': Timestamp.fromDate(DateTime(2023, 10, 2)),
    };
    final questEntity = QuestEntity.fromMap(map, 'questId');

    expect(questEntity.id, 'questId');
    expect(questEntity.title, 'Quest Title');
    expect(questEntity.client, 'Client Name');
    expect(questEntity.requestDetails, 'Request Details');
    expect(questEntity.createdAt, DateTime(2023, 10, 1));
    expect(questEntity.updatedAt, DateTime(2023, 10, 2));
  });

  test('toMapで正しいマップが生成されること', () {
    final questEntity = QuestEntity(
      id: 'questId',
      title: 'Quest Title',
      client: 'Client Name',
      requestDetails: 'Request Details',
      createdAt: DateTime(2023, 10, 1),
      updatedAt: DateTime(2023, 10, 2),
    );
    final map = questEntity.toMap();
    expect(map['title'], 'Quest Title');
    expect(map['client'], 'Client Name');
    expect(map['request_details'], 'Request Details');
    expect(map['created_at'], Timestamp.fromDate(DateTime(2023, 10, 1)));
    expect(map['updated_at'], Timestamp.fromDate(DateTime(2023, 10, 2)));
  });
}
