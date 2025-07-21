import 'package:logger/logger.dart' show Logger, LogPrinter, LogEvent, ConsoleOutput, MultiOutput, Level;

/// シンプルな一行形式でログを出力するカスタムプリンター
class SimpleLogPrinter extends LogPrinter {
  @override
  List<String> log(LogEvent event) {
    final time = DateTime.now();
    final formattedTime = '${time.year.toString().padLeft(4, '0')}'
        '${time.month.toString().padLeft(2, '0')}'
        '${time.day.toString().padLeft(2, '0')} '
        '${time.hour.toString().padLeft(2, '0')}:'
        '${time.minute.toString().padLeft(2, '0')}:'
        '${time.second.toString().padLeft(2, '0')}';
    
    final levelName = _getLevelName(event.level);
    final message = event.message;
    
    return ['$formattedTime $levelName $message'];
  }
  
  String _getLevelName(Level level) {
    switch (level) {
      case Level.debug:
        return 'DEBUG';
      case Level.info:
        return 'INFO';
      case Level.warning:
        return 'WARN';
      case Level.error:
        return 'ERROR';
      case Level.fatal:
        return 'FATAL';
      default:
        return 'UNKNOWN';
    }
  }
}

class AppLogger {
  late Logger _logger;

  AppLogger() {
    _logger = Logger(
      printer: SimpleLogPrinter(),
      output: MultiOutput([
        ConsoleOutput(),
      ]),
    );
  }

  void d(String message) => _logger.d(message);
  void i(String message) => _logger.i(message);
  void w(String message) => _logger.w(message);
  void e(String message) => _logger.e(message);
  void f(String message) => _logger.f(message);
}

final logger = AppLogger();
