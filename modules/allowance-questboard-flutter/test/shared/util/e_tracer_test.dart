import 'package:allowance_questboard/shared/util/e_tracer.dart';
import 'package:test/test.dart';

void main() {
  group('trace', () {
    test('2つ以上の例外が発生した場合、全ての例外を一行のjsonにまとめること', () {
      try {
        throw Exception('First exception');
      } catch (e) {
        try {
          throw Exception(e);
        } catch (e2) {
          try {
            throw Exception(e2);
          } catch (e3) {
            final result = EParser.parse(e3);
            print(result);
          }
        }
      }
    });
  });
}
