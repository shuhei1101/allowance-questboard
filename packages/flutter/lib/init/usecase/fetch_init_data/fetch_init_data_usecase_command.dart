import 'package:allowance_questboard/init/api/v1/init_api.dart';

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
