import { LocaleString } from '../messages/localeString';
import { ValueValidateException } from './validationException';
import { errorMessages } from '../messages/errorMessages';

/**
 * 値オブジェクトのバリデーションを提供するクラス
 */
export class ValueValidator<T = any> {
  private readonly valueName: LocaleString;
  private readonly value: T;

  constructor(params: {
    valueName: LocaleString;
    value: T}
  ) {
    this.valueName = params.valueName;
    this.value = params.value;
  }

  // 基本バリデーション

  /**
   * 必須チェック - 値が存在するかどうかを確認
   */
  required(optionMessage?: LocaleString): void {
    if (this.value == null || (typeof this.value === 'string' && this.value.trim() === '')) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: "required",
        message: optionMessage ?? errorMessages.required(this.valueName)
      });
    }
  }

  /**
   * 最大文字数チェック
   */
  maxLength(maxLength: number, optionMessage?: LocaleString): void {
    const strValue = String(this.value);
    if (strValue.length > maxLength) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: "max_length",
        message: optionMessage ?? errorMessages.maxLength(this.valueName, maxLength)
      });
    }
  }

  /**
   * 最小文字数チェック
   */
  minLength(minLength: number, optionMessage?: LocaleString): void {
    const strValue = String(this.value);
    if (strValue.length < minLength) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: "min_length",
        message: optionMessage ?? errorMessages.minLength(this.valueName, minLength)
      });
    }
  }

  /**
   * 半角英数字チェック
   */
  alphanumeric(optionMessage?: LocaleString): void {
    const alphanumericPattern = /^[a-zA-Z0-9]+$/;
    if (!alphanumericPattern.test(String(this.value))) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: "alphanumeric",
        message: optionMessage ?? errorMessages.alphanumeric(this.valueName)
      });
    }
  }

  // フォーマットバリデーション

  /**
   * メールアドレス形式チェック
   */
  email(optionMessage?: LocaleString): void {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(String(this.value))) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: "email_format",
        message: optionMessage ?? errorMessages.emailFormat(this.valueName)
      });
    }
  }

  /**
   * 電話番号形式チェック（日本形式: 090-1234-5678 など）
   */
  phone(optionMessage?: LocaleString): void {
    const phonePattern = /^0\d{1,4}-\d{1,4}-\d{4}$/;
    if (!phonePattern.test(String(this.value))) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: "phone_format",
        message: optionMessage ?? errorMessages.phoneFormat(this.valueName)
      });
    }
  }

  /**
   * URL形式チェック
   */
  url(optionMessage?: LocaleString): void {
    const urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/;
    if (!urlPattern.test(String(this.value))) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: "url_format",
        message: optionMessage ?? errorMessages.urlFormat(this.valueName)
      });
    }
  }

  /**
   * 日付形式チェック（YYYY-MM-DD）
   */
  dateFormat(optionMessage?: LocaleString): void {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const strValue = String(this.value);
    if (!datePattern.test(strValue)) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: "date_format",
        message: optionMessage ?? errorMessages.dateFormat(this.valueName)
      });
    }
    
    // 実際に有効な日付かチェック
    const date = new Date(strValue);
    if (isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== strValue) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: "date_format",
        message: optionMessage ?? errorMessages.dateFormat(this.valueName)
      });
    }
  }

  // 数値バリデーション

  /**
   * 数値チェック
   */
  numeric(optionMessage?: LocaleString): void {
    const numValue = Number(this.value);
    if (isNaN(numValue)) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: "numeric_format",
        message: optionMessage ?? errorMessages.numericFormat(this.valueName)
      });
    }
  }

  /**
   * 整数チェック
   */
  integer(optionMessage?: LocaleString): void {
    const numValue = Number(this.value);
    if (isNaN(numValue) || !Number.isInteger(numValue)) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: "integer_format",
        message: optionMessage ?? errorMessages.integerFormat(this.valueName)
      });
    }
  }

  /**
   * 最小値チェック
   */
  minValue(minValue: number, optionMessage?: LocaleString): void {
    const numValue = Number(this.value);
    if (isNaN(numValue) || numValue < minValue) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: "min_value",
        message: optionMessage ?? errorMessages.minValue(this.valueName, minValue)
      });
    }
  }

  /**
   * 最大値チェック
   */
  maxValue(maxValue: number, optionMessage?: LocaleString): void {
    const numValue = Number(this.value);
    if (isNaN(numValue) || numValue > maxValue) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: "max_value",
        message: optionMessage ?? errorMessages.maxValue(this.valueName, maxValue)
      });
    }
  }

  /**
   * 範囲チェック
   */
  range(minValue: number, maxValue: number, optionMessage?: LocaleString): void {
    const numValue = Number(this.value);
    if (isNaN(numValue) || numValue < minValue || numValue > maxValue) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: "range_value",
        message: optionMessage ?? errorMessages.range(this.valueName, minValue, maxValue)
      });
    }
  }

  // 追加バリデーション

  /**
   * パスワード強度チェック（8文字以上、英数字記号を含む）
   */
  passwordStrength(optionMessage?: LocaleString): void {
    const strValue = String(this.value);
    
    if (strValue.length < 8) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: "password_length",
        message: optionMessage ?? errorMessages.minLength(this.valueName, 8)
      });
    }
    
    if (!/[a-zA-Z]/.test(strValue)) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: "password_contains_alpha",
        message: optionMessage ?? errorMessages.passwordContainsLowercase(this.valueName)
      });
    }
    
    if (!/\d/.test(strValue)) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: "password_contains_digit",
        message: optionMessage ?? errorMessages.passwordContainsDigit(this.valueName)
      });
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(strValue)) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: "password_contains_symbol",
        message: optionMessage ?? errorMessages.passwordContainsSymbol(this.valueName)
      });
    }
  }

  /**
   * 許可された文字のみを含むかチェック
   */
  containsOnly(allowedChars: string, optionMessage?: LocaleString): void {
    const escapedChars = allowedChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`^[${escapedChars}]+$`);
    if (!pattern.test(String(this.value))) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: "contains_only",
        message: optionMessage ?? errorMessages.containsOnly(this.valueName, allowedChars)
      });
    }
  }

  /**
   * カスタムバリデーション
   */
  custom(validator: (value: T) => boolean, errorType: string, errorMessage: LocaleString): void {
    if (!validator(this.value)) {
      throw new ValueValidateException({
        valueName: this.valueName,
        errorType: errorType,
        message: errorMessage
      });
    }
  }
}
