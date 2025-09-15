import { LoginHandler, LoginResponse } from '@backend/features/auth/router/loginRouter';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';
import { AppError } from '@backend/core/errors/appError';
import { LocaleString } from '../../../../../../backend/src/core/messages/localeString';

interface LoginParams {
  loginHandler: LoginHandler,
}
export type Login = (params: LoginParams) => Promise<void>;

/**
 * ログインユースケース
 * 
 * JWTトークンを使用してログインAPIを呼び出し、
 * 
 * @param params ログインパラメータ
 * @returns ログイン結果
 * @throws BaseAppException ログインに失敗した場合
 */
export const login: Login = async (params: LoginParams): Promise<void> => {
  let response: LoginResponse;
  try {
    // ログインAPIを実行
    response = await params.loginHandler.query();
    console.log('ログイン成功:', response);
  } catch (error) {
    // tRPCエラーをBaseAppExceptionに変換して再スロー
    throw AppError.fromTRPCError({
      error,
      fallbackErrorType: 'LOGIN_ERROR',
      fallbackMessage: AuthErrorMessages.internalServerError()
    });
  }

    // responseから状態を更新
    if (!response.familyName) {
      throw new AppError({
        errorType: 'LOGIN_ERROR',
        message: new LocaleString({
          ja: 'ファミリー名が取得できませんでした。',
          en: 'Family name could not be retrieved.',
        })
      });
    }
};
