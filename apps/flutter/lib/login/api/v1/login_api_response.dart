import 'package:allowance_questboard/core/api/base_api_response.dart';

/// ログインAPIレスポンス
/// 
/// ログイン処理の結果データを表現します。
class LoginApiResponse extends BaseApiResponse {
  /// ユーザーID
  final String userId;
  
  /// 親ID
  final int? parentId;
  
  /// メンバーID
  final int? memberId;

  /// LoginApiResponseのコンストラクタ
  /// 
  /// [userId] ユーザーID
  /// [parentId] 親ID
  /// [memberId] メンバーID
  const LoginApiResponse({
    required this.userId,
    this.parentId,
    this.memberId,
  });

  /// JSONからオブジェクトを作成
  /// 
  /// [json] JSON形式のMap
  /// Returns: LoginApiResponseオブジェクト
  factory LoginApiResponse.fromJson(Map<String, dynamic> json) {
    return LoginApiResponse(
      userId: json['user_id'] as String,
      parentId: json['parent_id'] as int?,
      memberId: json['member_id'] as int?,
    );
  }
}
