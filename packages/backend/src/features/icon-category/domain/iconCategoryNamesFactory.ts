import { LanguageType } from "@backend/features/language/enum/languageType";
import { IconCategoryTranslationEntity } from "../entity/iconCategoryEntity";
import { IconCategoryNameByLanguage } from "./iconCategoryNameByLanguage";
import { IconCategoryNames } from "./iconCategoryNames";
import { IconCategoryName } from "../value-objects/iconCategoryName";
import { LanguageId } from "@backend/features/language/value-object/languageId";

/**
 * エンティティからアイコンカテゴリ名の集約を生成
 * @param translationDict 言語ごとの翻訳エンティティの辞書
 */
export const fromEntity = (translationDict: { [languageId: number]: IconCategoryTranslationEntity }): IconCategoryNames => {
  const nameList: IconCategoryNameByLanguage[] = [];
  
  for (const translation of Object.values(translationDict)) {
    if (translation instanceof IconCategoryTranslationEntity) {
      const languageType = LanguageType.getValueById(new LanguageId(translation.languageId));
      const categoryName = new IconCategoryName(translation.name);
      nameList.push(new IconCategoryNameByLanguage(languageType, categoryName));
    }
  }
  
  return new IconCategoryNames(nameList);
}
