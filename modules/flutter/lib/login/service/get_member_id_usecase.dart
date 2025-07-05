import 'package:allowance_questboard/member/query_service/member_query_service.dart';
import 'package:get_it/get_it.dart';

class GetMemberIdUsecase {
  final MemberQueryService _familyQueryService = GetIt.I<MemberQueryService>();
  GetMemberIdUsecase();

  Future<int?> execute(String userId) async {
    try {
      final memberId = await _familyQueryService.fetchMemberId(userId);
      return memberId;
    } catch (e) {
      print('memberIdの取得に失敗: $e');
      return null;
    }
  }
}
