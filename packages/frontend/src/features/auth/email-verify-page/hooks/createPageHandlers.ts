import { useEmailVerificationChecker, UseEmailVerificationChecker } from './useEmailVerificationChecker';
import { useResendEmailHandler, UseResendEmailHandler } from './useResendEmailHandler';
import { useAutoLoginHandler, UseAutoLoginHandler } from './useAutoLoginHandler';
import { checkEmailVerifyStatus, CheckEmailVerifyStatus } from '../services/checkEmailVerifyStatus';
import { resendVerificationEmail, ResendVerificationEmail } from '../services/resendVerificationEmail';
import { autoLogin, AutoLogin } from '../services/autoLogin';
import { EmailVerifyPageStore } from '../stores/emailVerifyPageStore';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';

// シグネチャ定義
export type CreatePageHandlers = (params: {
  /** メール認証ページストア */
  store: EmailVerifyPageStore;
  /** 現在の言語タイプ */
  languageType: LanguageTypeValue;
  /** メール認証状態チェックサービス（依存性注入） */
  checkEmailVerifyStatus?: CheckEmailVerifyStatus;
  /** メール再送サービス（依存性注入） */
  resendVerificationEmail?: ResendVerificationEmail;
  /** 自動ログインサービス（依存性注入） */
  autoLogin?: AutoLogin;
  /** 認証完了時のコールバック */
  onVerificationComplete?: () => void;
  /** 再送成功時のコールバック */
  onResendSuccess?: () => void;
  /** 自動ログイン成功時のコールバック */
  onAutoLoginSuccess?: (session: any, user: any) => void;
  /** 自動ログイン失敗時のコールバック */
  onAutoLoginError?: (error: any) => void;
}) => {
  /** メール認証チェックハンドラー */
  emailVerificationChecker: ReturnType<UseEmailVerificationChecker>;
  /** メール再送ハンドラー */
  resendEmailHandler: ReturnType<UseResendEmailHandler>;
  /** 自動ログインハンドラー */
  autoLoginHandler: ReturnType<UseAutoLoginHandler>;
};

/** メール認証ページのハンドラー統合ファクトリ
 *
 * 全ハンドラーの依存性注入と統合管理を行う
 * - ページコンポーネント用の統一インターフェース提供
 * - サービス層とストアの連携制御
 * - AppStateイベント管理とライフサイクル制御
 * - テスタブルな設計のための依存性注入機構 */
export const createPageHandlers: CreatePageHandlers = (params) => {
  const {
    store,
    languageType,
    checkEmailVerifyStatus: checkEmailVerifyStatusService = checkEmailVerifyStatus,
    resendVerificationEmail: resendVerificationEmailService = resendVerificationEmail,
    autoLogin: autoLoginService = autoLogin,
    onVerificationComplete,
    onResendSuccess,
    onAutoLoginSuccess,
    onAutoLoginError,
  } = params;

  // ストアの状態と関数を取得
  const {
    email,
    emailVerifyStatus,
    isCheckingAuth,
    lastCheckTime,
    resendCooldown,
    resendCount,
    maxResendCount,
    lastResendTime,
    isAutoLoginInProgress,
    setCheckingAuth,
    setEmailVerifyStatus,
    setAutoLoginInProgress,
    updateLastCheckTime,
    setError,
    clearError,
    shouldCheckVerification,
    setResending,
    setResendCooldown,
    incrementResendCount,
    updateLastResendTime,
    canResend,
    canAutoLogin,
  } = store;

  // メール認証チェックハンドラーの生成
  const emailVerificationChecker = useEmailVerificationChecker({
    emailVerifyStatus,
    isCheckingAuth,
    lastCheckTime,
    setCheckingAuth,
    setEmailVerifyStatus,
    setAutoLoginInProgress,
    updateLastCheckTime,
    setError,
    clearError,
    shouldCheckVerification,
    languageType,
    checkEmailVerifyStatus: checkEmailVerifyStatusService,
    onVerificationComplete,
  });

  // メール再送ハンドラーの生成
  const resendEmailHandler = useResendEmailHandler({
    email,
    resendCooldown,
    resendCount,
    maxResendCount,
    lastResendTime,
    setResending,
    setResendCooldown,
    incrementResendCount,
    updateLastResendTime,
    setError,
    clearError,
    canResend,
    languageType,
    resendVerificationEmail: resendVerificationEmailService,
    onResendSuccess,
  });

  // 自動ログインハンドラーの生成
  const autoLoginHandler = useAutoLoginHandler({
    emailVerifyStatus,
    isAutoLoginInProgress,
    setEmailVerifyStatus,
    setAutoLoginInProgress,
    setError,
    clearError,
    canAutoLogin,
    languageType,
    autoLogin: autoLoginService,
    onAutoLoginSuccess,
    onAutoLoginError,
  });


  return {
    emailVerificationChecker,
    resendEmailHandler,
    autoLoginHandler,
  };
};
