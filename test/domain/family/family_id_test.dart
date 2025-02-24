import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:test/test.dart';

void main() {
  /// 正常系
  test('when nomal case', () {
    const expected = 'family_id';
    final actual = FamilyId(expected).value;
    expect(actual, 'family_id');
  });

  /// 異常系: 引数に空文字が渡された場合
  test('when value is empty', () {
    expect(() => FamilyId(''), throwsA(isA<ArgumentError>()));
  });
}
