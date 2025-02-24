import 'package:allowance_questboard/playground/try_unittest/calculator.dart';
import 'package:allowance_questboard/playground/try_unittest/num_generator.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

// 単純なdartだけのテストパッケージ
import 'package:test/test.dart';

import 'calculator_test.mocks.dart';

// ここでは一般的なテストの書き方を示す

@GenerateMocks([NumGenerator])
void main() {
  late MockNumGenerator mockNumGenerator;

  // 前処理、後処理にはsetUp()、tearDown()、
  setUp(() {
    mockNumGenerator = MockNumGenerator();
  });

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
      print('actual: $actual');
    });

    // aがマイナスの場合
    test('when a is negative', () {
      const expected = -1;
      expect(Calculator().add(-1, 0), expected);
    });
  });

  // group('addWithAPI', () {
  //   // 正常系
  //   test('normal', () {
  //     // NumGeneratorの戻り値をスタブ化
  //     when(mockNumGenerator.generate()).thenReturn(3);
  //     const expected = 5;
  //     expect(Calculator().addWithAPI(2), expected);
  //   });
  //   test('when throw exception', () {
  //     // NumGeneratorの戻り値をスタブ化
  //     when(mockNumGenerator.generate()).thenThrow(ArgumentError());
  //     expect(Calculator().addWithAPI(2), throwsA(isA<ArgumentError>()));
  //   });
  // });
}
