import 'package:allowance_questboard/sandbox/try_unittest/calculator.dart';

// 単純なdartだけのテストパッケージ
import 'package:flutter_test/flutter_test.dart';

// ここでは一般的なテストの書き方を示す

void main() {
  // これがtest.dartで使用できるメソッド
  // groupを使うことでフォルダ分けが可能。
  // 例えば、クラス単位、メソッド単位、引数単位、シナリオ（正常、異常、境界値）毎

  // 今回はCalculatorクラスなのは明白なので、
  // 関数毎にgroupを切る
  group('add', () {
    // 正常系
    test('normal', () {
      const expected = 5;
      final actual = Calculator().add(2, 3);
      expect(actual, expected);
      print('expected: $expected');
    });

    // aがマイナスの場合
    test('when a is negative', () {
      const expected = -1;
      expect(Calculator().add(-1, 0), expected);
    });
  });
}
