import 'package:allowance_questboard/language/enum/language_type.dart';

/// Localeから言語タイプを更新するユースケースの結果
class UpdateLanguageFromLocaleUsecaseResult {
  /// 処理成功フラグ
  final bool isSuccess;
  
  /// 更新された言語タイプ
  final LanguageType? updatedLanguageType;
  
  /// エラーメッセージ
  final String? errorMessage;

  /// コンストラクタ
  /// 
  /// [isSuccess] 処理成功フラグ
  /// [updatedLanguageType] 更新された言語タイプ
  /// [errorMessage] エラーメッセージ
  UpdateLanguageFromLocaleUsecaseResult({
    required this.isSuccess,
    this.updatedLanguageType,
    this.errorMessage,
  });
}
