import { BaseAppException } from "@backend/core/errors/baseAppException";
import { LocaleString } from "@backend/core/messages/localeString";
import { FamilyMemberType } from "@backend/features/family-member/enum/familyMemberType";
import { LanguageType } from "@backend/features/language/enum/languageType";

/**
 * マスタデータを取得する
 * 言語Enumと家族メンバータイプEnumのtoZodDataメソッドを呼び出し、Zodスキーマ形式で返す
 * @returns マスタデータのZodスキーマ
 */
export async function getMasterData() {
  try {
    return {
      languages: LanguageType.toZodData(),
      familyMemberTypes: FamilyMemberType.toZodData(),
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
