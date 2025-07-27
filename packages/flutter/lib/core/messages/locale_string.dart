/// 多言語対応のメッセージクラス
/// APサーバ側のLocaleStringと同じ構造を持つ
class LocaleString {
  final String ja;
  final String en;
  
  const LocaleString({
    required this.ja,
    required this.en,
  });
  
  /// デフォルトの文字列表現（日本語）
  @override
  String toString() => ja;
  
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is LocaleString && other.ja == ja && other.en == en;
  }
  
  @override
  int get hashCode => Object.hash(ja, en);
}
