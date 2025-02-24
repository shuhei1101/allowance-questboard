import 'package:allowance_questboard/domain/family/family_name.dart';
import 'package:test/test.dart';

void main() {
  /// 正常系
  test('when nomal case', () {
    const expected = 'family_name';
    final actual = FamilyName(expected).value;
    expect(actual, expected);
  });

  /// 異常系: 空文字の場合
  test('when value is empty', () {
    expect(() => FamilyName(''), throwsA(isA<ArgumentError>()));
  });

  /// 異常系: 17文字以上の場合
  test('when value is 17 characters', () {
    expect(() => FamilyName('12345678901234567'), throwsA(isA<ArgumentError>()));
  });
}
