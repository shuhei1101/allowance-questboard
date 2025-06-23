import 'package:allowance_questboard/domain/model/family/family_id.dart';
import 'package:allowance_questboard/application/family/family_query_service.dart';
import 'package:dartz/dartz.dart';

/// 家族IDを取得するユースケース
class GetFamilyIdUseCase {
  GetFamilyIdUseCase(this._familyQueryService);

  final FamilyQueryService _familyQueryService;

  /// ユーザーIDから家族IDを取得
  Future<Either<String, FamilyId>> execute(String userId) async {
    try {
      final familyId = await _familyQueryService.getFamilyId(userId);
      if (familyId == null) {
        return const Left('家族情報が見つかりません');
      }
      return Right(familyId);
    } catch (e) {
      return Left('家族情報の取得に失敗しました: ${e.toString()}');
    }
  }
}