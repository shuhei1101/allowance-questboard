import 'package:flutter_test/flutter_test.dart';
import 'package:allowance_questboard/core/state/validation_example.dart';

void main() {
  group('TestUserNameState', () {
    group('Test_validate', () {
      test('test_空文字列の場合は必須エラーメッセージを返すこと', () {
        // 実行
        final state = UserNameState('');

        // 検証
        expect(state.isValid, false);
        expect(state.errorMessage!.value, 'ユーザー名は必須です');
      });

      test('test_1文字の場合は最小文字数エラーメッセージを返すこと', () {
        // 実行
        final state = UserNameState('a');

        // 検証
        expect(state.isValid, false);
        expect(state.errorMessage!.value, 'ユーザー名は2文字以上で入力してください');
      });

      test('test_21文字の場合は最大文字数エラーメッセージを返すこと', () {
        // 実行
        final state = UserNameState('あ' * 21);

        // 検証
        expect(state.isValid, false);
        expect(state.errorMessage!.value, 'ユーザー名は20文字以下で入力してください');
      });

      test('test_有効なユーザー名の場合は有効になること', () {
        // 実行
        final state = UserNameState('太郎');

        // 検証
        expect(state.isValid, true);
        expect(state.errorMessage, isNull);
      });
    });
  });

  group('TestAgeState', () {
    group('Test_validate', () {
      test('test_0の場合は正の整数エラーメッセージを返すこと', () {
        // 実行
        final state = AgeState(0);

        // 検証
        expect(state.isValid, false);
        expect(state.errorMessage!.value, '年齢は正の整数で入力してください');
      });

      test('test_121の場合は範囲エラーメッセージを返すこと', () {
        // 実行
        final state = AgeState(121);

        // 検証
        expect(state.isValid, false);
        expect(state.errorMessage!.value, '年齢は1歳以上120歳以下で入力してください');
      });

      test('test_有効な年齢の場合は有効になること', () {
        // 実行
        final state = AgeState(25);

        // 検証
        expect(state.isValid, true);
        expect(state.errorMessage, isNull);
      });
    });
  });

  group('TestAllowanceAmountState', () {
    group('Test_validate', () {
      test('test_0の場合は正の整数エラーメッセージを返すこと', () {
        // 実行
        final state = AllowanceAmountState(0);

        // 検証
        expect(state.isValid, false);
        expect(state.errorMessage!.value, 'お小遣い金額は正の整数で入力してください');
      });

      test('test_100001の場合は範囲エラーメッセージを返すこと', () {
        // 実行
        final state = AllowanceAmountState(100001);

        // 検証
        expect(state.isValid, false);
        expect(state.errorMessage!.value, 'お小遣い金額は1円以上100,000円以下で入力してください');
      });

      test('test_有効な金額の場合は有効になること', () {
        // 実行
        final state = AllowanceAmountState(1000);

        // 検証
        expect(state.isValid, true);
        expect(state.errorMessage, isNull);
      });
    });
  });
}
