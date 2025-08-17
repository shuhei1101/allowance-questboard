import { BaseTranslationEnum } from '@backend/core/enum/baseEnum';
import { IconCategoryId } from '../value-objects/iconCategoryId';
import { IconCategoryValue, IconCategoryValueSchema } from '../value-objects/iconCategoryValue';
import { IconCategoryEntity, IconCategoryTranslationEntity, IconCategoryTranslationEntities } from '../entity/iconCategoryEntity';

/**
 * アイコンカテゴリの種類
 * 疑似Enumクラス
 */
class IconCategoryEnum extends BaseTranslationEnum<
  IconCategoryValue,
  IconCategoryId,
  IconCategoryTranslationEntity,
  IconCategoryTranslationEntities,
  typeof IconCategoryValueSchema
> {
  readonly ACTION = new IconCategoryValue(new IconCategoryId(1));
  readonly NAVIGATION = new IconCategoryValue(new IconCategoryId(2));
  readonly COMMUNICATION = new IconCategoryValue(new IconCategoryId(3));

  /**
   * すべてのEnum値を返す（基底クラスの抽象メソッド実装）
   */
  protected getAllValues(): IconCategoryValue[] {
    return [this.ACTION, this.NAVIGATION, this.COMMUNICATION];
  }

  /**
   * Zodスキーマに準拠したデータを返す
   */
  toZodData(): any {
    return {
      ACTION: this.ACTION.toZodData(),
      NAVIGATION: this.NAVIGATION.toZodData(),
      COMMUNICATION: this.COMMUNICATION.toZodData()
    };
  }

  /**
   * Zodスキーマから値オブジェクトを初期化
   * @param data Zodスキーマに準拠したデータ
   */
  setFromZodData(data: any): void {
    if (data.ACTION) this.ACTION.setFromZodData(data.ACTION);
    if (data.NAVIGATION) this.NAVIGATION.setFromZodData(data.NAVIGATION);
    if (data.COMMUNICATION) this.COMMUNICATION.setFromZodData(data.COMMUNICATION);
  }
}

/**
 * アイコンカテゴリEnumのインスタンス（シングルトン）
 */
export const IconCategory = new IconCategoryEnum();
