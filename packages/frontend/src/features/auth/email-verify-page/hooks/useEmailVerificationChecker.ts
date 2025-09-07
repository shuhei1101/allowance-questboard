import { useCallback, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { CheckEmailVerifyStatus } from '../services/checkEmailVerifyStatus';
import { EmailVerifyStatus, SetCheckingAuth, SetStatus, SetError, ClearError, SetAutoLoginInProgress, UpdateLastCheckTime, ShouldCheckVerification } from '../stores/emailVerifyPageStore';
import { AppError } from '@backend/core/errors/appError';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';

export type UseEmailVerificationChecker = (params: {
  /** 現在の認証ステータス */
  emailVerifyStatus: EmailVerifyStatus;
  /** 認証チェック中状態 */
  isCheckingAuth: boolean;
  /** 最後の認証チェック時刻 */
  lastCheckTime?: Date;
  /** 認証チェック状態設定関数 */
  setCheckingAuth: SetCheckingAuth;
  /** 認証状態設定関数 */
  setEmailVerifyStatus: SetStatus;
  /** 自動ログイン状態設定関数 */
  setAutoLoginInProgress: SetAutoLoginInProgress;
  /** 最後の認証チェック時刻更新関数 */
  updateLastCheckTime: UpdateLastCheckTime;
  /** エラー設定関数 */
  setError: SetError;
  /** エラークリア関数 */
  clearError: ClearError;
  /** 認証状態チェックが必要かどうかの判定関数 */
  shouldCheckVerification: ShouldCheckVerification;
  /** 現在の言語タイプ */
  languageType: LanguageTypeValue;
  /** メール認証状態チェックサービス関数 */
  checkEmailVerifyStatus: CheckEmailVerifyStatus;
  /** 認証完了時のコールバック */
  onVerificationComplete?: () => void;
}) => {
  /** メール認証状態チェック処理実行関数 */
  checkEmailVerification: () => Promise<void>;
};

/** メール認証チェックハンドラーのカスタムフック
 *
 * AppState監視によるメール認証状態の自動チェック機能を提供する
 * アプリがフォアグラウンドに戻った際に認証状態をチェックし、
 * 認証完了時にはコールバック処理を実行する */
export const useEmailVerificationChecker: UseEmailVerificationChecker = (params) => {
  
  // メール認証状態をチェック
  const checkEmailVerification = useCallback(async (): Promise<void> => {
    // チェックが必要かどうかを判定
    if (!params.shouldCheckVerification()) {
      console.log('📅 認証チェック: チェック条件に該当しないためスキップ');
      return;
    }

    try {
      console.log('🔍 認証状態チェック開始...');
      
      // チェック開始状態に設定
      params.setCheckingAuth(true);
      params.setEmailVerifyStatus(EmailVerifyStatus.CHECKING);
      params.clearError();
      
      // 最後のチェック時刻を更新
      params.updateLastCheckTime();

      // 認証状態をチェック
      const result = await params.checkEmailVerifyStatus();
      
      console.log('📊 認証状態チェック結果:', result.status);

      // 状態を更新
      params.setEmailVerifyStatus(result.status);

      // 認証完了時の処理
      if (result.status === EmailVerifyStatus.VERIFIED) {
        console.log('✅ メール認証完了！自動ログイン処理を開始します');
        
        // 自動ログイン状態に設定
        params.setAutoLoginInProgress(true);
        
        // 完了コールバックを呼び出し
        if (params.onVerificationComplete) {
          params.onVerificationComplete();
        }
      }

    } catch (error) {
      console.error('❌ 認証状態チェックエラー:', error);
      
      // エラー状態に設定
      params.setEmailVerifyStatus(EmailVerifyStatus.FAILED);
      
      // エラーメッセージを設定
      if (error instanceof AppError) {
        params.setError(error.localeMessage.getMessage(params.languageType));
      } else {
        params.setError('認証状態の確認中にエラーが発生しました。');
      }
    } finally {
      // チェック中フラグをクリア
      params.setCheckingAuth(false);
    }
  }, [
    params.shouldCheckVerification,
    params.setCheckingAuth, 
    params.setEmailVerifyStatus,
    params.setAutoLoginInProgress,
    params.updateLastCheckTime,
    params.setError,
    params.clearError,
    params.languageType,
    params.checkEmailVerifyStatus,
    params.onVerificationComplete
  ]);

  // AppState変化の監視
  useEffect(() => {
    // AppState変化のハンドラー
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      console.log(`📱 AppState変化: ${nextAppState}`);
      
      // アプリがアクティブになった時に認証チェックを実行
      if (nextAppState === 'active') {
        console.log('🚀 アプリがアクティブになりました - 認証チェックを実行');
        checkEmailVerification();
      }
    };

    // AppState変化のリスナーを登録
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // 初回マウント時にも認証チェックを実行
    console.log('🎯 初回認証チェックを実行');
    checkEmailVerification();

    // クリーンアップ
    return () => {
      console.log('🧹 AppState監視を終了');
      subscription?.remove();
    };
  }, [checkEmailVerification]);

  return {
    checkEmailVerification,
  };
};
