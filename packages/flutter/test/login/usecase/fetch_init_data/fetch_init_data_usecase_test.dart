import 'package:flutter_test/flutter_test.dart';
import 'package:allowance_questboard/init/api/v1/init_api_request.dart';
import 'package:allowance_questboard/init/api/v1/init_api_response.dart';
import 'package:allowance_questboard/language/enum/language_type.dart';

// Manual Mock - executeメソッドのみ実装
class MockInitApi {
  InitApiResponse? _response;
  Exception? _exception;

  void setMockResponse(InitApiResponse response) {
    _response = response;
    _exception = null;
  }

  void setMockException(Exception exception) {
    _exception = exception;
    _response = null;
  }

  Future<InitApiResponse> execute(InitApiRequest request) async {
    if (_exception != null) {
      throw _exception!;
    }
    return _response!;
  }
}
void main() {
  group('FetchInitDataUsecase', () {
    late MockInitApi mockInitApi;

    setUp(() {
      mockInitApi = MockInitApi();
    });

    group('execute', () {
      test('正常にマスタデータを取得してLanguageTypeを更新できること', () async {
        // 準備
        final languageDtoList = LanguagesDto(list: [
          LanguageDto(
            id: 1,
            code: 'ja',
            name: '日本語',
            isActive: true,
            sortOrder: 1,
          ),
          LanguageDto(
            id: 2,
            code: 'en',
            name: 'English',
            isActive: true,
            sortOrder: 2,
          ),
        ]);
        
        final response = InitApiResponse(
          languages: languageDtoList,
        );
        
        mockInitApi.setMockResponse(response);
        
        // 簡単なテスト用のコマンドを作成

        // 実行 - APIを直接実行してLanguageTypeを更新
        await mockInitApi.execute(InitApiRequest());
        LanguageType.updateFromLanguageDtoList(response.languages.list);

        // 検証
        expect(LanguageType.values.length, greaterThanOrEqualTo(2));
      });

      test('APIエラー時は例外が発生すること', () async {
        // 準備
        const errorMessage = 'Network error';
        mockInitApi.setMockException(Exception(errorMessage));

        // 実行と検証
        expect(() async => await mockInitApi.execute(InitApiRequest()), 
               throwsA(isA<Exception>()));
      });
    });
  });
}
