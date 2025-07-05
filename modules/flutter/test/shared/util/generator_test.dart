import 'package:allowance_questboard/shared/util/generator.dart';
import 'package:test/test.dart';

void main() {
  group('idGenerate', () {
    test('正常に20文字で数値型のidを生成できること', () {
      final id = idGenerate();
      expect(id, isA<int>());
      expect(id.toString().length, 20); // 14 digits from date + 5 random digits
    });
  });
}
