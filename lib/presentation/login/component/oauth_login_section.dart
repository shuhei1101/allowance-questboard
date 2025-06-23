import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

/// OAuth ログインコンポーネント
class OAuthLoginSection extends StatelessWidget {
  const OAuthLoginSection({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const Text(
              'ソーシャルログイン',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),
            
            // Google ログイン
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: () => _signInWithProvider(context, Provider.google),
                icon: const Icon(Icons.account_circle, color: Colors.red),
                label: const Text('Google でログイン'),
                style: OutlinedButton.styleFrom(
                  side: const BorderSide(color: Colors.red),
                  foregroundColor: Colors.red,
                ),
              ),
            ),
            const SizedBox(height: 8),
            
            // GitHub ログイン
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: () => _signInWithProvider(context, Provider.github),
                icon: const Icon(Icons.code, color: Colors.black),
                label: const Text('GitHub でログイン'),
                style: OutlinedButton.styleFrom(
                  side: const BorderSide(color: Colors.black),
                  foregroundColor: Colors.black,
                ),
              ),
            ),
            const SizedBox(height: 8),
            
            // Apple ログイン (iOSの場合のみ表示)
            if (Theme.of(context).platform == TargetPlatform.iOS) 
              SizedBox(
                width: double.infinity,
                child: OutlinedButton.icon(
                  onPressed: () => _signInWithProvider(context, Provider.apple),
                  icon: const Icon(Icons.apple, color: Colors.black),
                  label: const Text('Apple でログイン'),
                  style: OutlinedButton.styleFrom(
                    side: const BorderSide(color: Colors.black),
                    foregroundColor: Colors.black,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }

  /// OAuthプロバイダーでサインイン
  Future<void> _signInWithProvider(BuildContext context, OAuthProvider provider) async {
    try {
      await Supabase.instance.client.auth.signInWithOAuth(
        provider,
        redirectTo: 'io.supabase.allowance-questboard://login-callback/',
      );
    } catch (e) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('${_getProviderName(provider)} ログインに失敗しました: ${e.toString()}'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  /// プロバイダー名を取得
  String _getProviderName(OAuthProvider provider) {
    switch (provider) {
      case Provider.google:
        return 'Google';
      case Provider.github:
        return 'GitHub';
      case Provider.apple:
        return 'Apple';
      default:
        return 'OAuth';
    }
  }
}