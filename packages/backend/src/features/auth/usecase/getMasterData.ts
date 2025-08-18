import { BaseAppException } from "@backend/core/errors/baseAppException";
import { LocaleString } from "@backend/core/messages/localeString";
import { FamilyMemberType } from "@backend/features/family-member/enum/familyMemberType";
import { LanguageType } from "@backend/features/language/enum/languageType";
import { IconCategoryRepository } from "@backend/features/icon-category/repository/iconCategoryRepository";

/**
 * マスタデータを取得する
 * 言語Enumと家族メンバータイプEnum、アイコンカテゴリのtoZodDataメソッドを呼び出し、Zodスキーマ形式で返す
 * @param iconCategoryRepository アイコンカテゴリリポジトリ
 * @returns マスタデータのZodスキーマ
 */
export async function getMasterData(iconCategoryRepository: IconCategoryRepository) {
  try {
    // アイコンカテゴリを取得
    const iconCategories = await iconCategoryRepository.findAllWithIcons();
    
    return {
      languages: LanguageType.toZodData(),
      familyMemberTypes: FamilyMemberType.toZodData(),
      iconCategories: iconCategories.toZodData(),
    };
  } catch (error) {
    throw new BaseAppException({
      errorType: 'GET_MASTER_DATA_ERROR',
      message: new LocaleString({
        ja: 'マスタデータの取得に失敗しました',
        en: 'Failed to fetch master data'
      })
    });
  }
}
