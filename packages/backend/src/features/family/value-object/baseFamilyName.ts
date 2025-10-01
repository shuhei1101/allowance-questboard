import { LocaleString } from "@backend/core/messages/localeString";
import { BaseValueObject } from "@backend/core/value-object/baseValueObject";
import { z } from 'zod';

/**
 * BaseFamilyNameのZodスキーマ
 */
export const BaseFamilyNameSchema = z.string();

/**
 * 家族名の基底クラス
 * 
 * FamilyNameとFamilyOnlineNameの共通基底クラス
 * バリデーションは行わず、単純にstring値を保持するだけ
 */
export abstract class BaseFamilyName extends BaseValueObject<string, typeof BaseFamilyNameSchema> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    // バリデーションは行わない
    // 派生クラスでそれぞれ独自のバリデーションを実装
  }

  /**
   * Zodスキーマから新しいBaseFamilyNameインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof BaseFamilyNameSchema>): BaseFamilyName {
    throw new Error('BaseFamilyName is abstract class. Use concrete implementation.');
  }
}
