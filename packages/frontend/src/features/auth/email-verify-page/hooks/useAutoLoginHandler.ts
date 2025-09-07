import { useCallback } from 'react';
import { AutoLogin } from '../services/autoLogin';
import { 
  EmailVerifyStatus,
  SetStatus, 
  SetAutoLoginInProgress,
  SetError, 
  ClearError,
  CanAutoLogin
} from '../stores/emailVerifyPageStore';
import { AppError } from '@backend/core/errors/appError';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';

// シグネチャ定義
export type UseAutoLoginHandler = (params: {
  /** 現在の認証ステータス */
  emailVerifyStatus: EmailVerifyStatus;
  /** 自動ログイン進行状態 */
  isAutoLoginInProgress: boolean;
  /** 認証ステータス設定関数 */
  setEmailVerifyStatus: SetStatus;
  /** 自動ログイン進行状態設定関数 */
  setAutoLoginInProgress: SetAutoLoginInProgress;
  /** エラー設定関数 */
  setError: SetError;
  /** エラークリア関数 */
  clearError: ClearError;
  /** 自動ログイン可能判定関数 */
  canAutoLogin: CanAutoLogin;
  /** 現在の言語タイプ */
  languageType: LanguageTypeValue;
  /** 自動ログインサービス関数 */
  autoLogin: AutoLogin;
  /** 自動ログイン成功時のコールバック */
  onAutoLoginSuccess?: (session: any, user: any) => void;
  /** 自動ログイン失敗時のコールバック */
  onAutoLoginError?: (error: AppError) => void;
}) => {
  /** 自動ログイン処理実行関数 */
  handleAutoLogin: () => Promise<void>;
  /** 自動ログイン実行可能かどうかの判定結果 */
  canAutoLogin: CanAutoLogin;
};

/** 自動ログインハンドラーのカスタムフック
 *
 * 認証完了後の自動ログイン処理を管理する
 * セッション確立、ユーザー情報取得、画面遷移を制御 */
export const useAutoLoginHandler: UseAutoLoginHandler = (params) => {
  
  // 自動ログイン処理
  const handleAutoLogin = useCallback(async (): Promise<void> => {
    // 自動ログイン可能性チェック
    if (!params.canAutoLogin()) {
      return;
    }

    try {
      // エラーをクリア
      params.clearError();
      
      // 自動ログイン開始状態に設定
      params.setAutoLoginInProgress(true);
      
      // 自動ログインサービスを実行
      const result = await params.autoLogin();
      
      // 成功時のコールバック実行
      if (params.onAutoLoginSuccess) {
        params.onAutoLoginSuccess(result.session, result.user);
      }
      
    } catch (error) {
      // エラー処理
      if (error instanceof AppError) {
        // AppErrorの場合、多言語メッセージを設定
        params.setError(error.localeMessage.getMessage(params.languageType));
        
        // 失敗時のコールバック実行
        if (params.onAutoLoginError) {
          params.onAutoLoginError(error);
        }
      } else {
        // 予期しないエラーの場合
        params.setError('自動ログイン中にエラーが発生しました。');
      }
      
      // 認証ステータスを失敗に設定
      params.setEmailVerifyStatus(EmailVerifyStatus.FAILED);
    } finally {
      // 自動ログイン進行状態をクリア
      params.setAutoLoginInProgress(false);
    }
  }, [
    params.canAutoLogin,
    params.emailVerifyStatus,
    params.isAutoLoginInProgress,
    params.setEmailVerifyStatus,
    params.setAutoLoginInProgress,
    params.setError,
    params.clearError,
    params.languageType,
    params.autoLogin,
    params.onAutoLoginSuccess,
    params.onAutoLoginError
  ]);

  return {
    handleAutoLogin,
    canAutoLogin: params.canAutoLogin,
  };
};
