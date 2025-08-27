import { LocaleString } from '../messages/localeString';
import { ValueValidateError } from './validationError';
import { ValidationErrorMessages } from '../messages/validationErrorMessages';

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
  required(optionMessage?: LocaleString): ValueValidator<T> {
    if (this.value == undefined || (typeof this.value === 'string' && this.value.trim() === '')) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "required",
        message: optionMessage ?? ValidationErrorMessages.required(this.valueName)
      });
    }
    return this;
  }

  /**
   * 最大文字数チェック
   */
  maxLength(maxLength: number, optionMessage?: LocaleString): ValueValidator<T> {
    const strValue = String(this.value);
    if (strValue.length > maxLength) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "max_length",
        message: optionMessage ?? ValidationErrorMessages.maxLength(this.valueName, maxLength)
      });
    }
    return this;
  }

  /**
   * 最小文字数チェック
   */
  minLength(minLength: number, optionMessage?: LocaleString): ValueValidator<T> {
    const strValue = String(this.value);
    if (strValue.length < minLength) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "min_length",
        message: optionMessage ?? ValidationErrorMessages.minLength(this.valueName, minLength)
      });
    }
    return this;
  }

  /**
   * 半角英数字チェック
   */
  alphanumeric(optionMessage?: LocaleString): ValueValidator<T> {
    const alphanumericPattern = /^[a-zA-Z0-9]+$/;
    if (!alphanumericPattern.test(String(this.value))) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "alphanumeric",
        message: optionMessage ?? ValidationErrorMessages.alphanumeric(this.valueName)
      });
    }
    return this;
  }

  // フォーマットバリデーション

  /**
   * メールアドレス形式チェック
   */
  email(optionMessage?: LocaleString): ValueValidator<T> {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(String(this.value))) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "email_format",
        message: optionMessage ?? ValidationErrorMessages.emailFormat(this.valueName)
      });
    }
    return this;
  }

  /**
   * 電話番号形式チェック（日本形式: 090-1234-5678 など）
   */
  phone(optionMessage?: LocaleString): ValueValidator<T> {
    const phonePattern = /^0\d{1,4}-\d{1,4}-\d{4}$/;
    if (!phonePattern.test(String(this.value))) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "phone_format",
        message: optionMessage ?? ValidationErrorMessages.phoneFormat(this.valueName)
      });
    }
    return this;
  }

  /**
   * URL形式チェック
   */
  url(optionMessage?: LocaleString): ValueValidator<T> {
    const urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/;
    if (!urlPattern.test(String(this.value))) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "url_format",
        message: optionMessage ?? ValidationErrorMessages.urlFormat(this.valueName)
      });
    }
    return this;
  }

  /**
   * 日付形式チェック（YYYY-MM-DD）
   */
  dateFormat(optionMessage?: LocaleString): ValueValidator<T> {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const strValue = String(this.value);
    if (!datePattern.test(strValue)) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "date_format",
        message: optionMessage ?? ValidationErrorMessages.dateFormat(this.valueName)
      });
    }
    
    // 実際に有効な日付かチェック
    const date = new Date(strValue);
    if (isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== strValue) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "date_format",
        message: optionMessage ?? ValidationErrorMessages.dateFormat(this.valueName)
      });
    }
    return this;
  }

  // 今日以前の日付チェック
  todayOrBefore(optionMessage?: LocaleString): ValueValidator<T> {
    if (this.value instanceof Date === false) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "date_format",
        message: optionMessage ?? ValidationErrorMessages.dateFormat(this.valueName)
      });
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (this.value > today) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "date_today_or_before",
        message: optionMessage ?? ValidationErrorMessages.dateTodayOrBefore(this.valueName)
      });
    }
    return this;
  }

  // 数値バリデーション

  /**
   * 数値チェック
   */
  numeric(optionMessage?: LocaleString): ValueValidator<T> {
    const numValue = Number(this.value);
    if (isNaN(numValue)) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "numeric_format",
        message: optionMessage ?? ValidationErrorMessages.numericFormat(this.valueName)
      });
    }
    return this;
  }

  /**
   * 整数チェック
   */
  integer(optionMessage?: LocaleString): ValueValidator<T> {
    const numValue = Number(this.value);
    if (isNaN(numValue) || !Number.isInteger(numValue)) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "integer_format",
        message: optionMessage ?? ValidationErrorMessages.integerFormat(this.valueName)
      });
    }
    return this;
  }

  /**
   * 最小値チェック
   */
  minValue(minValue: number, optionMessage?: LocaleString): ValueValidator<T> {
    const numValue = Number(this.value);
    if (isNaN(numValue) || numValue < minValue) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "min_value",
        message: optionMessage ?? ValidationErrorMessages.minValue(this.valueName, minValue)
      });
    }
    return this;
  }

  /**
   * 最大値チェック
   */
  maxValue(maxValue: number, optionMessage?: LocaleString): ValueValidator<T> {
    const numValue = Number(this.value);
    if (isNaN(numValue) || numValue > maxValue) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "max_value",
        message: optionMessage ?? ValidationErrorMessages.maxValue(this.valueName, maxValue)
      });
    }
    return this;
  }

  /**
   * 範囲チェック
   */
  range(minValue: number, maxValue: number, optionMessage?: LocaleString): ValueValidator<T> {
    const numValue = Number(this.value);
    if (isNaN(numValue) || numValue < minValue || numValue > maxValue) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "range_value",
        message: optionMessage ?? ValidationErrorMessages.range(this.valueName, minValue, maxValue)
      });
    }
    return this;
  }

  // 追加バリデーション

  /**
   * パスワード強度チェック（8文字以上、英数字記号を含む）
   */
  passwordStrength(optionMessage?: LocaleString): ValueValidator<T> {
    const strValue = String(this.value);
    
    if (strValue.length < 8) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "password_length",
        message: optionMessage ?? ValidationErrorMessages.minLength(this.valueName, 8)
      });
    }
    
    if (!/[a-zA-Z]/.test(strValue)) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "password_contains_alpha",
        message: optionMessage ?? ValidationErrorMessages.passwordContainsLowercase(this.valueName)
      });
    }
    
    if (!/\d/.test(strValue)) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "password_contains_digit",
        message: optionMessage ?? ValidationErrorMessages.passwordContainsDigit(this.valueName)
      });
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(strValue)) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "password_contains_symbol",
        message: optionMessage ?? ValidationErrorMessages.passwordContainsSymbol(this.valueName)
      });
    }
    return this;
  }

  /**
   * 許可された文字のみを含むかチェック
   */
  containsOnly(allowedChars: string, optionMessage?: LocaleString): ValueValidator<T> {
    const escapedChars = allowedChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`^[${escapedChars}]+$`);
    if (!pattern.test(String(this.value))) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "contains_only",
        message: optionMessage ?? ValidationErrorMessages.containsOnly(this.valueName, allowedChars)
      });
    }
    return this;
  }

  /**
   * 英数字含有チェック
   */
  containsAlphaNumeric(optionMessage?: LocaleString): ValueValidator<T> {
    const strValue = String(this.value);
    
    if (!/[a-zA-Z]/.test(strValue) || !/\d/.test(strValue)) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: "contains_alpha_numeric",
        message: optionMessage ?? new LocaleString({
          ja: `${this.valueName.ja}は英字と数字を含む必要があります`,
          en: `${this.valueName.en} must contain both letters and numbers`
        })
      });
    }
    return this;
  }

  /**
   * カスタムバリデーション
   */
  custom(validator: (value: T) => boolean, errorType: string, errorMessage: LocaleString): ValueValidator<T> {
    if (!validator(this.value)) {
      throw new ValueValidateError({
        valueName: this.valueName,
        errorType: errorType,
        message: errorMessage
      });
    }
    return this;
  }
}
