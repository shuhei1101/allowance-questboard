import { LocaleString } from '@backend/core/messages/localeString';
import { BaseValueObject } from '../../../core/value-object/baseValueObject';
import { z } from 'zod';

/**
 * LanguageCodeのZodスキーマ
 */
export const LanguageCodeSchema = z.string();

/**
 * 言語コードの値オブジェクト
 * PythonのLanguageCodeクラスのTypeScript版
 */
export class LanguageCode extends BaseValueObject<string, typeof LanguageCodeSchema> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    this.validator.required();
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "言語コード",
      en: "Language Code"
    });
  }

  /**
   * Zodスキーマから新しいLanguageCodeインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof LanguageCodeSchema>): LanguageCode {
    return new LanguageCode(data);
  }
}
