import { LocaleString } from './localeString';

/**
 * エラーメッセージクラス
 * APサーバ側のErrorMessagesと同じ構造を持つ
 */
export class ErrorMessages {
  // 単項目バリデーション用メッセージ
  required(valueName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}は必須です`,
      en: `${valueName.en} is required`
    });
  }

  maxLength(valueName: LocaleString, maxLength: number): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}は${maxLength}文字以下で入力してください`,
      en: `${valueName.en} must be at most ${maxLength} characters long`
    });
  }

  minLength(valueName: LocaleString, minLength: number): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}は${minLength}文字以上で入力してください`,
      en: `${valueName.en} must be at least ${minLength} characters long`
    });
  }

  alphanumeric(valueName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}は半角英数字で入力してください`,
      en: `${valueName.en} must contain only alphanumeric characters`
    });
  }

  emailFormat(valueName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}の形式が正しくありません`,
      en: `${valueName.en} format is invalid`
    });
  }

  phoneFormat(valueName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}の形式が正しくありません（例: 090-1234-5678）`,
      en: `${valueName.en} format is invalid (e.g., 090-1234-5678)`
    });
  }

  urlFormat(valueName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}の形式が正しくありません（例: https://example.com）`,
      en: `${valueName.en} format is invalid (e.g., https://example.com)`
    });
  }

  numericFormat(valueName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}は数値で入力してください`,
      en: `${valueName.en} must be a number`
    });
  }

  integerFormat(valueName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}は整数で入力してください`,
      en: `${valueName.en} must be an integer`
    });
  }

  minValue(valueName: LocaleString, minValue: number): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}は${minValue}以上で入力してください`,
      en: `${valueName.en} must be at least ${minValue}`
    });
  }

  maxValue(valueName: LocaleString, maxValue: number): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}は${maxValue}以下で入力してください`,
      en: `${valueName.en} must be at most ${maxValue}`
    });
  }

  passwordContainsLowercase(valueName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}には小文字を含めてください`,
      en: `${valueName.en} must contain lowercase characters`
    });
  }

  passwordContainsUppercase(valueName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}には大文字を含めてください`,
      en: `${valueName.en} must contain uppercase characters`
    });
  }

  passwordContainsDigit(valueName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}には数字を含めてください`,
      en: `${valueName.en} must contain numeric characters`
    });
  }

  passwordContainsSymbol(valueName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}には記号を含めてください`,
      en: `${valueName.en} must contain symbol characters`
    });
  }

  containsOnly(valueName: LocaleString, allowedChars: string): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}には${allowedChars}の文字のみ使用してください`,
      en: `${valueName.en} must contain only ${allowedChars} characters`
    });
  }

  // RelationValidator用メッセージ
  confirmationMismatch(fieldName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${fieldName.ja}と確認用${fieldName.ja}が一致しません`,
      en: `${fieldName.en} and confirmation ${fieldName.en} do not match`
    });
  }

  dateRangeInvalid(startFieldName: LocaleString, endFieldName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${startFieldName.ja}は${endFieldName.ja}より前の日付で入力してください`,
      en: `${startFieldName.en} must be earlier than ${endFieldName.en}`
    });
  }

  range(valueName: LocaleString, minValue: number, maxValue: number): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}は${minValue}以上${maxValue}以下で入力してください`,
      en: `${valueName.en} must be between ${minValue} and ${maxValue}`
    });
  }

  patternMismatch(valueName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}の形式が正しくありません`,
      en: `${valueName.en} format is invalid`
    });
  }

  lengthRange(valueName: LocaleString, minLength: number, maxLength: number): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}は${minLength}文字以上${maxLength}文字以下で入力してください`,
      en: `${valueName.en} must be between ${minLength} and ${maxLength} characters`
    });
  }

  dateFormat(valueName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}は正しい日付形式(YYYY-MM-DD)で入力してください`,
      en: `${valueName.en} must be in valid date format (YYYY-MM-DD)`
    });
  }

  timeFormat(valueName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}は正しい時刻形式(HH:MM)で入力してください`,
      en: `${valueName.en} must be in valid time format (HH:MM)`
    });
  }

  notInList(valueName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${valueName.ja}は許可された値ではありません`,
      en: `${valueName.en} is not in the allowed values`
    });
  }

  // RelationValidator用メッセージ
  dateTimeRangeInvalid(startFieldName: LocaleString, endFieldName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${startFieldName.ja}は${endFieldName.ja}より前の日時で入力してください`,
      en: `${startFieldName.en} must be earlier than ${endFieldName.en}`
    });
  }

  greaterThanInvalid(valueFieldName: LocaleString, compareFieldName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${valueFieldName.ja}は${compareFieldName.ja}より大きい値で入力してください`,
      en: `${valueFieldName.en} must be greater than ${compareFieldName.en}`
    });
  }

  greaterThanOrEqualInvalid(valueFieldName: LocaleString, compareFieldName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${valueFieldName.ja}は${compareFieldName.ja}以上で入力してください`,
      en: `${valueFieldName.en} must be greater than or equal to ${compareFieldName.en}`
    });
  }

  lessThanInvalid(valueFieldName: LocaleString, compareFieldName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${valueFieldName.ja}は${compareFieldName.ja}より小さい値で入力してください`,
      en: `${valueFieldName.en} must be less than ${compareFieldName.en}`
    });
  }

  lessThanOrEqualInvalid(valueFieldName: LocaleString, compareFieldName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${valueFieldName.ja}は${compareFieldName.ja}以下で入力してください`,
      en: `${valueFieldName.en} must be less than or equal to ${compareFieldName.en}`
    });
  }

  notEqualInvalid(valueFieldName: LocaleString, compareFieldName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${valueFieldName.ja}と${compareFieldName.ja}は異なる値で入力してください`,
      en: `${valueFieldName.en} and ${compareFieldName.en} must be different values`
    });
  }

  ageConsistencyInvalid(fieldName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${fieldName.ja}と生年月日が一致しません`,
      en: `${fieldName.en} and birth date are inconsistent`
    });
  }

  dependencyInvalid(dependentFieldName: LocaleString, requiredFieldName: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${dependentFieldName.ja}が設定されている場合、${requiredFieldName.ja}も必須です`,
      en: `When ${dependentFieldName.en} is set, ${requiredFieldName.en} is also required`
    });
  }

  mutualExclusionInvalid(field1Name: LocaleString, field2Name: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${field1Name.ja}と${field2Name.ja}は同時に設定できません`,
      en: `${field1Name.en} and ${field2Name.en} cannot be set at the same time`
    });
  }

  quantityConsistencyInvalid(totalFieldName: LocaleString, partFieldNames: LocaleString): LocaleString {
    return new LocaleString({
      ja: `${totalFieldName.ja}と${partFieldNames.ja}の合計が一致しません`,
      en: `${totalFieldName.en} and the sum of ${partFieldNames.en} do not match`
    });
  }
}

// グローバルインスタンス（APサーバ側のerror_messagesと同様）
export const errorMessages = new ErrorMessages();
