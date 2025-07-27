/// 翻訳なしエンティティから更新可能な値オブジェクトのインターフェース
/// 
/// Enumの値が実装すべきメソッドを定義します。
/// Flutter側では主にAPIレスポンスからEnum値を設定する際に使用します。
abstract class EnumValueProtocol {
  /// APIレスポンス（DTOなど）から値を設定する
  /// 
  /// [dto] 更新に使用するDTOオブジェクト
  void setFromDto(Map<String, dynamic> dto);
}
