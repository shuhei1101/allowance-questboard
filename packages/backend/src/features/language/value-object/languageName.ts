import { LocaleString } from '@backend/core/messages/localeString';
import { BaseValueObject } from '../../../core/value-object/baseValueObject';
import { z } from 'zod';

/**
 * LanguageNameのZodスキーマ
 */
export const LanguageNameSchema = z.object({
  value: z.string()
});

/**
 * 言語名の値オブジェクト
 * PythonのLanguageNameクラスのTypeScript版
 */
export class LanguageName extends BaseValueObject<string, typeof LanguageNameSchema> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    this.validator.required();
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "言語名",
      en: "Language Name"
    });
  }

  /**
   * Zodスキーマから新しいLanguageNameインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof LanguageNameSchema>): LanguageName {
    return new LanguageName(data.value);
  }
}
