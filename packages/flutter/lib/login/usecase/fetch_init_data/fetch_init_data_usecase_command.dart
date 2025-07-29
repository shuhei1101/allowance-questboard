import 'package:allowance_questboard/login/api/v1/init/init_api.dart';

/// アプリ初期化時のマスタデータ取得ユースケースのコマンド
class FetchInitDataUsecaseCommand {
  /// 初期化APIクライアント
  final InitApi initApi;

  /// コンストラクタ
  /// 
  /// [initApi] 初期化APIクライアント
  FetchInitDataUsecaseCommand({
    required this.initApi,
  });
}
