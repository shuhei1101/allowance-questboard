import 'package:allowance_questboard/domain/shared/age.dart';

class AgeRestriction {
  AgeRestriction({required this.ageFrom, required this.ageTill});
  final Age? ageFrom;
  final Age? ageTill;
}
