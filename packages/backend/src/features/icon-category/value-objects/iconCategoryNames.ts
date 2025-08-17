import { IconCategoryNameByLanguage } from './iconCategoryNameByLanguage';
import { IconCategoryName } from './iconCategoryName';
import { LanguageId } from '@backend/features/language/value-object/languageId';
import { IconCategoryTranslationEntity } from '../entity/iconCategoryEntity';
import { LanguageType } from '@backend/features/language/enum/languageType';
import { BaseCollection } from '@backend/core/models/baseCollection';

/**
 * アイコンカテゴリ名の値オブジェクト集約
 */
export class IconCategoryNames extends BaseCollection<IconCategoryNameByLanguage, LanguageId> {
  constructor(items: IconCategoryNameByLanguage[]) {
    super(items);
  }

  /**
   * エンティティからアイコンカテゴリ名の集約を生成
   * @param translationDict 言語ごとの翻訳エンティティの辞書
   */
  static fromEntity(translationDict: { [languageId: number]: IconCategoryTranslationEntity }): IconCategoryNames {
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

  /**
   * カスタムインデックス更新
   */
  protected _updateCustomIndex(): void {
    // デフォルト辞書以外を使用する場合はここで実装
  }
}
