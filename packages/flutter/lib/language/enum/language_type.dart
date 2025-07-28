import 'package:allowance_questboard/core/enum/base_enum.dart';
import 'package:allowance_questboard/core/enum/enum_mixin.dart';
import 'package:allowance_questboard/language/enum/value_object/language_id.dart';
import 'package:allowance_questboard/language/enum/value_object/language_type_value.dart';
import 'package:allowance_questboard/login/api/v1/init/init_api_response.dart' show LanguageDto;
import 'package:flutter/material.dart' show Locale;

/// 言語の種類を表すEnum
class LanguageType extends BaseEnum<LanguageId> with EnumMixin<LanguageId> {
  /// 日本語
  static final japanese = LanguageType._internal(LanguageTypeValue(id: LanguageId(1)));
  
  /// 英語
  static final english = LanguageType._internal(LanguageTypeValue(id: LanguageId(2)));

  /// 全ての言語タイプ値
  static final List<LanguageType> values = [japanese, english];

  /// LanguageTypeのコンストラクタ（内部用）
  LanguageType._internal(super.value);

  /// IDから言語タイプを取得
  /// 
  /// [id] 言語ID
  /// Returns: 該当する言語タイプ
  /// Throws: [ArgumentError] IDが見つからない場合
  static LanguageType fromId(LanguageId id) {
    return BaseEnum.fromId(id, values);
  }

  /// Localeから言語タイプを取得
  /// 
  /// Flutter内部のLocaleオブジェクトから対応する言語タイプを取得する
  /// [locale] Flutter内部のLocaleオブジェクト
  /// Returns: 該当する言語タイプ、見つからない場合は日本語をデフォルトで返す
  static LanguageType fromLocale(Locale locale) {
    return fromLanguageCode(locale.languageCode);
  }

  /// 言語コードから言語タイプを取得
  /// 
  /// [languageCode] 言語コード（"ja", "en"など）
  /// Returns: 該当する言語タイプ、見つからない場合は日本語をデフォルトで返す
  static LanguageType fromLanguageCode(String languageCode) {
    for (final languageType in values) {
      final typeValue = languageType.value as LanguageTypeValue;
      if (typeValue.code.value == languageCode) {
        return languageType;
      }
    }
    // デフォルトは日本語
    return japanese;
  }

  /// DTOリストから言語タイプの値を更新
  /// 
  /// [languageDtoList] 言語DTOのリスト
  static void updateFromLanguageDtoList(List<LanguageDto> languageDtoList) {
    EnumMixin.updateFromDtoList(languageDtoList, values);
  }

    @override
  String toString() => '$runtimeType.${(value as LanguageTypeValue).name}';
}
