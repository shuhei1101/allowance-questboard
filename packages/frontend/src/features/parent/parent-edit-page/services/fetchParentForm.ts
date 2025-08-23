import { ParentRouter } from '@backend/features/parent/router/parentRouter';
import { ParentId } from '@backend/features/parent/value-object/parentId';
import { ParentForm } from '../models/parentForm';
import { ParentName } from '@backend/features/parent/value-object/parentName';
import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';
import { Birthday } from '@backend/features/shared/value-object/birthday';
import { IconId } from '@backend/features/icon/value-objects/iconId';
import { GetAllIcons } from '@/features/shared/stores/appConfigStore';
import { LocaleString } from '@backend/core/messages/localeString';
import { AppError } from '@backend/core/errors/appError';

interface FetchParentFormParams {
  parentId: ParentId;
  router: ParentRouter;
  getAllIcons: GetAllIcons;
}

/**
 * 親フォーム情報取得ユースケース
 * 
 * JWTトークンを使用して親情報を取得し、
 * ParentFormモデルに変換する
 * 
 * @param params 親フォーム取得パラメータ
 * @returns 親フォーム情報
 * @throws AppError 親情報の取得に失敗した場合
 */
export const fetchParentForm = async (params: FetchParentFormParams): Promise<ParentForm> => {
  try {
    // 親情報取得APIを実行
    const response = await params.router.query({
      parentId: params.parentId.value
    });

    // アイコンデータの取得（iconIdがある場合）
    let icon = null;
    if (response.iconId) {
      const allIcons = params.getAllIcons();
      icon = allIcons?.get(new IconId(response.iconId)) || null;
    }

    // ParentFormインスタンスを作成
    return new ParentForm({
      name: new ParentName(response.name),
      email: new Email(''), // 編集画面では通常メールアドレスは変更しないため空文字
      password: new Password(''), // 編集画面では通常パスワードは変更しないため空文字
      icon: icon,
      birthday: new Birthday(new Date(response.birthday))
    });

  } catch (error) {
    // tRPCエラーをAppErrorに変換して再スロー
    throw AppError.fromTRPCError({
      error,
      fallbackErrorType: 'FETCH_PARENT_ERROR',
      fallbackMessage: new LocaleString({
        ja: '親情報の取得に失敗しました',
        en: 'Failed to fetch parent information',
      })
    });
  }
};
