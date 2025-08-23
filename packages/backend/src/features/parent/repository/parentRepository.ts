import { ParentDao } from "../dao/parentDao";
import { Parent } from "../models/parent";
import { ParentId } from "../value-object/parentId";
import { ParentName } from "../value-object/parentName";
import { ParentEntity } from "../entity/parentEntity";
import { FamilyMemberDao } from "@backend/features/family-member/dao/familyMemberDao";
import { IconId } from "@backend/features/icon/value-objects/iconId";
import { Birthday } from "@backend/features/shared/value-object/birthday";
import { BaseRepository, BaseRepositoryDependencies } from "@backend/core/repository/baseRepository";
import { FamilyId } from "@backend/features/family/value-object/familyId";
import { FamilyMemberEntity } from "@backend/features/family-member/entity/familyMemberEntity";
import { UserId } from "@backend/features/auth/value-object/userId";
import { FamilyMemberId } from "@backend/features/family-member/value-object/familyMemberId";

export interface ParentRepositoryDependencies extends BaseRepositoryDependencies {
  parentDao: ParentDao;
  familyMemberDao: FamilyMemberDao;
}

/**
 * 親のデータ永続化を管理するリポジトリクラス
 */
export class ParentRepository extends BaseRepository {
  private parentDao: ParentDao;
  private familyMemberDao: FamilyMemberDao;
  constructor(deps: ParentRepositoryDependencies) {
    super( deps );
    this.parentDao = deps.parentDao;
    this.familyMemberDao = deps.familyMemberDao;
  }

  async findById(params: {id: ParentId}): Promise<Parent | null> {
    const result = await this.session
      .createQueryBuilder(ParentEntity, "p")
      .leftJoinAndSelect("p.familyMember", "fm")
      .where("p.id = :parentId", { parentId: params.id.value })
      .getOne();

    if (!result) {
      return null;
    }
    
    return new Parent({
      id: new ParentId(result.id),
      name: new ParentName(result.familyMember.name),
      iconId: result.familyMember.iconId ? new IconId(result.familyMember.iconId) : undefined,
      birthday: new Birthday(result.familyMember.birthday),
      familyId: new FamilyId(result.familyId),
      familyMemberId: new FamilyMemberId(result.familyMemberId)
    });
  }

  async findByUserId(params: { userId: UserId }): Promise<Parent | null> {
    const result = await this.session
      .createQueryBuilder(ParentEntity, "p")
      .leftJoinAndSelect("p.familyMember", "fm")
      .where("fm.userId = :userId", { userId: params.userId.value })
      .getOne();
    if (!result) {
      return null;
    }
    return new Parent({
      id: new ParentId(result.id),
      name: new ParentName(result.familyMember.name),
      birthday: new Birthday(result.familyMember.birthday),
      iconId: result.familyMember.iconId ? new IconId(result.familyMember.iconId) : undefined,
      familyId: new FamilyId(result.familyId),
      familyMemberId: new FamilyMemberId(result.familyMemberId)
    });
  }

  async create(params: {
    parent: Parent,
    userId: UserId
  }): Promise<void> {
    const familyMemberId = new FamilyMemberId(
      await this.familyMemberDao.insertWithCache(
        FamilyMemberEntity.fromRaw({
          userId: params.userId.value,
          name: params.parent.name.value,
          iconId: params.parent.iconId ? params.parent.iconId.value : undefined,
          birthday: params.parent.birthday.value
        })
      )
    );
    await this.parentDao.insertWithCache(
      ParentEntity.fromRaw({
        familyId: params.parent.familyId.value,
        familyMemberId: familyMemberId.value
      })
    );
  }

  async update(params: {
    parent: Parent,
    userId: UserId
  }): Promise<void> {
    if (!params.parent.id || !params.parent.familyMemberId) {
      throw new Error("更新処理には親IDと家族メンバーIDが必要");
    }
    
    await Promise.all([
      this.parentDao.updateWithCache(
        ParentEntity.fromRaw({
          id: params.parent.id.value,
          familyId: params.parent.familyId.value,
          familyMemberId: params.parent.familyMemberId.value
        })
      ),
      this.familyMemberDao.updateWithCache(
        FamilyMemberEntity.fromRaw({
          id: params.parent.familyMemberId.value,
          userId: params.userId.value,
          name: params.parent.name.value,
          iconId: params.parent.iconId ? params.parent.iconId.value : undefined,
          birthday: params.parent.birthday.value
        })
      )
    ]);
  }

  async delete(entity: Parent): Promise<void> {
    if (!entity.id || !entity.familyMemberId) {
      throw new Error("削除処理には親IDと家族メンバーIDが必要");
    }
    
    await Promise.all([
      this.parentDao.deleteWithCache(entity.id.value),
      this.familyMemberDao.deleteWithCache(entity.familyMemberId.value)
    ]);
  }
}
