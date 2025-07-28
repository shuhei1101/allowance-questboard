import 'package:allowance_questboard/core/messages/locale_string.dart';
import 'package:allowance_questboard/core/messages/error_messages.dart';
import 'package:allowance_questboard/core/state/validation/validation_exceptions.dart' show RelationValidationException;

/// 関連バリデーションを提供するクラス（BaseModelで使用）
/// 
/// 複数の値やフィールド間の関係性を検証するためのバリデータ
class RelationValidator {
  /// エラーメッセージ生成クラス
  final ErrorMessages errorMessages;

  /// コンストラクタ
  RelationValidator({ErrorMessages? errorMessages})
      : errorMessages = errorMessages ?? ErrorMessages();

  /// 確認一致チェック（パスワード確認など）
  void validateConfirmation(
    String value,
    String confirmationValue,
    LocaleString fieldName, [
    LocaleString? optionMessage,
  ]) {
    if (value != confirmationValue) {
      throw RelationValidationException(
        errorType: "confirmation_mismatch",
        message: optionMessage ?? errorMessages.confirmationMismatch(fieldName),
      );
    }
  }

  /// 日付範囲チェック（開始日 <= 終了日）
  void validateDateRange(
    DateTime startDate,
    DateTime endDate,
    LocaleString startFieldName,
    LocaleString endFieldName, [
    LocaleString? optionMessage,
  ]) {
    if (startDate.isAfter(endDate)) {
      throw RelationValidationException(
        errorType: "date_range_invalid",
        message: optionMessage ?? errorMessages.dateRangeInvalid(startFieldName, endFieldName),
      );
    }
  }

  /// 日時範囲チェック（開始日時 <= 終了日時）
  void validateDateTimeRange(
    DateTime startDateTime,
    DateTime endDateTime,
    LocaleString startFieldName,
    LocaleString endFieldName, [
    LocaleString? optionMessage,
  ]) {
    if (startDateTime.isAfter(endDateTime)) {
      throw RelationValidationException(
        errorType: "datetime_range_invalid",
        message: optionMessage ?? errorMessages.dateTimeRangeInvalid(startFieldName, endFieldName),
      );
    }
  }

  /// より大きい値チェック
  void validateGreaterThan(
    num value,
    num compareValue,
    LocaleString valueFieldName,
    LocaleString compareFieldName, [
    LocaleString? optionMessage,
  ]) {
    if (value <= compareValue) {
      throw RelationValidationException(
        errorType: "greater_than_invalid",
        message: optionMessage ?? errorMessages.greaterThanInvalid(valueFieldName, compareFieldName),
      );
    }
  }

  /// 以上チェック
  void validateGreaterThanOrEqual(
    num value,
    num compareValue,
    LocaleString valueFieldName,
    LocaleString compareFieldName, [
    LocaleString? optionMessage,
  ]) {
    if (value < compareValue) {
      throw RelationValidationException(
        errorType: "greater_than_or_equal_invalid",
        message: optionMessage ?? errorMessages.greaterThanOrEqualInvalid(valueFieldName, compareFieldName),
      );
    }
  }

  /// より小さい値チェック
  void validateLessThan(
    num value,
    num compareValue,
    LocaleString valueFieldName,
    LocaleString compareFieldName, [
    LocaleString? optionMessage,
  ]) {
    if (value >= compareValue) {
      throw RelationValidationException(
        errorType: "less_than_invalid",
        message: optionMessage ?? errorMessages.lessThanInvalid(valueFieldName, compareFieldName),
      );
    }
  }

  /// 以下チェック
  void validateLessThanOrEqual(
    num value,
    num compareValue,
    LocaleString valueFieldName,
    LocaleString compareFieldName, [
    LocaleString? optionMessage,
  ]) {
    if (value > compareValue) {
      throw RelationValidationException(
        errorType: "less_than_or_equal_invalid",
        message: optionMessage ?? errorMessages.lessThanOrEqualInvalid(valueFieldName, compareFieldName),
      );
    }
  }

  /// 不一致チェック
  void validateNotEqual(
    dynamic value,
    dynamic compareValue,
    LocaleString valueFieldName,
    LocaleString compareFieldName, [
    LocaleString? optionMessage,
  ]) {
    if (value == compareValue) {
      throw RelationValidationException(
        errorType: "not_equal_invalid",
        message: optionMessage ?? errorMessages.notEqualInvalid(valueFieldName, compareFieldName),
      );
    }
  }

  /// 年齢と生年月日の整合性チェック
  void validateAgeConsistency(
    DateTime birthDate,
    int age,
    LocaleString fieldName, [
    LocaleString? optionMessage,
  ]) {
    final today = DateTime.now();
    int calculatedAge = today.year - birthDate.year;
    if (today.isBefore(DateTime(today.year, birthDate.month, birthDate.day))) {
      calculatedAge -= 1;
    }

    if (calculatedAge != age) {
      throw RelationValidationException(
        errorType: "age_consistency_invalid",
        message: optionMessage ?? errorMessages.ageConsistencyInvalid(fieldName),
      );
    }
  }

  /// 依存関係チェック（Aが設定されている場合、Bも必須）
  void validateDependency(
    dynamic dependentValue,
    dynamic requiredValue,
    LocaleString dependentFieldName,
    LocaleString requiredFieldName, [
    LocaleString? optionMessage,
  ]) {
    if (dependentValue != null && requiredValue == null) {
      throw RelationValidationException(
        errorType: "dependency_invalid",
        message: optionMessage ?? errorMessages.dependencyInvalid(dependentFieldName, requiredFieldName),
      );
    }
  }

  /// 相互排他チェック（どちらか一方のみ設定可能）
  void validateMutualExclusion(
    dynamic value1,
    dynamic value2,
    LocaleString field1Name,
    LocaleString field2Name, [
    LocaleString? optionMessage,
  ]) {
    if (value1 != null && value2 != null) {
      throw RelationValidationException(
        errorType: "mutual_exclusion_invalid",
        message: optionMessage ?? errorMessages.mutualExclusionInvalid(field1Name, field2Name),
      );
    }
  }

  /// 数量の整合性チェック（合計と内訳の一致）
  void validateQuantityConsistency(
    num total,
    List<num> parts,
    LocaleString totalFieldName,
    LocaleString partFieldNames, [
    LocaleString? optionMessage,
  ]) {
    final calculatedTotal = parts.fold<num>(0, (sum, part) => sum + part);
    const tolerance = 0.01; // 浮動小数点の誤差を考慮

    if ((total - calculatedTotal).abs() > tolerance) {
      throw RelationValidationException(
        errorType: "quantity_consistency_invalid",
        message: optionMessage ?? errorMessages.quantityConsistencyInvalid(totalFieldName, partFieldNames),
      );
    }
  }
}
