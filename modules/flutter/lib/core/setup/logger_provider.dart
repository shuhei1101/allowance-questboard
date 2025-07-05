import 'dart:io';
import 'package:logger/logger.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

/// ログ管理を行うプロバイダークラス
/// シングルトンパターンで実装
class LoggerProvider {
  static LoggerProvider? _instance;
  late final Logger _logger;

  LoggerProvider._() {
    _logger = Logger(
      printer: PrettyPrinter(
        methodCount: 2,
        errorMethodCount: 8,
        lineLength: 120,
        colors: true,
        printEmojis: true,
        printTime: true,
      ),
      output: MultiOutput([
        ConsoleOutput(),
        _LogMemoryOutput(),
      ]),
    );
  }

  /// シングルトンインスタンスを取得
  static Logger get I {
    _instance ??= LoggerProvider._();
    return _instance!._logger;
  }

  /// 初期化処理
  static void initialize() {
    final instance = LoggerProvider._instance ?? LoggerProvider._();
    instance._checkAndSendLogs();
  }

  /// 1日おきにログをDBに送信するチェック処理
  Future<void> _checkAndSendLogs() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final lastSentDate = prefs.getString('last_log_sent_date');
      final today = DateTime.now().toIso8601String().split('T')[0];

      if (lastSentDate == null || _shouldSendLogs(lastSentDate, today)) {
        await _sendLogsToDatabase();
        await prefs.setString('last_log_sent_date', today);
        _logger.i('ログをデータベースに送信しました');
      }
    } catch (e) {
      _logger.e('ログ送信チェック中にエラーが発生しました: $e');
    }
  }

  /// ログ送信が必要かどうかを判定
  bool _shouldSendLogs(String lastSentDate, String today) {
    try {
      final lastDate = DateTime.parse(lastSentDate);
      final todayDate = DateTime.parse(today);
      final difference = todayDate.difference(lastDate).inDays;
      return difference >= 1; // 1日以上経過していれば送信
    } catch (e) {
      _logger.e('日付比較でエラーが発生しました: $e');
      return true; // エラーの場合は送信
    }
  }

  /// ログをデータベースに送信
  Future<void> _sendLogsToDatabase() async {
    try {
      final memoryOutput = _LogMemoryOutput.instance;
      final logs = memoryOutput.getLogs();

      if (logs.isEmpty) {
        _logger.i('送信するログがありません');
        return;
      }

      // Supabaseにログを送信
      final supabase = Supabase.instance.client;

      for (final log in logs) {
        await supabase.from('app_logs').insert({
          'level': log['level'],
          'message': log['message'],
          'timestamp': log['timestamp'],
          'device_info': await _getDeviceInfo(),
          'created_at': DateTime.now().toIso8601String(),
        });
      }

      // 送信後はメモリからログをクリア
      memoryOutput.clearLogs();
      _logger.i('${logs.length}件のログをデータベースに送信しました');
    } catch (e) {
      _logger.e('ログのデータベース送信中にエラーが発生しました: $e');
    }
  }

  /// デバイス情報を取得
  Future<Map<String, dynamic>> _getDeviceInfo() async {
    return {
      'platform': Platform.operatingSystem,
      'version': Platform.operatingSystemVersion,
    };
  }
}

/// メモリにログを保存するOutput
class _LogMemoryOutput extends LogOutput {
  static _LogMemoryOutput? _instance;
  final List<Map<String, dynamic>> _logs = [];
  final int _maxLogs = 1000; // 最大保存ログ数

  _LogMemoryOutput._();

  static _LogMemoryOutput get instance {
    _instance ??= _LogMemoryOutput._();
    return _instance!;
  }

  factory _LogMemoryOutput() => instance;

  @override
  void output(OutputEvent event) {
    for (final line in event.lines) {
      _logs.add({
        'level': event.level.name,
        'message': line,
        'timestamp': DateTime.now().toIso8601String(),
      });
    }

    // 最大数を超えた場合は古いログを削除
    if (_logs.length > _maxLogs) {
      _logs.removeRange(0, _logs.length - _maxLogs);
    }
  }

  List<Map<String, dynamic>> getLogs() => List.from(_logs);

  void clearLogs() => _logs.clear();
}
