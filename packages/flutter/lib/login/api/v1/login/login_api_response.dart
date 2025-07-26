import 'package:allowance_questboard/core/api/base_api_response.dart';

/// ログインAPIレスポンス
/// 
/// ログイン処理の結果データを表現します。
class LoginApiResponse extends BaseApiResponse {
  /// 認証情報
  final AuthInfoDto item;

  /// LoginApiResponseのコンストラクタ
  /// 
  /// [item] 認証情報
  const LoginApiResponse({
    required this.item,
  });

  /// JSONからオブジェクトを作成
  /// 
  /// [json] JSON形式のMap
  /// Returns: LoginApiResponseオブジェクト
  factory LoginApiResponse.fromJson(Map<String, dynamic> json) {
    return LoginApiResponse(
      item: AuthInfoDto.fromJson(json['item'] as Map<String, dynamic>),
    );
  }
}

/// 認証情報アイテム
class AuthInfoDto {
  /// ユーザーID
  final String userId;
  
  /// 親ID
  final int? parentId;
  
  /// メンバーID
  final int? memberId;

  /// AuthInfoItemのコンストラクタ
  /// 
  /// [userId] ユーザーID
  /// [parentId] 親ID
  /// [memberId] メンバーID
  const AuthInfoDto({
    required this.userId,
    this.parentId,
    this.memberId,
  });

  /// JSONからオブジェクトを作成
  /// 
  /// [json] JSON形式のMap
  /// Returns: AuthInfoItemオブジェクト
  factory AuthInfoDto.fromJson(Map<String, dynamic> json) {
    return AuthInfoDto(
      userId: json['user_id'] as String,
      parentId: json['parent_id'] as int?,
      memberId: json['member_id'] as int?,
    );
  }
}
