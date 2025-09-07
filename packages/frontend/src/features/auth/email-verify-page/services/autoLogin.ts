import { supabase } from '@/core/supabase/supabase';
import { LocaleString } from '@backend/core/messages/localeString';
import { AppError } from '@backend/core/errors/appError';

interface AutoLoginResult {
  /** セッション情報 */
  session: any;
  /** ユーザー情報 */
  user: any;
}

export type AutoLogin = () => Promise<AutoLoginResult>;

/**
 * 自動ログインサービス
 * 
 * 認証完了後の自動ログイン処理を実行する
 * セッションを確立し、ユーザー情報を取得する
 * 
 * @returns セッション情報とユーザー情報
 * @throws AppError 自動ログインに失敗した場合
 */
export const autoLogin: AutoLogin = async (): Promise<AutoLoginResult> => {
  try {
    // 現在のセッションを取得
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      throw new AppError({
        errorType: 'AUTO_LOGIN_ERROR',
        message: new LocaleString({
          ja: 'セッションの取得に失敗しました。',
          en: 'Failed to get session.',
        }),
      });
    }

    // セッションが存在しない場合はエラー
    if (!session || !session.user) {
      throw new AppError({
        errorType: 'AUTO_LOGIN_ERROR',
        message: new LocaleString({
          ja: 'セッションが見つかりません。再度ログインしてください。',
          en: 'Session not found. Please login again.',
        }),
      });
    }

    // メール認証が完了していない場合はエラー
    if (!session.user.email_confirmed_at) {
      throw new AppError({
        errorType: 'AUTO_LOGIN_ERROR',
        message: new LocaleString({
          ja: 'メール認証が完了していません。',
          en: 'Email verification is not completed.',
        }),
      });
    }

    // ユーザー情報を取得
    const { data: user, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      throw new AppError({
        errorType: 'AUTO_LOGIN_ERROR',
        message: new LocaleString({
          ja: 'ユーザー情報の取得に失敗しました。',
          en: 'Failed to get user information.',
        }),
      });
    }

    if (!user) {
      throw new AppError({
        errorType: 'AUTO_LOGIN_ERROR',
        message: new LocaleString({
          ja: 'ユーザー情報が見つかりません。',
          en: 'User information not found.',
        }),
      });
    }

    return {
      session,
      user: user.user,
    };
  } catch (error) {
    // 予期しないエラーの場合
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError({
      errorType: 'AUTO_LOGIN_ERROR',
      message: new LocaleString({
        ja: '自動ログイン中にエラーが発生しました。',
        en: 'An error occurred during auto login.',
      }),
    });
  }
};
