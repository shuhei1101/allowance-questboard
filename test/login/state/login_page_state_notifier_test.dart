import 'package:allowance_questboard/family/usecase/get_family_id_use_case.dart';
import 'package:allowance_questboard/family/query_service/family_query_service.dart';
import 'package:get_it/get_it.dart';
import 'package:test/test.dart';

// テスト用のFamilyQueryServiceをモックするためのパッケージをインポート

// モッククラスの定義
class MockFamilyQueryService implements FamilyQueryService {
  // モックメソッドの定義
  @override
  Future<int?> fetchFamilyId(String userId) async {
    // テスト用の戻り値を設定
    return 123; // ここでは仮の家族IDを返す
  }
}

void main() {
  group('getFamilyId', () {
    setUp(() {
      // ここで必要な初期化処理を行うことができます
      GetIt.I.reset();
      GetIt.I.registerLazySingleton<FamilyQueryService>(
        () => MockFamilyQueryService(),
      );
    });
    test('userIdが存在する場合、家族IDを取得できること', () async {
      // Arrange
      final userId = 'testUserId';
      final expectedFamilyId = 123;

      // Act
      final familyId = await GetFamilyIdUseCase().execute(userId);

      // Assert
      expect(familyId, expectedFamilyId);
    });
    test('userIdが存在しない場合、nullを返すこと', () async {
      // Arrange
      final userId = 'nonExistentUserId';

      // Act
      final familyId = await GetFamilyIdUseCase().execute(userId);

      // Assert
      expect(familyId, isNull);
    });
  });
}
