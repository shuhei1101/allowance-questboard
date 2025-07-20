import 'package:allowance_questboard/core/security/auth_tokens.dart';

/// APIリクエストの基底クラス
/// 
/// 全てのAPIリクエストはこのクラスを継承して実装します。
/// 認証トークンの管理を共通化します。
abstract class BaseApiRequest {
  /// 認証トークン
  final AuthTokens? tokens;

  /// HTTPヘッダーを取得
  /// 
  /// Returns: HTTPヘッダーのMap
  Map<String, String> get headers {
    final headerMap = <String, String>{
      'Content-Type': 'application/json',
    };
    
    if (tokens != null) {
      headerMap['Authorization'] = 'Bearer ${tokens!.accessToken}';
    }
    
    return headerMap;
  }

  /// BaseApiRequestのコンストラクタ
  /// 
  /// [tokens] 認証トークン（オプション）
  const BaseApiRequest({this.tokens});

  /// オブジェクトをJSONに変換
  /// 
  /// 継承先クラスで具体的な実装を行います。
  /// Returns: JSON文字列
  String? toJson();
}
