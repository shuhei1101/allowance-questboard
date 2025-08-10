import { LanguageType } from '@shared/features/language/enum/languageType';
import { FamilyMemberType } from '@shared/features/family-member/enum/familyMemberType';

/**
 * マスタデータを取得する
 * 言語Enumと家族メンバータイプEnumのtoZodDataメソッドを呼び出し、Zodスキーマ形式で返す
 * @returns マスタデータのZodスキーマ
 */
export async function getMasterData() {
  try {
    return {
      languages: LanguageType.toZodData(),
      familyMemberTypes: FamilyMemberType.toZodData()
    };
  } catch (error) {
    throw new Error(`マスタデータ取得中にエラーが発生しました: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
