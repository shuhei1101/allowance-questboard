// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Japanese (`ja`).
class AppLocalizationsJa extends AppLocalizations {
  AppLocalizationsJa([String locale = 'ja']) : super(locale);

  @override
  String get appTitle => 'お小遣いクエストボード';

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

  @override
  String get loginSuccess => 'ログイン成功';

  @override
  String loginError(Object message) {
    return 'ログインエラー: $message';
  }

  @override
  String get signUpComplete => 'サインアップ完了';

  @override
  String get familyName => '家族名';

  @override
  String get loginAsParent => '親でログイン';

  @override
  String get loginAsChild => '子供でログイン';

  @override
  String get cancel => 'キャンセル';

  @override
  String get enterYourEmail => 'メールアドレスを入力してください';

  @override
  String get enterYourPassword => 'パスワードを入力してください';

  @override
  String get signIn => 'サインイン';

  @override
  String get signUp => 'サインアップ';

  @override
  String get forgotYourPassword => 'パスワードをお忘れですか？';

  @override
  String get dontHaveAnAccount => 'アカウントをお持ちでない方';

  @override
  String get alreadyHaveAnAccount => '既にアカウントをお持ちの方';

  @override
  String get createNewFamily => '新規家族を作成';

  @override
  String get email => 'メールアドレス';

  @override
  String get password => 'パスワード';

  @override
  String get validEmailError => '有効なメールアドレスを入力してください';

  @override
  String get passwordLengthError => 'パスワードは6文字以上で入力してください';

  @override
  String get forgotPassword => 'パスワードをお忘れですか？';

  @override
  String get dontHaveAccount => 'アカウントをお持ちでない方はサインアップ';

  @override
  String get haveAccount => '既にアカウントをお持ちの方はサインイン';

  @override
  String get sendPasswordReset => 'パスワードリセットメールを送信';

  @override
  String get passwordResetSent => 'パスワードリセットメールを送信しました';

  @override
  String get backToSignIn => 'サインインに戻る';

  @override
  String get unexpectedError => '予期しないエラーが発生しました';

  @override
  String get requiredFieldError => 'この項目は必須です';

  @override
  String get confirmPasswordError => 'パスワードが一致しません';

  @override
  String get confirmPassword => 'パスワードを確認';
}
