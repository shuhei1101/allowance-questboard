/// APIレスポンスの基底クラス
abstract class BaseApiResponse {
  /// BaseApiResponseのコンストラクタ
  const BaseApiResponse();

  factory BaseApiResponse.fromJson(Map<String, dynamic> json) {
    // 継承先クラスで具体的な実装を行います。
    throw UnimplementedError('BaseApiResponse.fromJson must be implemented in subclasses');
  }
}
