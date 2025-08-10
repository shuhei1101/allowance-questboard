import { LanguageRepository, LanguageRepositoryParams } from '../../language/repository/languageRepository';
import { FamilyMemberTypeRepository, FamilyMemberTypeRepositoryParams } from '../../family-member/repository/familyMemberTypeRepository';

/**
 * マスタデータ初期化のパラメータ
 */
export interface InitMasterDataParams {
  languageRepositoryDeps: LanguageRepositoryParams;
  familyMemberTypeRepositoryDeps: FamilyMemberTypeRepositoryParams;
}

/**
 * マスタデータを初期化する
 * 各リポジトリのEnum更新メソッドを起動する
 * @param params パラメータ
 * @returns Promise<void>
 */
export async function initMasterData(params: InitMasterDataParams): Promise<void> {
  try {
    // リポジトリのインスタンスを作成
    const languageRepository = new LanguageRepository(params.languageRepositoryDeps);
    const familyMemberTypeRepository = new FamilyMemberTypeRepository(params.familyMemberTypeRepositoryDeps);

    // 各リポジトリのEnum更新メソッドを並行実行
    await Promise.all([
      languageRepository.updateLanguageEnum(),
      familyMemberTypeRepository.updateFamilyMemberTypeEnum()
    ]);

    console.log('マスタデータの初期化が完了しました');
  } catch (error) {
    throw new Error(`マスタデータ初期化中にエラーが発生しました: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
