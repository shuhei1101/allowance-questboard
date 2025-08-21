import { BaseValueObject } from '@backend/core/value-object/baseValueObject';
import { LocaleString } from '../../../core/messages/localeString';
import { ValueValidateError } from '../../../core/validator/validationError';
import { z } from 'zod';
import { Hashable } from '@backend/core/models/baseCollection';

/**
 * IconNameのZodスキーマ
 */
export const IconNameSchema = z.object({
  value: z.string()
});

/**
 * アイコン名を表すクラス
 */
export class IconName extends BaseValueObject<string, typeof IconNameSchema> implements Hashable {
  constructor(value: string) {
    super({ value });
  }
  hash(): number | string {
    return this.value;
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "アイコン名", 
      en: "Icon Name"
    });
  }

  protected validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "Required",
        message: new LocaleString({ 
          ja: "アイコン名は必須です", 
          en: "Icon name is required" 
        })
      });
    }

    if (this.value.length > 255) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "MaxLength",
        message: new LocaleString({ 
          ja: "アイコン名は255文字以内で入力してください", 
          en: "Icon name must be 255 characters or less" 
        })
      });
    }
  }

  /**
   * Zodスキーマから新しいIconNameインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof IconNameSchema>): IconName {
    return new IconName(data.value);
  }
}
