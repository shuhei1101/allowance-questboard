import 'dart:convert';

/// エラー情報を解析・文字列化するユーティリティクラス
class EParser {
  /// エラーを解析して文字列化する
  static String parse(dynamic error) {
    if (error is Error || error is Exception) {
      final parsed = _parseError(error);
      return _stringify(parsed);
    }

    // 非Error/Exceptionの場合はJSON文字列化、失敗したらtoString()
    try {
      return jsonEncode({'message': error});
    } catch (_) {
      return error.toString();
    }
  }

  /// オブジェクトをJSON文字列に変換
  static String _stringify(Map<String, dynamic> data) {
    try {
      return jsonEncode(data); // 一行のJSON形式
    } catch (_) {
      return "[Unserializable error object]";
    }
  }

  /// エラーオブジェクトを解析してマップに変換（再帰的にcauseも解析）
  static Map<String, dynamic> _parseError(dynamic error) {
    String errorName;
    String message;
    String? stackTrace;

    // エラータイプの判定
    if (error is Error) {
      errorName = error.runtimeType.toString();
      message = error.toString();
      stackTrace = error.stackTrace?.toString();
    } else if (error is Exception) {
      errorName = error.runtimeType.toString();
      message = error.toString();
      // ExceptionはstackTraceを持たないため、StackTrace.currentを使用
      stackTrace = StackTrace.current.toString();
    } else {
      errorName = 'UnknownError';
      message = error.toString();
      stackTrace = StackTrace.current.toString();
    }

    // スタックトレースを行ごとに分割して解析
    List<String> stackLines = [];
    String? sourceFile;
    int? lineNum;
    int? colNum;

    if (stackTrace != null) {
      final lines = stackTrace.split('\n').map((line) => line.trim()).toList();
      stackLines = lines.where((line) => line.isNotEmpty).toList();

      // 最初の有効なスタックフレームから位置情報を抽出
      for (final line in stackLines) {
        final match = RegExp(r'#\d+\s+.*\s+\((.+):(\d+):(\d+)\)').firstMatch(line);
        if (match != null) {
          sourceFile = match.group(1);
          lineNum = int.tryParse(match.group(2) ?? '');
          colNum = int.tryParse(match.group(3) ?? '');
          break;
        }
      }
    }

    final result = <String, dynamic>{
      'errorName': errorName,
      'message': message,
      'sourceFile': sourceFile,
      'line': lineNum,
      'column': colNum,
      'stack': stackLines,
    };

    // ChainedExceptionのcauseを再帰的に解析
    if (error is ChainedException && error.cause != null) {
      result['causedBy'] = _parseError(error.cause);
    }

    return result;
  }
}

/// エラーチェーンをサポートするカスタム例外クラス
class ChainedException implements Exception {
  final String message;
  final dynamic cause;

  const ChainedException(this.message, {this.cause});

  @override
  String toString() {
    if (cause != null) {
      return '$message\nCaused by: $cause';
    }
    return message;
  }
}
