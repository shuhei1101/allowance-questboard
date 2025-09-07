import { supabase } from '@/core/supabase/supabase';
import { LocaleString } from '@backend/core/messages/localeString';
import { AppError } from '@backend/core/errors/appError';
import { EmailVerifyStatus } from '../stores/emailVerifyPageStore';

interface CheckEmailVerifyStatusResult {
  /** 認証状態 */
  status: EmailVerifyStatus;
  /** セッション情報（認証完了時のみ） */
  session?: any;
}

export type CheckEmailVerifyStatus = () => Promise<CheckEmailVerifyStatusResult>;

/**
 * メール認証状態チェックサービス
 * 
 * Supabaseから現在の認証状態を取得し、
 * email_confirmed_at を確認してメール認証が完了しているかを判定する
 * 
 * @returns 認証状態とセッション情報
 * @throws AppError 認証状態の取得に失敗した場合
 */
export const checkEmailVerifyStatus: CheckEmailVerifyStatus = async (): Promise<CheckEmailVerifyStatusResult> => {
  try {
    // Supabaseからセッション情報を取得
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      throw new AppError({
        errorType: 'AUTH_ERROR',
        message: new LocaleString({
          ja: '認証状態の取得に失敗しました。',
          en: 'Failed to get authentication status.',
        }),
      });
    }

    // セッションが存在しない場合は認証待ち状態
    if (!session || !session.user) {
      return {
        status: EmailVerifyStatus.WAITING,
      };
    }

    // メール認証が完了しているかをチェック
    const user = session.user;
    if (user.email_confirmed_at) {
      // メール認証完了
      return {
        status: EmailVerifyStatus.VERIFIED,
        session
      };
    } else {
      // メール認証待ち
      return {
        status: EmailVerifyStatus.WAITING,
        session
      };
    }
  } catch (error) {
    // 予期しないエラーの場合は失敗状態として扱う
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError({
      errorType: 'AUTH_ERROR',
      message: new LocaleString({
        ja: '認証状態の確認中にエラーが発生しました。',
        en: 'An error occurred while checking authentication status.',
      }),
    });
  }
};
