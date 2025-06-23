import '../../infrastracture/query_service/member_query_service.dart';

/// メンバーID取得ユースケース
class GetMemberIdUseCase {
  final MemberQueryService _memberQueryService;

  GetMemberIdUseCase(this._memberQueryService);

  /// user_idからメンバーIDを取得する
  Future<String?> execute(String userId) async {
    return await _memberQueryService.getMemberId(userId);
  }
}