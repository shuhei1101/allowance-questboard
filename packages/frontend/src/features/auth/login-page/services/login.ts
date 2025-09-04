import { LocaleString } from '@backend/core/messages/localeString';
import { SelectFamilyDialog } from '../models/selectFamilyDialog';
import { FamilyName } from '@backend/features/family/value-object/familyName';
import { LoginHandler } from '@backend/features/auth/router/loginRouter';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';
import { AppError } from '@backend/core/errors/appError';
import { SetSelectFamilyDialog } from '../stores/loginPageStore';

interface LoginParams {
  setSelectFamilyDialog: SetSelectFamilyDialog,
  loginHandler: LoginHandler
}
export type Login = (params: LoginParams) => Promise<void>;

/**
 * ログインユースケース
 * 
 * JWTトークンを使用してログインAPIを呼び出し、
 * 認証情報をセッションストアに保存する
 * 
 * @param params ログインパラメータ
 * @returns ログイン結果
 * @throws BaseAppException ログインに失敗した場合
 */
export const login: Login = async (params: LoginParams): Promise<void> => {
  try {
    // ログインAPIを実行
    const response = await params.loginHandler.query();

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
    
    params.setSelectFamilyDialog(
      new SelectFamilyDialog({
        familyName: new FamilyName(response.familyName),
      })
    )
  } catch (error) {
    // tRPCエラーをBaseAppExceptionに変換して再スロー
    throw AppError.fromTRPCError({
      error,
      fallbackErrorType: 'LOGIN_ERROR',
      fallbackMessage: new LocaleString({
        ja: AuthErrorMessages.internalServerError().ja,
        en: AuthErrorMessages.internalServerError().en,
      })
    });
  }
};
