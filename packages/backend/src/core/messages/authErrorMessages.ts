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

  // 家族作成関連
  createFamilyTitle(): LocaleString { return new LocaleString({
    ja: '新規家族作成',
    en: 'Create New Family'});}

  createFamilyMessage(): LocaleString { return new LocaleString({
    ja: '新しい家族を作成するための画面へ遷移します。',
    en: 'Navigate to the screen to create a new family.'});}

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
}

export const AuthErrorMessages = new Messages();
