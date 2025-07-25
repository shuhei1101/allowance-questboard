// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'l10n.dart';

// ignore_for_file: type=lint

/// The translations for Japanese (`ja`).
class SJa extends S {
  SJa([String locale = 'ja']) : super(locale);

  @override
  String get userIdRequired => 'ユーザーIDは必須です';

  @override
  String get emailRequired => 'メールアドレスは必須です';

  @override
  String get emailInvalid => 'メールアドレスの形式が正しくありません';

  @override
  String get passwordRequired => 'パスワードは必須です';

  @override
  String get passwordInvalid => 'パスワードの形式が正しくありません';

  @override
  String get questRequired => 'クエストは必須です';

  @override
  String get questInvalid => 'クエストの形式が正しくありません';
}
