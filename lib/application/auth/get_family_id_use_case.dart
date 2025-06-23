import '../../infrastracture/query_service/family_query_service.dart';

/// 家族ID取得ユースケース
class GetFamilyIdUseCase {
  final FamilyQueryService _familyQueryService;

  GetFamilyIdUseCase(this._familyQueryService);

  /// user_idから家族IDを取得する
  Future<String?> execute(String userId) async {
    return await _familyQueryService.getFamilyId(userId);
  }
}