import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:allowance_questboard/core/security/auth_tokens.dart';

/// JWTトークン情報をセキュアに保存・取得するクラス
class TokenStorage {
  /// セキュアストレージのインスタンス
  static const FlutterSecureStorage _secureStorage = FlutterSecureStorage(
    aOptions: AndroidOptions(
      encryptedSharedPreferences: true,
    ),
    iOptions: IOSOptions(
      accessibility: KeychainAccessibility.first_unlock_this_device,
    ),
  );

  /// トークン保存用のキー
  static const String _tokenKey = 'auth_tokens';

  /// トークンを保存
  /// 
  /// [tokens] 保存するAuthTokensオブジェクト
  /// 
  /// Returns: 保存が成功したかどうか
  Future<bool> save(AuthTokens tokens) async {
    try {
      final jsonString = jsonEncode(tokens.toJson());
      await _secureStorage.write(key: _tokenKey, value: jsonString);
      return true;
    } catch (e) {
      // エラーログを出力（実際のアプリではloggerを使用）
      print('トークンの保存に失敗しました: $e');
      return false;
    }
  }

  /// トークンを取得
  /// 
  /// Returns: 保存されているAuthTokensオブジェクト、存在しない場合はnull
  Future<AuthTokens?> get() async {
    try {
      final jsonString = await _secureStorage.read(key: _tokenKey);
      if (jsonString == null) {
        return null;
      }
      
      final jsonMap = jsonDecode(jsonString) as Map<String, dynamic>;
      return AuthTokens.fromJson(jsonMap);
    } catch (e) {
      // エラーログを出力（実際のアプリではloggerを使用）
      print('トークンの取得に失敗しました: $e');
      return null;
    }
  }

  /// トークンを削除
  /// 
  /// Returns: 削除が成功したかどうか
  Future<bool> delete() async {
    try {
      await _secureStorage.delete(key: _tokenKey);
      return true;
    } catch (e) {
      // エラーログを出力（実際のアプリではloggerを使用）
      print('トークンの削除に失敗しました: $e');
      return false;
    }
  }

  /// 全てのトークンを削除
  /// 
  /// Returns: 削除が成功したかどうか
  Future<bool> deleteAll() async {
    try {
      await _secureStorage.deleteAll();
      return true;
    } catch (e) {
      // エラーログを出力（実際のアプリではloggerを使用）
      print('全てのトークンの削除に失敗しました: $e');
      return false;
    }
  }

  /// トークンが存在するかどうかを確認
  /// 
  /// Returns: トークンが存在する場合はtrue、存在しない場合はfalse
  Future<bool> exists() async {
    try {
      final jsonString = await _secureStorage.read(key: _tokenKey);
      return jsonString != null;
    } catch (e) {
      // エラーログを出力（実際のアプリではloggerを使用）
      print('トークンの存在確認に失敗しました: $e');
      return false;
    }
  }
}
