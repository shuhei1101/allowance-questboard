import 'package:allowance_questboard/sandbox/try_unittest/calculator.dart';

class Printer {
  Printer(this.calculator);
  final Calculator calculator;

  void printAdd(int a, int b) {
    print(calculator.add(a, b));
  }

  void printSub(int a, int b) {
    print(calculator.sub(a, b));
  }

  void printMul(int a, int b) {
    print(calculator.mul(a, b));
  }

  void printDiv(int a, int b) {
    print(calculator.div(a, b));
  }

  void printAddWithAPI(int a) {
    print(calculator.addWithAPI(a));
  }
}
