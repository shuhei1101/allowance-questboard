import { LocaleString } from "../messages/localeString";
import { Hashable } from "../models/baseCollection";
import { BaseValueObject } from "./baseValueObject";
import { z } from 'zod';

/**
 * BaseIdのZodスキーマ
 */
export const BaseIdSchema = z.number();

/**
 * ドメインモデルのIDを表す基底クラス
 */
export abstract class BaseId extends BaseValueObject<number, typeof BaseIdSchema> implements Hashable {
  constructor(value: number) {
    super({ value });
  }

  /** 
   * @override
   */
  protected get valueName(): LocaleString {
    return new LocaleString({
      ja: "ID",
      en: "ID"
    });
  }

  /** 
   * @override
   */
  protected validate(): void {
    this.validator.required();
    this.validator.integer();
    this.validator.minValue(1);
  }

  /**
   * IDを整数として返す
   */
  toNumber(): number {
    return this._value;
  }

  /**
   * IDを文字列として返す
   */
  toString(): string {
    return this._value.toString();
  }

  /**
   * ハッシュ値の計算（辞書のキーとして使用可能にする）
   * TypeScriptでは組み込みハッシュ機能がないので、単純に値を返す
   */
  hash(): number {
    return this._value;
  }
}
