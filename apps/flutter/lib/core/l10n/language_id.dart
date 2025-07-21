/// 言語IDクラス
/// 
/// APIサーバの言語エンティティのIDと一致させる
class LanguageId {
  /// 言語ID（APIサーバのIDと一致）
  final int value;

  /// LanguageIdのコンストラクタ
  /// 
  /// [value] 言語ID
  const LanguageId(this.value);

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is LanguageId &&
          runtimeType == other.runtimeType &&
          value == other.value;

  @override
  int get hashCode => value.hashCode;

  @override
  String toString() => 'LanguageId($value)';
}
