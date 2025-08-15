import { LanguageId } from '../value-object/languageId';
import { LanguageTypeValue, LanguageTypeValueSchema } from '../value-object/languageTypeValue';
import { z } from "zod";
import { LanguageEntity } from '../entity/languageEntity';
import { BaseSimpleEnum } from '@backend/core/enum/baseEnum';

/**
 * 言語の種類
 * zodスキーマ
 */
export const LanguageTypeSchema = z.object({
  japanese: LanguageTypeValueSchema,
  english: LanguageTypeValueSchema
});

/**
 * 言語の種類
 * 疑似Enumクラス
 */
class LanguageTypeEnum extends BaseSimpleEnum<LanguageTypeValue, LanguageId, LanguageEntity, typeof LanguageTypeSchema> {
  readonly JAPANESE = new LanguageTypeValue(new LanguageId(1));
  readonly ENGLISH = new LanguageTypeValue(new LanguageId(2));

  /**
   * すべてのEnum値を返す（基底クラスの抽象メソッド実装）
   */
  getAllValues(): LanguageTypeValue[] {
    return [this.JAPANESE, this.ENGLISH];
  }

  /**
   * Zodスキーマに準拠したデータを返す
   */
  toZodData(): z.infer<typeof LanguageTypeSchema> {
    return {
      japanese: this.JAPANESE.toZodData(),
      english: this.ENGLISH.toZodData(),
    };
  }

  /**
   * Zodスキーマから値オブジェクトを初期化する
   * @param data Zodスキーマに準拠したデータ
   */
  setFromZodData(data: z.infer<typeof LanguageTypeSchema>): void {
    if (data.japanese) {
      this.JAPANESE.setFromZodData(data.japanese);
    }
    if (data.english) {
      this.ENGLISH.setFromZodData(data.english);
    }
  }
}

export const LanguageType = new LanguageTypeEnum()
