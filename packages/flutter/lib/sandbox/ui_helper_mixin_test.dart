import 'package:flutter/material.dart';
import 'package:allowance_questboard/core/widget/ui_helper_mixin.dart';

/// UiHelperMixinの動作確認用sandbox
/// 
/// このファイルを単体で実行してmixinの機能をテストできる
void main() {
  runApp(const UiHelperTestApp());
}

class UiHelperTestApp extends StatelessWidget {
  const UiHelperTestApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'UI Helper Mixin Test',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
      ),
      home: const UiHelperTestPage(),
    );
  }
}

class UiHelperTestPage extends StatefulWidget {
  const UiHelperTestPage({super.key});

  @override
  State<UiHelperTestPage> createState() => _UiHelperTestPageState();
}

class _UiHelperTestPageState extends State<UiHelperTestPage> with UiHelperMixin {
  bool _isLoading = false;
  bool _showError = false;
  bool _isEmpty = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('UI Helper Mixin Test'),
        backgroundColor: Colors.blue.shade100,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // SnackBar系のテスト
            _buildSection(
              '📢 SnackBar系',
              [
                ElevatedButton(
                  onPressed: () => snackBar(context, '基本のSnackBarです'),
                  child: const Text('基本SnackBar'),
                ),
                ElevatedButton(
                  onPressed: () => successSnackBar(context, '成功しました！'),
                  child: const Text('成功SnackBar'),
                ),
                ElevatedButton(
                  onPressed: () => errorSnackBar(context, 'エラーが発生しました'),
                  child: const Text('エラーSnackBar'),
                ),
                ElevatedButton(
                  onPressed: () => snackBar(
                    context,
                    'カスタム設定のSnackBar',
                    duration: const Duration(seconds: 2),
                  ),
                  child: const Text('カスタムSnackBar'),
                ),
              ],
            ),

            const SizedBox(height: 24),

            // ダイアログ系のテスト
            _buildSection(
              '💬 ダイアログ系',
              [
                ElevatedButton(
                  onPressed: () async {
                    final result = await confirmDialog(
                      context,
                      title: '確認',
                      content: '本当に実行しますか？',
                      onConfirm: () {
                        successSnackBar(context, '実行されました！');
                      },
                    );
                    if (result == false) {
                      snackBar(context, 'キャンセルされました');
                    }
                  },
                  child: const Text('確認ダイアログ'),
                ),
                ElevatedButton(
                  onPressed: () => alertDialog(
                    context,
                    title: 'お知らせ',
                    content: 'これはシンプルなアラートダイアログです',
                  ),
                  child: const Text('アラートダイアログ'),
                ),
                ElevatedButton(
                  onPressed: () async {
                    showLoadingDialog(context, message: '処理中です...');
                    await Future.delayed(const Duration(seconds: 3));
                    hideLoadingDialog(context);
                    successSnackBar(context, '処理が完了しました！');
                  },
                  child: const Text('ローディングダイアログ'),
                ),
              ],
            ),

            const SizedBox(height: 24),

            // Widget系のテスト
            _buildSection(
              '🎨 Widget系',
              [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Column(
                      children: [
                        const Text('小'),
                        loadingIndicator(size: 16.0),
                      ],
                    ),
                    Column(
                      children: [
                        const Text('中'),
                        loadingIndicator(),
                      ],
                    ),
                    Column(
                      children: [
                        const Text('大'),
                        loadingIndicator(size: 48.0, color: Colors.red),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: () {
                    setState(() {
                      _isLoading = !_isLoading;
                      _showError = false;
                      _isEmpty = false;
                    });
                  },
                  child: Text(_isLoading ? 'ローディング停止' : 'ローディング表示'),
                ),
                ElevatedButton(
                  onPressed: () {
                    setState(() {
                      _showError = !_showError;
                      _isLoading = false;
                      _isEmpty = false;
                    });
                  },
                  child: Text(_showError ? 'エラー非表示' : 'エラー表示'),
                ),
                ElevatedButton(
                  onPressed: () {
                    setState(() {
                      _isEmpty = !_isEmpty;
                      _isLoading = false;
                      _showError = false;
                    });
                  },
                  child: Text(_isEmpty ? '空状態非表示' : '空状態表示'),
                ),
              ],
            ),

            const SizedBox(height: 24),

            // 状態表示エリア
            Container(
              height: 200,
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey),
                borderRadius: BorderRadius.circular(8),
              ),
              child: _buildStateWidget(),
            ),

            const SizedBox(height: 24),

            // 複合テスト
            _buildSection(
              '🧪 複合テスト',
              [
                ElevatedButton(
                  onPressed: () async {
                    // 複数のUIコンポーネントを組み合わせたテスト
                    final confirmed = await confirmDialog(
                      context,
                      title: '複合テスト',
                      content: 'ローディング→成功の流れをテストしますか？',
                    );

                    if (confirmed == true) {
                      showLoadingDialog(context, message: 'データを処理中...');
                      
                      await Future.delayed(const Duration(seconds: 2));
                      hideLoadingDialog(context);
                      
                      successSnackBar(context, 'すべての処理が完了しました！');
                      
                      setState(() {
                        _isLoading = false;
                        _showError = false;
                        _isEmpty = false;
                      });
                    }
                  },
                  child: const Text('フル機能テスト'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSection(String title, List<Widget> children) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 12),
        ...children.map((child) => Padding(
          padding: const EdgeInsets.only(bottom: 8),
          child: child,
        )),
      ],
    );
  }

  Widget _buildStateWidget() {
    if (_isLoading) {
      return centerLoading(message: 'データを読み込み中...');
    } else if (_showError) {
      return errorWidget(
        message: 'データの取得に失敗しました\nネットワークを確認してください',
        onRetry: () {
          snackBar(context, 'リトライボタンが押されました');
          setState(() {
            _showError = false;
          });
        },
      );
    } else if (_isEmpty) {
      return emptyWidget(
        message: 'データがありません\n新しいアイテムを追加してください',
        icon: Icons.inbox_outlined,
      );
    } else {
      return const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.check_circle,
              size: 64,
              color: Colors.green,
            ),
            SizedBox(height: 16),
            Text(
              '正常状態\n上のボタンで各状態をテストできます',
              style: TextStyle(fontSize: 16),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      );
    }
  }
}
