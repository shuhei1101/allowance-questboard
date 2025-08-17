import { BaseTranslationEnumValue } from '@backend/core/enum/baseEnum';
import { IconCategoryId } from './iconCategoryId';
import { IconCategoryNames } from './iconCategoryNames';
import { IconCategoryEntity, IconCategoryTranslationEntity } from '../entity/iconCategoryEntity';
import { z } from 'zod';

/**
 * アイコンカテゴリValueのZodスキーマ
 */
export const IconCategoryValueSchema = z.object({
  id: z.number(),
  nameByLanguages: z.record(z.string(), z.string()),
  sortOrder: z.number(),
  isActive: z.boolean()
});

/**
 * アイコンカテゴリが持つ値オブジェクト集約
 */
export class IconCategoryValue extends BaseTranslationEnumValue<
  IconCategoryId,
  IconCategoryEntity,
  IconCategoryTranslationEntity,
  typeof IconCategoryValueSchema
> {
  private _nameByLanguages: IconCategoryNames;
  private _sortOrder: number;
  private _isActive: boolean;

  constructor(
    id: IconCategoryId,
    nameByLanguages: IconCategoryNames = IconCategoryNames.fromEmpty(),
    sortOrder: number = 0,
    isActive: boolean = true
  ) {
    super(id);
    this._nameByLanguages = nameByLanguages;
    this._sortOrder = sortOrder;
    this._isActive = isActive;
  }

  /**
   * エンティティから値を設定する
   * @param entity アイコンカテゴリエンティティ
   * @param translationDict 言語IDをキーとした翻訳エンティティのマッピング
   */
  setFromEntity(entity: IconCategoryEntity, translationDict: { [languageId: number]: IconCategoryTranslationEntity }): void {
    this._nameByLanguages = IconCategoryNames.fromEntity(translationDict);
    this._sortOrder = entity.sort_order;
    this._isActive = entity.is_active;
  }

  /**
   * 名前の多言語オブジェクトを取得
   */
  get nameByLanguages(): IconCategoryNames {
    return this._nameByLanguages;
  }

  /**
   * 表示順序を取得
   */
  get sortOrder(): number {
    return this._sortOrder;
  }

  /**
   * アクティブフラグを取得
   */
  get isActive(): boolean {
    return this._isActive;
  }

  /**
   * Zodスキーマに準拠したデータを返す
   */
  toZodData(): z.infer<typeof IconCategoryValueSchema> {
    const namesByLang: Record<string, string> = {};
    for (const name of this._nameByLanguages.items) {
      namesByLang[name.id.value.toString()] = name.value;
    }

    return {
      id: this._id.value,
      nameByLanguages: namesByLang,
      sortOrder: this._sortOrder,
      isActive: this._isActive
    };
  }

  /**
   * Zodスキーマから値オブジェクトを初期化
   * @param data Zodスキーマに準拠したデータ
   */
  setFromZodData(data: z.infer<typeof IconCategoryValueSchema>): void {
    // IDの一致チェック
    if (data.id !== this._id.value) {
      throw new Error(`ID mismatch: expected ${this._id.value}, got ${data.id}`);
    }
    
    // 基本プロパティの設定
    this._sortOrder = data.sortOrder;
    this._isActive = data.isActive;
    
    // nameByLanguagesの復元は複雑なので、必要に応じて後で実装
    // 現在は基本プロパティのみ対応
  }
}
