import { useCallback, useEffect } from 'react';
import { ResendVerificationEmail } from '../services/resendVerificationEmail';
import { 
  SetResending, 
  SetResendCooldown, 
  IncrementResendCount, 
  UpdateLastResendTime,
  SetError, 
  ClearError,
  CanResend
} from '../stores/emailVerifyPageStore';
import { Email } from '@backend/features/auth/value-object/email';
import { AppError } from '@backend/core/errors/appError';
import { LanguageTypeValue } from '@backend/features/language/value-object/languageTypeValue';

export type UseResendEmailHandler = (params: {
  /** 再送対象のメールアドレス */
  email: Email;
  /** 再送までの残り秒数 */
  resendCooldown: number;
  /** 本日の再送回数 */
  resendCount: number;
  /** 1日の最大再送回数 */
  maxResendCount: number;
  /** 最後の再送時刻 */
  lastResendTime?: Date;
  /** 再送状態設定関数 */
  setResending: SetResending;
  /** 再送クールダウン設定関数 */
  setResendCooldown: SetResendCooldown;
  /** 再送回数増加関数 */
  incrementResendCount: IncrementResendCount;
  /** 最後の再送時刻更新関数 */
  updateLastResendTime: UpdateLastResendTime;
  /** エラー設定関数 */
  setError: SetError;
  /** エラークリア関数 */
  clearError: ClearError;
  /** 再送可能判定関数 */
  canResend: CanResend;
  /** 現在の言語タイプ */
  languageType: LanguageTypeValue;
  /** メール再送サービス関数 */
  resendVerificationEmail: ResendVerificationEmail;
  /** 再送成功時のコールバック */
  onResendSuccess?: () => void;
}) => {
  /** メール再送処理実行関数 */
  handleResendEmail: () => Promise<void>;
  /** 再送可能かどうかの判定結果 */
  canResend: CanResend;
};

/** 確認メール再送ハンドラーのカスタムフック
 *
 * 再送ボタンクリック時のイベント処理とクールダウン制御を提供する
 * 再送回数制限、クールダウン時間管理、エラーハンドリングを含む */
export const useResendEmailHandler: UseResendEmailHandler = (params) => {
  const COOLDOWN_SECONDS = 60; // 60秒のクールダウン

  // クールダウンタイマーの管理
  useEffect(() => {
    if (params.resendCooldown > 0) {
      const timer = setInterval(() => {
        params.setResendCooldown(Math.max(0, params.resendCooldown - 1));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [params.resendCooldown, params.setResendCooldown]);

  // メール再送処理
  const handleResendEmail = useCallback(async (): Promise<void> => {
    // 再送可能性チェック
    if (!params.canResend()) {
      console.log('🚫 再送不可: クールダウン中または制限到達');
      
      if (params.resendCooldown > 0) {
        params.setError(`再送は ${params.resendCooldown} 秒後に可能です。`);
      } else if (params.resendCount >= params.maxResendCount) {
        params.setError('本日の再送回数上限に達しました。明日再度お試しください。');
      }
      return;
    }

    try {
      console.log('📧 メール再送処理開始...');
      
      // 再送中状態に設定
      params.setResending(true);
      params.clearError();

      // メール再送サービスを呼び出し
      await params.resendVerificationEmail({
        email: params.email,
      });

      console.log('✅ メール再送成功');

      // 成功時の状態更新
      params.incrementResendCount();
      params.updateLastResendTime();
      params.setResendCooldown(COOLDOWN_SECONDS);

      // 成功コールバックを呼び出し
      if (params.onResendSuccess) {
        params.onResendSuccess();
      }

    } catch (error) {
      console.error('❌ メール再送エラー:', error);

      // エラーメッセージを設定
      if (error instanceof AppError) {
        params.setError(error.localeMessage.getMessage(params.languageType));
      } else {
        params.setError('メールの再送中にエラーが発生しました。');
      }
    } finally {
      // 再送中フラグをクリア
      params.setResending(false);
    }
  }, [
    params.canResend,
    params.email,
    params.resendCooldown,
    params.resendCount,
    params.maxResendCount,
    params.setResending,
    params.setResendCooldown,
    params.incrementResendCount,
    params.updateLastResendTime,
    params.setError,
    params.clearError,
    params.languageType,
    params.resendVerificationEmail,
    params.onResendSuccess
  ]);

  return {
    handleResendEmail,
    canResend: params.canResend,
  };
};
