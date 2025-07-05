import 'package:allowance_questboard/family/query_service/family_query_service.dart';
import 'package:get_it/get_it.dart';

class GetFamilyIdUsecase {
  final FamilyQueryService _familyQueryService = GetIt.I<FamilyQueryService>();
  GetFamilyIdUsecase();

  Future<int?> execute(String userId) async {
    try {
      final familyId = await _familyQueryService.fetchFamilyId(userId);
      return familyId;
    } catch (e) {
      print('family IDの取得に失敗: $e');
      return null;
    }
  }
}
