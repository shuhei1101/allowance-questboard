// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Japanese (`ja`).
class AppLocalizationsJa extends AppLocalizations {
  AppLocalizationsJa([String locale = 'ja']) : super(locale);

  @override
  String get userIdRequired => 'ユーザーIDは必須です。';

  @override
  String get parentIdIsInvalid => '不正な親IDが指定されました。';

  @override
  String get memberIdIsInvalid => '不正なメンバーIDが指定されました。';

  @override
  String get emailInvalid => 'メールアドレスの形式が正しくありません。';

  @override
  String maxLength(Object max) {
    return '$max文字以内でなければなりません。';
  }

  @override
  String minLength(Object min) {
    return '$min文字以上でなければなりません。';
  }

  @override
  String get required => '値は必須です。';

  @override
  String get positiveInteger => '正の整数でなければなりません。';
}
