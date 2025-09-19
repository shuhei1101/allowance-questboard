import { RoleSelectData } from '../models/roleSelectData';
import { LocaleString } from '@backend/core/messages/localeString';
import { AppError } from '@backend/core/errors/appError';
import { LoginRouter } from '../../../../../../backend/src/features/auth/router/loginRouter';

interface FetchRoleSelectDataParams {
  /** loginRouter */
  loginRouter: LoginRouter;
}

/** ロール選択データ取得サービス
 *
 * JWTトークンを使用してloginRouter.loginを呼び出し、
 * ユーザーに紐づく家族・親・子情報を取得してRoleSelectDataに変換する */
export const fetchRoleSelectData = async (params: FetchRoleSelectDataParams): Promise<RoleSelectData> => {
  try {
    // loginRouter.loginを実行してユーザー情報取得
    const response = await params.loginRouter.query();
    
    // RoleSelectDataインスタンスを作成
    return RoleSelectData.fromLoginResponse({
      familyMemberId: response.familyMemberId,
      familyId: response.familyId,
      familyName: response.familyName,
      parentId: response.parentId,
      childId: response.childId,
    });

  } catch (error) {
    // tRPCエラーをAppErrorに変換して再スロー
    throw AppError.fromTRPCError({
      error,
      fallbackErrorType: 'FETCH_ROLE_SELECT_DATA_ERROR',
      fallbackMessage: new LocaleString({
        ja: 'ロール選択データの取得に失敗しました',
        en: 'Failed to fetch role selection data',
      })
    });
  }
};
