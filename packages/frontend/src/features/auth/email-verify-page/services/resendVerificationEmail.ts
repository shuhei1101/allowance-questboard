import { supabase } from '@/core/supabase/supabase';
import { LocaleString } from '@backend/core/messages/localeString';
import { AppError } from '@backend/core/errors/appError';
import { Email } from '@backend/features/auth/value-object/email';

interface ResendVerificationEmailParams {
  /** 再送するメールアドレス */
  email: Email;
}

export type ResendVerificationEmail = (params: ResendVerificationEmailParams) => Promise<void>;

/**
 * 確認メール再送サービス
 * 
 * Supabaseを使用して確認メールを再送する
 * 
 * @param params 再送パラメータ
 * @throws AppError メール再送に失敗した場合
 */
export const resendVerificationEmail: ResendVerificationEmail = async (params: ResendVerificationEmailParams): Promise<void> => {
  try {
    // Supabaseで確認メール再送
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: params.email.value,
    });

    if (error) {
      // Supabaseのエラーメッセージに応じて適切なエラーを投げる
      let errorMessage: LocaleString;
      
      switch (error.message) {
        case 'Email rate limit exceeded':
          errorMessage = new LocaleString({
            ja: 'メール送信の制限に達しました。しばらく時間をおいてから再度お試しください。',
            en: 'Email rate limit exceeded. Please try again after some time.',
          });
          break;
        case 'Invalid email address':
          errorMessage = new LocaleString({
            ja: 'メールアドレスが正しくありません。',
            en: 'Invalid email address.',
          });
          break;
        case 'User not found':
          errorMessage = new LocaleString({
            ja: 'ユーザーが見つかりません。',
            en: 'User not found.',
          });
          break;
        default:
          errorMessage = new LocaleString({
            ja: 'メールの再送に失敗しました。',
            en: 'Failed to resend verification email.',
          });
      }

      throw new AppError({
        errorType: 'EMAIL_RESEND_ERROR',
        message: errorMessage,
      });
    }

    // 成功時は何もしない（エラーがなければ成功）
  } catch (error) {
    // 予期しないエラーの場合
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError({
      errorType: 'EMAIL_RESEND_ERROR',
      message: new LocaleString({
        ja: 'メール再送中にエラーが発生しました。',
        en: 'An error occurred while resending verification email.',
      }),
    });
  }
};
