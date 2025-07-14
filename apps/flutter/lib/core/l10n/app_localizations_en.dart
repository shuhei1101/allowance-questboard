// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get emailRequired => 'Email address is required';

  @override
  String get emailInvalid => 'Invalid email address format';

  @override
  String get passwordRequired => 'Password is required';

  @override
  String get passwordInvalid => 'Password is incorrectly formatted';

  @override
  String get questRequired => 'Quest is required';

  @override
  String get questInvalid => 'The quest is incorrectly formatted';
}
