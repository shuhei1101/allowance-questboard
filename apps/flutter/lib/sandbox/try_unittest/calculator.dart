import 'package:allowance_questboard/sandbox/try_unittest/num_generator.dart';

class Calculator {
  int add(int a, int b) {
    return a + b;
  }

  int sub(int a, int b) {
    return a - b;
  }

  int mul(int a, int b) {
    return a * b;
  }

  double div(int a, int b) {
    try {
      return a / b;
    } catch (e) {
      throw ArgumentError.value(b, "b", "must not be 0");
    }
  }

  /// スタブの動作確認用メソッド
  ///
  /// NumGeneratorの戻り値をユニットテスト側でスタブに置き換えることで、
  /// スタブの使い方を学ぶ。
  int addWithAPI(int a) {
    final generator = NumGenerator();
    return a + generator.generate();
  }
}
