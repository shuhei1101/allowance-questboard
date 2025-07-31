import 'dart:convert';
import 'package:allowance_questboard/core/api/base_api_request.dart';

/// ログインAPIリクエスト
/// 
/// ログイン時に送信するリクエストデータを表現します。
class LoginApiRequest extends BaseApiRequest {
  /// ユーザーID
  final String userId;

  /// LoginApiRequestのコンストラクタ
  /// 
  /// [userId] ユーザーID
  /// [tokens] 認証トークン（オプション）
  const LoginApiRequest({
    required this.userId,
    super.tokens,
  });

  /// オブジェクトをJSONに変換
  /// 
  /// Returns: JSON文字列
  @override
  String? toJson() {
    return jsonEncode({
      'user_id': userId,
    });
  }
}
