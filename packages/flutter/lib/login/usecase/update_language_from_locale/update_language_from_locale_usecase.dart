import 'package:allowance_questboard/language/enum/language_type.dart';
import 'package:allowance_questboard/login/usecase/update_language_from_locale/update_language_from_locale_usecase_command.dart';
import 'package:allowance_questboard/login/usecase/update_language_from_locale/update_language_from_locale_usecase_result.dart';

/// Localeから言語タイプを更新するユースケース
class UpdateLanguageFromLocaleUsecase {
  /// ユースケースを実行
  /// 
  /// [cmd] ユースケースコマンド
  /// Returns: ユースケース結果
  Future<UpdateLanguageFromLocaleUsecaseResult> execute(
    UpdateLanguageFromLocaleUsecaseCommand cmd,
  ) async {
    try {
      // Localeから言語タイプを取得
      final languageType = LanguageType.fromLocale(cmd.locale);
      
      // StateNotifierで言語を更新
      cmd.userSessionStateNotifier.updateLanguage(languageType);
      
      return UpdateLanguageFromLocaleUsecaseResult(
        isSuccess: true,
        updatedLanguageType: languageType,
        errorMessage: null,
      );
    } catch (e) {
      return UpdateLanguageFromLocaleUsecaseResult(
        isSuccess: false,
        updatedLanguageType: null,
        errorMessage: e.toString(),
      );
    }
  }
}
