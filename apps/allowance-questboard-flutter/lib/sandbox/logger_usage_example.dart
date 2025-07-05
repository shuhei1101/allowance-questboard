import 'package:flutter/material.dart';
import '../core/setup/logger_provider.dart';

/// LoggerProviderの使用例
class LoggerUsageExample extends StatelessWidget {
  const LoggerUsageExample({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Logger Usage Example'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            ElevatedButton(
              onPressed: _logDebug,
              child: const Text('Debug Log'),
            ),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: _logInfo,
              child: const Text('Info Log'),
            ),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: _logWarning,
              child: const Text('Warning Log'),
            ),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: _logError,
              child: const Text('Error Log'),
            ),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: _logWithData,
              child: const Text('Log with Data'),
            ),
          ],
        ),
      ),
    );
  }

  void _logDebug() {
    LoggerProvider.I.d('これはデバッグログです');
  }

  void _logInfo() {
    LoggerProvider.I.i('これは情報ログです');
  }

  void _logWarning() {
    LoggerProvider.I.w('これは警告ログです');
  }

  void _logError() {
    try {
      throw Exception('テスト例外');
    } catch (e, stackTrace) {
      LoggerProvider.I.e('エラーが発生しました', error: e, stackTrace: stackTrace);
    }
  }

  void _logWithData() {
    final userData = {
      'userId': '12345',
      'userName': 'テストユーザー',
      'timestamp': DateTime.now().toIso8601String(),
    };

    LoggerProvider.I.i('ユーザーデータ: $userData');
  }
}
