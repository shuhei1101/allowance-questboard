import { LanguageRepository } from '../../language/repository/languageRepository';
import { FamilyMemberTypeRepository } from '../../family-member/repository/familyMemberTypeRepository';
import { AppError } from '@backend/core/errors/appError';
import { LocaleString } from '@backend/core/messages/localeString';

/**
 * マスタデータ初期化のパラメータ
 */
export interface InitMasterDataParams {
  languageRepository: LanguageRepository;
  familyMemberTypeRepository: FamilyMemberTypeRepository;
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
    ]);

    console.log('マスタデータの初期化が完了しました');
  } catch (error) {
    throw new AppError({
      errorType: 'INIT_MASTER_DATA_ERROR',
      message: new LocaleString({
        ja: 'マスタデータの初期化に失敗しました',
        en: 'Failed to initialize master data'
      })
    });
  }
}
