import 'package:flutter/material.dart';
import 'package:allowance_questboard/core/security/auth_tokens.dart';
import 'package:allowance_questboard/core/security/token_storage.dart';

/// TokenStorageの使用例を示すサンプル画面
class TokenStorageExample extends StatefulWidget {
  const TokenStorageExample({super.key});

  @override
  State<TokenStorageExample> createState() => _TokenStorageExampleState();
}

class _TokenStorageExampleState extends State<TokenStorageExample> {
  final TokenStorage _tokenStorage = TokenStorage();
  String _statusMessage = '';
  AuthTokens? _currentTokens;

  @override
  void initState() {
    super.initState();
    _loadTokens();
  }

  /// トークンを読み込み
  Future<void> _loadTokens() async {
    final tokens = await _tokenStorage.get();
    setState(() {
      _currentTokens = tokens;
      _statusMessage = tokens != null ? 'トークンが読み込まれました' : 'トークンが見つかりません';
    });
  }

  /// サンプルトークンを保存
  Future<void> _saveTokens() async {
    final tokens = AuthTokens(
      accessToken: 'sample_access_token_${DateTime.now().millisecondsSinceEpoch}',
      refreshToken: 'sample_refresh_token_${DateTime.now().millisecondsSinceEpoch}',
    );

    final success = await _tokenStorage.save(tokens);
    if (success) {
      setState(() {
        _currentTokens = tokens;
        _statusMessage = 'トークンが保存されました';
      });
    } else {
      setState(() {
        _statusMessage = 'トークンの保存に失敗しました';
      });
    }
  }

  /// トークンを削除
  Future<void> _deleteTokens() async {
    final success = await _tokenStorage.delete();
    if (success) {
      setState(() {
        _currentTokens = null;
        _statusMessage = 'トークンが削除されました';
      });
    } else {
      setState(() {
        _statusMessage = 'トークンの削除に失敗しました';
      });
    }
  }

  /// トークンの存在確認
  Future<void> _checkTokens() async {
    final exists = await _tokenStorage.exists();
    setState(() {
      _statusMessage = exists ? 'トークンが存在します' : 'トークンが存在しません';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('TokenStorage Example'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'ステータス',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 8),
                    Text(_statusMessage),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '現在のトークン',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 8),
                    if (_currentTokens != null) ...[
                      Text('Access Token: ${_currentTokens!.accessToken}'),
                      const SizedBox(height: 4),
                      Text('Refresh Token: ${_currentTokens!.refreshToken}'),
                    ] else ...[
                      const Text('トークンが設定されていません'),
                    ],
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _saveTokens,
              child: const Text('サンプルトークンを保存'),
            ),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: _loadTokens,
              child: const Text('トークンを読み込み'),
            ),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: _checkTokens,
              child: const Text('トークンの存在確認'),
            ),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: _deleteTokens,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.red,
                foregroundColor: Colors.white,
              ),
              child: const Text('トークンを削除'),
            ),
          ],
        ),
      ),
    );
  }
}
