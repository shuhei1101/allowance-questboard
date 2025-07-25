/// エラーとスタックトレイスを一行のJSONに変換
/// 
/// - :param Object [error]: 発生したエラー
/// - :param StackTrace? [stackTrace]: スタックトレース情報
/// - :return String: 一行のJSON文字列
String eParse(Object error, StackTrace? stackTrace) {
  final errorSummary = ErrorSummary.fromError(error, stackTrace);
  return errorSummary.toJson();
}

/// スタックトレース情報を管理するクラス
class ErrorSummary {
  /// エラーの型
  final String errorType;
  /// エラーメッセージ
  final String message;
  /// スタックトレース項目のリスト
  final List<StackTraceItem> stackTrace;

  ErrorSummary({
    required this.errorType,
    required this.message,
    required this.stackTrace,
  });

  /// 生のエラーとスタックトレースから変換
  /// 
  /// - :param Object [error]: 発生したエラー
  /// - :param StackTrace? [stackTrace]: スタックトレース情報
  /// - :return ErrorSummary: 変換されたスタックトレース
  factory ErrorSummary.fromError(Object error, StackTrace? stackTrace) {
    final errorType = error.runtimeType.toString();
    final message = error.toString();
    
    final stackTraceItems = <StackTraceItem>[];
    if (stackTrace != null) {
      final lines = stackTrace.toString().split('\n');
      
      for (final line in lines) {
        if (line.contains('allowance_questboard') && line.trim().isNotEmpty) {
          try {
            final item = StackTraceItem.fromError(line);
            stackTraceItems.add(item);
          } catch (e) {
            // パースできない行はスキップ
          }
        }
      }
    }
    
    return ErrorSummary(
      errorType: errorType,
      message: message,
      stackTrace: stackTraceItems,
    );
  }

  /// 一行のJSONに変換
  /// 
  /// - :return String: JSON文字列
  String toJson() {
    final json = {
      'errorType': errorType,
      'message': message,
      'stackTrace': stackTrace.map((item) => item.toJson()).toList(),
    };
    
    // JSON文字列に変換（改行なし）
    return _jsonEncode(json);
  }

  /// JSONエンコード（改行なし）
  String _jsonEncode(Map<String, dynamic> data) {
    final buffer = StringBuffer();
    buffer.write('{');
    
    bool first = true;
    data.forEach((key, value) {
      if (!first) buffer.write(',');
      first = false;
      
      buffer.write('"$key":');
      if (value is String) {
        buffer.write('"${_escapeJson(value)}"');
      } else if (value is int) {
        buffer.write(value);
      } else if (value is List) {
        buffer.write('[');
        for (int i = 0; i < value.length; i++) {
          if (i > 0) buffer.write(',');
          if (value[i] is Map) {
            buffer.write(_jsonEncodeMap(value[i]));
          } else {
            buffer.write('"${_escapeJson(value[i].toString())}"');
          }
        }
        buffer.write(']');
      } else {
        buffer.write('"${_escapeJson(value.toString())}"');
      }
    });
    
    buffer.write('}');
    return buffer.toString();
  }

  /// Mapをエンコード
  String _jsonEncodeMap(Map<String, dynamic> map) {
    final buffer = StringBuffer();
    buffer.write('{');
    
    bool first = true;
    map.forEach((key, value) {
      if (!first) buffer.write(',');
      first = false;
      
      buffer.write('"$key":');
      if (value is String) {
        buffer.write('"${_escapeJson(value)}"');
      } else if (value is int) {
        buffer.write(value);
      } else {
        buffer.write('"${_escapeJson(value.toString())}"');
      }
    });
    
    buffer.write('}');
    return buffer.toString();
  }

  /// JSON文字列をエスケープ
  String _escapeJson(String value) {
    return value
        .replaceAll('\\', '\\\\')
        .replaceAll('"', '\\"')
        .replaceAll('\n', '\\n')
        .replaceAll('\r', '\\r')
        .replaceAll('\t', '\\t');
  }
}

/// スタックトレースの各項目を表すクラス
class StackTraceItem {
  /// ファイルパス
  final String file;
  /// 行番号
  final int line;
  /// 列番号
  final int column;
  /// メソッド名
  final String method;

  StackTraceItem({
    required this.file,
    required this.line,
    required this.column,
    required this.method,
  });

  /// 生のスタックトレース行から変換（allowance_questboardを含む行のみ）
  /// 
  /// - :param String [line]: スタックトレース行
  /// - :return StackTraceItem?: 変換されたスタックトレース項目（パースできない場合はnull）
  factory StackTraceItem.fromError(String line) {
    if (!line.contains('allowance_questboard') || line.trim().isEmpty) {
      throw ArgumentError('allowance_questboardを含む有効な行ではありません');
    }
    
    final item = _parseStackTraceLine(line.trim());
    if (item == null) {
      throw ArgumentError('スタックトレース行のパースに失敗しました: $line');
    }
    
    return item;
  }

  /// スタックトレース行をパース
  static StackTraceItem? _parseStackTraceLine(String line) {
    try {
      // Dartスタックトレースの形式を解析
      // 例: "#0      firstException (package:allowance_questboard/core/exception/error_parser.dart:219:3)"
      
      // #数字部分を削除
      final withoutNumber = line.replaceFirst(RegExp(r'^#\d+\s+'), '');
      
      // メソッド名と括弧部分を分離
      final openParenIndex = withoutNumber.indexOf('(');
      final closeParenIndex = withoutNumber.lastIndexOf(')');
      
      if (openParenIndex == -1 || closeParenIndex == -1) return null;
      
      final method = withoutNumber.substring(0, openParenIndex).trim();
      final locationPart = withoutNumber.substring(openParenIndex + 1, closeParenIndex);
      
      // ファイルパスと行番号:列番号を分離
      final lastColonIndex = locationPart.lastIndexOf(':');
      if (lastColonIndex == -1) return null;
      
      final secondLastColonIndex = locationPart.lastIndexOf(':', lastColonIndex - 1);
      if (secondLastColonIndex == -1) return null;
      
      final filePath = locationPart.substring(0, secondLastColonIndex);
      final lineNumber = int.tryParse(locationPart.substring(secondLastColonIndex + 1, lastColonIndex)) ?? 0;
      final column = int.tryParse(locationPart.substring(lastColonIndex + 1)) ?? 0;
      
      // package:allowance_questboard/ プレフィックスを削除
      final file = filePath.replaceFirst('package:allowance_questboard/', '');
      
      return StackTraceItem(
        file: file,
        line: lineNumber,
        column: column,
        method: method,
      );
    } catch (e) {
      return null;
    }
  }

  /// JSON形式のMapに変換
  /// 
  /// :return Map<String, dynamic>: JSON用のMap
  Map<String, dynamic> toJson() {
    return {
      'file': file,
      'line': line,
      'method': method,
    };
  }
}



// 動作確認
void firstException() {
  throw Exception('エラーが発生しました');
}

void secondException() {
    firstException();
}

void thirdException() {
  secondException();
}

void main() {
  try {
    thirdException();
  } catch (e, stackTrace) {
    final errorJson = eParse(e, stackTrace);
    print("スタックトレース情報: $errorJson");
  }
}
