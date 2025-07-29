import 'package:allowance_questboard/login/api/v1/init/init_api_request.dart';
import 'package:allowance_questboard/language/enum/language_type.dart';
import 'package:allowance_questboard/login/usecase/fetch_init_data/fetch_init_data_usecase_command.dart';
import 'package:allowance_questboard/login/usecase/fetch_init_data/fetch_init_data_usecase_result.dart';

/// アプリ初期化時のマスタデータ取得ユースケース
class FetchInitDataUsecase {
  /// ユースケースを実行
  /// 
  /// [cmd] ユースケースコマンド
  /// Returns: ユースケース結果
  Future<FetchInitDataUsecaseResult> execute(
    FetchInitDataUsecaseCommand cmd,
  ) async {
    try {
      // InitAPIを実行してマスタデータを取得
      final request = const InitApiRequest();
      final response = await cmd.initApi.execute(request);
      
      // LanguageTypeのenumを直接更新
      LanguageType.updateFromLanguageDtoList(response.languages.list);
      
      return FetchInitDataUsecaseResult.success();
    } catch (e) {
      return FetchInitDataUsecaseResult.error(e.toString());
    }
  }
}
