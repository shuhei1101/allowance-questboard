import { BaseQueryParams } from "@backend/core/query-service/baseQueryParams";
import { ChildEntity } from "@backend/features/child/entity/childEntity";
import { FamilyMemberEntity } from "@backend/features/family-member/entity/familyMemberEntity";
import { FamilyEntity } from "@backend/features/family/entity/familyEntity";
import { ParentEntity } from "@backend/features/parent/entity/parentEntity";

export interface LoginQueryParams extends BaseQueryParams {
  userId: string;
}
export interface LoginQueryResult {
  userId: string;
  familyMemberId: number;
  familyId: number;
  familyName: string;
  parentId?: number | null;
  childId?: number | null;
}

export async function loginQuery(params: LoginQueryParams): Promise<LoginQueryResult> {
  // 家族メンバー、親、子供、家族の情報を1回のクエリで取得
  const queryBuilder = params.session
    .createQueryBuilder(FamilyMemberEntity, "fm")
    .leftJoinAndSelect(ParentEntity, "p", "fm.id = p.family_member_id")
    .leftJoinAndSelect(ChildEntity, "c", "fm.id = c.family_member_id")
    .leftJoinAndSelect(FamilyEntity, "f", "COALESCE(p.family_id, c.family_id) = f.id")
    .select([
      "fm.user_id as user_id",
      "fm.id as family_member_id",
      "COALESCE(p.family_id, c.family_id) as family_id",
      "f.name as family_name",
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
    familyName: result.family_name,
    parentId: result.parent_id || null,
    childId: result.child_id || null
  };
}
