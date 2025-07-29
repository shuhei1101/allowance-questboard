import 'package:flutter_test/flutter_test.dart';
import 'package:allowance_questboard/main.dart';

void main() {
  group('MyApp', () {
    group('build', () {
      test('MyAppウィジェットが正しく作成できること', () {
        // 準備
        const myApp = MyApp();

        // 検証
        expect(myApp, isA<MyApp>());
        expect(myApp.key, isNull);
      });
    });
  });
}
