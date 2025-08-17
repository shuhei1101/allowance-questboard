import { LocaleString } from '../messages/localeString';
import { RelationValidateException } from './validationException';
import { ValidationErrorMessages } from '../messages/validationErrorMessages';

/**
 * 関連バリデーションを提供するクラス（BaseModelで使用）
 */
class RelationValidator {

  /**
   * 確認一致チェック（パスワード確認など）
   */
  confirmation(
    value: string, 
    confirmationValue: string, 
    fieldName: LocaleString, 
    optionMessage?: LocaleString
  ): RelationValidator {
    if (value !== confirmationValue) {
      throw new RelationValidateException({
        errorType: "confirmation_mismatch",
        message: optionMessage ?? ValidationErrorMessages.confirmationMismatch(fieldName)
      });
    }
    return this;
  }

  /**
   * 日付範囲チェック（開始日 <= 終了日）
   */
  dateRange(
    startDate: Date, 
    endDate: Date, 
    startFieldName: LocaleString, 
    endFieldName: LocaleString, 
    optionMessage?: LocaleString
  ): RelationValidator {
    if (startDate > endDate) {
      throw new RelationValidateException({
        errorType: "date_range_invalid",
        message: optionMessage ?? ValidationErrorMessages.dateRangeInvalid(startFieldName, endFieldName)
      });
    }
    return this;
  }

  /**
   * 日時範囲チェック（開始日時 <= 終了日時）
   */
  dateTimeRange(
    startDateTime: Date, 
    endDateTime: Date,
    startFieldName: LocaleString, 
    endFieldName: LocaleString, 
    optionMessage?: LocaleString
  ): RelationValidator {
    if (startDateTime > endDateTime) {
      throw new RelationValidateException({
        errorType: "datetime_range_invalid",
        message: optionMessage ?? ValidationErrorMessages.dateTimeRangeInvalid(startFieldName, endFieldName)
      });
    }
    return this;
  }

  /**
   * より大きい値チェック
   */
  greaterThan(
    value: number, 
    compareValue: number,
    valueFieldName: LocaleString, 
    compareFieldName: LocaleString, 
    optionMessage?: LocaleString
  ): RelationValidator {
    if (value <= compareValue) {
      throw new RelationValidateException({
        errorType: "greater_than_invalid",
        message: optionMessage ?? ValidationErrorMessages.greaterThanInvalid(valueFieldName, compareFieldName)
      });
    }
    return this;
  }

  /**
   * 以上チェック
   */
  greaterThanOrEqual(
    value: number, 
    compareValue: number,
    valueFieldName: LocaleString, 
    compareFieldName: LocaleString, 
    optionMessage?: LocaleString
  ): RelationValidator {
    if (value < compareValue) {
      throw new RelationValidateException({
        errorType: "greater_than_or_equal_invalid",
        message: optionMessage ?? ValidationErrorMessages.greaterThanOrEqualInvalid(valueFieldName, compareFieldName)
      });
    }
    return this;
  }

  /**
   * より小さい値チェック
   */
  lessThan(
    value: number, 
    compareValue: number,
    valueFieldName: LocaleString, 
    compareFieldName: LocaleString, 
    optionMessage?: LocaleString
  ): RelationValidator {
    if (value >= compareValue) {
      throw new RelationValidateException({
        errorType: "less_than_invalid",
        message: optionMessage ?? ValidationErrorMessages.lessThanInvalid(valueFieldName, compareFieldName)
      });
    }
    return this;
  }

  /**
   * 以下チェック
   */
  lessThanOrEqual(
    value: number, 
    compareValue: number,
    valueFieldName: LocaleString, 
    compareFieldName: LocaleString, 
    optionMessage?: LocaleString
  ): RelationValidator {
    if (value > compareValue) {
      throw new RelationValidateException({
        errorType: "less_than_or_equal_invalid",
        message: optionMessage ?? ValidationErrorMessages.lessThanOrEqualInvalid(valueFieldName, compareFieldName)
      });
    }
    return this;
  }

  /**
   * 不一致チェック
   */
  notEqual(
    value: any, 
    compareValue: any,
    valueFieldName: LocaleString, 
    compareFieldName: LocaleString, 
    optionMessage?: LocaleString
  ): RelationValidator {
    if (value === compareValue) {
      throw new RelationValidateException({
        errorType: "not_equal_invalid",
        message: optionMessage ?? ValidationErrorMessages.notEqualInvalid(valueFieldName, compareFieldName)
      });
    }
    return this;
  }

  /**
   * 年齢と生年月日の整合性チェック
   */
  ageConsistency(
    birthDate: Date, 
    age: number, 
    fieldName: LocaleString, 
    optionMessage?: LocaleString
  ): RelationValidator {
    const today = new Date();
    const birthYear = birthDate.getFullYear();
    const currentYear = today.getFullYear();
    
    let calculatedAge = currentYear - birthYear;
    
    // 誕生日がまだ来ていない場合は1歳引く
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    
    if (calculatedAge !== age) {
      throw new RelationValidateException({
        errorType: "age_consistency_invalid",
        message: optionMessage ?? ValidationErrorMessages.ageConsistencyInvalid(fieldName)
      });
    }
    return this;
  }

  /**
   * 依存関係チェック（Aが設定されている場合、Bも必須）
   */
  dependency(
    dependentValue: any, 
    requiredValue: any,
    dependentFieldName: LocaleString, 
    requiredFieldName: LocaleString, 
    optionMessage?: LocaleString
  ): RelationValidator {
    if (dependentValue != null && requiredValue == null) {
      throw new RelationValidateException({
        errorType: "dependency_invalid",
        message: optionMessage ?? ValidationErrorMessages.dependencyInvalid(dependentFieldName, requiredFieldName)
      });
    }
    return this;
  }

  /**
   * 相互排他チェック（どちらか一方のみ設定可能）
   */
  mutualExclusion(
    value1: any, 
    value2: any,
    field1Name: LocaleString, 
    field2Name: LocaleString, 
    optionMessage?: LocaleString
  ): RelationValidator {
    if (value1 != null && value2 != null) {
      throw new RelationValidateException({
        errorType: "mutual_exclusion_invalid",
        message: optionMessage ?? ValidationErrorMessages.mutualExclusionInvalid(field1Name, field2Name)
      });
    }
    return this;
  }

  /**
   * 数量の整合性チェック（合計と内訳の一致）
   */
  quantityConsistency(
    total: number, 
    parts: number[],
    totalFieldName: LocaleString, 
    partFieldNames: LocaleString, 
    optionMessage?: LocaleString
  ): RelationValidator {
    const calculatedTotal = parts.reduce((sum, part) => sum + part, 0);
    if (Math.abs(total - calculatedTotal) > 0.01) { // 浮動小数点の誤差を考慮
      throw new RelationValidateException({
        errorType: "quantity_consistency_invalid",
        message: optionMessage ?? ValidationErrorMessages.quantityConsistencyInvalid(totalFieldName, partFieldNames)
      });
    }
    return this;
  }
}

export const relationValidator = new RelationValidator();
