/// JWTトークン情報を保持するクラス
class AuthTokens {
  /// アクセストークン
  final String accessToken;
  /// リフレッシュトークン
  final String refreshToken;

  const AuthTokens({
    required this.accessToken,
    required this.refreshToken,
  });

  /// JSONからAuthTokensオブジェクトを作成
  factory AuthTokens.fromJson(Map<String, dynamic> json) {
    return AuthTokens(
      accessToken: json['access_token'] as String,
      refreshToken: json['refresh_token'] as String,
    );
  }

  /// AuthTokensオブジェクトをJSONに変換
  Map<String, dynamic> toJson() {
    return {
      'access_token': accessToken,
      'refresh_token': refreshToken,
    };
  }

  /// AuthTokensオブジェクトの文字列表現
  @override
  String toString() {
    return 'AuthTokens(accessToken: ${accessToken.length > 20 ? '${accessToken.substring(0, 20)}...' : accessToken}, refreshToken: ${refreshToken.length > 20 ? '${refreshToken.substring(0, 20)}...' : refreshToken})';
  }

  /// AuthTokensオブジェクトの比較
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is AuthTokens &&
        other.accessToken == accessToken &&
        other.refreshToken == refreshToken;
  }

  @override
  int get hashCode => accessToken.hashCode ^ refreshToken.hashCode;
}
