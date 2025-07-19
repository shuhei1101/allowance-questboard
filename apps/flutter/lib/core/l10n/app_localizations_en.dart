// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get userIdRequired => 'User ID is required.';

  @override
  String get parentIdIsInvalid => ' Invalid parent ID specified.';

  @override
  String get memberIdIsInvalid => 'Invalid member ID specified.';

  @override
  String get emailInvalid => 'Email address format is invalid.';

  @override
  String maxLength(Object max) {
    return 'Must be at most $max characters long.';
  }

  @override
  String minLength(Object min) {
    return 'Must be at least $min characters long.';
  }

  @override
  String get required => 'Value is required.';

  @override
  String get positiveInteger => 'Must be a positive integer.';
}
