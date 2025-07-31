import 'package:allowance_questboard/core/api/base_api_request.dart';

/// アプリ初期化APIリクエスト
/// 
/// アプリ初期化時に送信するリクエストデータを表現します。
class InitApiRequest extends BaseApiRequest {
  /// InitApiRequestのコンストラクタ
  /// 
  /// [tokens] 認証トークン（オプション）
  const InitApiRequest({
    super.tokens,
  });

  /// オブジェクトをJSONに変換
  /// 
  /// Returns: JSON文字列（initは空のリクエストのためnullを返す）
  @override
  String? toJson() {
    return null;
  }
}
