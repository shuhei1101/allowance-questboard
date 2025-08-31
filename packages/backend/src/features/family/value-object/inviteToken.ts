import { LocaleString } from "../../../core/messages/localeString";
import { BaseValueObject } from "../../../core/value-object/baseValueObject";
import { z } from 'zod';
import * as crypto from 'crypto';

/**
 * InviteTokenのZodスキーマ
 */
export const InviteTokenSchema = z.string();

/**
 * 招待トークンを表す値オブジェクト
 */
export class InviteToken extends BaseValueObject<string, typeof InviteTokenSchema> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    this.validator
      .required()
      .minLength(64)
      .maxLength(256);
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "招待トークン",
      en: "Invite Token"
    });
  }

  /**
   * ランダムな招待トークンを生成
   * @returns 新しいInviteTokenインスタンス
   */
  static generate(): InviteToken {
    const randomBytes = crypto.randomBytes(48); // 48バイト = 64文字のBase64
    const token = randomBytes.toString('base64url'); // URL-safe Base64
    return new InviteToken(token);
  }

  /**
   * Zodスキーマから新しいInviteTokenインスタンスを作成
   * @param data Zodスキーマに準拠したデータ
   */
  static fromZodData(data: z.infer<typeof InviteTokenSchema>): InviteToken {
    return new InviteToken(data);
  }
}
