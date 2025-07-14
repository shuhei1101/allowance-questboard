/// Supabase configuration
/// 
/// 本番環境では環境変数から取得することを推奨
class SupabaseConfig {
  static const String url = 'YOUR_SUPABASE_URL';
  static const String anonKey = 'YOUR_SUPABASE_ANON_KEY';
  
  // 使用例:
  // static const String url = 'https://abcdefghijklmnop.supabase.co';
  // static const String anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
}
