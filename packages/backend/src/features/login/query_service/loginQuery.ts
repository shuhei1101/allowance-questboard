import { FamilyMemberEntity } from "@backend/features/family-member/entity/familyMemberEntity";
import { ParentEntity } from "@backend/features/parent/entity/parentEntity";
import { ChildEntity } from "@backend/features/child/entity/childEntity";
import { BaseQueryParams } from "@backend/core/query_service/baseQueryParams";

export interface LoginQueryParams extends BaseQueryParams {
  userId: string;
}

export interface LoginQueryResult {
  userId: string;
  familyMemberId: number;
  familyId: number;
  parentId?: number | null;
  childId?: number | null;
}

/**
 * ログインクエリ
 * 
 * ユーザーIDから認証に必要な情報を取得する
 * 
 * @param params ログインクエリパラメータ
 * @returns ログインクエリ結果
 * @throws Error ユーザーが見つからない場合
 */
export async function loginQuery(params: LoginQueryParams): Promise<LoginQueryResult> {
  // 家族メンバー、親、子供の情報を1回のクエリで取得
  const queryBuilder = params.session
    .createQueryBuilder(FamilyMemberEntity, "fm")
    .leftJoinAndSelect(ParentEntity, "p", "fm.id = p.family_member_id")
    .leftJoinAndSelect(ChildEntity, "c", "fm.id = c.family_member_id")
    .select([
      "fm.user_id as user_id",
      "fm.id as family_member_id",
      "COALESCE(p.family_id, c.family_id) as family_id",
      "p.id as parent_id",
      "c.id as child_id"
    ])
    .where("fm.user_id = :userId", { userId: params.userId });

  const result = await queryBuilder.getRawOne();

  if (!result) {
    throw new Error(`ユーザーID ${params.userId} が見つかりません`);
  }

  return {
    userId: result.user_id,
    familyMemberId: result.family_member_id,
    familyId: result.family_id,
    parentId: result.parent_id || null,
    childId: result.child_id || null
  };
}
