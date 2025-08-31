import { LocaleString } from "./localeString";

/**
 * AuthErrorMessages クラスは、認証関連のエラーメッセージを管理します。
 */
class Messages {
  loginFailed(): LocaleString { return new LocaleString({
    ja: 'ログインに失敗しました。メールアドレスとパスワードを確認してください。',
    en: 'Login failed. Please check your email and password.'});}

  tokenRetrievalFailed(): LocaleString { return new LocaleString({
    ja: 'ログインに失敗しました。トークンが取得できませんでした。',
    en: 'Login failed. Could not retrieve token.'});}

  loginErrorTitle(): LocaleString { return new LocaleString({
    ja: 'ログインエラー',
    en: 'Login Error'});}

  // tRPCエラー関連
  notFoundError(): LocaleString { return new LocaleString({
    ja: 'リソースが見つかりません',
    en: 'Resource not found'});}

  internalServerError(): LocaleString { return new LocaleString({
    ja: '内部サーバーエラーが発生しました',
    en: 'An internal server error occurred'});}

  // パスワードリセット関連
  forgotPasswordTitle(): LocaleString { return new LocaleString({
    ja: 'パスワードリセット',
    en: 'Password Reset'});}

  forgotPasswordMessage(): LocaleString { return new LocaleString({
    ja: 'パスワードをリセットするための画面へ遷移します。',
    en: 'Navigate to the screen to reset your password.'});}

  // 利用規約関連
  termsOfServiceTitle(): LocaleString { return new LocaleString({
    ja: '利用規約',
    en: 'Terms of Service'});}

  termsOfServiceMessage(): LocaleString { return new LocaleString({
    ja: '利用規約の内容を確認するための画面へ遷移します。',
    en: 'Navigate to the screen to review the terms of service.'});}

  // tRPCエラー関連
  userNotFoundError(): LocaleString { return new LocaleString({
    ja: 'ユーザーが見つかりません',
    en: 'User not found'});}

  internalError(): LocaleString { return new LocaleString({
    ja: '内部エラーが発生しました',
    en: 'An internal error occurred'});}

  // 新規登録関連
  signUpFailed(): LocaleString { return new LocaleString({
    ja: '新規登録に失敗しました。入力内容を確認してください。',
    en: 'Sign up failed. Please check your input.'});}

  signUpErrorTitle(): LocaleString { return new LocaleString({
    ja: '登録エラー',
    en: 'Registration Error'});}
}

export const AuthErrorMessages = new Messages();
