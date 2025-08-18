import { LanguageType } from "@backend/features/language/enum/languageType";
import { IconCategoryTranslationEntity } from "../entity/iconCategoryEntity";
import { IconCategoryNameByLanguage } from "./iconCategoryNameByLanguage";
import { IconCategoryNames } from "./iconCategoryNames";
import { IconCategoryName } from "../value-objects/iconCategoryName";
import { LanguageId } from "@backend/features/language/value-object/languageId";

class Factory {
  /**
   * エンティティからアイコンカテゴリ名の集約を生成
   * @param translationDict 言語ごとの翻訳エンティティの辞書
   */
  fromEntity(translationDict: { [languageId: number]: IconCategoryTranslationEntity }): IconCategoryNames {
    const nameList: IconCategoryNameByLanguage[] = [];
    
    for (const translation of Object.values(translationDict)) {
      if (translation instanceof IconCategoryTranslationEntity) {
        const languageType = LanguageType.getValueById(new LanguageId(translation.language_id));
        const categoryName = new IconCategoryName(translation.name);
        nameList.push(new IconCategoryNameByLanguage(languageType, categoryName));
      }
    }
    
    return new IconCategoryNames(nameList);
  }
}

export const IconCategoryNamesFactory = new Factory();
