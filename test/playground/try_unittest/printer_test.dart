// ここでは、Calculatorクラスのモックを作成し、
// Printerクラスのテストを行う実験。

import 'package:allowance_questboard/playground/try_unittest/calculator.dart';
import 'package:allowance_questboard/playground/try_unittest/printer.dart';

import 'package:mockito/annotations.dart';
import 'package:test/test.dart';
import 'package:mockito/mockito.dart';

import 'printer_test.mocks.dart';

@GenerateMocks([Calculator])
void main() {
  late MockCalculator mockCalculator;
  late Printer printer;

  setUp(() {
    mockCalculator = MockCalculator();
    printer = Printer(mockCalculator);
  });

  group('printAdd', () {
    test('when normal', () {
      // 引数に何が渡されても5を返す
      when(mockCalculator.add(any, any)).thenReturn(5);
      printer.printAdd(2, 3);
    });

    // 例外が発生する場合のテスト
    test('when throw exception', () {
      when(mockCalculator.add(any, any)).thenThrow(ArgumentError());
      expect(() => printer.printAdd(2, 3), throwsA(isA<ArgumentError>()));
    });
  });
}
