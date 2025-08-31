import { ParentRepository } from '@backend/features/parent/repository/parentRepository';
import { UserId } from '@backend/features/auth/value-object/userId';
import { FamilyId } from '@backend/features/family/value-object/familyId';
import { AppError } from '@backend/core/errors/appError';
import { LocaleString } from '@backend/core/messages/localeString';

/** 親ユーザーから家族ID取得サービスのパラメータ */
export interface GetFamilyIdByUserParams {
  /** ユーザーID */
  userId: UserId;
  /** 親リポジトリ */
  parentRepository: ParentRepository;
}

/** 親ユーザーから家族ID取得サービスの結果 */
export interface GetFamilyIdByUserResult {
  /** 家族ID */
  familyId: FamilyId;
}

/** 親ユーザーから家族ID取得サービス
 * 
 * 認証済みユーザーIDから親エンティティを検索し、
 * その親が所属する家族IDを取得する */
export async function getFamilyIdByUser(params: GetFamilyIdByUserParams): Promise<GetFamilyIdByUserResult> {
  const parent = await params.parentRepository.findByUserId({ userId: params.userId });
  
  if (!parent) {
    throw new AppError({
      errorType: "PARENT_NOT_FOUND",
      message: new LocaleString({
        ja: "親ユーザーが見つかりません",
        en: "Parent user not found"
      })
    });
  }

  return {
    familyId: parent.familyId
  };
}
