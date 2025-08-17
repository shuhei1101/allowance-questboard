import { LanguageRepository } from '../../language/repository/languageRepository';
import { FamilyMemberTypeRepository } from '../../family-member/repository/familyMemberTypeRepository';
import { IconCategoryRepository } from '@backend/features/icon-category/repository/iconCategoryRepository';

/**
 * マスタデータ初期化のパラメータ
 */
export interface InitMasterDataParams {
  languageRepository: LanguageRepository;
  familyMemberTypeRepository: FamilyMemberTypeRepository;
  iconCategoryRepository: IconCategoryRepository;
}

/**
 * マスタデータを初期化する
 * 各リポジトリのEnum更新メソッドを起動する
 * @param params パラメータ
 * @returns Promise<void>
 */
export async function initMasterData(params: InitMasterDataParams): Promise<void> {
  try {
    // 各リポジトリのEnum更新メソッドを並行実行
    await Promise.all([
      params.languageRepository.updateLanguageEnum(),
      params.familyMemberTypeRepository.updateFamilyMemberTypeEnum(),
      params.iconCategoryRepository.updateIconCategoryEnum()
    ]);

    console.log('マスタデータの初期化が完了しました');
  } catch (error) {
    throw new Error(`マスタデータ初期化中にエラーが発生しました: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
