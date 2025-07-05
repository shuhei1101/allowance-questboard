import 'package:allowance_questboard/family/query_service/family_query_service.dart';
import 'package:get_it/get_it.dart';

class GetFamilyIdUsecase {
  final FamilyQueryService _memberQueryService = GetIt.I<FamilyQueryService>();
  GetFamilyIdUsecase();

  Future<int?> execute(String userId) async {
    try {
      final memberId = await _memberQueryService.fetchFamilyId(userId);
      return memberId;
    } catch (e) {
      print('memberIdの取得に失敗: $e');
      return null;
    }
  }
}
