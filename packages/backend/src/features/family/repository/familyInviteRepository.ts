import { BaseRepository, BaseRepositoryDependencies } from "@backend/core/repository/baseRepository";
import { FamilyInviteDao } from "../dao/familyInviteDao";
import { FamilyInvite } from "../models/familyInvite";
import { FamilyInviteId } from "../value-object/familyInviteId";
import { FamilyId } from "../value-object/familyId";
import { InviteCode } from "../value-object/inviteCode";
import { FamilyInviteFactory } from "../models/familyInviteFactory";

/**
 * FamilyInviteRepositoryの依存関係
 */
export interface FamilyInviteRepositoryDependencies extends BaseRepositoryDependencies {
  familyInviteDao: FamilyInviteDao;
}

/**
 * 家族招待のデータ永続化を管理するリポジトリクラス
 */
export class FamilyInviteRepository extends BaseRepository {
  private familyInviteDao: FamilyInviteDao;

  constructor(deps: FamilyInviteRepositoryDependencies) {
    super(deps);
    this.familyInviteDao = deps.familyInviteDao;
  }

  /**
   * 招待IDで招待を取得
   */
  async findById(id: FamilyInviteId): Promise<FamilyInvite | undefined> {
    const entity = await this.familyInviteDao.fetchById(id.value);
    if (!entity) {
      return undefined;
    }

    return FamilyInviteFactory.fromEntity(entity);
  }

    /**
   * 招待コードで招待を取得
   */
  async findByInviteCode(inviteCode: InviteCode): Promise<FamilyInvite | undefined> {
    const entity = await this.familyInviteDao.findByInviteCode(inviteCode.value);

    if (!entity) {
      return undefined;
    }

    return FamilyInviteFactory.fromEntity(entity);
  }

  /**
   * 家族IDで有効な招待を取得（複数発行防止用）
   */
  async findActiveByFamilyId(familyId: FamilyId): Promise<FamilyInvite | undefined> {
    const entity = await this.familyInviteDao.findActiveByFamilyId(familyId.value);

    if (!entity) {
      return undefined;
    }

    return FamilyInviteFactory.fromEntity(entity);
  }

  /**
   * 招待を作成
   */
  async create(invite: FamilyInvite): Promise<FamilyInviteId> {
    const entity = FamilyInviteFactory.toEntity(invite);

    const id = await this.familyInviteDao.insert(entity);
    return new FamilyInviteId(id);
  }

  /**
   * 招待を更新（主に使用済みにマークする用途）
   */
  async update(invite: FamilyInvite): Promise<void> {
    if (!invite.id) {
      throw new Error("更新処理には招待IDが必要");
    }

    const entity = FamilyInviteFactory.toEntity(invite);

    await this.familyInviteDao.update(entity);
  }

  /**
   * 招待を削除
   */
  async delete(id: FamilyInviteId): Promise<void> {
    await this.familyInviteDao.delete(id.value);
  }

  /**
   * 期限切れの招待を削除（クリーンアップ用）
   */
  async deleteExpired(): Promise<void> {
    await this.familyInviteDao.deleteExpired();
  }
}
