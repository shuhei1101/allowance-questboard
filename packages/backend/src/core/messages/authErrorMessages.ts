import { LocaleString } from "./localeString";

/**
 * AuthErro  emailAlreadyExists(): LocaleString { return new LocaleString({
    ja: 'このメールアドレスは既に登録されています。',
    en: 'This email address is already registered.'});}
}ssages クラスは、認証関連のエラーメッセージを管理します。
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

  emailAlreadyExists(): LocaleString { return new LocaleString({
    ja: 'このメールアドレスは既に登録されています。',
    en: 'This email address is already registered.'});}

  // メール認証関連
  emailVerificationTitle(): LocaleString { return new LocaleString({
    ja: 'メール認証',
    en: 'Email Verification'});}

  emailVerificationDescription(): LocaleString { return new LocaleString({
    ja: '確認メールを送信しました。\nメール内のリンクをクリックして\n登録を完了してください。',
    en: 'We have sent you a verification email.\nPlease click the link in the email\nto complete your registration.'});}

  emailVerificationWaiting(): LocaleString { return new LocaleString({
    ja: '認証を確認中...',
    en: 'Checking verification...'});}

  emailVerificationChecking(): LocaleString { return new LocaleString({
    ja: '認証状態を確認しています...',
    en: 'Verifying your authentication status...'});}

  emailVerificationComplete(): LocaleString { return new LocaleString({
    ja: '認証完了！自動ログインしています...',
    en: 'Verification complete! Logging you in...'});}

  emailVerificationFailed(): LocaleString { return new LocaleString({
    ja: '認証に失敗しました',
    en: 'Verification failed'});}

  emailResendSuccess(): LocaleString { return new LocaleString({
    ja: '確認メールを再送しました',
    en: 'Verification email has been resent'});}

  emailResendFailed(): LocaleString { return new LocaleString({
    ja: 'メールの再送に失敗しました',
    en: 'Failed to resend verification email'});}

  emailResendCooldown(): LocaleString { return new LocaleString({
    ja: '秒後に再送できます',
    en: 'seconds until you can resend'});}

  emailResendLimitReached(): LocaleString { return new LocaleString({
    ja: '本日の再送上限に達しました。\n明日再度お試しください。',
    en: 'Daily resend limit reached.\nPlease try again tomorrow.'});}

  emailNotReceived(): LocaleString { return new LocaleString({
    ja: 'メールが届かない場合は？',
    en: 'Email not received?'});}

  emailNotReceivedHelp(): LocaleString { return new LocaleString({
    ja: '・スパムフォルダを確認してください\n・メールの受信設定を確認してください\n・しばらく時間をおいてから再送してください\n・問題が解決しない場合はサポートにお問い合わせください',
    en: '• Check your spam folder\n• Check your email settings\n• Wait a moment and try resending\n• Contact support if the problem persists'});}

  emailVerificationTimeout(): LocaleString { return new LocaleString({
    ja: '認証の有効期限が切れました。\n確認メールを再送してください。',
    en: 'Verification has expired.\nPlease resend the verification email.'});}

  emailVerificationNetworkError(): LocaleString { return new LocaleString({
    ja: 'ネットワーク接続を確認してください',
    en: 'Please check your network connection'});}

  autoLoginFailed(): LocaleString { return new LocaleString({
    ja: '自動ログインに失敗しました',
    en: 'Auto login failed'});}

  autoLoginSuccess(): LocaleString { return new LocaleString({
    ja: 'ログインしました',
    en: 'Successfully logged in'});}

  deepLinkError(): LocaleString { return new LocaleString({
    ja: 'リンクが無効です',
    en: 'Invalid link'});}

  deepLinkProcessingError(): LocaleString { return new LocaleString({
    ja: 'リンクの処理中にエラーが発生しました',
    en: 'An error occurred while processing the link'});}
}

export const AuthErrorMessages = new Messages();
