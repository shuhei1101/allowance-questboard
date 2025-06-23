import 'package:allowance_questboard/domain/model/member/value_object/member_id.dart';
import 'package:allowance_questboard/application/member/member_query_service.dart';
import 'package:dartz/dartz.dart';

/// メンバーIDを取得するユースケース
class GetMemberIdUseCase {
  GetMemberIdUseCase(this._memberQueryService);

  final MemberQueryService _memberQueryService;

  /// ユーザーIDからメンバーIDを取得
  Future<Either<String, MemberId>> execute(String userId) async {
    try {
      final memberId = await _memberQueryService.getMemberId(userId);
      if (memberId == null) {
        return const Left('メンバー情報が見つかりません');
      }
      return Right(memberId);
    } catch (e) {
      return Left('メンバー情報の取得に失敗しました: ${e.toString()}');
    }
  }
}