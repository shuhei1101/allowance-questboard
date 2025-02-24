import 'package:allowance_questboard/domain/member/member_exp.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  /// 正常系
  test('when nomal case', () {
    const expected = 1;
    final actual = MemberExp(expected).value;
    expect(actual, expected);
  });

  /// 異常系: 0未満の場合
  test('when value is less than 0', () {
    expect(() => MemberExp(-1), throwsA(isA<ArgumentError>()));
  });
}
