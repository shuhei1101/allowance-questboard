import 'package:allowance_questboard/domain/member/education.dart';
import 'package:allowance_questboard/domain/member/grade.dart';
import 'package:test/test.dart';

void main() {
  /// 正常系
  test('when nomal case', () {
    const expected = 1;
    final actual = Grade(
      education: Education.middleSchool,
      grade: expected,
    ).grade;
    expect(actual, expected);
  });

  /// 異常系: 空文字の場合
  test('when value is empty', () {
    expect(
      () => Grade(
        education: Education.middleSchool,
        grade: 0,
      ),
      throwsA(isA<ArgumentError>()),
    );
  });
}
