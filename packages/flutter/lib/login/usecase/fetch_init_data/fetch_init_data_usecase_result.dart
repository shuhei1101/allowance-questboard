/// アプリ初期化時のマスタデータ取得ユースケースの結果
class FetchInitDataUsecaseResult {
  /// 処理が成功したかどうか
  final bool isSuccess;

  /// エラーメッセージ（エラー時のみ）
  final String? errorMessage;

  /// コンストラクタ
  /// 
  /// [isSuccess] 処理が成功したかどうか
  /// [errorMessage] エラーメッセージ（エラー時のみ）
  FetchInitDataUsecaseResult({
    required this.isSuccess,
    this.errorMessage,
  });

  /// 成功時のファクトリコンストラクタ
  factory FetchInitDataUsecaseResult.success() {
    return FetchInitDataUsecaseResult(
      isSuccess: true,
    );
  }

  /// エラー時のファクトリコンストラクタ
  factory FetchInitDataUsecaseResult.error(String errorMessage) {
    return FetchInitDataUsecaseResult(
      isSuccess: false,
      errorMessage: errorMessage,
    );
  }
}
