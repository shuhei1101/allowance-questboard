import { LocaleString } from "../messages/localeString";
import { ValueValidateException } from "../validator/validationException";
import { ValueValidator } from "../validator/valueValidator";
import { z } from 'zod';

/**
 * 値オブジェクトの基底クラス
 */
export abstract class BaseValueObject<TValue, TZodSchema extends z.ZodType = z.ZodObject<{ value: z.ZodType<TValue> }>> {
  protected readonly _value: TValue;
  protected _validator: ValueValidator<TValue> | null = null;
  protected _errorMessage: LocaleString | null = null;

  constructor(params: {
    value: TValue;
  }) {
    this._value = params.value;
    
    try {
      // 初期化後にバリデーターを作成してバリデーション実行
      this.initValidator();
      this.validate();
      this._errorMessage = null;
    } catch (error) {
      if (error instanceof ValueValidateException) {
        this._errorMessage = error.localeMessage;
      } else {
        // 予期しないエラーの場合は再スロー
        throw error;
      }
    }
  }

  /**
   * バリデーターの初期化（コンストラクタ内で呼び出し）
   */
  private initValidator(): void {
    this._validator = new ValueValidator({
      valueName: this.valueName,
      value: this._value
    });
  }

  /**
   * 値オブジェクトの値を検証する（サブクラスで実装）
   */
  protected abstract validate(): void;

  /**
   * 値オブジェクトの名前を取得（サブクラスで実装）
   */
  protected abstract get valueName(): LocaleString;

  /**
   * 値を取得
   */
  get value(): TValue {
    return this._value;
  }

  /**
   * 有効な値かどうかを示す
   */
  get isValid(): boolean {
    return this._errorMessage === null;
  }

  /**
   * エラーメッセージを取得
   */
  get errorMessage(): LocaleString | null {
    return this._errorMessage;
  }

  /**
   * バリデーターを取得
   */
  protected get validator(): ValueValidator<TValue> {
    if (!this._validator) {
      throw new Error('Validator not initialized');
    }
    return this._validator;
  }

  /**
   * 等価比較
   */
  equals(other: unknown): boolean {
    if (!(other instanceof BaseValueObject)) {
      return false;
    }
    return this._value === other._value;
  }

  /**
   * 文字列表現
   */
  toString(): string {
    return String(this._value);
  }

  /**
   * デバッグ用の文字列表現を返す
   * ログ出力時に使用する
   */
  toDebugString(): string {
    return `valueName: ${this.valueName.ja}, value: ${this._value}, errorMessage: ${
      this._errorMessage ? this._errorMessage.ja : null
    }`;
  }

  /**
   * Zodスキーマに準拠したデータを返す
   */
  toZodData(): z.infer<TZodSchema> {
    return {
      value: this._value
    } as z.infer<TZodSchema>;
  }

  /**
   * 静的メソッドfromZodDataの実装
   * サブクラスで実装する必要がある
   */
  static fromZodData(data: any): any {
    throw new Error(`Static method fromZodData must be implemented`);
  }
}
