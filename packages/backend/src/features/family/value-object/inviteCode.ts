import { LocaleString } from "../../../core/messages/localeString";
import { BaseValueObject } from "../../../core/value-object/baseValueObject";
import { z } from 'zod';
import * as crypto from 'crypto';

/**
 * InviteCodeのZodスキーマ
 */
export const InviteCodeSchema = z.string();

/**
 * 招待コードを表す値オブジェクト
 */
export class InviteCode extends BaseValueObject<string, typeof InviteCodeSchema> {
  constructor(value: string) {
    super({ value });
  }

  protected validate(): void {
    this.validator
      .required()
      .minLength(6)
      .maxLength(8)
      .containsOnly("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", new LocaleString({
        ja: "招待コードは6〜8桁の英数字（大文字）である必要があります",
        en: "Invite code must be 6-8 characters of uppercase letters and numbers"
      }));
  }

  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "招待コード",
      en: "Invite Code"
    });
  }

  /**
   * ランダムな招待コードを生成する
   * @returns 生成された招待コード
   */
  static generate(): InviteCode {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 6; // 6桁固定
    let result = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, characters.length);
      result += characters[randomIndex];
    }
    
    return new InviteCode(result);
  }

  /**
   * 招待コードの値を取得する
   */
  get code(): string {
    return this.value;
  }
}
