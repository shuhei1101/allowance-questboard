import 'package:allowance_questboard/domain/shared/age.dart';

class QuestReleasePeriod {
  QuestReleasePeriod({required this.ageRestriction, required this.releaseDate, required this.closeDate});
  final Age ageRestriction;
  final DateTime releaseDate;
  final DateTime closeDate;
}
