import { BaseQueryParams } from "@backend/core/query-service/baseQueryParams";
import { FamilyMemberEntity } from "@backend/features/family-member/entity/familyMemberEntity";
import { ParentEntity } from "@backend/features/parent/entity/parentEntity";

export interface ParentQueryParams extends BaseQueryParams {
  parentId: number;
}

export interface ParentQueryResult {
  parentId: number;
  familyMemberId: number;
  name: string;
  iconId?: number;
  birthday: string;
}

export async function parentQuery(params: ParentQueryParams): Promise<ParentQueryResult> {
  // 親と家族メンバーの情報を1回のクエリで取得
  const queryBuilder = params.session
    .createQueryBuilder(ParentEntity, "p")
    .leftJoinAndSelect(FamilyMemberEntity, "fm", "p.family_member_id = fm.id")
    .select([
      "p.id as parent_id",
      "p.family_member_id as family_member_id",
      "fm.name as name",
      "fm.icon_id as icon_id",
      "fm.birthday as birthday"
    ])
    .where("p.id = :parentId", { parentId: params.parentId });

  const result = await queryBuilder.getRawOne();

  if (!result) {
    throw new Error(`親ID ${params.parentId} が見つかりません`);
  }

  return {
    parentId: result.parent_id,
    familyMemberId: result.family_member_id,
    name: result.name,
    iconId: result.icon_id || undefined,
    birthday: result.birthday
  };
}
