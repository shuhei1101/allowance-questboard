import { IconCategoryNameByLanguage, IconCategoryNameByLanguageSchema } from './iconCategoryNameByLanguage';
import { IconCategoryName } from './iconCategoryName';
import { LanguageId } from '@backend/features/language/value-object/languageId';
import { IconCategoryTranslationEntity } from '../entity/iconCategoryEntity';
import { LanguageType } from '@backend/features/language/enum/languageType';
import { BaseCollection } from '@backend/core/models/baseCollection';
import { z } from 'zod';

/**
 * IconCategoryNamesのZodスキーマ
 */
export const IconCategoryNamesSchema = z.object({
  items: z.array(IconCategoryNameByLanguageSchema)
});

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
   * Zodスキーマに準拠したデータを返す
   */
  toZodData(): z.infer<typeof IconCategoryNamesSchema> {
    return {
      items: this.items.map(item => item.toZodData())
    };
  }

  /**
   * Zodスキーマから新しいIconCategoryNamesインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof IconCategoryNamesSchema>): IconCategoryNames {
    const items = data.items.map(item => IconCategoryNameByLanguage.fromZodData(item));
    return new IconCategoryNames(items);
  }

  /**
   * カスタムインデックス更新
   */
  protected updateCustomIndex(): void {
    // デフォルト辞書以外を使用する場合はここで実装
  }
}
