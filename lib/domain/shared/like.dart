import 'package:allowance_questboard/domain/family/family_id.dart';

class Like {
  Like({required this.familyId, required this.likedAt});
  final FamilyId familyId;
  final DateTime likedAt;
}
