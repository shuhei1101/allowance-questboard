import 'package:flutter_test/flutter_test.dart';
import 'package:allowance_questboard/core/state/value_validation_mixin.dart';

class TestValidationMixin with ValueValidationMixin {}

void main() {
  group('TestValidationMixin', () {
    late TestValidationMixin testMixin;

    setUp(() {
      testMixin = TestValidationMixin();
    });

    group('Test_validateRequired', () {
      test('test_値がnullの場合はValidationExceptionをthrowすること', () {
        // 実行・検証
        expect(
          () => testMixin.validateRequired(null, 'エラーメッセージ'),
          throwsA(isA<ValidationException>()),
        );
      });

      test('test_文字列が空の場合はValidationExceptionをthrowすること', () {
        // 実行・検証
        expect(
          () => testMixin.validateRequired('', 'エラーメッセージ'),
          throwsA(isA<ValidationException>()),
        );
      });

      test('test_文字列が空白のみの場合はValidationExceptionをthrowすること', () {
        // 実行・検証
        expect(
          () => testMixin.validateRequired('   ', 'エラーメッセージ'),
          throwsA(isA<ValidationException>()),
        );
      });

      test('test_有効な文字列の場合は例外をthrowしないこと', () {
        // 実行・検証
        expect(
          () => testMixin.validateRequired('有効な値', 'エラーメッセージ'),
          returnsNormally,
        );
      });

      test('test_有効な数値の場合は例外をthrowしないこと', () {
        // 実行・検証
        expect(
          () => testMixin.validateRequired(123, 'エラーメッセージ'),
          returnsNormally,
        );
      });
    });

    group('Test_validateMinLength', () {
      test('test_値がnullの場合はValidationExceptionをthrowすること', () {
        // 実行・検証
        expect(
          () => testMixin.validateMinLength(null, 5, 'エラーメッセージ'),
          throwsA(isA<ValidationException>()),
        );
      });

      test('test_文字数が最小文字数未満の場合はValidationExceptionをthrowすること', () {
        // 実行・検証
        expect(
          () => testMixin.validateMinLength('abc', 5, 'エラーメッセージ'),
          throwsA(isA<ValidationException>()),
        );
      });

      test('test_文字数が最小文字数以上の場合は例外をthrowしないこと', () {
        // 実行・検証
        expect(
          () => testMixin.validateMinLength('abcde', 5, 'エラーメッセージ'),
          returnsNormally,
        );
      });
    });

    group('Test_validateMaxLength', () {
      test('test_値がnullの場合は例外をthrowしないこと', () {
        // 実行・検証
        expect(
          () => testMixin.validateMaxLength(null, 5, 'エラーメッセージ'),
          returnsNormally,
        );
      });

      test('test_文字数が最大文字数を超える場合はValidationExceptionをthrowすること', () {
        // 実行・検証
        expect(
          () => testMixin.validateMaxLength('abcdef', 5, 'エラーメッセージ'),
          throwsA(isA<ValidationException>()),
        );
      });

      test('test_文字数が最大文字数以下の場合は例外をthrowしないこと', () {
        // 実行・検証
        expect(
          () => testMixin.validateMaxLength('abcde', 5, 'エラーメッセージ'),
          returnsNormally,
        );
      });
    });

    group('Test_validatePositiveInteger', () {
      test('test_値がnullの場合はValidationExceptionをthrowすること', () {
        // 実行・検証
        expect(
          () => testMixin.validatePositiveInteger(null, 'エラーメッセージ'),
          throwsA(isA<ValidationException>()),
        );
      });

      test('test_値が0の場合はValidationExceptionをthrowすること', () {
        // 実行・検証
        expect(
          () => testMixin.validatePositiveInteger(0, 'エラーメッセージ'),
          throwsA(isA<ValidationException>()),
        );
      });

      test('test_値が負の数の場合はValidationExceptionをthrowすること', () {
        // 実行・検証
        expect(
          () => testMixin.validatePositiveInteger(-1, 'エラーメッセージ'),
          throwsA(isA<ValidationException>()),
        );
      });

      test('test_値が正の整数の場合は例外をthrowしないこと', () {
        // 実行・検証
        expect(
          () => testMixin.validatePositiveInteger(123, 'エラーメッセージ'),
          returnsNormally,
        );
      });

      test('test_文字列が正の整数に変換可能な場合は例外をthrowしないこと', () {
        // 実行・検証
        expect(
          () => testMixin.validatePositiveInteger('123', 'エラーメッセージ'),
          returnsNormally,
        );
      });

      test('test_文字列が整数に変換できない場合はValidationExceptionをthrowすること', () {
        // 実行・検証
        expect(
          () => testMixin.validatePositiveInteger('abc', 'エラーメッセージ'),
          throwsA(isA<ValidationException>()),
        );
      });
    });

    group('Test_validateNumberRange', () {
      test('test_値がnullの場合はValidationExceptionをthrowすること', () {
        // 実行・検証
        expect(
          () => testMixin.validateNumberRange(null, 1, 10, 'エラーメッセージ'),
          throwsA(isA<ValidationException>()),
        );
      });

      test('test_値が最小値未満の場合はValidationExceptionをthrowすること', () {
        // 実行・検証
        expect(
          () => testMixin.validateNumberRange(0, 1, 10, 'エラーメッセージ'),
          throwsA(isA<ValidationException>()),
        );
      });

      test('test_値が最大値を超える場合はValidationExceptionをthrowすること', () {
        // 実行・検証
        expect(
          () => testMixin.validateNumberRange(11, 1, 10, 'エラーメッセージ'),
          throwsA(isA<ValidationException>()),
        );
      });

      test('test_値が範囲内の場合は例外をthrowしないこと', () {
        // 実行・検証
        expect(
          () => testMixin.validateNumberRange(5, 1, 10, 'エラーメッセージ'),
          returnsNormally,
        );
      });

      test('test_値が最小値と同じ場合は例外をthrowしないこと', () {
        // 実行・検証
        expect(
          () => testMixin.validateNumberRange(1, 1, 10, 'エラーメッセージ'),
          returnsNormally,
        );
      });

      test('test_値が最大値と同じ場合は例外をthrowしないこと', () {
        // 実行・検証
        expect(
          () => testMixin.validateNumberRange(10, 1, 10, 'エラーメッセージ'),
          returnsNormally,
        );
      });

      test('test_文字列が数値に変換可能で範囲内の場合は例外をthrowしないこと', () {
        // 実行・検証
        expect(
          () => testMixin.validateNumberRange('5', 1, 10, 'エラーメッセージ'),
          returnsNormally,
        );
      });

      test('test_文字列が数値に変換できない場合はValidationExceptionをthrowすること', () {
        // 実行・検証
        expect(
          () => testMixin.validateNumberRange('abc', 1, 10, 'エラーメッセージ'),
          throwsA(isA<ValidationException>()),
        );
      });
    });
  });
}
