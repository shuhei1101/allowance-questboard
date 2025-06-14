import 'package:allowance_questboard/domain/model/member/value_object/member_id.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  /// 正常系
  test('when nomal case', () {
    const expected = 'member_id';
    final actual = MemberId(expected).value;
    expect(actual, expected);
  });

  /// 異常系: 引数に空文字が渡された場合
  test('when value is empty', () {
    expect(() => MemberId(''), throwsA(isA<ArgumentError>()));
  });
}
