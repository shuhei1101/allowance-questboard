import { BaseId, BaseIdSchema } from '@backend/core/value-object/base_id';
import { LocaleString } from '../../../core/messages/localeString';
import { z } from 'zod';

/**
 * スクリーンのIDを表す値オブジェクト
 * PythonのScreenIdクラスのTypeScript版
 */
export class ScreenId extends BaseId {
  constructor(value: number) {
    super(value);
  }

  /** 
   * @override
   */
  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "スクリーンID",
      en: "Screen ID"
    });
  }

  /**
   * Zodスキーマから新しいScreenIdインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof BaseIdSchema>): ScreenId {
    return new ScreenId(data);
  }
}
