import { LocaleString } from "@backend/core/messages/localeString";
import { BaseId, BaseIdSchema } from "../../../core/value-object/base_id";
import { z } from 'zod';

/**
 * 言語IDを表す値オブジェクト
 * PythonのLanguageIdクラスのTypeScript版
 */
export class LanguageId extends BaseId {
  constructor(value: number) {
    super(value);
  }

  /** 
   * @override
   */
  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "言語ID",
      en: "Language ID"
    });
  }

  /**
   * Zodスキーマから新しいLanguageIdインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof BaseIdSchema>): LanguageId {
    return new LanguageId(data.value);
  }
}
