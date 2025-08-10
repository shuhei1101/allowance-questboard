import { FamilyMemberTypeDao } from '../dao/familyMemberTypeDao';
import { FamilyMemberType } from '@shared/features/family-member/enum/familyMemberType';

/**
 * 家族メンバータイプリポジトリの依存関係
 */
export interface FamilyMemberTypeRepositoryParams {
  familyMemberTypeDao: FamilyMemberTypeDao;
}

/**
 * 家族メンバータイプリポジトリクラス
 * 家族メンバータイプマスタデータの操作を管理する
 */
export class FamilyMemberTypeRepository {
  constructor(private params: FamilyMemberTypeRepositoryParams) {}

  /**
   * 家族メンバーEnumの更新メソッド
   * DAOを使用してEntityを取得し、EntityからEnum値を更新する
   * @returns Promise<void>
   */
  async updateFamilyMemberTypeEnum(): Promise<void> {
    try {
      // DAOを使用してエンティティを取得
      const familyMemberTypeEntities = await this.params.familyMemberTypeDao.fetchAll();
      
      // EntityからEnum値を更新
      FamilyMemberType.updateFromEntities(familyMemberTypeEntities);
      
    } catch (error) {
      throw new Error(`家族メンバーEnum更新中にエラーが発生しました: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
