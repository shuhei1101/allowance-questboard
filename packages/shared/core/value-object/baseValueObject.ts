import { LocaleString } from '../messages/localeString';
import { ValueValidator } from '../validator/valueValidator';

/**
 * 値オブジェクトの基底クラス
 */
export abstract class BaseValueObject<ValueType> {
  protected readonly _value: ValueType;
  protected _validator: ValueValidator<ValueType> | null = null;

  constructor(params: {
    value: ValueType;
  }) {
    this._value = params.value;
    // 初期化後にバリデーターを作成してバリデーション実行
    this.initializeValidator();
    this.validate();
  }

  /**
   * バリデーターの初期化（コンストラクタ内で呼び出し）
   */
  private initializeValidator(): void {
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
  get value(): ValueType {
    return this._value;
  }

  /**
   * バリデーターを取得
   */
  protected get validator(): ValueValidator<ValueType> {
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
}
