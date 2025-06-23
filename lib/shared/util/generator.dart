import 'dart:math';

final Random _random = Random();

int idGenerate() {
  final now = DateTime.now();

  final formattedTime = '${now.year.toString().padLeft(4, '0')}'
      '${now.month.toString().padLeft(2, '0')}'
      '${now.day.toString().padLeft(2, '0')}'
      '${now.hour.toString().padLeft(2, '0')}'
      '${now.minute.toString().padLeft(2, '0')}'
      '${now.second.toString().padLeft(2, '0')}'
      '${now.millisecond.toString().padLeft(3, '0')}';

  final randomPart = _random.nextInt(100000).toString().padLeft(5, '0');

  return int.parse('$formattedTime$randomPart');
}
