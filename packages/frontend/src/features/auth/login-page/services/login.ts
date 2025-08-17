import { UpdateSelectFamilyDialog } from '../stores/loginPageStore';
import { LocaleString } from '@backend/core/messages/localeString';
import { SelectFamilyDialog } from '../models/selectFamilyDialog';
import { FamilyName } from '@backend/features/family/entity/value-object/familyName';
import { LoginRouter } from '@backend/features/auth/router/loginRouter';
import { BaseAppException } from '@backend/core/errors/baseAppException';
import { AuthErrorMessages } from '@backend/core/messages/authErrorMessages';

interface LoginParams {
  updateSelectFamilyDialog: UpdateSelectFamilyDialog,
  router: LoginRouter
}
export type Login = (params: LoginParams) => void;

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
export const login = async (params: LoginParams): Promise<void> => {
  try {
    // ログインAPIを実行
    const response = await params.router.query();

    // responseから状態を更新
    params.updateSelectFamilyDialog(
      new SelectFamilyDialog({
        familyName: new FamilyName(response.familyName),
      })
    )
  } catch (error) {
    // tRPCエラーをBaseAppExceptionに変換して再スロー
    throw BaseAppException.fromTRPCError({
      error,
      fallbackErrorType: 'LOGIN_ERROR',
      fallbackMessage: new LocaleString({
        ja: AuthErrorMessages.internalServerError().ja,
        en: AuthErrorMessages.internalServerError().en,
      })
    });
  }
};
